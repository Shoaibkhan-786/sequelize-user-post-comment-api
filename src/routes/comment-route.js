const { Router } = require('express');
const { validate } = require('express-validation');
const commentCtrl = require('../controllers/comment-controller');
const { createComment, getComment, updateComment, deleteComment } = require('../validations/comment-validation');
const commentRouter = Router({ mergeParams: true });


commentRouter.get('/', commentCtrl.getallComment);

commentRouter.post('/:postid', validate(createComment), commentCtrl.insertComment);

commentRouter.get('/:id', validate(getComment), commentCtrl.getCommentById);

commentRouter.put('/update/:id', validate(updateComment), commentCtrl.updateComment);

commentRouter.delete('/delete/:id', validate(deleteComment), commentCtrl.deleteComment);

module.exports = commentRouter;