import express, { Request, Response } from 'express';
import { PersonsFunctions } from '../models/persons';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/authentication';
//auth. function
const PersonFunction = new PersonsFunctions();
const tokenSecret = process.env.TOKEN_SECRET as string;

//index method
const index = async (_req: Request, res: Response) => {
    try {
        const Persons = await PersonFunction.index();
        res.json(Persons);
    } catch (error) {
        res.status(401).send('index err');
        throw new Error("Can't display users " + error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await PersonFunction.show(id);
        res.send(user);
    } catch (error) {
        res.status(401).json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const fname = req.body.fname as string;
        const lname = req.body.lname as string;
        const password: string = req.body.password as string;
        const person = await PersonFunction.create(fname, lname, password);
        const personToken = jwt.sign({ person: person }, tokenSecret);
        res.send(personToken);
    } catch (err) {
        res.status(401).send('create err');
        throw new Error(err + ` cant create person`);
    }
};
const destroy = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const person = await PersonFunction.destroy(id);
        res.send(`deleted` + person);
    } catch (error) {
        res.status(401).send('delete err');
        res.status(401).send('create err');
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const fname: string = req.body.fname as string;
        const lname: string = req.body.lname as string;
        const id = req.body.id as unknown as number;
        const password = req.body.password as string;
        const updatedPerson = await PersonFunction.update(
            id,
            fname,
            lname,
            password
        );
        res.send(updatedPerson);
    } catch (error) {
        res.status(401).send('update err');
        throw new Error("Can't update person err  " + error);
    }
};
const personRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.put('/users', verifyAuthToken, update);
    app.delete('/users', verifyAuthToken, destroy);
};
export default personRoutes;
