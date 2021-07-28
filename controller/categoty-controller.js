const { Category } = require('../models/category')
const Joi = require('joi')

function getCategories(req, res) {
    res.json({ 'message': 'category API Running... from controller' })
}

async function createCategory(req, res, next) {

    const schema = Joi.object({
        name: Joi.string().min(2).required()
    })
    const result = schema.validate(req.body)

    if (!result.error) {
        const name = result.value
        const category = new Category( name )
        const categoryResult = await category.save()
        res.json(categoryResult)

        res.json("hello")
        return
    }




    res.status(400)
    const err = new Error(result.error.details[0].message)
    return next(err)
}


module.exports = { getCategories, createCategory }