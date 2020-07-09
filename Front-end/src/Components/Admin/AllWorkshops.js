import React, { useContext, useState, useEffect } from "react";
import WorkshopList from "./AllWorkshopsSubComponents/WorkshopList";
import Filters from "../SharedComponents/Filters";
import { WorkshopContext } from "../../Context/WorkshopContext";
import { Link } from "react-router-dom";
import SearchBar from "../SharedComponents/SearchBar";
import "./AllWorkshops.scss";
import ModalForm from "./Modals/ModalForm";
import { UserContext } from "../../Context/UserContext";

const AllWorkshops = (props) => {
  const {
    workshops,
    handleFilterDate,
    months,
    dateFilter,
    handleWorkshopSearch,
    searchWorkshopValue,
    deleteWorkshop,
    attendees,
    getWorkshop,
    getAttendees,
  } = useContext(WorkshopContext);

  const {user} = useContext(UserContext)

  console.log("USER USER USER", user)

  const [displayModal, setDisplayModal] = useState(false);
  const [workshopInEdit, setWorkshopInEdit] = useState([]);
  const [active, setActive] = useState("");
  const [content, setContent] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [workshopEnrolled, setWorkshopEnrolled] = useState("");

  const toggleDisplayModal = (
    activeModal,
    modalContent,
    workshop_id,
    enrolled_workshop
  ) => {
    setWorkshopEnrolled(enrolled_workshop);
    setWorkshopId(workshop_id);
    setContent(modalContent);
    setActive(activeModal);
    setDisplayModal(!displayModal);
    const editingWorkshop = workshops.filter(
      (workshop) => workshop.id === workshop_id
    );
    setWorkshopInEdit(editingWorkshop[0]);
  };
  console.log("months", months);

  return (
    <div>
      <div className="all-workshops-header">
        <h1>All Workshops</h1>
        <button className="new-workshop-btn">
          <Link to="/admin/new-workshop">New Workshop</Link>
        </button>
      </div>
      {displayModal && (
        <ModalForm
          toggleDisplayModal={toggleDisplayModal}
          workshopInEdit={workshopInEdit}
          active={active}
          confirmFunction={deleteWorkshop}
          workshopEnrolled={workshopEnrolled}
          id={workshopId}
          confirmText={"confirm"}
          content={content}
        />
      )}
      <div className="all-workshops-body">
        <Filters
          handleSearch={handleWorkshopSearch}
          seachValue={searchWorkshopValue}
          handleOption={handleFilterDate}
          optionsList={months}
          defaultOption="All Workshops"
          optionValue={dateFilter}
          optionKey="month"
        />
        <WorkshopList
          workshops={workshops}
          toggleDisplayModal={toggleDisplayModal}
          deleteWorkshop={deleteWorkshop}
        />
      </div>
    </div>
  );
};

export default AllWorkshops;
