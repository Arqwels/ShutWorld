import React from "react";
import Portal from "../Portal";
import "./Modal.css";
import Button from './Button/Button';
import Overlay from "./Overlay";

const Modal = ({ title, isOpen, onCancel, onSubmit, children }) => {
  return (
    <>
      { isOpen && 
        <Portal>
            <div className="modalWindow">
              <div className="modalHeader">
                <p className="modalTitle">{title}</p>
                <div onClick={onCancel}>X</div>
              </div>
              <div className="modalBody">
                {children}
              </div>
              <div className="modalFooter">
                <Button onClick={onCancel} invert>Cancel</Button>
                <Button onClick={onSubmit}>Submit</Button>
                
              </div>
            </div>
          <Overlay onClose={onCancel}/>
        </Portal>
      }
    </>
  )
}

Modal.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
}

export default Modal;