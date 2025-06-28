import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fb;
`;




export const MessagesArea = styled.div`
  flex: 1;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
`;

export const MessageCard = styled.div<{ $color: string; $isCurrent: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 340px;
  margin-left: ${({ $isCurrent }) => ($isCurrent ? 'auto' : '32px')};
  margin-right: ${({ $isCurrent }) => ($isCurrent ? '32px' : 'auto')};
`;

export const AvatarMsg = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
`;

export const MsgContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  padding: 10px 16px 8px 16px;
  min-width: 120px;
`;

export const MsgAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
`;

export const MsgText = styled.div`
  font-size: 16px;
  color: #22223b;
  margin: 2px 0 4px 0;
`;

export const MsgTime = styled.div`
  font-size: 12px;
  color: #a1a1aa;
  text-align: right;
`;

export const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 32px;
  background: #fff;
  border-top: 1px solid #f1f1f1;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  font-size: 16px;
  outline: none;
  background: #f8f9fb;
`;

export const SendButton = styled.button`
  background: #e0e7ff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

