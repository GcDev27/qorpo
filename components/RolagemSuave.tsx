"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registrarLenis } from "@/lib/rolagem";

gsap.registerPlugin(ScrollTrigger);

// Rolagem suave sincronizada com o ScrollTrigger. Desligada para quem prefere menos movimento.
export default function RolagemSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    const tique = (tempo: number) => lenis.raf(tempo * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tique);
    gsap.ticker.lagSmoothing(0);
    registrarLenis(lenis);

    return () => {
      gsap.ticker.remove(tique);
      registrarLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
