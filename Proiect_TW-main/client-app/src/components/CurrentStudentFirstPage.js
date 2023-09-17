import { useState } from "react";
import NotesList from "./NotesList";
import Search from "./Search";
import { useParams } from "react-router-dom";

function CurrentStudentFirstPage(){
    const [searchText, setSearchText] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const {id} = useParams();
    return (
        <div>
            <Search onSearchNote={setSearchText} onSearchTag={setSearchTag}/>
            <NotesList studentId={id} searchedText={searchText} searchedTag={searchTag}/>
        </div>
    )
}

export default CurrentStudentFirstPage;