import React from 'react';
import NotificationDetails from './NotificationDetails';
import './NotificationsList.scss'


const NotificationsList = ({notifications, handleSelectedNotification, toggleDisplayModal}) => {

        return ( 
            <table className="notifications-table">
                <colgroup>
                    <col className="date-col" />
                    <col className="subject-col" />
                    <col className="to-col" />
                    <col className="state-col" />
                </colgroup>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>To</th>
                    <th>State</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {notifications.map(notification => {
                return <NotificationDetails 
                    notification={notification}
                    key={notification.id} 
                    handleSelectedNotification={handleSelectedNotification}
                    toggleDisplayModal={toggleDisplayModal}
                    /> 
            })} 
            </tbody>
        </table>
        )
}
 
export default NotificationsList;