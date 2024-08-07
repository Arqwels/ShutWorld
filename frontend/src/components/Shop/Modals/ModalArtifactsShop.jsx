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
import CreateOrderService from "../../../service/CreateOrderService";
import { toast } from "react-toastify";

const ModalArtifact = ({ isOpen, descriptionTitle, descriptionText, priceOnePiece, maxCount, idArtifact, idName, onClose }) => {
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
  const priceWithDiscount = useCallback((totalPrice, discount) => {
    // Проверка входных данных
    if (isNaN(totalPrice) || isNaN(discount)) {
      console.error("Входные данные должны быть числами");
      return null;
    }
  
    if (totalPrice < 0 || discount < 0 || discount > 100) {
      console.error("Некорректные значения для цены или скидки");
      return null;
    }
  
  
    const discountAmount = (totalPrice * discount) / 100;
    const finalPrice = (totalPrice - discountAmount).toFixed(2);
  
    return parseFloat(finalPrice); // Возвращаем число вместо строки
  }, []);

  // Функция для обновления finalPrice в зависимости от скидки
  const checkPrice = useCallback(() => {
    const totalPrice = count * priceOnePiece;
    if (discount) {
      const finalPriceWithDiscount = priceWithDiscount(totalPrice, discount);
      setFinalPrice(finalPriceWithDiscount); // Обновляем состояние finalPrice
    } else {
      setFinalPrice(totalPrice); // Обновляем состояние finalPrice без скидки
    }
  }, [count, discount, priceOnePiece, priceWithDiscount]);

  // Функция для проверки купона
  const checkCoupon = async () => {
    try {
      // Отправляем запрос на проверку купона на сервере
      const response = await CheckCouponService.checkCoupon({ couponCode: coupon });
      // Если купон не существует, выводим сообщение об ошибке в консоль
      if (!response.data.exists) {
        console.log('Ошибка в проверке купона!');
      }

      const couponInfo = response.data.couponInfo; // Получаем информацию о купоне из ответа сервера
      setDiscount(couponInfo.discount); // Устанавливаем скидку из данных купона
      
      const totalPrice = count * priceOnePiece; // Пересчитываем общую цену с учетом количества
      const finalPriceWithDiscount = priceWithDiscount(totalPrice, couponInfo.discount); // Применяем скидку к общей цене
      
      // Обновляем состояние купона (существует, величина скидки) 
      const dataToUpdate = { exists: response.data.exists, discount: couponInfo.discount };
      setCouponData(dataToUpdate);
      
      setFinalPrice(finalPriceWithDiscount); // Устанавливаем итоговую цену с учетом скидки
    } catch (error) {
      // Обрабатываем ошибку, возникшую при проверке купона
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

    console.log(idArtifact);
    console.log(idName);

    if (!nickname) {
      setNicknameError('Введите никнейм!');
    }

    if (count < 1 || count > maxCount) {
      setCountError(`Введите значение от 1 до ${maxCount}`)
    }
  
    if (selectedPaymentMethod === null) {
      setSelectPaymentMethod('Выберите значение!');
    }

    if (nickname && count && selectedPaymentMethod && isAgreed) {
      
      let couponInfo = {};
      if (couponData?.exists) {
        couponInfo.couponText = coupon;
        couponInfo.percent = couponData.discount;
      }

      try {
        const result = await CreateOrderService.createOrderArtifact({
          nickname, 
          couponInfo,
          idArtifact,
          idName,
          count,
          finalPrice,
          selectedPaymentMethod, 
          isAgreed,
        })
        if (result.data.status) {
          toast.success(result.data.message, {autoClose: 2000})
        }
      } catch (error) {
        if (!error.response.data.status) {
          if (error.response.data.typeError === 'Not find Nickname') {
            setNicknameError(error.response.data.message);
          }
        }
        console.log(error);
      }
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
