import React, { useState } from 'react';
import st from '../../Admin.module.scss';

const PrivilegeInput = ({ privilege, onEdit, onDelete, onAdd }) => {
  const [privilegeInput, setPrivilegeInput] = useState('');

  const handleEditPrivilege = (index) => {
    const updatedPrivilege = [...privilege];
    updatedPrivilege[index] = privilegeInput;
    onEdit(updatedPrivilege);
  };
  
  const handleDeletePrivilege = (index) => {
    const updatedPrivilege = [...privilege];
    updatedPrivilege.splice(index, 1);
    onDelete(updatedPrivilege);
  };
  
  const handleAddPrivilege = () => {
    onAdd(privilegeInput);
    setPrivilegeInput('');
  };

  return (
    <div className={st.inputGroup}>
      {privilege.map((item, index) => (
        <div key={index} className={st.buffer}>
          <input
            type="text"
            value={item}
            onChange={(e) => setPrivilegeInput(e.target.value)}
            className={st.input}
          />
          <button type="button" onClick={() => handleEditPrivilege(index)} className={st.button}>Редактировать</button>
          <button type="button" onClick={() => handleDeletePrivilege(index)} className={st.button}>Удалить</button>
        </div>
      ))}
      <input
        type="text"
        placeholder="Напишите какие привилегии получить игрок за статус"
        value={privilegeInput}
        onChange={(e) => setPrivilegeInput(e.target.value)}
        className={st.input}
      />
      <button type="button" onClick={handleAddPrivilege} className={`${st.button} ${st.addPrivilege}`}>Добавить привилегию</button>
    </div>
  );
};

export default PrivilegeInput;
