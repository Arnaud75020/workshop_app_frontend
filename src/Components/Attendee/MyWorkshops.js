import React, { useContext, useState, useEffect } from "react";
import { WorkshopContext } from '../../Context/WorkshopContext';
import { UserContext } from '../../Context/UserContext';
import MyWorkshopList from './AttendeeSubComponents/MyWorkshopList'
import './MyWorkshops.scss'

const MyWorkshops = () => {

    const { workshops, getWorkshops, months, userWorkshops } = useContext(WorkshopContext);
    const { user } = useContext(UserContext);

    console.log("USER USER USER", user)

    const [workshopList, setWorkshopList] = useState([])
    const [active, setActive] = useState("")
    const [reachedLimit, setReachedLimit] = useState(false)
    const [workshopsLeft, setWorkshopsLeft] = useState("")

    useEffect(() => {
        if(userWorkshops.length > 0){
            getWorkshops()
        }
        checkWorkshopsLeft()
    },[userWorkshops])

    useEffect(() => {
        if(months.length > 0){
            monthlyWorkshops(months[0].month)
            setActive(months[0].month)
            checkWorkshopsLeft()
        }
    },[months])

    useEffect(() => {
        if(months.length > 0){
            if(active !== ""){
                monthlyWorkshops(active)
                setActive(active)
            }
            
        }
    },[workshops])

    const monthlyWorkshops = (month) => {
        const monthlyWorkshopList = workshops.filter(workshop => {
            return workshop.workshop_month === month
        })
        setWorkshopList(monthlyWorkshopList)
        setActive(month)
    }

    const checkWorkshopsLeft = () => {
        if(user.max_workshops > userWorkshops.length){
            if(userWorkshops.length > 0){
                setWorkshopsLeft(`you still have ${user.max_workshops - userWorkshops.length} workshops to choose`)
            } else {
                setWorkshopsLeft(`you can register in ${user.max_workshops} workshops`)
            }
            setReachedLimit(false)
        } else {
            setWorkshopsLeft("no more workshops to register")
            setReachedLimit(true)
        }
    }

    return(
        <div>
            <div className="myWorkshops-header">
                <div className="myWorkshops-header-left">
                    <h1>My Workshops</h1>
                    {months.length > 0 && 
                        months.map(month => {
                            return <button className={active === month.month ?"myWorkshops-month-btn active": "myWorkshops-month-btn" } onClick={() => monthlyWorkshops(month.month)}>{month.month}</button>
                })}
                </div>
                <p className={reachedLimit ? "myWorkshops-limit-warning-reached" : "myWorkshops-limit-warning"}>{workshopsLeft}</p>
            </div>
            <MyWorkshopList workshops={workshopList} reachedLimit={reachedLimit} />
        </div>
    )
}

export default MyWorkshops;