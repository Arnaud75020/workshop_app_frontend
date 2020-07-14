import React, { useContext, useState, useEffect } from "react";
import { MdDelete, MdEdit, MdMessage } from "react-icons/md";
import { UserContext } from "../../../Context/UserContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactPDF, {
  PDFViewer,
  PDFDownloadLink,
  BlobProvider,
  pdf,
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import WorkshopView from "../Documents/WorkshopView";
import { FaListUl } from "react-icons/fa";
import { CSVLink, CSVDownload } from "react-csv";

const WorkshopInfo = ({
  workshop,
  toggleDisplayModal,
  selectModal,
  attendees,
}) => {
  const { user } = useContext(UserContext);
  const [statusClipboard, setStatusClipboard] = useState(true);
  const [data, setData] = useState([]);

  const listofemail = attendees
    .map((attendee) => `${attendee.email}; `)
    .join("");

  const handleEdit = () => {
    toggleDisplayModal("workshop");
  };

  const hanldeNotification = () => {
    toggleDisplayModal("notification");
  };

  const headers = [
    { label: "Title", key: "title" },
    { label: "Speaker", key: "speaker" },
    { label: "Capacity", key: "capacity" },
    { label: "Room Type", key: "room_type" },
    { label: "Room Manager", key: "room_manager" },
    { label: "Attendee Name", key: "aName" },
    { label: "Attendee Email", key: "aEmail" },
    { label: "Company", key: "aCompany" },
  ];

  useEffect(() => {
    const attendeesRows = attendees.map((attendee) => ({
      title: workshop.title,
      speaker: workshop.workshop_speaker,
      capacity: workshop.room_capacity,
      room_type: workshop.room_type,
      room_manager: workshop.room_manager,
      aName: `${attendee.firstname} ${attendee.lastname}`,
      aEmail: attendee.email,
      aCompany: attendee.company,
    }));
    setData(attendeesRows);
  }, []);

  return (
    workshop !== [] && (
      <div>
        <div className="workshop-info">
          <div className="workshop-info-header">
            <div className="workshop-info-date">
              {workshop.date && (
                <div className="date">{`${workshop.date.substring(8, 10)} ${
                  workshop.workshop_month
                } - ${workshop.starting_hour.substring(
                  0,
                  5
                )}-${workshop.ending_hour.substring(0, 5)}`}</div>
              )}
            </div>
            {user.role === "speaker" && <div>Welcome {user.firstname}</div>}
            {user.role === "speaker" && (
              <CopyToClipboard
                text={listofemail}
                onCopy={() => setStatusClipboard(!statusClipboard)}
              >
                <button>{statusClipboard ? "Copy" : "Copied"}</button>
              </CopyToClipboard>
            )}
            {user.role !== "speaker" && (
              <div className="dropdown">
                <button className="options-icon">
                  <FaListUl />
                </button>
                <div className="workshop-info-dropdown">
                  <button
                    className="workshop-icons"
                    onClick={hanldeNotification}
                  >
                    notification
                  </button>
                  <button className="workshop-icons" onClick={handleEdit}>
                    edit
                  </button>
                  <PDFDownloadLink
                    document={
                      <WorkshopView workshop={workshop} attendees={attendees} />
                    }
                    fileName="Test.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? <button>loading</button> : <button>PDF</button>
                    }
                  </PDFDownloadLink>
                  <CSVLink
                    data={data}
                    headers={headers}
                    filename={"Workshop.csv"}
                    className="workshop-icons"
                    target="_blank"
                  >
                    CSV
                  </CSVLink>
                </div>
              </div>
            )}
          </div>
          <div className="workshop-info-body">
            <div className="workshop-info-left">
              <h2>{workshop.title}</h2>
              <h4>{workshop.workshop_speaker}</h4>
              <p>{workshop.description}</p>
            </div>
            <div className="workshop-info-right">
              <div className="room-manager">
                <p className="room">
                  <span>Room:</span> {workshop.room}
                </p>
                <p>
                  <span>Room manager:</span> {workshop.room_manager}
                </p>
              </div>
              <p>
                <span>Room setup:</span> {workshop.room_type}
              </p>
              <p>
                <span>Room capacity:</span> {workshop.room_capacity}
              </p>
              <p className={workshop.status_open === 1 ? "open" : "closed"}>
                <span>Registrations:</span>{" "}
                {workshop.status_open === 1 ? "OPEN" : "CLOSED"}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
//ReactDOM.render(<WorkshopView />, document.getElementById("root"));
export default WorkshopInfo;
