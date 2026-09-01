const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Utilisateurs temporaires
const users = [];

// INSCRIPTION
app.post("/api/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Remplis tous les champs."
        });
    }

    const existingUser = users.find(
        user => user.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Ce nom d'utilisateur existe déjà."
        });
    }

    const user = {
        id: Date.now(),
        username,
        password
    };

    users.push(user);

    res.json({
        success: true,
        message: "Compte créé avec succès !"
    });
});

// CONNEXION
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        user =>
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Nom d'utilisateur ou mot de passe incorrect."
        });
    }

    res.json({
        success: true,
        message: "Connexion réussie !",
        user: {
            id: user.id,
            username: user.username
        }
    });
});

// Socket.IO
io.on("connection", socket => {
    console.log("Utilisateur connecté :", socket.id);

    socket.on("disconnect", () => {
        console.log("Utilisateur déconnecté :", socket.id);
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`VIBRO fonctionne sur le port ${PORT}`);
});
