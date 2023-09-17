
function SimpleNote(props){
    const {item} = props;

    return (
        <div className="note simple-note">
            <div className="note-header">
                <div className="description">
                    <label id="description-item">{item.description}</label>
                </div>
            </div>
            <div className="note-footer">
                <small id="subject-item">{item.subject}</small>
                <small id="tag-item">{item.tag}</small>
            </div>
        </div>
    )
}

export default SimpleNote;