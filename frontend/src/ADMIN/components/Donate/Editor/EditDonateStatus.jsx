import { useEffect, useState } from "react";
import GetRanksService from "../../../../service/GetRanksService";
import { Link } from "react-router-dom";
import { ADMIN_SINGLE_EDIT_RANK } from "../../../../utils/consts";
import st from '../../../Admin.module.scss';

const EditDonateStatus = () => {

  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetRanksService.getRanks();
        setRanks(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Ошибочка в получении рангов:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <h2>Изменение данных о статусах!</h2>
        <div>
          <button>Чики брики</button>
          <ul>
            {ranks.map(rank => (
              <div key={rank.id}>
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
                <Link to={`${ADMIN_SINGLE_EDIT_RANK.replace(':idRank', rank.id)}`}>Редактирование</Link>
                <br />
              </div>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default EditDonateStatus;
