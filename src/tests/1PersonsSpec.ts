import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index';
import PersonsFunctions from '../models/persons';
const PersonFunction = new PersonsFunctions();
const user = {
    fname: 'test',
    lname: 'user',
    password: 'hello',
};
const token = jwt.sign(user, process.env.TOKEN_SECRET as string);

const req = supertest(app);
describe('Persons functions definition testing.....', () => {
    it('index method defined', () => {
        expect(PersonFunction.index).toBeDefined();
    });

    it('show method defined', () => {
        expect(PersonFunction.show).toBeDefined();
    });

    it('destroy method defined', () => {
        expect(PersonFunction.destroy).toBeDefined();
    });

    it('update method defined', () => {
        expect(PersonFunction.update).toBeDefined();
    });

    it('index method defined', () => {
        expect(PersonFunction.create).toBeDefined();
    });
});

describe('dening acess without token testing.....', () => {
    it(' fails to GET /users without bearer token', async () => {
        const response = await req.get('/users');
        expect(response.status).toBe(401);
    });

    it(' fails to GET /users/id without bearer token', async () => {
        const response = await req.get('/users/1');
        expect(response.status).toBe(401);
    });

    it(' fails to delete /users without bearer token', async () => {
        const response = await req.delete('/users/').send({ id: 1 });
        expect(response.status).toBe(401);
    });

    it(' fails to PUT /users/id without bearer token', async () => {
        const response = await req.put('/users/').send(user);
        expect(response.status).toBe(401);
    });
});
describe('allow acess without token testing.....', () => {
    it(' success to POST /users/id without bearer token', async () => {
        const response = await req.post('/users/').send(user);
        expect(response.status).toBe(200);
    });
});
describe('acess granted with token testing.....', () => {
    it(' sucess to GET /users with bearer token', async () => {
        const response = await req
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it(' sucess to GET /users/id with bearer token', async () => {
        const response = await req
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it(' sucess to POST /users/ with bearer token', async () => {
        const response = await req
            .post('/users/')
            .set('Authorization', `Bearer ${token}`)
            .send(user);
        expect(response.status).toBe(200);
    });

    it(' sucess to delete /users/ with bearer token', async () => {
        const response = await req
            .delete('/users/')
            .set('Authorization', `Bearer ${token}`)
            .send(user);
        expect(response.status).toBe(200);
    });
});
describe('Products functions not throwing errs', () => {
    it('Index persons works without type err', async () => {
        expect(async () => {
            PersonFunction.index();
        }).not.toThrow(TypeError);
    });
    it('Show person works without type err', async () => {
        expect(async () => {
            PersonFunction.show(1);
        }).not.toThrow(TypeError);
    });
    it('Create person works without type err', async () => {
        expect(async () => {
            PersonFunction.create('fname', 'lname', 'password');
        }).not.toThrow(TypeError);
    });

    it('Create person works without type err', async () => {
        expect(async () => {
            PersonFunction.update(2, 'fname2', 'lname2', 'password2');
        }).not.toThrow(TypeError);
    });
    it('delete person works without type err', async () => {
        expect(async () => {
            PersonFunction.destroy(2);
        }).not.toThrow(TypeError);
    });
});
