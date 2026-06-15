# 🏗️ Chatbot Architecture & Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      LOST & FOUND CHATBOT SYSTEM                     │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────┐     ┌──────────────────────────────┐
│     CLIENT (React/Browser)       │     │    SERVER (Express/Node.js)  │
│                                  │     │                              │
│  ┌────────────────────────────┐  │     │  ┌──────────────────────────┐│
│  │   ChatbotWidget.jsx        │  │     │  │ chatbotController.js     ││
│  │  ┌──────────────────────┐  │  │     │  │                          ││
│  │  │ Message Display      │  │  │     │  ├──────────────────────────┤│
│  │  ├──────────────────────┤  │  │     │  │ • detectIntent()         ││
│  │  │ Input Box            │  │  │     │  │ • extractKeywords()      ││
│  │  ├──────────────────────┤  │  │     │  │ • handleSearchIntent()   ││
│  │  │ Quick Actions        │  │  │     │  │ • handleReportLost()     ││
│  │  ├──────────────────────┤  │  │     │  │ • handleReportFound()    ││
│  │  │ Statistics Display   │  │  │     │  │ • handleHelpIntent()     ││
│  │  └──────────────────────┘  │  │     │  └──────────────────────────┘│
│  └────────────────────────────┘  │     │                              │
│           │                       │     │     ┌──────────────────────┐ │
│           │ (axios API calls)     │────────→  │ chatbotRoutes.js     │ │
│           │                       │     │     │                      │ │
│           └───────────────────────│─────│────→│ POST /message        │ │
│                                   │     │     │ GET /suggestions     │ │
│                                   │     │     └──────────────────────┘ │
└──────────────────────────────────┘     │                              │
                                         │     ┌──────────────────────┐ │
                                         │     │   MongoDB/Items      │ │
                                         │     │   • Lost Items       │ │
                                         │     │   • Found Items      │ │
                                         │     └──────────────────────┘ │
                                         │                              │
                                         └──────────────────────────────┘
```

## User Message Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              USER MESSAGE PROCESSING FLOW                        │
└─────────────────────────────────────────────────────────────────┘

User Types Message
        ↓
[Frontend] Validate Input
        ↓
[Frontend] Send via Axios to /api/chatbot/message
        ↓
[Backend] Receive Message
        ↓
[Backend] detectIntent(message)
        ↓
        ├─→ Contains "search/find" → SEARCH Intent
        ├─→ Contains "lost/missing" → REPORT_LOST Intent
        ├─→ Contains "found" → REPORT_FOUND Intent
        ├─→ Contains "help" → HELP Intent
        ├─→ Contains "browse/show" → BROWSE Intent
        ├─→ Contains "category/type" → CATEGORY Intent
        ├─→ Contains "contact/email" → CONTACT Intent
        └─→ Default → UNKNOWN Intent
        ↓
[Backend] Call Appropriate Handler
        ↓
        ├─→ handleSearchIntent()
        │   ├─→ extractKeywords()
        │   ├─→ Query MongoDB with keywords
        │   └─→ Return matching items
        │
        ├─→ handleReportLostIntent()
        │   └─→ Return form questions
        │
        ├─→ handleReportFoundIntent()
        │   └─→ Return form questions
        │
        ├─→ handleHelpIntent()
        │   └─→ Return help options
        │
        └─→ handleBrowseIntent()
            ├─→ Query recent items
            └─→ Return item list
        ↓
[Backend] Format Response
        ↓
[Backend] Send JSON to Frontend
        ↓
[Frontend] Receive Response
        ↓
[Frontend] Render MessageComponent
        ↓
[Frontend] Display to User
        ↓
User Sees Response
```

## Intent Detection Decision Tree

```
                            User Message
                                  │
                                  ↓
                        ┌─────────────────────┐
                        │  Lowercase & Trim   │
                        └─────────────────────┘
                                  │
                                  ↓
                    ┌─────────────────────────────┐
                    │   Check Against Patterns    │
                    └─────────────────────────────┘
                                  │
        ┌─────────────────────────┼──────────────────────────┐
        │                         │                          │
        ↓                         ↓                          ↓
   SEARCH MATCH          REPORT_LOST MATCH         REPORT_FOUND MATCH
   "find", "search"      "lost", "missing"         "found", "report found"
        │                         │                          │
        └─────────────────────────┼──────────────────────────┘
                                  │
                                  ↓
                        ┌──────────────────────┐
                        │  Match Found?        │
                        └──────────────────────┘
                             Yes │ No
                                 │
                    ┌────────────┴────────────┐
                    ↓                         ↓
            Return Matched Intent      Check Other Patterns
                                              │
                                    HELP, BROWSE, CATEGORY, CONTACT
                                              │
                                    ┌─────────┴─────────┐
                                    ↓                   ↓
                            Any Match Found?      Return UNKNOWN
                             Yes │ No              Intent
                                 │
                        ┌────────┴─────────┐
                        ↓                  ↓
                Return Matched        Default to
                Intent                UNKNOWN
```

## Search Flow

```
┌─────────────────────────────────────────────────────┐
│            SEARCH INTENT PROCESSING                  │
└─────────────────────────────────────────────────────┘

User: "I lost my blue backpack"
        ↓
handleSearchIntent(message)
        ↓
extractKeywords(message)
        ├─→ Split by whitespace
        ├─→ Remove common words (a, the, lost, my, etc.)
        └─→ Result: ["blue", "backpack"]
        ↓
Build MongoDB Query
        ├─→ OR condition:
        │   ├─→ category: /blue|backpack/i
        │   └─→ description: /blue|backpack/i
        ↓
Execute Query
        ├─→ Limit: 5 results
        └─→ Select fields: name, description, image, status
        ↓
Process Results
        ├─→ 0 Results → "Could not find, try reporting lost item"
        ├─→ 1+ Results → Format items for display
        └─→ Add suggestions for next steps
        ↓
Return Response with Items
```

## Report Item Flow

```
┌────────────────────────────────────────────────────┐
│       REPORT LOST/FOUND ITEM FLOW                  │
└────────────────────────────────────────────────────┘

User: "I lost my keys"
        ↓
detectIntent() → REPORT_LOST
        ↓
handleReportLostIntent()
        ↓
Generate Questions Array:
        ├─→ Question 1: "What type of item did you lose?"
        │   └─→ Type: select
        │   └─→ Options: [Electronics, Clothing, ...]
        │
        ├─→ Question 2: "Describe it?"
        │   └─→ Type: text
        │   └─→ Placeholder: "e.g., Silver keys with..."
        │
        ├─→ Question 3: "Where did you last see it?"
        │   └─→ Type: text
        │
        └─→ Question 4: "When did you lose it?"
            └─→ Type: date
        ↓
Send Questions to Frontend
        ↓
Frontend Renders Form
        ↓
User Fills Form
        ↓
User Clicks "Submit"
        ↓
Redirect to Full Report Page
        └─→ URL: /postitem
```

## Component Structure

```
┌─────────────────────────────────────────────────────────┐
│              App.jsx                                     │
└─────────────────────────────────────────────────────────┘
                        │
         ┌──────────────┼──────────────┐
         ↓              ↓              ↓
    [Routes]   [Layout]       [ChatbotWidget]
                            (NEW COMPONENT)
                                  │
                        ┌─────────┼─────────┐
                        ↓         ↓         ↓
                    [Header]  [Messages]  [Input]
                            [Quick Actions]
                            [Statistics]
                            [MessageComponent]
                                (renders different
                                 message types)
```

## Data Flow Sequence

```
SEQUENCE: User searches for item

1. User clicks chatbot icon
   ┌─────────────────────────┐
   │ ChatbotWidget opens     │
   │ fetchInitialSuggestions()
   └─────────────────────────┘
                ↓
2. GET /api/chatbot/suggestions
   ┌─────────────────────────┐
   │ Backend counts items    │
   │ Prepares statistics     │
   └─────────────────────────┘
                ↓
3. Display initial state
   ┌─────────────────────────┐
   │ Show welcome message    │
   │ Show stats & actions    │
   └─────────────────────────┘
                ↓
4. User types & sends message
   ┌─────────────────────────┐
   │ "I lost my phone"       │
   └─────────────────────────┘
                ↓
5. POST /api/chatbot/message
   ┌─────────────────────────┐
   │ Message: "I lost..."    │
   └─────────────────────────┘
                ↓
6. Backend processes
   ┌─────────────────────────┐
   │ detectIntent() → SEARCH │
   │ extractKeywords()       │
   │ Query DB                │
   │ Format response         │
   └─────────────────────────┘
                ↓
7. Return results
   ┌─────────────────────────┐
   │ {                       │
   │   message: "Found 2...",│
   │   items: [...]          │
   │ }                       │
   └─────────────────────────┘
                ↓
8. Frontend renders
   ┌─────────────────────────┐
   │ Display items           │
   │ Show contact options    │
   └─────────────────────────┘
```

## API Endpoint Map

```
┌──────────────────────────────────────────────────────┐
│         API ENDPOINTS (Chatbot Routes)                │
└──────────────────────────────────────────────────────┘

/api/chatbot/
    │
    ├─→ POST /message
    │   ├─→ Input: { message: string }
    │   ├─→ Processing:
    │   │   ├─→ Intent Detection
    │   │   ├─→ Keyword Extraction
    │   │   ├─→ Intent Handler
    │   │   └─→ Response Generation
    │   └─→ Output: { success, message, items?, suggestions? }
    │
    └─→ GET /suggestions
        ├─→ Processing:
        │   ├─→ Count lost items
        │   ├─→ Count found items
        │   └─→ Generate quick actions
        └─→ Output: { stats, quickActions, messages }
```

## State Management Flow

```
┌──────────────────────────────────────────────────────┐
│        ChatbotWidget State Management                 │
└──────────────────────────────────────────────────────┘

useState States:
  ├─→ isOpen: boolean
  ├─→ messages: Message[]
  ├─→ inputValue: string
  ├─→ isLoading: boolean
  ├─→ initialSuggestions: Suggestions | null
  └─→ conversationContext: Context | null

Message Object:
  ├─→ id: number (timestamp)
  ├─→ sender: 'user' | 'bot'
  ├─→ type: 'text' | 'suggestions' | 'response' | 'items'
  ├─→ content?: string
  └─→ data?: any

Effects:
  ├─→ scrollToBottom() - runs on messages change
  └─→ fetchInitialSuggestions() - runs on isOpen change
```

## Error Handling Flow

```
┌──────────────────────────────────────────────────────┐
│           ERROR HANDLING FLOW                         │
└──────────────────────────────────────────────────────┘

Try-Catch Blocks at Multiple Levels:

Frontend:
  ├─→ Try: sendMessage()
  │   ├─→ Catch: Network error
  │   ├─→ Catch: Response error
  │   └─→ Display: Generic error message
  └─→ Always: Set isLoading to false

Backend:
  ├─→ Try: handleChatbotMessage()
  │   ├─→ Catch: Intent detection error
  │   ├─→ Catch: Query error
  │   ├─→ Catch: Rendering error
  │   └─→ Log: Full error details
  └─→ Always: Return error response

Logging:
  └─→ logger.error() for all exceptions
```

## Performance Optimization Path

```
┌──────────────────────────────────────────────────────┐
│       PERFORMANCE OPTIMIZATION STRATEGIES             │
└──────────────────────────────────────────────────────┘

Frontend Optimizations:
  ├─→ Lazy load widget component
  ├─→ Memoize MessageComponent
  ├─→ Debounce search input
  ├─→ Virtualize long message lists
  └─→ Cache API responses

Backend Optimizations:
  ├─→ Index MongoDB fields
  ├─→ Cache frequently searched items
  ├─→ Limit database query results
  ├─→ Use connection pooling
  └─→ Implement response compression

Caching Strategy:
  Suggestions (GET) → Cache 5-10 minutes
  Search Results → Cache per user session
  Item Categories → Cache 1 hour
```

## Deployment Architecture

```
┌───────────────────────────────────────────────────────┐
│             PRODUCTION DEPLOYMENT                      │
└───────────────────────────────────────────────────────┘

Client Deploy:
  npm run build
  ├─→ Vite builds React app
  ├─→ Outputs to dist/
  └─→ Deploy to CDN/Web server

Server Deploy:
  npm start
  ├─→ Starts Express server
  ├─→ Connects to MongoDB
  ├─→ Loads environment variables
  └─→ Listens on PORT (default 5000)

Environment:
  .env contains:
  ├─→ DATABASE_URL
  ├─→ NODE_ENV
  ├─→ PORT
  ├─→ CLIENT_URL
  └─→ Optional: OPENAI_API_KEY
```

---

These diagrams provide a visual understanding of the chatbot architecture and data flows. Refer to them while implementing features or debugging issues.
