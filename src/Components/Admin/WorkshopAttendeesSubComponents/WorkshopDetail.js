import React from 'react';
import { useEffect } from 'react';

const WorkshopDetail = ( { workshop } ) => {

    useEffect(() => {
    console.log("detail", workshop)
    }, [])

    const workshopDate = workshop.date.substring(0, 10);
    const workshopHour = workshop.date.substring(11, 16);
    
        return (
            <tr>
                <td>{`${workshopDate} ${workshopHour} `}</td>
                <td>{workshop.title}</td>
                <td>{workshop.workshop_speaker}</td>
                <td>{workshop.room_capacity}</td>
                <td>{workshop.room_type}</td>
                <td>{workshop.room_manager}</td>               
            </tr>
        );
}

export default WorkshopDetail;