import React from 'react';

const LevelCard = ({
  level = 'VIP',
  status = 'Not achieved',
  description = 'Not unlocked this level yet',
  locked = true,
 backgroundImage = '/static/icons/level-icon.png'
}) => {
  const cardStyle = {
      backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '47px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    maxWidth: '450px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundSize: 'cover',
    marginTop:'10px',
        position: 'relative',
  };

  const statusBadgeStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'rgb(248 222 214)',
    color: '#6a4b2d',
    fontSize: '12px',
    padding: '4px 10px',
    borderRadius: '10px',
    fontWeight: 'bold',
  };

  const leftSection = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop:'12px',
    marginLeft:'-29px',
  };

  const levelStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'rgb(255 253 251)',
  };

  const descStyle = {
    fontSize: '14px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    // gap: '6px',
    marginTop:'9px'
  };

  const lockIconStyle = {
    width: '21px',
    height: '19px',
    marginRight: '4px',
  };

  const badgeStyle = {
    width: '60px',
    height: '60px',
  };

  return (
    <div style={cardStyle}>
      <div style={statusBadgeStyle}>{status}</div>

      <div style={leftSection}>
        <div style={levelStyle}>{level}</div>
        <div style={descStyle}>
         <img
          src={
            locked
              ? '/static/img/icons8-lock-96.png'
              : '/static/img/icons8-unlock-64.png'
          }
          alt={locked ? 'Locked' : 'Unlocked'}
          style={lockIconStyle}
        />
          {description}
        </div>
      </div>

    </div>
  );
};

export default LevelCard;