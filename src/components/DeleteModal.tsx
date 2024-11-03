import React from 'react';
import styles from '@/styles/DeleteModal.module.css';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p>ARE YOU SURE YOU WANT TO DELETE?</p>
        <div className={styles.modalActions}>
          <button className={styles.modalButtonYes} onClick={onConfirm}>
            YES
          </button>
          <button className={styles.modalButtonNo} onClick={onCancel}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
