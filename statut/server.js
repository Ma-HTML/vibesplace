const express = require("express");
const util = require("minecraft-server-util");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const SERVER_HOST = "playvb.eletrix.fr"; // Remplace par l'IP de ton serveur
const SERVER_PORT = 1106; // Port par défaut de Minecraft

app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Sert les fichiers statiques du dossier public

app.get("/status", async (req, res) => {
    try {
        const response = await util.queryFull(SERVER_HOST, SERVER_PORT);
        res.json({
            online: true,
            players: response.players.online,
            maxPlayers: response.players.max,
            version: response.version.name,
            motd: response.motd.clean,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération du statut :", error);
        res.json({ online: false });
    }
});
