"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SolMarca from "./SolMarca";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINKS = [
  ["#tatuadores", "Tatuadores"],
  ["#como", "Como funciona"],
  ["#cuidados", "Cuidados"],
  ["#visite", "Visite"],
];

// Fica escondido durante a abertura e aparece quando o site começa.
// mix-blend-difference faz o texto osso virar escuro sobre o fundo claro, sem trocar de cor na mão.
export default function Cabecalho() {
  const topo = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(topo.current, { autoAlpha: 0, y: -12 });
    ScrollTrigger.create({
      trigger: "#inicio",
      start: "top 40%",
      onEnter: () => gsap.to(topo.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(topo.current, { autoAlpha: 0, y: -12, duration: 0.4 }),
    });
  });

  return (
    <header ref={topo} className="invisible fixed inset-x-0 top-0 z-50 text-osso opacity-0 mix-blend-difference">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Estúdio Qorpo, início">
          <SolMarca className="size-7" />
          <span className="font-serif text-xl tracking-[0.4em]">QORPO</span>
        </a>
        <nav aria-label="Seções" className="hidden gap-8 md:flex">
          {LINKS.map(([href, rotulo]) => (
            <a key={href} href={href} className="rotulo opacity-80 transition-opacity hover:opacity-100">
              {rotulo}
            </a>
          ))}
        </nav>
        <a href="#orcamento" className="rotulo whitespace-nowrap border border-current px-3 py-2.5 transition-colors hover:bg-osso hover:text-tinta sm:px-4">
          Orçar tatuagem
        </a>
      </div>
    </header>
  );
}
