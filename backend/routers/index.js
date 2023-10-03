const Router = require('express');
const userRouter = require('./userRouter');
const mailRouter = require('./mailRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/mail', mailRouter);

module.exports = router;