const orderService = require('../service/orderStatusService');
const RankDonate = require('../models/Donate/ranksModel');
const OrderRank = require('../models/Donate/orderRankModel');
const User = require('../models/userModel');
const OrderArtifact = require('../models/Donate/orderArtifactModel');

class orderStatusController {
  async createOrderStatus (req, res, next) {
    try {
      const { nickname, couponInfo, priceDonate, selectedDuration, selectedPaymentMethod, isAgreed, idDonate, weightDonate } = req.body;

      const checkNickname = await orderService.findNickname(nickname);
      if (!checkNickname) {
        return res.status(400).json({ status: false, typeError: 'Not find Nickname', message: 'Пользователь не найден!'})
      }

      // Проверка на есть ли данный статус в БД
      const checkIdDoante = await orderService.findIdDonate(idDonate, weightDonate);
      if (!checkIdDoante) {
        return res.status(400).json({ status: false, typeError: 'Not find Donate status', message: 'Статус не найден!'})
      }

      // Получаем текущий вес статуса пользователя
      const currentUserStatusWeight = await orderService.getCurrentUserStatusWeight(checkNickname.roles);
      // Получаем вес статуса, который пользователь пытается купить
      const selectedStatusWeight = await orderService.getSelectedStatusWeight(idDonate);
      // Если текущий статус пользователя выше или равен весу нового статуса, возвращаем ошибку
      if (currentUserStatusWeight === selectedStatusWeight) {
        // Находим текущий статус пользователя в таблице RankDonate
        const currentStatus = await RankDonate.findOne({ where: { weight: currentUserStatusWeight } });
        if (currentStatus) {
          return res.status(400).json({ status: false, typeError: 'Donate status error', message: `У вас уже есть "${currentStatus.name}".` });
        }
      } else if (currentUserStatusWeight > selectedStatusWeight) {
        // Находим текущий статус пользователя в таблице RankDonate
        const currentStatus = await RankDonate.findOne({ where: { weight: currentUserStatusWeight } });
        if (currentStatus) {
          return res.status(400).json({ status: false, typeError: 'Donate status error', message: `У вас есть статус лучше "${currentStatus.name}".` });
        }
      }

      // Проверка на выбранный "Длительность". Сходится ли данные
      const checkSelectedDuration = await orderService.checkSelectedDuration(selectedDuration)
      if (!checkSelectedDuration) {
        return res.status(400).json({ status: false, typeError: 'Duration error', message: 'Ошибка при длительности!'})
      }

      // Проверка на схожесть idDonate на selectedDuration.rankId
      if (checkSelectedDuration.rankId !== idDonate) {
        return res.status(400).json({ status: false, typeError: 'Not find Donate status', message: 'Статус не найден!!'})
      }

      if (couponInfo.length > 0) {
        // Проверка самого купона
        const checkCoupon = await orderService.findCoupon(couponInfo.couponText)
        if (!checkCoupon) {
          return res.status(400).json({ status: false, typeError: 'Not find Coupon', message: 'Ошибка при проверке купона!'})
        }
        // Проверка процентности купона
        if (couponInfo.percent !== checkCoupon.discount) {
          return res.status(400).json({ status: false, typeError: 'Coupon error', message: 'Купон недействительный!'})
        }
        // Проверка цены, если есть купон
        const resultCheckPrice = await orderService.priceWithDiscount(selectedDuration.price, checkCoupon.discount)
        if (resultCheckPrice !== priceDonate) {
          return res.status(400).json({ status: false, typeError: 'Price error', message: 'Цена не сходится!'})
        }
      }

      // Проверка цены без купона
      if (!couponInfo) {
        if (checkSelectedDuration.price !== priceDonate) {
          return res.status(400).json({ status: false, typeError: 'Price error', message: 'Цена не сходится!!'})
        }
      }
      // Проверка согласия на "Публичную оферту"
      if (!isAgreed) {
        return res.status(400).json({ status: false, typeError: 'Agreed error', message: 'Вы не согласились с условиями!'})
      }

      // =====================

      if (nickname ||
        (couponInfo.length > 0) ||
        priceDonate ||
        selectedDuration ||
        selectedPaymentMethod ||
        isAgreed ||
        idDonate ||
        weightDonate
      ) {
        // После всех проверок и перед отправкой успешного ответа
        await OrderRank.create({
          status: 'processing', // status | processing  error  successfully
          nickname: nickname,
          couponText: couponInfo?.couponText || null,
          couponPercent: couponInfo?.percent || null,
          priceDonate: priceDonate,
          orderDurationId: selectedDuration.id,
          paymentMethodLabel: selectedPaymentMethod.label,
          isAgreed: isAgreed,
          idDonate: idDonate,
          weightDonate: weightDonate
        });
        await User.update({ roles: [...checkNickname.roles, idDonate] }, { where: { id: checkNickname.id } })
        // Отправляем успешный ответ
        return res.status(200).json({ status: true, message: 'Спасибо за покупку!' });
      }
      //! Придумать что-то 
      res.status(200).json({ status: true, message: 'Оплатили!'})
    } catch (error) {
      next(error);
    }
  }

  //! selectedPaymentMethod сделать тоже проверку на это
  async createOrderArtifact(req, res, next) {
    // Функция для округления цены
    function roundToTwo(num) {
      return +(Math.round(num + "e+2")  + "e-2");
    }

    const tolerance = 0.01; // Допустимая разница в цене
    try {
      console.log(34534534535);
      console.log(req.body);

      const { nickname, couponInfo, idArtifact, idName, count, finalPrice, selectedPaymentMethod, isAgreed } = req.body;

      const checkNickname = await orderService.findNickname(nickname);
      if (!checkNickname) {
        return res.status(400).json({ status: false, typeError: 'Not find Nickname', message: 'Пользователь не найден!'})
      }

      // Проверка есть ли данный артифакт в БД
      const findArtifact = await orderService.findArtifact(idArtifact, idName);
      if (!findArtifact) {
        return res.status(400).json({ status: false, typeError: 'Not find Artifact', message: 'Артифакт не найден!'})
      }

      // Проверка на максимальное кол-во артефактов
      if (!count || count <= 0 || count > findArtifact.maxCount) {
        return res.status(400).json({ status: false, typeError: 'Max count error', message: 'Ошибка при подсчёте максимального кол-во!' });
      }

      // Проверка купона и цены есть есть купон
      if (couponInfo && Object.keys(couponInfo).length > 0) {
        // Проверка самого купона
        if (typeof couponInfo === 'object' && couponInfo !== null && 'couponText' in couponInfo && 'percent' in couponInfo) {
          if (couponInfo.couponText.length > 0 && (typeof couponInfo.percent === 'number' && couponInfo.percent > 0)) {
            
            const checkCoupon = await orderService.findCoupon(couponInfo.couponText)
            if (!checkCoupon) {
              return res.status(400).json({ status: false, typeError: 'Not find Coupon', message: 'Ошибка при проверке купона!'})
            }

            // Проверка процентности купона
            if (couponInfo.percent !== checkCoupon.discount) {
              return res.status(400).json({ status: false, typeError: 'Coupon error', message: 'Купон недействительный!'})
            }

            // Проверка цены, если есть купон
            const resultCheckPrice = await orderService.priceWithDiscount(findArtifact.price, checkCoupon.discount)

            // Убедитесь, что результат округлен до двух знаков после запятой
            let finalPriceWithCoupon = roundToTwo(resultCheckPrice * count);

            if (Math.abs(finalPriceWithCoupon - finalPrice) > tolerance) {
              return res.status(400).json({ status: false, typeError: 'Price error', message: 'Цена не сходится!'})
            }
          } else {
            return res.status(400).json({ status: false, typeError: 'Incorrect coupon format1', message: 'Неверный формат купона!2'})
          }
        } else {
          return res.status(400).json({ status: false, typeError: 'Incorrect coupon format2', message: 'Неверный формат купона!1'})
        }
      }

      // Проверка цены без купона
      if (!couponInfo) {
        if (Math.abs((findArtifact.price * count) - finalPrice) > tolerance) {
          return res.status(400).json({ status: false, typeError: 'Price error', message: 'Цена не сходится!'})
        }
      }

      // Проверка согласия на "Публичную оферту"
      if (!isAgreed) {
        return res.status(400).json({ status: false, typeError: 'Agreed error', message: 'Вы не согласились с условиями!'})
      }

      if (nickname ||
        (couponInfo.length > 0) ||
        count ||
        finalPrice ||
        isAgreed ||
        selectedPaymentMethod ||
        idArtifact ||
        idName
      ) {
        // После всех проверок и перед отправкой успешного ответа
        await OrderArtifact.create({
          status: 'processing', // status | processing  error  successfully
          nickname: nickname,
          couponText: couponInfo?.couponText || null,
          couponPercent: couponInfo?.percent || null,
          idArtifact: idArtifact,
          idName: idName,
          countArtifact: count,
          price: finalPrice,
          paymentMethodLabel: selectedPaymentMethod.label,
          isAgreed: isAgreed
        });
        // Отправляем успешный ответ
        return res.status(200).json({ status: true, message: 'Спасибо за покупку!' });
      }

      res.status(200).json({ status: true, message: 'Оплатили!'})
    } catch (error) {
      next(error);
    }
  }
};

module.exports = new orderStatusController();