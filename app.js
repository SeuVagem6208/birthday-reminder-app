let aniversarios = JSON.parse(localStorage.getItem("aniversarios")) || [];
let grupos = ["Todos","Família","Amigos","Trabalho"];
let temaAtual = 0;

// Paletas de cores
const temas = [
  {bg:"#f2f2f2", text:"#333", header:"#6a0dad", headerText:"#fff", chip:"#ddd", monthBg:"#eee", card:"#fff", accent:"#6a0dad"},
  {bg:"#111", text:"#eee", header:"#333", headerText:"#fff", chip:"#444", monthBg:"#222", card:"#222", accent:"#ff4d4d"},
  {bg:"#fff0f6", text:"#333", header:"#ff69b4", headerText:"#fff", chip:"#ffe6f0", monthBg:"#ffd6eb", card:"#fff", accent:"#ff69b4"},
  {bg:"#0a0a2a", text:"#eee", header:"#1a1a4d", headerText:"#fff", chip:"#333366", monthBg:"#222244", card:"#1a1a4d", accent:"#3399ff"},
  {bg:"#f9f9f9", text:"#222", header:"#3399ff", headerText:"#fff", chip:"#cce6ff", monthBg:"#e6f2ff", card:"#fff", accent:"#3399ff"}
];

function salvar() { localStorage.setItem("aniversarios", JSON.stringify(aniversarios)); }

function mostrar(grupoSelecionado="Todos") {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  let filtrados = grupoSelecionado==="Todos" ? aniversarios : aniversarios.filter(a=>a.grupo===grupoSelecionado);
  let ordenados = [...filtrados].sort((a,b)=> new Date(a.data)-new Date(b.data));
  let mesAtual = "";
  ordenados.forEach((a,i)=>{
    let data = new Date(a.data);
    let mes = data.toLocaleString("pt-BR",{month:"long"});
    let tituloMes = (data.getMonth()===new Date().getMonth()) ? "🎉 Aniversariantes desse mês" : `🎉 Aniversariantes de ${mes}`;
    if(mes!==mesAtual){
      lista.innerHTML += `<div class="mes">${tituloMes}</div>`;
      mesAtual = mes;
    }
    let dias = calcularDias(a.data);
    lista.innerHTML += `<li onclick="abrirPopup(${i})">${a.apelido} - ${formatarAviso(dias)}</li>`;
  });
}

function calcularDias(data){
  let hoje = new Date();
  let aniversario = new Date(data);
  aniversario.setFullYear(hoje.getFullYear());
  if(aniversario<hoje) aniversario.setFullYear(hoje.getFullYear()+1);
  let diff = aniversario-hoje;
  return Math.floor(diff/(1000*60*60*24));
}

function formatarAviso(dias){
  if(dias===0) return "🎉 Hoje às 6h!";
  if(dias===1) return "📢 Amanhã às 9h!";
  if(dias===7) return "⏰ Daqui 7 dias às 9h!";
  if(dias===15) return "🔔 Daqui 15 dias às 9h!";
  if(dias===30) return "📅 Daqui 30 dias às 9h!";
  return `faltam ${dias} dias`;
}

function aplicarTema(){
  let t = temas[temaAtual];
  for(let key in t){ document.documentElement.style.setProperty(`--${key}`,t[key]); }
}

document.getElementById("theme-btn").addEventListener("click",()=>{
  temaAtual = (temaAtual+1)%temas.length;
  aplicarTema();
});

function abrirPopup(i){
  let a = aniversarios[i];
  document.getElementById("apelido").textContent = a.apelido;
  document.getElementById("nome").textContent = a.nome;
  document.getElementById("grupos").textContent = "Grupo: "+a.grupo;
  let dias = calcularDias(a.data);
  document.getElementById("faltam").textContent = `Faltam ${dias} dias`;
  document.getElementById("popup").classList.remove("hidden");
}

document.getElementById("close-popup").addEventListener("click",()=>{
  document.getElementById("popup").classList.add("hidden");
});

aplicarTema();
mostrar();
