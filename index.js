const express = require("express")
const app = express()
//config .env
require('dotenv').config()
const { UPLOAD_FOLDER } = process.env

// creating connection here
require('./database/connection')()
const morgan = require("morgan")

const handleErrors = require("./middlewares/error-handler")
const { categoryRouter } = require("./router/category-router")
const { orderRouter } = require("./router/order-router")
const { productRouter } = require("./router/product-router")
const {userRouter} = require("./router/user-router")
const APIRouter = express.Router()



app.use(express.json())
app.use(morgan('dev'))

app.listen(process.env.PORT, () => {
    console.log(`server starting on port number ${process.env.PORT}`);
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




APIRouter.get('/'+UPLOAD_FOLDER+'/*',(req, res, next)=>{
    const path = req.url;
    // res.send(path)
    // const filePath = __dirname+path;
    const filePath = `${__dirname}${path}`;

    res.sendFile(filePath, (Error)=>{
        next()
    })
})

app.use(handleErrors)