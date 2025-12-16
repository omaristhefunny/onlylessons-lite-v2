(function() {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme && savedTheme !== 'default') {
    const themes = {
      ocean: {
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
    const theme = themes[savedTheme];
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    }
  }
})();