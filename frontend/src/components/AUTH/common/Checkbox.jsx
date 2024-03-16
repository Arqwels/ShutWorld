import { PUBLIC_OFFER_ROUTE, USER_AGREEMENT_ROUTE } from "../../../utils/consts";
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
      <label htmlFor="useragreement"><span>Я полностью согласен и ознакомлен с <Link to={USER_AGREEMENT_ROUTE} className={style.link}>Пользовательским соглашением</Link> и <Link to={PUBLIC_OFFER_ROUTE} className={style.link}>Публичной офертой</Link></span></label>
    </div>
  );
};

export default Checkbox;