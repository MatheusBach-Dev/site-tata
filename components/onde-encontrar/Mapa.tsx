"use client";

// Mapa (Leaflet + OpenStreetMap). Usado pela loja (1 pino) e pelo buscador (vários pinos agrupados).
// Só roda no navegador: a página carrega este arquivo pelo MapaDinamico.

import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

import L from "leaflet";
import { useEffect, useRef } from "react";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { distanciaKm, linkComoChegar, linkVerNoMaps, type Coordenada } from "@/lib/mapa";
import styles from "./Mapa.module.css";

/**
 * Um pino do mapa. `posicao` é [lat, lng] criado uma vez só para cada ponto:
 * se fosse um array novo a cada tela, o mapa tiraria e recolocaria todos os pinos sempre.
 */
export type PinoMapa = {
  id: string;
  lat: number;
  lng: number;
  posicao: [number, number];
  titulo: string;
  subtitulo: string;
};

/** Pedido para levar o mapa até um pino. `vez` muda a cada clique, então o mesmo pino pode ser pedido de novo. */
export type FocoMapa = { id: string; vez: number };

export type PropsMapa = {
  pinos: PinoMapa[];
  tipo: "loja" | "revenda";
  foco?: FocoMapa | null;
  onSelecionar?: (id: string) => void;
  voce?: Coordenada | null;
  className?: string;
  /** Texto lido pelos leitores de tela */
  rotulo: string;
};

// Imagens do mapa. Se um dia o site tiver muito acesso, troque o provedor só aqui.
const MAPA_BASE = {
  url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  atribuicao: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
};

// Centro de Contagem, usado só quando não há nenhum pino.
const CENTRO_PADRAO: [number, number] = [-19.9321, -44.0539];

const pinoRevenda = L.divIcon({
  className: styles.pino,
  html: `<svg width="34" height="44" viewBox="0 0 34 44" aria-hidden="true">
    <path d="M17 43C17 43 32 27.5 32 16.5A15 15 0 0 0 2 16.5C2 27.5 17 43 17 43Z" style="fill:var(--vinho);stroke:var(--branco);stroke-width:2"/>
    <path d="M22.4 17.6c.9-.9 1.8-2 1.8-3.4a3.4 3.4 0 0 0-3.4-3.4c-1.1 0-1.8.3-2.8 1.2-.9-.9-1.7-1.2-2.8-1.2a3.4 3.4 0 0 0-3.4 3.4c0 1.4.9 2.5 1.8 3.4l4.4 4.3Z" style="fill:var(--branco)"/>
  </svg>`,
  iconSize: [34, 44],
  iconAnchor: [17, 43],
  popupAnchor: [0, -38],
});

const pinoLoja = L.divIcon({
  className: styles.pino,
  html: `<span class="${styles.pinoLoja}"><img src="/icon.png" alt="" width="44" height="44" /></span>`,
  iconSize: [56, 56],
  iconAnchor: [28, 56],
  popupAnchor: [0, -52],
});

/** Pontos que a visão precisa mostrar: com "Perto de mim", a pessoa e os 3 pinos mais perto; senão, todos. */
function pontosDaVisao(pinos: PinoMapa[], voce?: Coordenada | null): [number, number][] {
  if (!voce) return pinos.map((p) => p.posicao);
  const maisPerto = [...pinos].sort((a, b) => distanciaKm(voce, a) - distanciaKm(voce, b)).slice(0, 3);
  return [[voce.lat, voce.lng], ...maisPerto.map((p) => p.posicao)];
}

/**
 * Ajusta o zoom sempre que os pinos filtrados ou a localização mudam (1 ponto = zoom de rua).
 * Se o mapa estiver escondido (aba "Lista" no celular), espera ele aparecer para ajustar,
 * a não ser que ele esteja aparecendo justamente para mostrar um pino pedido ("Ver no mapa").
 */
function AjustarVisao({ pinos, voce, foco }: { pinos: PinoMapa[]; voce?: Coordenada | null; foco?: FocoMapa | null }) {
  const map = useMap();
  const temFoco = useRef(Boolean(foco));
  useEffect(() => {
    temFoco.current = Boolean(foco);
  }, [foco]);

  useEffect(() => {
    const ajustar = () => {
      const tamanho = map.getSize();
      if (tamanho.x === 0 || tamanho.y === 0) return false;
      const pontos = pontosDaVisao(pinos, voce);
      if (pontos.length === 1) map.setView(pontos[0], 16);
      else if (pontos.length > 1) map.fitBounds(L.latLngBounds(pontos), { padding: [40, 40], maxZoom: 15 });
      return true;
    };
    let ajustado = ajustar();
    const observador = new ResizeObserver(() => {
      map.invalidateSize();
      if (!ajustado) ajustado = temFoco.current || ajustar();
    });
    observador.observe(map.getContainer());
    return () => observador.disconnect();
  }, [map, pinos, voce]);
  return null;
}

/** Leva o mapa até o pino pedido ("Ver no mapa") e abre o balão dele, inclusive se for o mesmo de antes. */
function FocarPino({
  foco,
  marcadores,
  grupo,
}: {
  foco?: FocoMapa | null;
  marcadores: React.RefObject<Map<string, L.Marker>>;
  grupo: React.RefObject<L.MarkerClusterGroup | null>;
}) {
  const map = useMap();
  useEffect(() => {
    if (!foco) return;
    const marcador = marcadores.current.get(foco.id);
    if (!marcador) return;
    map.invalidateSize();
    // Ordem: 1) voa até o ponto; 2) quando o voo termina, o agrupamento abre a bolinha
    // (se o pino ainda estiver dentro de uma) e 3) só então o balão abre.
    // Abrir o balão antes faria ele fechar sozinho quando o agrupamento redesenha os pinos.
    const mostrar = () => {
      if (grupo.current) grupo.current.zoomToShowLayer(marcador, () => marcador.openPopup());
      else marcador.openPopup();
    };
    const destino = marcador.getLatLng();
    const zoom = Math.max(map.getZoom(), 16);
    if (map.getZoom() === zoom && map.getCenter().distanceTo(destino) < 1) {
      mostrar();
      return;
    }
    map.once("moveend", mostrar);
    map.flyTo(destino, zoom, { duration: 0.6 });
  }, [map, foco, marcadores, grupo]);
  return null;
}

export default function Mapa({ pinos, tipo, foco, onSelecionar, voce, className, rotulo }: PropsMapa) {
  const marcadores = useRef(new Map<string, L.Marker>());
  const grupo = useRef<L.MarkerClusterGroup | null>(null);
  const centro: [number, number] = pinos.length ? pinos[0].posicao : CENTRO_PADRAO;

  const lista = pinos.map((p) => (
    <Marker
      key={p.id}
      position={p.posicao}
      icon={tipo === "loja" ? pinoLoja : pinoRevenda}
      title={p.titulo}
      ref={(m) => {
        if (m) marcadores.current.set(p.id, m);
        else marcadores.current.delete(p.id);
      }}
      eventHandlers={{ click: () => onSelecionar?.(p.id) }}
    >
      {tipo === "loja" && (
        <Tooltip permanent direction="bottom" offset={[0, 4]} className={styles.etiquetaLoja}>
          {p.titulo}
        </Tooltip>
      )}
      <Popup>
        <div className={styles.balao}>
          <strong>{p.titulo}</strong>
          <span>{p.subtitulo}</span>
          <a href={linkComoChegar(p)} target="_blank" rel="noopener noreferrer">
            Como chegar
          </a>
          <a href={linkVerNoMaps(p)} target="_blank" rel="noopener noreferrer">
            Ver no Google Maps
          </a>
        </div>
      </Popup>
    </Marker>
  ));

  return (
    <div className={`${styles.regiao} ${className ?? ""}`} role="region" aria-label={rotulo}>
      <MapContainer center={centro} zoom={13} scrollWheelZoom={false} className={styles.mapa}>
        <TileLayer url={MAPA_BASE.url} attribution={MAPA_BASE.atribuicao} />
        {tipo === "revenda" ? (
          <MarkerClusterGroup ref={grupo} chunkedLoading showCoverageOnHover={false}>
            {lista}
          </MarkerClusterGroup>
        ) : (
          lista
        )}
        {voce && (
          <CircleMarker center={[voce.lat, voce.lng]} radius={9} pathOptions={{ className: styles.voce }}>
            <Tooltip direction="top">Você está aqui</Tooltip>
          </CircleMarker>
        )}
        <AjustarVisao pinos={pinos} voce={voce} foco={foco} />
        <FocarPino foco={foco} marcadores={marcadores} grupo={grupo} />
      </MapContainer>
    </div>
  );
}
