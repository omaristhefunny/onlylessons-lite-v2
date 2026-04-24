
const SOCKET_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:7642"
  : window.location.origin;

const SCALEDRONE_CLIENT_ID = 'wKcdMOWeqJEOFvos';
const ROOM_NAME = 'observable-room';

let drone = null;
let room = null;

const coolDown = 500;
let lastClick = Date.now() - coolDown;

const API_BASE = "/api";

const OWNER_USERS = ['tilly', 'aubree_lat', 'windows', 'owner'];
let isOwner = false;

const spamTracker = new Map();
const SPAM_LIMIT = 5;
const SPAM_WINDOW = 3000;
const SPAM_KICK_THRESHOLD = 8;

const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { color: #ff0000; }
    16% { color: #ff7f00; }
    33% { color: #ffff00; }
    50% { color: #00ff00; }
    66% { color: #0000ff; }
    83% { color: #8b00ff; }
    100% { color: #ff0000; }
  }
  .owner-controls { margin-left: 8px; }
  .kick-btn, .ban-btn {
    background: #ff4444;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    padding: 2px 6px;
    margin-left: 4px;
  }
  .kick-btn:hover { background: #ff6666; }
  .ban-btn:hover { background: #ff6666; }
`;
document.head.appendChild(style);


const DOM = {
  
  authPanel: document.querySelector("#authPanel"),
  authMsg: document.querySelector("#authMsg"),

  loginForm: document.querySelector("#loginForm"),
  loginUsername: document.querySelector("#loginUser"),
  loginName: document.querySelector("#loginName"),
  loginPassword: document.querySelector("#loginPass"),

  registerForm: document.querySelector("#registerForm"),
  registerUsername: document.querySelector("#registerUser"),
  registerName: document.querySelector("#registerName"),
  registerPassword: document.querySelector("#registerPass"),

  logoutButton: document.querySelector("#logoutButton"),


  chat: document.querySelector("#chat"),
  membersCount: document.querySelector(".members-count"),
  membersList: document.querySelector(".members-list"),
  messages: document.querySelector(".messages"),
  input: document.querySelector(".message-form__input"),
  form: document.querySelector(".message-form"),
};


let socket = null;
let members = [];
let isAuthed = false;
let identityReady = false;
let verifiedUsername = null;
const userCache = new Map();

Object.defineProperty(window, 'socket', { get: () => socket });
window.getMembers = () => members;

function setAuthMessage(msg) {
  DOM.authMsg.textContent = msg || "";
}

function checkIsOwner(username) {
  if (!username) return false;
  return OWNER_USERS.includes(username.toLowerCase());
}

function trackSpam(clientId) {
  const now = Date.now();
  if (!spamTracker.has(clientId)) {
    spamTracker.set(clientId, []);
  }
  const times = spamTracker.get(clientId);
  times.push(now);
  
  const recentTimes = times.filter(t => now - t < SPAM_WINDOW);
  spamTracker.set(clientId, recentTimes);
  
  if (recentTimes.length >= SPAM_KICK_THRESHOLD) {
    return true;
  }
  return false;
}

async function kickUser(clientId, username) {
  try {
    await api("/kick", {
      method: "POST",
      body: JSON.stringify({ clientId, username })
    });
  } catch (e) {
    console.error("Kick failed:", e);
  }
}

async function banUser(clientId, username) {
  try {
    await api("/ban", {
      method: "POST",
      body: JSON.stringify({ clientId, username })
    });
  } catch (e) {
    console.error("Ban failed:", e);
  }
}

function showAuth() {
  DOM.authPanel.style.display = "block";
  DOM.chat.classList.remove('show');
  DOM.logoutButton.style.display = "none";
}

function showChat() {
  DOM.authPanel.style.display = "none";
  DOM.chat.classList.add('show');
  DOM.input.focus();
}
function startCoolDown() {
  lastClick = Date.now();
}
function checkCoolDown() {
  const notOver = Date.now() - lastClick < coolDown
  if (notOver) {
    alert('no spamming pls');
  }
  
  return !notOver;
}
async function api(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      
      credentials: "include",
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      const errMsg = data?.error || `HTTP ${res.status}`;
      throw new Error(errMsg);
    }

    return data;
  } catch (e) {
    if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError')) {
      throw new Error('Chat server is unavailable. Please try again later.');
    }
    throw e;
  }
}
async function loadIdentity() {
  const r = await fetch("/api/me", { credentials: "include" });
  const data = await r.json();

  if (!data.loggedIn) {
    throw new Error("Not logged in");
  }

  verifiedUsername = data.username;
}

function initializeSocket(username) {
  isAuthed = false;

  if (drone) {
    console.warn("ScaleDrone already initialized");
    return;
  }

  drone = new ScaleDrone(SCALEDRONE_CLIENT_ID, {
    data: {
      name: username || 'Anonymous',
      color: getRandomColor()
    }
  });

  drone.on('open', error => {
    if (error) {
      console.error('ScaleDrone error:', error);
      setAuthMessage('Chat connection failed. Please try again.');
      return;
    }
    console.log('Successfully connected to ScaleDrone');
    
    // Expose drone globally for video.js once connected
    window.drone = drone;
    
    room = drone.subscribe(ROOM_NAME);
    
    room.on('open', error => {
      if (error) {
        console.error('Room error:', error);
        return;
      }
      console.log('Successfully joined room');
    });

    room.on('members', m => {
      members = m.map(member => ({
        id: member.id,
        username: member.name
      }));
      updateMembersDOM();
      identityReady = true;
      isAuthed = true;
      DOM.logoutButton.style.display = 'block';
    });

    room.on('member_join', member => {
      console.log('Member joined:', member);
      const existing = members.find(m => m.id === member.id);
      if (!existing) {
        members.push({ id: member.id, username: member.name });
        updateMembersDOM();
      }
    });

    room.on('member_leave', ({id}) => {
      console.log('Member left:', id);
      const idx = members.findIndex(x => x.id === id);
      if (idx !== -1) members.splice(idx, 1);
      updateMembersDOM();
    });

    room.on('data', (text, member) => {
      if (member && member.name) {
        addMessageToListDOM(text, { id: member.id, username: member.name });
      }
    });
  });

  drone.on('close', () => {
    console.log('ScaleDrone connection closed');
    isAuthed = false;
  });

  drone.on('error', error => {
    console.error('ScaleDrone error:', error);
    setAuthMessage('Chat error. Please refresh and try again.');
  });

  // Store drone globally for video integration
  window.drone = drone;
}


async function boot() {
  setAuthMessage("");
  
  // With ScaleDrone, we don't need REST API - just show auth
  showAuth();
}

DOM.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setAuthMessage("");

  // ScaleDrone - just use username directly
  const username = DOM.loginName.value.trim();
  
  if (!username || username.length < 2) {
    setAuthMessage("Please enter a username (min 2 characters)");
    return;
  }
  
  if (username.length > 20) {
    setAuthMessage("Username too long (max 20 characters)");
    return;
  }

  isOwner = checkIsOwner(username);
  showChat();
  initializeSocket(username);
});

DOM.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setAuthMessage("");

  // ScaleDrone - just use username directly
  const username = DOM.registerName.value.trim();
  
  if (!username || username.length < 2) {
    setAuthMessage("Please enter a username (min 2 characters)");
    return;
  }
  
  if (username.length > 20) {
    setAuthMessage("Username too long (max 20 characters)");
    return;
  }

  isOwner = checkIsOwner(username);
  showChat();
  initializeSocket(username);
});

async function getVerifiedUsername(clientId) {
  if (userCache.has(clientId)) return userCache.get(clientId);

  const member = members.find(m => m.id === clientId);
  if (member && member.username) {
    userCache.set(clientId, member.username);
    return member.username;
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) {
      await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
    }

    try {
      const r = await fetch(`/api/whois?ids=${encodeURIComponent(clientId)}`, {
        credentials: "include",
      });
      const data = await r.json();

      if (data.users && data.users[clientId]) {
        userCache.set(clientId, data.users[clientId]);
        return data.users[clientId];
      }
    } catch (e) {
      console.error("whois fetch error:", e);
    }
  }

  return "Unknown";
}


DOM.form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!drone && !socket) {
    alert("its not connected yet, hold on nerd");
    return;
  }
  if (!identityReady) {
    alert("hold on nerd ur not ready ");
    return;
  }
  if (!isAuthed) {
    alert("Still authenticating... wait a second and try again.");
    return;
  }

  if (!checkCoolDown()) {
    return; 
  }

  // ScaleDrone doesn't have the same spam tracking, but check anyway
  const clientId = drone?._containerId || socket?.id;
  if (clientId) {
    const isSpammer = trackSpam(clientId);
    if (isSpammer) {
      alert('you are sending messages too fast! get out!');
      if (drone) {
        drone.close();
        drone = null;
        window.drone = null;
      }
      if (socket) socket.disconnect();
      showAuth();
      return;
    }
  }

  startCoolDown();

  const value = DOM.input.value.trim();
  if (!value) return;
  if (value.match(/(黑鬼|cum|retard|bitch|shit|cunt|cock|dick|fuck|doxbin|shit|nigger|nigga|pussy|nazi|whore|faggot|:\/\/|http:\/\/|https:\/\/|handjob|penis|cock|pussy|sex|hitler|niger|titties|gay|tit|boob|@ss|c0ck|b!tch|pu\$\$y|nigas|incest|p0r|rape|r@pe|slut|threesum|foursum|twosum|shiz|slut|endis|p0r|nigg)/gi)) {
    alert('cmon man why you saying that kinda stuff?');
    return;
  }

  if (value.length > 150) {
    alert('my guy, that message is too big.');
    return;
  }
  DOM.input.value = "";

  if (room) {
    room.publish(value);
  } else if (socket) {
    socket.emit("chat_message", value);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("kick-btn")) {
    const clientId = e.target.dataset.id;
    const username = e.target.dataset.name;
    if (confirm(`Kick ${username}?`)) {
      kickUser(clientId, username);
    }
  }
});

DOM.logoutButton.addEventListener("click", async (event) => {
  event.preventDefault();
  
  // Disconnect from ScaleDrone
  if (drone) {
    drone.close();
    drone = null;
    window.drone = null;
    room = null;
  }

  // Also disconnect socket.io if used
  if (socket) {
    try {
      await api("/logout", {
         method: "POST",
         body: JSON.stringify({ clientId: socket?.id })
      });
    } catch(e) {
      console.error("Logout failed:", e);
    }
    socket.disconnect();
    socket = null;
  }

  showAuth();
  identityReady = false;
  isAuthed = false;
  members = [];
});
function isDevUser(username) {
  if (!username) return false;
  const devUsers = ['tilly', 'aubree_lat', 'windows', 'owner'];
  return devUsers.includes(username.toLowerCase());
}

function createMemberElement(member) {
  const el = document.createElement("div");
  el.className = "member";

  const clientId = member && member.id ? member.id : null;
  el.textContent = clientId ? "Loading..." : "Unknown";

  if (clientId) {
    getVerifiedUsername(clientId).then((name) => {
      if (isDevUser(name)) {
        el.innerHTML = `<span style="animation: rainbow 3s linear infinite; font-weight: bold; text-shadow: 0 0 10px currentColor;">${name}</span><span style="display: inline-block; margin-left: 5px; font-size: 1.2em; filter: drop-shadow(0 0 5px gold);">&#x1F451;</span>`;
      } else {
        el.textContent = name;
      }
      if (isOwner && clientId !== (drone?._containerId || socket?.id)) {
        const controls = document.createElement("span");
        controls.className = "owner-controls";
        controls.innerHTML = ` <button class="kick-btn" data-id="${clientId}" data-name="${el.textContent}" title="Kick">&#x1F6AB;</button>`;
        el.appendChild(controls);
      }
    });
  }
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} people online:`;
  DOM.membersList.innerHTML = "";
  members.forEach((m) => DOM.membersList.appendChild(createMemberElement(m)));
}

function createMessageElement(text, member) {
  const el = document.createElement("div");
  el.className = "message";

  const nameEl = document.createElement("div");
  nameEl.className = "message-name";
  nameEl.textContent = "Loading...";

  const msgEl = document.createElement("div");
  msgEl.className = "message-text";
  msgEl.textContent = text;

  el.appendChild(nameEl);
  el.appendChild(msgEl);

  const clientId = member && member.id ? member.id : null;

  if (!clientId) {
    nameEl.textContent = "Unknown";
  } else {
    getVerifiedUsername(clientId).then((name) => {
      if (isDevUser(name)) {
        nameEl.innerHTML = `<span style="animation: rainbow 3s linear infinite; font-weight: bold; text-shadow: 0 0 10px currentColor;">${name}</span><span style="display: inline-block; margin-left: 5px; font-size: 1.2em; filter: drop-shadow(0 0 5px gold);">&#x1F451;</span>`;
      } else {
        nameEl.textContent = name;
      }
    });
  }

  return el;
}

 function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

  el.appendChild(createMessageElement(text, member));
  if (atBottom) el.scrollTop = el.scrollHeight;
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

let heartbeatInterval;
function startHeartbeat() {
  heartbeatInterval = setInterval(() => {
    const clientId = drone?._containerId || socket?.id;
    if (clientId) {
      fetch("/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ clientId: clientId }),
      }).catch(() => {});
    }
  }, 30000);
}

function stopHeartbeat() {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
}

const originalBoot = boot;
boot = async function() {
  const result = originalBoot();
  startHeartbeat();
  return result;
};

boot();
