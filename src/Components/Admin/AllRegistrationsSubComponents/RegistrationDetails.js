import React, { useContext } from 'react';
import { UserContext } from '../../../Context/UserContext';
import { MdDelete, MdEdit, MdMessage } from 'react-icons/md';


const RegistrationDetails = ({user, handleSetUser, toggleDisplayModal}) => {


    const handleNotification = () => {
        toggleDisplayModal("notification","", user)
    }

    const handleDelete = () => {
        toggleDisplayModal("confirm", "are you sure you want to delete this notification?",null, user.id, user.role )
    }

    const name = `${user.firstname} ${user.lastname}`

    console.log(user)
        return (
            <tr>
                <td>
                    {/*<img>profile photo</img>*/}
                    <div>{name}</div> 
                </td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>{user.company}</td>
                <td>{user.workshop_count === 0 ? "N/A" : user.workshop_count}</td>
                <td>{user.country}</td>
                <td>{user.role}</td>
                <td>
                    <button className="registrations-notification-btn" onClick={handleNotification}><MdMessage /></button>
                    <button className="registrations-delete-btn" onClick={handleDelete}><MdDelete /></button>
                </td>
            </tr>
        );
}

export default RegistrationDetails;