import { useCallback, useEffect, useState } from "react";
import Portal from "../../Portal";
import { Link } from "react-router-dom";
import DurationSelect from "../Payment&Duration/DurationSelect";
import PaymentMethod from "../Payment&Duration/PaymentMethod";
import st from "./ModalForShop.module.scss";

import LinkFormVK from "../../../assets/images/icons/link-formvk-icon.svg";
import QuestionMark from "../../../assets/images/ShopPage/question-mark.svg";
import CloseIcon from "../../../assets/images/icons/close-icon.svg";

import ModalNicknameInput from "../Inputs/ModalNicknameInput";
import ModalCouponInput from "../Inputs/ModalCouponInput";
import CheckCouponService from "../../../service/CheckCouponService";

const ModalDonate = ({ isOpen, donStatus, descriptionTitle, descriptionText, privilegeText, onClose }) => {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [discount, setDiscount] = useState(null);

  const [nickname, setNickname] = useState('');
  const [coupon, setCoupon] = useState('');

  const [nicknameError, setNicknameError] = useState('');
  const [classCoupon, setClassCoupon] = useState('');
  const [classNickname, setClassNickname] = useState('');
  const [formText, setFormText] = useState('Данные не заполнены!');

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

  const changeCoupon = (event) => {
    setCoupon(event.target.value);
    setCouponData({ ...couponData, message: '', discount: '' });
    setDiscount(null)
    setClassCoupon('')
    checkPrice();
  }
  
  const [ selectDuration, setSelectDuration ] = useState('');
  const resetSelectStatus = () => {
    setSelectDuration('');
  };

  const [ selectPaymentMethod, setSelectPaymentMethod ] = useState('');
  const resetMethodStatus = () => {
    setSelectPaymentMethod('');
  }
  
  const checkCoupon = async () => {
    try {
      const response = await CheckCouponService.checkCoupon({ couponCode: coupon });
      if (!response.data.exists) {
        console.log('Ошибка в проверке купона!');
      }
      const couponInfo = response.data.couponInfo;
      const dataToUpdate = { exists: response.data.exists, discount: couponInfo.discount };
      setCouponData(dataToUpdate);
      setDiscount(couponInfo.discount);
      checkPrice();
    } catch (error) {
      couponError(error);
    }
  };

  const couponError = (error) => {
    console.error('Произошла ошибка при проверке купона:', error);
    if (error.response && error.response.status === 400) {
      setCouponData(error.response.data);
    }
  };

  const priceWithDiscount = (price, discount) => {
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

  const [isAgreed, setIsAgreed] = useState(false);
  const сheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const checkPrice = () => {
    let priceDonate = 0;
    if (selectedDuration === null) {
      setSelectDuration('Выберите значение!')
    } else {
      const price = selectedDuration.price;
      if (discount) {
        priceDonate = priceWithDiscount(price, discount)
      } else {
        priceDonate = price;
      }
      setFormText(`Оплатить ${priceDonate}₽`);
    }
  }

  const [ statusForm, setStatusForm ] = useState(false);
  const checkStatusForm = useCallback(() => {
    const disabledText = 'Данные не заполнены!';
    if (!nickname || selectedDuration === null || selectedPaymentMethod === null || !isAgreed || nicknameError !== '') {
      setStatusForm(false);
      setFormText(disabledText);
    } else {
      let priceDonate = 0;
      const price = selectedDuration.price;
      if (discount) {
        priceDonate = priceWithDiscount(price, discount);
      } else {
        priceDonate = price;
      }
      setStatusForm(true);
      setFormText(`Оплатить ${priceDonate}₽`);
    }
  }, [nickname, selectedDuration, selectedPaymentMethod, isAgreed, nicknameError, discount])

  useEffect(() => {
    checkStatusForm();
  }, [checkStatusForm]);
  
  const submitForm = async (e) => {
    e.preventDefault();

    let priceDonate = 0;

    if (!nickname) {
      setNicknameError('Введите никнейм!');
    }
  
    if (selectedDuration === null) {
      setSelectDuration('Выберите значение!')
    } else {
      const price = selectedDuration.price;
      if (discount) {
        priceDonate = priceWithDiscount(price, discount)
      } else {
        priceDonate = price;
      }
      setFormText(`Оплатить ${priceDonate}₽`);
    }
  
    if (selectedPaymentMethod === null) {
      setSelectPaymentMethod('Выберите значение!')
    }

    if (nickname && priceDonate && selectedDuration && selectedPaymentMethod && isAgreed) {
      console.log(nickname, priceDonate, selectedDuration, selectedPaymentMethod, isAgreed);
    }

  }

  return (
    <>
      {isOpen &&
        <Portal>
          <div className={st.modalWindow}>

            <div className={st.modalRigth}>
              <h2>Описание - {descriptionTitle}</h2>
              <p>{descriptionText}</p>
              <div className={st.privilege}>
                <h3>Возможности</h3>
                <ul className={st.privilegeList}>
                  {Object.entries(privilegeText).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={st.mobModalRight}>
              <h2>Описание - {descriptionTitle}</h2>
              <p>{descriptionText}</p>
              <button className={st.closeIcon} tabIndex={1} onClick={onClose}><img src={CloseIcon} alt="CloseIcon"/></button>
            </div>

            <div className={st.modalLeft}>
              <h2>Покупка</h2>
              <form className={st.modalForm} >
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
              
                <DurationSelect 
                  donateStatus={donStatus} 
                  onDurationSelect={(duration) => {
                    setSelectedDuration(duration);
                    resetSelectStatus();
                    checkStatusForm()
                  }} 
                  selectStatus={selectDuration}
                  resetSelectStatus={resetSelectStatus}
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

                <div className={st.formQuest}>
                  <img src={QuestionMark} alt="QuestionMark" />
                  <div className={st.formQuestText}>
                    <p>Произошла какая-то ошибка или не можете оплатить? Тогда сообщите нам, мы поможем.</p>
                    <Link to="https://vk.com/shutw" target="_blank"><img src={LinkFormVK} alt="LinkFormVK" />vk.com/shutworld</Link>
                  </div>
                </div>

                <div className={st.formOffer}>
                  <input 
                    className={st.publicOffer} 
                    type="checkbox" 
                    name="publicOffer" 
                    id="publicOffer" 
                    required
                    onChange={сheckboxChange}
                  />
                  <label htmlFor="publicOffer">Ознакомился с <Link to="#" target="_blank">публичной офертой</Link></label>
                </div>

                <button onClick={submitForm} type="submit" className={st.btn} disabled={!statusForm}>{formText}</button>
              </form>
            </div>

            {/* Mobile */}
            <div className={st.mobModalPrivilege}>
              <div className={st.privilege}>
                <h3>Возможности</h3>
                <ul className={st.privilegeList}>
                  {Object.entries(privilegeText).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>


          </div>
          
          <div className={st.overlay} onClick={onClose}/>
        </Portal>
      }
    </>
  )
};

export default ModalDonate;