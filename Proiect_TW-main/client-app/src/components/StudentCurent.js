
function StudentCurent(props) {
    const {item} = props;
    return (
        <div className="student curent">
            <div className="student-header">
                {"You: " + item.nume}
            </div>
            <div className="student-footer">
                <button className="share-notes-button">Want to share a note?</button>
            </div>
        </div>
    )
}

export default StudentCurent;