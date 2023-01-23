import express, { Request, Response } from "express";
import {Product, ProductStore} from "../models/product"
//import verifyAuthToken from "./user"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

export const show = async (req: Request, res: Response) => {
    const product = await store.show(parseInt(req.params.id))
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    try {
         //@ts-ignore
        const product: Product = {
                                    name: req.body.name,
                                    price: req.body.price,
                                    category: req.body.category 
                                }
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
    
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(parseInt(req.params.id))
        res.json(deleted)
    }
    catch(err){
        res.status(400)
        res.json(`Couldn't delelte product ${err}`)
    }
}

const update = async (req: Request, res: Response) => {
   
    try {
         //@ts-ignore
        const product: Product = {
                                    name: req.body.name,
                                    price: req.body.price,
                                    category: req.body.category    
                                }
        const newProduct = await store.update(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
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

const productRoutes = (app: express.Application) => {

    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.put('/products', verifyAuthToken, update)
    app.delete('/products/:id', verifyAuthToken, destroy)

}

export default productRoutes