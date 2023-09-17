import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Student from "./Student";
import StudentCurent from "./StudentCurent";
import StudentForm from "./StudentForm";

const SERVER = 'http://localhost:8080/api';

function StudentList(){
    const {id, studentId} = useParams();
    const [students, setStudents] = useState([]);
    
    const getStudents = async () => {
        const response = await fetch(`${SERVER}/students/${studentId}/groups/${id}/students`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setStudents(data);
    }

    const addStudent = async (studentId, student) => {
        await fetch(`${SERVER}/groups/${id}/students/${studentId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        getStudents();
    }

    useEffect( () => {
        getStudents()
    }, [])

    return (
        <div>
            <div className="students-list">
            <StudentForm onAdd={addStudent} list={students}/>
                {
                students.filter(e => {return e.id == studentId})
                .map(s => <StudentCurent key={s.id} item={s}/>)
                }
                {
                    students.filter(e => {return e.id != studentId})
                    .map(s => <Student key={s.id} item={s} />)
                }
            </div>
        </div>
    )
}

export default StudentList;