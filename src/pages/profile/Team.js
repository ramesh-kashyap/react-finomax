import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { useNavigate } from "react-router-dom";

import Api from "../../Requests/Api";
const Team = () => {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const copyToClipboard = () => {
    const textToCopy = document.getElementById('textToCopy').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const [power, setPower] = useState([]);
const [powerLeg, setPowerLeg] = useState('');
const [vickerLeg, setVickerLeg] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [income, setIncome] = useState([]);
  const [error, setError] = useState("");
  const [deposit, setDeposit] = useState("");
       const [withdraw, setWithdraw] = useState("");
  useEffect(() => {
    fetchteam();
    IncomeInfo();
    DepositInfo();
  }, []);

      const DepositInfo = async () => {
      try {
         const response = await Api.get("/depositInfo");
         if (response.data.success) {
      const userPackage = response.data.data.package;
      const withdraw = response.data.data.withdraw;
      // console.log("User package:", userPackage, withdraw);
      setWithdraw(withdraw);
      setDeposit(userPackage); // uncomment this to store it in state
    } else {
      console.error("Server error:", response.data.message);
    }
      } catch (error) {
    console.error("API error:", error);
    setError(error);
  }
   }
  const fetchteam = async () => {
    try {
      const response = await Api.get('/team');
      if (response.data) {
        setIncome(response.data);
      }
      // console.log(response.data)
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching income");
    }
  };


const fetchPower = async () => {
  try {
    const response = await Api.get('/powerteam');
    if (response.data?.success) {
      const user = response.data.data;
      setPowerLeg(user.power_leg);
      setVickerLeg(user.vicker_leg);
    }
  } catch (err) {
    setError(err.response?.data?.message || "Error fetching power data");
  }
};


useEffect(() => {
  fetchPower();
}, []);

   const IncomeInfo = async () => {
          try {
             const response = await Api.get("/incomeInfo");
             if (response.data) {
                setIncomes(response.data.data);
             }
          } catch (error) {
             console.error(error);
             setError(error);
          }
       }

  const cardStyle = {
    background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    borderRadius: '16px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    // width: '100%',
    // maxWidth: '480px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const colStyle = {
    flex: 1,
    textAlign: 'center',
  };

  const labelStyle = {
    color: '#aaa',
    fontSize: '14px',
    marginBottom: '4px',
  };

  const valueStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
  };

  const dividerStyle = {
    borderBottom: '0.02rem dashed rgb(205, 172, 54)',
    margin: '16px 0',
  };

  const buttonStyle = {
    marginTop: '20px',
    background: 'linear-gradient(#51fbc1, #21ffb4)',
    color: '#000',
    border: 'none',
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    cursor: 'pointer',
  };

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    //  backgroundColor: '#121212',
    padding: '6px 4px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    marginTop: '5px'
  };

  const titleStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
  };

  const buttonStyle2 = {
    border: '1px solid #333',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '14px',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const arrowStyle = {
    marginLeft: '6px',
    fontSize: '16px',
  };

  // team 
const m1 = income?.data?.gen_team1total || 0;
const m2 = income?.data?.gen_team2total || 0;
const m3 = income?.data?.gen_team3total || 0;
const m4 = income?.data?.gen_team4total || 0;
const m5 = income?.data?.gen_team5total || 0;

const total = m1 + m2 + m3 + m4 + m5 || 0; // prevent division by zero

const getArc = (start, percent) => {
  const radius = 60;
  const angle = (2 * Math.PI * percent) - 0.001;
  const endX = radius + radius * Math.sin(start + angle);
  const endY = radius - radius * Math.cos(start + angle);
  const largeArc = percent > 0.5 ? 1 : 0;

  const startX = radius + radius * Math.sin(start);
  const startY = radius - radius * Math.cos(start);

  return `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}
    L ${radius} ${radius}
    Z
  `;
};

const angles = [
  { value: m1, color: '#21ffb4', label: `LVL1 (${income?.data?.active_gen_team1total}/${income?.data?.gen_team1total})` },
  { value: m2, color: 'blue', label: `LVL2 (${income?.data?.active_gen_team2total}/${income?.data?.gen_team2total})` },
  { value: m3, color: 'orange', label: `LVL3 (${income?.data?.active_gen_team3total}/${income?.data?.gen_team3total})` },
  { value: m4, color: 'purple', label: `LVL4 (${income?.data?.active_gen_team4total}/${income?.data?.gen_team4total})` },
  { value: m5, color: 'red', label: `LVL5 (${income?.data?.active_gen_team5total}/${income?.data?.gen_team5total})` },
];

let currentAngle = 0;
const slices = angles.map((item) => {
  const percent = total === 0 ? 0 : item.value / total;
  const path = getArc(currentAngle, percent);
  currentAngle += 2 * Math.PI * percent;
  return { path, color: item.color, label: item.label };
});



  const containerStyle = {
    background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    borderRadius: '16px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    // maxWidth: '500px',
    margin: 'auto',
  };

  const rowStyleTeam = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const columnStyle = {
    flex: 1,
    textAlign: 'center',
  };


  const valueStyleTeam = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const smallTextStyle = {
    fontSize: '12px',
    // color: '#44ff77',
    marginTop: '2px',
  };

  const dividerStyleteam = {
    borderBottom: '0.02rem dashed rgb(205, 172, 54)',
    margin: '12px 0',
  };

  const pieWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const chartStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: 'blue',
  };

  const legendStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '12px',
    marginLeft: '20px',
  };

  const dotStyle = (color) => ({
    width: '10px',
    height: '10px',
    backgroundColor: color,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '6px',
  });

  const radioWrapper = {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '13px',
    marginBottom: '16px',
    color: '#aaa',
  };

  const inviteCard = {
    // background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    // borderRadius: '12px',
    // padding: '16px',
    marginTop: '24px',
    display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // border: '1px solid #726e6e'
  };

  const inviteText = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inviteTitle = {
    fontWeight: 'bold',
    fontSize: '15px',
    marginBottom: '4px',
    color: '#ffff',
  };

  const inviteSub = {
    fontSize: '13px',
    color: '#fff',
    marginBottom: '8px',
  };

  const inviteLink = {
    color: '#fff',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const inviteImgStyle = {
    width: '81px',
    height: '79px',
    filter: "brightness(5) invert(0)"
  };


const [activeTab, setActiveTab] = useState('Layer1');
const [hoveredIndex, setHoveredIndex] = useState(null);

const tabs = ['Layer1', 'Layer2', 'Layer3', 'Layer4', 'Layer5'];

const tabData = {
  Layer1: {
    members: `${income?.data?.active_gen_team1total || 0}/${income?.data?.gen_team1total || 0}`,
    teamDeposit: `$${income?.data?.gen_team1Recharge || 0}`,
    teamWithdraw: `$${income?.data?.gen_team1Withdraw || 0}`,
    teamIncome: `$${income?.data?.gen_team1Earning || 0}`,
  },
  Layer2: {
    members: `${income?.data?.active_gen_team2total || 0}/${income?.data?.gen_team2total || 0}`,
    teamDeposit: `$${income?.data?.gen_team2Recharge || 0}`,
    teamWithdraw: `$${income?.data?.gen_team2Withdraw || 0}`,
    teamIncome: `$${income?.data?.gen_team2Earning || 0}`,
  },
  Layer3: {
    members: `${income?.data?.active_gen_team3total || 0}/${income?.data?.gen_team3total || 0}`,
    teamDeposit: `$${income?.data?.gen_team3Recharge || 0}`,
    teamWithdraw: `$${income?.data?.gen_team3Withdraw || 0}`,
    teamIncome: `$${income?.data?.gen_team3Earning || 0}`,
  },
  Layer4: {
    members: `${income?.data?.active_gen_team4total || 0}/${income?.data?.gen_team4total || 0}`,
    teamDeposit: `$${income?.data?.gen_team4Recharge || 0}`,
    teamWithdraw: `$${income?.data?.gen_team4Withdraw || 0}`,
    teamIncome: `$${income?.data?.gen_team4Earning || 0}`,
  },
  Layer5: {
    members: `${income?.data?.active_gen_team5total || 0}/${income?.data?.gen_team5total || 0}`,
    teamDeposit: `$${income?.data?.gen_team5Recharge || 0}`,
    teamWithdraw: `$${income?.data?.gen_team5Withdraw || 0}`,
    teamIncome: `$${income?.data?.gen_team5Earning || 0}`,
  },
};


  const containerStyle2 = {
    // backgroundColor: '#121212',
    borderRadius: '12px',
    // padding: '16px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    // maxWidth: '500px',
    marginTop: '10px',
  };

  const tabHeaderStyle = {
    display: 'flex',
    borderBottom: '1px solid #2c2c2c',
    marginBottom: '12px',
  };

  const tabStyle = (isActive) => ({
    padding: '10px 16px',
    cursor: 'pointer',
    color: isActive ? '#fff' : '#888',
    fontWeight: isActive ? 'bold' : 'normal',
    borderBottom: isActive ? '2px solid #51fbc1' : 'none',
  });

  const cardStyle2 = {
    background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    borderRadius: '10px',
    padding: '16px',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const rowStyle2 = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#ccc',
  };

  const valueStyle2 = {
    color: '#fff',
  };



  return (
    <div class="uni-body pages-user-team">
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/team">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-1011963f="" class="page">
                <uni-view data-v-1011963f="" class="ellipse"></uni-view>


                <uni-view data-v-1011963f="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-1011963f="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/profile">

                        <uni-view data-v-1011963f="" class="back"><img data-v-1011963f="" src="/static/img/back.png" alt="" style={{ width: '35px', filter: 'brightness(6) invert(0)' }} /></uni-view>
                      </Link>

                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-1011963f="" class="page-title">{t('My Team')}</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view>
                  </uni-view>
                </uni-view>




               <div style={cardStyle}>
                <div style={rowStyle}>
                  <div style={colStyle}>
                    <div style={labelStyle}>{t('Total Income')}</div>
                    <div style={valueStyle}>${incomes.totalIncome ? incomes.totalIncome : 0}</div>
                  </div>
                  <div style={colStyle}>
                    <div style={labelStyle}>{t("Total Deposit")}</div>
                    <div style={valueStyle}>${deposit ? deposit : 0}</div>
                  </div>
                </div>

                <div style={dividerStyle}></div>

                <div style={rowStyle}>
                  <div style={colStyle}>
                    <div style={labelStyle}>{t('Team Income')}</div>
                    <div style={valueStyle}>${incomes.teamIncome ? incomes.teamIncome : 0}</div>
                  </div>
                  <div style={colStyle}>
                    <div style={labelStyle}>{t("Today's Team Income")}</div>
                    <div style={valueStyle}>${incomes.todayTeamIncome ? incomes.todayTeamIncome : 0}</div>
                  </div>
                </div>

                <button onClick={() => navigate('/bill')} style={buttonStyle}>
                  {t('Revenue Record')}
                </button>
              </div>

                <div style={wrapperStyle}>
                  <div style={titleStyle}>{t('My Team')}</div>
                  <button style={buttonStyle2}>
                    <Link to="/level" style={{ color: '#fff', textDecoration: 'none' }}>
                      {t('Team List')} <span style={arrowStyle}>›</span>
                    </Link>
                  </button>
                </div>


                <div style={containerStyle}>
                  {/* Top stats */}
                  <div style={rowStyleTeam}>
                <div style={columnStyle}>
                  <div>👥 {t('Number Of People In The Team')}</div>
                  <div style={valueStyleTeam}>{total}</div>
                  <div style={smallTextStyle}>
                    {t("Today's New")} <span style={{ color: '#51fbc1' }}>+{income?.data?.todaysUser}</span>
                  </div>
                </div>
                <div style={columnStyle}>
                  <div>💰 {t("Total Earnings")}</div>
                  <div style={valueStyleTeam}>${incomes.teamIncome ? incomes.teamIncome : 0}</div>
                  <div style={smallTextStyle}>
                    {t("Today's New")} <span style={{ color: '#51fbc1' }}>+{incomes.todayTeamIncome ? incomes.todayTeamIncome : 0}</span>
                  </div>
                </div>
              </div>

                  <div style={dividerStyleteam}></div>

                  {/* Toggle text */}

                  {/* Pie + legend */}
                  {/* Pie + legend */}
                  <div style={pieWrapper}>
                  <svg style={chartStyle} viewBox="0 0 120 120">
                    {slices.map((s, i) => (
                      <path
                        key={i}
                        d={s.path}
                        fill={s.color}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    ))}
                  </svg>


                  {hoveredIndex !== null && (
                    <div style={{
                      position: 'relative',
                      left: '0px',
                      top: '10px',
                      backgroundColor: '#0e0e0e',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                      pointerEvents: 'none',
                      border: `1px solid ${slices[hoveredIndex].color}`
                    }}>
                      {slices[hoveredIndex].label}
                    </div>
                  )}

               <div style={legendStyle}>
  <div>
    <span style={dotStyle('#21ffb4')}></span> Layer 1 ({income?.data?.active_gen_team1total}/{income?.data?.gen_team1total})
  </div>
  <div>
    <span style={dotStyle('blue')}></span> Layer 2 ({income?.data?.active_gen_team2total}/{income?.data?.gen_team2total})
  </div>
  <div>
    <span style={dotStyle('orange')}></span> Layer 3 ({income?.data?.active_gen_team3total}/{income?.data?.gen_team3total})
  </div>
  <div>
    <span style={dotStyle('purple')}></span> Layer 4 ({income?.data?.active_gen_team4total}/{income?.data?.gen_team4total})
  </div>
  <div>
    <span style={dotStyle('red')}></span> Layer 5 ({income?.data?.active_gen_team5total}/{income?.data?.gen_team5total})
  </div>
</div>
</div>


                  {/* Invite card */}
                 <div style={inviteCard}>
                      <div style={columnStyle}>
                  <div><img data-v-3dcfa33c="" src="/static/img/teama.png" alt="" style={{width:'12px'}}/> {t('Power Team Member ')}</div>
                  <div style={valueStyleTeam}>{powerLeg}</div>
                 
                </div>
                   <div style={columnStyle}>
                  <div><img data-v-3dcfa33c="" src="/static/img/teama.png" alt="" style={{width:'12px'}}/>  {t("Support Team Member")}</div>
                  <div style={valueStyleTeam}>{vickerLeg}</div>
                
                </div>
                      
                    </div>
                </div>






                <div style={containerStyle2}>
                  {/* Tabs */}
                  <div style={tabHeaderStyle}>
                    {tabs.map((tab) => (
                      <div
                        key={tab}
                        style={tabStyle(tab === activeTab)}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                 <div style={cardStyle2}>
                <div style={rowStyle2}>
                  <span>{t('Team Members')}</span>
                  <span style={valueStyle2}>{tabData[activeTab].members}</span>
                </div>
                <div style={rowStyle}>
                  <span>{t('Team Deposits')}</span>
                  <span style={valueStyle2}>{tabData[activeTab].teamDeposit}</span>
                </div>
                <div style={rowStyle}>
                  <span>{t('Team Withdrawal')}</span>
                  <span style={valueStyle2}>{tabData[activeTab].teamWithdraw}</span>
                </div>
                <div style={rowStyle}>
                  <span>{t('Team Commission')}</span>
                  <span style={valueStyle2}>{tabData[activeTab].teamIncome}</span>
                </div>
              </div>
                </div>

                <uni-view data-v-1011963f="" class="member-list" style={{ display: 'none', filter: 'brightness(0.72) invert(0)' }}>
                  <uni-view data-v-1011963f="" class="nodata"><img data-v-1011963f="" src="/static/img/noteam.png" alt="" />No Data</uni-view>
                </uni-view>
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>
      </uni-app>
    </div>
  );
};

export default Team;