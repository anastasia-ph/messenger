import React, { Children } from "react";
import UserPictureBlock from "./userPictureBlock";
import UserName from "./userName";
import './../style/css/main.css'


const ChatHeader = (props) => {

    return (
        <div className="chatwindow-header">
            <UserPictureBlock {...props}></UserPictureBlock>
            <UserName {...props}></UserName>
        </div>
    )
}

export default ChatHeader