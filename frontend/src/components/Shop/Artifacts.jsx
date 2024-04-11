import { Component, Fragment } from "react";
import { artifacts } from "./ArtifactsInfo";
import ModalArtifact from "./Modals/ModalArtifactsShop";

import Soulshard from "../../assets/images/ShopPage/artifacts-soulshard.png";

import st from "./ShopStyles.module.scss";

class Artifacts extends Component {
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
        <div className={st.donate}>
          <h2>Артефакты</h2>

          <div className={st.wrapCard}>
            <div className={st.card}>
              <img src={Soulshard} alt="Artifact" />
              <div className={st.cardText}>
                <h2>{artifacts["soulshard"].name} <br/>от <span>{artifacts["soulshard"].price}</span>₽</h2>
                <button onClick={() => this.openModal("soulshard", "Artifacts")} className={st.btn}>Приобрести</button>
              </div>
            </div>

          </div>
        </div>

        {this.state.modals.map((modal, index) => {
          return (
            <ModalArtifact 
              key={index}
              isOpen={modal.isOpen}
              onClose={() => this.closeModal(index)}
              descriptionTitle={artifacts[modal.index].name}
              descriptionText={artifacts[modal.index].description}
              priceOnePiece={artifacts[modal.index].price}
              maxCount={artifacts[modal.index].maxCount}
            />
          )
        })}
      </Fragment>
    );
  };
};

export default Artifacts;