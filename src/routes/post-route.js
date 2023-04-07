const { Router } = require('express');
const { validate } = require('express-validation');
const postCtrl = require('../controllers/post-controller');
const { createPost, updatePost, getPost, deletePost } = require('../validations/post-validation');

const postRouter = Router({ mergeParams: true });

postRouter.get('/fetchallpost', postCtrl.getAllPost);

postRouter.post('/createpost', validate(createPost), postCtrl.createPost);

postRouter.put('/update/:id', validate(updatePost), postCtrl.updatePost);

postRouter.get('/getpost/:id', validate(getPost), postCtrl.getPostById);

postRouter.delete('/delete/:id', validate(deletePost), postCtrl.deletePost);

module.exports = postRouter;