const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const {mailverification} = require('../utils/email');

let registrationController = async (req, res) => {
    let {
        email,
        password,
        confirmPassword,
        trems
    } = req.body;

    let existingUser = await User.findOne({
        email: email
    });

    if (existingUser) {
        return res.status(400).json({
            message: "This Email Already Exists"
        })
    }

    if (!trems) {
        return res.send({
            message: "Please Accept Terms And Condition"
        })
    }

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({
            message: "Please fill the all field"
        })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Password Not Matched"
        })
    }

    let user = new User({
        email: email,
        password: password,
        trems: trems
    });
    await user.save();
    let token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    })


    mailverification(token, email)

    res.status(201).json({
        message: "Registration Done"
    });
}

module.exports = {registrationController}