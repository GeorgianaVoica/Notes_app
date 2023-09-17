import { useNavigate } from "react-router-dom";

function Student(props) {
    const {item} = props;
    const navigate = useNavigate();
    return (
        <div className="student">
            <div className="student-header">
                {item.nume}
            </div>
            <div className="student-footer">
                <button className="see-notes-button" onClick={() => navigate(`/students/${item.id}/notes`)}>See notes</button>
            </div>
        </div>
    )
}

export default Student;