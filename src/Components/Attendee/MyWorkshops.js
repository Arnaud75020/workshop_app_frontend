import React, { useContext, useState, useEffect } from 'react';
import { WorkshopContext } from '../../Context/WorkshopContext';
import { UserContext } from '../../Context/UserContext';
import MyWorkshopList from './AttendeeSubComponents/MyWorkshopList';
import './MyWorkshops.scss';

const MyWorkshops = () => {
  const {
    allWorkshops,
    months,
    userWorkshops,
    getUserWorkshops,
  } = useContext(WorkshopContext);
  const { user, getUserMaxWorkshops, userWorkshopsLeft } = useContext(UserContext);

  const [workshopList, setWorkshopList] = useState([]);
  const [active, setActive] = useState('');
  const [reachedLimit, setReachedLimit] = useState(false);
  const [workshopsLeft, setWorkshopsLeft] = useState('');

  useEffect(() => {
    getUserWorkshops(user.id)
    getUserMaxWorkshops(user.id)
  }, []);

  useEffect(() => { 
    getUserMaxWorkshops(user.id)
  }, [userWorkshops]);

  useEffect(() => {
    if (userWorkshopsLeft > 0) {
      setWorkshopsLeft(`you can register in ${userWorkshopsLeft} workshops`);
      setReachedLimit(false);
  } else {
    setWorkshopsLeft('no more workshops to register');
    setReachedLimit(true);
  }
  }, [userWorkshopsLeft]);

  useEffect(() => {
    if (months.length > 0) {
      monthlyWorkshops(months[0].month);
      setActive(months[0].month);
    }
  }, [months]);

  useEffect(() => {
    if (months.length > 0) {
      if (active !== '') {
        monthlyWorkshops(active);
        setActive(active);
      }
    }
  }, [allWorkshops]);


  const monthlyWorkshops = (month) => {
    const monthlyWorkshopList = allWorkshops.filter((workshop) => {
      return workshop.workshop_month === month;
    });
    setWorkshopList(monthlyWorkshopList);
    setActive(month);
  };


  return (
    <div>
      <div className='myWorkshops-header'>
        <div className='myWorkshops-header-left'>
          <h1>My Workshops</h1>
          <div className="myworkshops-btns-wrapper">
          {months.length > 0 &&
            months.map((month, index) => {
              return (
                <button
                  key={index}
                  className={
                    active === month.month
                      ? 'myWorkshops-month-btn active'
                      : 'myWorkshops-month-btn'
                  }
                  onClick={() => monthlyWorkshops(month.month)}>
                  {month.month}
                </button>
              );
            })}
            </div>
        </div>
        <p
          className={
            reachedLimit
              ? 'myWorkshops-limit-warning-reached'
              : 'myWorkshops-limit-warning'
          }>
          {workshopsLeft}
        </p>
      </div>
      <MyWorkshopList workshops={workshopList} reachedLimit={reachedLimit} userWorkshopsLeft={userWorkshopsLeft} />
    </div>
  );
};

export default MyWorkshops;