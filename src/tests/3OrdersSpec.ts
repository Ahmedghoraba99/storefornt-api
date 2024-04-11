import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index';
import { OrderFunctions } from '../models/orders';
const orderFunction = new OrderFunctions();
const user = {
    id: 1,
    fname: 'test',
    lname: 'user',
    password: 'hello',
};
const token = jwt.sign(user, process.env.TOKEN_SECRET as string);
const order = {
    status: 'string',
};
it('Index works without type err', async () => {
    expect(async () => {
        orderFunction.index();
    }).not.toThrow(TypeError);
});
it('Show works without type err', async () => {
    expect(async () => {
        orderFunction.show(1);
    }).not.toThrow(TypeError);
});
it('Show works without type err', async () => {
    expect(async () => {
        orderFunction.create('active', 1);
    }).not.toThrow(TypeError);
});
const req = supertest(app);
describe('Orders functions definition testing.....', () => {
    it('index method defined', () => {
        expect(orderFunction.index).toBeDefined();
    });

    it('show method defined', () => {
        expect(orderFunction.show).toBeDefined();
    });

    it('addProductOrder method defined', () => {
        expect(orderFunction.addProductOrder).toBeDefined();
    });
    it('Create method defined', () => {
        expect(orderFunction.create).toBeDefined();
    });
});

describe('dening acess without token testing.....', () => {
    it(' fails to GET /orders without bearer token', async () => {
        const response = await req.get('/orders');
        expect(response.status).toBe(401);
    });

    it(' fails to GET /orders/id without bearer token', async () => {
        const response = await req.get('/orders/1');
        expect(response.status).toBe(401);
    });

    it(' fails to POST /orders/:id/products without bearer token', async () => {
        const response = await req
            .post('/orders/1/products')
            .send({ quant: 1, order_id: 1, product_id: 1 });
        expect(response.status).toBe(401);
    });
});

describe('acess granted with token testing.....', () => {
    it(' sucess to GET /orders with bearer token', async () => {
        const response = await req
            .get('/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it(' sucess to GET /orders/id with bearer token', async () => {
        const response = await req
            .get('/orders/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
//productsOrders
describe('acess granted with token testing.....', () => {
    it(' sucess to post /orders with bearer token', async () => {
        const response = await req
            .post('/orders')
            .send(order)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it(' sucess to post /orders/id/products with bearer token', async () => {
        const response = await req
            .post('/orders/1/products')
            .send({ quant: 1, order_id: 1, product_id: 1 })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
//Model testing
describe('Products functions not throwing errs', () => {
    it('Index order works without type err', async () => {
        expect(async () => {
            orderFunction.index();
        }).not.toThrow(TypeError);
    });
    it('Show order works without type err', async () => {
        expect(async () => {
            orderFunction.show(1);
        }).not.toThrow(TypeError);
    });
    it('Create order works without type err', async () => {
        expect(async () => {
            orderFunction.create('test', 1);
        }).not.toThrow(TypeError);
    });
});
