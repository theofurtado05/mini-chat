import { useState, useEffect } from 'react';
import {
  Container, MessagesArea, MessageCard, AvatarMsg, MsgContent, MsgAuthor, MsgText, MsgTime, InputArea, Input, SendButton,
} from './styled';
import { ModalChangeName } from './_components/modal-change-name';
import { HeaderComponent } from '../../components/system/header';

const mockMessages = [
  {
    id: '1',
    author: 'João',
    text: 'Olá, pessoal!',
    time: '16:11',
    color: '#A78BFA',
  },
  {
    id: '2',
    author: 'Maria',
    text: 'Oi, João! Tudo bem?',
    time: '16:12',
    color: '#F472B6',
  },
  {
    id: '3',
    author: 'João',
    text: 'Tudo ótimo! E com você?',
    time: '16:13',
    color: '#A78BFA',
  },
];

const usersOnline = 3;

export default function ChatPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState('');

  // Checar localStorage ao abrir a página
  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      setUserName(saved);
    } else {
      setShowModal(true);
    }
  }, []);

  // Salvar nome
  const handleSaveName = () => {
    if (modalInput.trim()) {
      setUserName(modalInput.trim());
      localStorage.setItem('currentUser', modalInput.trim());
      setShowModal(false);
    }
  };

  // Abrir modal para alterar nome
  const handleOpenModal = () => {
    setModalInput(userName);
    setShowModal(true);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        author: userName || 'Você',
        text: input,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        color: '#60A5FA',
      },
    ]);
    setInput('');
  };

  return (
    <Container>
      <ModalChangeName showModal={showModal} userName={userName} setShowModal={setShowModal} modalInput={modalInput} setModalInput={setModalInput} handleSaveName={handleSaveName} />
      <HeaderComponent usersOnline={usersOnline} userName={userName} handleOpenModal={handleOpenModal} />
      <MessagesArea>
        {messages.map((msg) => (
          <MessageCard key={msg.id} $color={msg.color} $isCurrent={msg.author === userName}>
            <AvatarMsg $color={msg.color}>{msg.author[0]}</AvatarMsg>
            <MsgContent>
              <MsgAuthor>{msg.author}</MsgAuthor>
              <MsgText>{msg.text}</MsgText>
              <MsgTime>{msg.time}</MsgTime>
            </MsgContent>
          </MessageCard>
        ))}
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

