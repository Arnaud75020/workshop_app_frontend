import React, { useContext }from 'react';
import { MdDelete, MdInfo } from 'react-icons/md';
import { NotificationContext } from '../../../Context/NotificationContext';


const NotificationDetails = ({notification, handleSelectedNotification, toggleDisplayModal}) => {

    console.log(notification)

    const notificationDate = notification.date.substring(0, 10);
    const notificationHour = notification.date.substring(11, 16);

    const { deleteNotification } = useContext(NotificationContext)

    const handleInfo = () => {
        toggleDisplayModal("notificationInfo", "","", notification)
    }

    const handleDelete = () => {
        toggleDisplayModal("confirm", "are you sure you want delete this notification?",notification.id)
    }

    return ( 
        <tr>
            <td>{`${notificationDate} ${notificationHour} `}</td>
            <td>{notification.subject}</td>
            <td>{notification.send_to}</td>
            <td>{notification.state}</td>
            <td>
                <button className="notification-info-btn" onClick={handleInfo} ><MdInfo /></button>
                <button className="delete-notification-btn" onClick={handleDelete}><MdDelete /></button>
            </td>
        </tr>
     );
}
 
export default NotificationDetails;