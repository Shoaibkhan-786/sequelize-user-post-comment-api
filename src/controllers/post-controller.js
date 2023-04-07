const createError = require('http-errors');
const db = require('../models');

const Post = db.post;
const Comment = db.comment;


exports.getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'title', 'description'],
            include: {
                model: Comment,
                attributes: ['id', 'comment']
            }
        })
        res.json(posts);
    } catch (error) {
        next(error)
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { userid } = req.user;
        const { title, description } = req.body;
        const newPost = await Post.create({ title, description, userId: userid });
        res.json(newPost);
    } catch (error) {
        next(error)
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userid } = req.user;

        const post = await Post.findByPk(id);
        if (!post) throw createError.NotFound('post not found to update');

        if (post.userId != userid) throw createError.BadRequest('you can\'t update another post');

        post.update(req.body);
        res.send('post updated successfully');
    } catch (error) {
        next(error)
    }
}

exports.getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id, {
            attributes: ['id', 'title', 'description'],
            include: {
                model: Comment
            }
        })

        if (!post) throw createError.NotFound("post not found");

        res.json(post);
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userid, role } = req.user;
        const post = await Post.findByPk(id);

        if (!post) throw createError.NotFound('post not found to delete');

        if (post.userId == userid || role == 'admin') {

            await Comment.update({ deletedBy: userid }, { where: { postId: id } });
            await Comment.destroy({ where: { postId: id } });

            await post.update({ deletedBy: userid }, { where: { id } });
            await post.destroy({ where: { id } });

            res.send('user deleted');

        } else
            throw createError.BadRequest('you can\'t delete another post')
    } catch (error) {
        next(error);
    }
}