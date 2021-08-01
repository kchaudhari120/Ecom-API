const { Product } = require('../models/product')
const Joi = require('joi')
const { UPLOAD_FOLDER } = process.env


async function getProducts(req, res) {
    const products = await Product.find()
    res.json({ products })
}

async function getProduct(req, res, next) {
    const _id = req.params.productId;
    const product = await Product.findOne({_id})
    res.json({product});
}
function validateFunc(data) {
    const schema = new Joi.object({
        name: Joi.string().min(2).max(40).required(),
        price: Joi.number().min(1).required(),
        discount: Joi.number().default(0),
        category: Joi.string().required(),
        active: Joi.boolean().default(true)
    })
    const result = schema.validate(data);
    return result;
}


async function createProduct(req, res, next) {
    console.log(req.file);
    // console.log(req.body);
    console.log("file path : ", UPLOAD_FOLDER+ '/' + req.file.filename);
    const productImage = UPLOAD_FOLDER + "/" + req.file.filename;

    const validateResult = validateFunc(req.body);
    if (validateResult.error) {
        res.status(400);
        return next(new Error(validateResult.error.details[0].message))
    }
    let product = new Product({ 
        ...validateResult.value,
        productImage });
    product = await product.save()

    // console.log({product});


    res.json(product)
}



module.exports = { getProducts, createProduct, getProduct }