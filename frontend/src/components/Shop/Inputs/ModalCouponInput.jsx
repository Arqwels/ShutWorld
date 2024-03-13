import st from './../Modals/ModalForShop.module.scss';
import checkIcon from './checkIcon.png';

const ModalCouponInput = ({ id, label, className, status, onClick, discount, ...attrs }) => {
  let errorMessage = '';
  let errorClass = '';

  // Определение сообщения об ошибке и класса ошибки на основе статуса
  if (status === 'notFound' || status === 'empty' || status === 'expired') {
    if (status === 'notFound') {
      errorMessage = 'Купон не найден!';
    } else if (status === 'expired') {
      errorMessage = 'Срок действия купона истек!';
    } else if (status === 'empty') {
      errorMessage = 'Поле купона пустое!';
    }
    errorClass = st.inputTextError;
  }

  console.log(status);

  return (
    <div className={st.inputWrapper}>
      {/* Лейбл и сообщение об ошибке */}
      {label &&
        <div className={st.wrapperLabel}>
          <label className={st.inputLabel} htmlFor={id}>{label}</label>
          {status && errorMessage && <span className={st.inputError}>{errorMessage}</span>}
          {discount && <span className={st.discount}>{discount}% скидка</span>}
        </div>
      }

      {/* Поле ввода */}
      <input 
        name={id}
        id={id}
        className={`${className} ${errorClass} `} // Класс ошибки добавляется, если есть ошибка
        {...attrs}
      />
      {/* Иконка для проверки купона */}
      <img src={checkIcon} onClick={onClick} alt="checkIcon" className={st.checkImg}/>
    </div>
  );
};

export default ModalCouponInput;
