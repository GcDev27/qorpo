"use client";

import { useEffect, useState } from "react";
import { ESTUDIO, LOCAIS, TAMANHOS, preenchido } from "@/lib/estudio";

type Opcao = { id: string; nome: string; estilos: string[]; whatsapp: string };

const campo =
  "w-full border-b border-osso/25 bg-transparent py-3 text-lg text-osso outline-none transition-colors placeholder:text-osso/35 focus:border-osso";

export default function Orcamento({ artistas }: { artistas: Opcao[] }) {
  const [artistaId, setArtistaId] = useState("");
  const [previa, setPrevia] = useState<{ titulo: string; texto: string } | null>(null);

  // Os botões "Orçar com ..." já deixam o tatuador escolhido
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement).closest<HTMLElement>("[data-orcar]");
      if (alvo?.dataset.orcar) setArtistaId(alvo.dataset.orcar);
    };
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const artista = artistas.find((a) => a.id === artistaId);
    const nome = String(dados.get("nome") ?? "").trim();
    const ideia = String(dados.get("ideia") ?? "").trim();
    const saudacao = artista ? `Oi, ${artista.nome.split(" ")[0]}!` : "Oi, pessoal do Qorpo!";
    const texto = [
      `${saudacao} ${nome ? `Aqui é ${nome}, vim` : "Vim"} pelo site e quero orçar uma tatuagem.`,
      "",
      `Ideia: ${ideia || "(vou explicar aqui na conversa)"}`,
      `Tamanho: ${dados.get("tamanho")}`,
      `Local do corpo: ${dados.get("local")}`,
      dados.get("referencia") ? "Tenho fotos de referência e vou mandar aqui." : "Ainda não tenho referência.",
    ].join("\n");
    const numero = artista?.whatsapp || ESTUDIO.whatsapp;

    if (preenchido(numero)) {
      window.open(`https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
      setPrevia({ titulo: "Abrimos o WhatsApp com esta mensagem:", texto });
    } else {
      setPrevia({ titulo: "Demonstração: com o número do estúdio cadastrado, esta mensagem abre no WhatsApp.", texto });
    }
  }

  return (
    <form onSubmit={enviar} className="grid gap-8" noValidate>
      <label className="grid gap-1">
        <span className="rotulo text-osso/55">Tatuador</span>
        <select value={artistaId} onChange={(e) => setArtistaId(e.target.value)} className={`${campo} [&>option]:bg-tinta`}>
          <option value="">Ainda não sei, me ajudem a escolher</option>
          {artistas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome} · {a.estilos.join(", ")}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1">
        <span className="rotulo text-osso/55">Seu nome</span>
        <input name="nome" autoComplete="given-name" placeholder="Como podemos te chamar?" className={campo} />
      </label>
      <label className="grid gap-1">
        <span className="rotulo text-osso/55">Sua ideia</span>
        <textarea name="ideia" rows={3} placeholder="Ex.: um sol ornamental no antebraço" className={`${campo} resize-none`} />
      </label>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="rotulo text-osso/55">Tamanho</span>
          <select name="tamanho" className={`${campo} [&>option]:bg-tinta`}>
            {TAMANHOS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          <span className="rotulo text-osso/55">Local do corpo</span>
          <select name="local" className={`${campo} [&>option]:bg-tinta`}>
            {LOCAIS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex items-center gap-3 text-osso/80">
        <input type="checkbox" name="referencia" className="size-4 accent-osso" />
        Tenho fotos de referência
      </label>
      <button type="submit" className="rotulo justify-self-start bg-osso px-8 py-4 text-tinta transition-opacity hover:opacity-85">
        Enviar pedido pelo WhatsApp
      </button>
      {previa && (
        <div className="border border-osso/20 p-5" aria-live="polite">
          <p className="rotulo mb-3 text-osso/55">{previa.titulo}</p>
          <pre className="whitespace-pre-wrap font-sans text-sm text-osso/85">{previa.texto}</pre>
        </div>
      )}
    </form>
  );
}
