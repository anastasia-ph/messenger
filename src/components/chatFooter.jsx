import React from "react";
import './../style/css/main.css'

const ChatFooter = ({ children }, props) => {
    return (
        <div className="chatwindow-footer" {...props}>{children}</div>
    )
}

export default ChatFooter