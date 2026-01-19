
const CLIENT_ID = "wKcdMOWeqJEOFvos";
const coolDown = 500;
let lastClick = Date.now() - coolDown;


const API_BASE = "/api";

// Inject rainbow animation styles
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
`;
document.head.appendChild(style);


const DOM = {
  
  authPanel: document.querySelector("#authPanel"),
  authMsg: document.querySelector("#authMsg"),

  loginForm: document.querySelector("#loginForm"),
  loginUsername: document.querySelector("#loginUser"),
  loginPassword: document.querySelector("#loginPass"),

  registerForm: document.querySelector("#registerForm"),
  registerUsername: document.querySelector("#registerUser"),
  registerPassword: document.querySelector("#registerPass"),

  logoutButton: document.querySelector("#logoutButton"),


  chat: document.querySelector("#chat"),
  membersCount: document.querySelector(".members-count"),
  membersList: document.querySelector(".members-list"),
  messages: document.querySelector(".messages"),
  input: document.querySelector(".message-form__input"),
  form: document.querySelector(".message-form"),
};


let drone = null;
let members = [];
let isAuthed = false;
let verifiedUsername = null;
const userCache = new Map();

function setAuthMessage(msg) {
  DOM.authMsg.textContent = msg || "";
}

function showAuth() {
  DOM.authPanel.style.display = "block";
  DOM.chat.style.display = "none";
}

function showChat() {
  DOM.authPanel.style.display = "none";
  DOM.chat.style.display = "block";
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
}


function initializeDrone(username) {
  isAuthed = false;




  if (drone) {
    console.warn("ScaleDrone already initialized");
    return;
  }

  drone = new ScaleDrone(CLIENT_ID, {
    data: {
      anon: true,
    },
  });

  drone.on("open", async (error) => {
    if (error) {
      console.error("Scaledrone open error:", error);
      return;
    }

    try {
      const r = await fetch(
        `${API_BASE}/jwt?clientId=${encodeURIComponent(drone.clientId)}`,
        { credentials: "include" }
      );

      if (!r.ok) {
        const t = await r.text();
        throw new Error(`JWT failed: ${r.status} ${t}`);
      }

      const token = await r.text();
      drone.authenticate(token);
    } catch (e) {
      console.error("JWT/auth fetch failed:", e);
    }
  });

  drone.on("authenticate", (error) => {
    if (error) {
      console.error("Scaledrone authenticate error:", error);
      return;
    }

    isAuthedToScaleDrone = true;
    console.log("ScaleDrone authenticated");

    const room = drone.subscribe("observable-room");

    room.on("open", (error) => {
      if (error) console.error(error);
      else console.log("Joined room");
    });

    room.on("members", (m) => {
      members = m;
      updateMembersDOM();
    });

    room.on("member_join", (member) => {
      members.push(member);
      updateMembersDOM();
    });

    room.on("member_leave", ({ id }) => {
      const idx = members.findIndex((x) => x.id === id);
      if (idx !== -1) members.splice(idx, 1);
      updateMembersDOM();
    });

    room.on("data", (text, member) => {
        console.log("MSG FROM member.id =", member && member.id, "text =", text);

      if (member) addMessageToListDOM(text, member);
      
    });
  });

  drone.on("error", (error) => console.error("Scaledrone error:", error));
  drone.on("close", (event) => console.log("Scaledrone close:", event));
}


async function boot() {
  setAuthMessage("");

  try {
    const me = await api("/me", { method: "GET" });

    if (me.loggedIn) {
      showChat();
      initializeDrone(me.username);
    } else {
      showAuth();
    }
  } catch (e) {
    console.error(e);
    setAuthMessage("Failed to reach auth server.");
    showAuth();
  }
}

DOM.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setAuthMessage("");

  const username = DOM.loginUsername.value.trim();
  const password = DOM.loginPassword.value;

  try {
    const data = await api("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    showChat();
    initializeDrone(data.username);
  } catch (e) {
    setAuthMessage(e.message);
  }
});

DOM.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setAuthMessage("");

  const username = DOM.registerUsername.value.trim();
  const password = DOM.registerPassword.value;

  try {
    const data = await api("/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    showChat();
    initializeDrone(data.username);
  } catch (e) {
    setAuthMessage(e.message);
  }
});
// verified user thingie 
async function getVerifiedUsername(clientId) {
  if (userCache.has(clientId)) return userCache.get(clientId);

  const r = await fetch(`/api/whois?ids=${encodeURIComponent(clientId)}`, {
    credentials: "include",
  });

  const data = await r.json();

  const username = (data.users && data.users[clientId]) ? data.users[clientId] : "Unknown";
  userCache.set(clientId, username);
  return username;
}

DOM.form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!drone) {
    alert("its not connected yet, hold on nerd");
    return;
  }
  if (!isAuthedToScaleDrone) {
    alert("Still authenticating… wait a second and try again.");
    return;
  }

  if (!checkCoolDown()) {
    return; 
  }

  startCoolDown();



  const value = DOM.input.value.trim();
  if (!value) return;
  if (value.match(/(黑鬼|cum|retard|bitch|shit|cunt|cock|dick|fuck|shit|nigger|nigga|pussy|nazi|whore|faggot|handjob|penis|cock|pussy|sex|hitler|niger|titties|gay|tit|boob|@ss|c0ck|b!tch|pu\$\$y|nigas|incest|p0r|rape|r@pe|slut|threesum|foursum|twosum|shiz|slut|endis|p0r|nigg)/gi)) {
    alert('cmon man why you saying that kinda stuff?');
    return;
  }

  if (value.length > 150) {
    alert('my guy, that message is too big.');
    return;
  }
  DOM.input.value = "";

  drone.publish({
    room: "observable-room",
    message: value,
  });
});


function isDevUser(username) {
  if (!username) return false;
  const devUsers = ['tilly', 'aubree_lat', 'windows'];
  return devUsers.includes(username.toLowerCase());
}

function createMemberElement(member) {
  const { name, color } = member.clientData || {};
  const displayName = name || "Unknown";

  const el = document.createElement("div");
  el.className = "member";
  
  if (isDevUser(displayName)) {
    el.innerHTML = `<span style="animation: rainbow 3s linear infinite; font-weight: bold; text-shadow: 0 0 10px currentColor;">${displayName}</span><span style="display: inline-block; margin-left: 5px; font-size: 1.2em; filter: drop-shadow(0 0 5px gold);">👑</span>`;
  } else {
    el.appendChild(document.createTextNode(displayName));
    el.style.color = color;
  }
  
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} people online:`;
  DOM.membersList.innerHTML = "";
  members.forEach((m) => DOM.membersList.appendChild(createMemberElement(m)));
}

async function createMessageElement(text, member) {
  const el = document.createElement("div");
  el.className = "message";

  const nameEl = document.createElement("div");
  nameEl.className = "member";


  const clientId = member && member.id ? member.id : null;

  if (!clientId) {
    nameEl.textContent = "Unknown";
  } else {
    nameEl.textContent = await getVerifiedUsername(clientId);
  }
  const msgEl = document.createElement("div");
  msgEl.textContent = text;


  el.appendChild(nameEl);
  el.appendChild(msgEl);
  return el;
}

async function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

  el.appendChild(await createMessageElement(text, member));
  if (atBottom) el.scrollTop = el.scrollHeight;
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}


boot();
