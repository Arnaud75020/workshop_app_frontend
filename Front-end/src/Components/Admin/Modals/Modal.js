import React from "react";
import './Modal.scss';

const Modal = ({ toggleDisplayModal, content, confirmFunction, confirmText, id, workshopEnrolled, user_role }) => {

  const confirm = () => {
    if(workshopEnrolled !== ""){
      confirmFunction(id, workshopEnrolled)
      toggleDisplayModal()
    }
    if(user_role !== ""){
      confirmFunction(id, user_role)
      toggleDisplayModal()
    }
    confirmFunction(id)
    toggleDisplayModal()
  }

  return (
    <div className="modal-bg">
      <div className="modal">
        <button className="close-modal" onClick={toggleDisplayModal} >
        X
        </button>
        <p>{content}</p>
        <button className="confirm-modal" onClick={confirm}>{confirmText}</button>
      </div>
    </div>
    
  );
};

export default Modal;
