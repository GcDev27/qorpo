import Image from "next/image";
import Abertura from "@/components/Abertura";
import Animacoes from "@/components/Animacoes";
import Cabecalho from "@/components/Cabecalho";
import Orcamento from "@/components/Orcamento";
import RolagemSuave from "@/components/RolagemSuave";
import SolMarca from "@/components/SolMarca";
import { getArtistas } from "@/lib/artistas";
import { CUIDADOS, ESTUDIO, PASSOS, PERGUNTAS } from "@/lib/estudio";

const numero = (i: number) => String(i + 1).padStart(2, "0");

export default async function Home() {
  const artistas = await getArtistas();
  const estilos = [...new Set(artistas.flatMap((a) => a.estilos))];
  const destaques = artistas.map((a) => a.trabalhos[0]).filter(Boolean).slice(0, 3);

  return (
    <>
      <RolagemSuave />
      <Animacoes />
      <Cabecalho />
      <Abertura />

      <main>
        {/* Início: continua no tom osso em que a abertura termina */}
        <section id="inicio" className="relative bg-osso text-tinta">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-12 lg:items-end lg:pb-32 lg:pt-44">
            <div className="lg:col-span-6">
              <p data-revelar className="rotulo mb-8 text-tinta/60">
                Estúdio de tatuagem · Fortaleza
              </p>
              <h2 data-revelar className="font-serif text-[clamp(3.4rem,9vw,8.5rem)] font-light leading-[0.92] tracking-tight">
                Arte que fica
                <br />
                no seu <em className="font-normal">corpo.</em>
              </h2>
              <p data-revelar className="mt-10 max-w-md text-lg leading-relaxed text-tinta/70">
                {ESTUDIO.sobre}
              </p>
              <div data-revelar className="mt-10 flex flex-wrap gap-4">
                <a href="#tatuadores" className="rotulo bg-tinta px-7 py-4 text-osso transition-opacity hover:opacity-85">
                  Escolher tatuador
                </a>
                <a href="#orcamento" className="rotulo border border-tinta/40 px-7 py-4 transition-colors hover:border-tinta">
                  Pedir orçamento
                </a>
              </div>
            </div>

            <div data-grupo className="grid grid-cols-3 items-end gap-3 sm:gap-5 lg:col-span-6">
              {destaques.map((t, i) => (
                <figure key={t.src} className={i === 1 ? "-translate-y-10 sm:-translate-y-16" : ""}>
                  <div data-tinta className="arco relative aspect-[3/5] overflow-hidden bg-osso-2">
                    <Image src={t.src} alt={t.alt} fill preload={i === 1} sizes="(min-width: 1024px) 18vw, 32vw" className="object-cover grayscale-[35%]" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Faixa de estilos */}
        <div aria-label="Estilos do estúdio" className="overflow-hidden border-y border-osso/10 bg-tinta py-6">
          <div className="faixa flex w-max items-center">
            {[0, 1].map((copia) => (
              <div key={copia} aria-hidden={copia === 1} className="flex items-center">
                {[...estilos, ...estilos].map((e, i) => (
                  <span key={`${e}-${i}`} className="flex items-center gap-10 pr-10 font-serif text-3xl italic text-osso/80 sm:text-4xl">
                    {e}
                    <SolMarca className="size-4 text-osso/40" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tatuadores */}
        <section id="tatuadores" className="bg-tinta py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-20 grid gap-6 lg:grid-cols-12">
              <p data-revelar className="rotulo text-osso/50 lg:col-span-3">
                Tatuadores
              </p>
              <div className="lg:col-span-9">
                <h2 data-revelar className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-[0.95]">
                  Cada traço tem <em>uma assinatura.</em>
                </h2>
                <p data-revelar className="mt-6 max-w-xl text-lg text-osso/60">
                  Conheça quem faz a sua tatuagem, veja os trabalhos e fale direto com o tatuador do estilo que você procura.
                </p>
              </div>
            </div>

            <div className="grid gap-28 sm:gap-36">
              {artistas.map((a, i) => (
                <article key={a.id} id={a.id} className="grid scroll-mt-24 gap-10 border-t border-osso/10 pt-10 lg:grid-cols-12 lg:gap-14">
                  <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
                    {/* A foto aparece inteira, na proporção original: algumas trazem o nome do tatuador escrito */}
                    {a.foto && (
                      <div data-tinta className="overflow-hidden rounded-t-[12rem] bg-tinta-2">
                        <Image
                          src={a.foto.src}
                          alt={`Foto de ${a.nome}`}
                          width={a.foto.largura}
                          height={a.foto.altura}
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="h-auto w-full"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:col-span-7">
                    <p data-revelar className="rotulo flex items-center gap-4 text-osso/50">
                      <span className="font-serif text-base not-italic tracking-normal text-osso/70">{numero(i)}</span>
                      {a.estilos.join(" · ")}
                    </p>
                    <h3 data-revelar className="mt-4 font-serif text-[clamp(2.8rem,6vw,5rem)] font-light leading-none">
                      {a.nome}
                    </h3>
                    <p data-revelar className="mt-6 max-w-xl leading-relaxed text-osso/65">
                      {a.bio}
                    </p>
                    <div data-revelar className="mt-8 flex flex-wrap items-center gap-6">
                      <a href="#orcamento" data-orcar={a.id} className="rotulo bg-osso px-6 py-3.5 text-tinta transition-opacity hover:opacity-85">
                        Orçar com {a.nome.split(" ")[0]}
                      </a>
                      {a.instagram && (
                        <a
                          href={`https://instagram.com/${a.instagram}`}
                          target="_blank"
                          rel="noopener"
                          className="rotulo border-b border-osso/30 pb-1 text-osso/70 transition-colors hover:border-osso hover:text-osso"
                        >
                          @{a.instagram}
                        </a>
                      )}
                    </div>
                    <div className="mt-auto grid grid-cols-3 gap-3 pt-12 sm:gap-4">
                      {a.trabalhos.slice(0, 3).map((t) => (
                        <div key={t.src} data-tinta className="relative aspect-[4/5] overflow-hidden bg-tinta-2">
                          <Image src={t.src} alt={t.alt} fill sizes="(min-width: 1024px) 18vw, 30vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como" className="bg-osso py-28 text-tinta sm:py-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-16 grid gap-6 lg:grid-cols-12">
              <p data-revelar className="rotulo text-tinta/55 lg:col-span-3">
                Como funciona
              </p>
              <h2 data-revelar className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-[0.95] lg:col-span-9">
                Da ideia <em>à sessão.</em>
              </h2>
            </div>
            <ol data-grupo className="grid gap-px bg-tinta/15 sm:grid-cols-2 lg:grid-cols-4">
              {PASSOS.map(([titulo, texto], i) => (
                <li key={titulo} className="bg-osso p-8 lg:p-10">
                  <span className="font-serif text-6xl font-light italic text-tinta/35">{numero(i)}</span>
                  <h3 className="mt-10 font-serif text-2xl">{titulo}</h3>
                  <p className="mt-3 leading-relaxed text-tinta/65">{texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Orçamento */}
        <section id="orcamento" className="bg-tinta py-28 sm:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p data-revelar className="rotulo text-osso/50">
                Orçamento
              </p>
              <h2 data-revelar className="mt-6 font-serif text-[clamp(2.6rem,6vw,5rem)] font-light leading-[0.95]">
                Conta pra gente <em>a sua ideia.</em>
              </h2>
              <p data-revelar className="mt-6 max-w-sm text-lg text-osso/60">
                Leva um minuto. O pedido abre no WhatsApp já escrito: é só mandar as fotos de referência na conversa.
              </p>
              <SolMarca className="mt-16 hidden size-24 text-osso/10 lg:block" />
            </div>
            <div data-revelar className="lg:col-span-7">
              <Orcamento artistas={artistas.map(({ id, nome, estilos, whatsapp }) => ({ id, nome, estilos, whatsapp }))} />
            </div>
          </div>
        </section>

        {/* Cuidados e dúvidas */}
        <section id="cuidados" className="bg-osso py-28 text-tinta sm:py-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-16 grid gap-6 lg:grid-cols-12">
              <p data-revelar className="rotulo text-tinta/55 lg:col-span-3">
                Cuidados
              </p>
              <h2 data-revelar className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-[0.95] lg:col-span-9">
                Bem cuidada, <em>dura a vida toda.</em>
              </h2>
            </div>
            <div data-grupo className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {CUIDADOS.map(([titulo, texto]) => (
                <div key={titulo} className="border-t border-tinta/20 pt-6">
                  <h3 className="font-serif text-2xl">{titulo}</h3>
                  <p className="mt-3 leading-relaxed text-tinta/65">{texto}</p>
                </div>
              ))}
            </div>

            <div id="duvidas" className="mt-32 grid gap-6 lg:grid-cols-12">
              <p data-revelar className="rotulo text-tinta/55 lg:col-span-3">
                Dúvidas
              </p>
              <div data-grupo className="lg:col-span-9">
                {PERGUNTAS.map(([pergunta, resposta]) => (
                  <details key={pergunta} className="group border-b border-tinta/20">
                    <summary className="flex items-center justify-between gap-6 py-6 font-serif text-2xl sm:text-3xl">
                      {pergunta}
                      <span aria-hidden className="text-3xl font-light transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-8 leading-relaxed text-tinta/65">{resposta}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Visite */}
        <section id="visite" className="overflow-hidden bg-tinta pt-28 sm:pt-36">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p data-revelar className="rotulo text-osso/50">
                Visite
              </p>
              <h2 data-revelar className="mt-6 font-serif text-[clamp(2.6rem,6vw,5rem)] font-light leading-[0.95]">
                {ESTUDIO.nomeCompleto}
              </h2>
              <p data-revelar className="mt-6 text-lg text-osso/60">
                {ESTUDIO.endereco}
              </p>
              <div data-revelar className="mt-10 flex flex-wrap gap-4">
                <a href={ESTUDIO.linkMapa} target="_blank" rel="noopener" className="rotulo bg-osso px-7 py-4 text-tinta transition-opacity hover:opacity-85">
                  Abrir no mapa
                </a>
                <a
                  href={`https://instagram.com/${ESTUDIO.instagram}`}
                  target="_blank"
                  rel="noopener"
                  className="rotulo border border-osso/30 px-7 py-4 transition-colors hover:border-osso"
                >
                  Instagram
                </a>
              </div>
            </div>
            <dl data-grupo className="lg:col-span-5 lg:col-start-8">
              {ESTUDIO.horarios.map(([dia, hora]) => (
                <div key={dia} className="flex justify-between border-b border-osso/15 py-5">
                  <dt className="text-osso/60">{dia}</dt>
                  <dd className="font-serif text-xl">{hora}</dd>
                </div>
              ))}
            </dl>
          </div>

          <footer className="mt-28">
            <div aria-hidden className="flex select-none items-center justify-center gap-[3vw] font-serif text-[22vw] font-light leading-[0.75] tracking-[0.08em] text-osso/[0.07]">
              QORP<SolMarca className="size-[17vw]" />
            </div>
            <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-osso/10 px-5 py-8 text-sm text-osso/45 sm:px-8">
              <p>Estúdio Qorpo · Fortaleza - CE</p>
              <p>
                Site por{" "}
                <a href="https://portfolio-giancarlo-dev.vercel.app" target="_blank" rel="noopener" className="text-osso/70 underline-offset-4 hover:underline">
                  Giancarlo Castro
                </a>
              </p>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
