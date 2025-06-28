import { useState, useEffect } from 'react';
import {
  Container, MessagesArea, MessageCard, AvatarMsg, MsgContent, MsgAuthor, MsgText, MsgTime, InputArea, Input, SendButton,
} from './styled';
import { ModalChangeName } from './_components/modal-change-name';
import { HeaderComponent } from '../../components/system/header';
import { useChat } from '../../contexts/chat.context';
import type { Message } from '../../types/message';
import { formatterDateMessage } from '../../lib/formatterDate';
import { getMessages } from '../../services/message.service';
import { MessageSkeleton } from '../../components/ui/skeleton';


export default function ChatPage() {
  const { messages, setMessages } = useChat();

  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Checar se existe um nome salvo no localStorage ao abrir a página
  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      setUserName(saved);
    } else {
      setShowModal(true);
    }
  }, []);

  //Carregar mensagens
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      
      // Simula um tempo de loading entre 300ms e 1.5 segundos
      const loadingTime = Math.random() * 1200 + 300; // 300ms a 1.5s
      await new Promise(resolve => setTimeout(resolve, loadingTime));
      
      const messages = await getMessages();
      setMessages(messages);
      setIsLoading(false);
    }
    loadMessages();
  }, []);

  // Salvar nome no localStorage
  const handleSaveName = () => {
    if (modalInput.trim()) {
      setUserName(modalInput.trim());
      localStorage.setItem('currentUser', modalInput.trim());
      setShowModal(false);
    }
  };

  // Abrir modal para alterar o nome
  const handleOpenModal = () => {
    setModalInput(userName);
    setShowModal(true);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        author: userName || 'Você',
        text: input,
        sendAt: new Date(),
        color: '#60A5FA',
      },
    ]);
    setInput('');
  };

  const usersOnline = 3;

  return (
    <Container>
      <ModalChangeName showModal={showModal} userName={userName} setShowModal={setShowModal} modalInput={modalInput} setModalInput={setModalInput} handleSaveName={handleSaveName} />
      <HeaderComponent usersOnline={usersOnline} userName={userName} handleOpenModal={handleOpenModal} />
      <MessagesArea>
        {isLoading ? (
          <MessageSkeleton count={4} />
        ) : (
          messages && messages.length > 0 && messages?.map((msg: Message) => (
            <MessageCard key={msg.id} $color={msg.color} $isCurrent={msg.author === userName}>
              <AvatarMsg $color={msg.color}>{msg.author[0]}</AvatarMsg>
              <MsgContent>
                <MsgAuthor>{msg.author}</MsgAuthor>
                <MsgText>{msg.text}</MsgText>
                <MsgTime>{msg.sendAt ? formatterDateMessage(msg.sendAt) : ''}</MsgTime>
              </MsgContent>
            </MessageCard>
          ))
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

