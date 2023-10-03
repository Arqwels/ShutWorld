import React, { useState } from 'react';
import iconRule from '../../images/icon-rule.svg';

const RylesItem = ({ rule }) => {

  const [ isOpen, setIsOpen ] = useState(false);

  return (
  <li className={"rule__item" + (isOpen ? " active" : "")}>
    <div className="rule__item__head" onClick={() => setIsOpen(!isOpen)}>
      <p>{rule.id}. {rule.name}</p>
      <img className="rule__head__img" src={iconRule} alt="not-active-rule" width="12px" height="8px" />
    </div>
    <ul className="rule__item__body">
        {rule.items.map((item, idx) => (
          <li key={`menu item ${idx}`}>{rule.id}.{item.id} {item.name}</li>
        ))}
    </ul>
  </li>
  )
}

export default RylesItem