import React from 'react';

const WelcomePopup = ({ onClose }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const popupStyle = {
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#1e1e1e',
    borderRadius: '20px',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    padding: '20px',
    textAlign: 'center',
  };

  const logoStyle = {
    width: '101px',
    marginBottom: '10px',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const contentStyle = {
    padding: '16px',
    fontSize: '14px',
    lineHeight: '1.6',
    maxHeight: '300px',
    overflowY: 'auto',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    border: 'none',
    background: 'linear-gradient(#51fbc1, #21ffb4)',
    color: '#000',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '0 0 20px 20px',
    cursor: 'pointer',
  };

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <div style={headerStyle}>
          <img
            src="/static/img/image.png" // replace with actual logo
            alt="Finomax"
            style={logoStyle}
          />
          <div style={titleStyle}>Welcome to Finomax</div>
        </div>
        <div style={contentStyle}>
         Finomax AI ensure that every member associated with this us has a golden opportunity to earn lots of Money, respect and fullfill their dreams. Headquartered in Pinang Pulao, Malaysia. Finomax AI was established in April 2012
          <br /><br />
        At Finomax, our core advantage lies in leveraging intelligent arbitrage strategies to maximize profits while enhancing market visibility for partner products. Our automated system empowers users to earn genuine income effortlessly, while helping merchants achieve higher sales through seamless order fulfillment.

          <br /><br />
          This mutually rewarding model makes Finomax AI Arbitrage the preferred platform for both users and merchants in the digital commerce space.
        </div>
        <button style={buttonStyle} onClick={onClose}>Got it</button>
      </div>
    </div>
  );
};

export default WelcomePopup;