const { Router } = require('express');
const passport = require('passport');
const { validate } = require('express-validation');
const authController = require('../controllers/auth-controller');
const { signup, login } = require('../validations/user-validation');
require('../middlewares/passport');

const authRoute = Router({ mergeParams: true });

authRoute.post('/signup', validate(signup), authController.createUser);

authRoute.post('/login', validate(login), passport.authenticate('login', { session: false }), authController.login)

module.exports = authRoute;