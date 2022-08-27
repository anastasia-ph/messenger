import React from "react";
import './../style/css/main.css'
const UserName = (props) => {
    const innerprops = props.props
    return (
        <div className="user-names">{innerprops.username}</div>
    )
}
export default UserName