import React from "react";
import { Alert, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styled from "styled-components";
import MainCard from "./Card";
import {
  faCalendar,
  faFile,
  faList,
  faLock,
  faCalendarPlus,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { DisableDays } from "../APIs/api-routes.util";
import Hearder from "./Header";

function Dashboard() {
  const [origin, setOrigin] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [color, setColor] = React.useState("success");
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [date, setDate] = React.useState("");

  const navigate = useNavigate();
  const handleConfirm = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handelCloseApp = () => {
    setOrigin("closeAppointment");
    setShowConfirmModal(true);
  };
  const handelDisable = () => {
    DisableDays(date).subscribe((res: any) => {
      if ("response" in res && res.response?.status === "success") {
        setShow(true);
        setColor("success");
        setMessage("The day you selected wass disabled succesfully");
      } else {
        setShow(true);
        setColor("danger");

        setMessage("SomeThing went wrong");
      }
    });
    setShowConfirmModal(false);
  };

  return (
    <>
      <Hearder Origin={"Admin dashboard"} />
      <div  className="main-container">
        <div className="alert-div">
          <Alert
            show={show}
            onClose={() => setShow(false)}
            dismissible
            variant={color}
          >
            {message}
          </Alert>
        </div>

        <CardsContainer>
          <MainCard
            icon={faUserCog}
            cardHeading={"Book New"}
            variant={"warning"}
            link="/admin-booking"
          />
          <MainCard
            icon={faCalendarPlus}
            cardHeading={"Book appointment"}
            variant={"info"}
            link="/book-appointment"
          />{" "}
          <MainCard
            icon={faLock}
            cardHeading={"Disable booking"}
            variant={"success"}
            handelClick={handelCloseApp}
          />
          <MainCard
            icon={faCalendar}
            cardHeading={"Disable Days"}
            variant={"danger"}
            link="/disable-dates"
          />{" "}
          <MainCard
            icon={faFile}
            cardHeading={"Logs"}
            variant={"primary"}
            link="/logs"
          />
          <MainCard
            icon={faList}
            cardHeading={" Appointments"}
            variant={"dark"}
            link="/appointments"
          />
        </CardsContainer>

        <Modal show={showConfirmModal} onHide={handleCloseModal}>
          {origin === "closeAppointment" && (
            <Modal.Header>Close Appointment</Modal.Header>
          )}
          <Modal.Body>
            {origin === "closeAppointment" ? (
              <div className="flex">
                <input
                  type="date"
                  className="form-control"
                  id="dateInput"
                  name="dateInput"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />{" "}
              </div>
            ) : (
              "Are you sure you want to logout?"
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={
                origin === "closeAppointment" ? handelDisable : handleConfirm
              }
            >
              {origin === "closeAppointment" ? "Disable Day" : " Logout"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

const CardsContainer = styled.div`
  width: 100%;
  height: 90%;
  background-color: #f2f7f8;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 50px;
`;
export default Dashboard;
