const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "admin")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "index.html"));
});

const users = new Map();

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join", (name) => {
    const userName =
      typeof name === "string" && name.trim()
        ? name.trim()
        : "Guest";

    users.set(socket.id, {
      id: socket.id,
      name: userName
    });

    socket.emit("joined", {
      message: "بەخێربێیت بۆ AMEN CHAT 🤖"
    });

    io.to("admin").emit("newUser", {
      id: socket.id,
      name: userName
    });

    console.log("👤 User:", userName);
  });

  socket.on("admin-login", (password) => {
    if (password === process.env.ADMIN_PASSWORD) {
      socket.join("admin");

      socket.emit("admin-success", {
        message: "بەخێرهاتی بۆ AMEN ADMIN 👑"
      });

      users.forEach((user) => {
        socket.emit("newUser", user);
      });

      console.log("👑 Admin connected");
    } else {
      socket.emit("admin-error", {
        message: "وشەی نهێنی هەڵەیە ❌"
      });
    }
  });

  socket.on("user-message", (data) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message =
      typeof data?.message === "string"
        ? data.message.trim()
        : "";

    if (!message) return;

    io.to("admin").emit("user-message", {
      userId: user.id,
      userName: user.name,
      message
    });

    console.log(`📩 ${user.name}: ${message}`);
  });

  socket.on("admin-reply", (data) => {
    if (!data?.userId) return;

    const message =
      typeof data.message === "string"
        ? data.message.trim()
        : "";

    if (!message) return;

    io.to(data.userId).emit("admin-message", {
      message
    });

    console.log(`📤 Admin → ${data.userId}: ${message}`);
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);

    if (user) {
      console.log(`🔴 Disconnected: ${user.name}`);

      io.to("admin").emit("userOffline", {
        id: socket.id
      });

      users.delete(socket.id);
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("🤖 ==========================");
  console.log("🚀 AMEN CHAT ONLINE");
  console.log(`🌐 PORT: ${PORT}`);
  console.log("🤖 ==========================");
  console.log("");
});