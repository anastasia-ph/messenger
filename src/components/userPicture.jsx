import React from "react";
import './../style/css/main.css'

const UserPicture = (props) => {
    const innerprops = props.props
    return (
        <div className="user-picture__container" >
            <img className="user-picture__picture" src={innerprops.photo} alt={innerprops.username} ></img >
        </div>
    )
}
export default UserPicture;