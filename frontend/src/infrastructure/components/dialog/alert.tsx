import React, { useEffect } from 'react';

interface AlertProps {
  message: string;
  duration?: number; // en milisegundos
  onClose?: () => void;
};

const alertStyle: React.CSSProperties = {
  position: 'fixed',
  top: 24,
  right: 24,
  zIndex: 9999,
  minWidth: 280,
  background: '#fff1f0',
  color: '#cf1322',
  border: '1px solid #ffa39e',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  padding: '16px 40px 16px 16px',
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
};

const closeBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: 8,
  right: 12,
  background: 'none',
  border: 'none',
  fontSize: 18,
  color: '#cf1322',
  cursor: 'pointer',
};

const Alert: React.FC<AlertProps> = ({ message, duration = 4000, onClose } ) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div style={alertStyle}>
      <span style={{ marginRight: 8, fontWeight: 'bold' }}>¡Error!</span>
      <span>{message}</span>
      <button style={closeBtnStyle} onClick={onClose} aria-label="Cerrar">
        ×
      </button>
    </div>
  );
};

export default Alert;
