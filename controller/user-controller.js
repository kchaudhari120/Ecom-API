const { User } = require("../models/user")
const Joi = require('joi')
const passwordHash = require("password-hash")
const jwt = require("jsonwebtoken")
const { response } = require("express")

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

function validateLoginCredential(user) {
    const schema = new Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    })
    const result = schema.validate(user);
    return result
}

async function loginUser(req, res, next) {
    const result = validateLoginCredential(req.body);

    if (result.error) {
        res.status(400)
        const err = new Error(result.error.details[0].message)
        return next(err)
    }

    const { email, password } = result.value;
    const user = await User.findOne({ email })
    // console.log(user);
    if (user) {
        //check password
        const isPasswordMatch = passwordHash.verify(password, user.password)

        if (isPasswordMatch) {
            //login success
            const payload = {
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
            const token = jwt.sign(payload, "123456")
            return res.json({ "success": "login success", "token": token })

        }

    }
    res.status(400)
    const err = new Error("Email OR Password invalid...")
    return next(err)


}

async function updateUser(req, res, next) {

    const loggedInUser = req.session.user
    console.log("loggedInUser", loggedInUser);
    const schema = Joi.object({
        phone: Joi.string().max(12).min(10),
        name: Joi.string().min(4).max(40)
    })

    const result = schema.validate(req.body)
    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    } else {
        //    let user = User.findById(payload._id)
        //    user = Object.assign(user, result.value) 
        //    user = await user.save()
        //    res.json({user})

        const user = await User.findOneAndUpdate({ _id: loggedInUser._id },
            {
                $set: result.value
            }, {
            new: true
        })


        res.json(user)

    }





}

async function updateUserById(req, res, next) {

    const user_id = req.params.user_id;
       
        //    let user = await User.findById(user_id)
        //    user = Object.assign(user, req.body) 
        //    user = await user.save()
        //    res.json({user})

        const user = await User.findOneAndUpdate({ _id: user_id },
            {
                $set: req.body
            }, {
            new: true
        })


        res.json(user)

    }


module.exports = { getUsers, saveUser, loginUser, updateUser, updateUserById}



