import React from "react";
import './../style/css/main.css'

const ChatBody = ({ children }, { onLoad }) => {

    return (
        <div id="chat-body" onLoadStart={onLoad} className="chatwindow-body">{children}</div>
    )
}

export default ChatBody