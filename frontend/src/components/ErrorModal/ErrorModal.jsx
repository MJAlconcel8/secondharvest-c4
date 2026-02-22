import React from 'react';
import './ErrorModal.scss';

const ErrorModal = ({ show, message, onClose }) => {
  if (!show) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
