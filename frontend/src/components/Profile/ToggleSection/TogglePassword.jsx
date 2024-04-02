import React, { useEffect, useState } from 'react';
import style from './../Profile.module.scss';

const TogglePassword = ({functionSubmit}) => {
  const [ oldPassword, setOldPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ repeatedNewPassword, setRepeatedNewPassword ] = useState('');
  // Флаги для отслеживания состояния "пустоты" полей ввода
  const [ oldPasswordDirty, setOldPasswordDirty ] = useState(false);
  const [ newPasswordDirty, setNewPasswordDirty ] = useState(false);
  const [ repeatedNewPasswordDirty, setRepeatedNewPasswordDirty ] = useState(false);
  // Строки для хранения сообщений об ошибках валидации
  const [ oldPasswordError, setOldPasswordError ] = useState('Введите старый пароль!');
  const [ newPasswordError, setNewPasswordError ] = useState('Введите новый пароль!');
  const [ repeatedNewPasswordError, setRepeatedNewPasswordError ] = useState('Поле пустое!');

  const [ formValid, setFormValid ] = useState(false);
  // Функция для валидации пароля.
  const validatePassword = (password) => {
    if (password.length === 0) 
      return 'Введите пароль';
    else if (password.length <= 5) 
      return 'Слишком короткий пароль';
    else if (password.length >= 5 && password.length <= 16)
      return '';
    else if (password.length >= 16)
      return 'Слишком длинный пароль';
  }
  // Обработчик изменения старого пароля
  const oldPasswordHandler = (e) => {
    const password = e.target.value;
    setOldPassword(password);
    setOldPasswordError(validatePassword(password));
  }
  // Обработчик проверки нового пароля
  const newPasswordHandler = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    const error = validatePassword(password);
    if (!error) {
      setNewPasswordError('');
      if (repeatedNewPassword !== password) {
        setRepeatedNewPasswordError('Неверный повторный пароль');
      } else {
        setRepeatedNewPasswordError('');
      }
    } else {
      setNewPasswordError(error);
      setRepeatedNewPasswordError('');
    }
  }
  // Обработчик проверки повторного нового пароля
  const repeatedNewPasswordHandler = (e) => {
    const password = e.target.value;
    setRepeatedNewPassword(password);
    if (password !== newPassword) {
      setRepeatedNewPasswordError('Неверный повторный пароль');
    } else {
      setRepeatedNewPasswordError('');
    }
  }
  // Обработчик на проверку пустоты в input`ах
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'oldPassword':
        setOldPasswordDirty(true);
        break;
      case 'newPassword':
        setNewPasswordDirty(true);
        break;
      case 'repeatedNewPassword':
        setRepeatedNewPasswordDirty(true);
        break;
      default:
        alert( 'Неизвестное значение' );
    };
  };
  // Обновление состояния валидности формы при изменении ошибок
  useEffect ( () => {
    if ( oldPasswordError || newPasswordError || repeatedNewPasswordError ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [ oldPasswordError, newPasswordError, repeatedNewPasswordError ])

  return (
    <form className={style.fromPassword}>
      <div className={style.inputContainer}>
        <label htmlFor="oldPassword">Старый пароль</label>
        <input 
          id="oldPassword" 
          name="oldPassword"
          type="password" 
          value={oldPassword}
          onChange={oldPasswordHandler}
          onBlur={(e) => blurHandler(e)}
          required
          style={{ borderColor: oldPasswordError && oldPasswordDirty ? '#F23F3F' : '' }}
        />
        {(oldPasswordError && oldPasswordDirty) && <span className={style.error}>{oldPasswordError}</span>}
      </div>

      <div className={style.inputContainer}>
        <label htmlFor="newPassword">Новый пароль</label>
        <input 
          id="newPassword" 
          name="newPassword"
          type="password" 
          value={newPassword}
          onChange={newPasswordHandler}
          onBlur={(e) => blurHandler(e)}
          required
          style={{ borderColor: newPasswordError && newPasswordDirty ? '#F23F3F' : '' }}
        />
        {(newPasswordError && newPasswordDirty) && <span className={style.error}>{newPasswordError}</span>}
      </div>

      <div className={style.inputContainer}>
        <label htmlFor="repeatedNewPassword">Новый пароль ещё раз</label>
        <input 
          id="repeatedNewPassword" 
          name="repeatedNewPassword"
          type="password" 
          value={repeatedNewPassword}
          onChange={repeatedNewPasswordHandler}
          onBlur={(e) => blurHandler(e)}
          required
          style={{ borderColor: repeatedNewPasswordError && repeatedNewPasswordDirty ? '#F23F3F' : '' }}
        />
        {(repeatedNewPasswordError && repeatedNewPasswordDirty) && <span className={style.error}>{repeatedNewPasswordError}</span>}
      </div>

      <input 
        onClick={functionSubmit} 
        type="submit" 
        value='Сохранить' 
        className={style.btn}
        disabled={!formValid}
      />
    </form>
  );
};

export default TogglePassword;