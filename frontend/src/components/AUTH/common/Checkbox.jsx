import style from "../Auth.module.scss";
import { Link } from "react-router-dom";

const Checkbox = ({ error, checked, onChange, type, name, id }) => {
  return (
    <div className={style.wrapUserAgreement}>
      {(error) && <div className={style.error}>{error}</div>}
      <input 
        className={style.userAgreement}
        checked={checked}
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        required/>
      <label htmlFor="useragreement"><span>Я полностью согласен и ознакомлен с <Link href="" className={style.link}>Пользовательским соглашением</Link> и <Link href="" className={style.link}>Публичной офертой</Link></span></label>
    </div>
  )
}

export default Checkbox