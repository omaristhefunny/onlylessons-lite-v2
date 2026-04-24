// Panic button - press ` to go to about:blank
document.addEventListener('keydown', (e) => {
  if (e.key === '`') {
    window.location.href = 'about:blank';
  }
});
