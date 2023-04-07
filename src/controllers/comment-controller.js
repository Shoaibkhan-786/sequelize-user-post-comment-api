const createError = require('http-errors');
const db = require('../models');

const User = db.user;
const Post = db.post;
const Comment = db.comment;



exports.insertComment = async (req, res, next) => {
    try {
        const { postid } = req.params;
        const { comment } = req.body;
        const { userid } = req.user;

        const post = await Post.findByPk(postid);
        if (!post) throw createError.NotFound('post not found to comment');

        await post.createComment({ comment, userId: userid });
        res.send('Comment created Successfully');
    } catch (error) {
        next(error)
    }
}


exports.getCommentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id, {
            attributes: ['id', 'comment', 'userId', 'postId']
        });
        if (!comment) throw createError.NotFound('comment not found');
        res.json(comment);
    } catch (error) {
        next(error)
    }
}

exports.getallComment = async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            attributes: ['id', 'comment'],
            include: [{
                model: User,
                attributes: ['id', 'first_name']
            },
            {
                model: Post,
                attributes: ['id', 'title']
            }]
        })
        if (!comments) throw createError.NotFound('comment not found');
        res.json(comments);
    } catch (error) {
        next(error)
    }
}

exports.updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);
        if (!comment) throw createError.NotFound('comment not found to update');

        const { userId } = comment;
        const { userid } = req.user;

        if (userId !== userid) throw createError.NotFound('you can\'t update another comment');

        await comment.update(req.body);

        res.send('comment Updated');
    } catch (error) {
        next(error)
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userid, role } = req.user;

        const comment = await Comment.findByPk(id);
        if (!comment) throw createError.NotFound('comment not found to delete');

        const post = await Post.findByPk(comment.postId);
        
        if ((role == 'admin') || (userid == comment.userId) || (post.userId == userid)) {
            await comment.update({ deletedBy: userid }, { where: id });
            await comment.destroy({ where: { id } });
        } else
            throw createError.BadRequest('you can\'t delete another post.', 400);

        res.send('Comment Deleted Successfully.');
    } catch (error) {
        next(error)
    }
}