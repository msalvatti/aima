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

describe('Sales', () => {
    let saleId: number;

    it('should get error Authorization ', async () => {
        const response = await request(app)
            .get('/sales')
            .set('Authorization', "");

        expect(response.status).toBe(401);
    });

    it('should get all sales', async () => {
        const response = await request(app)
            .get('/sales')
            .set('Authorization', authToken);

        expect(response.status).toBe(200);
        expect(response.body.sales).toBeDefined();
    });

    it('should insert sale', async () => {
        const body = {
            total: 1000,
            productId: 1,
            supplierId: 1
        }

        const response = await request(app)
            .post('/sales')
            .set('Authorization', authToken)
            .send(body);

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        saleId = response.body.id;
    });

    it('should get sale by id', async () => {
        const response = await request(app)
            .get(`/sales/${saleId}`)
            .set('Authorization', authToken);

        expect(response.status).toBe(200);
        expect(response.body.sale).toBeDefined();
    });

    it('should update an existing sale', async () => {
        const body = {
            total: 2000,
        }

        const response = await request(app)
            .put(`/sales/${saleId}`)
            .set('Authorization', authToken)
            .send(body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sale updated successfully.');
    });

    it('should NOT update an existing sale because productId and supplierId not exists', async () => {
        const body = {
            total: 2000,
            productid: 99,
            supplierId: 88
        }

        const response = await request(app)
            .put(`/sales/${saleId}`)
            .set('Authorization', authToken)
            .send(body);

        expect(response.status).toBe(400);
    });

    it('should delete the sale', async () => {
        const response = await request(app)
            .delete(`/sales/${saleId}`)
            .set('Authorization', authToken);

        expect(response.status).toBe(204);
    });

    it('should verify that the sale was deleted', async () => {
        const response = await request(app)
            .get(`/sales/${saleId}`)
            .set('Authorization', authToken);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Sale not found.');
    });
});
