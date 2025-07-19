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

  const greenText = { color: 'rgb(81, 251, 193)', fontWeight: 'bold' }; // green
  const redText = { color: '#ef4444', fontWeight: 'bold' };   // red
  const boldText = { fontWeight: 'bold' };

  return (
   <div style={boxStyle}>
  <div style={headingStyle}>{t('Withdrawal Rules')}</div>

  <div style={itemStyle}>
    1. The minimum withdrawal amount is <span style={greenText}>$25</span>.
  </div>

  <div style={itemStyle}>
   2. The maximum withdrawal per day is <span style={greenText}>$5,000</span>.
  </div>

  {/* <div style={itemStyle}>{t('withdraw_rule_3')}</div> */}
  <div style={itemStyle}>3. Users can make their first withdrawal after 72 hours</div>
  <div style={itemStyle}>4. Standard Withdrawal Processing Time: Within 12- 48 Hours.</div>
  {/* <div style={itemStyle}>{t('withdraw_rule_6')}</div> */}
  <div style={itemStyle}>5. <span style={{fontWeight:'800'}}>Handling Charge : 5% </span></div>
  <div style={itemStyle}>6. Wallet Address Change: Withdrawals will be disabled for 36 hours after any wallet address update</div>
  <div style={itemStyle}>7. Password Change: Withdrawals will be disabled for 24 hours after a password change.</div>
</div>
  );
};

export default WithdrawalGuidelines;