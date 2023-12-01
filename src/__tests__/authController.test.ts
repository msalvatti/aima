import '@jest/globals';
import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../app';

describe('authenticate function', () => {

    it('should return a token on successful authentication', async () => {
        const response = await request(app)
          .post('/sign-in')
          .send({
            login: 'test',
            password: 'test123',
          });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
      });

      it('should NOT return a token because unsuccessful authentication', async () => {
        const response = await request(app)
          .post('/sign-in')
          .send({
            login: 'test',
            password: 'test1234',
          });
    
        expect(response.status).toBe(401);
      });

      it('should NOT return a token because the login data is missing', async () => {
        const response = await request(app)
          .post('/sign-in')
          .send({});
    
        expect(response.status).toBe(403);
      });
});