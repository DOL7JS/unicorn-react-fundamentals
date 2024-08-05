import React from "react";
import Card from "react-bootstrap/Card"; // import komponenty Card
import Icon from '@mdi/react' // komponenta, kterou budeme používat pro zobrazení ikony
import { mdiAccountSchoolOutline, mdiIdentifier } from '@mdi/js' // ikony, které chceme využít
class Student extends React.Component {
  render() {
    return (
        <Card>
            <Card.Body>
                <div>
                    <Icon path={mdiAccountSchoolOutline} size={1} color={"grey"}/>{" "}
                    {this.props.student.firstname} {this.props.student.surname}
                </div>
                <div>
                    <Icon path={mdiIdentifier} size={1} color={"grey"}/>{" "}
                    {this.props.student.nationalId}
                </div>
            </Card.Body>
        </Card>

    );
  }
}

export default Student;
