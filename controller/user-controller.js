const { User } = require("../models/user")
const Joi = require('joi')
const passwordHash = require("password-hash")


function getUsers(req, res, next) {
    res.json({ 'message': 'user API running .... from controller' })
}

function validateUserForRegistation(user) {
    const schema = new Joi.object({
        name: Joi.string().max(40).min(4).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).max(12),
        password: Joi.string().min(6).max(30).required(),
        repassword: Joi.string().min(6).max(30).required(),
    })

    const result = schema.validate(user);
    return result;
}

async function saveUser(req, res, next) {

    const result = validateUserForRegistation(req.body)
    if (result.error) {
        //throw error
        // res.status(400);
        return next(new Error(result.error.details[0].message))
    }

    const userData = result.value;

    if (userData.password != userData.repassword) {
        //throw error
        res.status(400);
        return next(new Error("password not matched..."))
    }

    //check user is unique
    // let user = await User.findOne({ email: userData.email });
    // OR
    let isExist = await User.isExist(userData.email)
    if (!isExist) {
        userData.password = passwordHash.generate(userData.password)
        const user = await new User(userData).save();
        res.json(user)
    } else {
        //throw error
        res.status(400);
        return next(new Error("Email is already exist..."))

    }
}


module.exports = { getUsers, saveUser }



