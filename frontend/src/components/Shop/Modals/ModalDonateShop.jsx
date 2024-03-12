import { useState } from "react";
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

  const [nickname, setNickname] = useState('');
  const [coupon, setCoupon] = useState('');

  const [nicknameDirty, setNicknameDirty] = useState(false);
  const [couponDirty, setCouponDirty] = useState(false);

  const [nicknameError, setNicknameError] = useState('Введите никнейм!');
  const [couponError, setCouponError] = useState('Введите никнейм!');

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'nickname':
        setNicknameDirty(true)
        break
      case 'coupon':
        setCouponDirty(true)
        break
      default:
        alert( 'Неизвестное значение' );
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
    }
    else if (event.target.value.length >= 16)
      setNicknameError('Длинный никнейм');
  }

  const changeCoupon = (event) => {
    setCoupon(event.target.value);
    
  }

  const checkCoupone = async () => {
    try {
      console.log(coupon);
      const response = await CheckCouponService.checkCoupon({ couponCode: coupon });
      console.log(response);

    } catch (error) {
      console.log(error.response?.data?.message);
      console.log(error);
    }
  }
  
  return (
    <>
      { isOpen &&
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
              <form className={st.modalForm} method="get" action="#">
                
                <ModalNicknameInput 
                  id={'nickname'}
                  label={'Никнейм'}
                  className={st.formInputText}
                  type={'text'}
                  placeholder={'Введите свой никнейм'}
                  error={[nicknameError, nicknameDirty]}
                  value={nickname}
                  onBlur={(e) => blurHandler(e)}
                  onChange={changeNickname}
                  required
                />

                {/* <label className={st.formLabel} htmlFor="nickname">Никнейм</label>
                <input className={st.formInputText} type="text" name="nickname" placeholder="Введите свой никнейм" required /> */}
                
                <ModalCouponInput 
                  id={'coupon'}
                  label={'Купон'}
                  className={`${st.formInputText} ${st.coupon}`}
                  type={'text'}
                  placeholder={'Введите купион, если имеется'}
                  
                  value={coupon}
                  onBlur={(e) => blurHandler(e)}
                  onChange={changeCoupon}
                  onClick={checkCoupone}
                  required
                />

                {/* <label className={st.formLabel} htmlFor="coupon">Купон</label>
                <input className={`${st.formInputText} ${st.coupon}`} type="text" name="coupon" placeholder="Введите купион, если имеется" /> */}
              
                <DurationSelect donateStatus={donStatus} onDurationSelect={(duration) => setSelectedDuration(duration)} />
                <PaymentMethod onSelectPaymentMethod={(selectedMethod) => setSelectedPaymentMethod(selectedMethod)} />

                <div className={st.formQuest}>
                  <img src={QuestionMark} alt="QuestionMark" />
                  <div className={st.formQuestText}>
                    <p>Произошла какая-то ошибка или не можете оплатить? Тогда сообщите нам, мы поможем.</p>
                    <Link to="https://vk.com/shutw" target="_blank"><img src={LinkFormVK} alt="LinkFormVK" />vk.com/shutworld</Link>
                  </div>
                </div>

                <div className={st.formOffer}>
                  <input className={st.publicOffer} type="checkbox" name="publicOffer" id="publicOffer" required/>
                  <label htmlFor="publicOffer">Ознакомился с <Link to="#" target="_blank">публичной офертой</Link></label>
                </div>

                <button className={st.btn} disabled type="submit">Данные не заполнены</button>
              </form>
              <button onClick={() => console.log(nickname, selectedDuration, selectedPaymentMethod)}>Нажми меня</button>
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