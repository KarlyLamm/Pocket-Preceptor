export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  showConnect?: boolean;
  showCommunityButton?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isVideoChat: boolean;
}