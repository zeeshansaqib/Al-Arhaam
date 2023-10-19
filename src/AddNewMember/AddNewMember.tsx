import React, { useState } from "react";

import {
  FormControl,
  Dropdown,
  Button,
  Alert,
  InputGroup,
  Modal,
  Form,
} from "react-bootstrap";
import { GetAvailablity, bookAppointment } from "../APIs/api-routes.util";
import GetPoneBookings from "./GetPoneBookings";
import Header from "../Dashboard/Header";

function AddNewMember() {
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [origin, setOrigin] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const [data, setData] = useState({
    Phone: "",
    Date: "",
    Name: "",
    GuardianName: "",
  });

  const handleCloseModal = () => {
    setShowModel(false);
  };

  const checkDate = () => {
    if (data.Date) {
      GetAvailablity(data.Date).subscribe((res: any) => {
        const response = res.response;
        if ("response" in res && response.isAvailable && response.isNotFull) {
          setShow(true);
          setOrigin("success");
          setIsEnabled(true);

          setErrorMessage("The day you selected is available");
        } else {
          setShow(true);
          setOrigin("danger");
          setErrorMessage("The day you selected is unavailable");
        }
      });
    } else {
      setShow(true);
      setOrigin("danger");
      setErrorMessage("Please select the date");
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.Date && data.GuardianName && data.Name && data.Phone) {
      bookAppointment(data).subscribe((res: any) => {
        if ("response" in res && res.response?.status === "200") {
          setErrorMessage("Appointment booked successfully");
          setOrigin("info");
          setShow(true);
        } else {
          setErrorMessage("Something went wrong");
          setOrigin("danger");
          setShow(true);
        }
      });
    } else {
      setShow(true);
      setOrigin("danger");
      setErrorMessage("Please provice the folowing Info");
    }
  };

  const handelUpdate = (items: { Name: string; GuardianName: string }) => {
    console.log(items);

    setData({ ...data, Name: items.Name, GuardianName: items.GuardianName });
  };

  return (
    <>
      <Header Origin={"Book New Appointment"} />
      <div className="main-container">
        <div className="form-admin-container">
          <form onSubmit={handleSubmit} className="form-admin-booking">
            <InputGroup className="mb-3">
              <FormControl
                type="date"
                placeholder="Check available day"
                aria-label="Check available day"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  setData({
                    ...data,
                    Date: e.target.value,
                  });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  setData({
                    ...data,
                    Phone: e.target.value,
                  });
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Father Name"
                aria-label="Father Name"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  setData({
                    ...data,
                    Name: e.target.value,
                  });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Phone"
                aria-label="Phone"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  setData({
                    ...data,
                    GuardianName: e.target.value,
                  });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Select aria-label="Default select example">
                <option>Zones</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </InputGroup>

            <div className="submit-button">
              <Button style={{ width: "50%" }} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="alert-div">
          <Alert
            show={show}
            onClose={() => setShow(false)}
            dismissible
            variant={origin}
          >
            {errorMessage}
          </Alert>
        </div>

        <Modal size="lg" show={showModel} onHide={handleCloseModal}>
          {origin === "closeAppointment" && (
            <Modal.Header>Close Appointment</Modal.Header>
          )}
          <Modal.Body>
            <GetPoneBookings
              phone={data.Phone}
              handelUpdate={handelUpdate}
              data={data}
              setShowModel={setShowModel}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModel(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default AddNewMember;
