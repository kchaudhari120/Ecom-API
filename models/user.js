const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
},
    {
        timestamps: {
            createdAt: 'created_at', updatedAt: 'updated_at'
        }
    }
)

userSchema.statics.isExist = async function isExist(email) {
    const user = await this.findOne({ email: email })
    return user ? true : false;
}


const User = mongoose.model('user', userSchema);

module.exports = { User }