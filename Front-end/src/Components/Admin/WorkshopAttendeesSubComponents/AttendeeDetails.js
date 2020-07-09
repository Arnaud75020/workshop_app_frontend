import React from 'react';

const AttendeeDetails = (attendee) => {

        return (
            <tr>
                <td>
                    <p>{`${attendee.firstname} ${attendee.lastname}`}</p>
                </td>
                <td>
                    <p>{attendee.email}</p>
                </td>
                <td>
                    <p>{attendee.position}</p>
                </td>
                <td>
                    <p>{attendee.company}</p>
                </td>
                <td>
                    <p>{attendee.country}</p>
                </td>
                <td>
                    <p>{/*attendee.registration_date*/}</p>
                </td>
            </tr>
        );
}

export default AttendeeDetails;