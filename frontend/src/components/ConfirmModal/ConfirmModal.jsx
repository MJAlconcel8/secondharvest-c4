import React from 'react'
import './ConfirmModal.scss'

const ConfirmModal = ({
  show,
  title,
  message,
  confirmLabel,
  cancelLabel,
  showCancel,
  onConfirm,
  onCancel
}) => {
  if (!show) {
    return null
  }

  const shouldShowCancel = showCancel !== false
  const actionsClassName = shouldShowCancel ? 'modal-actions' : 'modal-actions single-action'

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {title && <h3 className="modal-title">{title}</h3>}
        {message && <p className="modal-message">{message}</p>}
        <div className={actionsClassName}>
          {shouldShowCancel && (
            <button className="btn btn-secondary" onClick={onCancel}>
              {cancelLabel || 'Cancel'}
            </button>
          )}
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
