import st from '../Admin.module.scss';

const FormLogin = () => {
  return (
    <div className={st.wrap}>
      <form action="#" className={st.form_login}>
        <label>Логин</label>
        <input placeholder='Введите свой логин' />

        <label htmlFor="password">Пароль</label>
        <input type="password" placeholder='Введите пароль' />

        <button>Войти</button>
      </form>
    </div>
  )
}

export default FormLogin