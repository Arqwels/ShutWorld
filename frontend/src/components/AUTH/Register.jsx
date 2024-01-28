import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import Input from './common/Input';
import Checkbox from './common/Checkbox';
import texts from './texts';
import style from './Auth.module.scss';
import enderDragon from '../../images/enderDragonReg.svg';
import enderShip from '../../images/endShipReg.svg';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../../utils/consts';

const Register = observer(() => {
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword] = useState('');

  const [ nicknameDirty, setNicknameDirty ] = useState(false);
  const [ emailDirty, setEmailDirty ] = useState(false);
  const [ passwordDirty, setPasswordDirty ] = useState(false);
  const [ repeatPasswordDirty, setrepeatPasswordDirty ] = useState(false);

  const [ nicknameError, setNicknameError ] = useState('Введите Никнейм');
  const [ emailError, setEmailError ] = useState('Введите email');
  const [ passwordError, setPasswordError ] = useState('Введите пароль');
  const [ repeatPasswordError, setRepeatPasswordError ] = useState('Введите повторный пароль');

  const [ useragreement, setUseragreement ] = useState(true);
  const [ userAgrmntError, setuserAgrmntError ] = useState('');

  const [ formValid, setFormValid ] = useState(false);
  const [ registerStatus, setRegisterStatus ] = useState("");

  const navigate = useNavigate();
  const { store } = useContext(Context);

  // Проверка на согласие и ознакомление о соглашениях
  //! Частично не работает, нужно пофиксить будет
  const userAgrmntHandler = (e) => {
    setUseragreement(e.target.checked)
    if (e.target.checked) {
      setuserAgrmntError('');
    } else {
      setuserAgrmntError('Согласитесь и ознакомтесь с Пользовательским соглашение и Публичной офертой');
    }
  }
  // Проверка на состояние и наличие Ника
  const nicknameHandler = (e) => {
    setNickname(e.target.value)
    if (e.target.value.length === 0)
      setNicknameError('Введите Ник');
    else if (e.target.value.length <= 4) {
      setNicknameError('Слишком короткий ник');
      setRegisterStatus("");
    }
    else if (e.target.value.length >= 4 && e.target.value.length <= 16) {
      setRegisterStatus("");
      setNicknameError('');
    }
    else if (e.target.value.length >= 16)
      setNicknameError('Слишком длинный ник');
  }
  // Проверка на соответствие почты и её наличия
  const emailHandler = (e) => {
    setEmail(e.target.value)
    // Регулярное выражение для проверки валидации почты
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; 
    if (e.target.value.length === 0) {
      setEmailError('Введите email');
    }
    else if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл');
    } 
    else {
      setEmailError('');
    }
  };
  // Проверка на пароль, его размер
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
  //! Есть проблема когда введены оба пароля и пользователь захочет изменить пароль, то повторный пароль можно не изменять. Нужен фикс!
  // Проверка на совпадение повторного пароля с праволем
  const repeatPasswordHandler = (e) => {
    setRepeatPassword(e.target.value)
    e.target.value === password ? setRepeatPasswordError('') : setRepeatPasswordError('Неверный повторный пароль');
  }
  // Для проверки введёно ли хоть что-то в форму
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'nickname':
        setNicknameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      case 'repeat-password':
        setrepeatPasswordDirty(true);
        break;
      default:
        alert( 'Неизвестное значение' );
    };
  };
  // Открывает и закрывает форму для регистрации, если не все данные были указаны форма будет неактивна
  useEffect( () => {
    if (store.isAuth) {
      store.checkAuth()
      navigate(ADMIN_ROUTE);
    }
    if ( nicknameError || emailError || passwordError || userAgrmntError || repeatPasswordError || registerStatus ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [ store, navigate, nicknameError, emailError, passwordError, userAgrmntError, repeatPasswordError, registerStatus ])

  const handleRegistration = async (e) => {
    e.preventDefault();
    await store.registration(nickname, email, password, useragreement);
    if (store.isAuth) {
      await store.checkAuth();
      navigate(ADMIN_ROUTE);
    }
    if ("NicknameBusy") {
      setRegisterStatus("Никнейм занят!");
    }
  };
  
  return (
      <section className={style.body}>
        <div className={style.wrapReg}>
          <form className={style.wrapForm}>
            <h2 className={style.headTitle}>Регистрация</h2>
            <Input 
              titleLabel={texts.label.h3.nickname}
              textLabel={texts.label.p.nickname}
              errors={[nicknameDirty, nicknameError, registerStatus]}
              value={nickname}
              onChange={nicknameHandler}
              onBlur={blurHandler}
              type={texts.input.type.name}
              name={texts.input.name.name}
              placeholder={texts.input.placeholder.nickname}
            />
            <Input 
              titleLabel={texts.label.h3.email}
              textLabel={texts.label.p.email}
              errors={[emailDirty, emailError]}
              value={email}
              onChange={emailHandler}
              onBlur={blurHandler}
              type={texts.input.type.email}
              name={texts.input.name.email}
              placeholder={texts.input.placeholder.email}
            />
            <Input 
              titleLabel={texts.label.h3.password}
              textLabel={texts.label.p.password}
              errors={[passwordDirty, passwordError]}
              value={password}
              onChange={passwordHandler}
              onBlur={blurHandler}
              type={texts.input.type.password}
              name={texts.input.name.password}
              placeholder={texts.input.placeholder.password}
            />
            <Input 
              titleLabel={texts.label.h3.repeatPassword}
              textLabel={texts.label.p.repeatPassword}
              errors={[repeatPasswordDirty, repeatPasswordError]}
              value={repeatPassword}
              onChange={repeatPasswordHandler}
              onBlur={blurHandler}
              type={texts.input.type.repeatPassword}
              name={texts.input.name.repeatPassword}
              placeholder={texts.input.placeholder.repeatPassword}
            />
            <Checkbox 
              error={userAgrmntError}
              checked={useragreement}
              onChange={userAgrmntHandler}
              type={texts.input.type.userAgreement}
              name={texts.input.name.userAgreement}
              id={texts.input.id.userAgreement}
            />
            <div className={style.wrapBtn}>
              <button onClick={handleRegistration} type="submit" disabled={!formValid} className={style.btnJoin}><b>Зарегистрироваться</b></button>
            </div>
          </form>
          <Link to={LOGIN_ROUTE} className={style.login}>Уже зарегистрированы?</Link>
        </div>
        <div className={style.imgs}>
          <img className={style.enderDragon} src={enderDragon} alt="enderDragon" />
          <img className={style.enderShip} src={enderShip} alt="endShip" />
        </div>
      </section>
  )
})

export default Register;