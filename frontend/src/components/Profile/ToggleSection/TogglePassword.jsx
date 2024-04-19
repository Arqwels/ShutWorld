import React, { useEffect, useState } from 'react';
import style from './../Profile.module.scss';
import { toast } from "react-toastify";
import UserService from '../../../service/UserService';

import EyeOn from '../../../assets/images/icons/eye-fill.svg';
import EyeOff from '../../../assets/images/icons/eye-off-fill.svg';

const TogglePassword = () => {
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
  // Состояния для показа img и text в input
  const [ showOldPassword, setShowOldPassword ] = useState(false);
  const [ showNewPassword, setShowNewPassword ] = useState(false);
  const [ showRepeatedNewPassword, setShowRepeatedNewPassword ] = useState(false);

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

  const [ notificationShown, setNotificationShown ] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== repeatedNewPassword) {
      if (notificationShown) {
        return;
      }
      console.error("Новый пароль и повторенный новый пароль не совпадают.");
      toast.error("Новый пароль и повторенный новый пароль не совпадают.", {
        autoClose: 2000,
        onClose: () => setNotificationShown(false)
      });
      setNotificationShown(true);
      return;
    }

    try {
      const result = await UserService.changePassword({oldPassword, newPassword, repeatedNewPassword});
      if (result.data.status) {
        toast.success(result.data.message, {autoClose: 2000})
        // Сброс состояний полей ввода и сообщений об ошибках
        setOldPassword('');
        setNewPassword('');
        setRepeatedNewPassword('');
      }
    } catch (error) {
      if (error.response.data) {
        if (error.response?.data?.errors === 'old-password') {
          setOldPasswordError(error.response?.data?.message)
          toast.error (error.response?.data?.message, {autoClose: 2000})
          return;
        } else if (error.response?.data?.errors === 'new-password') {
          setNewPasswordError(error.response?.data?.message)
          toast.error (error.response?.data?.message, {autoClose: 2000})
          return;
        }
      }
      console.log(error);
    }
  };

  return (
    <form className={style.fromPassword} onSubmit={handleSubmit}>
      <div className={style.inputContainer}>
        <label htmlFor="oldPassword">Старый пароль</label>
        <div className={style.passwordInput}>
          <input 
            id="oldPassword" 
            name="oldPassword"
            type={showOldPassword ? "text" : "password"} 
            value={oldPassword}
            onChange={oldPasswordHandler}
            onBlur={(e) => blurHandler(e)}
            required
            style={{ borderColor: oldPasswordError && oldPasswordDirty ? '#F23F3F' : '' }}
          />
          <img 
            src={showOldPassword ? EyeOn : EyeOff} 
            alt="Toggle Password Visibility" 
            className={style.togglePasswordIcon}
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        </div>
        {(oldPasswordError && oldPasswordDirty ) && <span className={style.error}>{oldPasswordError}</span>}
      </div>

      <div className={style.inputContainer}>
        <label htmlFor="newPassword">Новый пароль</label>
        <div className={style.passwordInput}>
          <input 
            id="newPassword" 
            name="newPassword"
            type={showNewPassword ? "text" : "password"} 
            value={newPassword}
            onChange={newPasswordHandler}
            onBlur={(e) => blurHandler(e)}
            required
            style={{ borderColor: newPasswordError && newPasswordDirty ? '#F23F3F' : '' }}
          />
          <img 
            src={showNewPassword ? EyeOn : EyeOff} 
            alt="Toggle Password Visibility" 
            className={style.togglePasswordIcon}
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        </div>
        {(newPasswordError && newPasswordDirty) && <span className={style.error}>{newPasswordError}</span>}
      </div>

      <div className={style.inputContainer}>
        <label htmlFor="repeatedNewPassword">Новый пароль ещё раз</label>
        <div className={style.passwordInput}>
          <input 
            id="repeatedNewPassword" 
            name="repeatedNewPassword"
            type={showRepeatedNewPassword ? "text" : "password"} 
            value={repeatedNewPassword}
            onChange={repeatedNewPasswordHandler}
            onBlur={(e) => blurHandler(e)}
            required
            style={{ borderColor: repeatedNewPasswordError && repeatedNewPasswordDirty ? '#F23F3F' : '' }}
          />
          <img 
            src={showRepeatedNewPassword ? EyeOn : EyeOff} 
            alt="Toggle Password Visibility" 
            className={style.togglePasswordIcon}
            onClick={() => setShowRepeatedNewPassword(!showRepeatedNewPassword)}
          />
        </div>
        
        {(repeatedNewPasswordError && repeatedNewPasswordDirty) && <span className={style.error}>{repeatedNewPasswordError}</span>}
      </div>

      <button className={style.btn} type="submit" disabled={!formValid}>Сохранить</button>
    </form>
  );
};

export default TogglePassword;