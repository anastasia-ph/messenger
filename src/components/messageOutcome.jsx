import './../style/css/main.css'
import React from 'react'
const MessageOutcome = (props) => {
    return (
        <div className='message-outcome__container '>

            <div className='message-outcome__message-text user-message select'>
                {props.message}
            </div>
            <div className='message-outcome__data data-text'>{props.date}</div>
        </div>
    )
}
export default MessageOutcome