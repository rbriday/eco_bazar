const jwt = require('jsonwebtoken');

let tokenGenarator = (data, secret, expire) => {

    let token = jwt.sign(
        data,
        secret
    , {
        expiresIn: expire
    })

    return token

}

module.exports = tokenGenarator