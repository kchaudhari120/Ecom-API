const express = require('express')
const { getProducts, createProduct, getProduct} = require('../controller/product-controller')
const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')
const {UPLOAD_FOLDER} = process.env

const tempMulter = multer({dest : UPLOAD_FOLDER})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath = path.join(__dirname, "../") + UPLOAD_FOLDER;
        cb(null, filePath)
    },
    filename: function (req, file, cb) {
        const fileName = mongoose.Types.ObjectId() + ".png";
        cb(null, fileName)
    }
});

const upload = multer({storage})


const productRouter = express.Router()

productRouter.get('', getProducts)
productRouter.get('/:productId', getProduct)
productRouter.post('', adminAuthMiddleware, upload.single('image'),createProduct)


module.exports = { productRouter }