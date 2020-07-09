import React, { useContext } from "react";
import { WorkshopContext } from '../../../Context/WorkshopContext';
import MyWorkshopDetails from './MyWorkshopDetails'


const MyWorkshopList = ({workshops, reachedLimit}) => {


    return(
        <div className="myWorkshops-list">
            {workshops.length > 0 &&
            workshops.map(workshop => {
                return <MyWorkshopDetails workshop={workshop}
                key={workshop.id} reachedLimit={reachedLimit}/>
            })}
        </div>
        //workshop.length && <h1>{user.id}</h1>
    )
}

export default MyWorkshopList;