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
        <p>{content}</p>
        <div className="modal-btns-wrapper">
          <button className="confirm-modal" onClick={confirm}>{confirmText}</button>
          <button className="close-modal" onClick={toggleDisplayModal} >Cancel</button>
        </div>
      </div>
    </div>
    
  );
};

export default Modal;
