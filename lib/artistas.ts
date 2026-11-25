import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { cacheLife } from "next/cache";

export type Foto = { src: string; largura: number; altura: number };
export type Trabalho = Foto & { alt: string };

export type Artista = {
  id: string;
  nome: string;
  estilos: string[];
  bio: string;
  instagram: string;
  whatsapp: string;
  ordem: number;
  foto: Foto | null;
  trabalhos: Trabalho[];
};

const PASTA = path.join(process.cwd(), "conteudo", "tatuadores");
const IMAGEM = /\.(jpe?g|png|webp)$/i;
const MEDIDAS = path.join(process.cwd(), "public", "tatuadores", "medidas.json");

// "01-old-school-cobras-e-sol-no-peito.png" -> "old school cobras e sol no peito"
const descricao = (arquivo: string) =>
  arquivo.replace(IMAGEM, "").replace(/^\d+-/, "").replaceAll("-", " ");

// Lê as pastas no build. As fotos são servidas em WebP de public/tatuadores (scripts/copiar-fotos.mjs).
export async function getArtistas(): Promise<Artista[]> {
  "use cache";
  cacheLife("max");

  const pastas = (await readdir(PASTA, { withFileTypes: true }))
    .filter((p) => p.isDirectory() && !p.name.startsWith("_") && existsSync(path.join(PASTA, p.name, "info.json")))
    .map((p) => p.name);
  const medidas: Record<string, [number, number]> = existsSync(MEDIDAS) ? JSON.parse(await readFile(MEDIDAS, "utf-8")) : {};
  const foto = (url: string): Foto => {
    const src = url.replace(IMAGEM, ".webp");
    const [largura, altura] = medidas[src] ?? [800, 1000];
    return { src, largura, altura };
  };

  const artistas = await Promise.all(
    pastas.map(async (id) => {
      const info = JSON.parse(await readFile(path.join(PASTA, id, "info.json"), "utf-8"));
      const arquivos = await readdir(path.join(PASTA, id));
      const perfil = arquivos.find((a) => /^perfil\./i.test(a) && IMAGEM.test(a));
      const pastaTrabalhos = path.join(PASTA, id, "trabalhos");
      const trabalhos = existsSync(pastaTrabalhos)
        ? (await readdir(pastaTrabalhos)).filter((a) => IMAGEM.test(a)).sort()
        : [];

      return {
        id,
        nome: info.nome,
        estilos: info.estilos ?? [],
        bio: info.bio ?? "",
        instagram: String(info.instagram ?? "").replace(/^@/, ""),
        whatsapp: String(info.whatsapp ?? "").replace(/\D/g, ""),
        ordem: info.ordem ?? 99,
        foto: perfil ? foto(`/tatuadores/${id}/${perfil}`) : null,
        trabalhos: trabalhos.map((a) => ({
          ...foto(`/tatuadores/${id}/trabalhos/${a}`),
          alt: `Tatuagem de ${info.nome}: ${descricao(a)}`,
        })),
      } satisfies Artista;
    }),
  );

  return artistas.sort((a, b) => a.ordem - b.ordem || a.nome.localeCompare(b.nome));
}
