const { Category } = require('../models/category')
const Joi = require('joi')

async function getCategories(req, res) {
    const categories = await Category.find()
    res.json({ categories })
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
        return
    }

    res.status(400)
    const err = new Error(result.error.details[0].message)
    return next(err)
}


module.exports = { getCategories, createCategory }