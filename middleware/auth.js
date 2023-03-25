const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomAPIError('No token provided', 401)
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        // console.log(req.headers);
        const luckyNumber = Math.floor(Math.random() * 10)
        // res.send(`Your lucky number is ${luckyNumber}`)
        const { id, username } = decoded;
        req.user = { id, username }
        next();
        // res.status(200).json({ msg: `Hello ${decoded.username}`, secret: `Here is your authorized data. Your lucky number is ${luckyNumber}` }) 
    } catch (error) {
        throw new CustomAPIError('Invalid token, not authorized for this route', 401)
    }
}
module.exports = authenticationMiddleware;

