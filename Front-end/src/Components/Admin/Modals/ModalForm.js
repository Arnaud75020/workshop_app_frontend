import React, { useState, useEffect } from 'react';
import WorkshopFormEdit from './WorkshopFormEdit';
import NewNotificationForm from './NewNotificationForm';
import NotificationInfo from './NotificationInfo'
import Modal from './Modal';
import MessageModal from './MessageModal';

const ModalForm = ( { workshopInEdit, toggleDisplayModal, active , attendees, notification, content, confirmFunction, confirmText, id, workshopEnrolled , userRole} ) => {

    const [isActive, setIsActive] = useState("");

    useEffect(() => {
        switch(active){
            case "workshop":
                setIsActive(active)
                break;
            case "notification":
                setIsActive(active)
                break;
            case "notificationInfo":
                setIsActive(active)
            break;
            case "confirm":
                setIsActive(active)
                break;
            case "message":
                setIsActive(active)
                break;
        }
    },[active])

    return ( 
        <div className="workshop-edit-form">
            {isActive !== "" && isActive === "workshop" && 
            <WorkshopFormEdit 
            workshopInEdit={workshopInEdit}
            toggleDisplayModal={toggleDisplayModal}/>}
            {isActive !== "" && isActive === "notification" &&
            <NewNotificationForm send_to={workshopInEdit !== undefined ? workshopInEdit.title: `${attendees[0].firstname} ${attendees[0].lastname}`} attendees={attendees} toggleDisplayModal={toggleDisplayModal}/> }
            {isActive !== "" && isActive === "notificationInfo" &&
            <NotificationInfo notification={notification} toggleDisplayModal={toggleDisplayModal}/>}
            {isActive !== "" && isActive === "confirm" &&
            <Modal toggleDisplayModal={toggleDisplayModal} content={content} confirmFunction={confirmFunction} workshopEnrolled={workshopEnrolled} confirmText={confirmText} id={id} user_role={userRole} />}
            {isActive !== "" && isActive === "message" &&
            <MessageModal content={content} />}
        </div>
    );
}
 
export default ModalForm;