// Dados salvos
let aniversarios = JSON.parse(localStorage.getItem("aniversarios")) || [];
let grupos = JSON.parse(localStorage.getItem("grupos")) || ["Todos"];
let idioma = localStorage.getItem("idioma") || "pt";
let editando = null;

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

function salvar(){ localStorage.setItem("aniversarios", JSON.stringify(aniversarios)); }
function aplicarTema(){
  let t = temas[temaAtual];
  document.documentElement.style.setProperty("--bg", t.bg);
  document.documentElement.style.setProperty("--header", t.header);
  document.documentElement.style.setProperty("--card", t.card);
  localStorage.setItem("temaAtual", temaAtual);
}
aplicarTema();

// Sidebar
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

// Grupos (limite de 5)
function atualizarGrupos(){
  const bar = document.getElementById("grupos-bar");
  bar.innerHTML="";
  grupos.forEach(g=>{
    let div=document.createElement("div");
    div.textContent=g;
    div.addEventListener("click",()=>mostrar(g));
    bar.appendChild(div);
  });
  const select=document.getElementById("grupo-input");
  select.innerHTML="";
  grupos.forEach(g=>{
    if(g!=="Todos"){ 
      let opt=document.createElement("option");
      opt.value=g; opt.textContent=g;
      select.appendChild(opt);
    }
  });
  localStorage.setItem("grupos",JSON.stringify(grupos));
}
document.getElementById("add-grupo").addEventListener("click",()=>{
  let novo=document.getElementById("novo-grupo").value;
  if(novo && !grupos.includes(novo) && grupos.length < 5){
    grupos.push(novo); atualizarGrupos();
  }
});
atualizarGrupos();

// Idioma
document.getElementById("lang-pt").addEventListener("click",()=>{
  idioma="pt"; localStorage.setItem("idioma","pt"); mostrar("Todos");
});
document.getElementById("lang-en").addEventListener("click",()=>{
  idioma="en"; localStorage.setItem("idioma","en"); mostrar("Todos");
});

// Abrir popup para adicionar
document.getElementById("add-btn").addEventListener("click",()=>{
  editando = null;
  document.getElementById("form-titulo").textContent = "Adicionar Aniversariante";
  document.getElementById("nome-input").value = "";
  document.getElementById("apelido-input").value = "";
  document.getElementById("data-input").value = "";
  document.getElementById("grupo-input").value = "";
  document.getElementById("aviso-input").value = "30";
  document.getElementById("botoes-edicao").classList.add("hidden");
  document.getElementById("form-popup").classList.remove("hidden");
});

// Fechar popup pelo X
const closeBtn = document.getElementById("close-form");
console.log("Botão X encontrado:", closeBtn); // teste no console

closeBtn.addEventListener("click", () => {
  console.log("Clique no X detectado"); // teste no console
  document.getElementById("form-popup").classList.add("hidden");
});


// Salvar (adicionar ou editar)
document.getElementById("save-btn").addEventListener("click",()=>{
  let nome = document.getElementById("nome-input").value;
  let apelido = document.getElementById("apelido-input").value;
  let data = document.getElementById("data-input").value;
  let grupo = document.getElementById("grupo-input").value || "Todos";
  let aviso = document.getElementById("aviso-input").value;

  if(editando){
    editando.nome = nome;
    editando.apelido = apelido;
    editando.data = data;
    editando.grupo = grupo;
    editando.aviso = aviso;
  } else {
    aniversarios.push({nome,apelido,data,grupo,aviso});
  }

  salvar();
  mostrar("Todos");
  document.getElementById("form-popup").classList.add("hidden");
});

// Excluir
document.getElementById("excluir-btn").addEventListener("click",()=>{
  if(editando){
    aniversarios = aniversarios.filter(p=>p!==editando);
    salvar();
    mostrar("Todos");
    document.getElementById("form-popup").classList.add("hidden");
  }
});

// Mostrar lista
function mostrar(filtro="Todos"){
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  let filtrados = filtro==="Todos" ? aniversarios : aniversarios.filter(a=>a.grupo===filtro);
  let ordenados = [...filtrados].sort((a,b)=> new Date(a.data)-new Date(b.data));
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
    agrupados[m].forEach((a)=>{
      let hoje=new Date();
      let aniversario=new Date(a.data);
      aniversario.setFullYear(hoje.getFullYear());
      if(aniversario<hoje) aniversario.setFullYear(hoje.getFullYear()+1);
      let dias=Math.floor((aniversario-hoje)/(1000*60*60*24));
      let texto = dias<=7 ? `Faltam ${dias} dias` : `Dia ${aniversario.getDate()}`;
      let card=document.createElement("div");
      card.className="card";
      card.textContent=`${a.apelido} - ${texto}`;
      card.addEventListener("mousedown",()=>abrirEdicao(a));
      lista.appendChild(card);
    });
  });
}

// Abrir popup para editar
function abrirEdicao(pessoa){
  editando = pessoa;
  document.getElementById("form-titulo").textContent = "Editar Aniversariante";
  document.getElementById("nome-input").value = pessoa.nome;
  document.getElementById("apelido-input").value = pessoa.apelido;
  document.getElementById("data-input").value = pessoa.data;
  document.getElementById("grupo-input").value = pessoa.grupo;
  document.getElementById("aviso-input").value = pessoa.aviso;
  document.getElementById("botoes-edicao").classList.remove("hidden");
  document.getElementById("form-popup").classList.remove("hidden");
}

// Inicialização
mostrar("Todos");
