import React, { useState, useContext, useEffect } from 'react';
import AttendeesList from '../Admin/WorkshopAttendeesSubComponents/AttendeesList';
import WorkshopInfo from '../Admin/WorkshopAttendeesSubComponents/WorkshopInfo';
import { WorkshopContext } from '../../Context/WorkshopContext';
import { UserContext } from '../../Context/UserContext';
import '../Admin/WorkshopAttendees.scss';

const MyWorkshopAttendees = () => {
  const { workshop, attendees, getWorkshop, getAttendees } = useContext(
    WorkshopContext
  );
  const { user } = useContext(UserContext);

  useEffect(() => {
    getAttendees(user.id);
    getWorkshop(user.id);
    console.log('MWA_ATTENDEES', attendees);
  }, []);

  useEffect(() => {
    if (user !== []) {
      getAttendees(user.id);
      getWorkshop(user.id);
      console.log('MWA_ATTENDEES 2', attendees);
    }
  }, [user]);

  console.log('USER ID', user);

  return (
    <div>
      {workshop === undefined ? (
        <h1>No workshop scheduled at the moment {user.firstname}</h1>
      ) : (
        <div>
          <div className='workshop-attendees-header'>
            <h1>Workshop Info</h1>
          </div>

          <div cl_assName='workshop-attendees-body'>
            {attendees !== undefined && (
              <WorkshopInfo workshop={workshop} attendees={attendees} />
            )}
            {attendees !== undefined && <AttendeesList attendees={attendees} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWorkshopAttendees;
