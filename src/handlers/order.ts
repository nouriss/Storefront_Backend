import express, { request, Request, Response } from "express";
import {Order, OrderStore} from "../models/order"
import {show as productShow} from "./product"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await store.show(parseInt(req.params.id))
   
    if (order === undefined){
        res.status(400)
        res.json(`No registerd order with id ${req.params.id}`)
    }
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status,
        }
        const newProduct = await store.create(order)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
    
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(parseInt(req.params.id))
    res.json(deleted)
}

const update = async (req: Request, res: Response) => {
    //@ts-ignore
    const updateOrder : Order = { id : parseInt(req.params.id),
                                  status: req.body.status,
                                  user_id: req.body.user_id} 

    const order = await store.update(updateOrder)
   
    if (order === undefined){
        res.status(400)
        res.json(`No registerd order with id ${req.params.id}`)
    }
    res.json(order)
}

const addProduct = async (req: Request, res: Response) => {
    const orderId: number = parseInt(req.params.id)
    const productId: number = parseInt(req.body.productId)
    const quantity: number = parseInt(req.body.quantity)
    // let product = undefined 
    // try{
    //     product = productShow({prams.id = productId}, {} )
    // }

    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
} 


const getUserActiveOrder = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId)

    try {
        const userActiveOrderArray = await store.getUserActiveOrder(userId)
        if(userActiveOrderArray.length === 0){
            throw new Error(`can retrieve active order for user id ${userId}`)
        }
        //@ts-ignore
        let userActiveOrder: Order = { id :  userActiveOrderArray[0].id,
                                       user_id: userId,
                                       status: "active",
                                       quantity: [],
                                       product_id: []
                                    }

       
        const groupedUserActiveOrderArray =   userActiveOrderArray.reduce((acc, curr, i, arr) => {
            //@ts-ignore
            acc[`${curr.product_id}`] = (acc[`${curr.product_id}`] === undefined) ? [] : acc[`${curr.product_id}`]
             //@ts-ignore   
            if(acc[`${(curr.product_id)}`].length === 0){
                //@ts-ignore   
                let userOrder: Order = { id :  userActiveOrderArray[0].id,
                                         user_id: userId,
                                         status: userActiveOrderArray[0].status,
                                         quantity: [0],
                                         product_id: [curr.product_id[0]]
                                        }
                //@ts-ignore                    
                acc[`${(curr.product_id )}`].push(userOrder) 
                //@ts-ignore 
                
            }
            //@ts-ignore   
            acc[`${curr.product_id}`][0].quantity[0] +=  curr.quantity
            // console.log(`i :: ${i}, product_id: ${curr.product_id} curr.quantity :: ${curr.quantity}`)
            // console.log(`i :: ${i}, product_id: ${curr.product_id} acc.quantity :: ${ acc[`${curr.product_id}`][0].quantity}`)


            if (i + 1 == arr.length) {
                return Object.values(acc)
                //return acc
            }

            return acc
        }, {})
        //@ts-ignore
        groupedUserActiveOrderArray.map( (curr) => {
             //console.log(`curr ${curr[0]}:: product_id:: ${curr[0].product_id}, quantity:: ${curr[0].quantity}`)
             userActiveOrder.quantity.push(curr[0].quantity[0])
             userActiveOrder.product_id.push(curr[0].product_id[0])
        })
        console.log(`userActiveOrder:: product_id:: ${userActiveOrder.product_id}, quantity:: ${userActiveOrder.quantity} :: status :: ${userActiveOrder.status}`)
                

        res.json(userActiveOrder)
    } catch(err) {
        res.status(400)
        res.json(`can retrieve active order for user id ${userId} :: ${err}`)
    }
}

//@ts-ignore
const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1].replace(/['"]+/g, '')
        //@ts-ignores
        jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
    }
}

const orderRoutes = (app: express.Application) => {

    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', verifyAuthToken, create)
    app.put('/orders/:id', verifyAuthToken, update)
    app.delete('/orders/:id', destroy)
    // add product
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
    // get user active order
    app.get('/users/:userId/orders', verifyAuthToken, getUserActiveOrder)

}

export default orderRoutes