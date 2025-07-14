import React, { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 2000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const toastStyle = {
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgb(65 60 60 / 80%)',
    color: 'rgb(248 235 235)',
    padding: '12px 20px',
    borderRadius: '12px',
    fontSize: '16px',
    zIndex: 9999,
    fontWeight: 'bold',
    maxWidth: '80%',
    textAlign: 'center',
  };

  return <div style={toastStyle}>{message}</div>;
};

export default Toast;