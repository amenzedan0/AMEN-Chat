const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// ===============================
// WEBSITE FILES
// ===============================

app.use(express.static(path.join(__dirname, "public")));

app.use(
    "/admin",
    express.static(path.join(__dirname, "admin"))
);

// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// ADMIN
// ===============================

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "admin", "index.html"));
});

// ===============================
// USERS
// ===============================

const users = new Map();

// ===============================
// SOCKET.IO
// ===============================

io.on("connection", (socket) => {

    console.log("🟢 Connected:", socket.id);

    // ---------------------------
    // USER JOIN
    // ---------------------------

    socket.on("join", (name) => {

        const userName =
            name && name.trim()
                ? name.trim()
                : "Guest";

        users.set(socket.id, {
            id: socket.id,
            name: userName
        });

        console.log("👤 User:", userName);

        socket.emit("joined", {
            message: "بەخێربێیت بۆ AMEN CHAT 🤖"
        });

        io.to("admin").emit("newUser", {
            id: socket.id,
            name: userName
        });
    });

    // ---------------------------
    // ADMIN LOGIN
    // ---------------------------

    socket.on("admin-login", (password) => {

        if (password === "amen123") {

            socket.join("admin");

            socket.emit("admin-success", {
                message: "بەخێرهاتی بۆ AMEN ADMIN 👑"
            });

            // Send existing users
            users.forEach((user) => {

                socket.emit("newUser", {
                    id: user.id,
                    name: user.name
                });

            });

            console.log("👑 Admin connected");

        } else {

            socket.emit("admin-error", {
                message: "وشەی نهێنی هەڵەیە ❌"
            });
        }
    });

    // ---------------------------
    // USER MESSAGE
    // ---------------------------

    socket.on("user-message", (data) => {

        const user = users.get(socket.id);

        if (!user) return;

        const message =
            typeof data?.message === "string"
                ? data.message.trim()
                : "";

        if (!message) return;

        console.log(
            `📩 ${user.name}: ${message}`
        );

        io.to("admin").emit("user-message", {
            userId: user.id,
            userName: user.name,
            message: message
        });
    });

    // ---------------------------
    // ADMIN REPLY
    // ---------------------------

    socket.on("admin-reply", (data) => {

        if (!data?.userId) return;

        const message =
            typeof data.message === "string"
                ? data.message.trim()
                : "";

        if (!message) return;

        console.log(
            `📤 Admin → ${data.userId}: ${message}`
        );

        io.to(data.userId).emit("admin-message", {
            message: message
        });
    });

    // ---------------------------
    // DISCONNECT
    // ---------------------------

    socket.on("disconnect", () => {

        const user = users.get(socket.id);

        if (user) {

            console.log(
                `🔴 Disconnected: ${user.name}`
            );

            io.to("admin").emit("userOffline", {
                id: socket.id
            });

            users.delete(socket.id);
        }

    });

});

// ===============================
// SERVER
// ===============================

server.listen(PORT, "0.0.0.0", () => {

    console.log("");
    console.log("🤖 ===========================");
    console.log("🚀 AMEN CHAT ONLINE");
    console.log(`🌐 PORT: ${PORT}`);
    console.log("🤖 ===========================");
    console.log("");

});