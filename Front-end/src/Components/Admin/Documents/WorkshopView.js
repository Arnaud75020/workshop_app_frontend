import React from "react";
import {
  pdf,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import AttendeeDetails from "../WorkshopAttendeesSubComponents/AttendeeDetails";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "collumn",
    backgroundColor: "#F0F0F0",
    margin: 10,
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "center",
  },

  title: {
    fontSize: 40,
    marginBottom: 20,
    backgroundColor: "#3B65B0",
  },

  subtitle: {
    fontSize: 25,
    marginBottom: 20,
    backgroundColor: "#3B65B0",
  },

  informationContainer: {
    marginBottom: 50,
    border: 2,
  },

  information: {
    padding: 5,
    fontSize: 12,
  },

  informationA: {
    border: 1,
    padding: 5,
    fontSize: 12,
  },
});

// Create Document Component
const WorkshopView = ({ workshop, attendees }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <div style={styles.title}>
          <Text>{workshop && workshop.title}</Text>
        </div>
        <div style={styles.informationContainer}>
          <div style={styles.information}>
            <Text>Room: {workshop && workshop.room}</Text>
          </div>
          <div style={styles.information}>
            <Text>
              Capacity: {workshop && workshop.room_capacity} attendees
            </Text>
          </div>
          <div style={styles.information}>
            <Text>Starting hour: {workshop && workshop.starting_hour}</Text>
          </div>
          <div style={styles.information}>
            <Text>Speaker: {workshop && workshop.workshop_speaker}</Text>
          </div>
          <div style={styles.information}>
            <Text>Room Manager: {workshop && workshop.room_manager}</Text>
          </div>
        </div>
        <div style={styles.subtitle}>
          <Text>Attendees list:</Text>
        </div>
        <div>
          <div>
            {attendees &&
              attendees.map((attendee) => {
                return (
                  <div style={styles.informationA}>
                    <Text>
                      {`Name : ${attendee.firstname} ${attendee.lastname}`} -{" "}
                      {`Country : ${attendee.country} `} -{" "}
                      {`Email : ${attendee.email} `}
                    </Text>
                    <Text>{`Position : ${attendee.position} - Company :${attendee.company}  `}</Text>
                  </div>
                );
              })}
          </div>
        </div>
      </View>
    </Page>
  </Document>
);

export default WorkshopView;
