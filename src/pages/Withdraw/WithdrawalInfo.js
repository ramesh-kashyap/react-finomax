import React from 'react';
import { useTranslation } from 'react-i18next';

const WithdrawalGuidelines = () => {
  const { t } = useTranslation();

  const boxStyle = {
    background: 'linear-gradient(135deg, #151517, #2f2f33)',
    color: '#fff',
    padding: '20px',
    borderRadius: '20px',
    fontFamily: 'sans-serif',
    fontSize: '12px',
    lineHeight: '1.7',
    marginTop: '20px',
    border:'.5px solid rgba(82, 97, 98)'
  };

  const headingStyle = {
    color: '#51fbc1', // yellow
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '12px',
  };

  const itemStyle = {
    marginBottom: '8px',
  };

  const greenText = { color: '#10b981', fontWeight: 'bold' }; // green
  const redText = { color: '#ef4444', fontWeight: 'bold' };   // red
  const boldText = { fontWeight: 'bold' };

  return (
   <div style={boxStyle}>
  <div style={headingStyle}>{t('Withdrawal Rules')}</div>

  <div style={itemStyle}>
    {t('withdraw_rule_1')} <span style={greenText}>$30</span>.
  </div>

  <div style={itemStyle}>
    {t('withdraw_rule_2')} <span style={redText}>$5,000</span>.
  </div>

  <div style={itemStyle}>{t('withdraw_rule_3')}</div>
  <div style={itemStyle}>{t('withdraw_rule_4')}</div>
  <div style={itemStyle}>{t('withdraw_rule_5')}</div>
  <div style={itemStyle}>{t('withdraw_rule_6')}</div>
  <div style={itemStyle}>7. <span style={{fontWeight:'800'}}> Withdrawal Fee </span>: <br/> BEP20 8% + <span style={redText}>$2</span> fixed <br/>TRC20  8%  +  <span style={redText}> $6 </span> fixed.</div>
  <div style={itemStyle}>{t('withdraw_rule_8')}</div>
  <div style={itemStyle}>{t('withdraw_rule_9')}</div>
</div>
  );
};

export default WithdrawalGuidelines;