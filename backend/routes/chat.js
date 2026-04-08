import Thread from '../models/Thread.js';
 import express from 'express';
 import getOpenAIAPIResponse from '../utils/openai.js';

const router=express.Router();

//tester route
// router.post('/chat',async(req,res)=>{
//     try{
//     const thread=new Thread({
//        threadId:"xyz",
//         title:"testing new thread"
//     });
//     const response=await thread.save();
//     res.send(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({message:"Error creating thread"});
//     }

// });
router.get('/threads',async(req,res)=>{
    try{
        const threads=await Thread.find({}).sort({updatedAt:-1});
        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching threads"});
    }
});
router.get('/threads/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const thread = await Thread.findOne({ threadId: id });

        if (!thread) {
            return res.status(404).json({ message: "Thread not found" });
        }

        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching chats" });
    }
});
router.delete('/threads/:threadId',async(req,res)=>{
    const {threadId}=req.params;

    try{
        const deleteThread=await Thread.findOneAndDelete({threadId});
        if(!deleteThread)
          res.status(404).json({error:"Thread not found"});
        res.status(200).json({success:"Thread deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Error deleting thread"});
    }
});
router.post('/chat',async(req,res)=>{
    let {threadId,message}=req.body;
    if(!threadId || !message)
      return res.status(400).json({message:"Thread ID and message are required"});
    try{
        let thread=await Thread.findOne({threadId});
        if(!thread){
          thread=new Thread({
        threadId,
        title : message,
        messages:[{role:"user",content:message}]
        });
       }
        else{
          thread.messages.push({role:"user",content:message});
        }
        const assistantResponse=await getOpenAIAPIResponse(message);
        thread.messages.push({role:"assistant",content:assistantResponse});
        thread.updatedAt=new Date();
        await thread.save();
        res.json({reply:assistantResponse});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error sending message",error:err.message});
    }
});
export default router;
