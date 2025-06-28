import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 340px;
  margin-left: 32px;
  margin-right: auto;
  margin-bottom: 16px;
`;

export const SkeletonAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

interface SkeletonLineProps {
  width: string;
  height: string;
}

export const SkeletonLine = styled.div<SkeletonLineProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`; 