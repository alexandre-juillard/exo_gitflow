const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://ajuillard69:VnpMWo19Q0AdAuj6@cluster0.dic2d.mongodb.net/";
const dbName = "4CITE";

let client;
let db;

async function connectDB() {
    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
        return db;
    } catch (error) {
        throw error;
    }
}

async function getDB() {
    if (!db) {
        await connectDB();
    }
    return db;
}

async function closeDB() {
    if (client) {
        await client.close();
    }
}

module.exports = {
    connectDB,
    getDB,
    closeDB
};