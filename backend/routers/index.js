const Router = require('express');
const fileUpload = require('express-fileupload');
const userRouter = require('./userRouter');
const mailRouter = require('./mailRouter');
const postVKRouter = require('./postVKRouter');
const rankRouter = require('./rankRouter');
const adminRouter = require('./adminRouter');

const router = new Router();

router.use(fileUpload());
router.use('/user', userRouter);
router.use('/mail', mailRouter);
router.use('/post', postVKRouter);
router.use('/rank', rankRouter);
router.use('/admin', adminRouter);

module.exports = router;