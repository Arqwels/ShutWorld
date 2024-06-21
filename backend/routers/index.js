const Router = require('express');
const userRouter = require('./userRouter');
const mailRouter = require('./mailRouter');
const postVKRouter = require('./postVKRouter');
const rankRouter = require('./rankRouter');
const adminRouter = require('./adminRouter');
const couponRouter = require('./couponRouter');
const orderRouter = require('./orderRouter');
const imagesRouter = require('./imagesRouter');
const artifactRouter = require('./artifactRouter');
const rulesRouter = require('./rulesRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/mail', mailRouter);
router.use('/post', postVKRouter);
router.use('/rank', rankRouter);
router.use('/artifact', artifactRouter);
router.use('/admin', adminRouter);
router.use('/coupon', couponRouter);
router.use('/order', orderRouter);
router.use('/images', imagesRouter);
router.use('/rules', rulesRouter);

module.exports = router;