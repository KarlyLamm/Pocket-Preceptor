import React from 'react';
import { MessageSquare, Video } from 'lucide-react';
import { Message } from '../types';
import nurseImage from '../assets/nurse-image.jpg';

interface ChatMessageProps {
  message: Message;
  onConnect: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onConnect }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex items-start gap-4 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden ${
        isAI ? 'bg-[#102F4D] text-white' : 'bg-gray-100'
      }`}>
        {isAI ? (
          <MessageSquare size={20} />
        ) : (
          <img 
            src={nurseImage} 
            alt="Nurse" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        isAI ? 'bg-[#102F4D] bg-opacity-10 border border-[#102F4D] border-opacity-20' : 'bg-gray-50 border border-gray-100'
      }`}>
        <p className="text-gray-800 leading-relaxed">{message.content}</p>
        <span className="text-xs text-gray-500 mt-2 block">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {message.showConnect && (
          <button
            onClick={onConnect}
            className="mt-4 flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-xl hover:bg-teal-600 transition-colors text-sm font-medium w-full justify-center"
          >
            <Video size={18} />
            <span>Connect with Preceptor</span>
          </button>
        )}
      </div>
    </div>
  );
};