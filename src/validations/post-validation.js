const Joi = require('joi');

exports.createPost = {
    body: Joi.object({
        title: Joi.string().min(3).max(50).trim().required(),
        description: Joi.string().min(3).max(100).trim().required()
    })
}

exports.getPost = {
    params: Joi.object({
        id: Joi.number().required()
    })
}

exports.updatePost = {
    params: Joi.object({
        id: Joi.number().required()
    }),
    body: Joi.object({
        title: Joi.string().min(3).max(50).trim(),
        description: Joi.string().min(3).max(100).trim()
    })
}

exports.deletePost = {
    params: Joi.object({
        id: Joi.number().required()
    })
}

