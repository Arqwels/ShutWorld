import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Auth.module.scss';
import endShip from '../../images/endShipLogin.svg';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, AUTHORIZATION_ROUTE, MAIN_ROUTE } from '../../utils/consts';

const Login = () => {
  const [ nickname, setNickname ] = useState();
  const [ password, setPassword ] = useState();

  const {store} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.isAuth) {
      store.checkAuth()
      navigate(ADMIN_ROUTE);
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login(nickname, password);

    if (store.isAuth) {
      await store.checkAuth();
      navigate(ADMIN_ROUTE);
    }
  };
  
  return (
    <div className={style.body}>
      <img src={endShip} alt="endShip" />
      <div className={style.wrapLogin}>

        <form className={style.wrapForm}>

          <h2 className={style.headTitle}>Вход</h2>

          <div className={style.wrapFormItem}>
            <label className={style.titleField}>Никнейм</label>
            <div className={style.wrapError}>
              <input className={style.inputBut}
                type='text'
                name='nickname'
                onChange={(e) => {setNickname(e.target.value)}}
                placeholder='Введите свой никнейм'
                required
                />
            </div>
          </div>
          
          <div className={style.wrapFormItem}>
            <label className={style.titleField}>Пароль</label>
            <div className={style.wrapError}>
              <input className={style.inputBut}
                type='text'
                name='password'
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder='Введите свой пароль' 
                required
                />
            </div>
            
          </div>

          <span className={style.recovery}>Забыли пароль от аккаунта?</span>
          <div className={style.wrapBtn}>
            <button onClick={handleLogin} className={style.btnJoin}>Вход</button>
            {/* <h3>{loginStatus}</h3> */}
          </div>
          
        </form>

          <Link to={AUTHORIZATION_ROUTE} className={style.reg}>Ещё не зарегистрированы?</Link>

      </div>
    </div>
  )
}

export default observer(Login)