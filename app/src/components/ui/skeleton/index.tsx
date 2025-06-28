import { SkeletonContainer, SkeletonAvatar, SkeletonContent, SkeletonLine } from './styled';

interface MessageSkeletonProps {
  count?: number;
}

export const MessageSkeleton = ({ count = 3 }: MessageSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonContainer key={index}>
          <SkeletonAvatar />
          <SkeletonContent>
            <SkeletonLine width="60px" height="16px" />
            <SkeletonLine width="200px" height="16px" />
            <SkeletonLine width="80px" height="12px" />
          </SkeletonContent>
        </SkeletonContainer>
      ))}
    </>
  );
}; 