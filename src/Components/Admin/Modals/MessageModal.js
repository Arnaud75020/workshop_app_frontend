import React from "react";
import './MessageModal.scss';

const MessageModal = ({ content }) => {
  return (
    <div className="message-modal-bg">
      <div className="message-modal">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default MessageModal;
