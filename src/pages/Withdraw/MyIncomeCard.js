import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Api from '../../Requests/Api';
import { useTranslation } from 'react-i18next';

const MyIncomeCard = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [incomes, setIncomes] = useState("");
    const { t } = useTranslation();
     useEffect(() => {
            IncomeInfo();
        }, []);


           const IncomeInfo = async () => {
          try {
             const response = await Api.get("/incomeInfo");
             if (response.data) {
                console.log(response.data);
                setIncomes(response.data.data);
             }
          } catch (error) {
             console.error(error);
             setError(error);
          }
       }
  const cardStyle = {
    background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    borderRadius: '12px',
    padding: '14px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #2c2c2c',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '16px',
  };

  const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '8px 2px',
    // borderBottom:'0.02rem dashed rgb(205 172 54)'
  };

  const labelStyle = {
    color: '#fff',
    fontSize: '14px',
    textAlign:'center'
  };

  const valueStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
      textAlign:'center'
  };

  const dividerStyle = {
    borderTop: '1px dashed #333',
    margin: '12px 0',
  };
  

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
    <span>{t('My Income')}</span>
    <span onClick={() => navigate('/transaction')} style={{ color: '#51fbc1', fontSize: '18px', cursor: 'pointer' }}>↗</span>
  </div>

  <div style={sectionStyle}>
    <div>
      <div style={labelStyle}>{t('Total Income')}</div>
      <div style={valueStyle}>${incomes.totalIncome ? incomes.totalIncome : 0}</div>
    </div>
    <div>
      <div style={labelStyle}>{t("Today's Earnings")}</div>
      <div style={valueStyle}>${incomes.todayTotalIncome ? incomes.todayTotalIncome : 0}</div>
    </div>
  </div>

  <div style={sectionStyle}>
    <div>
      <div style={labelStyle}>{t('Quantify Income')}</div>
      <div style={valueStyle}>${incomes.tradingIncome ? incomes.tradingIncome : 0}</div>
    </div>
    <div>
      <div style={labelStyle}>{t("Today's Quantify Income")}</div>
      <div style={valueStyle}>${incomes.todayTradingIncome ? incomes.todayTradingIncome : 0}</div>
    </div>
  </div>

      {/* <div style={dividerStyle}></div>

      <div style={sectionStyle}>
        <div>
          <div style={labelStyle}> Team Income</div>
          <div style={valueStyle}>${incomes.teamIncome ? incomes.teamIncome : 0}</div>
        </div>
        <div>
          <div style={labelStyle}>Today's Team Income</div>
          <div style={valueStyle}>${incomes.todayTeamIncome ? incomes.todayTeamIncome : 0}</div>
        </div>
      </div> */}
    </div>
  );
};

export default MyIncomeCard;