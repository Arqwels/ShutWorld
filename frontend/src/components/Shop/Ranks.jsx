import React, { Fragment, useEffect, useState } from "react";
import ModalDonate from "./Modals/ModalDonateShop";
import GetRanksService from "../../service/GetRanksService";
import { SERVER_URL, PRODUCTION_SERVER_URL } from "../../utils/env";
import AbsentRank from "../../assets/images/ShopPage/absent-product.png";
import st from "./ShopStyles.module.scss";

const Ranks = () => {
  const [modals, setModals] = useState([]);
  const [ranks, setRanks] = useState([]);
  const baseURL = process.env.NODE_ENV === "production" ? PRODUCTION_SERVER_URL : SERVER_URL;

  const openModal = (index) => {
    const newModal = { index, isOpen: true };
    setModals([...modals, newModal]);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (index) => {
    const updatedModals = modals.filter((_, i) => i !== index);
    setModals(updatedModals);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const response = await GetRanksService.getRanks();
        const sortedRanks = response.data.sort((a, b) => a.weight - b.weight);
        setRanks(sortedRanks);
      } catch (error) {
        console.error("Ошибочка при получении Рангов:", error);
      }
    };
    fetchRanks();
  }, []);

  return (
    <Fragment>
    <div id="donate" className={st.donate}>
      <h2>Ранги</h2>
      <div className={st.wrapCard}>
        {ranks.length > 0 ? (
          ranks.map(rank => (
            <div key={rank.id} className={st.card}>
              <img src={`${baseURL}${rank.imageUrl}`} alt="Rank" />
              <div className={st.cardText}>
                <h2>{rank.name} <br/>от <span>{rank["duration-donates"][0].price}</span>₽</h2>
                <button onClick={() => openModal(rank.id, "DonateStatus")} className={st.btn}>Приобрести</button>
              </div>
            </div>
          ))
        ) : (
          <div className={`${st.card} ${st.absentCards}`}>
            <img src={AbsentRank} alt="Rank" />
            <div className={st.cardText}>
              <h2>Товар отсутствует</h2>
            </div>
          </div>
        )}
      </div>
    </div>

    {modals.map((modal, index) => {
      const rank = ranks.find(rank => rank.id === modal.index);
      
      return (
        <ModalDonate 
          key={index}
          isOpen={modal.isOpen}
          donStatus={rank}
          descriptionTitle={rank.name}
          descriptionText={rank.description}
          privilegeText={rank.privilege}
          onClose={() => closeModal(index)}
        />
      );
    })}
  </Fragment>
  );
};

export default Ranks;
