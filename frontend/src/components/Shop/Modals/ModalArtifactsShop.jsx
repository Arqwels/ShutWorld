import { useCallback, useEffect, useState } from "react";
import Portal from "../../Portal";
import PaymentMethod from "../Payment&Duration/PaymentMethod";

import st from "./ModalForShop.module.scss";

import CloseIcon from "../../../assets/images/icons/close-icon.svg";
import ModalNicknameInput from "../Inputs/ModalNicknameInput";
import ModalCouponInput from "../Inputs/ModalCouponInput";
import ModalCountInput from "../Inputs/ModalCountInput";
import CheckCouponService from "../../../service/CheckCouponService";
import ModalFormQuest from "../Inputs/ModalFormQuest";
import ModalFormOffer from "../Inputs/ModalFormOffer";

const ModalArtifact = ({ isOpen, onClose, descriptionTitle, descriptionText, priceOnePiece, maxCount }) => {
  const [ textForm, setTextForm ] = useState('Данные не заполнены!');
  const [ statusForm, setStatusForm ] = useState(false);
  const [ finalPrice, setFinalPrice ] = useState(priceOnePiece);

  // Nickname
  const [ nickname, setNickname ] = useState('');
  const [ nicknameError, setNicknameError ] = useState('');
  const [ classNickname, setClassNickname ] = useState('');
  // Coupon
  const [ coupon, setCoupon ] = useState('');
  const [ couponData, setCouponData ] = useState(null);
  const [ discount, setDiscount ] = useState(null);
  const [ classCoupon, setClassCoupon ] = useState('');
  // Count
  const [ count, setCount ] = useState(1);
  const [ countError, setCountError ] = useState('');
  // PaymentMethod
  const [ selectedPaymentMethod, setSelectedPaymentMethod ] = useState(null);
  const [ selectPaymentMethod, setSelectPaymentMethod ] = useState('');
  // Согласие с публичной офертой
  const [ isAgreed, setIsAgreed ] = useState(false);

  // Handler для Никнейма
  const changeNickname = (event) => {
    setNickname(event.target.value);
    if (event.target.value.length === 0)
      setNicknameError('Введите никнейм');
    else if (event.target.value.length <= 4) {
      setNicknameError('Короткий никнейм');
    }
    else if (event.target.value.length >= 4 && event.target.value.length <= 16) {
      setNicknameError('');
      setClassNickname(st.inputBorderValid);
    }
    else if (event.target.value.length >= 16)
      setNicknameError('Длинный никнейм');
  }
  
  // Handler для Купоня
  const changeCoupon = (event) => {
    setCoupon(event.target.value);
    setCouponData({ ...couponData, exists: false, message: '', discount: '' });
    setDiscount(null)
    setClassCoupon('')
    checkPrice();
  }

  // Handler для Количества товаров
  const countChange = (event) => {
    const enteredCount = parseInt(event.target.value); // Преобразование введенного значения в число
    setCount(event.target.value); // Обновление состояния счетчика
    if (event.target.name === 'count') {
      if (isNaN(enteredCount)) { // Проверка на то, что введено число
        setCountError('Введите число');
      } else if (enteredCount < 1 || enteredCount > maxCount) { // Проверка на соответствие ограничениям
        setCountError(`Введите значение от 1 до ${maxCount}`);
      } else {
        setCountError(''); // Сброс ошибки, если введенное значение корректно
      }
    }
    checkPrice(); // Пересчитываем цену при изменении количества
  }
  
  // Для PaymentMethod
  const resetMethodStatus = () => {
    setSelectPaymentMethod('');
  }

  // Подтверждение на согласие с публичной офертой
  const сheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  // Подсчёт скидки 
  const priceWithDiscount = useCallback((price, discount) => {
    const discountAmount = (price * discount) / 100;
    let totalPrice = price - discountAmount;
  
    // Округляем число до двух десятичных знаков
    const precision = Math.pow(10, 2);
    totalPrice = Math.ceil(totalPrice * precision) / precision;
  
    // Применяем метод toFixed() для обрезания до двух знаков после запятой
    return totalPrice.toFixed(2);
  }, []);

  // Функция для обновления finalPrice в зависимости от скидки
  const checkPrice = useCallback(() => {
    if (discount) {
      const newFinalPrice = calculateTotalPrice(count, priceWithDiscount(priceOnePiece, discount));
      setFinalPrice(newFinalPrice); // Обновляем состояние finalPrice
    } else {
      const newFinalPrice = calculateTotalPrice(count, priceOnePiece);
      setFinalPrice(newFinalPrice); // Обновляем состояние finalPrice
    }
  }, [count, discount, priceOnePiece, priceWithDiscount]);

  // Функция для проверки купона
  const checkCoupon = async () => {
    try {
      const response = await CheckCouponService.checkCoupon({ couponCode: coupon });
      if (!response.data.exists) {
        console.log('Ошибка в проверке купона!');
      }
      const couponInfo = response.data.couponInfo;
      setDiscount(couponInfo.discount); // Устанавливаем скидку
      // Пересчитываем цену с учетом купона
      const newFinalPrice = calculateTotalPrice(count, priceWithDiscount(priceOnePiece, couponInfo.discount));
      const dataToUpdate = { exists: response.data.exists, discount: couponInfo.discount };
      setCouponData(dataToUpdate);
      setFinalPrice(newFinalPrice);
    } catch (error) {
      couponError(error);
    }
  };

  // Функция для обработки ошибки функции checkCoupon
  const couponError = (error) => {
    console.error('Произошла ошибка при проверке купона:', error);
    if (error.response && error.response.status === 400) {
      setCouponData(error.response.data);
    }
  };
  
  // Функция для расчета общей стоимости
  const calculateTotalPrice = (count, price) => {
    const totalPrice = count * price;
    return parseFloat(totalPrice.toFixed(2));
  }

  // Для проверки на пустой input в Никнейме
  const blurHandler = (e) => {
    if (e.target.name === 'nickname') {
      if (nickname.length === 0) {
        setNicknameError('Введите никнейм!');
      } else if (nickname.length <= 4) {
        setNicknameError('Короткий никнейм');
      } else if (nickname.length >= 16) {
        setNicknameError('Длинный никнейм');
      } else {
        setNicknameError('');
      }
    } else {
      alert('Неизвестное значение');
    }
  }

  const checkStatusForm = useCallback(() => {
    const disabledText = 'Данные не заполнены!';
    if (!nickname || selectedPaymentMethod === null || nicknameError !== '' || !isAgreed || countError !== '') {
      setStatusForm(false);
      setTextForm(disabledText);
    } else {
      checkPrice();
      setStatusForm(true);
      setTextForm(`Оплатить ${finalPrice}₽`);
    }
  }, [nickname, selectedPaymentMethod, nicknameError, isAgreed, countError, finalPrice, checkPrice]);

  useEffect(() => {
    checkStatusForm();
  }, [checkStatusForm, priceOnePiece]);

  // Отправка формы
  const submitForm = async (e) => {
    e.preventDefault();

    console.log(2234234234);

    if (count < 1 || count > maxCount) {
      setCountError(`Введите значение от 1 до ${maxCount}`)
    }

    let priceDonate = 0;

    if (!nickname) {
      setNicknameError('Введите никнейм!');
    }
  
    if (selectedPaymentMethod === null) {
      setSelectPaymentMethod('Выберите значение!');
    }

    if (nickname && priceDonate && selectedPaymentMethod && isAgreed) {
      
      let couponInfo = {};
      if (couponData?.exists) {
        couponInfo.couponText = coupon;
        couponInfo.percent = couponData.discount;
      }

      // try {
      //   const result = await CreateOrderService.createOrderDonate({
      //     nickname, 
      //     couponInfo,
      //     priceDonate, 
      //     selectedPaymentMethod, 
      //     isAgreed, 
      //   })
      //   if (result.data.status) {
      //     toast.success(result.data.message, {autoClose: 2000})
      //   }
      // } catch (error) {
      //   if (!error.response.data.status) {
      //     if (error.response.data.typeError === 'Not find Nickname') {
      //       setNicknameError(error.response.data.message);
      //     } else if (error.response.data.typeError === 'Donate status error') {
      //       setNicknameError(error.response.data.message);
      //       toast.error (error.response.data.message, {autoClose: 2000})
      //     }
      //   }
      //   console.log(error);
      // }
    }
  }

  return (
    <>
      {isOpen &&
        <Portal>
          <div className={st.modalWindow}>

            <div className={`${st.modalRigth} ${st.descTA}`}>
              <h2>Описание - {descriptionTitle}</h2>
              <h3 className={st.titlePrice}>Цена за 1шт - {priceOnePiece}₽</h3>
              <p>{descriptionText}</p>
            </div>

            <div className={`${st.mobModalRight} ${st.descTA}`}>
              <h2>Описание - {descriptionTitle}</h2>
              <h3>Цена за 1шт - {priceOnePiece}₽</h3>
              <p>{descriptionText}</p>
              <button className={st.closeIcon} tabIndex={1} onClick={onClose}><img src={CloseIcon} alt="CloseIcon"/></button>
            </div>

            <div className={st.modalLeft}>
              <h2>Покупка</h2>
              <form className={st.modalForm}>
                <ModalNicknameInput
                  id={'nickname'}
                  label={'Никнейм'}
                  className={st.formInputText}
                  type={'text'}
                  placeholder={'Введите свой никнейм'}
                  error={nicknameError}
                  classSts={classNickname}
                  value={nickname}
                  onBlur={(e) => blurHandler(e)}
                  onChange={changeNickname}
                  required
                />

                <ModalCouponInput
                  id={'coupon'}
                  label={'Купон'}
                  className={`${st.formInputText} ${st.coupon}`}
                  type={'text'}
                  placeholder={'Введите купион, если имеется'}
                  discount={discount}
                  value={coupon}
                  couponData={couponData}
                  statusClass={classCoupon}
                  onChange={changeCoupon}
                  onClick={checkCoupon}
                />

                <ModalCountInput
                  id={'count'}
                  label={'Количество'}
                  className={`${st.formInputText}`}
                  type={'number'}
                  placeholder={'Введите количество'}
                  error={countError}
                  value={count}
                  onChange={countChange}
                  min={1}
                  max={maxCount}
                  required
                />

                <PaymentMethod
                  onSelectPaymentMethod={(selectedMethod) => {
                    setSelectedPaymentMethod(selectedMethod);
                    resetMethodStatus();
                    checkStatusForm()
                  }}
                  selectStatus={selectPaymentMethod}
                  resetMethodStatus={resetMethodStatus}
                />

                <ModalFormQuest />

                <ModalFormOffer onChange={сheckboxChange} />

                <button onClick={submitForm} type="submit" className={st.btn} disabled={!statusForm} >{textForm}</button>
              </form>
            </div>
          </div>

          <div className={st.overlay} onClick={onClose} />
        </Portal>
      }
    </>
  )
};

export default ModalArtifact;
