// Dados salvos
let aniversarios = JSON.parse(localStorage.getItem("aniversarios")) || [];
let grupos = JSON.parse(localStorage.getItem("grupos")) || ["Amigos", "Família"];
let idioma = localStorage.getItem("idioma") || "pt";

// Temas
const temas = {
  salmao:{bg:"#f4b6a0",header:"#e28c6f",card:"#f9d6c9"},
  maca:{bg:"#f4a6b6",header:"#d47c8c",card:"#f9c9d6"},
  ceu:{bg:"#a6c8f4",header:"#7ca3d4",card:"#c9dcf9"},
  folhas:{bg:"#a6f4c8",header:"#7cd48c",card:"#c9f9dc"},
  lavanda:{bg:"#c8a6f4",header:"#a37cd4",card:"#dcc9f9"},
  outono:{bg:"#f4e1a6",header:"#d4c07c",card:"#f9e9c9"}
};
let temaAtual = localStorage.getItem("temaAtual") || "ceu";

// Funções de persistência
function salvar() {
  localStorage.setItem("aniversarios", JSON.stringify(aniversarios));
}
function aplicarTema(){
  let t = temas[temaAtual];
  document.documentElement.style.setProperty("--bg", t.bg);
  document.documentElement.style.setProperty("--header", t.header);
  document.documentElement.style.setProperty("--card", t.card);
  localStorage.setItem("temaAtual", temaAtual);
}
aplicarTema();

// Sidebar toggle
document.getElementById("config-btn").addEventListener("click",()=>{
  document.getElementById("sidebar").classList.toggle("hidden");
});

// Temas
document.querySelectorAll("#temas-list li").forEach(li=>{
  li.addEventListener("click",()=>{
    temaAtual = li.dataset.tema;
    aplicarTema();
  });
});

// Grupos
function atualizarGrupos(){
  const bar = document.getElementById("grupos-bar");
  bar.innerHTML="";
  grupos.forEach(g=>{
    let div=document.createElement("div");
    div.textContent=g;
    bar.appendChild(div);
  });
  const select=document.getElementById("grupo-input");
  select.innerHTML="";
  grupos.forEach(g=>{
    let opt=document.createElement("option");
    opt.value=g; opt.textContent=g;
    select.appendChild(opt);
  });
  localStorage.setItem("grupos",JSON.stringify(grupos));
}
document.getElementById("add-grupo").addEventListener("click",()=>{
  let novo=document.getElementById("novo-grupo").value;
  if(novo){grupos.push(novo); atualizarGrupos();}
});
atualizarGrupos();

// Idioma
document.getElementById("lang-pt").addEventListener("click",()=>{
  idioma="pt"; localStorage.setItem("idioma","pt"); mostrar();
});
document.getElementById("lang-en").addEventListener("click",()=>{
  idioma="en"; localStorage.setItem("idioma","en"); mostrar();
});

// Adicionar pessoa
document.getElementById("add-btn").addEventListener("click",()=>{
  document.getElementById("form-popup").classList.remove("hidden");
});
document.getElementById("close-form").addEventListener("click",()=>{
  document.getElementById("form-popup").classList.add("hidden");
});
document.getElementById("save-btn").addEventListener("click",()=>{
  let nome = document.getElementById("nome-input").value;
  let apelido = document.getElementById("apelido-input").value;
  let data = document.getElementById("data-input").value;
  let grupo = document.getElementById("grupo-input").value;
  let aviso = document.getElementById("aviso-input").value;
  aniversarios.push({nome,apelido,data,grupo,aviso});
  salvar();
  mostrar();
  document.getElementById("form-popup").classList.add("hidden");
});

// Mostrar lista
function mostrar(){
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  let ordenados = [...aniversarios].sort((a,b)=> new Date(a.data)-new Date(b.data));
  let meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  let agrupados = {};
  ordenados.forEach(a=>{
    let d=new Date(a.data);
    let m=d.getMonth();
    if(!agrupados[m]) agrupados[m]=[];
    agrupados[m].push(a);
  });
  Object.keys(agrupados).sort((a,b)=>a-b).forEach(m=>{
    lista.innerHTML += `<div class="mes">${meses[m]}</div>`;
    agrupados[m].forEach((a,i)=>{
      let hoje=new Date();
      let aniversario=new Date(a.data);
      aniversario.setFullYear(hoje.getFullYear());
      if(aniversario<hoje) aniversario.setFullYear(hoje.getFullYear()+1);
      let dias=Math.floor((aniversario-hoje)/(1000*60*60*24));
      let texto = dias<=7 ? `Faltam ${dias} dias` : `Dia ${aniversario.getDate()}`;
      lista.innerHTML += `<div class="card" onmousedown="abrirPopup(${i})">${a.apelido} - ${texto}</div>`;
    });
  });
}

// Popup pessoa
function abrirPopup(i){
  let a = aniversarios[i];
  document.getElementById("apelido").textContent = a.apelido;
  document.getElementById("nome").textContent = a.nome;
  let idade = new Date().getFullYear() - new Date(a.data).getFullYear();
  document.getElementById("idade").textContent = `Idade: ${idade}`;
  document.getElementById("grupo").textContent = "Grupo: "+a.grupo;
  let hoje=new Date();
  let aniversario=new Date(a.data);
  aniversario.setFullYear(hoje.getFullYear());
  if(aniversario<hoje) aniversario.setFullYear(hoje.getFullYear()+1);
  let dias=Math.floor((aniversario-hoje)/(1000*60*60*24));
  document.getElementById("faltam").textContent = dias<=7 ? `Faltam ${dias} dias` : `Dia ${aniversario.getDate()}`;
  document.getElementById("popup").classList.remove("hidden");
}
document.getElementById("close-popup").addEventListener("click",()=>{
  document.getElementById("popup").classList.add("hidden");
});

// Inicialização
mostrar();
