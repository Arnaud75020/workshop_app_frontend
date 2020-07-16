import React, { useContext } from 'react';
import { UserContext } from '../../../Context/UserContext';
import RegistrationDetails from './RegistrationDetails'
import './RegistrationList.scss'


const RegistrationsList = ({ users, handleSetUser, toggleDisplayModal}) => {

        return (
            <table className="registrations-table">
                <colgroup>
                    <col  />
                    <col  />
                    <col  />
                    <col  />
                    <col  />
                    <col  />
                    <col  />
                </colgroup>
                <thead>
                    <tr>
                        <th className="name-col">Name</th>
                        <th className="email-col">Email</th>
                        <th className="position-col">Position</th>
                        <th className="company-col">Company</th>
                        <th className="workshops-col">Workshops</th>
                        <th className="country-col">Country</th>
                        <th className="type-col">Type</th>
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