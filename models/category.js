const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: { type: String, require: true }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

const Category = mongoose.model('category', categorySchema)
model.exports = {Category}