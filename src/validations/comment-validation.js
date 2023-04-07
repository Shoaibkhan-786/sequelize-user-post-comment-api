const Joi = require('joi');

exports.getComment = {
    params : Joi.object({
        id : Joi.number().required()
    })
}

exports.createComment = {
    params : Joi.object({
        postid : Joi.number().required()
    }),
    body : Joi.object({
        comment : Joi.string().min(3).max(100).required().trim() 
    })
}

exports.updateComment = {
    params : Joi.object({
        id : Joi.number().required()
    }),
    body : Joi.object({
        comment : Joi.string().min(3).max(100).trim() 
    })
}

exports.deleteComment = {
    params : Joi.object({
        id : Joi.number().required()
    })
}

