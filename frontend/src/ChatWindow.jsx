import React, { useContext ,useState, useEffect} from 'react';
import './ChatWindow.css';
import Chat from './Chat.jsx';
import { MyContext } from './MyContext.jsx';
import {PuffLoader} from 'react-spinners';
function ChatWindow() {
  const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChats,setNewChat}=useContext(MyContext);
  const [loading,setLoading]=useState(false);
  const [isOpen,setIsOpen]=useState(false)
  const getReply=async()=>{
    setLoading(true)
    setNewChat(false)
    console.log("message",prompt,"threadId",currThreadId);
    const options={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:prompt,
        threadId:currThreadId
      })
    }
    try{
      const response=await fetch('http://localhost:3000/api/chat',options);
      const data=await response.json();
      
      console.log(data)
      setReply(data.reply)
    }
    catch(error){
      console.log(error);
    }
    setLoading(false);
  }
  useEffect(()=>{
    if(prompt && reply){
      setPrevChats(prevChats=>(
        [...prevChats,
          {role:"user",
            content:prompt
          },{
            role:"assistant",
            content:reply
          }]
      ))
    }
    setPrompt("")
  },[reply])
  const handleProfileClick=()=>{
    setIsOpen(!isOpen)
  }
  return (
   <div className='chatWindow'>
    <div className='navbar'>
      <span>SigmaGPT <i className="fa-solid fa-angle-down"></i></span>
      <div className="userIconDiv" onClick={handleProfileClick}>
        <span className='userIcon'><i className="fa-solid fa-user" ></i></span>
      </div>  
    </div>
    {
      isOpen && 
      <div className="dropDown">
        <div className='dropDownItem'><i className="fa-solid fa-gear"></i> Settings </div>
        <div className='dropDownItem'><i className="fa-solid fa-right-from-bracket"></i> Log out </div>
       

      </div>
    }
    <PuffLoader color="#fff" loading={loading}></PuffLoader>
    <Chat></Chat>
    <div className="chatInput">
      <div className="inputBox">
        <input  placeholder='Ask anything' value={prompt} onChange={(e)=>setPrompt(e.target.value)} onKeyDown={(e)=> e.key=='Enter'?getReply():null}/>
        <div id="submit" onClick={getReply}><i className="fa-regular fa-paper-plane" ></i></div>
      </div>
      <p className='info'>
        Nodegpt can make mistakes. Check important info. See Cookie Preferences.
      </p>
    </div>
    
    </div>
  );
}

export default ChatWindow;