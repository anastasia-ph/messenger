import React from "react";
import './../style/css/main.css'

const Container = ({ children }) => {
    return (
        <div className="container">{children}</div>
    )
}
export default Container