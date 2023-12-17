import st from "./Overlay.module.scss";

const Overlay = ({ onClose }) => {
  return (
    <div className={st.overlay} onClick={onClose}></div>
  )
};

export default Overlay;