import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NotificationContext } from "../../../Context/NotificationContext";
import Modal from "../Modals/Modal";
import { WorkshopContext } from "../../../Context/WorkshopContext";

const TempNotification = ({ tempNotification, toggleDisplayModal }) => {
  const {
    editNotification,
    deleteTempNotification,
    confirmNotification,
  } = useContext(NotificationContext);
  const { allWorkshops, getAttendees, attendees } = useContext(WorkshopContext);

  const [editMode, setEditMode] = useState(false);
  const [selectWorkshop, setSelectWorkshop] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if(tempNotification.workshop){
      setSelectWorkshop(true)
    }
  },[])

  const onSubmit = (data) => {

    const emailsList = attendees.map(attendee => {
        return attendee.email
    })

    let workshopTitle = "";

    if(data.workshop){
        const workshop = data.workshop.split(",")
        workshopTitle = workshop[0]
    }

    const now = new Date();

    const now_formated = `${now.getFullYear()}-${
        now.getMonth() + 1 }-${now.getDay()}T${now.getHours()}:${now.getMinutes()}`;

    const date = data.checkbox ? data.date : now_formated;

    const state = data.checkbox ? "scheduled" : "send";

    const newObject = {
      to: data.to,
      workshop: data.workshop ,
      subject: data.subject,
      content: data.content,
      state: state,
      date: date,
      checkbox: data.checkbox,
    };

    editNotification(newObject);
    handleEdit();
  };

  const handleConfirmNotification = () => {
    
    let to_id = null;

    switch(tempNotification.to){
      case "All":
        to_id = 1;
        break;
      case "All Attendees":
        to_id = 2;
        break;
      case "All Speakers":
        to_id = 3;
        break;
    }

    const newObject = {
      subject: tempNotification.subject,
      content: tempNotification.content,
      state: tempNotification.state,
      send_to: tempNotification.to,
      date: tempNotification.date,
    };

    confirmNotification(newObject);
    toggleDisplayModal("message", "Notification successfully added");
    deleteTempNotification(tempNotification.id);
  };

  const handleDelete = () => {
    toggleDisplayModal("confirm","Do you want to delete this Notification?", tempNotification.id)
  };

  const toggleSchedule = () => {
    setCheckboxCheck(!checkboxCheck);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
    setCheckboxCheck(tempNotification.checkbox);
  };

  const handleToWorkshop = (event) => {
    const { value } = event.target
    const workshop = value.split(",")
    const workshopId = Number(workshop[1])
    getAttendees(workshopId)
}

const onChangeSelect = (event) => {

  const {value} = event.target;

  if(value === "Workshop"){
      setSelectWorkshop(true)
  } else {
      setSelectWorkshop(false)
  }
}

  let notificationWorkshop = ""
  let workshopTitle = ""

  if(tempNotification.workshop){
    notificationWorkshop = tempNotification.workshop.split(",")
    workshopTitle = notificationWorkshop[0]
  }

  return (
    <div>
      {!editMode && (
        <div className="temp-notification-info">
          <div className="temp-notification-info-header">
            <div>{tempNotification.date}</div>
            <div className="temp-notification-info-header-btns">
              <button onClick={handleEdit}>Edit Notification</button>
              <button onClick={handleDelete}>Delete Notification</button>
            </div>
          </div>
          <div className="temp-notification-info-body">
            <div>
              <span>To:</span> {tempNotification.workshop ? workshopTitle : tempNotification.to}
            </div>
            <div>
              <span>Subject :</span>
              {tempNotification.subject}
            </div>
            <div>
              <span>Content: </span>
              {tempNotification.content}
            </div>
            <div>
              <span>State: </span>
              {tempNotification.state}
            </div>
          </div>
          <div className="temp-notification-info-footer">
            <button onClick={handleConfirmNotification}>
              Confirm Notification
            </button>
          </div>
        </div>
      )}
      {editMode && (
        <form
          className="new-notification-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="new-notification-form-header" />
          <div className="new-notification-form-body">
            <select
              name="to"
              onChange={onChangeSelect} 
              defaultValue={tempNotification.to}
              ref={register({ required: true })}
            >
              <option value="">To:</option>
              <option value="All">All</option>
              <option value="All Attendees">All Attendees</option>
              <option value="All Speakers">All Speakers</option>
              <option value="Workshop">Workshop</option>
            </select>
            {errors.to && <p>please select an addressee</p>}
            {selectWorkshop && 
                <select name="workshop" onChange={handleToWorkshop} defaultValue={tempNotification.workshop} ref={register({ required: true })}>
                    <option value="">Select a Workshop</option>
                    {allWorkshops.map(workshop => {
                        return <option value={[workshop.title, workshop.id]}>{workshop.title}</option>
                    })}
                </select>
                }
                {selectWorkshop && errors.workshop && <p>please select a workshop</p>}
            <input
              style={errors.subject && { border: "1px solid #3B65B0" }}
              type="text"
              placeholder="Subject"
              name="subject"
              defaultValue={tempNotification.subject}
              ref={register({ required: true })}
            />
            {errors.subject && <p>please add a subject</p>}
            <textarea
              style={errors.content && { border: "1px solid #3B65B0" }}
              className="content"
              type="text"
              placeholder="Content"
              name="content"
              row="5"
              cols="50"
              defaultValue={tempNotification.content}
              ref={register({ required: true })}
            />
            {errors.content && <p>please add some content</p>}
            <div className="schedule">
              <label htmlFor="schedule">Schedule</label>
              <input
                type="checkbox"
                name="checkbox"
                id="schedule"
                defaultChecked={tempNotification.checkbox}
                value={checkboxCheck}
                onChange={toggleSchedule}
                ref={register}
              />
              {checkboxCheck && (
                <input
                  style={errors.date && { border: "1px solid #3B65B0" }}
                  type="datetime-local"
                  name="date"
                  defaultValue={tempNotification.date}
                  ref={register({ required: true })}
                />
              )}
              {errors.date && <p>please choose a date</p>}
            </div>
          </div>
          <div className="new-notification-form-footer">
            <button type="submit">Save</button>
          </div>
        </form>
      )}
      )
    </div>
  );
};

export default TempNotification;
