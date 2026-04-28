let jwt = require('jsonwebtoken');

let secureMiddleware = (req, res, next)=>{
    let token = req.headers.authorization
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if(err){
            res.status(400).json({
                message : "Unauthorization"
            })
        }else{
            next()
        }
});

// let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = secureMiddleware