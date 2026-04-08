import React from 'react';
import './Sidebar.css';
import { useContext,useEffect } from 'react';
import {v1 as uuidv} from "uuid";

import { MyContext } from './MyContext.jsx';
function Sidebar() {
  const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChats}=useContext(MyContext);  
   const getAllThreads=async()=>{
     try{
      const response =await fetch("http://localhost:3000/api/threads")
      const data=await response.json();
      const filteredData=data.map(thread=>({
        threadId:thread.threadId,
        title:thread.title,
        
      }))

      //console.log(filteredData);
      setAllThreads(filteredData)
     }
     catch(err){
      console.log(err);
     }
   }
   useEffect(()=>{
    getAllThreads()
   },[currThreadId])

   const createNewChat=()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv());
    setPrevChats([])
   }

   const changeThread=async(newThreadId)=>{
    setCurrThreadId(newThreadId);
    try{
      const response =await fetch(`http://localhost:3000/api/threads/${newThreadId}`)
      const data=await response.json();
      console.log(data)
      setPrevChats(data);
      setNewChat(false);
      setReply(null)
    }catch(err){
      console.log(err);
    }
   }

   const deleteThread=async(threadId)=>{
     try{
      const response=await fetch(`http://localhost:3000/api/threads/${threadId}`,{method:"DELETE"})
      const res=await response.json();
      console.log(res)
      setAllThreads(prev => prev.filter(thread => thread.threadId !=threadId))
      if(threadId===currThreadId){
        createNewChat()
      }
     }catch(err){
      console.log(err)
     }
   }
  return (
    
   <section className="sidebar">
     <button onClick={createNewChat}>
      <img className="logo" src="src/assets/blacklogo.png" alt="gpt logo" />
      <span><i className="fa-solid fa-pen-to-square"></i></span>
     </button>
     <ul className='history'>
      {
        allThreads?.map((thread,idx)=>(
          <li key={idx}
          onClick={(e)=> changeThread(thread.threadId)}
          className={currThreadId===thread.threadId?'highlighted':''}>{thread.title}
          <i className="fa-solid fa-trash"
          onClick={(e)=>{
            e.stopPropagation();
            deleteThread(thread.threadId)
          }}>
            </i></li>
        ))
      }
     </ul>
     <div className='sign'>
      <p>By Priya &hearts;</p>
      </div>
     
   </section>
   
  );
}

export default Sidebar;