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

describe('Products', () => {
    let productId: number;

    it('should get all products', async () => {
        const response = await request(app)
            .get('/products')
            .set('Authorization', authToken);

        expect(response.status).toBe(200);
        expect(response.body.products).toBeDefined();
    });

    it('should insert product', async () => {
        const body = {
            name: "New Product",
            price: 10.00,
            quantity: 200
        }

        const response = await request(app)
            .post('/products')
            .set('Authorization', authToken)
            .send(body);

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        productId = response.body.id;
    });

    it('should get product by id', async () => {
        const response = await request(app)
            .get(`/products/${productId}`)
            .set('Authorization', authToken);

        expect(response.status).toBe(200);
        expect(response.body.product).toBeDefined();
    });

    it('should update an existing product', async () => {
        const body = {
            name: "Product updated",
            price: 15.00,
            quantity: 250
        }

        const response = await request(app)
          .put(`/products/${productId}`)
          .set('Authorization', authToken)
          .send(body);
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Product updated successfully.');
      });

      it('should delete the product', async () => {
        const response = await request(app)
          .delete(`/products/${productId}`)
          .set('Authorization', authToken);
    
        expect(response.status).toBe(204);
      });
    
      it('should verify that the product was deleted', async () => {
        const response = await request(app)
          .get(`/products/${productId}`)
          .set('Authorization', authToken);
    
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Product not found.');
      });
});
