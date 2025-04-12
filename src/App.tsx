import React, { useState, useRef, useEffect } from 'react';
import { Send, Video, Stethoscope } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { VideoChat } from './components/VideoChat';
import type { Message, ChatState } from './types';

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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Stethoscope size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Pocket Preceptor</h1>
              <p className="text-blue-600 font-medium">Your Personal Clinical Guide & Mentor</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[60vh] overflow-y-auto p-6 space-y-6">
            {state.messages.length === 0 && (
              <div className="text-center py-8">
                <div className="bg-blue-50 rounded-2xl p-6 inline-block">
                  <Stethoscope size={32} className="text-blue-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Pocket Preceptor</h2>
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
                  className="flex-1 border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
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