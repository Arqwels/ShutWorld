const Router = require('express');
const userRouter = require('./userRouter');
const mailRouter = require('./mailRouter');
const postVKRouter = require('./postVKRouter');
const adminRouter = require('./adminRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/mail', mailRouter);
router.use('/post', postVKRouter);
router.use('/admin', adminRouter);

module.exports = router;