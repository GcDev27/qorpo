"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Animações de rolagem do site, ligadas por atributos no HTML:
//   data-revelar     o elemento sobe e aparece ao entrar na tela
//   data-grupo       os filhos aparecem um depois do outro
//   data-tinta       a foto se revela de baixo para cima, como tinta entrando na pele
export default function Animacoes() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-revelar]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-grupo]").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 36,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-tinta]").forEach((el) => {
        const img = el.querySelector("img");
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } })
          .from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" })
          .from(img, { scale: 1.25, duration: 1.8, ease: "power3.out" }, 0);
      });
    });
  });

  return null;
}
