import st from './../Modals/ModalForShop.module.scss';

const ModalNicknameInput = ({ id, label, className, error, ...attrs }) => {

  const errorClass = error && error[1] ? st.inputTextError : '';

  return (
    <>
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
    </>
  )
}

export default ModalNicknameInput;
