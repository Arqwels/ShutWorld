const Coupons = require("../models/Donate/couponsModel");
const currentDate = new Date();

class CheckCouponController {
  async checkCoupone(req, res) {
    try {
      const { couponCode } = req.body;
      if (!couponCode) {
        return res.status(400).json({ status: false, message: "Поле купона пустое!", errorType: "empty" })
      }

      const search = await Coupons.findOne({ where: { code: couponCode }})
      if (!search) {
        return res.status(400).json({ status: false, message: "Купон не найден!", errorType: "notFound" })
      } else if (search.expiry_date < currentDate) {
        return res.status(400).json({ status: false, message: "Срок действия купона истек!", errorType: "expired" });
      }

      res.status(200).json({ exists: true, couponInfo: { id: search.id, code: search.code, discount: search.discount, expiry_date: search.expiry_date } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при проверке купона!' });
    }
  }
}

module.exports = new CheckCouponController();