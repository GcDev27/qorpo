"""Lê conteudo/tatuadores/ e gera artistas.js para a demo estática.

Rode de novo sempre que mudar uma pasta de tatuador:
    python gerar-artistas.py
"""
import json
import pathlib
import re

RAIZ = pathlib.Path(__file__).parent
PASTA = RAIZ / "conteudo" / "tatuadores"
IMAGENS = {".jpg", ".jpeg", ".png", ".webp"}


def url(arquivo):
    return arquivo.relative_to(RAIZ).as_posix()


def descricao(arquivo):
    # "01-old-school-cobras-e-sol-no-peito.png" -> "old school cobras e sol no peito"
    return re.sub(r"^\d+-", "", arquivo.stem).replace("-", " ")


artistas = []
for pasta in sorted(PASTA.iterdir()):
    info = pasta / "info.json"
    if not pasta.is_dir() or pasta.name.startswith("_") or not info.exists():
        continue
    dados = json.loads(info.read_text(encoding="utf-8"))
    perfil = next((f for f in sorted(pasta.glob("perfil.*")) if f.suffix.lower() in IMAGENS), None)
    trabalhos = sorted(f for f in (pasta / "trabalhos").glob("*") if f.suffix.lower() in IMAGENS)
    artistas.append({
        "id": pasta.name,
        "nome": dados["nome"],
        "estilos": dados.get("estilos", []),
        "bio": dados.get("bio", ""),
        "instagram": dados.get("instagram", ""),
        "whatsapp": dados.get("whatsapp", ""),
        "ordem": dados.get("ordem", 99),
        "foto": url(perfil) if perfil else "",
        "trabalhos": [url(f) for f in trabalhos],
        "descricoes": [descricao(f) for f in trabalhos],
    })

artistas.sort(key=lambda a: (a["ordem"], a["nome"]))
saida = RAIZ / "artistas.js"
saida.write_text(
    "// Gerado por gerar-artistas.py a partir de conteudo/tatuadores/. Não edite à mão.\n"
    f"const ARTISTAS = {json.dumps(artistas, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
for a in artistas:
    print(f"{a['ordem']}. {a['nome']}: foto {'ok' if a['foto'] else 'FALTANDO'}, {len(a['trabalhos'])} trabalhos")
