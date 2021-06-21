const { string, number } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: { type: string, require: true },
    price: { type: Number, require: true, },
    discount: { type: Number, default: 0 },
    productImage: { type: String, require: true },
    category : {type : mongoose.Types.ObjectId, ref : 'category', require : true },
    active : {type : Boolean, default : true}
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

const Product = mongoose.model('product', productSchema)
model.exports = { Product }