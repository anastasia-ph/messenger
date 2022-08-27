import Container from "./components/container";
import DialogsBlock from "./components/dialogsBlock";
import DialogsHeader from "./components/dialogsHeader";
import ChatBlock from "./components/chatBlock";
import ChatHeader from "./components/chatHeader";
import ChatFooter from "./components/chatFooter";
import ChatBody from "./components/chatBody"
import DialogItem from "./components/dialogItem"
import './style/css/main.css'
import data from "./../src/components/data.json"
import chat from "./chat"
import userdata from "./../src/components/userdata.json"
import placeholderMessages from "./../src/components/placeholderMessages.json"
import React, { useState } from 'react'
import MessageField from "./components/messageField";
import MessageIncome from "./components/messageIncome";
import MessageOutcome from "./components/messageOutcome";
import NotificationMessage from "./components/notificationMessage";

const numberOfChats = []
Object.values(chat).map((e,i)=>(localStorage.getItem(i) ? null: localStorage.setItem(i, JSON.stringify(e)), numberOfChats.push(i))) // check if localstor items for each chat are created, if not create through mapping
function App() {
 

  // date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/")

const lastMessages = []
const findLastMessages = () =>{
  for(let i=0; i<numberOfChats.length; i++){
    if(JSON.parse(localStorage.getItem(i)).length!=0){
    let ind = JSON.parse(localStorage.getItem(i)).length-1
    let parsed = JSON.parse(localStorage.getItem(i))
    let text = Object.values(parsed[ind])[0][0]
    let date=new Date(Object.values(parsed[ind])[0][1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/") 
    let tempMessage = []
    tempMessage.push(text)
    tempMessage.push(date)  
    lastMessages.push(tempMessage)
  }
  else{
    lastMessages.push([])
  }  
  }
  console.log(lastMessages)
}
findLastMessages()
  let data1 = data
localStorage.getItem("currentChat") ? localStorage.getItem("currentChat") : localStorage.setItem("currentChat", 0)
 let messages = JSON.parse(localStorage.getItem(localStorage.getItem("currentChat")))
//сделать сообщения чтоб высвечивались актуальные done
//изменение положения после отправки
//api done
//уведомление
//адаптив

  const [displayedMessage, setDisplayedMessage] = useState(lastMessages)
  const [notification, setNotification] = useState(false)
  const [currentMessages, setCurrentMessages]=useState(messages)
  const [currentChat, setCurrentChat]=useState(localStorage.getItem("currentChat"))
  const [usersFiltered, setUsersFiltered] = useState(data)

  const selectChatWindow = (e) =>{
    setCurrentChat(e.currentTarget.id)
    setCurrentMessages(JSON.parse(localStorage.getItem(e.currentTarget.id)))
    localStorage.setItem("currentChat", e.currentTarget.id)
  }

  const filterUsers = (e)=>{
    let input = e.target.value
    data1 = data.filter(e =>e["username"].toLowerCase().includes(input.toLowerCase()))
    setUsersFiltered(data1)
  }

  const sendMessage = () =>{
    let message = document.getElementById("message-field").value
    let dialog = JSON.parse(localStorage.getItem(currentChat))
    let date = new Date()
    dialog.push({"you":[message, date]})
    localStorage.setItem(currentChat, JSON.stringify(dialog))
    setCurrentMessages(JSON.parse(localStorage.getItem(currentChat)))
    document.getElementById("message-field").value = ' '
    scrollChat()
   setTimeout(()=>sendReply(), 15000)
   
  }

  async function  sendReply () {
    const url = `https://api.chucknorris.io/jokes/random`
    let response = await fetch(url);
    let json = await response.json();
    let message = json.value
    let dialog = JSON.parse(localStorage.getItem(currentChat))
    let date = new Date()
    dialog.push({"them":[message, date]})
    localStorage.setItem(currentChat, JSON.stringify(dialog))
    setCurrentMessages(JSON.parse(localStorage.getItem(currentChat)))
    setTimeout(()=>(scrollChat(), 1))
    setTimeout(()=>setNotification(true), 1)
    setTimeout(()=>setNotification(false), 15000)
  }
  
  const scrollChat = () =>{
    document.getElementById("chat-body").scrollTop = document.getElementById("chat-body").scrollHeight
  }
  const trimText = (e) =>{
    let result = e
    if (e!==undefined){
      if(e.length >58){
        result = `${e.slice(0,48).trim()}...`}
        else{ result =e}
      }
    return result
  }
  const closeNotification = () =>{
    setNotification(false)
  }


  return (

  <Container>
        <DialogsBlock>
        <DialogsHeader props={userdata[0]} prop={filterUsers} />
          <div className="chat-header">Chats</div>
          {usersFiltered.map((e, i)=><DialogItem  props={e} text={trimText(lastMessages[e.key][0]) } date={lastMessages[e.key][1]} onClick={selectChatWindow}/>)}
          </DialogsBlock>
        <ChatBlock>
          <ChatHeader props={data1[localStorage.getItem("currentChat")]}></ChatHeader>
          <ChatBody>

   {Object.keys(currentMessages).map((key, i)=>Object.keys(currentMessages[key])[0].includes("them") ? <MessageIncome props={data1[localStorage.getItem("currentChat")]} message={Object.values(currentMessages[key])[0][0]} date={new Date(Object.values(currentMessages[key])[0][1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/")}></MessageIncome>: <MessageOutcome message={Object.values(currentMessages[key])[0][0]} date={new Date(Object.values(currentMessages[key])[0][1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/")}></MessageOutcome>)}
          </ChatBody>
          <ChatFooter >
            <MessageField onClick={sendMessage}>
              
            </MessageField>
          </ChatFooter>
          {notification? <NotificationMessage  props={data1[localStorage.getItem("currentChat")]} text={data1[localStorage.getItem("currentChat")].username} message={trimText(lastMessages[localStorage.getItem("currentChat")][0])} onClick={closeNotification} ></NotificationMessage> : null}
        </ChatBlock>
      </Container>
  );
}

export default App;
