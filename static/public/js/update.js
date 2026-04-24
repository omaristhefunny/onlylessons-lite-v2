const UPDATE_VERSION = 'v2.0.0';
const COOKIE_KEY = 'seen_update';
const ADS_COOKIE_KEY = 'ads_enabled';

function getCookie(name) {
  return document.cookie.split('; ').reduce((acc, part) => {
    const [k, v] = part.split('=');
    return k === name ? decodeURIComponent(v) : acc;
  }, null);
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function dismissPopup() {
  const overlay = document.getElementById('update-overlay');
  overlay.style.transition = 'opacity 0.25s ease';
  overlay.style.opacity = '0';
  setTimeout(() => overlay.remove(), 250);
  setCookie(COOKIE_KEY, UPDATE_VERSION, 365);
}

function createPopup() {
  const overlay = document.createElement('div');
  overlay.id = 'update-overlay';
  overlay.innerHTML = `
    <div id="update-popup">
      <div class="popup-icon"></div>
      <div class="popup-title">Welcome to OnlyLessons</div>
      <div class="popup-body">
        <p>OnlyLessons is a <strong>free</strong> proxy service.</p>
        <p>Ad revenue goes towards <strong>supporting OnlyLessons</strong> and <strong>charitable donations</strong>. If you'd like to help with these causes, please keep ads enabled.</p>
        <p class="popup-tip">💡 If a new tab or popup opens while supporting, just close it and press <kbd>Ctrl</kbd> + <kbd>R</kbd> to refresh!</p>
        <p class="popup-tip">💡 Don't want ads? Go to <a href="/settings.html" style="color: inherit; text-decoration: underline;">Settings</a> to disable them.</p>
      </div>
      <div class="popup-buttons">
        <button class="popup-btn popup-btn-primary" onclick="dismissPopup()">OK</button>
      </div>
    </div>
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    #update-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      backdrop-filter: blur(8px);
    }
    #update-popup {
      background: linear-gradient(145deg, #1a2a3a, #000011);
      border: 1px solid rgba(135, 206, 235, 0.2);
      border-radius: 24px;
      padding: 40px 48px;
      max-width: 400px;
      text-align: center;
      color: #87CEEB;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      box-shadow: 0 25px 80px rgba(135, 206, 235, 0.2);
    }
    .popup-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .popup-title {
      font-size: 28px;
      font-weight: 700;
      color: #87CEEB;
      margin-bottom: 24px;
      letter-spacing: -0.5px;
    }
    .popup-body p {
      color: rgba(135, 206, 235, 0.8);
      line-height: 1.7;
      margin-bottom: 12px;
      font-size: 15px;
    }
    .popup-body strong {
      color: #87CEEB;
    }
    .popup-tip {
      background: rgba(135, 206, 235, 0.05);
      border: 1px solid rgba(135, 206, 235, 0.1);
      border-radius: 12px;
      padding: 14px 18px !important;
      font-size: 13px !important;
      color: rgba(135, 206, 235, 0.6) !important;
      margin-top: 20px !important;
    }
    .popup-tip kbd {
      background: rgba(135, 206, 235, 0.15);
      padding: 3px 8px;
      border-radius: 6px;
      font-family: 'SF Mono', monospace;
      font-size: 12px;
    }
    .popup-buttons {
      margin-top: 32px;
    }
    .popup-btn {
      padding: 16px 24px;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .popup-btn-primary {
      background: #87CEEB;
      color: #000011;
    }
    .popup-btn-primary:hover {
      background: #a8d8ea;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(135, 206, 235, 0.3);
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);
}

if (getCookie(COOKIE_KEY) !== UPDATE_VERSION) {
  document.addEventListener('DOMContentLoaded', createPopup);
}
