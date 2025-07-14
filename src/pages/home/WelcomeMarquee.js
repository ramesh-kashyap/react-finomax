import React from 'react';
import { useTranslation } from 'react-i18next';

const RechargeLogItem = () => {
    const { t } = useTranslation();

  const containerStyle = {
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    padding: '1px 13px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '10px',
  };

  const leftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
    filter:'brightness(0.4) invert(1)'
  };

    const wrapperStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    backgroundColor: '#1a1a1a',
    padding: '10px 0',
    color: 'rgb(249 247 243)',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  };


 const marqueeStyle = {
    display: 'inline-block',
    animation: 'scroll 15s linear infinite',
    width:'100%'
  };

  const keyframes = `
    @keyframes scroll {
      0%   { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;

  return (
    
    <div style={containerStyle}>
      <div style={leftStyle}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOHSURBVHgB7ZdBaxNBFMffJCtUUEg/gdOD0B5sNp+gKfgB1LskgVq82X6CpJ+g9SBCLaTePGlFPXgygicFTYulFaTZgqV4sq0VY5tkfG8zm7zZbNPsshaE/uEls9mZeb+ZeTPzAnCu/0wCzkBKqdTY5yUbCxKEcDav3anAWQGRc/yytaVrR/t26ds7+/2vXe7WgQvJyc2xggNxAikacdvxBJpXlt77g+YR3Pr6FHaODgNaB0NZMJjjFHOYhu4MpPq1e/D94wkwbq8SjhtlLEwamNAf4h5aVlsoEcj1L0+4oz38LCjVmsc4kuzFJI+pBATDEEgNrRQCBh1CFe0+2uzd7dcVs1OY2xifWoGEKPh+L/JHEQBT1CCnOa+gbWuIisDdwyuMri3igIRsd4o7Kz010n336A2wgdYvW8POSIH6NGMIYfIBMFRxBW0VzdHO96CPrq4v2tDUMCThwnNPj/HHrPd08aCRx68FA0jvmKKvb2wIM6cB+GU1RFbxuRcE0NVQ88JKPekGdNu3EGmvzGMoC2zLopYRJB8WRhNI/lS/ZFX5czVDy6OcTm2l7CCgnNkpzEFEKaE6I6bd5cWHUQcS1W59kQoCslm5J0gjS7lx1yOclX1WSUIAED/kHIhJKuSScyDecBjikwxTmQPxwJvQJ3UkKRhgVgRc6Ra7k8GB3rIywRQhovzxIWvlnsEJFsg8zjgQHUx8ZDP61A4PZM42DB02+IYB+1M5pdhWR6LtHiB93vi3egkb1tAILjvoMqqECQQt8z6sWyYgeq94JePqQKgFTc7PJIk233Gm3AONjJaYHDvYzpyRhlX9k2zsKW/nCjdfYsQiR+vkKdFSlQ4DBAidliBcDHk3PZl7542tLeWx9+7AdJoxuvEQ8yCrxuCMi7dfPnQDv55BRFHKmtt6xX4RTjLZutloibJQ/BBWhc3x6eVBgCS0cyJPNHpaJi9jPDWeCMjMpf1OzNnpC6ShCEjqR1qWEe+y1bEmwcypJW9PWWNu6yXsHAenscmmyqxnpqthgEpgxtICAs32qc//cbiQCGX7oeggVKBm+VKxd32ByAHNEl+eEkKFygQ+/NzN3q69kLifJvDQXP3dspadTCFCWtOGojPIr7KOsdg10P+yE44BL7V9DuYJz1WNluANCKXC64d5RcQPlddXSRiV4V+KYickWD5M/3H8t/csSHTPVeBcMeov73EzyLp14JsAAAAASUVORK5CYII=" // replace with your actual path
          alt="icon"
          style={iconStyle}
        />
     
      </div>
         <style>{keyframes}</style>
       <div style={wrapperStyle}>
       <div style={marqueeStyle}>
          {t('WelcomeMarquee')}
        </div>
        </div>
    </div>
  );
};

export default RechargeLogItem;