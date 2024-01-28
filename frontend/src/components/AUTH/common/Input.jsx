import style from "../Auth.module.scss";

const Input = ({ titleLabel, textLabel, errors, value, onChange, onBlur, type, name, placeholder, required }) => {
  return (
    <div className={style.wrapFormItem}>

      <div>
        <h3 className={style.titleField}>{titleLabel}</h3>
        <p className={style.descriptionReg}>{textLabel}</p>
      </div>

      <div className={style.wrapError}>
        {(errors[0] && errors[1]) && <div className={style.error}>{errors[1]}</div>}
        {(errors[2]) && <div className={style.error}>{errors[2]}</div>}
        <input className={style.inputBut}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          name={name}
          placeholder={placeholder}
          required/>
      </div>

    </div>
  )
}

export default Input