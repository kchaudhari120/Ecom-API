const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, require: true },
    phone: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    active: { type: Boolean, require: true, default: false }
},
    {
        timestamps: {
            createdAt: 'created_at', updatedAt: 'updated_at'
        }
    }
)

const User = mongoose.model('user', userSchema);

model.exports = { User }