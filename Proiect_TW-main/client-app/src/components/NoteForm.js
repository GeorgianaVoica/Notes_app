import { useState } from "react";

function NoteForm(props) {
    const {onAdd, item} = props;
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [tag, setTag] = useState('');
    let date = new Date().toJSON();
    let characterCountLimit=200;
    const tags = [{
        label: "CURS",
        value: "CURS"
    }, {
        label: "SEMINAR",
        value: "SEMINAR"  
    }];

    const addNote = () => {
        if(description !== "" && subject !== ""){
                onAdd({description,
                    subject,
                    date,
                    tag})
            setDescription('');
            setSubject('');
            setTag('CURS'); 
            }
        else if(description === ""){
            alert("You didn't type the description of your note!")
        }
        else if(subject === ""){
            alert("You didn't type the subject of your note!")
        }
    }

    return (
        //denumirea note form a clasei ii permite sa ia stilurile puse pe clasa .note, 
        //dar va putea sa aiba si stiluri proprii
        <div className="note form"> 
            <div className="note-header">
                <div className="note-description">
                    <small>{characterCountLimit-description.length} words remaining</small>
                    <textarea rows="12"  placeholder="Type your note here..." value={description} onChange={(evt) => {
                       if(evt.target.value.trim().length > 0){
                            if(characterCountLimit-evt.target.value.length>=0){
                                setDescription(evt.target.value);
                            }
                        }
                    }}></textarea>
                </div>
                <div className="note-tag">
                    <select onChange={(evt) => {
                        setTag(evt.target.value)}}>
                        {
                            tags.map(t => <option key={t.value} value={t.value}>{t.label}</option>)
                        }
                    </select>
                </div>
            </div>
            
            <div className="note-footer">
                <div className="note-subject">
                    <textarea rows="1" placeholder="What subject is this?" value={subject} onChange={(evt) => {
                        if(evt.target.value.trim().length > 0){
                            setSubject(evt.target.value)
                        }
                    }}></textarea>
                </div>
                <button className="save-button" onClick={addNote}>Save</button>
            </div>  
        </div>
    )
}

export default NoteForm;