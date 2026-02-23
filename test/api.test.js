const supertest = require('supertest');
const app = require('../src/server');
const user = require('../src/exo/user');
const db = require('../src/db/database');

beforeAll(async () => {
    await db.connectDB();
});

afterAll(async () => {
    await db.closeDB();
});

describe('API Endpoints', () => {
    beforeEach(async () => {
        await user.cleanUsers();
    });

    it('GET /api/status should return status ok', async () => {
        const res = await supertest(app)
            .get('/api/status')
            .expect(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });

    it('POST /clients should create a new client', async () => {
        const newClient = {
            firstname: 'John',
            lastname: 'Doe',
            email: `john.doe.${Date.now()}@example.com`
        };
        const res = await supertest(app)
            .post('/clients')
            .send(newClient)
            .expect(201);
        expect(res.body).toHaveProperty('firstname', newClient.firstname);
        expect(res.body).toHaveProperty('lastname', newClient.lastname);
        expect(res.body).toHaveProperty('email', newClient.email);
    });

    it('POST /clients should return error if missing fields', async () => {
        const res = await supertest(app)
            .post('/clients')
            .send({ firstname: 'John' })
            .expect(400);
        expect(res.body).toHaveProperty('error');
    });

    it('POST /clients should return error if email is already used', async () => {
        const email = 'jean.dupond@example.com';
        await supertest(app)
            .post('/clients')
            .send({ firstname: 'John', lastname: 'Doe', email })
            .expect(201);
        const res = await supertest(app)
            .post('/clients')
            .send({ firstname: 'Jane', lastname: 'Smith', email })
            .expect(400);
        expect(res.body).toHaveProperty('error');
    });
});