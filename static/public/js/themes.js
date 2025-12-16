
const themes = {
  default: {
    name: 'Default Teal',
    colors: {
      '--bg-primary': '#121e1e',
      '--bg-secondary': '#1b2d2d',
      '--bg-tertiary': '#162424',
      '--bg-quaternary': '#1c2f2f',
      '--bg-footer': 'rgba(27, 45, 45, 0.85)',
      '--bg-modal': 'rgba(18, 30, 30, 0.85)',
      '--bg-modal-content': 'rgba(27, 45, 45, 0.95)',
      '--bg-overlay': 'rgba(18, 30, 30, 0.9)',
      '--border-primary': '#1f3434',
      '--border-secondary': '#203b3b',
      '--border-tertiary': '#213838',
      '--border-accent': '#2d5c5c',
      '--accent-primary': '#111d1d',
      '--accent-secondary': '#223d3d',
      '--accent-hover': '#1e4141',
      '--accent-active': '#216060'
    }
  },
  ocean: {
    name: 'Ocean Blue',
    colors: {
      '--bg-primary': '#0a1628',
      '--bg-secondary': '#132a4a',
      '--bg-tertiary': '#0f1f3a',
      '--bg-quaternary': '#1a2f52',
      '--bg-footer': 'rgba(19, 42, 74, 0.85)',
      '--bg-modal': 'rgba(10, 22, 40, 0.85)',
      '--bg-modal-content': 'rgba(19, 42, 74, 0.95)',
      '--bg-overlay': 'rgba(10, 22, 40, 0.9)',
      '--border-primary': '#1e3a5f',
      '--border-secondary': '#2c5282',
      '--border-tertiary': '#1a4d7a',
      '--border-accent': '#3182ce',
      '--accent-primary': '#0c1a2e',
      '--accent-secondary': '#2a5885',
      '--accent-hover': '#2563eb',
      '--accent-active': '#1e40af'
    }
  },
  frogies: {
    name: 'Frogies Arcade',
    colors: {
      '--bg-primary': '#0e0e0e',
      '--bg-secondary': '#1a1a1a',
      '--bg-tertiary': '#080808',
      '--bg-quaternary': '#141414',
      '--bg-footer': 'rgba(29, 29, 29, 0.7)',
      '--bg-modal': 'rgba(14, 14, 14, 0.85)',
      '--bg-modal-content': 'rgba(58, 58, 58, 0.18)',
      '--bg-overlay': 'rgba(0, 0, 0, 0.425)',
      '--border-primary': '#00ff9d',
      '--border-secondary': '#3b3b3b',
      '--border-tertiary': '#00ff95',
      '--border-accent': '#45ffb8',
      '--accent-primary': '#2a996e',
      '--accent-secondary': '#81bb92',
      '--accent-hover': '#00ff9d',
      '--accent-active': '#00ff95',
    }
  }
};
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  localStorage.setItem('selectedTheme', themeName);
  if (typeof updatePreview === 'function') {
    updatePreview(themeName);
  }
}
function updatePreview(themeName) {
  const theme = themes[themeName];
  const previewBox = document.getElementById('themePreview');
  if (!previewBox || !theme) return;
  const mainColors = [
    theme.colors['--bg-primary'],
    theme.colors['--bg-secondary'],
    theme.colors['--border-primary'],
    theme.colors['--accent-hover'],
    theme.colors['--accent-active']
  ];
  previewBox.innerHTML = mainColors.map(color => 
    `<div class="theme-color-dot" style="background: ${color};"></div>`
  ).join('');
}
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  applyTheme(savedTheme);
}
function initializeThemeSelector() {
  const dropdown = document.getElementById('themeDropdown');
  if (!dropdown) return; 
  Object.entries(themes).forEach(([key, theme]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = theme.name;
    dropdown.appendChild(option);
  });
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  dropdown.value = savedTheme;
  dropdown.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  });
}
loadSavedTheme();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeThemeSelector);
} else {
  initializeThemeSelector();
}