import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import orderRoutes from './handlers/order'
import productRoutes from './handlers/product'
import userRoutes from './handlers/user'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

orderRoutes(app)
productRoutes(app)
userRoutes(app)

export default app