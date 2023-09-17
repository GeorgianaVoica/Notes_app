import { useState, useEffect } from "react";

const SERVER = 'http://localhost:8080/api';

function StudentForm(props) {
    const {onAdd, list} = props;
    const [students, setStudents] = useState([]);
    const [name, setNume] = useState('');
    const [Id, setId] = useState(undefined);

    const getStudents = async () => {
        const response = await fetch(`${SERVER}/getStudents`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setStudents(data);
    }

    useEffect( () => {
        getStudents()
    }, [])
  
    const addStudent =  () => {
        onAdd( Id, {
            name
        })
    }

    const isSameStudent = (a,b) => a.nume === b.nume && a.id === b.id;
    const onlyInLeft = (left, right, compareFunction) => left.filter(leftValue => !right.some(rightValue => compareFunction(leftValue, rightValue)));

    const onlyInList = onlyInLeft(list, students, isSameStudent);
    const onlyInStudents = onlyInLeft(students, list, isSameStudent);

    const studentiRamasi = [...onlyInStudents, ...onlyInList];
    //console.log(studentiRamasi);

    return (
        <div className="student form">
            <div className="student-header">
                <textarea type="text" placeholder="Search student's name:" readOnly={true}/>
                <select className="student-tag"  onChange={(evt) => {setNume(evt.target.value);
                // for(let s of studentiRamasi){
                //     if(s.nume === nume){
                //         setId(s.id);
                //     }
                // }
                studentiRamasi.forEach((s) => { if(s.nume===evt.target.value){
                    console.log(s.nume)
                    setId(s.id);
                }
                    
                })}}>
                    <option key={""} value={""}>Name</option>
                    {
                        studentiRamasi.map((s) => <option key={s.nume} value={s.nume}>{s.nume}</option>)
                    }
                </select>
            </div>

            <div className="student-footer">
                <button className="add-student-button" onClick={addStudent}>Add</button>
            </div>
        </div>
    )
}

export default StudentForm;