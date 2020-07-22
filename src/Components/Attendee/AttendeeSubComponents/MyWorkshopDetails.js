import React, { useContext, useState, useEffect } from 'react';
import { WorkshopContext } from '../../../Context/WorkshopContext';
import { UserContext } from '../../../Context/UserContext';

const MyWorkshopDetails = ({ workshop, reachedLimit }) => {

  const { user } = useContext(UserContext);
  const {
    userWorkshops,
    addUserWorkshop,
    deleteUserWorkshop,
    handleStatus,
    getWorkshops
  } = useContext(WorkshopContext);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [percentage, setPercentage] = useState(null);
  const [progressColor, setProgressColor] = useState("");

  useEffect(() => {
    userWorkshops.length &&
      userWorkshops.map((userWorkshop) => {
        if (userWorkshop.workshop_id === workshop.id) {
          setIsEnrolled(true);
        }
      });
  }, [userWorkshops]);

  useEffect(() => {
    if(percentage < 25){
      setProgressColor("#D75745")
    }
    if(percentage >= 25 && percentage < 50){
      setProgressColor("#EFC359")
    }
    if(percentage >= 50 && percentage < 75){
      setProgressColor("#405EA9")
    }
    if(percentage >= 75 && percentage < 100){
      setProgressColor("#5EB7C9")
    }
    if(percentage > 99){
      setProgressColor("#65BB8D")
    }
    getWorkshops()
  }, [percentage])

  useEffect(() => {
    calcPercentage(workshop.enrolled_attendees, workshop.room_capacity);
    if(workshop.enrolled_attendees === workshop.room_capacity){
      handleStatus(workshop.id, 0)
    } else{
      handleStatus(workshop.id, 1)
    }
  }, [workshop.enrolled_attendees]);

  const calcPercentage = (enrolled, room_capacity) => {
    const newPercentage = Math.round((enrolled / room_capacity) * 100);
    setPercentage(newPercentage);

  };

  const handleEnrolled = (enroll) => {
    if (enroll) {
      addUserWorkshop(workshop.id, user.id, workshop.speaker_id)
    } else {
      deleteUserWorkshop(workshop.id, user.id, workshop.speaker_id);
    }
    setIsEnrolled(!isEnrolled);
  };

  const day =
    workshop.date[8] === '0'
      ? workshop.date.substring(9, 10)
      : workshop.date.substring(8, 10);


  return (
    <div className='myWorkshop-details'>
      <div className='myWorkshop-details-header'>
        <div className='myWorkshop-details-date'>
          <p className='myWorkshop-details-day'>{`${workshop.workshop_month} ${day}  -  ${workshop.starting_hour.substring(0, 5)} - ${workshop.ending_hour.substring(0, 5)}`}</p>
        </div>
      </div>
      <div className='myWorkshop-basic-info'>
        <div className={isEnrolled ? 'myWorkshop-basic-info-left-enrolled' : 'myWorkshop-basic-info-left'}>
          <h2 className={isEnrolled? 'myWorkshop-details-title-enroled' : 'myWorkshop-details-title'}>
            {workshop.title}
          </h2>
          <h3 className={isEnrolled? 'myWorkshop-details-speaker-enroled' : 'myWorkshop-details-speaker'}>
            {workshop.workshop_speaker}
          </h3>
          <p className={isEnrolled? 'myWorkshop-details-description-enroled' : 'myWorkshop-details-description'}>
            {workshop.description}
          </p>
        </div>
        <div className='myWorkshop-basic-info-right'>
          <div className='myWorkshops-room-capacity'>
            <div className='myWorkshops-room-capacity-info'>
              <p className='myWorkshops-room-capacity-title'>
                Room Capacity
              </p>
              {percentage !== null && (
                <p className='myWorkshops-room-capacity-percentage'>
                  {percentage}%
                </p>
              )}
            </div>
            <div className='progress-bar'>
              {percentage !== null && (
                <div
                  className='progress-bar-fill'
                  style={{ width: `${percentage}%`, backgroundColor: progressColor }}
                />
              )}
            </div>
          </div>
          <p className={workshop.status_open ? 'status-open' : 'status-closed'}>
              {workshop.status_open ? 'Registrations OPEN' : 'Registrations CLOSED'}
          </p>
          {isEnrolled ? (
            <button className='myWorkshop-handle-not-enrolled' onClick={() => handleEnrolled(false)}>
              LEAVE
            </button>
          ) : (
            workshop.status_open !== 0 && (
            <button className={reachedLimit ? 'myWorkshop-handle-enrolled-disabled' : 'myWorkshop-handle-enrolled'} disabled={reachedLimit ? true : false} onClick={() => handleEnrolled(true)}>
              ENROLL
            </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MyWorkshopDetails;
