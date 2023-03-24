
// check username, password in post(login) request
// if exist create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dasboard

const CustomAPIError = require('../errors/custom-error')
const login = async (req, res) => {
    const { username, password } = req.body;

    // mongoose validation
    // Joi
    // check in the controller

    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
        // throw new BadRequestError('Please provide email and password')
    }

    // console.log(username, password);
    res.send('Fake login/Register/Signup')
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 10)
    // res.send(`Your lucky number is ${luckyNumber}`)
    res.status(200).json({ msg: `Hello John Doe`, secret: `Here is your authorized data. Your lucky number is ${luckyNumber}` })
}

module.exports = {
    login,
    dashboard
}