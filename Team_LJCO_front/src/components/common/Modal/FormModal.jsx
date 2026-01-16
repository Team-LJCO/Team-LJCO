/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from '../../../styles/common/Modal.style';

const FormModal = ({
  isOpen,
  title,
  children,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  isDelete = false,
}) => {
  if (!isOpen) return null;

  return (
    <div css={S.modalOverlay} onClick={onCancel}>
      <div css={S.formModalContent} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <div css={S.modalForm}>{children}</div>
        <div css={S.modalButtons}>
          <button css={S.cancelBtn} onClick={onCancel}>
            {cancelText}
          </button>
          <button css={isDelete ? S.confirmBtn : S.addConfirmBtn} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
