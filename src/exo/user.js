const { getDB } = require('../db/database');
const { validateEmail } = require('./email');

async function saveUser(user) {
    if (!user || !user.firstname || !user.lastname || !user.email) {
        throw new Error('Firstname, lastname and email are required');
    }

    if (typeof user.firstname !== 'string' || typeof user.lastname !== 'string' || typeof user.email !== 'string') {
        throw new Error('Firstname, lastname and email must be strings');
    }

    if (!validateEmail(user.email)) {
        throw new Error('Invalid email format');
    }

    const db = await getDB();
    const userCollection = db.collection('clients');

    const existingUser = await userCollection.findOne({ email: user.email.toLowerCase().trim() });

    if (existingUser) {
        throw new Error('Email already exists');
    }

    const newUser = {
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        email: user.email.toLowerCase().trim(),
        createdAt: new Date()
    };

    const result = await userCollection.insertOne(newUser);

    return { _id: result.insertedId, ...newUser };
}

async function getUserByEmail(email) {
    if (!email || typeof email !== 'string') {
        throw new Error('Email is required and must be a string');
    }

    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }

    const db = await getDB();
    const userCollection = db.collection('clients');
    return await userCollection.findOne({ email: email.toLowerCase().trim() });
}

async function cleanUsers() {
    const db = await getDB();
    const userCollection = db.collection('clients');
    await userCollection.deleteMany({});
}

module.exports = {
    saveUser,
    getUserByEmail,
    cleanUsers
};