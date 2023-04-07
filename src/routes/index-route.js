const { Router } = require('express');
const passport = require('passport');
const authRoute = require('./auth-route');
const commentRouter = require('./comment-route');
const postRouter = require('./post-route');
const userRouter = require('./user-route');
require('../middlewares/passport');

const auth = passport.authenticate('auth', {session:false});

const indexRouter = Router({ mergeParams: true });

indexRouter.use('/auth', authRoute);

indexRouter.use('/users', auth, userRouter);

indexRouter.use('/posts', auth, postRouter);

indexRouter.use('/comments',auth, commentRouter);

module.exports = indexRouter;