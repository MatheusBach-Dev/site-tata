import { ChamadaFinal } from "@/components/home/ChamadaFinal";
import { Destaque } from "@/components/home/Destaque";
import { Diferenciais } from "@/components/home/Diferenciais";
import { TemCarinho } from "@/components/home/TemCarinho";

// Página 1 do Figma: Início
export default function Inicio() {
  return (
    <>
      <Destaque />
      <Diferenciais />
      <TemCarinho />
      <ChamadaFinal />
    </>
  );
}
