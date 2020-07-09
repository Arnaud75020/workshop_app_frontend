import React, { useContext } from 'react';
import { UserContext } from '../../../Context/UserContext';
import RegistrationDetails from './RegistrationDetails'
import './RegistrationList.scss'


const RegistrationsList = ({ users, handleSetUser, toggleDisplayModal}) => {

        return (
            <table className="registrations-table">
                <colgroup>
                    <col className="name-col" />
                    <col className="email-col" />
                    <col className="position-col" />
                    <col className="company-col" />
                    <col className="workshops-col" />
                    <col className="country-col" />
                    <col className="type-col" />
                </colgroup>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Workshops</th>
                        <th>Country</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return <RegistrationDetails 
                            key={user.id} 
                            user={user} 
                            handleSetUser={handleSetUser}
                            toggleDisplayModal={toggleDisplayModal}
                            /> 
                    })} 
                </tbody>
            </table>
        );
}

export default RegistrationsList;