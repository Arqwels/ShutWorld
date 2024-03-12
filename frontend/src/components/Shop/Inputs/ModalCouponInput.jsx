import st from './../Modals/ModalForShop.module.scss';
import checkIcon from './checkIcon.png';

const ModalCouponInput = ({ id, label, className, error, onClick, ...attrs }) => {
  const errorClass = error && error[1] ? st.inputTextError : '';

  return (
    <div className={st.inputWrapper}>
      {label &&
        <div className={st.wrapperLabel}>
          <label className={st.inputLabel} htmlFor={id}>{label}</label>
          {error && error[0] && error[1] && <span className={st.inputError}>{error}</span>}
        </div>
      }
      <input 
        name={id}
        id={id}
        className={`${className} ${errorClass}`}
        {...attrs}
      />
      <img src={checkIcon} onClick={onClick} alt="checkIcon" className={st.checkImg}/>
    </div>
  )
}

export default ModalCouponInput