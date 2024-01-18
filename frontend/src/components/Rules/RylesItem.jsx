import { useState } from "react";
import IconRule from "../../assets/images/icons/rule-icon.svg";
import st from "./Rules.module.scss";

const RylesItem = ({ rule }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <li className={`${st.ruleItem}${isOpen ? ` ${st.active}` : ""}`}>
      <div className={st.head} onClick={() => setIsOpen(!isOpen)}>
        <p>{rule.id}. {rule.name}</p>
        <img className={st.headImg} src={IconRule} alt="not-active-rule" width="12px" height="8px" />
      </div>
      <ul className={st.body}>
          {rule.items.map((item, idx) => (
            <li key={`menu item ${idx}`}>{rule.id}.{item.id} {item.name}</li>
          ))}
      </ul>
    </li>
  );
};

export default RylesItem;