import React, { useState, useRef, useEffect } from 'react';
import { Send, Stethoscope } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { VideoChat } from './components/VideoChat';
import type { Message, ChatState } from './types';
import logo from './assets/logo.png';
import nurseImage from './assets/nurse-image.jpg';

function App() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    isVideoChat: false,
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));
    setInput('');

    // Check for specific medication compatibility question
    const medicationQuestion = input.toLowerCase();
    let aiResponse = '';

    if (medicationQuestion.includes('vancomycin') && medicationQuestion.includes('zosyn') && 
        (medicationQuestion.includes('line') || medicationQuestion.includes('iv') || medicationQuestion.includes('compatible'))) {
      aiResponse = "Vancomycin and Zosyn are NOT compatible when run through the same line due to risk of precipitation.";
    } else {
      aiResponse = "I understand your question. Based on nursing best practices, I can provide some guidance. However, for more specific advice, I'd recommend connecting with one of our nursing professionals via video chat.";
    }

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      const connectMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "Need more information?",
        sender: 'ai',
        timestamp: new Date(),
        showConnect: true,
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage, connectMessage],
        isLoading: false,
      }));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="rounded-2xl shadow-lg p-4 border border-blue-100 mb-4" style={{ 
          background: 'linear-gradient(135deg, #102F4D 0%, #1a4a6e 100%)'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="Pocket Preceptor Logo" className="h-40" />
              <p className="text-white font-medium">Your Personal Clinical Guide & Mentor</p>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md hover:opacity-90 transition-opacity">
                <img src={nurseImage} alt="User Profile" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[60vh] overflow-y-auto p-6 space-y-6">
            {state.messages.length === 0 && (
              <div className="text-center py-8">
                <div className="rounded-2xl p-6 inline-block" style={{ backgroundColor: 'rgba(16, 47, 77, 0.1)' }}>
                <Stethoscope size={32} className="text-[#102F4D] mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-[#102F4D] mb-2">Welcome to Pocket Preceptor</h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Your trusted companion for medication compatibility, clinical procedures, and instant access to experienced preceptors.
                  </p>
                </div>
              </div>
            )}
            {state.messages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message}
                onConnect={() => setState(prev => ({ ...prev, isVideoChat: true }))}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-blue-100 p-4 bg-gradient-to-b from-white to-blue-50">
            <div className="flex gap-3">
              <div className="flex-1 flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your clinical question..."
                  className="flex-1 border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#102F4D] focus:border-transparent transition-all bg-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                  style={{ backgroundColor: '#102F4D' }}
                >
                  <Send size={20} />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Video Chat Modal */}
      {state.isVideoChat && (
        <VideoChat
          onClose={() => setState(prev => ({ ...prev, isVideoChat: false }))}
        />
      )}
    </div>
  );
}

export default App;