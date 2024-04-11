import { OrderFunctions } from '../models/orders';
import verifyAuthToken from '../middleware/authentication';
import express, { Request, Response } from 'express';
const OrderFunction = new OrderFunctions();
const index = async (req: Request, res: Response) => {
    try {
        const orders = await OrderFunction.index();
        res.json(orders);
    } catch (error) {
        throw new Error('cant index orders err:  ' + error);
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        const orders = await OrderFunction.show(id);
        res.json(orders);
    } catch (error) {
        throw new Error('cant show order err:  ' + error);
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id as unknown as number;
        const status = req.params.status as string;

        const orders = await OrderFunction.create(status, user_id);
        res.json(orders);
    } catch (error) {
        throw new Error('cant show order err:  ' + error);
    }
};

const createProductOrder = async (req: Request, res: Response) => {
    try {
        const quant = req.body.quant as number;
        const order_id = req.params.order_id as unknown as number;
        const product_id = req.body.product_id as number;
        const orders = await OrderFunction.addProductOrder(
            quant,
            order_id,
            product_id
        );
        res.json(orders);
    } catch (error) {
        throw new Error('cant add product to order  ' + error);
    }
};
const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.post('/orders/:id/products', verifyAuthToken, createProductOrder);
    app.post('/orders/', verifyAuthToken, create);
    app.get('/orders/:id', verifyAuthToken, show);
};

export default orderRoutes;
