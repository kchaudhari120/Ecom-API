const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    price: { type: Number, require: true },
    product: { type: mongoose.Types.ObjectId, ref: 'product', require: true },
    user: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    address: { type: String, require: true },
    quantity: { type: Number, require: true },
    payment_method: { type: String, require: true, default: 'COD' },
    status: { type: Boolean, default: false }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)
const Order = mongoose.model('order', orderSchema)
model.exports = { Order }