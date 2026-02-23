const { getDB } = require('../db/database');

const clientService = {
    // Créer un nouveau client
    async create(clientData) {
        const db = await getDB();
        const collection = db.collection('clients');

        // Validation basique
        if (!clientData.firstname || !clientData.lastname || !clientData.email) {
            throw new Error('Firstname, lastname et email sont requis');
        }

        const email = clientData.email.toLowerCase().trim();
        // Vérification unicité email
        const existing = await collection.findOne({ email });
        if (existing) {
            throw new Error('Email already exists');
        }

        const newClient = {
            firstname: clientData.firstname.trim(),
            lastname: clientData.lastname.trim(),
            email,
            createdAt: new Date()
        };

        const result = await collection.insertOne(newClient);
        return { _id: result.insertedId, ...newClient };
    },

    // Récupérer tous les clients
    async getAll() {
        const db = await getDB();
        const collection = db.collection('clients');
        return await collection.find().toArray();
    }
};

module.exports = clientService;