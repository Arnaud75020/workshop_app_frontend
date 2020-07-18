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
    deleteTempNotification,
    handleConfirmedAll
  } = useContext(NotificationContext);

  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [active, setActive] = useState("");
  const [content, setContent] = useState("");
  const [notificationId, setNotificationId] = useState("");

  const toggleDisplayModal = (activeModal, modalContent, notification_id) => {
    setNotificationId(notification_id);
    setContent(modalContent);
    setActive(activeModal);
    setIsModalDisplayed(!isModalDisplayed);
    if (activeModal === "message") {
      setTimeout(() => setIsModalDisplayed(false), 1500);
    }
  };

  const handleConfirmAllNotifications = () => {
    const notificationList = tempNotifications.map((tempNotification) => {
      let workshopTitle = ""

      if(tempNotification.workshop){
        workshopTitle = tempNotification.workshop.split(",")[0]
      }

    const sendTo = tempNotification.workshop === undefined ? tempNotification.to : workshopTitle

      return {
        subject: tempNotification.subject,
        content: tempNotification.content,
        state: tempNotification.state,
        send_to: sendTo,
        date: tempNotification.date,
        emailsList: tempNotification.emailsList
      };
    });

    confirmNotification(notificationList);
    setTempNotifications([]);
    handleConfirmedAll()
  };

  return (
    <div className="new-notifications-body">
      <div className="new-notifications-header">
        <h1>New Notification</h1>
        <div className="new-notification-btn-wrapper">
          <button className="all-notifications-btn">
            <Link to="/admin/all-notifications">All Notifications</Link>
          </button>
          <button
            className="confirm-all-btn"
            onClick={handleConfirmAllNotifications}
          >
            <Link to="/admin/all-notifications">Confirm All</Link>
          </button>
        </div>
        <div>
          {isModalDisplayed && (
            <ModalForm
              active={active}
              toggleDisplayModal={toggleDisplayModal}
              confirmFunction={deleteTempNotification}
              id={notificationId}
              confirmText={"confirm"}
              content={content}
            />
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
