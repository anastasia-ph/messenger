import './../style/css/main.css'
//попробовать записывать данные для сообщений в сторедж а потом по этому массиву создавать элеменьы
import React from 'react'
const MessageOutcome = (props) => {
    return (
        <div className='message-outcome__container'>

            <div className='message-outcome__message-text user-message'>
                {props.message}
            </div>
            <div className='message-outcome__data data-text'>{props.date}</div>
        </div>
    )
}
export default MessageOutcome