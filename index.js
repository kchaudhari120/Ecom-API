const express = require("express")
const app = express()
// creating connection here
require('./database/connection')()
const morgan = require("morgan")
const { categoryRouter } = require("./router/category-router")
const { orderRouter } = require("./router/order-router")
const { productRouter } = require("./router/product-router")
const {userRouter} = require("./router/user-router")
const APIRouter = express.Router()



app.use(express.json())
app.use(morgan('dev'))

app.listen(3001, () => {
    console.log("server starting on port number 3001");
})

app.get('/', (req, res) => {
    res.json({ 'message': 'success' })
})

app.use('/api', APIRouter)
APIRouter.get('',(req, res)=>{
    res.json({'message': 'API is running..'})
})


APIRouter.use('/users', userRouter)
APIRouter.use('/products', productRouter)
APIRouter.use('/orders', orderRouter)
APIRouter.use('/categories', categoryRouter)