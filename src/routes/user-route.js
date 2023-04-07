const { Router } = require('express');
const { validate } = require('express-validation');
const userCtrl = require('../controllers/user-controller');
const { getUser, update, deleteUser } = require('../validations/user-validation');


const userRouter = Router({ mergeParams: true });

userRouter.get('/', userCtrl.getAllUsers);

userRouter.get('/:id', validate(getUser), userCtrl.getUserById);

userRouter.put('/update/:id', validate(update), userCtrl.updateUser);

userRouter.delete('/delete/:id', validate(deleteUser), userCtrl.deleteUser);

module.exports = userRouter;