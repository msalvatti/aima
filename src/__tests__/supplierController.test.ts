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

describe('Suppliers', () => {
    let supplierId: number;

    it('should get error Authorization ', async () => {
        const response = await request(app)
            .get('/suppliers')
            .set('Authorization', "");

        expect(response.status).toBe(401);
    });

    it('should get all suppliers', async () => {
        const response = await request(app)
            .get('/suppliers')
            .set('Authorization', authToken);

        expect(response.status).toBe(200);
        expect(response.body.suppliers).toBeDefined();
    });

    it('should insert supplier', async () => {
        const body = {
            name: "New Supplier",
            contactPerson: "Leo Nets",
            email: "leo@example.com"
        }

        const response = await request(app)
            .post('/suppliers')
            .set('Authorization', authToken)
            .send(body);

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        supplierId = response.body.id;
    });

    it('should get supplier by id', async () => {
        const response = await request(app)
            .get(`/suppliers/${supplierId}`)
            .set('Authorization', authToken);

        expect(response.status).toBe(200);
        expect(response.body.supplier).toBeDefined();
    });

    it('should update an existing supplier', async () => {
        const body = {
            name: "Supplier updated",
            contactPerson: "Francis Trovaus",
            email: "francis@example.com"
        }

        const response = await request(app)
          .put(`/suppliers/${supplierId}`)
          .set('Authorization', authToken)
          .send(body);
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Supplier updated successfully.');
      });

      it('should delete the supplier', async () => {
        const response = await request(app)
          .delete(`/suppliers/${supplierId}`)
          .set('Authorization', authToken);
    
        expect(response.status).toBe(204);
      });
    
      it('should verify that the supplier was deleted', async () => {
        const response = await request(app)
          .get(`/suppliers/${supplierId}`)
          .set('Authorization', authToken);
    
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Supplier not found.');
      });
});
