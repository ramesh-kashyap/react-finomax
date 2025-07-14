import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const FeatureIconsBar = () => {
  const navigate = useNavigate();
const { t } = useTranslation();

  const containerStyle = {
    background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '700px',
    margin: 'auto',
    color: '#fff',
    marginTop: '10px',
    border: '1px solid #534e4e'
  };

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '13px',
    cursor: 'pointer',
  };

  const iconWrapperStyle = {
    backgroundColor: '#1c1c1c',
    borderRadius: '50%',
    padding: '3px',
    marginBottom: '6px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconImgStyle = {
    width: '30px',
    height: '30px',
  };

  const features = [
  {
    name: t('My Income'),
    icon: '/static/img/income.png',
    onClick: () => navigate('/transaction')
  },
  {
    name: t('VIP Upgrade'),
    icon: '/static/img/level.png',
    onClick: () => navigate('/vip')
  },
  {
    name: t('Terms Of Use'),
    icon: '/static/img/copy.png',
    onClick: () => navigate('/terms')
  },
  {
    name: t('Record'),
    icon: '/static/img/note.png',
    onClick: () => navigate('/bill')
  },
];

  return (
    <div style={containerStyle}>
      {features.map((item, index) => (
        <div key={index} style={itemStyle} onClick={item.onClick}>
          <div style={iconWrapperStyle}>
            <img src={item.icon} alt={item.name} style={iconImgStyle} />
          </div>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureIconsBar;
