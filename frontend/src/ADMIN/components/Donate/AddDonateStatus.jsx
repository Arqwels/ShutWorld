import React, { createRef, useState } from 'react';
import st from '../../Admin.module.scss';
import AdminService from '../../../service/AdminService';
import DurationInput from './DurationInput';
import PrivilegeInput from './PrivilegeInput';

const AddDonateStatus = () => {
  const fileInput = createRef();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privilege, setPrivilege] = useState([]);
  const [durations, setDurations] = useState([
    { duration: '', labelDuration: '', price: '' },
    { duration: '', labelDuration: '', price: '' },
    { duration: '', labelDuration: '', price: '' }
  ]);
  const [weight, setWeight] = useState('');

  const сhangeDuration = (index, e) => {
    const { name, value } = e.target;
    const updatedDurations = [...durations];
    updatedDurations[index] = {
      ...updatedDurations[index],
      [name]: value
    };
    setDurations(updatedDurations);
  };

  const editPrivilege = updatedPrivilege => {
    setPrivilege(updatedPrivilege);
  };

  const deletePrivilege = updatedPrivilege => {
    setPrivilege(updatedPrivilege);
  };

  const addPrivilege = newPrivilege => {
    setPrivilege(prevPrivilege => [...prevPrivilege, newPrivilege]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('imageFile', fileInput.current.files[0]);
    formData.append('id', id);
    formData.append('name', name);
    formData.append('description', description);

    const durationsData = durations.map(duration => ({
      duration: duration.duration,
      labelDuration: duration.labelDuration,
      price: duration.price,
      rankId: id
    }));

    formData.append('durations', JSON.stringify(durationsData));

    formData.append('privilege', JSON.stringify(privilege));

    formData.append('weight', weight);

    try {
      const res = await AdminService.addRank(formData);
      if (res.data.message === 'Ранг успешно добавлен!') {
        alert(res.data.message);
      } else {
        alert('Ошибка');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={st.wrap}>
        <h2>Добавить новый статус!</h2>
        <form onSubmit={handleSubmit} className={st.form}>
          <label className={st.labelTitle}>Введите ID ранга!</label>
          <input 
            type='text'
            name='id'
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Например 1ss"
            className={st.input}
            required
          />

          <label className={st.labelTitle}>Введите Название ранга!</label>
          <input 
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например Властелин"
            className={st.input}
            required
          />

          <h3 className={st.labelTitle}>Добавление продолжительности</h3>
          <div className={st.durationGroup}>
            <DurationInput
              duration={durations[0].duration}
              labelDuration={durations[0].labelDuration}
              price={durations[0].price}
              onChange={(e) => сhangeDuration(0, e)}
            />
            <DurationInput
              duration={durations[1].duration}
              labelDuration={durations[1].labelDuration}
              price={durations[1].price}
              onChange={(e) => сhangeDuration(1, e)}
            />
            <DurationInput
              duration={durations[2].duration}
              labelDuration={durations[2].labelDuration}
              price={durations[2].price}
              onChange={(e) => сhangeDuration(2, e)}
            />
          </div>
  
          <h3 className={st.labelTitle}>Добавление плюшек за статус!</h3>
          <div className={st.privilegeInputs}>
            <PrivilegeInput
              privilege={privilege}
              onEdit={editPrivilege}
              onDelete={deletePrivilege}
              onAdd={addPrivilege}
            />
          </div>

          <label className={st.labelTitle}>Введите описание для ранга!</label>
          <textarea 
            name='description'
            rows='5'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Например: Данный донат самый лучший..."
            className={st.input}
            required
          />

          <label className={st.labelTitle}>Фото для статуса</label>
          <input 
            type='file'
            name='fileImage'
            ref={fileInput}
            className={st.fileInput} />
          
          {/* Добавленный инпут для значения weight */}
          <label className={st.labelTitle}>Введите значение weight:</label>
          <input
            type="text"
            name="weight"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="Например 50"
            className={st.input}
            required
          />
          
          <button type="submit" className={st.submitBtn}>Добавить</button>
        </form>
      </div>
    </>
  );
};

export default AddDonateStatus;
