import React from 'react';
import { MessageSquare, User, Video } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  onConnect: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onConnect }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex items-start gap-4 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
        isAI ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
      }`}>
        {isAI ? <MessageSquare size={20} /> : <User size={20} />}
      </div>
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        isAI ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
      }`}>
        <p className="text-gray-800 leading-relaxed">{message.content}</p>
        <span className="text-xs text-gray-500 mt-2 block">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {message.showConnect && (
          <button
            onClick={onConnect}
            className="mt-4 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors text-sm font-medium w-full justify-center"
          >
            <Video size={18} />
            <span>Connect with Preceptor</span>
          </button>
        )}
      </div>
    </div>
  );
};