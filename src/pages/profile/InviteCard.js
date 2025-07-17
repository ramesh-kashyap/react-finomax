import React, { useState } from 'react';
import Toast from '../../components/Toast';
import { useTranslation } from 'react-i18next';

const InviteCard = ({ code = '7YKY7D', qrUrl = '/static/img/qr.png' }) => {
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
     setSuccess('Copied');
  };
 const [success, setSuccess] = useState('');
  
  const cardStyle = {
    background: 'linear-gradient(#51fbc1, #51fbc1)',
    borderRadius: '20px',
    padding: '24px 16px',
    // width: '300px',
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    boxShadow: '0 0 12px rgba(0, 0, 0, 0.2)',
    margin: 'auto',
  };

  const headerStyle = {
    // background: 'linear-gradient(rgb(255, 212, 41), #4edb57)',
    borderRadius: '20px 20px 0 0',
    height: '20px',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const messageStyle = {
    fontSize: '15px',
    fontWeight: 500,
    marginTop: '30px',
    marginBottom: '20px',
  };

  const qrStyle = {
    width: '180px',
    height: '180px',
    borderRadius: '12px',
    margin: 'auto',
    backgroundColor: '#fff',
    padding: '10px',
  };

  const codeBoxStyle = {
    backgroundColor: '#ffffff99',
    borderRadius: '12px',
    padding: '10px 16px',
    marginTop: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const captionStyle = {
    fontSize: '12px',
    marginTop: '6px',
    color: '#444',
  };

  return (

    
  <div style={cardStyle}>
  {success && <Toast message={success} onClose={() => setSuccess('')} />}
  
  <div style={headerStyle}></div>

  <p style={messageStyle}>
    {t('ShareMessageLine1')} <br />
    {t('ShareMessageLine2')}
  </p>

  <img src={qrUrl} alt="QR Code" style={qrStyle} />

  <div onClick={handleCopy} style={codeBoxStyle}>
    <span>{t('Invitation code')}</span> | 
    <span style={{ color: '#000' }}>{code}</span>
  </div>

  <div style={captionStyle} onClick={handleCopy}>
    {t('Click to copy the invitation code')}
  </div>
</div>
  );
};

export default InviteCard;