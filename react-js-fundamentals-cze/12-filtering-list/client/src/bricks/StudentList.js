import React, {useMemo, useState} from "react";
import StudentGridList from "./StudentGridList";
import StudentTableList from "./StudentTableList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import {mdiMagnify, mdiTable, mdiViewGridOutline} from "@mdi/js";
import {Form} from "react-bootstrap";

function StudentList(props) {
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid";
    const [searchBy, setSearchBy] = useState("");

    function handleSearch(event) { // funkce, kterou budeme spoustět na "odeslání" formuláře, tedy na stisknutí tlačítka vyhledat
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) { // funkce, která se bude spouštět při změně hodnoty vstupu pro vyhledávání
        if (!event.target.value) setSearchBy(""); // pokud ve vstupu nebude hodnota (uživatel stiskne x), bude zrušeno vyhledávání
    }

    const filteredStudentList = useMemo(() => {
        return props.studentList.filter((item) => {
            return (
                item.firstname
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase()) ||
                item.surname.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [searchBy]);
    return (
        <div>
            <Navbar bg="light">
                <div className="container-fluid">
                    <Navbar.Brand>Seznam studentů</Navbar.Brand>
                    <div>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                id={"searchInput"}
                                style={{ maxWidth: "150px" }}
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearchDelete}
                            />
                            <Button
                                style={{ marginRight: "8px" }}
                                variant="outline-success"
                                type="submit"
                            >
                                <Icon size={1} path={mdiMagnify} />
                            </Button>
                            <Button
                                variant="outline-primary"
                                onClick={() =>
                                    setViewType((currentState) => {
                                        if (currentState === "grid") return "table";
                                        else return "grid";
                                    })
                                }
                            >
                                <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                                {isGrid ? "Tabulka" : "Grid"}
                            </Button>
                        </Form>
                    </div>
                </div>
            </Navbar>
            {isGrid ? (
                <StudentGridList studentList={filteredStudentList} />
            ) : (
                <StudentTableList studentList={filteredStudentList} />
            )}
        </div>
    );
}

export default StudentList;
