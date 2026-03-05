// Theme Management Module
const themes = {
    salmao: {
        primary: '#ff6f61',
        secondary: '#f8c471',
        background: '#ffffff',
        text: '#333333',
    },
    maca: {
        primary: '#e74c3c',
        secondary: '#2ecc71',
        background: '#ffffff',
        text: '#333333',
    },
    ceu: {
        primary: '#3498db',
        secondary: '#1abc9c',
        background: '#ffffff',
        text: '#333333',
    },
    folhas: {
        primary: '#27ae60',
        secondary: '#f1c40f',
        background: '#ffffff',
        text: '#333333',
    },
    lavanda: {
        primary: '#9b59b6',
        secondary: '#8e44ad',
        background: '#ffffff',
        text: '#333333',
    },
    outono: {
        primary: '#e67e22',
        secondary: '#d35400',
        background: '#ffffff',
        text: '#333333',
    }
};

// Function to get a theme by name
function getTheme(themeName) {
    return themes[themeName] || themes['salmao']; // Default to 'salmao'
}

// Export the theme module
export { getTheme };