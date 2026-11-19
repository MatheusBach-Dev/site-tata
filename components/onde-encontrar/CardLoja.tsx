import { enderecoCompleto, loja } from "@/data/loja";
import { linkComoChegar } from "@/lib/mapa";
import { linkWhatsApp, mensagens } from "@/lib/whatsapp";
import { Botao } from "../Botao";
import { IconClock, IconMapPin, IconWhatsApp } from "../icons";
import { MapaDinamico } from "./MapaDinamico";
import styles from "./CardLoja.module.css";

// Card "Nossa loja": mapa com o pino da loja, endereço, horário e botões.
export function CardLoja() {
  return (
    <article className={styles.card}>
      <div className={styles.mapa}>
        <MapaDinamico
          tipo="loja"
          rotulo="Mapa com a localização da loja da Tatá"
          pinos={[
            {
              id: "loja",
              lat: loja.coordenadas.lat,
              lng: loja.coordenadas.lng,
              posicao: [loja.coordenadas.lat, loja.coordenadas.lng],
              titulo: loja.nome,
              subtitulo: enderecoCompleto,
            },
          ]}
        />
      </div>

      <div className={styles.corpo}>
        <h2 className={styles.titulo}>Nossa loja</h2>

        <ul className={styles.infos}>
          <li>
            <span className={styles.icone}>
              <IconMapPin size={20} />
            </span>
            <span>
              <strong>Endereço</strong>
              {enderecoCompleto}
            </span>
          </li>
          <li>
            <span className={styles.icone}>
              <IconClock size={20} />
            </span>
            <span>
              <strong>Horário de funcionamento</strong>
              {loja.horarios.semana}
              <br />
              {loja.horarios.sabado}
            </span>
          </li>
        </ul>

        <div className={styles.botoes}>
          <Botao href={linkComoChegar(loja.coordenadas)} externo variante="contorno">
            Como chegar
          </Botao>
          <Botao href={linkWhatsApp(mensagens.pedido)} externo variante="zap">
            <IconWhatsApp size={20} />
            Chamar no WhatsApp
          </Botao>
        </div>
      </div>
    </article>
  );
}
