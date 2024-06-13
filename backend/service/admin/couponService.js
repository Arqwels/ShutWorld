const ApiError = require("../../error/api-error");
const Coupons = require("../../models/Donate/couponsModel");

class CouponService {
  async getCouponCode(codeCoupon) {
    const coupon = await Coupons.findOne({ where: { code: codeCoupon } });
    return coupon;
  }

  async createCoupon({ code, discount, expiry_date }) {
    try {
      const existingCoupon = await this.getCouponCode(code);

      if (existingCoupon) {
        throw ApiError.BadRequest(`Купон ${code} уже существует.`);
      }

      const newCoupon = await Coupons.create({ code, discount, expiry_date });
      return newCoupon;
    } catch (error) {
      console.error(error); // Логирование ошибки

      if (error.original && error.original.code === '23505') {
        throw ApiError.BadRequest(`Код ${code} уже существует.`);
      }

      throw ApiError.ErrorSaveData("Ошибка при создании купона.", error);
    }
  }
}

module.exports = new CouponService();