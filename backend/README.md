# NodeGPT Backend

This backend application integrates OpenAI's GPT API with a MongoDB database to manage chat conversations and threads.

## Project Structure

```
backend/
├── package.json
├── server.js
├── models/
│   └── Thread.js
├── routes/
└── utils/
    └── openai.js
```

## Core Files

### openai.js
**Location:** `utils/openai.js`

This file contains the OpenAI API integration utility. It exports an async function that sends user messages to OpenAI's Chat Completion API and retrieves responses.

**Features:**
- Sends POST requests to OpenAI's GPT API endpoint
- Uses environment variable `OPENAI_API_KEY` for authentication
- Currently configured for `gpt-5-nano` model
- Returns the assistant's message content from the API response
- Includes error handling with console logging

**Function Signature:**
```javascript
getOpenAIAPIResponse(message: string): Promise<string>
```

**Example Usage:**
```javascript
import getOpenAIAPIResponse from './utils/openai.js';
const response = await getOpenAIAPIResponse('Hello, how are you?');
```

**Requirements:**
- `dotenv` package for environment variable management
- Valid `OPENAI_API_KEY` in `.env` file

---

### Thread.js
**Location:** `models/Thread.js`

This file defines the MongoDB schema for managing chat threads and their messages using Mongoose.

**Schemas:**

#### MessageSchema
Represents individual messages within a thread:
- `role` (String, required): Either `"user"` or `"assistant"`
- `content` (String, required): The message text
- `timestamp` (Date): Auto-generated timestamp of message creation

#### ThreadSchema
Represents a conversation thread:
- `threadId` (String, required, unique): Unique identifier for the thread
- `title` (String): Title of the chat thread (default: `"New Chat"`)
- `messages` (Array): Array of MessageSchema objects representing the conversation history
- `createdAt` (Date): Auto-generated thread creation timestamp
- `updatedAt` (Date): Auto-generated last update timestamp

**Model Export:**
```javascript
Thread (Mongoose Model)
```

---

## Integration

These two files work together to:

1. **Thread.js** - Stores chat conversations and message history in MongoDB
2. **openai.js** - Fetches AI responses from OpenAI's API

## Environment Setup

Create a `.env` file in the backend folder with:
```
OPENAI_API_KEY=your_api_key_here
MONGODB_URI=your_mongodb_connection_string
```

## Dependencies

- `mongoose` - MongoDB object modeling
- `dotenv` - Environment variable management
- `openai` or `fetch` API - For making HTTP requests to OpenAI
- `express` (assumed) - For routing

