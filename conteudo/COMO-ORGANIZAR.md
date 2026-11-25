# Como organizar o conteúdo dos tatuadores

Uma pasta por tatuador dentro de `conteudo/tatuadores/`. Para criar uma, copie a pasta `_modelo` e renomeie.

```
conteudo/tatuadores/
  ana-souza/
    info.json              nome, estilos, bio, Instagram, WhatsApp
    perfil.jpg             foto da pessoa (retrato)
    trabalhos/
      01-fineline-andorinha.jpg
      02-floral-rosas-antebraco.jpg
      03-fineline-floral-costela.jpg
```

## Regras dos nomes
- **Pasta do tatuador:** minúsculas, sem acento e sem espaço, com hífen: `ana-souza`, `joao-pedro`.
- **Trabalhos:** `NN-estilo-descricao.jpg`
  - `NN` é a ordem em que aparece no site (01 é o destaque).
  - Depois vêm o estilo ou os estilos, separados por hífen: `fineline`, `blackwork`, `realismo`, `floral`, `pontilhismo`, `old-school`...
  - Por último, uma descrição curta, que também vira o texto alternativo da imagem (acessibilidade e Google).
- Sem acento, sem espaço e sem maiúscula em nenhum nome de arquivo.

## As fotos
- **Formato:** `.jpg`, `.png` ou `.webp`, de preferência **vertical (4:5)** ou quadrado. O site recorta para caber no layout.
- **Tamanho:** pelo menos **1200 px** no lado maior. Não precisa comprimir: o Next.js otimiza sozinho.
- **Qualidade:** foto da tatuagem cicatrizada ou bem iluminada, sem filtro pesado, sem marca d'água grande.
- **Permissão:** use só fotos que o estúdio autorizou. Se o cliente tatuado aparecer com o rosto, confirme que ele concordou.
- **Quantidade:** de 6 a 12 trabalhos por tatuador. É melhor poucos e excelentes do que muitos medianos.

## O `info.json`
- `estilos`: os estilos principais, que aparecem como etiquetas no card.
- `whatsapp`: só números, com 55 e DDD. Os pedidos de orçamento vão para esse número.
- `ordem`: a posição do tatuador na página (1 aparece primeiro).

A pasta `_modelo` é ignorada pelo site.

## Depois de mexer nas pastas
Rode `python gerar-artistas.py` na raiz do projeto. Ele atualiza o `artistas.js`, que a demo usa.
