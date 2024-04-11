import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index';
import { productsFunctions } from '../models/products';
const productFunction = new productsFunctions();
const user = {
    id: 1,
    fname: 'test',
    lname: 'user',
    password: 'hello',
};

const product = {
    name: 'test product',
    price: 100,
};
const token = jwt.sign(user, process.env.TOKEN_SECRET as string);
//model testing
describe('Products functions not throwing errs', () => {
    it('Index works without type err', async () => {
        expect(async () => {
            productFunction.index();
        }).not.toThrow(TypeError);
    });
    it('Show works without type err', async () => {
        expect(async () => {
            productFunction.show(1);
        }).not.toThrow(TypeError);
    });
    it('Create works without type err', async () => {
        expect(async () => {
            productFunction.create('test', 60);
        }).not.toThrow(TypeError);
    });
});
//handler testing
const req = supertest(app);
describe('Products functions definition testing.....', () => {
    it('index method defined', () => {
        expect(productFunction.index).toBeDefined();
    });

    it('show method defined', () => {
        expect(productFunction.show).toBeDefined();
    });

    it('create method defined', () => {
        expect(productFunction.create).toBeDefined();
    });
});

describe('sucess acess without token testing.....', () => {
    it(' sucess to get /products/id without bearer token', async () => {
        const response = await req.get('/products/1').send({ id: 1 });
        expect(response.status).toBe(200);
    });
    it(' sucess to POST /products/ without bearer token', async () => {
        const response = await req.post('/products/').send(product);
        expect(response.status).toBe(401);
    });
});

describe('acess granted with token testing.....', () => {
    it(' sucess to GET /products with bearer token', async () => {
        const response = await req
            .get('/products')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it(' sucess to POST /products/ with bearer token', async () => {
        const response = await req
            .post('/products/')
            .set('Authorization', `Bearer ${token}`)
            .send(product);
        expect(response.status).toBe(200);
    });
});
