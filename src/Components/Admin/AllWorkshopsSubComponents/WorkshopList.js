import React from "react";
import WorkshopDetails from "./WorkshopDetails";
import "./WorkshopList.scss";

const WorkshopList = ({
  toggleDisplayModal,
  workshops,
  deleteWorkshop,
  attendees,
  getAttendees
}) => {
  return (
    <div>
      <table className="workshops-table">
        <colgroup>
          <col  />
          <col  />
          <col  />
          <col  />
          <col  />
          <col  />
        </colgroup>
        <thead>
          <tr>
            <th className="date-col">Date</th>
            <th className="title-col">Workshop Title</th>
            <th className="speaker-col">Speaker</th>
            <th className="registrations-col">Total Regs.</th>
            <th className="room-setup-col">Room Setup</th>
            <th className="room-manager-col">Room Manager</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {workshops.map((workshop) => {
            return (
              <WorkshopDetails
                key={workshop.id}
                workshop={workshop}
                toggleDisplayModal={toggleDisplayModal}
                deleteWorkshop={deleteWorkshop}
                attendees={attendees}
                getAttendees={getAttendees}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WorkshopList;
