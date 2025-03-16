import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  src: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  modalIsOpen,
  closeModal,
  src,
  alt,
}) => {
  return (
    <ReactModal
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(41, 38, 38, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      <img src={src} alt={alt} />
    </ReactModal>
  );
};

export default ImageModal;
