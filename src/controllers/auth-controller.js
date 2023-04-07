const db = require('../models');
const createError = require('http-errors');

const User = db.user;
const Role = db.role;

exports.createUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const isUserExist = await User.findOne({ where: {email} });
        if (isUserExist) throw createError.Forbidden('user already exist');

        const role = await Role.findOne({ where: { name: 'user' } });

        const newUser = await User.create({ first_name, last_name, email, password, roleId: role.id});

        res.json(newUser);

    } catch (error) {
        next(error)
    }
}

exports.login = async (req,res,next) => {
    try {
        res.json({message:'loggedIn successfully', token: req.user})
    } catch (error) {
        next(error)
    }
}

