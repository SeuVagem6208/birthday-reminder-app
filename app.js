// Carregar aniversários salvos
let aniversarios = JSON.parse(localStorage.getItem("aniversarios")) || [];
let editIndex = null;

// Salvar no localStorage
function salvar() {
  localStorage.setItem("aniversarios", JSON.stringify(aniversarios));
}

// Mostrar lista
function mostrar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  aniversarios.forEach((a, i) => {
    let cor = a.importancia === "Alta" ? "#ff4d4d" : a.importancia === "Média" ? "#ffcc00" : "#66cc66";

    lista.innerHTML += `
      <li style="border-left: 8px solid ${cor}">
        <strong>${a.nome}</strong> - ${a.data} <br>
        Grupo: ${a.grupo} | Importância: ${a.importancia}
        <br>
        <button onclick="editar(${i})">Editar</button>
        <button onclick="remover(${i})">Excluir</button>
      </li>
    `;
  });
}

// Remover
function remover(i) {
  aniversarios.splice(i, 1);
  salvar();
  mostrar();
}

// Editar
function editar(i) {
  const a = aniversarios[i];
  document.getElementById("nome").value = a.nome;
  document.getElementById("data").value = a.data;
  document.getElementById("grupo").value = a.grupo;
  document.getElementById("importancia").value = a.importancia;
  editIndex = i;
}

// Adicionar ou atualizar
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  let nome = document.getElementById("nome").value;
  let data = document.getElementById("data").value;
  let grupo = document.getElementById("grupo").value;
  let importancia = document.getElementById("importancia").value;

  if (editIndex !== null) {
    aniversarios[editIndex] = {nome, data, grupo, importancia};
    editIndex = null;
  } else {
    aniversarios.push({nome, data, grupo, importancia});
  }

  salvar();
  mostrar();
  document.getElementById("form").reset();
});

// Notificações de aniversários do dia
function verificarAniversariosHoje() {
  let hoje = new Date().toISOString().slice(5, 10); // formato MM-DD
  aniversarios.forEach(a => {
    if (a.data.slice(5, 10) === hoje) {
      if (Notification.permission === "granted") {
        new Notification(`🎉 Hoje é aniversário de ${a.nome}!`);
      }
    }
  });
}

// Pedir permissão para notificações
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Inicializar
mostrar();
verificarAniversariosHoje();
