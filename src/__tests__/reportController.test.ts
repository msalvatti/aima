import '@jest/globals';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { sequelize } from '../connection';
import request from 'supertest';
import app from '../app';

let authToken: string;

beforeAll(async () => {
    const response = await request(app)
        .post('/sign-in')
        .send({
            login: 'test',
            password: 'test123',
        });

    authToken = response.body.token;
});

afterAll(async () => {
    await sequelize.close();
});

describe('Reports', () => {
    let productId: number;

    it('should get error Authorization ', async () => {
        const response = await request(app)
            .get('/products')
            .set('Authorization', "");

        expect(response.status).toBe(401);
    });

    it('should get restock report with products', async () => {
        const response = await request(app)
            .get('/reports/300')
            .set('Authorization', authToken);

        expect(response.status).toBe(200);
        expect(response.body.productsToRestock).toBeDefined();
        expect(response.body.productsToRestock[0].id).toBeDefined();
    });

    it('should get restock report without products', async () => {
        const response = await request(app)
            .get('/reports/2000')
            .set('Authorization', authToken);

        expect(response.status).toBe(200);
        expect(response.body.productsToRestock).toBeDefined();
        expect(response.body.productsToRestock).toEqual([]);
    });
});
