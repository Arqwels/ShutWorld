import { Link } from "react-router-dom";
import QuestionMark from "../../../assets/images/ShopPage/question-mark.svg";
import LinkFormVK from "../../../assets/images/icons/link-formvk-icon.svg";
import { VK_LINK } from "../../../utils/consts";
import st from "../Modals/ModalForShop.module.scss";

const ModalFormQuest = () => {
  return (
    <div className={st.formQuest}>
      <img src={QuestionMark} alt="QuestionMark" />
      <div className={st.formQuestText}>
        <p>Произошла какая-то ошибка или не можете оплатить? Тогда сообщите нам, мы поможем.</p>
        <Link to={VK_LINK} target="_blank"><img src={LinkFormVK} alt="LinkFormVK" />vk.com/shutworld</Link>
      </div>
    </div>
  )
}

export default ModalFormQuest