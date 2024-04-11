import bcrypt from 'bcrypt';
import Client from '../database';
export type Person = {
    id: number;
    fname: string;
    lname: string;
    password_digest: string;
};
const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS as string;
// export and creatng CRUD class PersonFunctions
export class PersonsFunctions {
    async create(
        fname: string,
        lname: string,
        password: string
    ): Promise<Person> {
        try {
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(password + pepper, parseInt(salt));
            const sqlSELECT = `INSERT INTO users (firstname,lastname,password_digest) values ($1,$2,$3)  RETURNING *`;
            const result = await conn.query(sqlSELECT, [fname, lname, hash]);
            const perosn = result.rows[0];
            conn.release();
            return perosn;
        } catch (err) {
            throw new Error(`Could not add new perosn . Error: ${err}`);
        }
    }
    async index(): Promise<Person[]> {
        try {
            {
                const connect = await Client.connect();
                const sqlSELECT = 'SELECT * from users';
                const results = await connect.query(sqlSELECT);
                connect.release();
                return results.rows;
            }
        } catch (error) {
            throw new Error('connct err (index)' + error);
        }
    }

    async show(id: number): Promise<Person> {
        try {
            {
                const connect = await Client.connect();
                const sqlSELECT = 'SELECT * from users WHERE id=($1)';
                const results = await connect.query(sqlSELECT, [id]);
                connect.release();
                return results.rows[0];
            }
        } catch (error) {
            throw new Error('can"T load specific person err' + error);
        }
    }
    async destroy(id: number): Promise<Person> {
        try {
            {
                const connect = await Client.connect();
                const sqlSELECT = 'DELETE FROM users WHERE id=($1)';
                const results = await connect.query(sqlSELECT, [id]);
                connect.release();
                return results.rows[0];
            }
        } catch (error) {
            throw new Error('Err deleting person' + error);
        }
    }

    async update(
        id: number,
        fname: string,
        lname: string,
        password: string
    ): Promise<Person> {
        const connect = await Client.connect();
        const sqlSELECT =
            'UPDATE users SET firstname=($2),lastname=($3), password_digest=($4)  WHERE id=($1) RETURNING *';
        const hash = bcrypt.hashSync(password + pepper, parseInt(salt));
        const result = await connect.query(sqlSELECT, [id, fname, lname, hash]);
        connect.release();
        return result.rows[0];
    }
}

export default PersonsFunctions;
