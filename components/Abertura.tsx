"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SOL_PATH, SOL_RAIO_MIOLO } from "@/lib/sol";
import { rolarPara, soltarRolagem, travarRolagem } from "@/lib/rolagem";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Respingos de tinta em volta do sol (posições fixas para não variar entre servidor e navegador)
const RESPINGOS = [
  [22, 38, 0.9], [176, 30, 0.6], [188, 128, 1.1], [14, 150, 0.7], [140, 192, 0.8],
  [48, 186, 0.5], [104, 6, 0.6], [196, 74, 0.5], [6, 96, 0.9], [160, 170, 0.5],
];

const MARCA = "QORPO";

export default function Abertura() {
  const secao = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(secao);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const traco = q<SVGPathElement>("[data-traco]")[0];
        const agulha = q<SVGCircleElement>("[data-agulha]")[0];
        const sol = q<HTMLElement>("[data-sol]")[0];
        const palco = q<HTMLElement>("[data-palco]")[0];
        const preenchimento = q<SVGPathElement>("[data-preenchimento]")[0];
        const comprimento = traco.getTotalLength();

        // Depois que a tinta preenche, a máscara, o filtro e o traço saem de cena:
        // são o que mais pesa para o navegador redesenhar a cada quadro.
        const limparTinta = () => {
          preenchimento.removeAttribute("mask");
          traco.style.display = "none";
          agulha.style.display = "none";
        };

        // 1. Chegada: a agulha contorna o sol, a tinta preenche e a marca aparece
        const jaRolou = window.scrollY > window.innerHeight * 0.5;
        const chegada = gsap.timeline({
          paused: jaRolou,
          defaults: { ease: "power3.out" },
          onComplete: () => {
            limparTinta();
            soltarRolagem();
          },
        });

        gsap.set(traco, { strokeDasharray: comprimento, strokeDashoffset: comprimento });
        const ponta = { feito: 0 };
        const moverAgulha = () => {
          const p = traco.getPointAtLength(comprimento * ponta.feito);
          agulha.setAttribute("cx", String(p.x));
          agulha.setAttribute("cy", String(p.y));
        };
        moverAgulha();

        chegada
          .to(agulha, { opacity: 1, duration: 0.4 }, 0.3)
          .to(ponta, { feito: 1, duration: 2.6, ease: "power1.inOut", onUpdate: moverAgulha }, 0.5)
          .to(traco, { strokeDashoffset: 0, duration: 2.6, ease: "power1.inOut" }, 0.5)
          .from(q("[data-respingo]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%", stagger: 0.18, duration: 0.5, ease: "back.out(3)" }, 0.9)
          .to(agulha, { opacity: 0, duration: 0.3 }, 3.0)
          .to(q("[data-mancha]"), { attr: { r: 120 }, duration: 1.4, ease: "power2.inOut" }, 2.9)
          .to(traco, { opacity: 0, duration: 0.8 }, 3.6)
          .from(q("[data-letra]"), { yPercent: 110, duration: 1.1, stagger: 0.07 }, 3.7)
          .from(q("[data-sub]"), { opacity: 0, y: 12, duration: 0.9 }, 4.2)
          .from(q("[data-enfeite]"), { opacity: 0, duration: 1.2, stagger: 0.08 }, 4.3);

        if (jaRolou) {
          chegada.progress(1);
          limparTinta();
        } else travarRolagem();

        // O sol gira devagar enquanto ninguém rola; para quando o zoom começa.
        // force3D: false faz o navegador redesenhar o vetor nítido em vez de esticar uma imagem borrada.
        const giro = gsap.to(q("[data-giro]"), { rotation: 360, duration: 180, repeat: -1, ease: "none", force3D: false });
        gsap.set(sol, { force3D: false });

        // 2. Rolagem: o sol vai para o centro da tela e cresce até o miolo cobrir tudo; a tela vira osso
        const paraOCentro = () => palco.clientHeight / 2 - (sol.offsetTop + sol.offsetHeight / 2);
        const escalaParaCobrir = () => {
          const meiaDiagonal = Math.hypot(palco.clientWidth, palco.clientHeight) / 2;
          const raioMiolo = (sol.offsetWidth * SOL_RAIO_MIOLO) / 200;
          return (meiaDiagonal / raioMiolo) * 1.08;
        };

        gsap
          .timeline({
            scrollTrigger: {
              trigger: secao.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => (self.progress > 0.01 ? giro.pause() : giro.resume()),
            },
          })
          .to(q("[data-marca]"), { opacity: 0, y: -40, duration: 0.18, ease: "power1.in" }, 0)
          .to(q("[data-moldura]"), { opacity: 0, duration: 0.12 }, 0)
          .to(q("[data-respingos]"), { opacity: 0, scale: 1.6, svgOrigin: "100 100", duration: 0.25 }, 0.02)
          .to(sol, { y: paraOCentro, duration: 0.22, ease: "power2.inOut" }, 0)
          .to(sol, { scale: escalaParaCobrir, rotation: 50, ease: "power2.in", duration: 0.76 }, 0.04)
          .to(q("[data-veu]"), { opacity: 1, duration: 0.12, ease: "none" }, 0.78);

        return () => soltarRolagem();
      });
    },
    { scope: secao },
  );

  return (
    <section
      ref={secao}
      id="abertura"
      aria-label="Abertura"
      className="relative h-[340svh] bg-tinta motion-reduce:h-svh"
    >
      <div data-palco className="sticky top-0 h-svh overflow-hidden">
        {/* Cantos, como uma folha de estêncil */}
        <div data-moldura className="pointer-events-none absolute inset-0 z-10 [&_button]:pointer-events-auto">
        <div data-enfeite className="rotulo absolute left-5 top-5 text-osso/55 sm:left-8 sm:top-8">Estúdio de tatuagem</div>
        <div data-enfeite className="rotulo absolute right-5 top-5 text-right text-osso/55 sm:right-8 sm:top-8">Fortaleza · CE</div>
        <button
          data-enfeite
          type="button"
          onClick={() => rolarPara("#inicio")}
          className="rotulo absolute bottom-5 right-5 text-osso/55 transition-colors hover:text-osso sm:bottom-8 sm:right-8"
        >
          Pular abertura
        </button>

        <div data-enfeite className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-8">
          <span className="rotulo text-osso/55">Role para entrar</span>
          <span className="agulha block h-10 w-px bg-osso/60" />
        </div>
        </div>

        <div className="flex h-full flex-col items-center justify-center gap-[5svh] px-6">
          <div data-sol className="relative aspect-square w-[min(62vw,44svh,400px)]">
            {/* Marcas de registro do estêncil */}
            {["-left-6 -top-6", "-right-6 -top-6", "-left-6 -bottom-6", "-right-6 -bottom-6"].map((pos) => (
              <span key={pos} data-enfeite aria-hidden className={`absolute size-3 ${pos}`}>
                <span className="absolute left-1/2 top-0 h-full w-px bg-osso/35" />
                <span className="absolute left-0 top-1/2 h-px w-full bg-osso/35" />
              </span>
            ))}
            <div data-giro className="size-full">
              <svg viewBox="0 0 200 200" className="size-full overflow-visible" role="img" aria-label="Logo do Estúdio Qorpo">
                <defs>
                  <filter id="borra" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" />
                    <feDisplacementMap in="SourceGraphic" scale="18" />
                  </filter>
                  <mask id="tinta" maskUnits="userSpaceOnUse" x="-20" y="-20" width="240" height="240">
                    <circle data-mancha cx="100" cy="100" r="0" fill="#fff" filter="url(#borra)" className="motion-reduce:[r:120px]" />
                  </mask>
                  <filter id="brilho" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="2.5" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g data-respingos>
                  {RESPINGOS.map(([x, y, r]) => (
                    <circle key={`${x}-${y}`} data-respingo cx={x} cy={y} r={r} className="fill-osso/60" />
                  ))}
                </g>
                <g>
                  <path data-preenchimento d={SOL_PATH} mask="url(#tinta)" className="fill-osso" />
                  <path data-traco d={SOL_PATH} fill="none" strokeWidth="0.6" className="stroke-osso motion-reduce:hidden" />
                  <circle data-agulha r="1.4" opacity="0" filter="url(#brilho)" className="fill-osso" />
                </g>
              </svg>
            </div>
          </div>

          <div data-marca className="text-center">
            <h1 className="flex justify-center overflow-hidden pl-[0.55em] font-serif text-[clamp(2.6rem,9vw,5.5rem)] font-light leading-none tracking-[0.55em] text-osso">
              {MARCA.split("").map((letra, i) => (
                <span key={i} data-letra className="inline-block">
                  {letra}
                </span>
              ))}
            </h1>
            <p data-sub className="mt-4 font-serif text-lg italic text-osso/65 sm:text-xl">
              arte que fica no seu corpo
            </p>
          </div>
        </div>

        <div data-veu aria-hidden className="pointer-events-none absolute inset-0 bg-osso opacity-0" />
      </div>
    </section>
  );
}
