import type { ReactNode } from 'react';
import { ModalOverlay, ModalContainer, ModalClose } from './styled';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  showClose?: boolean;
}

export const Modal = ({ open, onClose, children, showClose = true }: ModalProps) => {
  if (!open) return null;
  return (
    <ModalOverlay>
      <ModalContainer style={{ position: 'relative' }}>
        {showClose && onClose && (
          <ModalClose onClick={onClose} title="Fechar">×</ModalClose>
        )}
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};