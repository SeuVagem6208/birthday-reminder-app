let aniversarios = JSON.parse(localStorage.getItem("aniversarios")) || [];
let temaAtual = localStorage.getItem("temaAtual") || 0;

const temas = [
  {bg:"#629293", header:"#4f7d7e", card:"#8eb0b1"},
  {bg:"#f4b6c2", header:"#d48ca3", card:"#f8d6dd"},
  {bg:"#cbb4d4", header:"#a88db5", card:"#e2d3e9"},
  {bg:"#a3d9c9", header:"#7fb8a8", card:"#ccebe1"}
];

function salvar() { localStorage.setItem("aniversarios", JSON.stringify(aniversarios)); }

function aplicarTema(){
  let t = temas[temaAtual];
  document.documentElement.style.setProperty("--bg", t.bg);
  document.documentElement.style.setProperty("--header", t.header);
  document.documentElement.style.setProperty("--card", t.card);
  localStorage.setItem("temaAtual", temaAtual);
}

document.getElementById("theme-btn").addEventListener("click",()=>{
  temaAtual = (parseInt(temaAtual)+1)%temas.length;
  aplicarTema();
});

function mostrar(){
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  let ordenados = [...aniversarios].sort((a,b)=> new Date(a.data)-new Date(b.data));
  let mesAtual = "";
  ordenados.forEach((a,i)=>{
    let data = new Date(a.data);
    let mes = data.toLocaleString("pt-BR",{month:"long"});
    if(mes!==mesAtual){
      lista.innerHTML += `<div class="mes">Aniversariantes de ${mes}</div>`;
      mesAtual = mes;
    }
    lista.innerHTML += `<div class="card" onclick="abrirPopup(${i})">${a.apelido} - ${data.toLocaleDateString()}</div>`;
  });
}

function abrirPopup(i){
  let a = aniversarios[i];
  document.getElementById("apelido").textContent = a.apelido;
  document.getElementById("nome").textContent = a.nome;
  document.getElementById("grupos").textContent = "Grupo: "+a.grupo;
  let hoje = new Date();
  let aniversario = new Date(a.data);
  aniversario.setFullYear(hoje.getFullYear());
  if(aniversario<hoje) aniversario.setFullYear(hoje.getFullYear()+1);
  let dias = Math.floor((aniversario-hoje)/(1000*60*60*24));
  document.getElementById("faltam").textContent = `Faltam ${dias} dias`;
  document.getElementById("popup").classList.remove("hidden");
}

document.getElementById("close-popup").addEventListener("click",()=>{
  document.getElementById("popup").classList.add("hidden");
});

document.getElementById("add-btn").addEventListener("click",()=>{
  document.getElementById("form-container").classList.remove("hidden");
});

document.getElementById("save-btn").addEventListener("click",()=>{
  let nome = document.getElementById("nome-input").value;
  let apelido = document.getElementById("apelido-input").value;
  let data = document.getElementById("data-input").value;
  let grupo = document.getElementById("grupo-input").value;
  aniversarios.push({nome,apelido,data,grupo});
  salvar();
  mostrar();
  document.getElementById("form-container").classList.add("hidden");
});

aplicarTema();
mostrar();
