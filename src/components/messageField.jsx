import './../style/css/main.css'
import React from 'react'

const MessageField = (props) => {
    return (
        <div className='message-field__container'>
            <input type="text" placeholder='Type your message' id="message-field" className='message-field__message_bar' />
            <div className='message-field__icon-container'>
                <img src="./assets/send.png" alt="send" onClick={props.onClick} className='message-field__icon' />
            </div>

        </div>
    )
}
export default MessageField