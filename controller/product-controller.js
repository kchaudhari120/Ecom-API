const {Product} = require('../models/product')

async function getProducts(req, res) {
    const products = await Product.find()
    res.json({ products})
}
 function createProduct(req, res, next){
    console.log(req.file);
    res.json("create product hare")
}



module.exports = { getProducts, createProduct}