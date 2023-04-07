const createError = require('http-errors');
const db = require('../models');

const User = db.user;
const Post = db.post;
const Comment = db.comment;
const Role = db.role;

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            include: {
                model: Role
            },
            // attributes: ['id', 'first_name', 'email']
            attributes: {
                exclude: ['updatedAt']
            }
        });

        res.json(users);

    } catch (error) {
        next(error)
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            include: {
                all: true,
                nested: true
            },
            attributes: ['id', 'first_name', 'email']
        })
        if (!user) throw createError.NotFound('User not found');
        res.json(user);
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userid } = req.user;
        if (id != userid) throw createError.BadRequest('you can\'t update another user');
        await User.update(req.body, { where: { id } });
        res.send('user updated successfully');
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userid, role } = req.user;

        if ((role == 'admin') || (userid == id)) {

            await User.update({ deletedBy: userid }, { where: { id } });
            await User.destroy({ where: { id } });

            await Post.update({ deletedBy: userid }, { where: { userId: id } });
            await Post.destroy({ where: { userId: id } });

            await Comment.update({ deletedBy: userid }, { where: { userId: id } });
            await Comment.destroy({ where: { userId: id } });

            res.send('User Deleted Successfully');
        } else {
            throw createError.BadRequest('you can\'t delete another post');
        }


    } catch (error) {
        next(error)
    }
}