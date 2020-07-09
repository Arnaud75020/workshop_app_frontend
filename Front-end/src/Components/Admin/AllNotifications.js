import React, { useContext, useState } from 'react';
import NotificationsList from './AllNotificationsSubComponents/NotificationsList';
import Filters from '../SharedComponents/Filters'
import { Link } from 'react-router-dom';
import './AllNotifications.scss'
import { NotificationContext } from '../../Context/NotificationContext';
import ModalForm from './Modals/ModalForm';
import { UserContext } from '../../Context/UserContext';


const AllNotifications = () => {

    const { notifications, handleFilterState, stateFilter, handleNotificationSearch, searchNotificationValue, deleteNotification } = useContext(NotificationContext)

    const {user} = useContext(UserContext)

    console.log("USER USER USER",user)

    const [displayModal, setDisplayModal] = useState(false);
    const [notification, setNotification] = useState(false);
    const [active, setActive] = useState("");
    const [content, setContent] = useState("");
    const [NotificationId, setNotificationId] = useState("");

    const toggleDisplayModal = (activeModal, modalContent, notification_id, selectedNotification) => {
        setNotificationId(notification_id)
        setContent(modalContent)
        setActive(activeModal)
        setDisplayModal(!displayModal)
        setNotification(selectedNotification)

    }


    const state = [{ state: "scheduled" }, { state: "sent"} ]
    return ( 
        <div>
            <div className="all-notifications-header">
                <h1>All Notifications</h1>
                <button className="admin/new-notification-btn"><Link to='/admin/new-notification'>New Notification</Link></button>
            </div>
            {displayModal && <ModalForm active={active} toggleDisplayModal={toggleDisplayModal} notification={notification} content={content} confirmFunction={deleteNotification} confirmText={"confirm"} id={NotificationId} />}
            <div className="all-notifications-body">
                <Filters handleSearch={handleNotificationSearch} seachValue={searchNotificationValue} optionsList={state} handleOption={handleFilterState} defaultOption="All notifications" optionKey="state" optionValue={stateFilter} />
                <NotificationsList notifications={notifications} toggleDisplayModal={toggleDisplayModal} />
            </div>
        </div>
     );
}
 
export default AllNotifications;