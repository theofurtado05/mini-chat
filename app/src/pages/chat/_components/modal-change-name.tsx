import { Modal } from "../../../components/ui/modal";
import { ModalButton, ModalInput, ModalTitle } from "../../../components/ui/modal/styled";

export const ModalChangeName = ({ showModal, userName, setShowModal, modalInput, setModalInput, handleSaveName }: { showModal: boolean, userName: string, setShowModal: (show: boolean) => void, modalInput: string, setModalInput: (input: string) => void, handleSaveName: () => void }) => {
  return (
    <Modal open={showModal} onClose={userName ? () => setShowModal(false) : undefined} showClose={!!userName}>
        <ModalTitle>Digite seu nome</ModalTitle>
        <ModalInput
          autoFocus
          value={modalInput}
          onChange={e => setModalInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSaveName()}
          placeholder="Seu nome"
          maxLength={20}
        />
        <ModalButton onClick={handleSaveName} disabled={!modalInput.trim()}>
          Salvar
        </ModalButton>
    </Modal>

  )
};