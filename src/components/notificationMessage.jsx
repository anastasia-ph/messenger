import React from "react";
import UserPicture from "./userPicture";

const NotificationMessage = (props) => {
    return (
        <div className={`notification__container`}>
            <div className="notification-picture__container"><UserPicture {...props}></UserPicture></div>

            <div className="notification-body__container">
                <div className="user-names">{props.text}</div>
                <div className="dialogs-messages" >{props.message}</div>
            </div>
            <div className="notification__close-icon-container" onClick={props.onClick}>
                <img className="notification__close-icon" src="../assets/close.png" alt="close"></img>
            </div>

        </div>
    )
}
export default NotificationMessage