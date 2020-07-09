import React, { useState, useContext, useEffect } from "react";
import AttendeesList from "./WorkshopAttendeesSubComponents/AttendeesList";
import WorkshopInfo from "./WorkshopAttendeesSubComponents/WorkshopInfo";
import "./WorkshopAttendees.scss";
import { WorkshopContext } from "../../Context/WorkshopContext";
import ModalForm from "./Modals/ModalForm";
import axios from "axios";

const WorkshopAttendees = (props) => {
  const speakerId = props.match.params.id;

  const { workshop, getWorkshop, getAttendees, attendees } = useContext(
    WorkshopContext
  );
  const [displayModal, setDisplayModal] = useState(false);
  const [workshopInEdit, setWorkshopInEdit] = useState([]);
  const [modal, setModal] = useState("");

  useEffect(() => {
    getWorkshop(speakerId);
    getAttendees(speakerId);
  }, [speakerId]);

  const toggleDisplayModal = () => {
    setDisplayModal(!displayModal);
    setWorkshopInEdit(workshop);
    getWorkshop(speakerId);
  };

  const selectModal = (modal) => {
    setModal(modal);
  };

  return (
    workshop !== [] && (
      <div>
        {displayModal && (
          <ModalForm
            workshopInEdit={workshopInEdit}
            toggleDisplayModal={toggleDisplayModal}
            active={modal}
            attendees={attendees}
          />
        )}
        <div className="workshop-attendees-header">
          <h1>Workshop Info</h1>
        </div>
        <div className="workshop-attendees-body">
          <WorkshopInfo
            workshop={workshop}
            toggleDisplayModal={toggleDisplayModal}
            selectModal={selectModal}
            attendees={attendees}
          />
          <AttendeesList attendees={attendees} />
        </div>
      </div>
    )
  );
};

export default WorkshopAttendees;
