import { useEffect, useState,useRef } from "react"
import ChatBar from "./ChatBar"
import ChatBody from "./ChatBody"
import ChatFooter from "./ChatFooter"

export default function ChatPage({socket}){
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(()=>{
    socket.on('messageResponse',(data) => setMessages([...messages,data]));
  },[socket,messages]);

  useEffect(()=>{
    // scroll to bottom everytime messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  },[messages]);

  useEffect(()=>{
    socket.on('typingResponse', (data) => setTypingStatus(data));
  },[socket]);

  return(
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className="chat__main">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus}/>
        <ChatFooter socket={socket}/>
      </div> 
    </div>
  );
}