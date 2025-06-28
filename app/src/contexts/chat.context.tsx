import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Message } from '../types/message';


const ChatContext = createContext({
  messages: [] as Message[],
  //@ts-ignore
  setMessages: (messages: Message[]) => {},
});


export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);


  const exportValue = {
    messages,
    setMessages,
  }  
  return <ChatContext.Provider value={exportValue}>{children}</ChatContext.Provider>;
};


export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat deve ser usado dentro de um ChatProvider');
  }
  return context;
};
