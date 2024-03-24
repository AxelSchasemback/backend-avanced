import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../../src/app.js';

const api = supertest(app);

describe('Carts Router', () => {
    it('should get a list of carts', async () => {
        const response = await api.get('/api/carts');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');

    });

    it('should get a specific cart by ID', async () => {
        const cartId = 'f8f97f3c-b5a3-4a7b-a58d-c363a6d6e5bb'; // Reemplaza con un ID válido
        const response = await api.get(`/api/carts/${cartId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('should update a specific cart by ID', async () => {
        const cartId = 'f8f97f3c-b5a3-4a7b-a58d-c363a6d6e5bb'; // Reemplaza con un ID válido
        const newCart = [
            {
                product: "82c2e7a5-db4b-4ec0-b40e-6178e13d6af9",
                quantity: 1
            }
        ]
        const response = await api.put(`/api/carts/${cartId}`).send(newCart);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');

    });

    it('should update the quantity of a product in the cart', async () => {
        const cartId = 'f8f97f3c-b5a3-4a7b-a58d-c363a6d6e5bb'; // Reemplaza con un ID válido
        const productId = 'fdd72084-79af-4e4d-a4cd-b94351a87482'; // Reemplaza con un ID de producto válido
        const updatedQuantity = 3; // Reemplaza con la cantidad actualizada

        const response = await api.put(`/api/carts/${cartId}/products/${productId}`).send({ quantity: updatedQuantity });
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');

    });

    it('should add a product to the cart', async () => {
        const cartId = '6840f315-574e-49df-b83c-9ca072c2e9a7'; // Reemplaza con un ID válido
        const productId = '4c20826b-5f09-482b-aacc-6883a2f6105a'; // Reemplaza con un ID de producto válido

        const response = await api.post(`/api/carts/${cartId}/products/${productId}`);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');

    });

    it('should reset all product to the cart', async () => {
        const cartId = '6840f315-574e-49df-b83c-9ca072c2e9a7'; // Reemplaza con un ID válido

        const response = await api.post(`/api/carts/${cartId}/reset`);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');

    });

    it('should delete a cart', async () => {
        const cartId = '3282e676-7635-4f57-8407-60c3c28c37dc'; // Reemplaza con un ID válido
        const response = await api.delete(`/api/carts/${cartId}`);
        expect(response.status).to.equal(201);

    });

    it('should delete a product from the cart', async () => {
        const cartId = '6840f315-574e-49df-b83c-9ca072c2e9a7'; // Reemplaza con un ID válido
        const productId = '82c2e7a5-db4b-4ec0-b40e-6178e13d6af9'; // Reemplaza con un ID de producto válido

        const response = await api.delete(`/api/carts/${cartId}/products/${productId}`);
        expect(response.status).to.equal(201);

    });

});