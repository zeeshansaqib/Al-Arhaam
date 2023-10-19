import { Button, Col,Container,  FormControl,  Modal, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../Assets/Al-arham.png";
import { Form, Link, useNavigate } from "react-router-dom";
import React from "react";

const Hearder = ({ Origin }: any) => {
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const navigate = useNavigate();
  const handleConfirm = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };
  const handelClick = () => {
    setShowConfirmModal(true);
  };
  return (
    <div>
      <>
        <Navbar style={{ padding: "10px" }} bg="dark" data-bs-theme="dark">
          <Navbar.Brand >
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
            />{" "}
        
            <Link className="no-style" to="/dashboard">Al-Arhaam Well-Fair</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="no-style" to="/appointments">Zones</Link>
            :&nbsp;
            <Link className="no-style" to="/admin-booking">Add New</Link>
            :&nbsp;
            <Link className="no-style" to="/disable-dates">Members</Link>
            :&nbsp;
            <Link className="no-style" to="/logs">Logs</Link>
          </Nav>
          <Col xs="auto">
            <Button onClick={handelClick}>log out</Button>
          </Col>
        </Navbar>
          {/* <Navbar expand="xxl" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand >Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  ><Link></Link></Nav.Link>
            <Nav.Link >Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item >Action</NavDropdown.Item>
              <NavDropdown.Item >
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link  disabled>
              Link
            </Nav.Link>
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar> */}
      </>

      <Modal show={showConfirmModal} onHide={handleCloseModal}>
        {origin === "closeAppointment" && (
          <Modal.Header>Close Appointment</Modal.Header>
        )}
        <Modal.Body>
          <h5 style={{padding:'10px'}}>Are you sure you want to logout</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            {" Logout"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Hearder;
