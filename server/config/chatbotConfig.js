/**
 * Chatbot Configuration File
 * Customize the chatbot behavior, messages, and appearance
 * 
 * Usage:
 * 1. Copy this file to: server/config/chatbotConfig.js
 * 2. Import in chatbotController.js: import chatbotConfig from '../config/chatbotConfig.js'
 * 3. Use: chatbotConfig.WELCOME_MESSAGE
 */

export const chatbotConfig = {
  // ==================== MESSAGES ====================
  
  MESSAGES: {
    WELCOME:
      "👋 Hi! I'm the Lost & Found Assistant. How can I help you find your belongings?",
    
    NO_RESULTS:
      "I couldn't find any matching items in our database. Would you like to report this item as lost?",
    
    ERROR:
      "Sorry, something went wrong. Please try again or contact support.",
    
    SEARCH_HELP:
      "I'd be happy to help you search! Could you tell me what item you're looking for? For example: 'I'm looking for my blue backpack'",
    
    REPORT_LOST_START:
      "I'm sorry to hear you've lost something! I'll help you report it. Let's start with some details:",
    
    REPORT_FOUND_START:
      "That's very kind of you to help! Let's report the found item so we can reunite it with its owner:",
  },

  // ==================== ITEM CATEGORIES ====================
  
  ITEM_CATEGORIES: [
    'Electronics',
    'Clothing',
    'Accessories',
    'Bag/Backpack',
    'Keys',
    'Documents',
    'Other',
  ],

  // ==================== QUICK ACTIONS ====================
  
  QUICK_ACTIONS: [
    {
      emoji: '🔍',
      text: 'Search Lost Items',
      action: 'search_lost',
    },
    {
      emoji: '🎁',
      text: 'Search Found Items',
      action: 'search_found',
    },
    {
      emoji: '📋',
      text: 'Report Lost Item',
      action: 'report_lost',
    },
    {
      emoji: '✋',
      text: 'Report Found Item',
      action: 'report_found',
    },
  ],

  // ==================== INTENT KEYWORDS ====================
  
  INTENT_KEYWORDS: {
    SEARCH: ['search', 'find', 'look for', 'where is', 'have you seen'],
    REPORT_LOST: ['lost', 'missing', 'cant find', 'report lost'],
    REPORT_FOUND: ['found', 'report found', 'picked up'],
    HELP: ['help', 'how', 'what', 'assist', 'guide'],
    BROWSE: ['browse', 'show', 'list', 'all items'],
    CONTACT: ['contact', 'email', 'phone', 'reach'],
    CATEGORY: ['category', 'type', 'kind', 'what type'],
  },

  // ==================== FORM QUESTIONS ====================
  
  LOST_ITEM_QUESTIONS: [
    {
      id: 'item_type',
      question: 'What type of item did you lose?',
      type: 'select',
      required: true,
      options: 'ITEM_CATEGORIES',
    },
    {
      id: 'description',
      question: 'Can you describe it? (color, brand, distinctive features)',
      type: 'text',
      required: true,
      placeholder: 'e.g., Blue Nike backpack with laptop pocket',
    },
    {
      id: 'location',
      question: 'Where did you last see it?',
      type: 'text',
      required: true,
      placeholder: 'e.g., Library, near the study area',
    },
    {
      id: 'date',
      question: 'When did you lose it?',
      type: 'date',
      required: false,
    },
  ],

  FOUND_ITEM_QUESTIONS: [
    {
      id: 'item_type',
      question: 'What type of item did you find?',
      type: 'select',
      required: true,
      options: 'ITEM_CATEGORIES',
    },
    {
      id: 'description',
      question: 'Can you describe it in detail?',
      type: 'text',
      required: true,
      placeholder: 'Describe color, brand, condition, etc.',
    },
    {
      id: 'location',
      question: 'Where did you find it?',
      type: 'text',
      required: true,
      placeholder: 'e.g., Gym parking lot',
    },
    {
      id: 'contact',
      question: 'How can the owner reach you?',
      type: 'text',
      required: false,
      placeholder: 'Email or phone number (optional)',
    },
  ],

  // ==================== UI CUSTOMIZATION ====================
  
  UI: {
    // Colors
    PRIMARY_COLOR: '#2563eb', // blue-600
    SECONDARY_COLOR: '#1d4ed8', // blue-700
    ACCENT_COLOR: '#60a5fa', // blue-400
    ERROR_COLOR: '#ef4444', // red-500
    SUCCESS_COLOR: '#10b981', // green-500
    
    // Sizing
    WIDGET_WIDTH: '384px', // w-96
    WIDGET_HEIGHT: '600px', // h-150 (600px)
    MESSAGE_MAX_WIDTH: '320px', // max-w-xs
    
    // Animations
    ANIMATION_DURATION: 300, // ms
    SMOOTH_SCROLL: true,
    AUTO_SCROLL_ON_NEW_MESSAGE: true,
    
    // Positioning
    POSITION: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    PADDING: '16px', // p-4
    Z_INDEX: 50, // z-50
  },

  // ==================== SEARCH SETTINGS ====================
  
  SEARCH: {
    MAX_RESULTS: 5,
    MIN_DESCRIPTION_LENGTH: 3,
    SEARCH_TIMEOUT: 5000, // ms
    CASE_SENSITIVE: false,
    HIGHLIGHT_MATCHES: true,
  },

  // ==================== API SETTINGS ====================
  
  API: {
    BASE_URL: process.env.VITE_API_URL || 'http://localhost:5000',
    ENDPOINTS: {
      MESSAGE: '/api/chatbot/message',
      SUGGESTIONS: '/api/chatbot/suggestions',
    },
    TIMEOUT: 10000, // ms
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // ms
  },

  // ==================== FEATURE FLAGS ====================
  
  FEATURES: {
    ENABLE_SEARCH: true,
    ENABLE_REPORT_LOST: true,
    ENABLE_REPORT_FOUND: true,
    ENABLE_BROWSE: true,
    ENABLE_STATISTICS: true,
    ENABLE_SUGGESTIONS: true,
    ENABLE_CONVERSATION_HISTORY: false, // For future implementation
    ENABLE_NOTIFICATIONS: false, // For future implementation
    ENABLE_EMAIL_REPORTS: false, // For future implementation
  },

  // ==================== LOGGING ====================
  
  LOGGING: {
    ENABLE_CONSOLE_LOG: true,
    LOG_LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
    LOG_CONVERSATIONS: true,
    STORE_LOGS: false, // Store in database
  },

  // ==================== RATE LIMITING ====================
  
  RATE_LIMIT: {
    ENABLED: true,
    WINDOW_MS: 900000, // 15 minutes
    MAX_REQUESTS: 100, // per window
    MESSAGE: 'Too many requests, please try again later.',
  },

  // ==================== TIMEOUTS & DELAYS ====================
  
  TIMING: {
    TYPING_INDICATOR_DELAY: 500, // ms before showing "Bot is typing"
    MESSAGE_DISPLAY_DELAY: 100, // ms before displaying message
    AUTO_CLOSE_DELAY: null, // null = never auto-close
    SESSION_TIMEOUT: 3600000, // 1 hour
  },

  // ==================== ADVANCED SETTINGS ====================
  
  ADVANCED: {
    // NLP Settings
    MIN_CONFIDENCE_THRESHOLD: 0.5, // 0-1
    FUZZY_MATCH_ENABLED: true,
    STEMMING_ENABLED: false,
    
    // Caching
    CACHE_RESULTS: true,
    CACHE_DURATION: 600000, // 10 minutes
    
    // Machine Learning (if implemented)
    ML_ENABLED: false,
    ML_MODEL_URL: null,
    
    // OpenAI Integration (if implemented)
    OPENAI_ENABLED: false,
    OPENAI_MODEL: 'gpt-3.5-turbo',
    OPENAI_TEMPERATURE: 0.7,
    OPENAI_MAX_TOKENS: 200,
  },

  // ==================== PERSISTENCE ====================
  
  PERSISTENCE: {
    SAVE_CONVERSATIONS: false, // Save to MongoDB
    SAVE_USER_PREFERENCES: false,
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    CLEAR_HISTORY_ON_CLOSE: true,
  },

  // ==================== LOCALE & INTERNATIONALIZATION ====================
  
  LOCALE: {
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'],
    AUTO_DETECT_LANGUAGE: false,
  },

  // ==================== HELP TEXT & EXAMPLES ====================
  
  HELP: {
    EXAMPLES: [
      {
        title: 'Search for Lost Item',
        description: 'Tell me what you lost',
        example: 'I lost my blue backpack',
      },
      {
        title: 'Search for Found Item',
        description: 'Tell me what type of item you found',
        example: 'I found a silver watch',
      },
      {
        title: 'Report Lost Item',
        description: 'Tell me you want to report a lost item',
        example: 'I want to report a lost item',
      },
      {
        title: 'Report Found Item',
        description: 'Tell me you found something',
        example: 'I found something',
      },
    ],

    TIPS: [
      'Be as descriptive as possible when searching',
      'Include colors, brands, and distinctive features',
      'Try searching by item category if description fails',
      'Check back regularly for new found items',
      'Report items immediately when lost',
    ],
  },

  // ==================== ANALYTICS ====================
  
  ANALYTICS: {
    ENABLED: false,
    TRACK_MESSAGES: true,
    TRACK_SEARCHES: true,
    TRACK_REPORTS: true,
    TRACK_USER_ACTIONS: true,
    TRACK_ERRORS: true,
    SEND_TO_SERVICE: null, // Analytics service URL
  },
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get configuration value with dot notation
 * Example: getChatbotConfigValue('UI.PRIMARY_COLOR')
 */
export const getChatbotConfigValue = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], chatbotConfig);
};

/**
 * Update configuration at runtime
 * Example: updateChatbotConfig('UI.PRIMARY_COLOR', '#ff0000')
 */
export const updateChatbotConfig = (path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((obj, key) => obj[key], chatbotConfig);
  target[lastKey] = value;
};

/**
 * Get all active features
 */
export const getActiveFeatures = () => {
  return Object.entries(chatbotConfig.FEATURES)
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature);
};

/**
 * Validate configuration
 */
export const validateChatbotConfig = () => {
  const errors = [];

  if (!chatbotConfig.API.BASE_URL) {
    errors.push('API.BASE_URL is required');
  }

  if (chatbotConfig.RATE_LIMIT.MAX_REQUESTS < 10) {
    errors.push('RATE_LIMIT.MAX_REQUESTS should be at least 10');
  }

  if (chatbotConfig.SEARCH.MAX_RESULTS < 1) {
    errors.push('SEARCH.MAX_RESULTS should be at least 1');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export default chatbotConfig;
