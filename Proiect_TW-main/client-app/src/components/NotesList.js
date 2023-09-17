import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Note from "./Note";
import NoteForm from "./NoteForm";
import EditNote from "./EditNote";
import {useNavigate} from "react-router-dom";
import GroupsList from "./GroupsList";
import SimpleNote from "./SimpleNote";

const SERVER = 'http://localhost:8080/api';
let elementValue;

function NotesList(props) {
    const {searchedText, searchedTag, studentId} = props;
    const [notes, setNotes] = useState([]);
    const {id} = useParams();
    const [editNoteId, setEditNoteId] = useState(null);
    // const [searchText, setSearchText] = useState('');
    // const [searchTag, setSearchTag] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
    const [butonEdit, setButonEdit] = useState(true);

    const getMyNotes = async () => {
        const response = await fetch(`${SERVER}/students/${id}/notes`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setNotes(data);
    }

    const addNote = async (note) => {
        await fetch(`${SERVER}/students/${id}/note`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        getMyNotes();
    }

    // const deleteNote = async (noteId) => {
    //     await fetch(`${SERVER}/deleteNote/${noteId}`, {
    //         method: "DELETE"
    //     })
    //     getMyNotes();
    // }

    const deleteNote = async (note_id) => {
        try {
            await fetch(`${SERVER}/students/${id}/deleteNote/${note_id}`, {
                method: 'DELETE'
            })
            getMyNotes()
        } catch (err) {
           console.warn(err);
        }
    }
    
    const editNote = async (noteId, note) => {
        setEditNoteId(noteId)
        const response = await fetch(`${SERVER}/modifyNote/${noteId}`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        if (!response.ok) {
            throw response
        }
        getMyNotes();
    }

    const searchNotes = async () => {
        const response = await fetch(`${SERVER}/students/${id}/notes/${searchedText}`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setNotes(data);
    }

    useEffect( () => {
        getMyNotes()
    }, [])

    const firstId = localStorage.getItem("id_stud");
    if(firstId === id){
        elementValue = <div className="notes-container">
                <div className="notes-list">
                    {
                        notes.filter((note) => {return note.description.toLowerCase().includes(searchedText) && note.tag.includes(searchedTag)})
                        .map(e =>  { return <Note key={e.id} item={e} onDelete={deleteNote} onEdit={editNote} btn={butonEdit} setBtn={setButonEdit}/> })
                    }
                    <NoteForm onAdd={addNote} />
                </div>
                <button className="groups-button" onClick={() => setButtonPopup(true)} /*onClick={() => navigate(`/students/${id}/groups`) }*/>
                See your groups</button>
                <GroupsList trigger={buttonPopup} setTrigger={setButtonPopup}></GroupsList>
        </div>
    }
    else {
        if (notes && notes.length > 0) {
            elementValue = <div className="notes-container">
                    <div className="notes-list">
                        {
                            notes.map((note) => <SimpleNote key={note.id} item={note}/>)
                        }
                    </div>
                </div>
           
        }
        else if (notes.length === 0){
            elementValue = 
                <div className="notes-list">
                    <h2>There are no notes yet</h2>
                </div>
           
        }
    }
    return (
        <>
        {elementValue}
        </>
        
    ) 
}

export default NotesList;