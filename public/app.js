const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const typing = document.getElementById("typing");

let userName = localStorage.getItem("amenUserName");

if (!userName) {
    userName = prompt("ناوت چییە؟");

    if (!userName || !userName.trim()) {
        userName = "Guest";
    }

    localStorage.setItem("amenUserName", userName);
}

socket.emit("join", userName);


// ============================
// Send message
// ============================

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    socket.emit("user-message", {
        message: message
    });

    input.value = "";
    input.focus();

    typing.style.display = "block";
    typing.textContent = "AMEN چاوەڕێی وەڵامە...";
});


// ============================
// Receive admin reply
// ============================

socket.on("admin-message", (data) => {

    typing.style.display = "none";

    addMessage(data.message, "admin");

    input.focus();
});


// ============================
// Joined
// ============================

socket.on("joined", (data) => {

    console.log(data.message);

});


// ============================
// Add message
// ============================

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    bubble.textContent = text;

    message.appendChild(bubble);

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;
}
