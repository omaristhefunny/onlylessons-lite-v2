"use strict";

const STORAGE_KEY = 'embed_destination';
let swReady = false;

function registerServiceWorkerEarly() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/uv-sw.js').then(() => {
      swReady = true;
    }).catch(() => {});
  }
}

registerServiceWorkerEarly();

function ensureBrowserBarVisible() {
  const bar = document.querySelector('.browser-bar');
  if (bar) {
    bar.style.display = 'flex';
    bar.style.visibility = 'visible';
    bar.style.opacity = '1';
    bar.style.zIndex = '999999';
    bar.style.pointerEvents = 'auto';
  }
}

function hideNavbar() {
  const style = document.createElement('style');
  style.textContent = `
    .navbar, .navbar-container, nav.navbar, [class*="navbar"], [id*="navbar"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      overflow: hidden !important;
    }
  `;
  document.head.appendChild(style);
  
  ensureBrowserBarVisible();
  setInterval(ensureBrowserBarVisible, 100);
}

let currentDestination = null;

function updateUrlDisplay(url) {
  const urlInput = document.getElementById('browser-url');
  if (!urlInput) return;
  
  try {
    if (!url || url.startsWith('about:') || url === 'about:blank') {
      urlInput.value = '';
      return;
    }
    const urlObj = new URL(url);
    if (urlObj.pathname.startsWith('/lessons/ixl/')) {
      try {
        const encoded = urlObj.pathname.replace('/lessons/ixl/', '');
        const decoded = __uv$config.decodeUrl(encoded);
        const decodedUrl = new URL(decoded);
        currentDestination = decoded;
        urlInput.value = decodedUrl.hostname + decodedUrl.pathname;
        if (decodedUrl.search) urlInput.value += decodedUrl.search;
        return;
      } catch (e) {}
    }
    urlInput.value = urlObj.hostname + urlObj.pathname;
    if (urlObj.search) urlInput.value += urlObj.search;
  } catch (e) {
    urlInput.value = url;
  }
}

function showLoading() {
  const overlay = document.getElementById('loading-overlay');
  const emptyState = document.getElementById('empty-state');
  const theh1 = document.getElementById('theh1');
  const thep = document.getElementById('thep');
  
  if (emptyState) emptyState.style.display = 'none';
  
  if (overlay) {
    overlay.style.display = 'flex';
    void overlay.offsetWidth;
    overlay.style.opacity = '1';
  }
  
  if (theh1) theh1.innerHTML = 'Loading<span class="loading-dots"><span></span><span></span><span></span></span>';
  if (thep) thep.innerText = 'Connecting to website...';
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  const fadeout = document.getElementById('fadeout');
  
  if (overlay) {
    overlay.style.opacity = '0';
  }
  if (fadeout) {
    fadeout.style.opacity = '0';
  }
  
  setTimeout(() => {
    if (overlay) overlay.style.display = 'none';
    if (fadeout) fadeout.style.display = 'none';
  }, 600);
}

function loadUrlInIframe(url) {
  const iframe = document.getElementById('proxy-iframe');
  if (!iframe) return;
  
  showLoading();
  
  // Set up load handler BEFORE changing src
  iframe.onload = function() {
    console.log('Iframe loaded:', url);
    setTimeout(() => {
      hideLoading();
      try {
        updateUrlDisplay(iframe.contentWindow.location.href);
      } catch (e) {}
    }, 300);
  };
  
  // Also handle error
  iframe.onerror = function() {
    console.log('Iframe error:', url);
    hideLoading();
  };
  
  // Set the source
  iframe.src = url;
  
  // Fallback: hide loading after 5 seconds anyway
  setTimeout(() => {
    hideLoading();
  }, 5000);
}

function navigateToUrl(url) {
  let destination = url.trim();
  
  if (!destination) return;
  
  const emptyState = document.getElementById('empty-state');
  if (emptyState) emptyState.style.display = 'none';
  
  // Add protocol if missing
  if (!destination.startsWith('http://') && !destination.startsWith('https://')) {
    // Check if it looks like a domain
    if (destination.includes('.') && !destination.includes(' ')) {
      destination = 'https://' + destination;
    } else {
      // Treat as search query
      destination = 'https://duckduckgo.com/?q=' + encodeURIComponent(destination);
    }
  }
  
  try {
    const validUrl = new URL(destination);
    updateUrlDisplay(validUrl.toString());
    
    // Update session storage
    sessionStorage.setItem(STORAGE_KEY, validUrl.toString());
    
    // Load via proxy - skip SW registration if already ready
    if (swReady) {
      const proxyUrl = __uv$config.prefix + __uv$config.encodeUrl(validUrl.toString());
      loadUrlInIframe(proxyUrl);
    } else {
      registerSW()
        .then(() => {
          const proxyUrl = __uv$config.prefix + __uv$config.encodeUrl(validUrl.toString());
          loadUrlInIframe(proxyUrl);
        })
        .catch(() => {
          const proxyUrl = __uv$config.prefix + __uv$config.encodeUrl(validUrl.toString());
          loadUrlInIframe(proxyUrl);
        });
    }
  } catch (err) {
    console.error('Invalid URL:', err);
    const theh1 = document.getElementById('theh1');
    const thep = document.getElementById('thep');
    if (theh1) theh1.innerText = "Invalid URL";
    if (thep) thep.innerText = "Please enter a valid website address";
  }
}

function initEmbed() {
  hideNavbar();
  ensureBrowserBarVisible();
  
  const urlInput = document.getElementById('browser-url');
  const refreshBtn = document.getElementById('refresh-btn');
  const homeBtn = document.getElementById('home-btn');
  const iframe = document.getElementById('proxy-iframe');
  
  // Handle home button - go to main page
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.location.href = '/';
    });
  }
  
  // Handle URL input - press Enter to navigate
  if (urlInput) {
    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const url = urlInput.value;
        if (url) {
          navigateToUrl(url);
        }
      }
    });
  }
  
  // Handle refresh button
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (currentDestination) {
        const encoded = __uv$config.encodeUrl(currentDestination);
        window.location.hash = encoded;
        navigateToUrl(currentDestination);
      } else if (iframe && iframe.src && iframe.src !== '') {
        try {
          const urlObj = new URL(iframe.contentWindow.location.href);
          if (urlObj.pathname.startsWith('/lessons/ixl/')) {
            const encoded = urlObj.pathname.replace('/lessons/ixl/', '');
            const decoded = __uv$config.decodeUrl(encoded);
            navigateToUrl(decoded);
          }
        } catch (e) {}
      }
    });
  }
  
  // Get initial URL from hash or session storage
  let hash = window.location.hash.slice(1);
  
  if (!hash && sessionStorage.getItem(STORAGE_KEY)) {
    hash = sessionStorage.getItem(STORAGE_KEY);
    history.replaceState(null, '', '#' + hash);
  }
  
  if (!hash) {
    const emptyState = document.getElementById('empty-state');
    if (emptyState) emptyState.style.display = 'flex';
    const theh1 = document.getElementById('theh1');
    const thep = document.getElementById('thep');
    if (theh1) theh1.innerText = "Enter a URL to get started";
    if (thep) thep.innerText = "Type a website address in the bar above";
    return;
  }
  
  try {
    const decodedHash = decodeURIComponent(hash);
    const destination = new URL(decodedHash).toString();
    sessionStorage.setItem(STORAGE_KEY, destination);
    currentDestination = destination;
    
    updateUrlDisplay(destination);
    
    if (swReady) {
      loadUrlDirect(destination);
    } else {
      registerSW()
        .then(() => loadUrlDirect(destination))
        .catch(() => loadUrlDirect(destination));
    }
  } catch (err) {
    console.error('Bad URL:', err);
    const theh1 = document.getElementById('theh1');
    const thep = document.getElementById('thep');
    if (theh1) theh1.innerText = "Invalid URL";
    if (thep) thep.innerText = "The URL provided is invalid";
  }
}

function loadUrlDirect(destination) {
  const proxyUrl = __uv$config.prefix + __uv$config.encodeUrl(destination);
  loadUrlInIframe(proxyUrl);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmbed);
} else {
  initEmbed();
}