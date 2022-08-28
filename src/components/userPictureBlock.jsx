import React from 'react'
import './../style/css/main.css'
import UserPicture from './userPicture'
import UserOnlineIcon from './userOnlineIcon'
const UserPictureBlock = (props) => {
    return (
        <div className={`user-picture-block ${props.mobileClass}`}>
            <UserPicture  {...props}></UserPicture>
            <UserOnlineIcon></UserOnlineIcon>
        </div>
    )
}
export default UserPictureBlock
