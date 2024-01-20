import { Component, Fragment } from "react";
import { donate } from "./DonateStatuses";
import ModalDonate from "./Modals/ModalDonateShop";

import Rank1ssImg from "../../assets/images/ShopPage/ranks-1ss.png";
import Rank2ssImg from "../../assets/images/ShopPage/ranks-2ss.png";
import Rank3ssImg from "../../assets/images/ShopPage/ranks-3ss.png";

import st from "./ShopStyles.module.scss";

class Ranks extends Component {
  state = {
    modals: []
  };

  openModal = (index) => {
    const newModal = { index, isOpen: true };
    this.setState((prevState) => ({ modals: [...prevState.modals, newModal] }));
    document.body.style.overflow = 'hidden';
  };

  closeModal = (index) => {
    this.setState((prevState) => {
      const modals = [...prevState.modals];
      modals.splice(index, 1);
      return { modals };
    });
    document.body.style.overflow = '';
  };

  render() {
    return (
      <Fragment>
        <div id="donate" className={st.donate}>
          <h2>Ранги</h2>
          
          <div className={st.wrapCard}>
            <div className={st.card}>
              <img src={Rank1ssImg} alt="Rank" />
              <div className={st.cardText}>
                <h2>{donate["1ss"].name} <br/>от <span>{donate["1ss"].duration[0].price}</span>₽</h2>
                <button onClick={() => this.openModal("1ss", "DonateStatus")} className={st.btn}>Приобрести</button>
              </div>
            </div>

            <div className={st.card}>
              <img src={Rank2ssImg} alt="Rank" />
              <div className={st.cardText}>
                <h2>{donate["2ss"].name} <br/>от <span>{donate["2ss"].duration[0].price}</span>₽</h2>
                <button onClick={() => this.openModal("2ss", "DonateStatus")} className={st.btn}>Приобрести</button>
              </div>
            </div>

            <div className={st.card}>
              <img src={Rank3ssImg} alt="Rank" />
              <div className={st.cardText}>
                <h2>{donate["3ss"].name} <br/>от <span>{donate["3ss"].duration[0].price}</span>₽</h2>
                <button onClick={() => this.openModal("3ss", "DonateStatus")} className={st.btn}>Приобрести</button>
              </div>
            </div>
          </div>
        </div>

        {this.state.modals.map((modal, index) => {
          return (
            <ModalDonate 
              key={index}
              isOpen={modal.isOpen}
              donStatus={donate[modal.index]}
              descriptionTitle={donate[modal.index].name}
              descriptionText={donate[modal.index].description}
              privilegeText={donate[modal.index].privilege}
              onClose={() => this.closeModal(index)}
            />
          )
        })}
      </Fragment>
    );
  };
};

export default Ranks;