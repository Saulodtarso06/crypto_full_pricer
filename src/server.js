// server.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

// Rota proxy para buscar dados de moedas
app.get("/api/coins/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Erro ao buscar dados da CoinGecko:", error.message);
        res.status(500).json({ error: "Erro ao buscar dados da API" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy rodando em http://localhost:${PORT}`);
});
