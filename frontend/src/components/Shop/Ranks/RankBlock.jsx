import React, { Component, Fragment } from 'react';
import Modal from '../Modal/Modal';
import Donate1ss from './Donate/Donate1ss';

class RankBlock extends Component {
  state = {
    modals: [],
    isModalOpen: false,
  }

  openModal = () => {
    const newModal = { isOpen: true };
    this.setState((prevState) => ({ modals: [...prevState.modals, newModal] }));
    document.body.style.overflow = 'hidden';
  }

  closeModal = (index) => {
    this.setState((prevState) => {
      const modals = [...prevState.modals];
      modals.splice(index, 1);
      const isModalOpen = modals.length > 0;
      return { modals, isModalOpen };
    });
    document.body.style.overflow = '';
  }


  handleSubmit = (index) => {
    console.log(`Submit function for modal ${index + 1}!`);
    this.closeModal(index);
  }

  handleCancel = (index) => {
    console.log(`Cancel function for modal ${index + 1}!`);
    this.closeModal(index);
  }

  render() {
    return (
      <Fragment>
        <h2><span>1. Base Dialog (Modal) window:</span></h2>
        <button onClick={() => this.openModal()}>Show First Modal</button>
        <button onClick={() => this.openModal()}>Show Second Modal</button>
        <button onClick={() => this.openModal()}>Show Third Modal</button>

        {this.state.modals.map((modal, index) => (
          <Modal
            key={index}
            isOpen={modal.isOpen}
            onCancel={() => this.handleCancel(index)}
            onSubmit={() => this.handleSubmit(index)}
          >
            <Donate1ss />
          </Modal>
        ))}


        <h2>gegergergergerg</h2>

        {/* <Donate1ss /> */}


      </Fragment>
    );
  }
};

export default RankBlock;