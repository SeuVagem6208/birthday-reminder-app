// Lista de aniversários e grupos
let aniversarios = JSON.parse(localStorage.getItem("aniversarios")) || [];
let grupos = ["Todos","Família","Amigos","Trabalho"];
let editIndex = null;

// Paletas de cores
let temaAtual = 0;
const temas = [
  // Tema 1: Claro padrão
  {bg:"#f2f2f2", text:"#333", header:"#6a0dad", headerText:"#fff", chip:"#ddd", monthBg:"#eee", card:"#fff", accent:"#6a0dad"},
  
  // Tema 2: Escuro neutro
  {bg:"#111", text:"#eee", header:"#333", headerText:"#fff", chip:"#444", monthBg:"#222", card:"#222", accent:"#ff4d4d"},
  
  // Tema 3: Claro fofinho (rosa claro + preto)
  {bg:"#fff0f6", text:"#333", header:"#ff69b4", headerText:"#fff", chip:"#ffe6f0", monthBg:"#ffd6eb", card:"#fff", accent:"#ff69b4"},
  
  // Tema 4: Escuro elegante (azul escuro + branco)
  {bg:"#0a0a2a", text:"#eee", header:"#1a1a4d", headerText:"#fff", chip:"#333366", monthBg:"#222244", card:"#1a1a4d", accent:"#3399ff"},
  
  // Tema 5: Claro minimalista (cinza + azul suave)
  {bg:"#f9f9f9", text:"#222", header:"#3399ff", headerText:"#fff", chip:"#cce6ff", monthBg:"#e6f2ff", card:"#fff", accent:"#3399ff"}
];

// Salvar no localStorage
function salvar() {
  localStorage.setItem("aniversarios", JSON.stringify(aniversarios));
}

// Mostrar lista de aniversários
function mostrar(grupoSelecionado="Todos") {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  let filtrados = grupoSelecionado==="Todos" ? aniversarios : aniversarios.filter(a=>a.grupo===grupoSelecionado);
  let ordenados = [...filtrados].sort((a,b)=> new Date(a.data)-new Date(b.data));
  let mesAtual = "";
  ordenados.forEach((a,i)=>{
    let data = new Date(a.data);
    let mes = data.toLocaleString("pt-BR",{month:"long"});
    if(mes!==mesAtual){
      lista.innerHTML += `<div class="mes">${mes}</div>`;
      mesAtual = mes;
    }
    let dias = calcularDias(a.data);
    lista.innerHTML += `<li onclick="abrirPopup(${i})">${a.apelido} - ${formatarAviso(dias,a.categoria)}</li>`;
  });
}

// Calcular dias até o aniversário
function calcularDias(data){
  let hoje = new Date();
  let aniversario = new Date(data);
  aniversario.setFullYear(hoje.getFullYear());
  if(aniversario<hoje) aniversario.setFullYear(hoje.getFullYear()+1);
  let diff = aniversario-hoje;
  return Math.floor(diff/(1000*60*60*24));
}

// Formatar aviso conforme categoria
function formatarAviso(dias,categoria){
  if(categoria==="30dias" && dias<=30) return `faltam ${dias} dias!`;
  if(categoria==="7dias" && dias<=7) return `faltam ${dias} dias!`;
  if(categoria==="1dia" && dias<=1) return `é amanhã! 🎉`;
  return "";
}

// Aplicar tema
function aplicarTema(){
  let t = temas[temaAtual];
  for(let key in t){ document.documentElement.style.setProperty(`--${key}`,t[key]); }
}

// Alternar tema
document.getElementById("theme-btn").addEventListener("click",()=>{
  temaAtual = (temaAtual+1)%temas.length;
  aplicarTema();
});

// Abrir popup da pessoa
function abrirPopup(i){
  let a = aniversarios[i];
  document.getElementById("apelido").textContent = a.apelido;
  document.getElementById("nome").textContent = a.nome;
  document.getElementById("grupos").textContent = "Grupo: "+a.grupo;
  let dias = calcularDias(a.data);
  let meses = Math.floor(dias/30);
  let resto = dias%30;
  document.getElementById("faltam").textContent = `Faltam ${meses} meses e ${resto} dias`;
  document.getElementById("popup").classList.remove("hidden");
}

// Fechar popup
document.getElementById("close-popup").addEventListener("click",()=>{
  document.getElementById("popup").classList.add("hidden");
});

// Inicializar
aplicarTema();
mostrar();
