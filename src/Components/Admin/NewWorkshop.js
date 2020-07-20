import React, { useContext, useState } from "react";
import WorkshopForm from "./NewWorkshopSubComponents/WorkshopForm";
import { WorkshopContext } from "../../Context/WorkshopContext";
import { UserContext } from "../../Context/UserContext";
import TempWorkshopInfo from "./NewWorkshopSubComponents/TempWorkshopInfo";
import { Link } from "react-router-dom";
import "./NewWorkshop.scss";
import ModalForm from "./Modals/ModalForm";

const NewWorkshop = () => {
  const {
    tempWorkshops,
    setTempWorkshop,
    confirmWorkshop,
    deleteTempWorkshop,
    handleConfirmedAll
  } = useContext(WorkshopContext);

  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [active, setActive] = useState("");
  const [content, setContent] = useState("");
  const [workshopId, setWorkshopId] = useState("");

  const toggleDisplayModal = (activeModal, modalContent, workshop_id) => {
    setWorkshopId(workshop_id);
    setContent(modalContent);
    setActive(activeModal);
    setIsModalDisplayed(!isModalDisplayed);
    if (activeModal === "message") {
      setTimeout(() => setIsModalDisplayed(false), 1500);
    }
  };

  const { speakers } = useContext(UserContext);
  console.log("speakers", speakers);

  const handleConfirmAllWorkshops = () => {
    const workshopList = tempWorkshops.map((tempWorkshop) => {

      return {
        title: tempWorkshop.title,
        status_open: tempWorkshop.status_open,
        date: tempWorkshop.date,
        starting_hour: tempWorkshop.starting_hour,
        ending_hour: tempWorkshop.ending_hour,
        description: tempWorkshop.description,
        speaker_id: tempWorkshop.speaker[1],
        room: tempWorkshop.room,
        room_capacity: tempWorkshop.room_capacity,
        room_manager: tempWorkshop.room_manager,
        room_type: tempWorkshop.room_type,
      };
    });
    confirmWorkshop(workshopList);
    setTempWorkshop([]);
    handleConfirmedAll()
  };

  return (
    <div className="new-workshops-body">
      <div className="new-workshops-header">
        <h1>New Workshops</h1>
        <div className="new-workshop-btn-wrapper">
          <button className="all-workshops-btn">
            <Link to="/admin">All Workshops</Link>
          </button>
          <button className="confirm-all-btn" onClick={handleConfirmAllWorkshops}>
            <Link to="/admin">Confirm All</Link>
          </button>
        </div>
        <div>
          {isModalDisplayed && (
            <ModalForm
              active={active}
              toggleDisplayModal={toggleDisplayModal}
              confirmFunction={deleteTempWorkshop}
              id={workshopId}
              confirmText="delete"
              content={content}
            />
          )}
        </div>
        
      </div>
      {tempWorkshops.map((tempWorkshop) => {
        return (
          <TempWorkshopInfo
            tempWorkshop={tempWorkshop}
            key={tempWorkshop.title}
            toggleDisplayModal={toggleDisplayModal}
          />
        );
      })}
      <WorkshopForm />
      {/*<NewRoomForm />*/}
    </div>
  );
};

export default NewWorkshop;
