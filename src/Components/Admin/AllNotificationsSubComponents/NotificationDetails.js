import React from 'react';
import { MdDelete, MdInfo } from 'react-icons/md';

const NotificationDetails = ({notification, toggleDisplayModal}) => {

    const notificationDate = notification.date.substring(0, 10);
    const notificationHour = notification.date.substring(11, 16);

    const handleInfo = () => {
        toggleDisplayModal("notificationInfo", "","", notification)
    }

    const handleDelete = () => {
        toggleDisplayModal("confirm", "Are you sure you want delete this notification?",notification.id)
    }

    return ( 
        <tr>
            <td className="date-col">{`${notificationDate} ${notificationHour} `}</td>
            <td className="subject-col">{notification.subject}</td>
            <td className="to-col">{notification.send_to}</td>
            <td className="state-col">{notification.state}</td>
            <td className="icons-col">
                <button title="Info" className="notification-info-btn" onClick={handleInfo} ><MdInfo /></button>
                <button title="Delete Notification" className="delete-notification-btn" onClick={handleDelete}><MdDelete /></button>
            </td>
        </tr>
     );
}
 
export default NotificationDetails;