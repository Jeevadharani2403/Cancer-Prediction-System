import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'elix';
  timestamp: Date;
}

export default function ChatbotElix() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Elix, your AI health companion. I'm here to answer your health questions, provide guidance, and support you on your wellness journey. How can I help you today?",
      sender: 'elix',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses: Record<string, string> = {
    'cancer symptoms': 'Common cancer symptoms include unexplained weight loss, persistent fatigue, lumps or swelling, changes in skin appearance, and persistent pain. However, many cancers have no early symptoms. Regular screenings are crucial for early detection.',
    'diet': 'Based on your profile, I recommend a diet rich in cruciferous vegetables, berries, fatty fish, and whole grains. Limit processed foods, red meat, and alcohol. Would you like specific meal suggestions?',
    'exercise': 'For your health profile, I suggest 150 minutes of moderate cardio weekly, plus strength training 2-3 times per week. Start gradually and listen to your body. Would you like a personalized workout plan?',
    'test results': 'Your latest test results show a health score of 91/100 with no concerning abnormalities. Your blood markers are within normal range. Would you like me to explain any specific metrics?',
    'family history': 'Given your family history of breast cancer, I recommend annual mammography starting at age 35, genetic counseling, and BRCA gene testing. Early detection significantly improves outcomes.',
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let responseText = "I understand your concern. Based on your health profile and recent test results, ";

      // Check for keywords
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('cancer') || lowerInput.includes('symptom')) {
        responseText = quickResponses['cancer symptoms'];
      } else if (lowerInput.includes('diet') || lowerInput.includes('food') || lowerInput.includes('eat')) {
        responseText = quickResponses['diet'];
      } else if (lowerInput.includes('exercise') || lowerInput.includes('workout') || lowerInput.includes('fitness')) {
        responseText = quickResponses['exercise'];
      } else if (lowerInput.includes('test') || lowerInput.includes('result')) {
        responseText = quickResponses['test results'];
      } else if (lowerInput.includes('family') || lowerInput.includes('hereditary')) {
        responseText = quickResponses['family history'];
      } else {
        responseText += "I'd recommend consulting with your healthcare provider for personalized medical advice. In the meantime, continue following your health care measures and maintain regular check-ups. Is there a specific aspect you'd like me to explain further?";
      }

      const elixMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'elix',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, elixMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col p-8">
      <div className="max-w-4xl w-full mx-auto h-full flex flex-col bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Elix</h2>
              <p className="text-sm text-white/90">Your AI Health Companion</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                message.sender === 'elix'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                  : 'bg-gray-300'
              }`}>
                {message.sender === 'elix' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-lg ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-4 rounded-2xl ${
                  message.sender === 'elix'
                    ? 'bg-purple-50 text-gray-800'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-purple-50 p-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-purple-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your health..."
              className="flex-1 px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
