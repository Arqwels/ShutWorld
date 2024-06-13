const ApiError = require("../../error/api-error");
const couponService = require("../../service/admin/couponService");

class CouponController {
  async createCoupon(req, res, next) {
    try {
      const { code, discount, expiry_date } = req.body;
      console.log(code, discount, expiry_date);

      if (!code || !discount || !expiry_date) {
        throw ApiError.BadRequest('Проверте целостность данных!');
      }
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(expiry_date)) {
        throw ApiError.BadRequest('Некорректный формат даты. Используйте формат YYYY-MM-DD.');
      }

      // Проверка на просроченную дату
      const currentDate = new Date().toISOString().split('T')[0]; // Получаем текущую дату в формате YYYY-MM-DD
      if (expiry_date <= currentDate) {
        throw ApiError.BadRequest('Дата купона уже просрочена.');
      }

      const couponeCode = await couponService.getCouponCode(code);
      if (couponeCode) {
        return res.status(400).json({ status: false, message: `Промокод ${code} уже существует!` })
      }

      const newCoupon = await couponService.createCoupon({ code, discount, expiry_date });

      res.status(200).json({ message: 'Добавленно!'});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CouponController();