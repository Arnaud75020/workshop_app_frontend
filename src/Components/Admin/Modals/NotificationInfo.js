import React from "react";

const NotificationInfo = ({ toggleDisplayModal, notification }) => {

  return (
    <div className="temp-notification-info">
      <div className="temp-notification-info-header">
        <div>{notification.date}</div>
      </div>
      <div className="temp-notification-info-body">
        <div>
          <span>To:</span> {notification.send_to}
        </div>
        <div>
          <span>Subject :</span>
          {notification.subject}
        </div>
        <div>
          <span>Content: </span>
          {notification.content}
        </div>
        <div>
          <span>State: </span>
          {notification.state}
        </div>
      </div>
      <div className="temp-notification-info-footer">
        <button onClick={toggleDisplayModal}>close</button>
      </div>
    </div>
  );
};

export default NotificationInfo;
