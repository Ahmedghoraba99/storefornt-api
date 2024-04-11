import { productsFunctions } from '../models/products';
import verifyAuthToken from '../middleware/authentication';
import express, { Request, Response } from 'express';
const productsFunction = new productsFunctions();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await productsFunction.index();
        res.json(products);
    } catch (error) {
        throw new Error('err index route  ' + error);
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const id = req.body.id as number;
        const products = await productsFunction.show(id);
        res.json(products);
    } catch (error) {
        throw new Error('err index route  ' + error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const name = req.body.name as string;
        const price = req.body.price as number;
        const products = await productsFunction.create(name, price);
        res.json(products);
    } catch (error) {
        throw new Error('err index route  ' + error);
    }
};

const productsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
};

export default productsRoutes;
