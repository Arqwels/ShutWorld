import st from './../Modals/ModalForShop.module.scss';
import checkIcon from './checkIcon.png';

const ModalCouponInput = ({ id, label, className, onClick, couponData, ...attrs }) => {
  let errorMessage = '';
  let errorClass = '';
  let discount = '';


  if (couponData && couponData.exists !== undefined) {
    const status = couponData.exists;

    if (!status) {
      errorMessage = couponData.message;
    } else {
      discount = couponData.discount
    }
  }


  return (
    <div className={st.inputWrapper}>
      {/* Лейбл и сообщение об ошибке */}
      {label &&
        <div className={st.wrapperLabel}>
          <label className={st.inputLabel} htmlFor={id}>{label}</label>
          {couponData && couponData.exists !== undefined && errorMessage && <span className={st.inputError}>{errorMessage}</span>}
          {discount && <span className={st.discount}>{discount}% скидка</span>}
        </div>
      }

      {/* Поле ввода */}
      <input 
        name={id}
        id={id}
        className={`${className} ${errorClass}`}
        {...attrs}
      />
      {/* Иконка для проверки купона */}
      <img src={checkIcon} onClick={onClick} alt="checkIcon" className={st.checkImg}/>
    </div>
  );
};

export default ModalCouponInput;
