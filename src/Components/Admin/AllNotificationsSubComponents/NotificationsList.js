import React from 'react';
import NotificationDetails from './NotificationDetails';
import './NotificationsList.scss'


const NotificationsList = ({notifications, handleSelectedNotification, toggleDisplayModal}) => {

        return ( 
            <table className="notifications-table">
                <colgroup>
                    <col  />
                    <col  />
                    <col  />
                    <col  />
                </colgroup>
            <thead>
                <tr>
                    <th className="date-col">Date</th>
                    <th className="subject-col">Subject</th>
                    <th className="to-col">To</th>
                    <th className="state-col">State</th>
                    <th className="icons-col"></th>
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