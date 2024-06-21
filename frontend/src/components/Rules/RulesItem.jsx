import { useState } from "react";
import IconRule from "../../assets/images/icons/rule-icon.svg";
import st from "./Rules.module.scss";

const RulesItem = ({ rule }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={`${st.ruleItem}${isOpen ? ` ${st.active}` : ""}`}>
      <div className={st.head} onClick={() => setIsOpen(!isOpen)}>
        <p>{rule.idTitle}. {rule.title}</p>
        <img className={st.headImg} src={IconRule} alt="not-active-rule" width="12px" height="8px" />
      </div>
      <ul className={st.body}>
        {rule.texts.map((item, idx) => (
          <li key={`menu item ${idx}`}>
            <p>{item.sequence_number} {item.text}</p>
            {item.punishment && <p>[Наказание] - {item.punishment}</p>}
            {item.note && <p>[Примечание] - {item.note}</p>}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default RulesItem;