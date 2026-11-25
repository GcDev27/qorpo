import type Lenis from "lenis";

// Ponte entre a rolagem suave (Lenis) e quem precisa travar a página, como a abertura.
let lenis: Lenis | null = null;
let travada = false;

export function registrarLenis(instancia: Lenis | null) {
  lenis = instancia;
  if (lenis && travada) lenis.stop();
}

export function travarRolagem() {
  travada = true;
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function soltarRolagem() {
  travada = false;
  lenis?.start();
  document.documentElement.style.overflow = "";
}

export function rolarPara(alvo: string) {
  if (lenis) lenis.scrollTo(alvo, { duration: 1.6 });
  else document.querySelector(alvo)?.scrollIntoView({ behavior: "smooth" });
}
