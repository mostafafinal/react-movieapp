const Search = ({ searchItem, setSearchItem }) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="Search" />

                <input 
                type="text" 
                placeholder="Search through thousands of movies!" 
                value={searchItem} 
                onChange={(event => setSearchItem(event.target.value))} />
            </div>
        </div>
    )
}

export default Search;