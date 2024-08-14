import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {mdiTable, mdiViewGridOutline} from "@mdi/js";
import Icon from "@mdi/react";
import StudentGridList from "./StudentGridList";
import StudentTableList from "./StudentTableList";

function StudentList(props) {
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";

    return (<>
        <Navbar bg="light">
            <div className="container-fluid">
                <Navbar.Brand>Seznam studentů</Navbar.Brand>
                <Button variant="outline-primary" onClick={() =>
                    setViewType((currentState) => {
                        if (currentState === "grid") return "table";
                        else return "grid";
                    })}>
                    <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline}/>{" "}
                    {isGrid ? "Tabulka" : "Grid"}
                </Button>
            </div>
        </Navbar>
        {isGrid ? (
            <StudentGridList studentList={props.studentList}/>
        ) : (
            <StudentTableList studentList={props.studentList}/>
        )}
    </>);
}

export default StudentList;
