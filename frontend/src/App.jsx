import { useState } from 'react';
import './App.css'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import {MyContext} from './MyContext.jsx'
import {v1 as uuidv} from "uuid";

function App() {
  const [prompt,setPrompt]=useState('');
  const [reply,setReply]=useState(null);
  const [currThreadId,setCurrThreadId]=useState(uuidv());
  const [prevChats,setPrevChats]=useState([]); // stores all chats of curr thread
  const [newChat,setNewChat]=useState(true);
  const [allThreads,setAllThreads]=useState([]);
  const providerValues={
    prompt, setPrompt,
    reply, setReply,
    currThreadId,setCurrThreadId,
    prevChats,setPrevChats,
    newChat,setNewChat,
    allThreads,setAllThreads
  };
  

  return (

    <div className='app'>
      <MyContext.Provider value={providerValues}>
      <Sidebar/>
        <ChatWindow/>
        </MyContext.Provider>
        </div>
  )
}

export default App
