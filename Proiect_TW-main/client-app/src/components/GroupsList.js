import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import {useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";

const SERVER = 'http://localhost:8080/api';

function GroupsList(props){
    const {trigger, setTrigger} = props;
    const {id} = useParams();
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();
    const [allGroups, setAllGroups] = useState([]);
    
    const getAllGroups = async () => {
        const response = await fetch(`${SERVER}/getGroups`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setAllGroups(data);
    }

    useEffect( () => {
        getAllGroups()
    }, [])

    let grupId ;
    for(let g of allGroups){
        grupId=g.id;
    }
    console.log(grupId++);

    const getMyGroups = async () => {
        const response = await fetch(`${SERVER}/students/${id}/groups`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setGroups(data);
    }

    function replacer(key, value){
        if(typeof value !== "number"){
            return undefined;
        }
        return value;
    }

    const createGroup = async (group) => {
        await fetch(`${SERVER}/addGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        })
        getMyGroups();
    }

    useEffect( () => {
        getMyGroups()
    }, [])

    const addStudentToGroup = async (groupId) => {
        await fetch(`${SERVER}/groups/${groupId}/students/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        getMyGroups();
    }

    return (trigger) ? (
        <div>
            <div className="groups-list-popup">
                <div className="popup-inner">
                    <div className="groups-list-header">
                        <input type='text' placeholder="Create new group" readOnly={true}/>
                        <MdAddCircle className="add-icon" size="1.3em" onClick={() => {createGroup(); addStudentToGroup(grupId++)}}></MdAddCircle>
                    </div>
                    <div className="groups-list-content">
                        <ul className="items-list">
                            { groups.map((item) =>  <li key={item.id} >Group nr. {item.id} </li> )}
                        </ul>
                        <ul className="buttons-list">
                            { groups.map((item) => <li key={item.id}>
                                <button className="see-students-button" onClick={() => navigate(`/students/${id}/groups/${item.id}/students`)}>See students</button>
                                </li>) }
                        </ul>
                    </div>
                    
                    <button className="close-button" onClick={() => setTrigger(false)}>Close</button>
                </div>
            </div>
        </div>
    ) : ""
}

export default GroupsList;