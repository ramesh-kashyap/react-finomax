import React, { useState, useEffect } from 'react';

const PairCard = () => {
  const [pair, setPair] = useState(null);

  // List of crypto pairs and icons
  const pairs = [
    { name: 'ETH-BNB', icons: ['eth.png', 'bnb.png'] },
    { name: 'BTC-USDT', icons: ['btc.png', 'usdt.png'] },
    { name: 'ADA-ETH', icons: ['ada.png', 'eth.png'] },
    { name: 'SOL-DOT', icons: ['solana.png', 'dot.png'] },
    { name: 'XRP-BNB', icons: ['xrp.png', 'bnb.png'] },
  ];

  useEffect(() => {
    const random = pairs[Math.floor(Math.random() * pairs.length)];
    setPair(random);
  }, []);

  const cardStyle = {
    background: 'linear-gradient(135deg, rgb(40 40 43), rgb(27, 27, 30))',
    borderRadius: '16px',
    padding: '20px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    border: '1px solid #2a2a2a',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    marginTop:'10px'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const coinImgStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '-8px',
    border: '2px solid #121212',
    backgroundColor: '#000',
  };

  const chartWrapperStyle = {
    width: '100%',
    height: '100px',
    marginTop: '12px',
    marginBottom: '20px',
  };

  const infoRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#aaa',
  };

  const infoValueStyle = {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  if (!pair) return null;

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <img
          src={`/static/coin/${pair.icons[0]}`}
          alt={pair.name.split('-')[0]}
          style={coinImgStyle}
        />
        <img
          src={`/static/coin/${pair.icons[1]}`}
          alt={pair.name.split('-')[1]}
          style={{ ...coinImgStyle, marginLeft: '8px' }}
        />
        <span style={{ marginLeft: '12px' }}>{pair.name}</span>
      </div>

      <div style={chartWrapperStyle}>
        <svg width="100%" height="100%">
          <path
            d="M0,90 Q20,40 40,60 Q60,80 80,65 Q100,70 120,60 Q140,75 160,55 Q180,65 200,55 Q220,75 240,65 Q260,85 280,75 Q300,70 320,60"
            stroke="#51fbc1"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div style={infoRowStyle}>
        <div>
          <div>Transaction Amount</div>
          <div style={infoValueStyle}>0 USDT</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Rate Of Return</div>
          <div style={infoValueStyle}>0.8% - 1.5%</div>
        </div>
      </div>
    </div>
  );
};

export default PairCard;