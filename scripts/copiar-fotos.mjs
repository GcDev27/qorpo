// Converte as fotos de conteudo/tatuadores/ em WebP leves dentro de public/tatuadores/
// e anota a largura e a altura de cada uma em public/tatuadores/medidas.json.
// Roda sozinho antes de `npm run dev` e `npm run build`.
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const ORIGEM = "conteudo/tatuadores";
const DESTINO = "public/tatuadores";
const IMAGEM = /\.(jpe?g|png|webp)$/i;
const LADO_MAXIMO = 1400;

rmSync(DESTINO, { recursive: true, force: true });
const medidas = {};
let antes = 0;
let depois = 0;

async function converter(origem, pastaDestino, url) {
  mkdirSync(pastaDestino, { recursive: true });
  const nome = `${parse(origem).name}.webp`;
  const info = await sharp(origem)
    .rotate()
    .resize({ width: LADO_MAXIMO, height: LADO_MAXIMO, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(pastaDestino, nome));
  medidas[`${url}/${nome}`] = [info.width, info.height];
  antes += statSync(origem).size;
  depois += info.size;
}

for (const pasta of readdirSync(ORIGEM, { withFileTypes: true })) {
  if (!pasta.isDirectory() || pasta.name.startsWith("_")) continue;
  const origem = join(ORIGEM, pasta.name);
  if (!existsSync(join(origem, "info.json"))) continue;

  for (const arquivo of readdirSync(origem).filter((a) => IMAGEM.test(a))) {
    await converter(join(origem, arquivo), join(DESTINO, pasta.name), `/tatuadores/${pasta.name}`);
  }
  const trabalhos = join(origem, "trabalhos");
  if (existsSync(trabalhos)) {
    for (const arquivo of readdirSync(trabalhos).filter((a) => IMAGEM.test(a))) {
      await converter(join(trabalhos, arquivo), join(DESTINO, pasta.name, "trabalhos"), `/tatuadores/${pasta.name}/trabalhos`);
    }
  }
}

writeFileSync(join(DESTINO, "medidas.json"), JSON.stringify(medidas, null, 2));
const kb = (b) => `${Math.round(b / 1024)} KB`;
console.log(`Fotos convertidas para WebP: ${Object.keys(medidas).length} arquivos, ${kb(antes)} -> ${kb(depois)}`);
