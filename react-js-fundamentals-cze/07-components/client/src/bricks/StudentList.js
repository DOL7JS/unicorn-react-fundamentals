import Student from "./Student";

function StudentList(props) {

    return (props.studentList.map((student) => {
        return <Student key={student.id} student={student}/>
    }));
}

export default StudentList;