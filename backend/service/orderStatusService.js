const User = require("../models/userModel");
const Coupons = require("../models/Donate/couponsModel");
const DurationDonate = require("../models/Donate/durationRanksModel");
const RankDonate = require("../models/Donate/ranksModel");

class OrdersService {
  async findNickname (nickname) {
    return await User.findOne({ where: { nickname }});
  }

  async findCoupon (couponInfo) {
    return await Coupons.findOne({ where: { code: couponInfo } });
  }

  async findIdDonate (idDonate, weightDonate) {
    const donate = await RankDonate.findByPk(idDonate)
    if (!donate || (weightDonate !== donate.weight)) {
      return null;
    }
    return donate;
  }

  async checkSelectedDuration(selectedDuration) {
    const resultFind = await DurationDonate.findOne({ where: { id: selectedDuration.id } });
    
    if (!resultFind) {
      return null;
    } else if (selectedDuration.duration !== resultFind.duration ||
               selectedDuration.labelDuration !== resultFind.labelDuration ||
               selectedDuration.price !== resultFind.price ||
               selectedDuration.rankId !== resultFind.rankId) {
      return null;
    } else {
      return resultFind;
    }
  }
  
  async getCurrentUserStatusWeight(userRoles) {
    let currentUserStatusWeight = 0;
    
    // Перебираем роли пользователя
    for (const role of userRoles) {
      //! Нужен фикс
      // Если роль начинается с цифры, это значит, что она содержит вес
      if (!isNaN(parseInt(role.charAt(0)))) {
        // Получаем вес статуса из таблицы RankDonate по его id
        const status = await RankDonate.findOne({ where: { id: role } });
        if (status) {
          currentUserStatusWeight = Math.max(currentUserStatusWeight, status.weight);
        }
      }
    }
    return currentUserStatusWeight;
  }

  async getSelectedStatusWeight(idDonate) {
    const status = await RankDonate.findOne({ where: { id: idDonate } });
    if (!status) {
      console.log("Статус не найден");
      throw new Error("Статус не найден");
    }
    return status.weight;
  }
  
  async priceWithDiscount(price, discount) {
    const discountAmount = (price * discount) / 100;
    let totalPrice = price - discountAmount;
    // Округляем число
    if (totalPrice % 1 === 0) { // Проверяем, является ли число целым
      totalPrice = totalPrice.toFixed(0); // Если целое, округляем до нуля знаков после запятой
    } else {
      totalPrice = totalPrice.toFixed(2); // Если не целое, округляем до двух знаков после запятой
    }
    return parseFloat(totalPrice); // Преобразуем обратно в число
  }
}

module.exports = new OrdersService();