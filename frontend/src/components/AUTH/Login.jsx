import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Auth.module.scss';
import endShip from '../../images/endShipLogin.svg';
import eyeIcon from '../../assets/images/icons/eye-fill.svg';
import eyeOffIcon from '../../assets/images/icons/eye-off-fill.svg';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, AUTHORIZATION_ROUTE, PROFILE_ROUTE } from '../../utils/consts';

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [formValid, setFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState('Введите пароль');
  const [nicknameError, setNicknameError] = useState('Введите Никнейм');

  const [nicknameDirty, setNicknameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
    if (e.target.value.length === 0) {
      setNicknameError('Введите Ник');
    } else if (e.target.value.length <= 4) {
      setNicknameError('Слишком короткий ник');
    } else if (e.target.value.length >= 4 && e.target.value.length <= 16) {
      setNicknameError('');
    } else if (e.target.value.length >= 16) {
      setNicknameError('Слишком длинный ник');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length === 0) 
      setPasswordError('Введите пароль')
    else if (e.target.value.length <= 5) 
      setPasswordError('Слишком короткий пароль')
    else if (e.target.value.length >= 5 && e.target.value.length <= 16)
      setPasswordError('')
    else if (e.target.value.length >= 16)
      setPasswordError('Слишком длинный пароль')
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'nickname':
        setNicknameDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        alert('Неизвестное значение');
    }
  };

  useEffect(() => {
    if (store.isAuth) {
      store.checkAuth();
      if (store.user.roles.includes('ADMIN')) {
        navigate(ADMIN_ROUTE);
      } else {
        navigate(PROFILE_ROUTE);
      }
    }
    if (nicknameError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [store, navigate, nicknameError, passwordError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await store.login(nickname, password);
    if (result[0] === 'userError') {
      setNicknameError('Пользователь не найден!')
    }
    if (result[0] === 'passwordError') {
      setPasswordError("Неверный пароль!")
    }
    if (store.isAuth) {
      await store.checkAuth();
      if (store.user.roles.includes('ADMIN')) {
        navigate(ADMIN_ROUTE);
      } else {
        navigate(PROFILE_ROUTE);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.body}>
      <img src={endShip} alt="endShip" />
      <div className={style.wrapLogin}>
        <form className={style.wrapForm}>
          <h2 className={style.headTitle}>Вход</h2>
          <div className={style.wrapFormItem}>
            <label className={style.titleField} htmlFor="nickname">Никнейм</label>
            <div className={style.wrapError}>
              {(nicknameDirty && nicknameError) && <div className={style.error}>{nicknameError}</div>}
              <input
                id="nickname"
                className={style.inputBut}
                type="text"
                name="nickname"
                value={nickname}
                onChange={nicknameHandler}
                onBlur={blurHandler}
                placeholder="Введите свой никнейм"
                required
              />
            </div>
          </div>
          <div className={style.wrapFormItem}>
            <label className={style.titleField} htmlFor="password">Пароль</label>
            <div className={style.wrapError}>
              {(passwordDirty && passwordError) && <div className={style.error}>{passwordError}</div>}
              <div className={style.passwordWrapper}>
                <input
                  id="password"
                  className={style.inputBut}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={passwordHandler}
                  onBlur={blurHandler}
                  placeholder="Введите свой пароль"
                  required
                />
                <button type="button" className={style.eyeButton} onClick={toggleShowPassword}>
                  <img src={showPassword ? eyeOffIcon : eyeIcon} alt="toggle visibility" />
                </button>
              </div>
            </div>
          </div>
          <span className={style.recovery}>Забыли пароль от аккаунта?</span>
          <div className={style.wrapBtn}>
            <button onClick={handleLogin} type="submit" disabled={!formValid} className={style.btnJoin}>Вход</button>
          </div>
        </form>
        <Link to={AUTHORIZATION_ROUTE} className={style.reg}>Ещё не зарегистрированы?</Link>
      </div>
    </div>
  );
};

export default observer(Login);