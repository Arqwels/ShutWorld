import React from 'react'
import './Modal.css';


const Modal = ({ active, setActive, children }) => {
  return (
    <div className={active ? "modal99 active11" : "modal99" } onClick={() => setActive(false)}>
      <div className="modal__content99" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export const Modal2 = ({ active, setActive2, children }) => {
  return (
    <div className={active ? "modal99 active11" : "modal99" } onClick={() => setActive2(false)}>
      <div className="modal__content99" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export const Modal3 = ({ active, setActive2, children }) => {
  return (
    <div className={active ? "modal99 active11" : "modal99" } onClick={() => setActive2(false)}>
      <div className="modal__content99" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal