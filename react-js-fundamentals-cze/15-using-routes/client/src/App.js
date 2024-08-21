import "./App.css";
import { useEffect, useState } from "react";
import ClassroomInfo from "./bricks/ClassroomInfo";
import StudentList from "./bricks/StudentList";
import Icon from "@mdi/react";
import {mdiAlertOctagonOutline, mdiLoading} from "@mdi/js";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/classroom.module.css";
import Navbar from "react-bootstrap/Navbar";
import {Container, Nav, NavDropdown} from "react-bootstrap";
import {Outlet, useNavigate} from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';

function App() {
  const [classroomLoadCall, setClassroomLoadCall] = useState({
    state: "pending",
  });
  const [listClassroomsCall, setListClassroomsCall] = useState({
    state: "pending",
  });
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/classroom/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setListClassroomsCall({ state: "error", error: responseJson });
      } else {
        setListClassroomsCall({ state: "success", data: responseJson });
      }
    });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/classroom/load?id=${"f780b198cf290778"}`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setClassroomLoadCall({ state: "error", error: responseJson });
      } else {
        setClassroomLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []);
  function getSchoolListDropdown() {
    switch (listClassroomsCall.state) {
      case "pending":
        return (
            <Nav.Link disabled={true}>
              <Icon size={1} path={mdiLoading} spin={true} /> Classroom List
            </Nav.Link>
        );
      case "success":
        return (
            <NavDropdown title="Select Classroom" id="navbarScrollingDropdown">
              {listClassroomsCall.data.map((classroom) => {
                return (
                    <NavDropdown.Item
                        onClick={() =>
                            navigate("/classroomDetail?id=" + classroom.id)
                        }
                    >
                      {classroom.name}
                    </NavDropdown.Item>
                );
              })}
            </NavDropdown>
        );
      case "error":
        return (
            <div>
              <Icon size={1} path={mdiAlertOctagonOutline} /> Error
            </div>
        );
      default:
        return null;
    }
  }
  function getChild() {
    switch (classroomLoadCall.state) {
      case "pending":
        return (
          <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <>
            <ClassroomInfo classroom={classroomLoadCall.data} />
            <StudentList classroom={classroomLoadCall.data} />
          </>
        );
      case "error":
        return (
          <div className={styles.error}>
            <div>Nepodařilo se načíst data o třídě.</div>
            <br />
            <pre>{JSON.stringify(classroomLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }
  return (
      <div className="App">
        <Navbar
            fixed="top"
            expand={"sm"}
            className="mb-3"
            bg="dark"
            variant="dark"
        >
          <Container fluid>
            <Navbar.Brand onClick={() => navigate("/")}>
              Simple School
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                  Simple School
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {getSchoolListDropdown()}
                  <Nav.Link onClick={() => navigate("/studentList")}>
                    Studenti
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/subjectList")}>
                    Předměty
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

        <Outlet />
      </div>
  );
}

export default App;
