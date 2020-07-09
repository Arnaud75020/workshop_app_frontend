import React from "react";
import NotificationForm from "./NewNotificationSubComponents/NotificationForm";
import TempNotification from "./NewNotificationSubComponents/TempNotification";
import { useContext, useState } from "react";
import { NotificationContext } from "../../Context/NotificationContext";
import { Link } from "react-router-dom";
import "./NewNotification.scss";
import ModalForm from "./Modals/ModalForm";

const NewNotification = () => {
  const {
    tempNotifications,
    confirmNotification,
    setTempNotifications,
    deleteTempNotification
  } = useContext(NotificationContext);

  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [active, setActive] = useState("");
  const [content, setContent] = useState("");
  const [notificationId, setNotificationId] = useState("");

  const toggleDisplayModal = (activeModal, modalContent, notification_id) => {
    setNotificationId(notification_id)
    setContent(modalContent)
    setActive(activeModal)
    setIsModalDisplayed(!isModalDisplayed);
    if(activeModal === "message"){
      setTimeout(() => setIsModalDisplayed(false), 1500);
    }
  };

  const handleConfirmAllNotifications = () =>
    tempNotifications.map((tempNotification) => {
      let to_id = null;

      switch (tempNotification.to) {
        case "All":
          to_id = 1;
          break;
        case "All Attendees":
          to_id = 2;
          break;
        case "All Speakers":
          to_id = 3;
          break;
      }

      const newObject = {
        subject: tempNotification.subject,
        content: tempNotification.content,
        state: tempNotification.state,
        send_to_id: to_id,
        date: tempNotification.date,
      };

      confirmNotification(newObject);
      setTempNotifications([]);
    });

  return (
    <div className="new-notifications-body">
      <div className="new-notifications-header">
        <h1>New Notification</h1>
        <button className='all-notifications-btn'>
          <Link to='/admin/all-notifications'>All Notifications</Link>

        </button>
        <button
          className="confirm-all-btn"
          onClick={handleConfirmAllNotifications}
        >
          Confirm All
        </button>
        <div>
        {isModalDisplayed && (
            <ModalForm active={active} toggleDisplayModal={toggleDisplayModal} confirmFunction={deleteTempNotification} id={notificationId} confirmText={"confirm"} content={content} />
          )}
        </div>
      </div>
      {tempNotifications.map((tempNotification) => {
        return (
          <TempNotification
            key={tempNotification.id}
            tempNotification={tempNotification}
            toggleDisplayModal={toggleDisplayModal}
          />
        );
      })}
      <NotificationForm />
    </div>
  );
};

export default NewNotification;

// add: send now or send later
//action should be done before confirm stage
//action will be done when confirming
//either store the notification or send the email
//needs to be talked about with Connor
