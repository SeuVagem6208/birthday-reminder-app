// localStorage management functions for aniversarios, grupos, idioma, and temaAtual

// Function to set an item in localStorage
function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function to get an item from localStorage
function getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Function to remove an item from localStorage
function removeItem(key) {
    localStorage.removeItem(key);
}

// Function to manage aniversarios
function setAniversarios(aniversarios) {
    setItem('aniversarios', aniversarios);
}

function getAniversarios() {
    return getItem('aniversarios') || [];
}

// Function to manage grupos
function setGrupos(grupos) {
    setItem('grupos', grupos);
}

function getGrupos() {
    return getItem('grupos') || [];
}

// Function to manage idioma
function setIdioma(idioma) {
    setItem('idioma', idioma);
}

function getIdioma() {
    return getItem('idioma') || 'default';
}

// Function to manage temaAtual
function setTemaAtual(tema) {
    setItem('temaAtual', tema);
}

function getTemaAtual() {
    return getItem('temaAtual') || 'light';
}