import { Component, Fragment } from "react";
import { artifacts } from "./ArtifactsInfo";

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
        <div>
          <h2>Артефакты</h2>

          <div>

            <div>
              <img src={Soulshard} alt="Rank" />
              <div>
                <h2>{artifacts["soulshard"].name} <br/>от <span>{artifacts["soulshard"].price}</span>₽</h2>
                <button>Приобрести</button>
              </div>
            </div>

          </div>
        </div>
      </Fragment>
    );
  };
};

export default Artifacts;