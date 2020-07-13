import React, { useState, useEffect } from "react";
import WorkshopView from "../Documents/WorkshopView";
import ReactDOM from "react-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from "react-router-dom";
import { FaListUl } from "react-icons/fa";

const WorkshopDetails = ({ workshop, toggleDisplayModal, getAttendees, attendees }) => {
  const workshopDate = workshop.date.substring(0, 10);
  const starting_at = workshop.starting_hour.substring(0, 5);
  const ending_at = workshop.ending_hour.substring(0, 5);

const [ statusClipboard, setStatusClipboard ] = useState(true)
const [ emailList, setEmailList ] = useState('')

useEffect(() => {
  getAttendees(workshop.speaker_id)
  console.log('id', workshop.speaker_id, workshop, attendees)
  setEmailList(attendees.map(attendee =>  `${attendee.email}; `).join(''))
}, [])

  const toggleStatusClipboard = () => {
      setStatusClipboard(false)
      setInterval(() => {
      setStatusClipboard(true)
    }, 1000)
  }

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

  console.log('emailList', emailList)

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
          <CopyToClipboard text={emailList}
            onCopy={() => toggleStatusClipboard(workshop.speaker_id)}
            >
          <button>{statusClipboard ? 'Copy' : 'Copied'}</button>
          </CopyToClipboard>
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
