import express, { NextFunction, Request, Response } from "express";
import {User, UserStore} from "../models/user"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from 'dotenv'


dotenv.config()

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    console.log(` userStoreHandler:index `)
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(parseInt(req.params.id))
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    //@ts-ignore
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    try {  
        const newUser = await store.create(user)
        //@ts-ignore
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch (err) {
        res.status(400)
        //@ts-ignore
        res.json(err + user)
    }
    
}


const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(parseInt(req.params.id))
    res.json(deleted)
}


const authenticate = async (req: Request, res: Response) => {
    //@ts-ignore
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lasname,
        password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.firstname, user.lastname, user.password)
        //@ts-ignore
        var token = jwt.sign({ user: u }, (process.env.TOKEN_SECRET));
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
}

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //console.log(` userStoreHandler:verifyAuthToken `)
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1].replace(/['"]+/g, '')
        console.log(` userStoreHandler:verifyAuthToken Autenticate token ${token}, Secret ${process.env.TOKEN_SECRET}`)
        //console.log(` userStoreHandler:verifyAuthToken body token ${req.body.token}, Secret ${process.env.TOKEN_SECRET}`)
        //jwt.verify(req.body.token, process.env.TOKEN_SECRET)
        //@ts-ignores
        jwt.verify(token, process.env.TOKEN_SECRET)
        //console.log(` userStoreHandler:verifyAuthToken token ${token} verification done`)
        next()
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.get('/users/authenticate', authenticate)
    app.post('/users', verifyAuthToken, create)
    app.delete('/users/:id', verifyAuthToken, destroy)

}

export default userRoutes