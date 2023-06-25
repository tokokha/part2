const Search = (props) => {
    return (
        <div>
            Search by name: <input value={props.value} onChange={props.onChange}/>
        </div>
    )
}

export default Search