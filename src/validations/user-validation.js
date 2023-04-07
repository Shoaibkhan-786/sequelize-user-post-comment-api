const Joi = require('joi');

exports.signup = {
    body: Joi.object({
        first_name: Joi.string().min(3).max(30).trim().required(),
        last_name: Joi.string().min(3).max(20).trim().required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "in", "org"] },
          }).required().lowercase(),
        password: Joi.string().min(8).max(30).trim().required()
    })
}

exports.login = {
    body: Joi.object({
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "in", "org"] },
          }).required().lowercase(),
        password: Joi.string().min(8).max(30).trim().required()
    })
}

exports.update = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
    body: Joi.object({
        first_name: Joi.string().min(3).max(20).trim(),
        last_name: Joi.string().min(3).max(20).trim(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "in", "org"] },
          }).lowercase(),
        password: Joi.string().min(3).max(10).trim()
    }).required().not({})
}

exports.deleteUser = {
    params: Joi.object({
        id: Joi.number().required()
    })
}

exports.getUser = {
    params: Joi.object({
        id: Joi.number().required()
    })
}
