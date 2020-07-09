import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [tempNotifications, setTempNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [searchNotificationValue, setSearchNotificationValue] = useState([]);
  const [stateFilter, setStateFilter] = useState("All notifications");

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    axios
      .get('/notifications')
      .then((response) => response.data)
      .then((notificationsList) => {
        setNotifications(notificationsList);
        setAllNotifications(notificationsList);
      });
  };

  const addTempNotification = (newObject) => {
    setTempNotifications([...tempNotifications, newObject]);
  };

  const confirmNotification = (newObject) => {
    axios
      .post('/notifications', newObject)

    getNotifications();
  };

  const editNotification = (newObject) => {
    const notificationsList = [...tempNotifications];
    const i = notificationsList.findIndex(
      (notification) => notification.id === newObject.id
    );
    notificationsList.splice(i, 1, newObject);
    setTempNotifications(notificationsList);
};

  const deleteTempNotification = (id) => {
    const notificationList = tempNotifications.filter(
      (notification) => notification.id !== id
    );
    setTempNotifications(notificationList);
  };

  const deleteNotification = (id) => {
    axios
      .delete(`/notifications/${id}`)

      getNotifications()
  }

  const handleFilterState = (event) => {

    const { value } = event.target;

      if (value === "All notifications") {
        setStateFilter(value)
        setNotifications(allNotifications);
      } else {
        const filterdNotifications = allNotifications.filter((notification) => {
          const notificationState = notification.state;
          return notificationState === value;
        });
        setStateFilter(value)
        setNotifications(filterdNotifications);
        setSearchNotificationValue("")
      };
  };

  const handleNotificationSearch = (event) => {
    const { value } = event.target;
    if (value.length) {
      const filteredNotifications = allNotifications.filter((notification) => {
        return (
          notification.subject.toLowerCase().includes(value.toLowerCase())
        );
      });
      setSearchNotificationValue(value);
      setNotifications(filteredNotifications);
      setStateFilter("All notifications")
    } else {
      setSearchNotificationValue(value);
      setNotifications(allNotifications);
    }
  };

  return (
    <div>
      <NotificationContext.Provider
        value={{
          notifications,
          tempNotifications,
          addTempNotification,
          confirmNotification,
          allNotifications,
          deleteTempNotification,
          editNotification,
          setTempNotifications,
          handleFilterState,
          stateFilter,
          handleNotificationSearch,
          searchNotificationValue,
          deleteNotification
        }}>
        {props.children}
      </NotificationContext.Provider>
    </div>
  );
};
export default NotificationContextProvider;
