import React from "react";

const AttendeeDetails = (attendee) => {
  return (
    <tr>
      <td className="name-col">
        <p>{`${attendee.firstname} ${attendee.lastname}`}</p>
      </td>
      <td className="email-col">
        <p>{attendee.email}</p>
      </td>
      <td className="position-col">
        <p>{attendee.position}</p>
      </td>
      <td className="company-col">
        <p>{attendee.company}</p>
      </td>
      <td className="country-col">
        <p>{attendee.country}</p>
      </td>
      <td className="reg-date-col">
        <p>{attendee.registration_date.substring(0, 10)}</p>
      </td>
    </tr>
  );
};

export default AttendeeDetails;
