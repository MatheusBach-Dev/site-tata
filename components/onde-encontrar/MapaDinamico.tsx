"use client";

import dynamic from "next/dynamic";
import type { PropsMapa } from "./Mapa";
import styles from "./Mapa.module.css";

export type { FocoMapa, PinoMapa } from "./Mapa";

// O mapa só existe no navegador (Leaflet precisa da janela), então ele é carregado
// depois da página, com um fundo cor de areia enquanto isso.
const Mapa = dynamic(() => import("./Mapa"), {
  ssr: false,
  loading: () => <div className={styles.carregando} />,
});

export function MapaDinamico(props: PropsMapa) {
  return <Mapa {...props} />;
}
