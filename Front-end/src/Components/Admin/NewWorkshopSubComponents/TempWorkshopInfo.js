import React, { useContext, useState } from "react";
import { WorkshopContext } from "../../../Context/WorkshopContext";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../Context/UserContext";
import Modal from "../Modals/Modal";
import { MdDelete, MdEdit } from "react-icons/md";

const TempWorkshopInfo = ({ tempWorkshop, toggleDisplayModal }) => {
  const { confirmWorkshop, editTempWorkshop, deleteTempWorkshop } = useContext(
    WorkshopContext
  );

  const { speakers } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const newObject = {
      title: data.title,
      status_open: data.status_open,
      date: data.date,
      starting_hour: data.starting_hour,
      ending_hour: data.ending_hour,
      description: data.description,
      speaker: data.speaker,
      room: data.room,
      room_capacity: data.room_capacity,
      room_manager: data.room_manager,
      room_type: data.room_type,
    };
    editTempWorkshop(newObject);
    setEditMode(!editMode);
  };

  const handleConfirmWorkshop = () => {
    const speaker_id = speakers.filter((speaker) => {
      return (
        `${speaker.firstname} ${speaker.lastname}` === tempWorkshop.speaker
      );
    });

    const newObject = {
      title: tempWorkshop.title,
      status_open: tempWorkshop.status_open,
      date: tempWorkshop.date,
      starting_hour: tempWorkshop.starting_hour,
      ending_hour: tempWorkshop.ending_hour,
      description: tempWorkshop.description,
      speaker_id: speaker_id[0].id,
      room: tempWorkshop.room,
      room_capacity: tempWorkshop.room_capacity,
      room_manager: tempWorkshop.room_manager,
      room_type: tempWorkshop.room_type,
    };
    confirmWorkshop(newObject);
    deleteTempWorkshop(tempWorkshop.id);
    toggleDisplayModal("message", "Workshop successfully added");
  };

  const handleDelete = () => {
    toggleDisplayModal(
      "confirm",
      "Do you want to delete this Workshop?",
      tempWorkshop.id
    );
  };

  const year = Number(tempWorkshop.date.substring(0, 4));
  const month = Number(tempWorkshop.date.substring(5, 7));
  const day = Number(tempWorkshop.date.substring(8, 10));

  const date = new Date(year, month - 1, day); // 2009-11-10
  const workshop_month = date.toLocaleString("default", { month: "long" });

  const date_errors = errors.date || errors.starting_hour || errors.ending_hour;

  return (
    <div>
      {!editMode && (
        <div className="temp-workshop-info">
          <div className="temp-workshop-info-header">
            <div className="temp-workshop-date">
              <div className="temp-date">{`${day} ${workshop_month} - ${tempWorkshop.starting_hour}-${tempWorkshop.ending_hour}`}</div>
            </div>
            <div className="temp-workshop-info-header-btns">
              <button
                className="workshop-icons"
                onClick={() => setEditMode(!editMode)}
              >
                <MdEdit />
              </button>
              <button onClick={handleDelete} className="workshop-icons">
                <MdDelete />
              </button>
            </div>
          </div>
          <div className="temp-workshop-info-body">
            <div className="temp-workshop-info-left">
              <h2>{tempWorkshop.title}</h2>
              <h4>{tempWorkshop.speaker}</h4>
              <p>{tempWorkshop.description}</p>
            </div>
            <div className="temp-workshop-info-right">
              <div className="room-manager">
                <p className="room">
                  <span>Room:</span> {tempWorkshop.room}
                </p>
                <p>
                  <span>Room manager:</span> {tempWorkshop.room_manager}
                </p>
              </div>
              <p>
                <span>Room setup:</span> {tempWorkshop.room_type}
              </p>
              <p>
                <span>Room capacity:</span> {tempWorkshop.room_capacity}
              </p>
              <p
                className={tempWorkshop.status_open === "1" ? "open" : "closed"}
              >
                <span>Registrations:</span>{" "}
                {tempWorkshop.status_open === "1" ? "OPEN" : "CLOSED"}
              </p>
            </div>
          </div>
          <div className="temp-workshop-info-footer">
            <button onClick={handleConfirmWorkshop}>Confirm Workshop</button>
          </div>
        </div>
      )}
      {editMode && (
        <form className="new-workshop-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="new-workshop-form-header">
            <input
              type="date"
              style={errors.date && { border: "1px solid #3B65B0" }}
              placeholder="date"
              name="date"
              defaultValue={tempWorkshop.date}
              ref={register({ required: true })}
            />
            <div className="hour-label-input">
              <label htmlFor="starting_hour">starting at</label>
              <input
                style={errors.starting_hour && { border: "1px solid #3B65B0" }}
                id="starting_hour"
                type="time"
                placeholder="hour"
                name="starting_hour"
                defaultValue={tempWorkshop.starting_hour}
                ref={register({ required: true })}
              />
            </div>
            <div className="hour-label-input">
              <label htmlFor="ending_hour">finishing at</label>
              <input
                style={errors.ending_hour && { border: "1px solid #3B65B0" }}
                id="ending_hour"
                type="time"
                placeholder="hour"
                name="ending_hour"
                defaultValue={tempWorkshop.ending_hour}
                ref={register({ required: true })}
              />
            </div>
            {date_errors && <p>please add date and hours</p>}
          </div>
          <div className="new-workshop-form-body">
            <div className="new-workshop-form-left">
              <input
                style={errors.title && { border: "1px solid #3B65B0" }}
                type="text"
                placeholder="Title"
                name="title"
                defaultValue={tempWorkshop.title}
                ref={register({ required: true })}
              />
              {errors.title && <p>please add title</p>}
              <select
                name="speaker"
                defaultValue={tempWorkshop.speaker}
                ref={register({ required: true })}
              >
                <option value="">To:</option>
                {speakers.map((speaker) => {
                  return (
                    <option
                      value={`${speaker.firstname} ${speaker.lastname}`}
                    >{`${speaker.firstname} ${speaker.lastname}`}</option>
                  );
                })}
              </select>
              {errors.speaker && <p>please choose speaker</p>}
              <input
                style={errors.description && { border: "1px solid #3B65B0" }}
                type="text"
                placeholder="Description"
                name="description"
                defaultValue={tempWorkshop.description}
                ref={register({ required: true })}
              />
              {errors.description && <p>please add a description</p>}
            </div>
            <div className="new-workshop-form-right">
              <input
                style={errors.room && { border: "1px solid #3B65B0" }}
                type="text"
                placeholder="Room"
                name="room"
                defaultValue={tempWorkshop.room}
                ref={register({ required: true })}
              />
              {errors.room && <p>please add a room</p>}
              <input
                style={errors.room_manager && { border: "1px solid #3B65B0" }}
                type="text"
                placeholder="Room Manager"
                name="room_manager"
                defaultValue={tempWorkshop.room_manager}
                ref={register({ required: true })}
              />
              {errors.room_manager && <p>please add a room manager</p>}
              <div className="new-workshop-form-selects">
                <select
                  defaultValue={tempWorkshop.room_type}
                  name="room_type"
                  ref={register({ required: true })}
                >
                  <option value="Banquet">Banquet</option>
                  <option value="Classroom">Classroom</option>
                </select>
                <select
                  defaultValue={tempWorkshop.room_capacity}
                  name="room_capacity"
                  ref={register({ required: true })}
                >
                  <option value="10">10 pax</option>
                  <option value="20">20 pax</option>
                  <option value="30">30 pax</option>
                  <option value="40">40 pax</option>
                  <option value="50">50 pax</option>
                  <option value="60">60 pax</option>
                </select>
                <select
                  defaultValue={tempWorkshop.status_open}
                  name="status_open"
                  ref={register({ required: true })}
                >
                  <option value="1">Open</option>
                  <option value="0">Closed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="new-workshop-form-footer">
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TempWorkshopInfo;
