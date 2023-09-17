import { useState } from "react";
import Note from "./Note";

function EditNote(props) {
    const {item, onEdit2, btn2, setBtn2, id_notita, setIdNotita} = props;
    const [description, setDescription] = useState(item.description);
    const [subject, setSubject] = useState(item.subject);
    const [tag, setTag] = useState(item.tag);
    let date = new Date().toJSON();
    
    const editNote = () => {
        onEdit2(item.id, {
            description,
            subject,
            date,
            tag
        })
    }

    return  (
        <div className="note edit">
            <div className="note-header">
                <div className="description">
                    <textarea rows="12" value={description} onChange={(evt) => setDescription(evt.target.value)}></textarea>
                </div>
            </div>
            <div className="note-footer">
                <textarea rows="1" value={subject} onChange={(evt) => setSubject(evt.target.value)}></textarea>
                <button className="save-button" onClick={() => {editNote(); setBtn2(false)} }>Save</button>
            </div>
        </div>
    ) 
}

export default EditNote;