import { useState } from "react";
import style from "../Auth.module.scss";
import eyeIcon from "../../../assets/images/icons/eye-fill.svg";
import eyeOffIcon from "../../../assets/images/icons/eye-off-fill.svg";

const Input = ({ titleLabel, textLabel, errors, value, onChange, onBlur, type, name, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordType = type === 'password' || type === 'repeatPassword';

  return (
    <div className={style.wrapFormItem}>
      <div>
        <label className={style.titleField} htmlFor={name}>{titleLabel}</label>
        <p className={style.descriptionReg}>{textLabel}</p>
      </div>

      <div className={style.wrapError}>
        {(errors[0] && errors[1]) && <div className={style.error}>{errors[1]}</div>}
        {(errors[2]) && <div className={style.error}>{errors[2]}</div>}
        {isPasswordType ? (
          <div className={style.passwordWrapper}>
            <input
              className={style.inputBut}
              id={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              type={showPassword ? 'text' : type}
              name={name}
              placeholder={placeholder}
              required={required}
            />
            <button type="button" className={style.eyeButton} onClick={toggleShowPassword}>
              <img src={showPassword ? eyeOffIcon : eyeIcon} alt="toggle visibility" />
            </button>
          </div>
        ) : (
          <input
            className={style.inputBut}
            id={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
          />
        )}
      </div>
    </div>
  );
};

export default Input;