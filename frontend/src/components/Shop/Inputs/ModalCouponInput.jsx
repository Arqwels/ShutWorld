import st from './../Modals/ModalForShop.module.scss';
import checkIcon from './checkIcon.png';

const ModalCouponInput = ({ id, label, className, onClick, couponData, statusClass, ...attrs }) => {
  let errorMessage = '';
  let discount = '';

  // Проверка есть ли couponData и couponData.exists не null
  if (couponData && couponData.exists !== undefined) {
    const status = couponData.exists;
    // Проверка если ли status false и существует поле со значением message в couponData
    if (!status && couponData.message) {
      errorMessage = couponData.message;
      statusClass = st.inputBorderError;
    }
    // Проверка на существует ли купон
    if (status && couponData.discount) {
      discount = couponData.discount
      statusClass = st.inputBorderValid
    }
  }

  return (
    <div className={st.inputWrapper}>
      {/* Лейбл и сообщение об ошибке */}
      {label &&
        <div className={st.wrapperLabel}>
          <label className={st.inputLabel} htmlFor={id}>{label}</label>
          {couponData && couponData.exists !== undefined && errorMessage && <span className={`${st.labelSpan} ${st.labelSpanBackgroundError}`}>{errorMessage}</span>}
          {discount && <span className={`${st.labelSpan} ${st.labelSpanBackgroundValid}`}>{discount}% скидка</span>}
        </div>
      }
      {/* Поле ввода */}
      <input 
        name={id}
        id={id}
        className={`${className} ${statusClass}`}
        {...attrs}
      />
      {/* Иконка для проверки купона */}
      <img src={checkIcon} onClick={onClick} alt="checkIcon" className={st.checkImg}/>
    </div>
  );
};

export default ModalCouponInput;
