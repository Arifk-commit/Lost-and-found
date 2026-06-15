# 🤖 Chatbot Feature - Quick Setup Guide

## What Was Added?

A fully-functional AI chatbot assistant that helps users find their lost belongings and report found items.

## Files Created/Modified

### New Files Created:

1. **`server/controllers/Chatbot/chatbotController.js`**
   - Chatbot logic and intent detection
   - Message handling functions
   - Item search capabilities

2. **`server/routes/chatbotRoutes.js`**
   - API endpoints for chatbot
   - Routes for `/api/chatbot/message` and `/api/chatbot/suggestions`

3. **`client/src/Components/ChatbotWidget.jsx`**
   - React component for chatbot UI
   - Message display and input
   - Quick action buttons

4. **`CHATBOT_DOCUMENTATION.md`**
   - Comprehensive documentation
   - API reference
   - Customization guide

### Modified Files:

1. **`server/app.js`**
   - Added chatbot routes import
   - Registered `/api/chatbot` endpoint

2. **`client/src/App.jsx`**
   - Imported ChatbotWidget component
   - Added `<ChatbotWidget />` to the app

## Features

### For Users:

- 💬 **Ask questions** about lost items
- 🔍 **Search** for their belongings
- 📝 **Report** lost items
- 🎁 **Report** found items
- 📊 **View statistics** of lost/found items
- 🎯 **Get suggestions** on what to do next

### For Developers:

- ✅ Easy to customize responses
- ✅ Simple intent detection system
- ✅ Modular code structure
- ✅ Well-documented API
- ✅ Extensible architecture

## How to Use

### For End Users:

1. Click the **floating blue button** (bottom-right corner)
2. **Chat with the assistant** using natural language
3. The bot will understand your intent and help accordingly

### Example Conversations:

```
👤: "I lost my laptop"
🤖: "I found 2 matching items! Here's what we have:"
    [Shows found items]
    
👤: "I want to report a found item"
🤖: "That's kind! Let me help. What type of item did you find?"

👤: "Help"
🤖: "Here's what I can help with:
    🔍 Search for Items
    📋 Report Lost Item
    🎁 Report Found Item
    📜 Browse All Items"
```

## Quick Start (Development)

### 1. No additional packages needed!

The chatbot uses existing dependencies:
- `axios` (already in client)
- `express` (already in server)
- `mongoose` (already in server)

### 2. Start the server:
```bash
cd server
npm run dev
```

### 3. Start the client (in another terminal):
```bash
cd client
npm run dev
```

### 4. Open browser and test:
- Navigate to `http://localhost:5173` (or your Vite dev URL)
- Click the chatbot icon in the bottom-right corner
- Start chatting!

## API Endpoints

### Chat with Chatbot
```
POST /api/chatbot/message
Body: { "message": "your message here" }
```

### Get Initial Suggestions
```
GET /api/chatbot/suggestions
```

## Chatbot Intents

The chatbot automatically understands:

| Intent | Keywords | Example |
|--------|----------|---------|
| SEARCH | search, find, look for | "Find my phone" |
| REPORT_LOST | lost, missing, report lost | "I lost my keys" |
| REPORT_FOUND | found, report found | "I found a wallet" |
| BROWSE | browse, show, list | "Show me all items" |
| HELP | help, how, what, assist | "Can you help me?" |
| CATEGORY | category, type, kind | "What categories exist?" |
| CONTACT | contact, email, phone | "How to contact owner?" |

## Customization Examples

### Change Welcome Message

Edit `server/controllers/Chatbot/chatbotController.js`:

```javascript
export const getChatbotSuggestions = async () => {
  // ... existing code ...
  messages: [
    "🎉 Welcome to Lost & Found!",  // Change this
    `We have ${lostCount} lost and ${foundCount} found items.`,
    "How can I assist you?",
  ]
};
```

### Add New Intent

1. Add to `intents` object:
```javascript
const intents = {
  // ... existing intents ...
  MY_NEW_INTENT: ['keyword1', 'keyword2'],
};
```

2. Add handler function:
```javascript
export const handleMyNewIntent = () => {
  return {
    success: true,
    message: "Your response here",
  };
};
```

3. Add case to switch statement:
```javascript
case 'MY_NEW_INTENT':
  response = handleMyNewIntent();
  break;
```

### Change Chatbot Colors

Edit `client/src/Components/ChatbotWidget.jsx`:

```javascript
// Search for className attributes with colors and change:
// Blue theme: from-blue-600, to-blue-700
// To your preferred colors
```

## Testing Scenarios

### Scenario 1: Search for Lost Item
1. Click chatbot icon
2. Type: "I lost my airpods"
3. Chatbot shows matching items (if any)

### Scenario 2: Report Lost Item
1. Type: "I want to report lost item"
2. Follow the guided questions
3. Get redirected to full report form

### Scenario 3: Report Found Item
1. Type: "I found something"
2. Answer guided questions
3. Get redirected to report form

### Scenario 4: Browse Items
1. Type: "Show me all items"
2. View recent lost/found items

## Troubleshooting

### Q: Chatbot not appearing
**A:** Check if `<ChatbotWidget />` is in `App.jsx`

### Q: "Something went wrong" error
**A:** 
- Check if server is running
- Check browser console for errors
- Verify MongoDB connection

### Q: Search returns no results
**A:** 
- Ensure database has items
- Check item descriptions match keywords
- Try different search terms

### Q: Messages not sending
**A:**
- Verify API URL in code matches server URL
- Check network tab in DevTools
- Ensure server `/api/chatbot` routes are registered

## File Structure Overview

```
Lost-Found-MERN-main/
├── server/
│   ├── controllers/
│   │   └── Chatbot/
│   │       └── chatbotController.js      ← NEW
│   ├── routes/
│   │   ├── chatbotRoutes.js             ← NEW
│   │   ├── userRoutes.js
│   │   └── ItemRoutes.js
│   ├── app.js                            ← MODIFIED
│   └── ...
├── client/
│   └── src/
│       ├── Components/
│       │   ├── ChatbotWidget.jsx         ← NEW
│       │   ├── HomeModern.jsx
│       │   └── ...
│       ├── App.jsx                       ← MODIFIED
│       └── ...
├── CHATBOT_DOCUMENTATION.md             ← NEW
├── CHATBOT_SETUP_GUIDE.md               ← NEW (this file)
└── ...
```

## Performance Tips

1. **For Better Searches:**
   - Users should be descriptive: "silver MacBook" instead of "laptop"
   - Include colors, brands, distinctive features

2. **For Server:**
   - Chatbot endpoints are rate-limited (inherited from API limiter)
   - Searches are optimized with MongoDB queries

3. **For Client:**
   - Chatbot widget is lazy-loaded (only loads when opened)
   - Uses React hooks for efficient re-renders

## Next Steps

1. ✅ **Test the chatbot locally**
2. ✅ **Customize colors/messages** to match your brand
3. ✅ **Add new intents** based on user feedback
4. ✅ **Integrate with item reporting** forms
5. ⬜ **Add ML-based intent detection** (future)
6. ⬜ **Connect to email notifications** (future)
7. ⬜ **Add image recognition** (future)

## Support

For detailed information, refer to:
- `CHATBOT_DOCUMENTATION.md` - Full documentation
- `server/controllers/Chatbot/chatbotController.js` - Chatbot logic
- `client/src/Components/ChatbotWidget.jsx` - UI component

---

**Happy chatting! 🎉**
