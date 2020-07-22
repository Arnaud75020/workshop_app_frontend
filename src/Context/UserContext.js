import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [attendees, setAttendees] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allAttendees, setAllattendees] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState('All users');
  const [speakers, setSpeakers] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [user, setUser] = useState([]);
  const [userWorkshopsLeft, setUserWorkshopsLeft] = useState(null);


  const [auth, setAuth] = useState(false);


  useEffect(() => {
    axios
      .get('/auth/verify-token')
      .then((response) => {
        setAuth(true);
        setUser(response.data);
      })
      .catch(() => setAuth(false));

    getAllAttendees();
    getAllSpeakers();
    getAllUsers();
  }, []);

  const getAllSpeakers = () => {
    axios
      .get('/users/speakers')
      .then((response) => response.data)
      .then((speakersList) => {
        setSpeakers(speakersList);
      });
  };

  const getAllAttendees = () => {
    axios
      .get('/users/attendees')
      .then((response) => response.data)
      .then((attendeesList) => {
        setAllattendees(attendeesList);
      });
  };

  const getAllUsers = () => {
    axios
      .get('/users')
      .then((response) => response.data)
      .then((allUsersList) => {
        setUsers(allUsersList);
        setAllUsers(allUsersList);
      });
  };

  const setUserInformation = ({ user, token }) => {
    setUser(user);
    window.localStorage.setItem('userRole', user.role);
  };

  const logout = () => {
    axios.post('/auth/logout');
    window.localStorage.removeItem('userRole');
  };

  const handleFilterUser = (event) => {
    const role = event.target.value;

    switch (role) {
      case 'All users':
        setFilterUser(role);
        setUsers(allUsers);
        break;
      case 'Attendees':
        setFilterUser(role);
        setUsers(allAttendees);
        break;
      case 'Speakers':
        setFilterUser(role);
        setUsers(speakers);
        break;
    }
  };

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    if (value.length) {
      const filteredUsers = allUsers.filter((user) => {
        const name = `${user.firstname} ${user.lastname}`;
        return name.toLowerCase().includes(value.toLowerCase());
      });
      setsearchValue(value);
      setUsers(filteredUsers);
    } else {
      setsearchValue(value);
      setUsers(allUsers);
    }
  };

  const deleteUser = (id, role) => {
    if (role === 'speaker') {
      axios
        .delete(`/workshops/all-speaker-workshops/${id}`)
        .then(() => {
        axios
          .delete(`/workshops/speaker/${id}`)
          .then(() => {
          axios
            .delete(`/users/${id}`)
            .then(() => {
            getAllUsers();
          });
        });
      });
    }
    if (role === 'attendee') {
      axios
        .delete(`/workshops/all-user-workshops/${id}`)
        .then(() => {
        axios
          .delete(`/users/${id}`)
          .then(() => {
          getAllUsers();
        });
      });
    }
    axios
      .delete(`/users/${id}`)
      .then(() => {
        getAllUsers();
      })

  };

  const confirmUpdatedUser = (updatedUser) => {

    const updatedUserId = updatedUser.id;

        axios
          .put(`/users/${updatedUserId}`, updatedUser)
          .then(() => getAllUsers())
          .then(() => {
            axios
              .get(`/users/getuser/${updatedUserId}`)
              .then((response) => response.data[0])
              .then((userInfo) => setUser(userInfo))
          }
          )
  };

  const getUserMaxWorkshops = (id) => {
    axios
      .get(`/users/get-max-workshops/${id}`)
      .then(response => response.data[0])
      .then((info) => {
        setUserWorkshopsLeft(info.max_workshops)
      })
  }

  return (
    <div>
      <UserContext.Provider
        value={{
          users,
          attendees,
          allAttendees,
          handleFilterUser,
          filterUser,
          speakers,
          allUsers,
          searchValue,
          handleChangeSearch,
          deleteUser,
          user,
          setUserInformation,
          getAllSpeakers,
          logout,
          auth,
          setAuth,
          confirmUpdatedUser,
          getUserMaxWorkshops,
          userWorkshopsLeft
        }}>
        {props.children}
      </UserContext.Provider>
    </div>
  );
};

export default UserContextProvider;