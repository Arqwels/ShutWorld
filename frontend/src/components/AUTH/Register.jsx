import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import style from './Auth.module.scss';
import { useContext, useEffect, useState } from 'react';

import enderDragon from '../../images/enderDragonReg.svg';
import enderShip from '../../images/endShipReg.svg';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
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

  const [ nicknameError, setNicknameError ] = useState('Введите Ник');
  const [ emailError, setEmailError ] = useState('Введите email');
  const [ passwordError, setPasswordError ] = useState('Введите пароль');
  const [ repeatPasswordError, setRepeatPasswordError ] = useState('Введите повторный пароль');

  const [ useragreement, setUseragreement ] = useState(true);
  const [ userAgrmntError, setuserAgrmntError ] = useState('');

  const [ formValid, setFormValid ] = useState(false);
  const [ registerStatus, setRegisterStatus ] = useState("");

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
    else if (e.target.value.length < 4)
      setNicknameError('Слишком короткий ник');
    else if (e.target.value.length > 4 && e.target.value.length < 16)
      setNicknameError('');
    else if (e.target.value.length > 16)
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
    else if (e.target.value.length < 6) 
      setPasswordError('Слишком короткий пароль')
    else if (e.target.value.length > 6 && e.target.value.length < 16)
      setPasswordError('')
    else if (e.target.value.length > 16)
      setPasswordError('Слишком длинный пароль')
  }
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
  }, [ nicknameError, emailError, passwordError, userAgrmntError, repeatPasswordError, registerStatus ])

  // Создаётся функция usedNickname для проверки и отслеживания изменения данного параметра
  const usedNickname = (e) => {
    setNickname(e.target.value);
    if (!e.target.value) {
      setRegisterStatus("Уже есть акк!!");
    } else {
      setRegisterStatus("");
    }
  }

  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleRegistration = async (e) => {
    e.preventDefault();
    await store.registration(nickname,email,password,useragreement);
    if (store.isAuth) {
      await store.checkAuth();
      navigate(ADMIN_ROUTE);
    }
  }

  return (
      <section className={style.body}>

        <div className={style.wrapReg}>

          <form className={style.wrapForm}>

            <h2 className={style.headTitle}>Регистрация</h2>

            <div className={style.wrapFormItem}>

              <div>
                <h3 className={style.titleField}>Придумайте себе ник</h3>
                <p className={style.descriptionReg}>Ник будет использоваться на сайте. <br />Минимум 4 символа, максимум 16</p>
              </div>

              <div className={style.wrapError}>
                {(nicknameDirty && nicknameError) && <div className={style.error}>{nicknameError}</div>}
                {(registerStatus) && <div className={style.error}>{registerStatus}</div>}
                <input className={style.inputBut}
                  value={nickname}
                  onChange={e => {
                    nicknameHandler(e);
                    usedNickname(e);
                    }}
                  onBlur={e => blurHandler(e)} 
                  type='text'
                  name='nickname'
                  placeholder='Введите свой никнейм'
                  required/>
              </div>

            </div>

            <div className={style.wrapFormItem}>

              <div>
                <h3 className={style.titleField}>Email адрес</h3>
                <p className={style.descriptionReg}>Нужен для восстановления пароля</p>
              </div>

              <div className={style.wrapError}>
                {(emailDirty && emailError) && <div className={style.error}>{emailError}</div>}
                <input className={style.inputBut}
                  onChange={e => emailHandler(e)}
                  onBlur={e => blurHandler(e)}
                  value={email}
                  type='email'
                  name='email'
                  placeholder='Введите свой email'/>

              </div>

            </div>

            <div className={style.wrapFormItem}>

              <div>
                <h3 className={style.titleField}>Пароль</h3>
                <p className={style.descriptionReg}>Максильмано сложный. <br />Минимум 6 символа, максимум 16</p>
              </div>

              <div className={style.wrapError}>
                {(passwordDirty && passwordError) && <div className={style.error}>{passwordError}</div>}
                <input className={style.inputBut} 
                  value={password}
                  onChange={e => passwordHandler(e)}
                  onBlur={e => blurHandler(e)}
                  type='text'
                  name='password'
                  placeholder='Придумайте пароль'
                  required/>
              </div>

            </div>

            <div className={style.wrapFormItem}>

              <div>
                <h3 className={style.titleField}>Повторите пароль</h3>
                <p className={style.descriptionReg}>Убедитесь, что не допущены ошибки. </p>
              </div>

              <div className={style.wrapError}>
                {(repeatPasswordDirty && repeatPasswordError) && <div className={style.error}>{repeatPasswordError}</div>}
                <input className={style.inputBut}
                  value={repeatPassword}
                  type='text'
                  name='repeat-password'
                  placeholder='Повторите пароль'
                  onChange={e => repeatPasswordHandler(e)} 
                  onBlur={e => blurHandler(e)} 
                  required/>
              </div>

            </div>

            <div className={style.wrapUserAgreement}>
              {(userAgrmntError) && <div className={style.error}>{userAgrmntError}</div>}
              <input 
                className={style.userAgreement}
                checked={useragreement}
                onChange={e => userAgrmntHandler(e)}
                type="checkbox"
                name="useragreement"
                id="useragreement"
                required/>
              <label htmlFor="useragreement"><span>Я полностью согласен и ознакомлен с <Link href="" className={style.link}>Пользовательским соглашением</Link> и <Link href="" className={style.link}>Публичной офертой</Link></span></label>
            </div>

            <div className={style.wrapBtn}>
              <button onClick={handleRegistration} type="submit" disabled={!formValid} className={style.btnJoin}><b>Зарегистрироваться</b></button>
            </div>

          </form>

          <Link to={LOGIN_ROUTE} className={style.login}>Уже зарегистрированы?</Link>

        </div>

        <div className={style.imgs}>
          <img src={enderDragon} alt="enderDragon" />
          <img src={enderShip} alt="endShip" />
        </div>
      </section>
  )
})

export default Register