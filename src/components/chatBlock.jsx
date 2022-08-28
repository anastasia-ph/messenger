import React from "react";
import './../style/css/main.css'

const ChatBlock = ({ children }) => {
    return (
        <div className="chat-block noselect">{children}</div>
    )
}
export default ChatBlock;