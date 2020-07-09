import React, { useState } from "react";
import WorkshopView from "../Documents/WorkshopView";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { FaListUl } from "react-icons/fa";

const WorkshopDetails = ({ workshop, toggleDisplayModal, deleteWorkshop }) => {
  const workshopDate = workshop.date.substring(0, 10);
  const starting_at = workshop.starting_hour.substring(0, 5);
  const ending_at = workshop.ending_hour.substring(0, 5);

  console.log("workshop", workshop);

  const handleDelete = () => {
    toggleDisplayModal(
      "confirm",
      "are you sure you want to delete this workshop?",
      workshop.id,
      workshop.enrolled_attendees
    );
  };

  const handleEdit = () => {
    toggleDisplayModal("workshop", "", workshop.id);
  };

  return (
    <tr>
      <td>
        <div>{workshopDate}</div>
        <div>{`${starting_at}-${ending_at}`}</div>
      </td>
      <td>{workshop.title}</td>
      <td>{workshop.workshop_speaker}</td>
      <td>{`${workshop.enrolled_attendees}/${workshop.room_capacity}`}</td>
      <td>{workshop.room_type}</td>
      <td>{workshop.room_manager}</td>
      <td className="dropdown">
        <button className="options-icon">
          <FaListUl />
        </button>
        <div className="btns-dropdown">
          <button>
            <Link to={`/admin/workshop-attendees/${workshop.speaker_id}`}>
              more
            </Link>
          </button>
          <button onClick={handleEdit}>edit</button>
          <button className="delete-workshop-btn" onClick={handleDelete}>
            delete
          </button>
        </div>
      </td>
    </tr>
  );
};

//ReactDOM.render(<WorkshopView />, document.getElementById("root"));

export default WorkshopDetails;
