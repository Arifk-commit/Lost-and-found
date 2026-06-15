import express from 'express';
import logger from '../config/logger.js';
import {
  handleChatbotMessage,
  getChatbotSuggestions,
} from '../controllers/Chatbot/chatbotController.js';

const router = express.Router();

/**
 * POST /api/chatbot/message
 * Send a message to the chatbot
 */
router.post('/message', async (req, res, next) => {
  try {
    const { message } = req.body;
    logger.info(`📨 Chatbot message received: "${message}"`);

    if (!message) {
      logger.warn('⚠️  No message provided in request body');
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    logger.info(`🤖 Processing chatbot message: "${message}"`);
    const response = await handleChatbotMessage(message);
    logger.info(`✅ Chatbot response: ${JSON.stringify(response).substring(0, 100)}...`);

    // Always return 200 OK with the chatbot response
    // Let the client handle success/error messages
    return res.status(200).json(response);
  } catch (error) {
    logger.error({ err: error }, '❌ Error in chatbot message handler');
    next(error);
  }
});

/**
 * GET /api/chatbot/suggestions
 * Get chatbot initial suggestions and stats
 */
router.get('/suggestions', async (req, res, next) => {
  try {
    const suggestions = await getChatbotSuggestions();
    return res.status(200).json(suggestions);
  } catch (error) {
    next(error);
  }
});

export default router;
