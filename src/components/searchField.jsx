import './../style/css/main.css'
import React from 'react'

const SearchField = (props) => {
    return (
        <div className='search-field__container'>
            <input onChange={props.prop} className="search-field__search-bar" type="text" placeholder="Search or start new chat" />
            <div className='search-field__icon-container'>
                <img className='search-field__icon' src="./assets/search.png" alt="search" />
            </div>
        </div>
    )
}
export default SearchField