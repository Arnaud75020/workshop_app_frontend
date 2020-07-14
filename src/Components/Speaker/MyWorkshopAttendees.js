import React, { useState, useContext, useEffect } from 'react';
import AttendeesList from '../Admin/WorkshopAttendeesSubComponents/AttendeesList';
import WorkshopInfo from '../Admin/WorkshopAttendeesSubComponents/WorkshopInfo';
import { WorkshopContext } from '../../Context/WorkshopContext';
import { UserContext } from '../../Context/UserContext';
import '../Admin/WorkshopAttendees.scss';


const MyWorkshopAttendees = ( ) => {

    const { workshop, attendees } = useContext(WorkshopContext);
    const { user } = useContext(UserContext);


    console.log('attendees', attendees)

    return ( 
        <div>
            {workshop === undefined ?
            <h1>No workshop scheduled at the moment {user.firstname}</h1>
            : 
            <div>
                <div className="workshop-attendees-header">
                    <h1>Workshop Info</h1>
                </div>
                <div className="workshop-attendees-body" >
                    <WorkshopInfo workshop={workshop} attendees={attendees} />
                    <AttendeesList attendees={attendees} />
                </div>
            </div>
            }
        </div>
    );
}
 
export default MyWorkshopAttendees;