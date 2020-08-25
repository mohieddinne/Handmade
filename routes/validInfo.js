const { check } = require('express-validator')

const validName = check('name', 'Please Enter Your Name').not().isEmpty();
const validPassword = check('password', 'Please Enter A valid Passwor').isLength({ min: 6})
const validEmail = check('email', 'Please Enter Your Email').isEmail();
const validProfileType  = check ('profileType', 'Enter your Profile Type type').not().isEmpty()
module.exports = {
    validName: validName,
    validPassword: validPassword,
    validEmail: validEmail,
    validProfileType: validProfileType
}