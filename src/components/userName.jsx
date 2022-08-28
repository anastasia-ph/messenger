import React from "react";
import './../style/css/main.css'
const UserName = (props) => {
    const innerprops = props.props
    return (
        <div className="user-names select">{innerprops.username}</div>
    )
}
export default UserName