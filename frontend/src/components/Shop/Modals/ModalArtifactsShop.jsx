import { useState } from "react";
import Portal from "../../Portal";
import { Link } from "react-router-dom";
import PaymentMethod from "../Payment&Duration/PaymentMethod";

import st from "./ModalForShop.module.scss";

import LinkFormVK from "../../../assets/images/icons/link-formvk-icon.svg";
import QuestionMark from "../../../assets/images/ShopPage/question-mark.svg";
import CloseIcon from "../../../assets/images/icons/close-icon.svg";

const ModalArtifact = ({ isOpen, onClose, descriptionTitle, descriptionText }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  
  return (
    <>
      { isOpen &&
        <Portal>
          <div className={st.modalWindow}>

            <div className={`${st.modalRigth} ${st.descTA}`}>
              <h2>Описание - {descriptionTitle}</h2>
              <p>{descriptionText}</p>
            </div>

            <div className={`${st.mobModalRight} ${st.descTA}`}>
              <h2>Описание - {descriptionTitle}</h2>
              <p>{descriptionText}</p>
              <button className={st.closeIcon} tabIndex={1} onClick={onClose}><img src={CloseIcon} alt="CloseIcon"/></button>
            </div>

            <div className={st.modalLeft}>
              <h2>Покупка</h2>
              <form className={st.modalForm} method="get" action="#">
                <label className={st.formLabel} htmlFor="nickname">Никнейм</label>
                <input className={st.formInputText} type="text" name="nickname" placeholder="Введите свой никнейм" required />
              
                <label className={st.formLabel} htmlFor="coupon">Купон</label>
                <input className={`${st.formInputText} ${st.coupon}`} type="text" name="coupon" placeholder="Введите купион, если имеется" />
                
                {/* Сделать отдельным компонентом, добавить множество проверок! */}
                <label className={st.formLabel} htmlFor="count">Количество</label>
                <input className={st.formInputText} type="number" name="count" placeholder="Введите количество" required />

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
              <button onClick={() => console.log(selectedPaymentMethod)}>Нажми меня</button>
            </div>
          </div>

          <div className={st.overlay} onClick={onClose}/>
        </Portal>
      }
    </>
  )
};

export default ModalArtifact;