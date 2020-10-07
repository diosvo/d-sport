const joi = require('@hapi/joi')

const authSchema = joi.object({
    email: joi.string().email().min(8).max(254).lowercase().trim().required(),
    password: joi.string().min(6).max(128).required(),
    lastname: joi.string(),
    firstname: joi.string(),
    dob: joi.date(),
})

module.exports = {
    authSchema
}