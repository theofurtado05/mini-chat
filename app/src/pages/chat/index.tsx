import { useState, useEffect, useRef } from 'react';
import {
  Container, MessagesArea, MessageCard, AvatarMsg, MsgContent, MsgAuthor, MsgText, MsgTime, InputArea, Input, SendButton,
} from './styled';
import { ModalChangeName } from './_components/modal-change-name';
import { HeaderComponent } from '../../components/system/header';
import { useChat } from '../../contexts/chat.context';
import type { Message } from '../../types/message';
import { formatterDateMessage } from '../../lib/formatterDate';
import { getMessages, getUsersOnline, sendMessage, getFutureMessages } from '../../services/message.service';
import { MessageSkeleton } from '../../components/ui/skeleton';


export default function ChatPage() {
  const { messages, setMessages } = useChat();

  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [usersOnline, setUsersOnline] = useState(0);
  const [futureMessages, setFutureMessages] = useState<Message[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  // refs para controlar envio automatico
  const autoSendIntervalRef = useRef<number | null>(null);
  const currentMessageIndexRef = useRef(0);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  // Função para fazer scroll para a última mensagem
  const scrollToBottom = () => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTo({
        top: messagesAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const loadMessages = async () => {
    setIsLoading(true);
    
    const loadingTime = Math.random() * 1200 + 300; // 300ms - 1.5s
    await new Promise(resolve => setTimeout(resolve, loadingTime));
    
    const messages = await getMessages();
    setMessages(messages);
    setIsLoading(false);
  }

  const loadFutureMessages = async () => {
    const futureMsgs = await getFutureMessages();
    setFutureMessages(futureMsgs);
  }

  const loadUsersOnline = async () => {
    const usersOnline = await getUsersOnline();
    setUsersOnline(usersOnline);
  }

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = await sendMessage({
      id: messages.length + 1,
      author: userName || 'Você',
      text: input,
      sendAt: new Date(),
      color: '#60A5FA',
    });
    setMessages((prev: Message[]) => [...prev, message]);
    setInput('');
  };
  
  const showTyping = (author: string) => {
    setTypingUser(author);
  };
  
  const hideTyping = () => {
    setTypingUser(null);
  };

  const startAutoSend = () => {
    if (autoSendIntervalRef.current) {
      return;
    }
    
    autoSendIntervalRef.current = setInterval(async () => {
      if (currentMessageIndexRef.current < futureMessages.length) {
        const messageData = futureMessages[currentMessageIndexRef.current];
        
        try {
          showTyping(messageData.author);
          
          await new Promise(resolve => setTimeout(resolve, 2000));

          hideTyping();
          
          const newMessage = await sendMessage({
            id: messages.length + 1,
            author: messageData.author,
            text: messageData.text,
            sendAt: new Date(),
            color: messageData.color
          });
          
          setMessages((prev: Message[]) => [...prev, newMessage]);
          currentMessageIndexRef.current++;
        } catch (error) {
          hideTyping();
        }
      } else {
        stopAutoSend();
      }
    }, 6000);
  };

  const stopAutoSend = () => {
    if (autoSendIntervalRef.current) {
      clearInterval(autoSendIntervalRef.current);
      autoSendIntervalRef.current = null;
    }
    hideTyping();
  };


  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      setUserName(saved);
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    loadMessages();
    loadFutureMessages();
    loadUsersOnline();
  }, []);

  useEffect(() => {
    if (!isLoading && futureMessages.length > 0) {
      const timer = setTimeout(() => {
        startAutoSend();
      }, 2000);

      return () => {
        clearTimeout(timer);
        stopAutoSend();
      };
    }
  }, [isLoading, futureMessages]);

  useEffect(() => {
    loadUsersOnline();
  }, [messages]);

  // Auto-scroll quando mensagens mudam
  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [messages, typingUser, isLoading]);

  const handleSaveName = () => {
    if (modalInput.trim()) {
      setUserName(modalInput.trim());
      localStorage.setItem('currentUser', modalInput.trim());
      setShowModal(false);
    }
  };

  const handleOpenModal = () => {
    setModalInput(userName);
    setShowModal(true);
  };

  useEffect(() => {
    return () => {
      stopAutoSend();
    };
  }, []);

  return (
    <Container>
      <ModalChangeName showModal={showModal} userName={userName} setShowModal={setShowModal} modalInput={modalInput} setModalInput={setModalInput} handleSaveName={handleSaveName} />
      <HeaderComponent usersOnline={usersOnline} userName={userName} handleOpenModal={handleOpenModal} />
      <MessagesArea ref={messagesAreaRef}>
        {isLoading ? (
          <MessageSkeleton count={4} />
        ) : (
          <>
            {messages && messages.length > 0 && messages?.map((msg: Message) => (
              <MessageCard key={msg.id} $color={msg.color} $isCurrent={msg.author === userName}>
                <AvatarMsg $color={msg.color}>{msg.author[0]}</AvatarMsg>
                <MsgContent>
                  <MsgAuthor>{msg.author === userName ? 'Você' : msg.author}</MsgAuthor>
                  <MsgText>{msg.text}</MsgText>
                  <MsgTime>{msg.sendAt ? formatterDateMessage(msg.sendAt) : ''}</MsgTime>
                </MsgContent>
              </MessageCard>
            ))}
            {typingUser && (
              <MessageCard $color="#E5E7EB" $isCurrent={false}>
                <AvatarMsg $color="#E5E7EB">{typingUser[0]}</AvatarMsg>
                <MsgContent>
                  <MsgAuthor>{typingUser}</MsgAuthor>
                  <MsgText style={{ fontStyle: 'italic', color: '#6B7280' }}>
                    está digitando...
                  </MsgText>
                </MsgContent>
              </MessageCard>
            )}
          </>
        )}
      </MessagesArea>
      <InputArea>
        <Input
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend} disabled={!input.trim()}>
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21v-6l13-3-13-3V3l18 9-18 9Z" fill="#93C5FD"/></svg>
        </SendButton>
      </InputArea>
    </Container>
  );
}

