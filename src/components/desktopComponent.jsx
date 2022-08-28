import React from "react";
import './../style/css/main.css'

const DesktopComponent = ({ children }) => {
    return (
        <div className="container">{children}</div>
    )
}
export default DesktopComponent