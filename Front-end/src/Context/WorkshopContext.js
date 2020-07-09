import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WorkshopContext = createContext();

const WorkshopContextProvider = (props) => {
  const [workshops, setWorkshops] = useState([]);
  const [tempWorkshops, setTempWorkshop] = useState([]);
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [months, setMonths] = useState([]);
  const [searchWorkshopValue, setSearchWorkshopValue] = useState('');
  const [searchAttendeeValue, setSearchAttendeeValue] = useState([]);
  const [userWorkshops, setUserWorkshops] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [allAttendees, setAllAttendees] = useState([]);
  const [dateFilter, setdDateFilter] = useState("All workshops");
  const [myAttendeesList, setMyAttendeesList] = useState([]);

  useEffect(() => {
    getWorkshops();
    getMonth();
  }, []);

  const getWorkshops = () => {
    axios
      .get('/workshops')
      .then((response) => response.data)
      .then((workshopsList) => {
        setWorkshops(workshopsList);
        setAllWorkshops(workshopsList);
      });
  };

  const getWorkshop = (speakerId) => {
    axios
        .get(`/workshops/${speakerId}`)
        .then((response) => response.data[0])
        .then((workshopInfo) => {
          console.log("WORKSHOP CONTEXT",workshopInfo )
          setWorkshop(workshopInfo)
        })
}

const getAttendees = (speakerId) => {
  axios
      .get(`/workshops/${speakerId}/attendees`)
      .then((response) => response.data)
      .then((attendeesList) => {
        setAttendees(attendeesList);
        setAllAttendees(attendeesList);
      });
  };

  const getUserWorkshops = (id) => {
    axios
      .get(`/workshops/user-workshops/${id}`)
      .then((response) => response.data)
      .then((userWorkshops) => {
        setUserWorkshops(userWorkshops);
      });
  };

  const addUserWorkshop = (workshopId, userId, speakerId) => {
    const user_workshop = {
      workshop_id: workshopId,
      user_id: userId,
      speaker_id: speakerId,
    };
    axios
      .post('/workshops/user-workshops/add', user_workshop)
      .then((response) => response.data)
      .then((newUserWorkshops) => {
        console.log("ADD USER",newUserWorkshops )
        setUserWorkshops(newUserWorkshops);
      });
    getWorkshops();
  };

  const deleteUserWorkshop = (workshopId, userId) => {
    const user_workshop = [workshopId, userId];
    axios
      .delete('/workshops/user-workshops/delete', { data: user_workshop })
      .then((response) => response.data)
      .then((newUserWorkshops) => {
        console.log("DELETE USER",newUserWorkshops )

        setUserWorkshops(newUserWorkshops);
      });
    getWorkshops();
  };

  const getMonth = () => {
    axios
      .get('/workshops/months')
      .then((response) => response.data)
      .then((monthsList) => {
        console.log('monthsList', monthsList);
        setMonths(monthsList);
      });
  };

  const addTempWorkshop = (newObject) => {
    setTempWorkshop([...tempWorkshops, newObject]);
  };

  const confirmEditedWorkshop = (newWorkshop) => {
    const newWorkshopId = newWorkshop.id;

    axios.put(`/workshops/${newWorkshopId}`, newWorkshop);

    getWorkshops();
    getMonth();
  };

  const confirmWorkshop = (newObject) => {
    axios.post('/workshops', newObject);

    getWorkshops();
    getMonth();
  };

  const editTempWorkshop = (newObject) => {
    const workshopsList = [...tempWorkshops];
    const i = workshopsList.findIndex((wrkshop) => wrkshop.id === newObject.id);
    workshopsList.splice(i, 1, newObject);
    setTempWorkshop(workshopsList);
  };

  const deleteTempWorkshop = (id) => {
    const workshopList = tempWorkshops.filter((workshop) => workshop.id !== id);
    setTempWorkshop(workshopList);
  };

  const deleteWorkshop = (id, enrolled_attendees) => {
    if (enrolled_attendees > 0) {
      axios
      .delete(`/workshops/workshop-user-workshops/${id}`)
      .then(() => {
        axios
        .delete(`/workshops/${id}`);
      });
    }
    axios.delete(`/workshops/${id}`);

    getWorkshops();
  };

  const handleFilterDate = (event) => {
    const { value } = event.target;

    if (value === 'All Workshops') {
      setdDateFilter(value);
      setWorkshops(allWorkshops);
    } else {
      const filterdResult = allWorkshops.filter((workshop) => {
        const workshopMonth = workshop.workshop_month;
        return workshopMonth === value;
      });
      setdDateFilter(value);
      setWorkshops(filterdResult);
      setSearchWorkshopValue('');
    }
  };

  const handleWorkshopSearch = (event) => {
    const { value } = event.target;
    if (value.length) {
      const filteredWorkshops = allWorkshops.filter((workshop) => {
        return (
          workshop.title.toLowerCase().includes(value.toLowerCase()) ||
          workshop.workshop_speaker.toLowerCase().includes(value.toLowerCase())
        );
      });
      setSearchWorkshopValue(value);
      setWorkshops(filteredWorkshops);
      setdDateFilter('All workshops');
    } else {
      setSearchWorkshopValue(value);
      setWorkshops(allWorkshops);
    }
  };

  const handleAttendeeSearch = (event) => {
    const { value } = event.target;

    if (value.length) {
      const filteredAttendees = allAttendees.filter((attendee) => {
        const attendeeName = `${attendee.firstname} ${attendee.lastname}`;
        return attendeeName.toLowerCase().includes(value.toLowerCase());
      });
      setSearchAttendeeValue(value);
      setAttendees(filteredAttendees);
    } else {
      setSearchAttendeeValue(value);
      setAttendees(allAttendees);
    }
  };

  return (
    <div>
      <WorkshopContext.Provider
        value={{
          workshops,
          tempWorkshops,
          addTempWorkshop,
          confirmWorkshop,
          allWorkshops,
          handleFilterDate,
          editTempWorkshop,
          deleteTempWorkshop,
          months,
          setTempWorkshop,
          handleWorkshopSearch,
          searchWorkshopValue,
          getUserWorkshops,
          userWorkshops,
          addUserWorkshop,
          deleteUserWorkshop,
          getWorkshops,
          confirmEditedWorkshop,
          getWorkshop,
          workshop,
          getAttendees,
          attendees,
          searchAttendeeValue,
          handleAttendeeSearch,
          dateFilter,
          deleteWorkshop,
        }}>
        {props.children}
      </WorkshopContext.Provider>
    </div>
  );
};
export default WorkshopContextProvider;
