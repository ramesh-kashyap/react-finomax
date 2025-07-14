import React from 'react';
import { useTranslation } from 'react-i18next';

const DepositInfo = () => {
  const { t } = useTranslation();

  const containerStyle = {
   background: 'linear-gradient(135deg, #151517, #2f2f33)',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    fontFamily: 'sans-serif',
    fontSize: '12px',
    lineHeight: '1.7',
    marginTop: '20px',
    // boxShadow: '0 0 10px rgba(255, 215, 0, 0.05)',
     border:'.5px solid rgba(82, 97, 98)'
  };

  const warningStyle = {
    color: '#51fbc1', // yellow icon
    fontWeight: 'bold',
    marginRight: '6px',
  };

  const highlightText = {
    color: '#51fbc1', // warning yellow
    fontWeight: '500',
  };

  return (
   <div style={containerStyle}>
  <div>{t('Minimum Recharge')}: <strong>$10 USDT</strong></div>
  <div>{t('Only Networks Accepted')}</div>
  <div style={{ marginTop: '10px' }}>
    <span style={warningStyle}>⚠️</span>
    <span style={highlightText}>
      {t('Recharge Warning')}
    </span>
  </div>
</div>
  );
};

export default DepositInfo;