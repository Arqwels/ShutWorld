import { Link } from "react-router-dom";
import st from "../Modals/ModalForShop.module.scss";

const ModalFormOffer = ({ onChange }) => {
  return (
    <div className={st.formOffer}>
      <input 
        className={st.publicOffer} 
        type="checkbox" 
        name="publicOffer" 
        id="publicOffer" 
        required 
        onChange={onChange} 
      />
      <label htmlFor="publicOffer">Ознакомился с <Link to="#" target="_blank">публичной офертой</Link></label>
    </div>
  )
}

export default ModalFormOffer