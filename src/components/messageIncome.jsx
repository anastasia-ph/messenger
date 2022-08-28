import './../style/css/main.css'
import React from 'react'
import UserPicture from "./userPicture"
const MessageIncome = (props) => {


    return (
        <div className='message-income__container'>
            <UserPicture {...props} ></UserPicture>
            <div className='message-income__text-container'>
                <div className='message-income__message-text response-message select' >{props.message}
                </div>
                <div className='message-income__data data-text'>{props.date}</div>
            </div>
        </div>
    )
}
export default MessageIncome