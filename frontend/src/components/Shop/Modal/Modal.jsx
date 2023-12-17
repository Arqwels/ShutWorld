import Portal from "../../Portal/Portal";
import "./Modal.css";
import Overlay from "../../Overlay/Overlay";

const Modal = ({ title, isOpen, onCancel, onSubmit, children }) => {
  return (
    <>
      { isOpen && 
        <Portal>
            <div className="modalWindow">
              
                {children}
              
            </div>
          <Overlay onClose={onCancel}/>
        </Portal>
      }
    </>
  )
};

Modal.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};

export default Modal;