import React, { useContext } from 'react';
import { WorkshopContext } from '../../Context/WorkshopContext';
import './NavBar.scss';
import { Link } from 'react-router-dom';

const MonthlySpeakers = ({ month }) => {

    const { workshops } = useContext(WorkshopContext);


    const filteredWorkshops = workshops.filter( workshop => {
    return workshop.workshop_month === month
    })

    return(
            filteredWorkshops.map(workshop => {
                return <li><Link to={`/admin/workshop-attendees/${workshop.speaker_id}`}>{workshop.workshop_speaker}</Link></li>
            })
        
    )
}

export default MonthlySpeakers;