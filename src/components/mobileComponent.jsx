import React from "react";
import './../style/css/main.css'

const MobileComponent = ({ children }) => {
    return (
        <div className="container">{children}</div>
    )
}
export default MobileComponent