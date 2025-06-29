import type { Message } from '../types/message';
import { futureMessages, messages } from '../data/messages';

const sleep = (ms: number = 300): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * GET /messages
 * Retorna a lista completa de mensagens
 */
export const getMessages = async (): Promise<Message[]> => {
  await sleep();
  return [...messages];
};

/**
 * POST /messages
 * Recebe um objeto { author: string, text: string } e adiciona à lista de mensagens
 */
export const sendMessage = async (data: Message): Promise<Message> => {
  await sleep();
  
  const newMessage: Message = {
    id: messages.length + 1,
    author: data.author,
    text: data.text,
    sendAt: new Date(),
    color: data.color
  };
  
  messages.push(newMessage);
  
  return newMessage;
};

/**
 * GET /messages/future
 * Retorna a lista de mensagens futuras
 */
export const getFutureMessages = async (): Promise<Message[]> => {
  await sleep();
  return [...futureMessages];
};  

/**
 * GET /chat/users-online
 * Retorna o número de usuários online
 */
export const getUsersOnline = async (): Promise<number> => {
  await sleep();
  
  // Conta autores unicos na lista de mensagens
  const uniqueAuthors: string[] = [];

  for (let i = 0; i < messages.length; i++) {

    const author = messages[i].author;

    if (!uniqueAuthors.includes(author)) {
      uniqueAuthors.push(author);
    }
    
  }
  return uniqueAuthors.length;
};