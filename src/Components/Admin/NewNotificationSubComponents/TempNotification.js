import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NotificationContext } from "../../../Context/NotificationContext";
import { WorkshopContext } from "../../../Context/WorkshopContext";
import { UserContext } from "../../../Context/UserContext";
import { MdDelete, MdEdit } from "react-icons/md";


const TempNotification = ({ tempNotification, toggleDisplayModal }) => {
  const {
    editNotification,
    deleteTempNotification,
    confirmNotification,
  } = useContext(NotificationContext);
  const { allWorkshops, getAttendees, attendees } = useContext(WorkshopContext);
  const { allAttendees, speakers, users } = useContext(UserContext);

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
    }).join()

    const now = new Date();
    let nowMonth = now.getMonth() + 1
    let nowDay = now.getDay()

    if(nowMonth.length === 1){
      nowMonth = `0${nowMonth}`
    }

    if(nowDay.length === 1){
      nowDay = `0${nowDay}`
    }


    const now_formated = `${now.getFullYear()}-${nowMonth}-${nowDay}T${now.getHours()}:${now.getMinutes()}`;

    const date = data.checkbox ? data.date : now_formated;

    const state = data.checkbox ? "scheduled" : "sent";

    const newObject = {
      id:tempNotification.id,
      to: data.to,
      workshop: data.workshop,
      subject: data.subject,
      content: data.content,
      state: state,
      date: date,
      checkbox: data.checkbox,
      emailsList: emailsList
    };

    editNotification(newObject);
    handleEdit();
  };

  const handleConfirmNotification = () => {

    let workshopTitle = ""

      if(tempNotification.workshop){
        workshopTitle = tempNotification.workshop.split(",")[0]
      }

    const sendTo = tempNotification.workshop === undefined ? tempNotification.to : workshopTitle

    const newObject = [{
      subject: tempNotification.subject,
      content: tempNotification.content,
      state: tempNotification.state,
      send_to: sendTo,
      date: tempNotification.date,
      emailsList: tempNotification.emailsList
    }];

    confirmNotification(newObject);
    toggleDisplayModal("message", "Notification successfully added!");
    deleteTempNotification(tempNotification.id);
  };

  const handleDelete = () => {
    toggleDisplayModal("confirm","Are you sure you want to delete this notification?", tempNotification.id)
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

const allUsers = users.filter(user => user.role !== "admin")

const onChangeSelect = (event) => {

  const {value} = event.target;

  if(value === "Workshop"){
      setSelectWorkshop(true)
  } else {
      setSelectWorkshop(false)
      if(value === "All"){
        getAttendees(allUsers)
      } else if(value === "All Speakers"){
        getAttendees(speakers)
      } else {
        getAttendees(allAttendees)
      }
  }
}

  let notificationWorkshop = ""
  let workshopTitle = ""

  if(tempNotification.workshop){
    notificationWorkshop = tempNotification.workshop.split(",")
    workshopTitle = notificationWorkshop[0]
  }

  const year = Number(tempNotification.date.substring(0, 4));
  const month = Number(tempNotification.date.substring(5, 7));
  const day = Number(tempNotification.date.substring(8, 10));

  const date = new Date(year, month - 1, day); // 2009-11-10
  const notification_month = date.toLocaleString("default", { month: "long" });
  const notification_hour = tempNotification.date.substring(11,16)


  return (
    <div>
      {!editMode && (
        <div className="temp-notification-info">
          <div className="temp-notification-info-header">
            <div>{`${day} ${notification_month} - ${notification_hour}`}</div>
            <div className="temp-notification-info-header-btns">
              <button title="Edit Notification" onClick={handleEdit} className="notification-icons"><MdEdit /></button>
              <button title="Delete Notification" onClick={handleDelete} className="notification-icons"><MdDelete /></button>
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
    </div>
  );
};

export default TempNotification;
