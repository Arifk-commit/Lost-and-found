# 🤖 Lost & Found Chatbot Assistant

## Overview

The **Lost & Found Chatbot Assistant** is an intelligent conversational AI that helps users find their lost belongings and report found items. It provides a seamless, user-friendly experience with smart intent detection and contextual responses.

## Features

### 🎯 Core Capabilities

1. **Smart Search** - Users can describe what they lost, and the chatbot searches the database
2. **Report Lost Items** - Guided process to report lost belongings
3. **Report Found Items** - Easy workflow to report found items
4. **Browse Items** - Display all lost and found items
5. **Help & Guidance** - Contextual assistance throughout the user journey
6. **Real-time Statistics** - Shows count of lost and found items

### 🔍 Intent Detection

The chatbot automatically detects user intent from natural language:

- **SEARCH** - Looking for items ("find my phone", "where is my backpack")
- **REPORT_LOST** - Reporting a lost item ("I lost my keys", "report lost item")
- **REPORT_FOUND** - Reporting a found item ("I found something", "report found item")
- **BROWSE** - Viewing all items ("show me all items", "list items")
- **HELP** - Getting assistance ("help me", "how does this work")
- **CATEGORY** - Asking about categories ("what categories exist")
- **CONTACT** - Contacting item owners ("how to contact")

## Architecture

### Backend Structure

```
server/
├── controllers/
│   └── Chatbot/
│       └── chatbotController.js       # Chatbot logic & intent handling
├── routes/
│   └── chatbotRoutes.js              # API endpoints
└── app.js                            # Updated to include chatbot routes
```

### Frontend Structure

```
client/
└── src/
    └── Components/
        └── ChatbotWidget.jsx          # React chatbot component
```

## API Endpoints

### POST `/api/chatbot/message`

Send a message to the chatbot and get an intelligent response.

**Request:**
```json
{
  "message": "I lost my blue backpack",
  "context": {} // Optional conversation context
}
```

**Response Examples:**

**Search Response:**
```json
{
  "success": true,
  "message": "Great! I found 3 matching item(s)! Here's what we have:",
  "items": [
    {
      "id": "...",
      "name": "Backpack",
      "description": "Blue Nike backpack with laptop pocket",
      "image": "...",
      "status": "found"
    }
  ],
  "suggestions": ["View item details", "Contact the person", "Search again"]
}
```

**Report Lost Response:**
```json
{
  "success": true,
  "message": "I'm sorry to hear you've lost something! I'll help you report it.",
  "questions": [
    {
      "id": "item_type",
      "question": "What type of item did you lose?",
      "type": "select",
      "options": ["Electronics", "Clothing", "Accessories", "Bag/Backpack", "Keys", "Documents", "Other"]
    }
  ],
  "nextAction": "COLLECT_LOST_INFO"
}
```

### GET `/api/chatbot/suggestions`

Get initial chatbot suggestions and platform statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "lostItems": 12,
    "foundItems": 8
  },
  "quickActions": [
    {
      "emoji": "🔍",
      "text": "Search Lost Items",
      "action": "search_lost"
    }
  ],
  "messages": [
    "👋 Hi! I'm here to help you find your belongings!",
    "We currently have 12 lost items and 8 found items.",
    "What would you like to do?"
  ]
}
```

## Frontend Component Usage

### Basic Integration

The chatbot is automatically included in the app via `App.jsx`:

```jsx
import ChatbotWidget from "./Components/ChatbotWidget.jsx";

function App() {
  return (
    <>
      {/* Your app content */}
      <ChatbotWidget />
    </>
  );
}
```

### Component Props

Currently, `ChatbotWidget` doesn't require props. Future enhancements can add:

- `initialOpen` - Start chatbot open
- `position` - Change position (bottom-right, bottom-left, etc.)
- `theme` - Custom color theme
- `autoSuggest` - Enable/disable suggestions

## Chatbot Flow Examples

### Example 1: Searching for Lost Items

```
User: "I lost my iPhone"
Bot:  "I found 2 matching items! Here's what we have:"
      [Shows found iPhones with details]
      Suggestions: [View details] [Contact the person] [Search again]
```

### Example 2: Reporting Lost Item

```
User: "I want to report a lost item"
Bot:  "I'm sorry! Let's report it. What type of item did you lose?"
      [Shows category options]
User: "Electronics"
Bot:  "Can you describe it in detail? (color, brand, features)"
User: "Silver MacBook Pro, 14-inch"
Bot:  "Where did you last see it?"
User: "In the library"
Bot:  "When did you lose it?"
User: "2024-04-25"
Bot:  [Redirects to full report form]
```

### Example 3: Reporting Found Item

```
User: "I found something"
Bot:  "That's kind of you! What type of item did you find?"
      [Shows category options]
User: "Keys"
Bot:  "Can you describe it in detail?"
User: "Silver keys with a red keychain"
Bot:  "Where did you find it?"
User: "Outside the gym"
Bot:  [Redirects to full report form]
```

## Customization Guide

### Adding New Intents

Edit `server/controllers/Chatbot/chatbotController.js`:

```javascript
const intents = {
  // Add new intent here
  CUSTOM_ACTION: ['keyword1', 'keyword2', 'keyword3'],
};

// Add case in handleChatbotMessage switch statement
case 'CUSTOM_ACTION':
  response = handleCustomAction();
  break;
```

### Changing Chatbot Appearance

Edit `client/src/Components/ChatbotWidget.jsx`:

```javascript
// Change colors in className attributes
<div className="bg-gradient-to-r from-[YOUR_COLOR] to-[YOUR_COLOR]">
```

### Adjusting Response Messages

Edit `server/controllers/Chatbot/chatbotController.js`:

```javascript
export const handleSearchIntent = async (message) => {
  // Modify the message here
  message: "Your custom message here"
};
```

## Testing the Chatbot

### Local Development

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and click the chatbot icon (bottom-right corner)

### Test Cases

| Test Case | Input | Expected Output |
|-----------|-------|-----------------|
| Search for item | "I lost my phone" | Shows matching items |
| Report lost | "I lost something" | Shows report form questions |
| Report found | "I found an item" | Shows found item questions |
| Browse items | "Show me all items" | Lists all items |
| Help request | "Help me" | Shows help options |
| Invalid input | Random text | Shows fallback suggestions |

## Future Enhancements

### Planned Features

- [ ] **ML-based Intent Detection** - Use TensorFlow.js for better intent recognition
- [ ] **NLP Integration** - Add OpenAI/Hugging Face API for natural conversations
- [ ] **Image Recognition** - Users can upload item photos for searching
- [ ] **Notifications** - Alert users when matching items are found
- [ ] **Conversation History** - Save chat history for logged-in users
- [ ] **Multi-language Support** - Support for multiple languages
- [ ] **Smart Recommendations** - Suggest items based on campus location
- [ ] **Integration with Emails** - Send reports directly to email
- [ ] **Rating System** - Users rate chatbot helpfulness

### Possible Improvements

1. **Database of Item Features**
   ```javascript
   const itemFeatures = {
     color: ['black', 'white', 'blue', ...],
     brand: ['Apple', 'Samsung', ...],
     type: ['phone', 'laptop', ...]
   };
   ```

2. **Conversation Context**
   ```javascript
   const context = {
     previousItems: [],
     reportedItems: [],
     searchHistory: []
   };
   ```

3. **Advanced Filtering**
   ```javascript
   // Search with multiple criteria
   const searchQuery = {
     color: 'blue',
     category: 'backpack',
     dateRange: { from, to },
     location: 'library'
   };
   ```

## Troubleshooting

### Chatbot Widget Not Appearing

1. Check if `ChatbotWidget` is imported in `App.jsx`
2. Verify API URL is correct in `.env` file
3. Check browser console for errors

### Messages Not Sending

1. Verify server is running on `http://localhost:5000`
2. Check if `/api/chatbot/message` endpoint is accessible
3. Check CORS settings in `server/app.js`

### No Results in Search

1. Ensure database has items with matching descriptions
2. Check keyword extraction logic
3. Verify MongoDB connection

## Environment Variables

Add to `.env` file in the client:

```env
VITE_API_URL=http://localhost:5000
```

## Performance Considerations

- **Search Optimization** - Uses MongoDB text indexing for faster searches
- **Message Caching** - Cache frequently asked questions
- **Rate Limiting** - Chatbot endpoint is rate-limited (inherited from API limiter)
- **Lazy Loading** - Widget loads only when opened

## Security

- All API requests are rate-limited
- Input sanitization is applied
- No sensitive data is stored in conversation
- Uses existing authentication middleware

## Code Examples

### Making an API Call from Frontend

```javascript
const sendChatMessage = async (message) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/chatbot/message',
      { message },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Chatbot error:', error);
  }
};
```

### Creating a Custom Intent Handler

```javascript
export const handleCustomIntent = async (message) => {
  return {
    success: true,
    message: "Your response here",
    customData: {
      // Your custom data
    }
  };
};
```

## Support & Documentation

For issues or questions:
1. Check the Troubleshooting section
2. Review API endpoint documentation
3. Check console for error messages
4. Refer to component source code for detailed implementation

## License

This chatbot feature is part of the Lost & Found MERN application and follows the same license.

---

**Last Updated:** April 2026
**Version:** 1.0.0
