import React, { useContext } from 'react';
import AttendeeDetails from './AttendeeDetails';
import SearchBar from '../../SharedComponents/SearchBar';
import { WorkshopContext } from '../../../Context/WorkshopContext';


const AttendeeList = ({attendees} ) => {

    const { handleAttendeeSearch, searchAttendeeValue } = useContext(WorkshopContext)

        return (
            <div>
                <div className="search-attendee">
                    <SearchBar handleChange={handleAttendeeSearch} searchValue={searchAttendeeValue}/>
                </div>
                <table className="attendees-table">
                <colgroup>
                    <col className="name-col" />
                    <col className="email-col" />
                    <col className="position-col" />
                    <col className="company-col" />
                    <col className="country-col" />
                    <col className="reg-date-col" />
                </colgroup>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Country</th>
                        <th>Registration Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {attendees
                    .map(attendee => {
                    return <AttendeeDetails 
                        key={attendee.id} 
                        {...attendee} /> 
                    })} 
                </tbody>
            </table>
                
            </div>
        );
}

export default AttendeeList;