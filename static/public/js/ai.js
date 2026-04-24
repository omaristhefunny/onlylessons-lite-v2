import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const textarea = document.querySelector(".input-container textarea");
const sendBtn = document.querySelector(".send-btn");
const messagesContainer = document.querySelector(".messages");
const modelSelector = document.getElementById("model-selector");

const USER = "user";
const ASSISTANT = "assistant";

let csrfToken = null;
let chatHistory = [];

async function getCsrfToken() {
    try {
        const response = await fetch("/csrf-token", { credentials: "include" });
        const data = await response.json();
        return data.csrfToken;
    } catch {
        return null;
    }
}

async function requestAssistantResponse(messages, model) {
    const response = await fetch("/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-csrf-token": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({ messages, model })
    });

    const text = await response.text();
    try {
        const data = JSON.parse(text);
        return data.error ? `Error: ${data.error}` : data.message || String(data);
    } catch {
        return text;
    }
}

function addMsg(content, role, isLoading = false) {
    const el = document.createElement("div");
    el.classList.add("message", role);

    if (isLoading) {
        el.classList.add("loading");
        el.innerHTML = `<div class="spinner"></div>Thinking...`;
    } else {
        el.innerHTML = marked(String(content));
    }

    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return el;
}

async function sendMsg() {
    const message = textarea.value.trim();
    if (!message) return;

    chatHistory.push({ role: USER, content: message });
    addMsg(message, USER);
    textarea.value = "";

    const loadingEl = addMsg("", ASSISTANT, true);

    try {
        const context = chatHistory.slice(-12);
        const aiMsg = await requestAssistantResponse(context, modelSelector?.value || "openrouter/free");

        loadingEl.innerHTML = marked(aiMsg);
        loadingEl.classList.remove("loading");
        loadingEl.addEventListener("click", () => navigator.clipboard.writeText(aiMsg));

        chatHistory.push({ role: ASSISTANT, content: aiMsg });
    } catch {
        loadingEl.innerHTML = "Failed to reach suntreeAssistant. Try again.";
        loadingEl.classList.remove("loading");
    }
}

async function init() {
    csrfToken = await getCsrfToken();

    sendBtn.addEventListener("click", () => void sendMsg());

    textarea.addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            void sendMsg();
        }
    });

    addMsg("**Hello, how may I help you?**", ASSISTANT);
}

void init();