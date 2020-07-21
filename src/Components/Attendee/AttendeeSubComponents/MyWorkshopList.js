import React from "react";
import MyWorkshopDetails from './MyWorkshopDetails'


const MyWorkshopList = ({workshops, reachedLimit, userWorkshopsLeft}) => {


    return(
        <div className="myWorkshops-list">
            {workshops.length > 0 &&
            workshops.map(workshop => {
                return <MyWorkshopDetails workshop={workshop}
                key={workshop.id} reachedLimit={reachedLimit} userWorkshopsLeft={userWorkshopsLeft}/>
            })}
        </div>
    )
}

export default MyWorkshopList;