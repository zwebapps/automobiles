import { useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from "@coreui/react";

type ConfirmDialogProps = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmColor?: string; // e.g. "danger", "primary"
  visible?: boolean; // Add external visibility control
  showButton?: boolean; // Option to show/hide the internal button
};

export function ConfirmDialog({
  title = "Confirm",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmColor = "primary",
  onConfirm,
  onCancel,
  visible: externalVisible,
  showButton = true,
}: ConfirmDialogProps) {
  const [internalVisible, setInternalVisible] = useState(false);
  
  // Use external visibility if provided, otherwise use internal state
  const visible = externalVisible !== undefined ? externalVisible : internalVisible;

  const open = () => setInternalVisible(true);
  const close = () => {
    setInternalVisible(false);
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
    setInternalVisible(false);
  };

  return (
    <>
      {/* Only show button if showButton is true */}
      {showButton && (
        <CButton color={confirmColor} onClick={open}>
          {confirmText}
        </CButton>
      )}

      <CModal visible={visible} onClose={close}>
        {title && <CModalHeader>{title}</CModalHeader>}
        <CModalBody>{message}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={close}>
            {cancelText}
          </CButton>
          <CButton color={confirmColor} onClick={handleConfirm}>
            {confirmText}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
