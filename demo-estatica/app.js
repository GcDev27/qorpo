// Monta o site a partir de dados.js
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const preenchido = (v) => Boolean(v) && !String(v).includes("[");
const iniciais = (nome, i) => (preenchido(nome) ? nome.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase() : `T${i + 1}`);
const linkInsta = (u) => `https://instagram.com/${String(u).replace(/^@/, "")}`;

function foto(src, rotulo) {
  return src
    ? `<div class="foto"><img src="${esc(src)}" alt="${esc(rotulo)}" loading="lazy"></div>`
    : `<div class="foto vazia" role="img" aria-label="${esc(rotulo)}"><span>${esc(rotulo)}</span></div>`;
}

// Hero e folha de flash
$("heroSobre").textContent = ESTUDIO.sobre;
$("flash").innerHTML = ARTISTAS.slice(0, 4).map((a, i) => {
  const capa = a.trabalhos[0] || a.foto;
  return `<div class="flash-item">${foto(capa, iniciais(a.nome, i))}<small>${esc(a.estilos[0] || "")}</small></div>`;
}).join("");

// Faixa de estilos (duplicada para rolar sem emenda)
const estilos = [...new Set(ARTISTAS.flatMap((a) => a.estilos))];
const itens = estilos.map((e) => `<span>${esc(e)}</span>`).join("");
$("faixa").innerHTML = itens + itens;

// Tatuadores
$("listaArtistas").innerHTML = ARTISTAS.map((a, i) => {
  const galeria = (a.trabalhos.length ? a.trabalhos : Array(6).fill(""))
    .map((src, j) => foto(src, a.descricoes?.[j] ? `Tatuagem de ${a.nome}: ${a.descricoes[j]}` : `Trabalho ${j + 1}`)).join("");
  return `
    <article class="artista" id="${esc(a.id)}">
      ${foto(a.foto, iniciais(a.nome, i))}
      <div class="artista-corpo">
        <h3>${esc(a.nome)}</h3>
        <ul class="estilos">${a.estilos.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
        <p>${esc(a.bio)}</p>
        <div class="artista-acoes">
          <a href="#orcamento" class="btn btn-tinta" data-orcar="${esc(a.id)}">Orçar com ${esc(preenchido(a.nome) ? a.nome.split(" ")[0] : "este tatuador")}</a>
          ${preenchido(a.instagram) ? `<a href="${esc(linkInsta(a.instagram))}" class="btn btn-linha" target="_blank" rel="noopener">Instagram</a>` : ""}
        </div>
        <details>
          <summary>Ver trabalhos</summary>
          <div class="galeria">${galeria}</div>
        </details>
      </div>
    </article>`;
}).join("");

// "Orçar com" já deixa o tatuador escolhido no formulário
document.addEventListener("click", (e) => {
  const alvo = e.target.closest("[data-orcar]");
  if (alvo) $("fArtista").value = alvo.dataset.orcar;
});

// Formulário de orçamento
$("fArtista").innerHTML = '<option value="">Ainda não sei, me ajudem a escolher</option>' +
  ARTISTAS.map((a) => `<option value="${esc(a.id)}">${esc(a.nome)} · ${esc(a.estilos.join(", "))}</option>`).join("");
$("fTamanho").innerHTML = TAMANHOS.map((t) => `<option>${esc(t)}</option>`).join("");
$("fLocal").innerHTML = LOCAIS.map((l) => `<option>${esc(l)}</option>`).join("");

$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const artista = ARTISTAS.find((a) => a.id === $("fArtista").value);
  const nome = $("fNome").value.trim();
  const ideia = $("fIdeia").value.trim();
  const saudacao = artista && preenchido(artista.nome) ? `Oi, ${artista.nome.split(" ")[0]}!` : "Oi, pessoal do Qorpo!";
  const linhas = [
    `${saudacao} ${nome ? `Aqui é ${nome}, vim` : "Vim"} pelo site e quero orçar uma tatuagem.`,
    "",
    `Ideia: ${ideia || "(vou explicar aqui na conversa)"}`,
    `Tamanho: ${$("fTamanho").value}`,
    `Local do corpo: ${$("fLocal").value}`,
    $("fRef").checked ? "Tenho fotos de referência e vou mandar aqui." : "Ainda não tenho referência.",
  ];
  const texto = linhas.join("\n");
  const numero = artista && preenchido(artista.whatsapp) ? artista.whatsapp : ESTUDIO.whatsapp;

  if (preenchido(numero)) {
    window.open(`https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    $("previaTitulo").textContent = "Abrimos o WhatsApp com esta mensagem:";
  } else {
    $("previaTitulo").textContent = "Demonstração: com o número cadastrado, esta mensagem abre direto no WhatsApp do tatuador.";
  }
  $("previaTexto").textContent = texto;
  $("previa").hidden = false;
});

// Cuidados e dúvidas
$("listaCuidados").innerHTML = CUIDADOS.map(([t, d]) => `<div class="cuidado"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");
$("listaPerguntas").innerHTML = PERGUNTAS.map(([p, r]) => `<details><summary>${esc(p)}</summary><p>${esc(r)}</p></details>`).join("");

// Visite
$("visiteNome").textContent = ESTUDIO.nomeCompleto;
$("endereco").textContent = ESTUDIO.endereco;
$("linkMapa").href = ESTUDIO.linkMapa;
$("linkInsta").href = linkInsta(ESTUDIO.instagram);
$("horarios").innerHTML = ESTUDIO.horarios.map(([d, h]) => `<div><dt>${esc(d)}</dt><dd>${esc(h)}</dd></div>`).join("");
$("anoRodape").textContent = new Date().getFullYear();
