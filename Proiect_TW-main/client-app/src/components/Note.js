import { useState } from "react";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import EditNote from "./EditNote";
import NoteForm from "./NoteForm";

const SERVER = 'http://localhost:8080/api';
let elementValue;

function Note(props){
    const {item, onDelete, btn,setBtn, onEdit} = props;

    // const [description, setDescription] = useState(item.description);
    // const [subject, setSubject] = useState(item.subject);
    // const [tag, setTag] = useState(item.tag);

    const deleteNote = () => {
        onDelete(item.id);
    }

    // const editNote = () => {
    //     setIsEditing(true);
    // }

    console.log(btn)
    const [description, setDescription] = useState(item.description);
    const [subject, setSubject] = useState(item.subject);
    const [tag, setTag] = useState(item.tag);
    let date = new Date().toJSON();

    const editNote = () => {
        onEdit(item.id, {
            description,
            subject,
            date,
            tag
        })
    }

    if(btn===true){
        elementValue = <div className="note">
        <div className="note-header">
            <div className="description">
                {item.description}
            </div>
        </div>
        <div className="note-footer">
            <small>{item.subject}</small>
            <div className="icons">
                <MdDeleteForever onClick={deleteNote} className="delete-icon" size="1.3em" />
                <MdEditNote onClick={() => {setBtn(false)}} className="edit-icon" size="1.3em"/>
            </div>
        </div>
    </div>
    }
    else if(btn===false){
        elementValue = <div className="note edit">
        <div className="note-header">
            <div className="description">
                <textarea rows="12" value={description} onChange={(evt) => setDescription(evt.target.value)}></textarea>
            </div>
        </div>
        <div className="note-footer">
            <textarea rows="1" value={subject} onChange={(evt) => setSubject(evt.target.value)}></textarea>
            <button className="save-button" onClick={() => {editNote(); setBtn(true)} }>Save</button>
        </div>
    </div>
    }
    return (
        // <div className="note">
        //     <div className="note-header">
        //         <div className="description">
        //             {item.description}
        //         </div>
        //     </div>
        //     <div className="note-footer">
        //         <small>{item.subject}</small>
        //         <div className="icons">
        //             <MdDeleteForever onClick={deleteNote} className="delete-icon" size="1.3em" />
        //             <MdEditNote onClick={() => {setBtn(true)}} className="edit-icon" size="1.3em"/>
        //         </div>
        //     </div>
        // </div>
        <div>
            {elementValue}
        </div>
    ) 
}

export default Note;