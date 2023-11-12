const Router = require('express');
const userRouter = require('./userRouter');
const mailRouter = require('./mailRouter');
const postVKRouter = require('./postVKRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/mail', mailRouter);
router.use('/post', postVKRouter);

module.exports = router;