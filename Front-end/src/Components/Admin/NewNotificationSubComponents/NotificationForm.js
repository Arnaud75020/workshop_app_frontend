import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NotificationContext } from "../../../Context/NotificationContext";
import { WorkshopContext } from "../../../Context/WorkshopContext";
import uuid from "react-uuid";

const NotificationForm = () => {
    const { addTempNotification } = useContext(NotificationContext);
    const { allWorkshops, getAttendees, attendees } = useContext(WorkshopContext);

    const [checkboxCheck, setCheckboxCheck] = useState(false);
    const [selectWorkshop, setSelectWorkshop] = useState(false);

    const toggleSchedule = () => {
        setCheckboxCheck(!checkboxCheck);
    };
  
    const { register, handleSubmit, reset, errors } = useForm();

    const onSubmit = (data) => {
        

        let workshopTitle = "";

        if(data.workshop){
            const workshop = data.workshop.split(",")
            workshopTitle = workshop[0]
        }

        const now = new Date();

        const now_formated = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}T${now.getHours()}:${now.getMinutes()}`

        const date = data.checkbox ? data.date : now_formated;

        const state = data.checkbox ? "scheduled" : "send"

        const newObject = {
            id: uuid(),
            to: data.to,
            workshop: data.workshop ,
            subject: data.subject,
            content: data.content,
            state: state,
            date: date,
            checkbox: data.checkbox
            };
            reset({
                date: "",
                to:"",
                subject:"",
                content:""
            })
        addTempNotification(newObject);
        
        if(data.checkbox){
            toggleSchedule()
        }
        if(data.workshop){
            setSelectWorkshop(false)
        }
    };

    const onChangeSelect = (event) => {

        const {value} = event.target;

        if(value === "Workshop"){
            setSelectWorkshop(true)
        } else {
            setSelectWorkshop(false)
        }

    }

    const handleToWorkshop = (event) => {
        event.preventDefault()
        const { value } = event.target
        const workshop = value.split(",")
        const speakerId = Number(workshop[1])
        getAttendees(speakerId)
    }

    return (
        <form className="new-notification-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="new-notification-form-header" />
            <div className="new-notification-form-body">
                <select onChange={onChangeSelect} name="to" ref={register({ required: true })}>
                    <option value="">To:</option>
                    <option value="All">All</option>
                    <option value="All Attendees">All Attendees</option>
                    <option value="All Speakers">All Speakers</option>
                    <option value="Workshop">Workshop</option>
                </select>
                {errors.to && <p>please select an addressee</p>}
                {selectWorkshop && 
                <select name="workshop" onChange={handleToWorkshop} ref={register({ required: true })}>
                    <option value="">Select a Workshop</option>
                    {allWorkshops.map(workshop => {
                        return <option value={[workshop.title, workshop.speaker_id]}>{workshop.title}</option>
                    })}
                </select>
                }
                {selectWorkshop && errors.workshop && <p>please select a workshop</p>}
                <input style={errors.subject && ({border: "1px solid #3B65B0"})} type="text" placeholder="Subject" name="subject" ref={register({ required: true })} />
                {errors.subject && <p>please add a subject</p>}
                <textarea style={errors.content && ({border: "1px solid #3B65B0"})} className="content" type="text" placeholder="Content" name="content" row="5" cols="50" ref={register({ required: true })} />
                {errors.content && <p>please add some content</p>}
                <div className="schedule">
                    <label htmlFor="schedule">Schedule</label>
                    <input type="checkbox" name="checkbox" id="schedule" value={checkboxCheck} onChange={toggleSchedule} ref={register}/>
                    {checkboxCheck && 
                    <input style={errors.subject && ({border: "1px solid #3B65B0"})} type="datetime-local" name="date" ref={register({ required: true })}/>}
                    {errors.date && <p>please choose a date</p>}
                </div>
            </div>
            <div className="new-notification-form-footer">
                <button type="submit">Create</button>
            </div>
        </form>
    );
};

 
export default NotificationForm;
