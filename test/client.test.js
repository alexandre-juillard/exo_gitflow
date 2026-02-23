const user = require('../src/exo/user');
const db = require('../src/db/database');

beforeAll(async () => {
    await db.connectDB();
});

afterAll(async () => {
    await db.closeDB();
});

describe('User module', () => {
    let validNewUser;
    let result;

    beforeEach(async () => {
        await user.cleanUsers();
        validNewUser = {
            firstname: 'Test',
            lastname: 'User',
            email: `test.user.${Date.now()}@example.com`
        };
    });

    it('Input fields are valid', async () => {
        result = await user.saveUser(validNewUser);
        expect(result).toHaveProperty('_id');
        expect(result.firstname).toBe(validNewUser.firstname);
        expect(result.lastname).toBe(validNewUser.lastname);
        expect(result.email).toBe(validNewUser.email.toLowerCase().trim());
    });

    it('Email not already used', async () => {
        await user.saveUser(validNewUser);
        await expect(user.saveUser(validNewUser))
            .rejects.toThrow('Email already exists');
    });

    it('Write space in input fields', async () => {
        validNewUser.firstname = '  Alice  ';
        validNewUser.lastname = '  Johnson  ';
        validNewUser.email = '  alice.johnson@example.com  ';
        result = await user.saveUser(validNewUser);

        expect(result.firstname).toBe('Alice');
        expect(result.lastname).toBe('Johnson');
        expect(result.email).toBe('alice.johnson@example.com');
    });

    it('Email in uppercase', async () => {
        validNewUser.email = '  BOB.BROWN@EXAMPLE.COM  ';
        result = await user.saveUser(validNewUser);

        expect(result.firstname).toBe(validNewUser.firstname);
        expect(result.lastname).toBe(validNewUser.lastname);
        expect(result.email).toBe('bob.brown@example.com');
    });

    it('Email = jean@122.31.5.21 is valid', async () => {
        validNewUser.email = 'jean@122.31.5.21';
        result = await user.saveUser(validNewUser);

        expect(result.email).toBe('jean@122.31.5.21');
    });

    it('Email = jean@gmail.com is valid', async () => {
        validNewUser.email = 'jean@gmail.com';
        result = await user.saveUser(validNewUser);

        expect(result.email).toBe('jean@gmail.com');
    });

    it('Email = jean+spam@gmail.com is valid', async () => {
        validNewUser.email = 'jean+spam@gmail.com';
        result = await user.saveUser(validNewUser);

        expect(result.email).toBe('jean+spam@gmail.com');
    });

    it('Email = jean@justice.gouv.fr is valid', async () => {
        validNewUser.email = 'jean@justice.gouv.fr';
        result = await user.saveUser(validNewUser);

        expect(result.email).toBe('jean@justice.gouv.fr');
    });
});