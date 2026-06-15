/**
 * Advanced Chatbot Controller with OpenAI Integration (Optional)
 * 
 * This is an OPTIONAL enhancement for more intelligent responses.
 * Install: npm install openai
 * 
 * Set environment variable: OPENAI_API_KEY=your_key_here
 * 
 * Usage: Import from chatbotController.js and use openAI functions
 */

import logger from '../../config/logger.js';
import Item from '../../models/Item.js';

// Optional: Only import if OpenAI is installed
let openai;
try {
  const { OpenAI } = await import('openai');
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  logger.warn('OpenAI not configured. Using rule-based chatbot.');
  openai = null;
}

/**
 * Generate response using OpenAI GPT (Optional)
 * More natural language understanding and responses
 */
export const generateAIResponse = async (message, itemContext = []) => {
  if (!openai) {
    return null;
  }

  try {
    const systemPrompt = `You are a helpful Lost & Found assistant for a campus platform. 
Your job is to help users find lost items or report found items.
Be empathetic, concise, and helpful. Ask clarifying questions when needed.
Current items in database: ${JSON.stringify(itemContext.slice(0, 3))}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0].message.content;
  } catch (error) {
    logger.error('Error generating AI response:', error);
    return null;
  }
};

/**
 * Advanced search with semantic understanding
 */
export const semanticSearch = async (query, limit = 5) => {
  try {
    // Extract key terms using simple NLP
    const keywords = extractKeyTerms(query);

    // Multi-field search with MongoDB
    const items = await Item.find({
      $or: [
        { category: { $regex: keywords.join('|'), $options: 'i' } },
        { description: { $regex: keywords.join('|'), $options: 'i' } },
        { location: { $regex: keywords.join('|'), $options: 'i' } },
      ],
    })
      .limit(limit)
      .select('-__v');

    return items;
  } catch (error) {
    logger.error('Error in semantic search:', error);
    throw error;
  }
};

/**
 * Extract key terms from query
 */
const extractKeyTerms = (query) => {
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
    'can',
    'help',
    'me',
    'is',
  ]);

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => {
      const cleaned = word.replace(/[^\w]/g, '');
      return cleaned.length > 2 && !commonWords.has(cleaned);
    });

  return terms;
};

/**
 * Classify item based on description
 * Useful for auto-categorization when users report items
 */
export const classifyItem = async (description) => {
  const categories = [
    'Electronics',
    'Clothing',
    'Accessories',
    'Bag/Backpack',
    'Keys',
    'Documents',
    'Other',
  ];

  // Rule-based classification (fallback)
  const lowerDesc = description.toLowerCase();

  if (
    lowerDesc.includes('phone') ||
    lowerDesc.includes('laptop') ||
    lowerDesc.includes('airpods') ||
    lowerDesc.includes('watch')
  ) {
    return 'Electronics';
  }
  if (
    lowerDesc.includes('shirt') ||
    lowerDesc.includes('pants') ||
    lowerDesc.includes('jacket') ||
    lowerDesc.includes('shoe')
  ) {
    return 'Clothing';
  }
  if (
    lowerDesc.includes('bag') ||
    lowerDesc.includes('backpack') ||
    lowerDesc.includes('purse')
  ) {
    return 'Bag/Backpack';
  }
  if (lowerDesc.includes('key')) {
    return 'Keys';
  }
  if (
    lowerDesc.includes('card') ||
    lowerDesc.includes('id') ||
    lowerDesc.includes('document')
  ) {
    return 'Documents';
  }
  if (
    lowerDesc.includes('watch') ||
    lowerDesc.includes('ring') ||
    lowerDesc.includes('necklace')
  ) {
    return 'Accessories';
  }

  return 'Other';
};

/**
 * Generate smart suggestions based on user behavior
 */
export const generateSmartSuggestions = async (userHistory = []) => {
  try {
    const lostCount = await Item.countDocuments({ itemType: 'lost' });
    const foundCount = await Item.countDocuments({ itemType: 'found' });

    const suggestions = [];

    // Suggest based on what's available
    if (lostCount > 0) {
      suggestions.push({
        emoji: '🔍',
        text: `${lostCount} Lost Items Available`,
        action: 'browse_lost',
        priority: 1,
      });
    }

    if (foundCount > 0) {
      suggestions.push({
        emoji: '🎁',
        text: `${foundCount} Found Items Available`,
        action: 'browse_found',
        priority: 1,
      });
    }

    suggestions.push({
      emoji: '📋',
      text: 'Report Lost Item',
      action: 'report_lost',
      priority: 2,
    });

    suggestions.push({
      emoji: '✋',
      text: 'Report Found Item',
      action: 'report_found',
      priority: 2,
    });

    return suggestions.sort((a, b) => a.priority - b.priority);
  } catch (error) {
    logger.error('Error generating smart suggestions:', error);
    throw error;
  }
};

/**
 * Multi-turn conversation manager
 * Maintains context across multiple messages
 */
export class ConversationManager {
  constructor(userId) {
    this.userId = userId;
    this.history = [];
    this.context = {
      lastAction: null,
      searchResults: [],
      reportData: {},
    };
  }

  addMessage(role, content) {
    this.history.push({
      role,
      content,
      timestamp: new Date(),
    });
  }

  getContext() {
    return {
      history: this.history,
      context: this.context,
    };
  }

  updateContext(newContext) {
    this.context = { ...this.context, ...newContext };
  }

  clearHistory() {
    this.history = [];
    this.context = {
      lastAction: null,
      searchResults: [],
      reportData: {},
    };
  }

  getLastAction() {
    return this.context.lastAction;
  }
}

/**
 * Extract structured data from user input
 * Useful for report forms
 */
export const extractStructuredData = (message) => {
  const data = {
    description: '',
    color: null,
    category: null,
    location: null,
    date: null,
  };

  const lowerMsg = message.toLowerCase();

  // Extract color
  const colors = [
    'red',
    'blue',
    'green',
    'black',
    'white',
    'silver',
    'gold',
    'yellow',
  ];
  colors.forEach((color) => {
    if (lowerMsg.includes(color)) {
      data.color = color;
    }
  });

  // Extract category
  const categories = [
    'phone',
    'laptop',
    'backpack',
    'keys',
    'wallet',
    'watch',
    'airpods',
  ];
  categories.forEach((cat) => {
    if (lowerMsg.includes(cat)) {
      data.category = cat;
    }
  });

  // Extract location keywords
  const locations = [
    'library',
    'gym',
    'cafe',
    'classroom',
    'dormitory',
    'parking',
    'bathroom',
  ];
  locations.forEach((loc) => {
    if (lowerMsg.includes(loc)) {
      data.location = loc;
    }
  });

  // Full description
  data.description = message;

  return data;
};

/**
 * Generate follow-up questions based on current information
 */
export const generateFollowUpQuestions = (extractedData) => {
  const questions = [];

  if (!extractedData.color) {
    questions.push({
      id: 'color',
      question: 'What color is it?',
      type: 'text',
    });
  }

  if (!extractedData.category) {
    questions.push({
      id: 'category',
      question: 'What type of item is it?',
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
    });
  }

  if (!extractedData.location) {
    questions.push({
      id: 'location',
      question: 'Where did you lose/find it?',
      type: 'text',
    });
  }

  if (!extractedData.date) {
    questions.push({
      id: 'date',
      question: 'When did this happen?',
      type: 'date',
    });
  }

  return questions;
};

export default {
  generateAIResponse,
  semanticSearch,
  classifyItem,
  generateSmartSuggestions,
  ConversationManager,
  extractStructuredData,
  generateFollowUpQuestions,
};
