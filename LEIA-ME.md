# Site do Estúdio Qorpo

Landing page em Next.js com abertura animada (a logo é tatuada na tela e o scroll entra no sol), uma seção por tatuador e pedido de orçamento que abre no WhatsApp do tatuador escolhido.

## Rodar no computador
```bash
npm install
npm run dev
```
e abra http://localhost:3000

## Onde fica cada coisa
- `conteudo/tatuadores/`: uma pasta por tatuador (veja `conteudo/COMO-ORGANIZAR.md`). O site lê essas pastas sozinho, e as fotos são copiadas para `public/tatuadores` antes do `dev` e do `build`.
- `conteudo/marca/logo.png`: a logo original. A versão vetorial, usada na animação, fica em `lib/sol.ts`.
- `lib/estudio.ts`: endereço, horários, WhatsApp geral, perguntas frequentes e cuidados. Campos com `[colchetes]` ainda precisam ser confirmados com o estúdio.
- `components/Abertura.tsx`: a animação de abertura (GSAP + ScrollTrigger).
- `components/Animacoes.tsx`: as animações de rolagem, ligadas por atributos `data-revelar`, `data-grupo`, `data-tinta` e `data-parallax`.
- `demo-estatica/`: a primeira versão, em HTML puro, guardada só como referência.

Quem tem "reduzir movimento" ligado no sistema vê o site sem a abertura animada nem a rolagem suave.

## Publicar na Vercel
1. Crie um repositório no GitHub com esta pasta.
2. Na Vercel: **Add New → Project →** importe o repositório → **Deploy**.
3. Depois que o estúdio aprovar e comprar o domínio, conecte em **Settings → Domains**.

Enquanto for só uma prévia, não divulgue o link como se fosse o site oficial do estúdio.
