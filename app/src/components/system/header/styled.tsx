import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px 16px 32px;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #22223b;
  padding: 0;
  margin: 0;
`;

export const Online = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const UserLabel = styled.div`
  font-size: 15px;
  color: #6b7280;
`;

export const SettingsIcon = styled.div`
  font-size: 20px;
  color: #a1a1aa;
  cursor: pointer;
`;
