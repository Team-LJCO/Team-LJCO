/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from '../../../styles/common/Modal.style';

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  isAdd = false,
}) => {
  if (!isOpen) return null;

  return (
    <div css={S.modalOverlay} onClick={onCancel}>
      <div css={S.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div css={S.modalButtons}>
          <button css={S.cancelBtn} onClick={onCancel}>
            {cancelText}
          </button>
          <button css={isAdd ? S.addConfirmBtn : S.confirmBtn} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
