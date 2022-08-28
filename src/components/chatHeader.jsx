import React from "react";
import UserPictureBlock from "./userPictureBlock";
import UserName from "./userName";
import './../style/css/main.css'


const ChatHeader = (props) => {

    return (
        <div className="chatwindow-header">
            <div className="back-icon__container" onClick={props.onClick}>
                <img className="back-icon__icon" src="../assets/back.png" alt="back"></img>
            </div>
            <UserPictureBlock {...props}></UserPictureBlock>
            <UserName {...props} ></UserName>
        </div>
    )
}

export default ChatHeader