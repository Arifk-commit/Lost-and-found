import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Loader } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialSuggestions, setInitialSuggestions] = useState(null);
  const [conversationContext, setConversationContext] = useState(null);
  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch initial suggestions when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      fetchInitialSuggestions();
    }
  }, [isOpen]);

  const fetchInitialSuggestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/chatbot/suggestions`);
      if (response.data.success) {
        setInitialSuggestions(response.data);
        const botMessage = {
          id: Date.now(),
          sender: 'bot',
          type: 'suggestions',
          data: response.data,
        };
        setMessages([botMessage]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      const errorMessage = {
        id: Date.now(),
        sender: 'bot',
        type: 'text',
        content:
          "👋 Hi! I'm the Lost & Found Assistant. How can I help you find your belongings today?",
      };
      setMessages([errorMessage]);
    }
  };

  const sendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chatbot/message`, {
        message: messageText,
        context: conversationContext,
      });

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        type: response.data.items ? 'items' : 'response',
        data: response.data,
      };

      setMessages((prev) => [...prev, botMessage]);
      setConversationContext(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'text',
        content:
          'Sorry, something went wrong. Please try again or contact support.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    let messageText = '';
    switch (action) {
      case 'search_lost':
        messageText = 'Show me lost items';
        break;
      case 'search_found':
        messageText = 'Show me found items';
        break;
      case 'report_lost':
        messageText = 'I want to report a lost item';
        break;
      case 'report_found':
        messageText = 'I found something';
        break;
      default:
        messageText = action;
    }
    sendMessage(messageText);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Window */}
      {isOpen && (
        <div className="w-96 max-w-full h-[600px] max-h-[80vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} />
              <div>
                <h3 className="font-semibold">Lost & Found Assistant</h3>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 p-1 rounded transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p>Start a conversation...</p>
              </div>
            ) : (
              messages.map((message) => (
                <MessageComponent
                  key={message.id}
                  message={message}
                  onQuickAction={handleQuickAction}
                />
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-blue-100 text-blue-700 rounded-lg px-4 py-2 flex items-center gap-2">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === 'Enter' && !isLoading && sendMessage()
                }
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg px-4 py-2 transition flex items-center gap-2"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition transform hover:scale-110 flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

/**
 * Message Component - Renders different message types
 */
const MessageComponent = ({ message, onQuickAction }) => {
  if (message.sender === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs break-words">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  // Bot messages
  if (message.type === 'text') {
    return (
      <div className="flex justify-start">
        <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs break-words">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  if (message.type === 'suggestions' && message.data) {
    const { messages: botMessages, quickActions, stats } = message.data;
    return (
      <div className="space-y-3">
        {botMessages && (
          <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
            {botMessages.map((msg, idx) => (
              <p key={idx} className="text-sm">
                {msg}
              </p>
            ))}
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-red-600">
                {stats.lostItems}
              </p>
              <p className="text-xs text-red-700">Lost Items</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">
                {stats.foundItems}
              </p>
              <p className="text-xs text-green-700">Found Items</p>
            </div>
          </div>
        )}

        {quickActions && (
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => onQuickAction(action.action)}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3 text-left transition"
              >
                <p className="text-lg">{action.emoji}</p>
                <p className="text-xs font-semibold text-blue-700">
                  {action.text}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (message.type === 'response' && message.data) {
    const { message: botMessage, suggestions, items, questions } = message.data;
    return (
      <div className="space-y-3">
        {botMessage && (
          <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
            <p className="text-sm">{botMessage}</p>
          </div>
        )}

        {items && items.length > 0 && (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-300 rounded-lg p-3 hover:shadow-md transition"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <p className="font-semibold text-sm text-gray-800">
                  {item.name}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {item.description}
                </p>
                <span
                  className={`text-xs font-semibold mt-2 inline-block px-2 py-1 rounded ${
                    item.status === 'lost'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}

        {suggestions && (
          <div className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-2 text-left text-xs text-blue-700 transition"
              >
                • {suggestion}
              </button>
            ))}
          </div>
        )}

        {questions && (
          <div className="space-y-2">
            {questions.map((question) => (
              <div key={question.id}>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  {question.question}
                </p>
                {question.type === 'select' && (
                  <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="">Select an option...</option>
                    {question.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (message.type === 'items' && message.data.items) {
    const { items } = message.data;
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-300 rounded-lg p-3 hover:shadow-md transition"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <p className="font-semibold text-sm text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-600 line-clamp-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ChatbotWidget;
