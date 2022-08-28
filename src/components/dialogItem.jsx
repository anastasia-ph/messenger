import React from "react";

import UserPictureBlock from "./userPictureBlock.jsx";
import UserName from "./userName.jsx"
import './../style/css/main.css'

const DialogItem = (props) => {


    return (

        <div className="dialogItem__container" onClick={props.onClick} id={props.props.key} >
            <UserPictureBlock  {...props}></UserPictureBlock>
            <div className="dialogItem__userInfo-container">
                <UserName {...props}> </UserName>
                <div className="dialogs-messages">
                    <div className={props.text == undefined ? "dialogs-messages__placeholder" : "dialogs-messages"} > {props.text == undefined ? "No messages yet.." : props.text}</div>
                    <div className="data-text">{props.date}</div>
                </div>
            </div>
        </div >

    )
}

export default DialogItem