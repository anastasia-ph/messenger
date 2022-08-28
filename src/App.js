import DesktopComponent from "./components/desktopComponent";
import MobileComponent from "./components/mobileComponent";
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
import React, { useState } from 'react'
import MessageField from "./components/messageField";
import MessageIncome from "./components/messageIncome";
import MessageOutcome from "./components/messageOutcome";
import NotificationMessage from "./components/notificationMessage";
import { Helmet } from "react-helmet";


function App() {
  
  const[isDesktop, setIsDesktop] = useState(window.innerWidth>720)
  const numberOfChats = [];
  let receivedData = [];
  Object.values(chat).map((e,i)=>(localStorage.getItem(i) ? null: localStorage.setItem(i, JSON.stringify(e)), numberOfChats.push(i))); // check if localstor items for each chat are created, if not create through mapping
  Object.values(data).map((e)=>receivedData.push(e));
  receivedData.map((e)=>localStorage.getItem(`user${e["key"]}`)? null : localStorage.setItem(`user${e["key"]}`, JSON.stringify(e)));
  if(!localStorage.getItem("users")){localStorage.setItem("users", JSON.stringify(receivedData))};
  receivedData = JSON.parse(localStorage.getItem("users"));

const dateWithFullMonthName = []

  const lastMessages = [];
  const findLastMessages = () =>{
    const months = ['Jan', 'Feb', "Mar", "Apr", 'May', "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    for(let i=0; i<numberOfChats.length; i++){
      if(JSON.parse(localStorage.getItem(i)).length!==0){
      let ind = JSON.parse(localStorage.getItem(i)).length-1;
      let parsed = JSON.parse(localStorage.getItem(i));
      let text = Object.values(parsed[ind])[0][0];
      let date=new Date(Object.values(parsed[ind])[0][1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/") ;
      let tempMessage = [];
      tempMessage.push(text);
      tempMessage.push(date)  ;
      lastMessages.push(tempMessage);

      let dateWithMonth = new Date(Object.values(parsed[ind])[0][1]);
      let month = months[dateWithMonth.getMonth()]
      let fullDate = `${month} ${dateWithMonth.getUTCDate()}, ${dateWithMonth.getUTCFullYear()}`
      dateWithFullMonthName.push(fullDate)
    }
    else{
      lastMessages.push([]);
      dateWithFullMonthName.push([])
    }  
    }
  }
  findLastMessages();
  localStorage.getItem("currentChat") ? localStorage.getItem("currentChat") : localStorage.setItem("currentChat", 0);
  let messages = JSON.parse(localStorage.getItem(localStorage.getItem("currentChat")));


  const [chatId, setChatId] = useState(0);

  const [notification, setNotification] = useState(false);
  localStorage.getItem("isChat")!==null ? localStorage.getItem("isChat") : localStorage.setItem("isChat", false)
  const [isChat, setIsChat] = useState(JSON.parse(localStorage.getItem("isChat")))

  const [currentMessages, setCurrentMessages]=useState(messages);
  const [currentChat, setCurrentChat]=useState(localStorage.getItem("currentChat"));
  const [usersFiltered, setUsersFiltered] = useState(JSON.parse(localStorage.getItem("users")));
 

  const sortAfterReply = () =>{
    receivedData = JSON.parse(localStorage.getItem('users'))
    const newFirst = JSON.parse(localStorage.getItem(`user${currentChat}`))

    let key = ' '
    for(let i=0; i<receivedData.length; i++){
      if(receivedData[i]["key"]===newFirst["key"]){
        key = i
      }
    }
    if (receivedData[0]["key"] !== newFirst["key"]){
      receivedData.splice(key,1)
    receivedData.unshift(newFirst)

    receivedData.map((e)=>localStorage.setItem(`user${e["key"]}`, JSON.stringify(e)))
    localStorage.setItem("users", JSON.stringify(receivedData))
    setUsersFiltered(receivedData)

    }
  
  }
  const selectChatWindow = (e) =>{
    setCurrentChat(e.currentTarget.id);
    setCurrentMessages(JSON.parse(localStorage.getItem(e.currentTarget.id)));
    setUsersFiltered(JSON.parse(localStorage.getItem("users")));
    document.getElementById("search-field").value='';
    localStorage.setItem("currentChat", e.currentTarget.id);
    setIsChat(true)
    localStorage.setItem("isChat",true)
  }

  const filterUsers = (e)=>{
    let input = e.target.value;
    let receivedDataFiltered = receivedData
    if (input===' '){
      setUsersFiltered(receivedDataFiltered)
    }
    else{
     receivedDataFiltered = receivedDataFiltered.filter(e =>e["username"].toLowerCase().includes(input.toLowerCase()));
    }
    setUsersFiltered(receivedDataFiltered);

  }

  const sendMessage = () =>{
    let message = document.getElementById("message-field").value;
    let dialog = JSON.parse(localStorage.getItem(currentChat));
    let date = new Date();
    dialog.push({"you":[message, date]});
    localStorage.setItem(currentChat, JSON.stringify(dialog));
    setCurrentMessages(JSON.parse(localStorage.getItem(currentChat)));
    setChatId(localStorage.getItem("currentChat"));
    document.getElementById("message-field").value = ' ';
    sortAfterReply();
    scrollChat();
    setTimeout(()=>sendReply(), 12000);
  
   
  }
  

  async function  sendReply () {
    const url = `https://api.chucknorris.io/jokes/random`;
    let response = await fetch(url);
    let json = await response.json();
    let message = json.value;
    let dialog = JSON.parse(localStorage.getItem(currentChat));
   
    let date = new Date();
    dialog.push({"them":[message, date]});
    localStorage.setItem(currentChat, JSON.stringify(dialog));
    
    setCurrentMessages(JSON.parse(localStorage.getItem(currentChat)));
    setTimeout(()=>scrollChat(), 1);
    setTimeout(()=>setNotification(true), 1);
    
    setTimeout(()=>setNotification(false), 15000)

  }
  
  const scrollChat = () =>{
    document.getElementById("chat-body").scrollTop = document.getElementById("chat-body").scrollHeight;
  }
  const trimText = (e) =>{
    let result = e;
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



  let desktopComponent = (<DesktopComponent>

    <DialogsBlock>
    <DialogsHeader props={userdata[0]} prop={filterUsers} />
     <div className="chat-header">Chats</div>
     {usersFiltered.map((e, i)=><DialogItem  key = {i} props={e} text={trimText(lastMessages[e.key][0]) } date={dateWithFullMonthName[e.key]} onClick={selectChatWindow}/>)}
     </DialogsBlock>
   <ChatBlock>
     <ChatHeader props={data[localStorage.getItem("currentChat")]}></ChatHeader>
  <ChatBody>
   
  {Object.keys(currentMessages).map((key, i)=>Object.keys(currentMessages[key])[0].includes("them") ? <MessageIncome key={i} props={data[localStorage.getItem("currentChat")]} message={Object.values(currentMessages[key])[0][0]} date={new Date(Object.values(currentMessages[key])[0][1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/")}></MessageIncome>: <MessageOutcome key={i} message={Object.values(currentMessages[key])[0][0]} date={new Date(Object.values(currentMessages[key])[0][1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/")}></MessageOutcome>)}
    </ChatBody>
   <ChatFooter >
    <MessageField onClick={sendMessage}>
                 
    </MessageField>
 </ChatFooter>
 {notification? <NotificationMessage  props={data[chatId]} text={data[chatId].username} mobileClass="user-picture__mobile-notification" animation="entering" message={trimText(lastMessages[chatId][0])} onClick={closeNotification}/> : null}
     </ChatBlock>
   </DesktopComponent>)
   let mobileComponent = (<MobileComponent>
       <Helmet><meta name="viewport" content="initial-scale=0.66, user-scalable=no"></meta></Helmet>

     {isChat? (<ChatBlock>
           <ChatHeader props={data[localStorage.getItem("currentChat")]} onClick={() =>(setIsChat(false), localStorage.setItem("isChat",false))}></ChatHeader>
           <ChatBody onLoad={scrollChat}>
 
    {Object.keys(currentMessages).map((key, i)=>Object.keys(currentMessages[key])[0].includes("them") ? <MessageIncome  key={i} props={data[localStorage.getItem("currentChat")]}  message={Object.values(currentMessages[key])[0][0]} date={new Date(Object.values(currentMessages[key])[0][1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/")}></MessageIncome>: <MessageOutcome key={i} message={Object.values(currentMessages[key])[0][0]} date={new Date(Object.values(currentMessages[key])[0][1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll(".","/")}></MessageOutcome>)}
           </ChatBody>
           <ChatFooter >
             <MessageField onClick={sendMessage}>
               
             </MessageField>
           </ChatFooter>
           
           {notification ? <NotificationMessage  props={data[chatId]} text={data[chatId].username} mobileClass="user-picture__mobile-notification"  message={trimText(lastMessages[chatId][0])} onClick={closeNotification}/> : null}
         </ChatBlock>):(<DialogsBlock>
         <DialogsHeader props={userdata[0]} prop={filterUsers} />
           <div className="chat-header">Chats</div>
           {usersFiltered.map((e, i)=><DialogItem  props={e} text={trimText(lastMessages[e.key][0]) } date={lastMessages[e.key][1]} onClick={selectChatWindow}/>)}
           </DialogsBlock>)}
     
         
   </MobileComponent>)

window.addEventListener("load", function(){
  scrollChat()
})
window.addEventListener("resize", function(){
  setIsDesktop(window.innerWidth>720)
  scrollChat()
})
  return (
   <div className="App">
           <Helmet><meta name="viewport" content="initial-scale=0.66, user-scalable=no"/>
           <title>Messenger</title></Helmet>
           {isDesktop ? desktopComponent : mobileComponent}

   </div>

  

  
  );
}

export default App;
