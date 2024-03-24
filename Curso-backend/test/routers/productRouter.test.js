import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../../src/app.js';

const api = supertest(app);

describe('Productos Router', () => {
    it('should get a list of products', async () => {
        const response = await api.get('/api/products/all-products');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');

    });

    it('should get a specific product by ID', async () => {
        const productId = '4c20826b-5f09-482b-aacc-6883a2f6105a'; // Reemplaza con un ID válido
        const response = await api.get(`/api/products/${productId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');

    });

    let productId

    it('should create a new product', async () => {
        const newProduct = {
            title: "Mouse xxxxxx",
            category: "Mouse xxxxx",
            description: "Mouse xxxxxxx",
            price: 41244,
            thumbnail: "mouse-xxxxxx.png",
            code: "jgiotoxxxoeoqpwefxxx",
            stock: 20
        };

        // Envía la solicitud para crear el producto ficticio
        const response = await api.post('/api/products').send(newProduct);

        // Asegúrate de que la solicitud se haya completado correctamente
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');

        // Obtén el ID del producto creado de la respuesta
        productId = response.body._id;

        // Verifica que el ID del producto no esté vacío o nulo
        expect(productId).to.exist;
    })

    it('should update a product by ID', async () => {
        const updatedProduct = {
            title: 'Mouse MegaDeath',
            category: 'Mouse',
            description: 'Mouse Ultra finoli',
            price: 4404,
            thumbnail: 'Mouse-megadeath.png',
            code: '444asd244ass444',
            stock: 10
        };

        const response = await api.put(`/api/products/${productId}`).send(updatedProduct);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');

    });

    it('should delete a product by ID', async () => {
        const response = await api.delete(`/api/products/${productId}`);
        expect(response.status).to.equal(201);

    });
});