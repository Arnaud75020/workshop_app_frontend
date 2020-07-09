import React, { useContext }from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../Context/UserContext';
import { WorkshopContext } from '../../../Context/WorkshopContext';


const WorkshopFormEdit = ({workshopInEdit, toggleDisplayModal}) => {


    const { register, handleSubmit, errors } = useForm();
    const { speakers } = useContext(UserContext);
    const { confirmEditedWorkshop } = useContext(WorkshopContext);


    const date_errors = errors.date || errors.starting_hour || errors.ending_hour

    const onSubmit = (data) => {

            const newWorkshop = {
            
            id: workshopInEdit.id,
            title: data.title,
            status_open: data.status_open,
            date: data.date,
            starting_hour: data.starting_hour,
            ending_hour: data.ending_hour,
            description: data.description,
            speaker_id: data.speaker,
            room: data.room,
            room_capacity: data.room_capacity,
            room_manager: data.room_manager,
            room_type: data.room_type,
            };

        confirmEditedWorkshop(newWorkshop);
        toggleDisplayModal();
        };

        console.log("speakers", speakers)
        console.log("workshopInEdit", workshopInEdit)

        const currentSpeaker = speakers.filter(speaker => `${speaker.firstname} ${speaker.lastname}` === workshopInEdit.workshop_speaker)

        const currentSpeakerId = currentSpeaker[0].id;

        const currentWorkshopSpeaker = `${currentSpeaker[0].firstname} ${currentSpeaker[0].lastname}`

        console.log('speakerId', currentSpeakerId)

        const formatingDate = new Date(workshopInEdit.date);

        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(formatingDate)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(formatingDate)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(formatingDate)

        const editedDate = (`${ye}-${mo}-${da}`)

    return ( 

        <form className='new-workshop-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='new-workshop-form-header'>
            <input 
                style={errors.date && ({border: "1px solid #3B65B0"})} 
                type='date' 
                placeholder='date' 
                name='date' 
                defaultValue={editedDate}
                ref={register({ required: true })} />
            <div className='hour-label-input'>
            <label htmlFor='starting_hour'>starting at</label>
            <input
                style={errors.starting_hour && ({border: "1px solid #3B65B0"})} 
                id='starting_hour'
                type='time'
                placeholder='hour'
                name='starting_hour'
                defaultValue={workshopInEdit.starting_hour}
                ref={register({ required: true })}
            />
            </div>
            <div className='hour-label-input'>
            <label htmlFor='ending_hour'>finishing at</label>
            <input
                style={errors.ending_hour && ({border: "1px solid #3B65B0"})} 
                id='ending_hour'
                type='time'
                placeholder='hour'
                name='ending_hour'
                defaultValue={workshopInEdit.ending_hour}
                ref={register({ required: true })}
            />
            </div>
            {date_errors && <p>please add date and hours</p>}
    
        </div>
        <div className='new-workshop-form-body'>
            <div className='new-workshop-form-left'>
            <input 
                style={errors.title && ({border: "1px solid #3B65B0"})} 
                type='text' 
                placeholder='Title' 
                name='title' 
                defaultValue={workshopInEdit.title}
                ref={register({ required: true })} />
            {errors.title && <p>please add title</p>}
            <select name='speaker' ref={register({ required: true })} defaultValue={currentSpeakerId}>
                <option value="">Speaker</option>
                {speakers.map((speaker) => {
                return (
                    <option
                    value={speaker.id}>{`${speaker.firstname} ${speaker.lastname}`}</option>
                );
                })}
            </select>
            {errors.speaker && <p>please choose speaker</p>}
            <input
                style={errors.description && ({border: "1px solid #3B65B0"})} 
                type='text'
                placeholder='Description'
                name='description'
                defaultValue={workshopInEdit.description}
                ref={register({ required: true })}
            />
            {errors.description && <p>please add a description</p>}
            </div>
            <div className='new-workshop-form-right'>
            <input 
                style={errors.room && ({border: "1px solid #3B65B0"})} 
                type='text' 
                placeholder='Room' 
                name='room' 
                defaultValue={workshopInEdit.room}
                ref={register({ required: true })} />
            {errors.room && <p>please add a room</p>}
            <input
                style={errors.room_manager && ({border: "1px solid #3B65B0"})} 
                type='text'
                placeholder='Room Manager'
                name='room_manager'
                defaultValue={workshopInEdit.room_manager}
                ref={register({ required: true })}
            />
            {errors.room_manager && <p>please add a room manager</p>}
            <div className='new-workshop-form-selects'>
                <select name='room_type' ref={register({ required: true })} defaultValue={workshopInEdit.room_type}>
                <option value='Banquet'>Banquet</option>
                <option value='Classroom'>Classroom</option>
                <option value='Online'>Online</option>
                </select>
                <select name='room_capacity' ref={register({ required: true })} defaultValue={workshopInEdit.room_capacity}>
                <option value='10'>10 pax</option>
                <option value='20'>20 pax</option>
                <option value='30'>30 pax</option>
                <option value='40'>40 pax</option>
                <option value='50'>50 pax</option>
                <option value='60'>60 pax</option>
                </select>
                <select name='status_open' ref={register({ required: true })} defaultValue={workshopInEdit.status_open}>
                <option value='1'>Open</option>
                <option value='0'>Closed</option>
                </select>
            </div>
            </div>
        </div>
        <div className='new-workshop-form-footer'>
            <button type='submit'>Confirm</button>
            <button className="edit-workshop-cancel" onClick={toggleDisplayModal}>Cancel</button>
        </div>
        </form>
     );
}
 
export default WorkshopFormEdit;