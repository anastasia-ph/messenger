import React, { Children } from "react";
import './../style/css/main.css'

const ChatBody = ({ children }) => {

    return (
        <div id="chat-body" className="chatwindow-body">{children}</div>
    )
}

export default ChatBody