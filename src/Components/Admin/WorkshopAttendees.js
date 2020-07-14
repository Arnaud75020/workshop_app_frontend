import React, { useState, useContext, useEffect } from "react";
import AttendeesList from "./WorkshopAttendeesSubComponents/AttendeesList";
import WorkshopInfo from "./WorkshopAttendeesSubComponents/WorkshopInfo";
import "./WorkshopAttendees.scss";
import { WorkshopContext } from "../../Context/WorkshopContext";
import ModalForm from "./Modals/ModalForm";

const WorkshopAttendees = (props) => {
  const speakerId = props.match.params.id;

  const { workshop, getWorkshop, getAttendees, attendees } = useContext(
    WorkshopContext
  );
  const [displayModal, setDisplayModal] = useState(false);
  const [workshopInEdit, setWorkshopInEdit] = useState([]);
  const [active, setActive] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    getWorkshop(speakerId);
    getAttendees(speakerId);
  }, [speakerId]);

  const toggleDisplayModal = (active, content) => {
    setDisplayModal(!displayModal);
    setWorkshopInEdit(workshop);
    getWorkshop(speakerId);
    setActive(active);
    setContent(content)
    if(active === "message"){
      setDisplayModal(true);
      setTimeout(() => setDisplayModal(false), 1500);
    }
  };

  return (
    workshop !== [] && (
      <div>
        {displayModal && (
          <ModalForm
            workshopInEdit={workshopInEdit}
            toggleDisplayModal={toggleDisplayModal}
            active={active}
            attendees={attendees}
            content={content}
          />
        )}
        <div className="workshop-attendees-header">
          <h1>Workshop Info</h1>
        </div>
        <div className="workshop-attendees-body">
          <WorkshopInfo
            workshop={workshop}
            toggleDisplayModal={toggleDisplayModal}
            attendees={attendees}
          />
          <AttendeesList attendees={attendees} />
        </div>
      </div>
    )
  );
};

export default WorkshopAttendees;
