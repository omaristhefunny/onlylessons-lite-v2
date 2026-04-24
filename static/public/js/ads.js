(function () {
  // Apply navbar position on all pages
  function applyNavbarPosition() {
    const navbar = document.getElementById("mainNavbar") || document.querySelector(".navbar");
    if (!navbar) {
      setTimeout(applyNavbarPosition, 100);
      return;
    }
    
    let savedPosition = localStorage.getItem("navbarPosition");
    // Default to top if no value or invalid value
    if (!savedPosition || (savedPosition !== "top" && savedPosition !== "left")) {
      savedPosition = "top";
      localStorage.setItem("navbarPosition", "top");
    }
    navbar.classList.remove("position-top", "position-left");
    navbar.classList.add("position-" + savedPosition);
    
    // Adjust container margin based on position - skip for main.html and studying.html to keep centered
    const isMainPage = window.location.pathname === '/main.html' || window.location.pathname.endsWith('/main.html');
    const isStudyingPage = window.location.pathname.includes('studying');
    const containers = document.querySelectorAll('.container, main, .main-content, #content, .content, .page-content');
    containers.forEach(container => {
      // Skip main.html and studying.html - they stay centered
      if (isMainPage || isStudyingPage) {
        container.style.setProperty('margin-left', 'auto', 'important');
        container.style.setProperty('margin-right', 'auto', 'important');
        container.style.setProperty('width', '100%', 'important');
        container.style.setProperty('margin-top', '60px', 'important');
        return;
      }
      
      if (savedPosition === 'left') {
        container.style.setProperty('margin-left', '60px', 'important');
        container.style.setProperty('margin-top', '0', 'important');
        container.style.setProperty('margin-right', 'auto', 'important');
      } else {
        // Default to top - add margin for navbar
        container.style.setProperty('margin-top', '60px', 'important');
        container.style.setProperty('margin-left', 'auto', 'important');
        container.style.setProperty('margin-right', 'auto', 'important');
        container.style.setProperty('width', '100%', 'important');
      }
    });
    
    // Add class to body for CSS support
    if (savedPosition === 'left') {
      document.body.classList.add('has-navbar-left');
    } else {
      document.body.classList.remove('has-navbar-left');
    }
  }
  
  // Run immediately and also after a short delay to ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyNavbarPosition);
  } else {
    applyNavbarPosition();
  }

  // Disable ads on embed pages and 404 page to prevent unwanted navbar injection and network errors
  const isEmbedPage = window.location.pathname.includes('embed') || window.location.pathname.includes('embed-wrapper');
  const is404Page = window.location.pathname.includes('404');
  if (isEmbedPage || is404Page) {
    console.log('Ads disabled on embed/404 pages');
    return;
  }
  
  const adsEnabled = localStorage.getItem("adsEnabled");
  const isAdsOn = adsEnabled === null ? true : adsEnabled === "true";
  
  if (isAdsOn) {
    const appendAdScripts = () => {
      // First effectivegatecpm script
      const effectiveCpm1 = document.createElement("script");
      effectiveCpm1.src = "https://willingcease.com/ea/ee/8d/eaee8d247fc8fce69e320d60170e7d22.js";
      effectiveCpm1.async = true;
      document.body.appendChild(effectiveCpm1);
      
      // Second effectivegatecpm script
      const effectiveCpm2 = document.createElement("script");
      effectiveCpm2.src = "https://willingcease.com/95/e9/68/95e9682cdb1828a0406e3eaa73626028.js";
      effectiveCpm2.async = true;
      document.body.appendChild(effectiveCpm2);
    
      // Third effectivegatecpm script
      const effectiveCpm3 = document.createElement("script");
      effectiveCpm3.src = "https://willingcease.com/3be0725622ec75025aa4dfe0c82d557d/invoke.js";
      effectiveCpm3.async = true;
      document.body.appendChild(effectiveCpm3);
    };

    if (document.body) {
      appendAdScripts();
    } else {
      document.addEventListener("DOMContentLoaded", appendAdScripts);
    }
  }
})();