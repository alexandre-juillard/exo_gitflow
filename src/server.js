const express = require('express');
const { connectDB } = require('./db/database');
const clientService = require('./services/clientService');

const app = express();
app.use(express.json());

// Connexion à MongoDB
connectDB();

app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Route pour créer un client
app.post('/clients', async (req, res) => {
    try {
        const { firstname, lastname, email } = req.body;
        const client = await clientService.create({ firstname, lastname, email });
        res.status(201).json({
            success: true,
            ...client
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Route pour récupérer tous les clients
app.get('/clients', async (req, res) => {
    const clients = await clientService.getAll();
    res.status(200).json(clients);
});

app.listen(3000, () => console.log('Serveur sur http://localhost:3000'));

module.exports = app;