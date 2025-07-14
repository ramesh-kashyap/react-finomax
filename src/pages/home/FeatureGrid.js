import React from 'react';
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const FeatureGrid = () => {
  const { t } = useTranslation();
       const navigate = useNavigate();
    
  const containerStyle = {
    // backgroundColor: '#0b0b0b',
    marginTop: '12px',
    // fontFamily: 'Arial, sans-serif',
    color: '#fff',
  };

  const cardWrapper = {
    display: 'flex',
    flexDirection: 'initial',
    gap: '9px',
  };

  const cardStyle = {
    borderRadius: '20px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // boxShadow: '0 0 10px rgba(245, 193, 68, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #4f585a',
    cursor:'pointer',
     background:'linear-gradient(135deg, #4e4e51, #1B1B1E)'
  };

  const textStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const imageStyle = {
    width: '55px',
    height: 'auto',
    objectFit: 'contain',
    // filter: "brightness(5) invert(0)"
  };

  const arrowStyle = {
    position: 'absolute',
    left: '76px',
    bottom: '18px',
    fontSize: '22px',
    color: '#51fbc1',
  };
   const navTeam = () => {
      navigate("/MissionCenter"); // 👈 Go back to the previous page in history
   };
   const navQuality = () => {
      navigate("/Refer"); // 👈 Go back to the previous page in history
   };

  return (
    <div style={containerStyle}>
      <div style={cardWrapper}>
        {/* Algorithm Order */}
     
        <div style={cardStyle} onClick={navTeam}>
          <div style={textStyle}>{t('ActivityCenter')}</div>
          <img src="/static/img/imagen.png" alt="Invite Friends" style={imageStyle}/>

          {/* <img
            src="/static/img/gift.png"
            alt="Algorithm Order"
            style={imageStyle}
          /> */}
          <span style={arrowStyle}>›</span>
        </div>



        {/* Invite Friends */}
        <div style={cardStyle} onClick={navQuality}>
          <div style={textStyle}>{t('InviteFriends')}</div>
          <img src="/static/img/imagew.png" alt="Invite Friends" style={imageStyle}/>
          {/* <img
            src="/static/img/refer.png"
            alt="Invite Friends"
            style={imageStyle}
          /> */}
          <span style={arrowStyle}>›</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;