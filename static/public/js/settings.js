/* these settings are a work from korona.lat, credits to them. */
document.addEventListener("DOMContentLoaded", function () {

  const CLOAK_OPTIONS = {
    default: { title: "Apps | OnlyLessons", favicon: "/images/onlylessons.png" },
    quizlet:            { title: "Your Sets | Quizlet",       favicon: "https://quizlet.com/favicon.ico" },
    google:             { title: "Google",                     favicon: "https://www.google.com/favicon.ico" },
    "google-classroom": { title: "Home | Google Classroom",   favicon: "https://ssl.gstatic.com/classroom/favicon.png" },
    "google-docs":      { title: "Google Docs",                favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
    "google-drive":     { title: "Google Drive",               favicon: "https://ssl.gstatic.com/docs/documents/images/icons/ic_menu_docs_new_48px.svg" },
    "peardeck":         { title: "Pear Deck",                   favicon: "https://cdn.peardeck.com/favicon.ico" },
    "khan-academy":     { title: "Khan Academy",               favicon: "https://www.khanacademy.org/favicon.ico" },
    wikipedia:          { title: "Wikipedia",                  favicon: "https://en.wikipedia.org/favicon.ico" },
    youtube:            { title: "YouTube",                    favicon: "https://www.youtube.com/favicon.ico" },
    outlook:            { title: "Inbox - Outlook",            favicon: "https://outlook.live.com/favicon.ico" },
    ixl:                { title: "IXL | Math, Language Arts, Science, Social Studies, and Spanish", favicon: "https://www.ixl.com/favicon.ico" },
    classroom:          { title: "Canvas",                     favicon: "https://www.instructure.com/favicon.ico" },
    powerschool:        { title: "PowerSchool",                favicon: "https://www.powerschool.com/favicon.ico" },
  };

  // Auto-apply tab cloak on all pages if user has set one
  (function() {
    const savedCloak = localStorage.getItem("tabCloak");
    if (savedCloak && savedCloak !== "default") {
      const opt = CLOAK_OPTIONS[savedCloak];
      if (opt) {
        document.title = opt.title;
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = opt.favicon;
      }
    }
  })();

  const THEME_COLORS = {
    default: { particle: '#c084fc', text: '#d8b4fe' },
    miku: { particle: '#4ae7ff', text: '#b4e7fe' },
    teto: { particle: '#ff4a8a', text: '#feb4d4' },
    neru: { particle: '#ffca4a', text: '#fed4b4' },
    magma: { particle: '#ff8a4a', text: '#fec4b4' },
    awp: { particle: '#64966e', text: '#e1f0e6' },
    minty: { particle: '#5fffa0', text: '#e8fff4' },
    frogie: { particle: '#00ff9d', text: '#fff' },
    konata: { particle: '#99bf6c', text: '#d9e7c7' },
  };

  const THEME_IMAGES = {
    miku: '/css/themes/miku.png',
    teto: '/css/themes/teto.png',
    neru: '/css/themes/neru.png',
    frogie: '/css/themes/frog.gif',
    konata: '/css/themes/konata.webp'
  };

  function applyCloak(key) {
    const opt = CLOAK_OPTIONS[key] || CLOAK_OPTIONS["quizlet"];
    document.title = opt.title;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = opt.favicon;
  }

  const tabCloakSelect = document.getElementById("tabCloakSelect");
  if (tabCloakSelect) {
    const savedCloak = localStorage.getItem("tabCloak") || "quizlet";
    tabCloakSelect.value = savedCloak;
    applyCloak(savedCloak);

    tabCloakSelect.addEventListener("change", () => {
      const val = tabCloakSelect.value;
      localStorage.setItem("tabCloak", val);
      applyCloak(val);
      showToast("Tab cloak updated!");
      setTimeout(() => window.top.location.reload(), 500);
    });
  }
  function applyTheme(themeName) {
    let themeLink = document.getElementById("theme-link");
    
    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.id = "theme-link";
      themeLink.rel = "stylesheet";
      document.head.appendChild(themeLink);
    }
    
    if (themeName && themeName !== "default") {
      themeLink.href = `/css/themes/${themeName}.css`;
    } else {
      themeLink.href = "";
    }
    
    updateCornerImage(themeName);
    updateParticleColor(themeName);
  }

  function updateCornerImage(themeName) {
    const imgEl = document.getElementById("cornerImage");
    if (!imgEl) return;
    
    if (THEME_IMAGES[themeName]) {
      imgEl.src = THEME_IMAGES[themeName];
      imgEl.style.display = 'block';
      imgEl.style.visibility = 'visible';
      imgEl.style.opacity = '1';
      imgEl.onerror = function() {
        console.warn('failed to load the image for theme: ' + themeName + ' i have fallen, and i cant get up!');
        imgEl.style.display = 'none';
      };
    } else {
      imgEl.style.display = 'none';
    }
  }

  function updateParticleColor(themeName) {
    const colors = THEME_COLORS[themeName] || THEME_COLORS.default;
    window.particleColor = colors.particle;
    
    if (window.pJS && window.pJS.particles) {
      window.pJS.particles.color.value = colors.particle;
      window.pJS.particles.line_linked.color = colors.particle;
    }
  }

  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) {
    const savedTheme = localStorage.getItem("selectedTheme") || "default";
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    themeSelect.addEventListener("change", () => {
      const val = themeSelect.value;
      localStorage.setItem("selectedTheme", val);
      applyTheme(val);
      showToast("Theme updated!");
      setTimeout(() => window.location.reload(), 500);
    });
  }


  function toggleParticles(enabled) {
    const particlesEl = document.getElementById("particles-js");
    if (!particlesEl) return;
    
    if (enabled) {
      particlesEl.style.display = 'block';
      particlesEl.innerHTML = '<canvas class="particles-js-canvas-el"></canvas>';
      const savedTheme = localStorage.getItem("selectedTheme") || "default";
      const colors = THEME_COLORS[savedTheme] || THEME_COLORS.default;
      

      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: colors.particle },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: colors.particle,
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' },
              resize: true
            },
            modes: {
              grab: { distance: 200, line_linked: { opacity: 1 } },
              bubble: { distance: 200, size: 40, duration: 0.4 },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 }
            }
          },
          retina_detect: true
});
      }
    } else {
      particlesEl.style.display = 'none';
      particlesEl.innerHTML = '';
      if (window.pJS) {
        window.pJS = null;
      }
    }
  }

  const particlesToggle = document.getElementById("particlesToggle");
  if (particlesToggle) {
    const savedParticles = localStorage.getItem("particlesEnabled") !== "false"; // default true
    particlesToggle.checked = savedParticles;
    if (savedParticles) {
      toggleParticles(true);
    }

    particlesToggle.addEventListener("change", () => {
      const enabled = particlesToggle.checked;
      localStorage.setItem("particlesEnabled", enabled);
      toggleParticles(enabled);
      showToast(enabled ? "Particles enabled!" : "Particles disabled!");
    });
  }


  const adsToggle = document.getElementById("adsToggle");
  if (adsToggle) {
    const savedAds = localStorage.getItem("adsEnabled") !== "false";
    adsToggle.checked = savedAds;

    adsToggle.addEventListener("change", () => {
      const enabled = adsToggle.checked;
      localStorage.setItem("adsEnabled", enabled);
      showToast(enabled ? "Ads enabled!" : "Ads disabled!");
    });
  }


  window.applySavedTheme = function() {
    const savedTheme = localStorage.getItem("selectedTheme") || "default";
    applyTheme(savedTheme);
    
    
    setTimeout(() => {
      const savedParticles = localStorage.getItem("particlesEnabled");
      const particlesEnabled = savedParticles !== "false"; // default true
      toggleParticles(particlesEnabled);
    }, 100);
  }

  class ABC {
    constructor(config = {}) {
      this.type = config.type || "blank";
      this.url  = config.url  || "about:blank";
    }
    setType(type) { if (!type) return; this.type = type; }
    setUrl(url)   { if (!url)  return; this.url  = url;  }
    getCode() {
      return `<iframe style="height:100%;width:100%;border:none;position:fixed;top:0;right:0;left:0;bottom:0"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups
                 allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts
                 allow-top-navigation allow-top-navigation-by-user-activation"
        src="${this.url}"></iframe>`;
    }
    open() {
      const iframe = this.getCode();
      if (this.type === "blank") {
        try { const p = window.open(); p.document.body.innerHTML = iframe; } catch(e) {}
      } else if (this.type === "blob") {
        try {
          const blob = new Blob([iframe], { type: "text/html" });
          window.open(URL.createObjectURL(blob));
        } catch(e) {}
      }
    }
  }

  const abOpenBtn = document.getElementById("abOpenBtn");
  if (abOpenBtn) {
    abOpenBtn.addEventListener("click", () => {
      const type = document.getElementById("abTypeSelect").value;
      const ab = new ABC({ type, url: window.location.href });
      ab.open();
    });
  }

  function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
  }

  // Navbar Position Setting
  const navbarPositionSelect = document.getElementById("navbarPosition");
  if (navbarPositionSelect) {
    const savedPosition = localStorage.getItem("navbarPosition") || "top";
    navbarPositionSelect.value = savedPosition;
    applyNavbarPosition(savedPosition);
    
    navbarPositionSelect.addEventListener("change", function() {
      const position = this.value;
      localStorage.setItem("navbarPosition", position);
      applyNavbarPosition(position);
      showToast("Navbar position updated!");
    });
  }

  function applyNavbarPosition(position) {
    const navbar = document.getElementById("mainNavbar") || document.querySelector(".navbar");
    if (!navbar) return;
    
    navbar.classList.remove("position-top", "position-left");
    navbar.classList.add("position-" + position);
  }

});

function exportData() {
  const data = { localStorage: {}, indexedDB: {} };
  
  // Export localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    data.localStorage[key] = localStorage.getItem(key);
  }
  
  // Export IndexedDB
  const databases = indexedDB.databases ? indexedDB.databases() : Promise.resolve([]);
  databases.then(dbs => {
    const exportPromises = dbs.map(db => {
      return new Promise((resolve) => {
        if (!db.name) { resolve(); return; }
        const request = indexedDB.open(db.name);
        request.onsuccess = (e) => {
          const db = e.target.result;
          const storeNames = Array.from(db.objectStoreNames);
          const dbData = {};
          let pending = storeNames.length;
          if (pending === 0) { resolve(); return; }
          storeNames.forEach(storeName => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const getAll = store.getAll();
            getAll.onsuccess = () => {
              dbData[storeName] = getAll.result;
              pending--;
              if (pending === 0) {
                data.indexedDB[db.name] = dbData;
                resolve();
              }
            };
            getAll.onerror = () => { pending--; resolve(); };
          });
        };
        request.onerror = () => { resolve(); };
      });
    });
    
    Promise.all(exportPromises).then(() => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'onlylessons-data.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Data exported (localStorage + IndexedDB)!');
    });
  });
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const data = JSON.parse(event.target.result);
        let count = 0;
        
        // Import localStorage
        if (data.localStorage) {
          for (const key in data.localStorage) {
            localStorage.setItem(key, data.localStorage[key]);
            count++;
          }
        }
        
        // Import IndexedDB
        if (data.indexedDB) {
          for (const dbName in data.indexedDB) {
            const dbData = data.indexedDB[dbName];
            const request = indexedDB.open(dbName);
            request.onsuccess = (e) => {
              const db = e.target.result;
              for (const storeName in dbData) {
                const transaction = db.transaction(storeName, 'readwrite');
                const store = transaction.objectStore(storeName);
                dbData[storeName].forEach(item => {
                  // Check if item has a key property
                  if (item.key !== undefined) {
                    store.put(item.value, item.key);
                  } else {
                    store.add(item);
                  }
                });
              }
            };
          }
          count += Object.keys(data.indexedDB).length;
        }
        
        showToast(`Imported ${count} items successfully!`);
        setTimeout(() => location.reload(), 1500);
      } catch (err) {
        showToast('Error importing data: ' + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function clearData() {
  if (confirm('Are you sure you want to clear all local storage data? This cannot be undone.')) {
    localStorage.clear();
    showToast('All data cleared!');
    setTimeout(() => location.reload(), 1000);
  }
}