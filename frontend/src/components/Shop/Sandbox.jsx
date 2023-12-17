import React, { Component, Fragment } from 'react';
import Modal from './Modal/Modal';

class Sandbox extends Component {
  state = {
    modals: [],
    isModalOpen: false,
  }

  openModal = (title) => {
    const newModal = { title, isOpen: true };
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
        <button onClick={() => this.openModal("First Modal")}>Show First Modal</button>
        <button onClick={() => this.openModal("Second Modal")}>Show Second Modal</button>
        <button onClick={() => this.openModal("Third Modal")}>Show Third Modal</button>

        {this.state.modals.map((modal, index) => (
          <Modal
            key={index}
            isOpen={modal.isOpen}
            onCancel={() => this.handleCancel(index)}
            onSubmit={() => this.handleSubmit(index)}
          >
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a
            </p>
          </Modal>
        ))}

        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Ipsum velit, sint iure molestiae blanditiis error! Nihil neque dolor, repellendus accusamus reiciendis qui? Voluptatibus eos voluptates doloribus obcaecati enim ab sequi qui provident recusandae officiis repellat placeat, natus atque labore exercitationem dolor hic harum tempore amet? Explicabo sunt temporibus recusandae exercitationem vel error accusamus at repellendus distinctio quo autem expedita praesentium provident molestiae soluta quas a nisi qui porro assumenda unde, est consectetur! Provident voluptates quasi, eum earum facere aliquid, nihil aliquam amet possimus aspernatur similique. Et, nam. Repudiandae, expedita consequuntur. Ea esse totam libero consequatur, ipsum odio, beatae aliquid recusandae nobis ratione eum dicta molestiae quae perferendis. Vero expedita, exercitationem, nulla quam accusantium quasi asperiores, et eius esse voluptas quia?</h3>

      </Fragment>
    );
  }
}

export default Sandbox;
/* eslint-enable */