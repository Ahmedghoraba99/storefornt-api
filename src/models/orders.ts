//importing modules
import Client from '../database';
//order type
export type Order = {
    id: number;
    status: string;
    user_id: number;
};
// user_id was written like this just to match the column name
// of the database out of convience

export class OrderFunctions {
    async index(): Promise<Order[]> {
        try {
            const connection = await Client.connect();
            const sqlSELECT = 'SELECT * FROM orders';
            const result = await connection.query(sqlSELECT);
            const order = result.rows;
            connection.release();
            return order;
        } catch (error) {
            throw new Error('cant index orders err:  ' + error);
        }
    }
    async create(status: string, user_id: number): Promise<Order[]> {
        try {
            const connection = await Client.connect();
            const sqlSELECT =
                'INSERT INTO orders (status,user_id) values ($1,$2)';
            const result = await connection.query(sqlSELECT, [status, user_id]);
            const order = result.rows;
            connection.release();
            return order;
        } catch (error) {
            throw new Error('cant index orders err:  ' + error);
        }
    }
    async show(user_id: number): Promise<Order[]> {
        try {
            const connection = await Client.connect();
            const sqlSELECT = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await connection.query(sqlSELECT, [user_id]);
            const order = result.rows[0];
            connection.release();
            return order;
        } catch (error) {
            throw new Error('cant show specific order err:  ' + error);
        }
    }

    async addProductOrder(
        quantity: number,
        order_id: number,
        product_id: number
    ): Promise<Order> {
        try {
            const sql =
                'INSERT INTO odersProducts (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const connection = await Client.connect();
            const result = await connection.query(sql, [
                quantity,
                order_id,
                product_id,
            ]);
            const order = result.rows[0];
            connection.release();
            return order;
        } catch (error) {
            throw new Error('cant add order err:  ' + error);
        }
    }
}
