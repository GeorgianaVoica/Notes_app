import { MdSearch } from "react-icons/md";

function Search(props){
    const {onSearchNote, onSearchTag} = props;
    const tags = [{
        label: "CURS",
        value: "CURS"
    }, {
        label: "SEMINAR",
        value: "SEMINAR"  
    }];

    return (
        <div className="filter">
            <div className="search">
                <MdSearch className="search-icons" size="1.3em"/>
                <input type="text" placeholder="Type to search..."
                onChange={(evt) => onSearchNote(evt.target.value)}/>
            </div>
            <select className="tag-filter" onChange={(evt) => onSearchTag(evt.target.value)}>
            {
                tags.map(t => <option key={t.value} value={t.value}>{t.label}</option>)
            }
            </select>
        </div>
    )
}

export default Search;