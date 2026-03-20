import express from 'express';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app=express()
const PORT=3000
dotenv.config();
import cors from 'cors';
import chatRoutes from './routes/chat.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',chatRoutes);
const MONGO_URI=process.env.MONGODB_URI


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err);
    }
}


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});
const response = await client.responses.create({
  model: 'gpt-5-nano',
  instructions: 'You are a coding assistant that talks like a pirate',
  input: 'Are semicolons optional in JavaScript?',
});

//console.log(response.output_text);
