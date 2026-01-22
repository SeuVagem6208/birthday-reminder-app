let aniversarios = JSON.parse(localStorage.getItem("aniversarios")) || [];

function salvar() {
  localStorage.setItem("aniversarios", JSON.stringify(aniversarios));
}

function mostrar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  aniversarios.forEach((a, i) => {
    lista.innerHTML += `<li>${a.nome} - ${a.data} (${a.grupo})
      <button onclick="remover(${i})">Excluir</button></li>`;
  });
}

function remover(i) {
  aniversarios.splice(i, 1);
  salvar();
  mostrar();
}

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  let nome = document.getElementById("nome").value;
  let data = document.getElementById("data").value;
  let grupo = document.getElementById("grupo").value;
  aniversarios.push({nome, data, grupo});
  salvar();
  mostrar();
});

mostrar();
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

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

verificarAniversariosHoje();
