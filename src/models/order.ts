// @ts-ignore
import Client from "../database";

export type Order = {
    id: number,
    product_id: number[],
    quantity: number[],
    user_id: number,
    status: string
} 


export class OrderStore {

    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders;' 
            
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (error) {
            throw new Error(`Could not get orders Error: ${error}`)
        }
    }

   async show(id : number): Promise<Order>  {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE id=($1);' 
            
            const result = await conn.query(sql, [id])
            conn.release()
            
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find order ${id} Error: ${error}`)
        }
   }

   async create(o : Order): Promise<Order>  {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *;' 
            
            const result = await conn.query(sql, [o.user_id, o.status])
            conn.release()

            const order = result.rows[0]
            return order;
        } catch (error) {
            throw new Error(`Could not add a new order  ${o.user_id}  Error: ${error}`)
        }
    }

    async update(o: Order): Promise<Order>{
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'UPDATE orders SET user_id=($2), status=($3) WHERE id=($1) RETURNING *;'

            const result = await conn.query(sql, [o.id, o.user_id, o.status])

            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not update order  ${o.user_id}  Error: ${error}`)
        }
    }

    async delete(id : number): Promise<Order>  {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1);' 
            
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not delete order  ${id} Error: ${error}`)
        }
   }


   async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(ordersql, [orderId])

            const order = result.rows[0]

            if (order.status !== "active") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }

            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }

    async getUserActiveOrder(userId: number): Promise<Order[]> {
        let order : Order
        let userActiveOrder : Order[]
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(ordersql, [userId, 'active'])

            order = result.rows[0]
           
            conn.release()
            if (order === undefined) {
                throw new Error(`Could not read user ${userId} active orders because order status isn't active `)
            }
            else{
                console.log(` ***getUserActiveOrder: order_id: ${order.id}, status: ${order.status}, user_id ${order.user_id} `)
            }

           
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'SELECT * FROM order_products WHERE order_id=($1)'
            //@ts-ignore
            const conn = await Client.connect()
            //@ts-ignore
            const result = await conn.query(sql, [order.id])

            userActiveOrder = result.rows
            console.log(`userActiveOrder: ${userActiveOrder} :: length ${userActiveOrder.length}`)
            conn.release()
            if(userActiveOrder.length !== 0)
                userActiveOrder.map( (item: Order) => { 
                    item.id = order.id as number;
                })
           
            return userActiveOrder
        } catch (err) {
            throw new Error(`Could not user ${userId} active order: ${err}`)
        }
    }


}

