import type { Message } from "../types/message";

export const messages: Message[] = [
    {
      id: 1,
      author: "João",
      text: "Olá, pessoal!",
      sendAt: new Date("2024-01-01T10:00:00Z"),
      color: "#A78BFA"
    },
    {
      id: 2, 
      author: "Maria",
      text: "Oi, João! Tudo bem?",
      sendAt: new Date("2024-01-01T10:05:00Z"),
      color: "#F472B6"
    },
    {
      id: 3,
      author: "João", 
      text: "Tudo ótimo! E com você?",
      sendAt: new Date("2024-01-01T10:10:00Z"),
      color: "#60A5FA"
    }
];

export const futureMessages: Message[] = [
    { author: "Maria", text: "Que bom! Estou bem também 😊", color: "#F472B6" },
    { author: "João", text: "Alguém quer jogar alguma coisa?", color: "#A78BFA" },
    { author: "Pedro", text: "Oi galera! Acabei de chegar", color: "#60A5FA" },
    { author: "Maria", text: "Oi Pedro! Bem-vindo!", color: "#F472B6" },
    { author: "João", text: "Que tal um jogo de cartas?", color: "#A78BFA" },
    { author: "Pedro", text: "Boa ideia! Qual jogo vocês preferem?", color: "#60A5FA" },
    { author: "Maria", text: "Eu gosto de truco!", color: "#F472B6" },
    { author: "João", text: "Perfeito! Vamos jogar truco então", color: "#A78BFA" },
    { author: "Pedro", text: "Quem vai ser o primeiro?", color: "#60A5FA" },
    { author: "Maria", text: "Vou embaralhar as cartas! 🃏", color: "#F472B6" }
  ];