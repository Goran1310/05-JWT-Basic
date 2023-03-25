const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')


const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('No token provided')
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
        throw new UnauthenticatedError('Invalid token')
    }
}
module.exports = authenticationMiddleware;

