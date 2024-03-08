import { useParams, useNavigate } from 'react-router-dom';
import WrapperComponent from '../../../../pages/WrapperComponent';
import { useEffect, useState } from 'react';
import AdminService from '../../../../service/AdminService';
import '../../../../index.scss';

import st from '../../../Admin.module.scss';

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

  const formSubmit = (e) => {
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
  }

  return (
    <WrapperComponent>
      <div>Изменение ранга - {idRank}</div>
      <form action="#" onSubmit={formSubmit} className={st.editForm}>
        <label>ID:</label>
        <input 
          type="text"
          value={rankId}
          onChange={handleRankIdChange}
        />
        <label>Rank name:</label>
        <input 
          type="text"
          value={rankName}
          onChange={(e) => setRankName(e.target.value)}
        />
        <label>Rank description:</label>
        <textarea 
          rows='5'
          value={rankDescription}
          onChange={(e) => setRankDescription(e.target.value)}
        />

        {rankDurationDonates.map(durationDonate => (
          <div key={durationDonate.id}>
            <label>Duration:</label>
            <input 
              type="text" 
              value={durationDonate.duration}
              onChange={(e) => handleDurationChange(e, durationDonate.id)}
            />
            
            <label>Label Duration:</label>
            <input 
              type="text" 
              value={durationDonate.labelDuration}
              onChange={(e) => handleLabelDurationChange(e, durationDonate.id)}
            />
            
            <label>Price:</label>
            <input 
              type="text" 
              value={durationDonate.price}
              onChange={(e) => handlePriceChange(e, durationDonate.id)}
            />
            
            <label>RankId:</label>
            <input 
              type="text" 
              value={durationDonate.rankId}
              onChange={(e) => handleRankIdChange(e, durationDonate.id)}
            />
          </div>
        ))}

        <button type='submit'>Отправить</button>
      </form>
      <br />
      <ul className='klklasd'>
        <li>
          ID: {rankData.id || ''}<br />
          Rank name: {rankData.name || ''}<br />
          Rank description: {rankData.description || ''}<br />
          <ul>
            {rankData["duration-donates"] && rankData["duration-donates"].map(durationDonate => (
              <li key={durationDonate.id}>
                {durationDonate.duration} - {durationDonate.labelDuration} - {durationDonate.price} - {durationDonate.rankId}
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <button onClick={() => navigate(-1)}>Назад</button>
    </WrapperComponent>
  );
}

export default SinglEditRank;
