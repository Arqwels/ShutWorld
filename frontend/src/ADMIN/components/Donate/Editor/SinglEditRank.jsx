import { useParams, useNavigate } from 'react-router-dom';
import WrapperComponent from '../../../../pages/WrapperComponent';
import { useEffect, useState } from 'react';
import AdminService from '../../../../service/AdminService';
import '../../../../index.scss';

import st from './EditRank.module.scss';

const SinglEditRank = () => {
  const { idRank } = useParams();
  const navigate = useNavigate();
  const [rankData, setRankData] = useState({});
  const [rankId, setRankId] = useState('');
  const [rankName, setRankName] = useState('');
  const [rankDescription, setRankDescription] = useState('');

  const [rankDurationDonates, setRankDurationDonates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AdminService.getOneRank({ params: { rankId: idRank } });
        setRankData(res.data || {});
        setRankId(res.data.id || '');
        setRankName(res.data.name || '');
        setRankDescription(res.data.description || '');

        const updatedDurationDonates = res.data["duration-donates"].map(durationDonate => ({
          ...durationDonate,
          rankId: res.data.id || '', // Привязываем rankId из rankData
        }));
        setRankDurationDonates(updatedDurationDonates);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idRank]);

  const handleRankIdChange = (e) => {
    setRankId(e.target.value);
    // Привязываем rankId ко всем duration-donates
    setRankDurationDonates(prevDurationDonates => prevDurationDonates.map(durationDonate => ({
      ...durationDonate,
      rankId: e.target.value,
    })));
  }

  const handleDurationChange = (e, id) => {
    setRankDurationDonates(prevDurationDonates => prevDurationDonates.map(durationDonate => ({
      ...durationDonate,
      duration: durationDonate.id === id ? e.target.value : durationDonate.duration,
    })));
  }

  const handleLabelDurationChange = (e, id) => {
    setRankDurationDonates(prevDurationDonates => prevDurationDonates.map(durationDonate => ({
      ...durationDonate,
      labelDuration: durationDonate.id === id ? e.target.value : durationDonate.labelDuration,
    })));
  }

  const handlePriceChange = (e, id) => {
    setRankDurationDonates(prevDurationDonates => prevDurationDonates.map(durationDonate => ({
      ...durationDonate,
      price: durationDonate.id === id ? e.target.value : durationDonate.price,
    })));
  }

  const formSubmit = async (e) => {
    e.preventDefault();

    console.log("Rank ID:", rankId);
    console.log("Rank Name:", rankName);
    console.log("Rank Description:", rankDescription);

    console.log("Duration Donates:");
    rankDurationDonates.forEach(durationDonate => {
      console.log("  Duration:", durationDonate.duration);
      console.log("  Label Duration:", durationDonate.labelDuration);
      console.log("  Price:", durationDonate.price);
      console.log("  Rank ID:", durationDonate.rankId);
      console.log("-----------------------");
    });

    const requestData = {
      rankId: rankId,
      name: rankName,
      description: rankDescription,
      durationDonates: rankDurationDonates
    };

    try {
      await AdminService.updateRank(requestData);
      console.log('Данные успешно отправлены на сервер');
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
    }
  }

  return (
    <WrapperComponent>
      <div className={st.title}>Изменение ранга - {idRank}</div>
      <form action="#" onSubmit={formSubmit} className={st.editForm}>
        <label className={st.label}>ID:</label>
        <input 
          type="text"
          value={rankId}
          onChange={handleRankIdChange}
          className={st.input}
        />
        <label className={st.label}>Rank name:</label>
        <input 
          type="text"
          value={rankName}
          onChange={(e) => setRankName(e.target.value)}
          className={st.input}
        />
        <label className={st.label}>Rank description:</label>
        <textarea 
          rows='5'
          value={rankDescription}
          onChange={(e) => setRankDescription(e.target.value)}
          className={st.textarea}
        />

        <div className={st.durationWrap}>
        {rankDurationDonates.map(durationDonate => (
          <div key={durationDonate.id} className={st.singlDurationWrap}>
            <label className={st.label} title='Длительность статуса в цифровом виде (2592000)&#10;Главное что бы были цифрами!'>Duration:</label>
            <input 
              type="text" 
              value={durationDonate.duration}
              onChange={(e) => handleDurationChange(e, durationDonate.id)}
              className={st.input}
            />
            
            <label className={st.label} title='Длительность статуса в текстовом виде (1 месяц)'>Label Duration:</label>
            <input 
              type="text" 
              value={durationDonate.labelDuration}
              onChange={(e) => handleLabelDurationChange(e, durationDonate.id)}
              className={st.input}
            />
            
            <label className={st.label} title='Прайс статуса в цифровом виде (299)'>Price:</label>
            <input 
              type="text" 
              value={durationDonate.price}
              onChange={(e) => handlePriceChange(e, durationDonate.id)}
              className={st.input}
            />
            
            <label className={st.label} title='Обязательно должны сходится с ID'>RankId:</label>
            <input 
              type="text" 
              value={durationDonate.rankId}
              onChange={(e) => handleRankIdChange(e, durationDonate.id)}
              className={st.input}
            />
          </div>
        ))}
        </div>
  
        <button type='submit' className={st.submitEdit}>Отправить</button>
      </form>
      <br />
      <ul className={st.list}>
        <li className={st.listItem}>
          <span className={st.listItemTitle}>ID:</span> {rankData.id || ''}<br />
          <span className={st.listItemTitle}>Rank name:</span> {rankData.name || ''}<br />
          <span className={st.listItemTitle}>Rank description:</span> {rankData.description || ''}<br />
          <ul className={st.subList}>
            {rankData["duration-donates"] && rankData["duration-donates"].map(durationDonate => (
              <li key={durationDonate.id} className={st.subListItem}>
                {durationDonate.duration} - {durationDonate.labelDuration} - {durationDonate.price} - {durationDonate.rankId}
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <div className={st.goBack}>
        <button onClick={() => navigate(-1)} className={st.goBackBtn}>Назад</button>
      </div>
    </WrapperComponent>
  );
};

export default SinglEditRank;
