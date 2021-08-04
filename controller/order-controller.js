const Joi = require("joi")
const { Product } = require('../models/product')
const { Order } = require('../models/order')

async function getOrders(req, res) {
    // const order = await Order.find().populate('product user') // get data with actual product and user
    const order = await Order.find()
    .populate([
        {
            path : 'product',
            populate : [
                {path : 'category'}
            ]
        },
        {path : 'user', select : '-password'}
    ]) // get data with actual product and user

    
    res.json({ order })
    console.log({order : order});
}

async function placeOrder(req, res, next) {
    const schema = Joi.object({
        orders: Joi.array().items({
            product: Joi.string().required(),
            user: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
            address: Joi.string().required()
        }).min(1).required()
    })

    const validateResult = schema.validate(req.body);
    if (validateResult.error) {
        return next(new Error(validateResult.error.details[0].message))
    }
    const { orders } = validateResult.value;

    // for (let index = 0; index < orders.length; index++) {
    //     let order = orders[index];
    //     let productId = order.product;
    //     let oneProduct = await Product.findOne({ _id: productId })
    //     let price = oneProduct.price
    //     orders[index].price = price;
    //     console.log({productId});
    // }

    for (index in orders) {
        let order = orders[index];
        let productId = order.product;
        let price = (await Product.findOne({ _id: productId })).price
        order.price = price;
        // order[index].price = price;  //set price to product in order page
    }



    const saveOrders = await Order.create(orders);
    res.json({ saveOrders })
}

async function deleteOrder(req, res,next) {
    const _id = req.params.orderId;
    const result = await Order.deleteOne({_id});
    res.json({result})
}

module.exports = { getOrders, placeOrder, deleteOrder }