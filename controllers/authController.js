const User = require('../models/userSchema');
const {
    mailverification,
    resetPasswordMail
} = require('../utils/email');
const {
    emptyFieldValidation
} = require('../utils/validation');
const tokenGenarator = require('../utils/tokenGenarator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    emptyFieldValidation(res, email, password, confirmPassword)

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Password Not Matched"
        })
    }

    const hash = bcrypt.hashSync(password, 10);

    let user = new User({
        email: email,
        password: hash,
        trems: trems
    });
    await user.save();



    let token = tokenGenarator({
        id: user._id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, "1d")

    mailverification(token, email)

    res.status(201).json({
        message: "Registration Done"
    });
}
// logingController

let loginController = async (req, res) => {
    let {
        email,
        password
    } = req.body;

    let existingUser = await User.findOne({
        email: email
    });

    if (!existingUser) {
        return res.status(400).json({
            message: "Email not found"
        })
    }

    emptyFieldValidation(res, email, password);

    let pass = bcrypt.compareSync(password, existingUser.password); // true

    if (!pass) {
        return res.status(400).json({
            message: "Invalid Credential"
        })
    }
    res.status(200).json({
        message: "Login Successfully Done"
    })

}

// forgotPasswordController

let forgotPasswordController = async (req, res) => {
    let {
        email
    } = req.body;
    emptyFieldValidation(res, email);
    let existingUser = await User.findOne({
        email: email
    });
    if (!existingUser) {
        return res.status(400).json({
            message: "Email not found"
        })
    }
    let token = tokenGenarator({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.ACCESS_TOKEN_SECRET, "1d")

    resetPasswordMail(token, email)

    res.status(200).json({
        message: "Please check your email"
    })

}

// resetPasswordController 

let resetPasswordController = async (req, res) => {
    let {
        newPassword,
        confirmPassword
    } = req.body;
    let {
        token
    } = req.params;
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "Confirm Password Not Match"
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(400).json({
                message: "Unauthorization"
            })
        } else {
            const hash = bcrypt.hashSync(newPassword, 10);
            const updateData = User.findByIdAndUpdate({
                _id: decoded.id
            }, {
                password: newPassword
            });
            res.status(400).json({
                message: "passowrd updated"
            })
        }
    });
}

// resentVerification email 

let resentVerificationMail = async (req, res) => {
    let {
        email
    } = req.body;
    let existingUser = await User.findOne({
        email: email
    })
    let token = tokenGenarator({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.ACCESS_TOKEN_SECRET, "1d")

    mailverification(token, email)

    res.status(200).json({
        message: "Please Check Your Email for Varification"
    })
}


module.exports = {
    registrationController,
    loginController,
    forgotPasswordController,
    resetPasswordController,
    resentVerificationMail
}