import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetRanksService from "../../../../service/GetRanksService";
import AdminService from "../../../../service/AdminService";
import { ADMIN_SINGLE_EDIT_RANK } from "../../../../utils/consts";
import st from '../../../Admin.module.scss';

const EditDonateStatus = () => {
  const [ranks, setRanks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await GetRanksService.getRanks();
      setRanks(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Ошибочка в получении рангов:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const deleteRank = async (rankId) => {
    alert("Вы уверены в своих деяниях?");
    const res = await AdminService.deleteRank(rankId);
    if(res.status === 200) {
      alert(res.data.message)
      fetchData();
    }
  }

  return (
    <>
      <section>
        <h2>Изменение данных о статусах!</h2>
        <ul className={st.infoData}>
          {ranks.map(rank => (
            <div key={rank.id} className={st.infoTable}>
              <li>ID = {rank.id}</li>
              <li>Rank name = {rank.name}</li>
              <li>Rank description = {rank.description}</li>
              <ul>
                {rank["duration-donates"].map(durationDonate => (
                  <li key={durationDonate.id}>
                    {durationDonate.duration} - {durationDonate.labelDuration} - {durationDonate.price} - {durationDonate.rankId}
                  </li>
                ))}
              </ul>
              <div className={st.blockBtn}>
                <Link to={`${ADMIN_SINGLE_EDIT_RANK.replace(':idRank', rank.id)}`} className={st.infoTableBtn}>Редактирование</Link>
                <button className={st.btnDelete} onClick={() => deleteRank(rank.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </ul>
      </section>
    </>
  )
}

export default EditDonateStatus;
