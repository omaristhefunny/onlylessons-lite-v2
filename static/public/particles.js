document.addEventListener("DOMContentLoaded", () => {
  try {
    const settings = JSON.parse(localStorage.getItem("uvSettings"));
    if (settings?.disableParticles) {
   
      document.querySelectorAll("canvas, #particles, #particles-js").forEach(c => {
        c.style.display = "none";
      });

      if (window.pJSDom) {
        window.pJSDom.forEach(instance => instance.pJS.particles.move.enable = false);
      }

      if (window.particlesArray && Array.isArray(window.particlesArray)) {
        window.particlesArray = [];
      }
    }
  } catch(e) {
    console.warn("gulp", e);
  }
});
