import Client from '../database';
export type Product = {
    id: number;
    name: string;
    price: number;
};
export class productsFunctions {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sqlSELECT = 'SELECT * FROM products';
            const products = await conn.query(sqlSELECT);
            conn.release();
            return products.rows;
        } catch (error) {
            throw new Error('index product err' + error);
        }
    }

    async show(id: number): Promise<Product[]> {
        const conn = await Client.connect();
        const sqlSELECT = 'SELECT * FROM products WHERE id=($1)';
        const products = await conn.query(sqlSELECT, [id]);
        conn.release();
        return products.rows[0];
    }

    async create(name: string, price: number): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sqlSELECT = `INSERT INTO products (name,price) values ($1,$2)  RETURNING *`;
            const result = await conn.query(sqlSELECT, [name, price]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (error) {
            throw new Error(`Could not add new product . Error: ` + error);
        }
    }
}
