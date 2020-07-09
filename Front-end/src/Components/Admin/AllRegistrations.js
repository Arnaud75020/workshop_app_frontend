import React, { useContext, useState } from 'react';
import './AllRegistrations.scss'
import RegistrationsList from './AllRegistrationsSubComponents/RegistrationsList';
import { UserContext } from '../../Context/UserContext'
import Filters from '../SharedComponents/Filters';
import ModalForm from './Modals/ModalForm';

const AllRegistrations = () => {

    const { users, handleChangeSearch, searchValue, handleFilterUser, filterUser, deleteUser } = useContext(UserContext);

    const [displayModal, setDisplayModal] = useState(false);
    const [user, setUser] = useState([])
    const [active, setActive] = useState("");
    const [userId, setuserId] = useState("");
    const [userRole, setUserRole] = useState("");

    const roles = [{role:"Attendees"} ,{role:"Speakers"}]

    const toggleDisplayModal = (activeModal, sendTo, user_id,  user_role) => {
        setUserRole(user_role)
        setuserId(user_id)
        setActive(activeModal)
        setDisplayModal(!displayModal)
        setUser([sendTo])
    }

    return ( 
        <div>
            <div className="all-resgistrations-header">
                <h1>All registrations</h1>
            </div>
            {displayModal && <ModalForm toggleDisplayModal={toggleDisplayModal} attendees={user} active={active} confirmFunction={deleteUser} userRole={userRole} id={userId} confirmText={"confirm"} content="are you sure you want to delete this user?" />}
            <div className="all-registrations-body">
                <Filters handleSearch={handleChangeSearch} seachValue={searchValue} optionsList={roles} handleOption={handleFilterUser} defaultOption="All users" optionKey="role" optionValue={filterUser} />
                <RegistrationsList users={users} toggleDisplayModal={toggleDisplayModal} /> 
            </div>
           
        </div>
     );
}
 
export default AllRegistrations;