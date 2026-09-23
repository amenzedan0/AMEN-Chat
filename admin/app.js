const socket = io();

const loginBox = document.getElementById("loginBox");
const adminPanel = document.getElementById("adminPanel");

const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");

const usersBox = document.getElementById("users");

const messages = document.getElementById("messages");
const selectedUser = document.getElementById("selectedUser");
const userStatus = document.getElementById("userStatus");

const replyForm = document.getElementById("replyForm");
const replyInput = document.getElementById("replyInput");
const replyButton = document.getElementById("replyButton");

let currentUserId = null;
let users = {};


// ===============================
// ADMIN LOGIN
// ===============================

loginButton.addEventListener("click", () => {

    const pass = password.value;

    if (!pass) {
        loginError.textContent = "وشەی نهێنی بنووسە.";
        return;
    }

    socket.emit("admin-login", pass);
});


socket.on("admin-success", (data) => {

    loginBox.classList.add("hidden");
    adminPanel.classList.remove("hidden");

    console.log(data.message);
});


socket.on("admin-error", (data) => {

    loginError.textContent = data.message;

});


// ===============================
// NEW USER
// ===============================

socket.on("newUser", (user) => {

    users[user.id] = user;

    renderUsers();

});


// ===============================
// USER MESSAGE
// ===============================

socket.on("user-message", (data) => {

    users[data.userId] = {
        id: data.userId,
        name: data.userName
    };

    renderUsers();

    // Automatically select user
    if (!currentUserId) {
        selectUser(data.userId);
    }

    if (currentUserId === data.userId) {

        addMessage(data.message, "user");

    }

    // Notification
    document.title = "🔔 پەیامی نوێ - AMEN ADMIN";

    setTimeout(() => {
        document.title = "AMEN ADMIN";
    }, 3000);

});


// ===============================
// USER OFFLINE
// ===============================

socket.on("userOffline", (data) => {

    const userElement = document.querySelector(
        `[data-user-id="${data.id}"]`
    );

    if (userElement) {
        userElement.style.opacity = "0.5";
    }

});


// ===============================
// RENDER USERS
// ===============================

function renderUsers() {

    usersBox.innerHTML = "";

    const userList = Object.values(users);

    if (userList.length === 0) {

        usersBox.innerHTML = `
            <p class="empty">
                هێشتا هیچ بەکارهێنەرێک نییە
            </p>
        `;

        return;
    }

    userList.forEach(user => {

        const div = document.createElement("div");

        div.className = "user";

        if (user.id === currentUserId) {
            div.classList.add("active");
        }

        div.dataset.userId = user.id;

        div.innerHTML = `
            <div class="user-name">
                👤 ${escapeHtml(user.name)}
            </div>

            <div class="user-id">
                ID: ${user.id.slice(0, 8)}
            </div>
        `;

        div.addEventListener("click", () => {
            selectUser(user.id);
        });

        usersBox.appendChild(div);

    });

}


// ===============================
// SELECT USER
// ===============================

function selectUser(userId) {

    const user = users[userId];

    if (!user) return;

    currentUserId = userId;

    selectedUser.textContent = user.name;
    userStatus.textContent = "🟢 بەکارهێنەر هەڵبژێردراوە";

    replyInput.disabled = false;
    replyButton.disabled = false;

    messages.innerHTML = "";

    addMessage(
        "ئێستا دەتوانیت لەگەڵ " + user.name + " قسە بکەیت.",
        "admin"
    );

    renderUsers();

    replyInput.focus();

}


// ===============================
// SEND REPLY
// ===============================

replyForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const message = replyInput.value.trim();

    if (!message || !currentUserId) return;

    addMessage(message, "admin");

    socket.emit("admin-reply", {
        userId: currentUserId,
        message: message
    });

    replyInput.value = "";

    replyInput.focus();

});


// ===============================
// ADD MESSAGE
// ===============================

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


// ===============================
// SECURITY
// ===============================

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ===============================
// ENTER KEY
// ===============================

password.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        loginButton.click();
    }

});
