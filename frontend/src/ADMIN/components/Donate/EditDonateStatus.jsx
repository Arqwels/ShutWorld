import { useState } from "react";
import GetRanksService from "../../../service/GetRanksService"

const EditDonateStatus = () => {
  const [ranks, setRanks] = useState([]);

  const submit = async () => {
    try {
      const res = await GetRanksService.getRanks();
      setRanks(res.data);
      console.log(ranks);
    } catch (error) {
      
    }
  }

  return (
    <>
      <section>
        <h2>Изменение данных о статусах!</h2>
        <div>
        <button onClick={submit}>Чики брики</button>
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
                <br />
              </div>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default EditDonateStatus