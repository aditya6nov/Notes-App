const jwt = require("jsonwebtoken");

//creates a token using id and later on,
// send back to frontend for authorization
const generateToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "30d",
    });
};

module.exports = generateToken;