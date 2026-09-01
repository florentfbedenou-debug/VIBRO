const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Permet de lire les données JSON
app.use(express.json());

// Permet d'utiliser les fichiers du dossier public
app.use(express.static(path.join(__dirname, "public")));

// Connexion des utilisateurs
io.on("connection", (socket) => {
    console.log("Un utilisateur est connecté");

    socket.on("disconnect", () => {
        console.log("Un utilisateur est déconnecté");
    });
});

// Démarrage du serveur
server.listen(PORT, () => {
    console.log(`VIBRO fonctionne sur http://localhost:${PORT}`);
});