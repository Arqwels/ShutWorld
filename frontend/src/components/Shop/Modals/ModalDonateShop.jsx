import Portal from "../../Portal";
import { Link } from "react-router-dom";
import DurationSelect from "../Payment&Duration/DurationSelect";
import PaymentMethod from "../Payment&Duration/PaymentMethod";
import st from "./ModalForShop.module.scss";

import LinkFormVK from "../../../images/icon-link-formvk.svg";
import QuestionMark from "../../../images/question-mark.svg";
import CloseIcon from "../../../assets/images/icons/close-icon.png"

const ModalForShop= ({ isOpen, donStatus, descriptionTitle, descriptionText, privilegeText, onCancel }) => {
  
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
              <button className={st.closeIcon} tabIndex={1} onClick={onCancel}><img src={CloseIcon} alt="CloseIcon"/></button>
            </div>

            <div className={st.modalLeft}>
              <h2>Покупка</h2>
              <form className={st.modalForm} method="get" action="#">
                <label className={st.formLabel} htmlFor="nickname">Никнейм</label>
                <input className={st.formInputText} type="text" name="nickname" placeholder="Введите свой никнейм" required />
              
                <label className={st.formLabel} htmlFor="coupon">Купон</label>
                <input className={`${st.formInputText} ${st.coupon}`} type="text" name="coupon" placeholder="Введите купион, если имеется" />
              
                <DurationSelect donateStatus={donStatus} />
                <PaymentMethod />

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
            </div>

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
          
          <div className={st.overlay} onClick={onCancel}/>
        </Portal>
      }
    </>
  )
}

export default ModalForShop;