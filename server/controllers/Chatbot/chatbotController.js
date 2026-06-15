import logger from '../../config/logger.js';
import Item from '../../models/Item.js';

/**
 * Chatbot responses and logic for helping users find their belongings
 */

// Intent detection patterns
const intents = {
  SEARCH: ['search', 'find', 'look for', 'where is', 'have you seen'],
  REPORT_LOST: ['lost', 'missing', 'cant find', 'report lost'],
  REPORT_FOUND: ['found', 'report found', 'picked up'],
  HELP: ['help', 'how', 'what', 'assist', 'guide'],
  BROWSE: ['browse', 'show', 'list', 'all items'],
  CONTACT: ['contact', 'email', 'phone', 'reach'],
  CATEGORY: ['category', 'type', 'kind', 'what type'],
};

/**
 * Detect user intent from message
 */
const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase().trim();

  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return intent;
    }
  }
  return 'UNKNOWN';
};

/**
 * Extract keywords/item info from message
 */
const extractKeywords = (message) => {
  // Remove common words
  const commonWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'my',
    'i',
    'have',
    'lost',
    'found',
    'item',
  ]);

  const words = message
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => !commonWords.has(word) && word.length > 3);

  return words;
};

/**
 * Handle SEARCH intent
 */
export const handleSearchIntent = async (message) => {
  try {
    const keywords = extractKeywords(message);

    if (keywords.length === 0) {
      return {
        success: false,
        message:
          "I'd be happy to help you search! Could you tell me what item you're looking for? For example: 'I'm looking for my blue backpack'",
        suggestions: [
          'Describe the item color',
          'Mention item type (backpack, phone, etc)',
          'Tell me when/where you lost it',
        ],
      };
    }

    // Search items by name or description matching keywords
    const searchQuery = {
      $or: [
        { name: { $regex: keywords[0], $options: 'i' } },
        { description: { $regex: keywords.join('|'), $options: 'i' } },
      ],
    };

    const items = await Item.find(searchQuery).limit(5).select('-__v');

    if (items.length === 0) {
      return {
        success: false,
        message: `I couldn't find any items matching "${keywords.join(
          ', '
        )}" in our database. Would you like to:`,
        suggestions: [
          'Report this item as lost',
          'Browse all items',
          'Try a different search term',
        ],
        nextAction: 'REPORT_LOST',
      };
    }

    return {
      success: true,
      message: `Great! I found ${items.length} matching item(s)! Here's what we have:`,
      items: items.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        image: item.img?.[0],
        status: item.type,
      })),
      suggestions: [
        'View item details',
        'Contact the person',
        'Search again',
      ],
    };
  } catch (error) {
    logger.error('Error in handleSearchIntent:', error);
    throw error;
  }
};

/**
 * Handle REPORT_LOST intent
 */
export const handleReportLostIntent = () => {
  return {
    success: true,
    message:
      "I'm sorry to hear you've lost something! I'll help you report it. Let's start with some details:",
    questions: [
      {
        id: 'item_type',
        question: 'What type of item did you lose?',
        type: 'select',
        options: [
          'Electronics',
          'Clothing',
          'Accessories',
          'Bag/Backpack',
          'Keys',
          'Documents',
          'Other',
        ],
      },
      {
        id: 'description',
        question: 'Can you describe it? (color, brand, distinctive features)',
        type: 'text',
      },
      {
        id: 'location',
        question: 'Where did you last see it?',
        type: 'text',
      },
      {
        id: 'date',
        question: 'When did you lose it?',
        type: 'date',
      },
    ],
    nextAction: 'COLLECT_LOST_INFO',
  };
};

/**
 * Handle REPORT_FOUND intent
 */
export const handleReportFoundIntent = () => {
  return {
    success: true,
    message:
      "That's very kind of you to help! Let's report the found item so we can reunite it with its owner:",
    questions: [
      {
        id: 'item_type',
        question: 'What type of item did you find?',
        type: 'select',
        options: [
          'Electronics',
          'Clothing',
          'Accessories',
          'Bag/Backpack',
          'Keys',
          'Documents',
          'Other',
        ],
      },
      {
        id: 'description',
        question: 'Can you describe it in detail?',
        type: 'text',
      },
      {
        id: 'location',
        question: 'Where did you find it?',
        type: 'text',
      },
      {
        id: 'contact',
        question: 'How can the owner reach you?',
        type: 'text',
      },
    ],
    nextAction: 'COLLECT_FOUND_INFO',
  };
};

/**
 * Handle HELP intent
 */
export const handleHelpIntent = () => {
  return {
    success: true,
    message:
      'Welcome to Lost & Found Assistant! I can help you in several ways:',
    helpOptions: [
      {
        action: 'SEARCH',
        title: '🔍 Search for Items',
        description: 'Find lost or found items in our database',
      },
      {
        action: 'REPORT_LOST',
        title: '📋 Report Lost Item',
        description:
          'Report an item you lost so others can help find it',
      },
      {
        action: 'REPORT_FOUND',
        title: '🎁 Report Found Item',
        description:
          'Report an item you found to help reunite it with the owner',
      },
      {
        action: 'BROWSE',
        title: '📜 Browse All Items',
        description:
          'See all lost and found items on the platform',
      },
    ],
  };
};

/**
 * Handle BROWSE intent
 */
export const handleBrowseIntent = async (type = 'all') => {
  try {
    const query = type !== 'all' ? { type: type === 'Lost' ? 'Lost' : 'Found' } : {};
    const items = await Item.find(query)
      .limit(10)
      .sort({ createdAt: -1 })
      .select('-__v');

    return {
      success: true,
      message: `Here are the ${type === 'all' ? 'latest' : type} items:`,
      items: items.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        image: item.img?.[0],
        status: item.type,
        date: item.createdAt,
      })),
      totalCount: items.length,
    };
  } catch (error) {
    logger.error('Error in handleBrowseIntent:', error);
    throw error;
  }
};

/**
 * Main chatbot message handler
 */
export const handleChatbotMessage = async (message) => {
  try {
    if (!message || message.trim().length === 0) {
      return {
        success: false,
        message: 'Please write something! How can I assist you today?',
      };
    }

    const intent = detectIntent(message);

    let response;

    switch (intent) {
      case 'SEARCH':
        response = await handleSearchIntent(message);
        break;

      case 'REPORT_LOST':
        response = handleReportLostIntent();
        break;

      case 'REPORT_FOUND':
        response = handleReportFoundIntent();
        break;

      case 'BROWSE':
        response = await handleBrowseIntent();
        break;

      case 'HELP':
        response = handleHelpIntent();
        break;

      case 'CATEGORY':
        response = {
          success: true,
          message: 'Here are the available categories:',
          categories: [
            'Electronics',
            'Clothing',
            'Accessories',
            'Bag/Backpack',
            'Keys',
            'Documents',
            'Other',
          ],
        };
        break;

      case 'CONTACT':
        response = {
          success: true,
          message: 'To contact someone about an item:',
          instructions: [
            'Click on the item listing',
            'View the contact information',
            'Reach out to them directly',
          ],
        };
        break;

      default:
        response = {
          success: false,
          message:
            "I'm not sure what you're looking for. Let me show you what I can help with:",
          fallbackOptions: [
            '🔍 Search for items',
            '📋 Report a lost item',
            '🎁 Report a found item',
            '📜 Browse all items',
          ],
          suggestion: 'Try saying: "Help me find my phone" or "I lost my keys"',
        };
    }

    return response;
  } catch (error) {
    logger.error('Error in handleChatbotMessage:', error);
    return {
      success: false,
      message:
        'Sorry, something went wrong. Please try again or contact support.',
      error: error.message,
    };
  }
};

/**
 * Get chatbot suggestions based on context
 */
export const getChatbotSuggestions = async () => {
  try {
    const lostCount = await Item.countDocuments({ type: 'Lost' });
    const foundCount = await Item.countDocuments({ type: 'Found' });

    return {
      success: true,
      stats: {
        lostItems: lostCount,
        foundItems: foundCount,
      },
      quickActions: [
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
      messages: [
        "👋 Hi! I'm here to help you find your belongings!",
        `We currently have ${lostCount} lost items and ${foundCount} found items.`,
        'What would you like to do?',
      ],
    };
  } catch (error) {
    logger.error('Error in getChatbotSuggestions:', error);
    throw error;
  }
};
