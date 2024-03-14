import st from './../Modals/ModalForShop.module.scss';

const ModalNicknameInput = ({ id, label, className, error, classSts, ...attrs }) => {
  const errorClass = error && error[1] ? st.inputBorderError : '';

  return (
    <>
      {label &&
        <div className={st.wrapperLabel}>
          <label className={st.inputLabel} htmlFor={id}>{label}</label>
          {error && error[0] && error[1] && <span className={`${st.labelSpan} ${st.labelSpanBackgroundError}`}>{error}</span>}
        </div>
      }
      <input 
        name={id}
        id={id}
        className={`${className} ${errorClass} ${classSts}`}
        {...attrs}
      />
    </>
  )
}

export default ModalNicknameInput;
