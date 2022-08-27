import './../style/css/main.css'
import React from 'react'
import UserPictureBlock from "./userPictureBlock.jsx";
import SearchField from './searchField';

const DialogsHeader = (props) => {

    return (
        <div className="dialog-item__header">
            <UserPictureBlock  {...props}></UserPictureBlock>
            <SearchField id="search-field" {...props}></SearchField>
        </div>
    )
}
export default DialogsHeader