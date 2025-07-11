import { useCallback, useEffect, useRef, useState } from "react";
import { AddChat } from "./AddChat.tsx";
import { Link,useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { CreateNewChat } from "./CreateNewChat.tsx";
import axios from "axios";
import React from "react";
import {  propsMessage } from "./Messegse.tsx";

import { MessageAria } from "./MessageAria.tsx";
const socket: Socket = io("http://localhost:5000");
export const Chat = React.memo(() => {
  const { id, chatRoom } = useParams<{ id: string, chatRoom?:string }>();
  const isMounted = useRef(true);

  const [buttonAddChat, setButtonAddChat] = useState(false);
  const [buttonNewChat, setButtonNewChat] = useState(false);
  const [chatsArray, setChatsArray] = useState<{chatname:string, img:string|undefined}[]>([]);
  const [currentInput, setCurrentInput]=useState("")
  const [message, setMessage]=useState<{username: string,content:string, belong:boolean, date:Date}[]>([])
  console.log(chatRoom)
  const changeButtonAddChatStatus = (statusFromAddChat: boolean) => {
    setButtonAddChat(statusFromAddChat);
  };
  const changeButtonNewChatStatus = (statusFromNewChat: boolean) => {
    setButtonNewChat(statusFromNewChat);
  };

  const handelNewChatClick = () => {
    setButtonNewChat(!buttonNewChat);
  };
  const handelAddChatClick = () => {
    setButtonAddChat(!buttonAddChat);
  };

  const handelChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setCurrentInput(e.target.value)
  }
  const handelSubmit=(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
 
      socket.emit("sendMessage", {content: currentInput.trim(), id, chatRoom})
    setCurrentInput("")
  }

  const submitCodeValue = useCallback((newCode: string, newIMG:string|undefined) => {
 
      if(chatsArray.find(obj=>obj.chatname==newCode
      )){
        alert("Chat is alredy added");
    
      }
      else{  
        newIMG?  setChatsArray([...chatsArray, {chatname:newCode, img:newIMG}]):setChatsArray([...chatsArray, {chatname:newCode, img: "https://play-lh.googleusercontent.com/h16uGQW5UR0HLhaCjw_JZnit76Y_xaN8OVsEZNeUnjmUmHGqCCICpbnC8npDmtONyYs"}])

        }


  }, []);

  const addExistingChat = async (newCode: string) => {
    try {
      alert("addExistingChat");
      const response = await axios.patch(
        `http://localhost:5000/chat/${id}/chatRoom/${newCode}`
      );
      submitCodeValue(response.data.name, response.data.img);
    } catch (err) {
      console.error(err);
    }
  };

  const takeChatBD = useCallback(async () => {
    try {
   
      const response = await axios.get(
        `http://localhost:5000/chat/${id}/chatRoom`
      );
      const newChats= response.data.map(objChat=>({chatname: objChat.name, img:objChat.img}))
      setChatsArray(newChats)
   

    } catch (err) {
      console.error(err);
    }
  }, [id]);
const takeChatMessagesBD= useCallback(async()=>{
     
  try{
  if(chatRoom!=="un"){
    const response= await axios.get( `http://localhost:5000/chat/${id}/${chatRoom}/takeChatMessagesBD`)
   const loadedMessages= response.data.map(objMessage=>({username:objMessage.username, content:objMessage.content, belong:objMessage.idUser===id, date:objMessage.date}))
   setMessage(loadedMessages)
  }
  }
  catch(err){
    console.error(err)
  }
}, [id, chatRoom])
  useEffect(() => {
    if(isMounted.current){ takeChatBD();}
   return ()=>{isMounted.current=false}
  }, [id, submitCodeValue]);

  useEffect(() => {
    if (chatRoom) {
        takeChatMessagesBD();
      socket.emit("join", {username: "user",chatRoom});
      socket.on('message', ({data})=>{
 
        const belongBoolean =data.idUser===id?true:false
        
         const newObg:propsMessage={username: data.username,content:data.content, belong:belongBoolean, date:data.date}
         setMessage(prev=>[...prev, newObg])
      
        console.log("Message: ", newObg)
        
      })
    }
    return ()=>{
      if(chatRoom){
        socket.emit('leave', {chatRoom})
        socket.off("message")
      }
    }
  }, [chatRoom, id]);

  return (
    <div className="flex flex-col h-screen">
      <header className="h-[60px] flex items-center justify-between px-4 bg-white border-b border-gray-200">
       <Link to="/">
        <button className="tracking-wide font-semibold bg-[#89bdf8] text-white w-[60px] h-[40px] rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
          <span>Exit</span>
        </button>
</Link>
        <h2 className="text-2xl xl:text-xl font-bold flex-1 text-center text-[#150082]">
          ChatRoom
        </h2>
<div className="flex gap-4">
        <button
          type="button"
          onClick={handelNewChatClick}
          className="tracking-wide font-semibold bg-[#150082] text-gray-100 w-[100px] h-[40px] rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <span>New chat</span>
        </button>

        <button
          type="button"
          onClick={handelAddChatClick}
          className="tracking-wide font-semibold bg-[#150082] text-gray-100 w-[100px] h-[40px] rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <span>Add chat</span>
        </button></div>
      </header>
      {buttonAddChat ? (
        <AddChat
          submitCodeValue={addExistingChat}
          changeButtonAddChatStatus={changeButtonAddChatStatus}
        ></AddChat>
      ) : (
        <></>
      )}
      {buttonNewChat ? (
        <CreateNewChat
          changeButtonNewChatStatus={changeButtonNewChatStatus}
          submitCodeValue={submitCodeValue}
        ></CreateNewChat>
      ) : (
        <></>
      )}
      <div className="flex flex-1 overflow-hidden">
     <article className="w-1/4 h-full flex flex-col items-center justify-start bg-white border-r border-gray-200 p-4 space-y-4">
 <h2 className="text-lg font-bold text-[#150082]  mb-2">Чаты</h2>
 <ul className="w-full space-y-2">
            {chatsArray.map((objChat) => (
              <Link key={objChat.chatname} to={`/chat/${id}/${objChat.chatname}`} className="block">
                <li onClick={takeChatMessagesBD}  className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#edfdff] hover:text-[#150082] transition-colors cursor-pointer text-sm font-semibold gap-3"
    >
      <div className="relative flex-shrink-0 w-10 h-10">
     
        <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#150082]/20">
          <img 
            src={objChat.img?`http://localhost:5000/${objChat.img}`:"https://play-lh.googleusercontent.com/h16uGQW5UR0HLhaCjw_JZnit76Y_xaN8OVsEZNeUnjmUmHGqCCICpbnC8npDmtONyYs" }
            alt="Chat avatar" 
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center center' 
            }}
          />
        </div>
      </div>
      <span className="truncate">{objChat.chatname}</span>
    </li></Link>
            ))}
          </ul>
        </article>

        <main className="flex-1 flex flex-col items-center p-12 xl:p-16 bg-[#edfdff]">
            {chatRoom!=="un"?<><MessageAria message={message}></MessageAria>
       <div className="w-3/4 flex items-center justify-center gap-4  p-4">
              <input
              type="text"
              value={currentInput}
              className="flex-1 px-4 py-3 rounded-lg font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              placeholder="Type your message..."
              onChange={handelChange}
            />
            <button
            type="button"
              className="flex-shrink-0 tracking-wide font-semibold bg-[#150082] text-gray-100 w-[40px] h-[40px] rounded-full hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              aria-label="Send message"
              onClick={handelSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div></>:<div className="flex items-center justify-center h-full">
  <p className="text-[#150082] font-medium  ">
    Select an existing chat or create a new one to start
  </p>
</div>}
        </main>
      </div>
    </div>
  );
});
