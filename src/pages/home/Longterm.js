import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


const Longterm = () => {

const { t } = useTranslation();
  const navigate = useNavigate();
  const [validUsers, setValidUsers] = useState(0);
  const [claimedTasks, setClaimedTasks] = useState([]);
  const [vipLevel, setVipLevel] = useState(0);
  const [vipTask, setVipTasks] = useState([]);
    useEffect(() => {
    // fetchComBuRe();
    checkVip();
  }, []);

  const checkVip = async () => {
  try {
    const response = await Api.get("/get_comm");
    console.log(response.data);
    setVipTasks(response.data.results); // ✅ store array
  } catch (err) {
    console.error("Error fetching VIP level:", err);
  }
};
  //       const fetchComBuRe = async () => {
  //   try {
  //     const response = await Api.get("/vipterms");
  //     const claimed = response.data?.claimed || [];
  //     const claimedRewards = claimed.map(task => task.comm);
  //     setClaimedTasks(claimedRewards);
  //   } catch (err) {
  //     console.error("Failed to fetch claimed tasks", err);
  //   }
  // }
 
    const handleClaim = async (reward) => {
    try {
      await Api.post('/claimVip', { VipReward: reward });
      toast.success("Task claimed successfully!");
      checkVip();
    } catch (err) {
      toast.error(err.response?.data?.message || "Claim failed");
    }
  };
 
   const cardStyle = {
        background: 'linear-gradient(135deg, rgb(19 20 21), rgb(27, 27, 30))',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        border:'1px solid #464141'
    };
 
    const headingStyle = {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#51fbc1',
        background: 'linear-gradient(to bottom, #51fbc1, #ffffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
       
    };
 
    const subTextStyle = {
        fontSize: '14px',
        marginBottom: '10px',
        color: 'rgb(255 246 246)',
    };
 
    const rewardStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#51fbc1',
        margin: '10px 0',
         background: 'linear-gradient(to bottom, #51fbc1, #ffffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    };
 
    const progressBarBackground = {
        height: '8px',
        backgroundColor: '#444',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '10px',
    };
 
   
 
    const buttonStyle = {
        padding: '10px 16px',
        border: '1px solid #51fbc1',
        backgroundColor: 'transparent',
        color: '#51fbc1',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '100%',
        marginTop: '10px',
    };
 
 
 
   const vipTasks = [
  {
    title: t('Upgrade To VIP2'),
    description: t('Upgrade To VIP2 To Receive 40 USDT'),
    reward: 40,
    progress: 0,
    total: 2,
  },
  {
    title: t('Upgrade To VIP3'),
    description: t('Upgrade To VIP3 To Receive 160 USDT'),
    reward: 160,
    progress: 0,
    total: 3,
  },
  {
    title: t('Upgrade To VIP4'),
    description: t('Upgrade To VIP4 To Receive 360 USDT'),
    reward: 360,
    progress: 0,
    total: 4,
  },
];
 
     let remainingUsers = validUsers;
  const tasks = vipTasks.map((task, index) => {
    const canComplete = remainingUsers >= task.total;
    const progress = Math.min(task.total, remainingUsers);
    if (canComplete) remainingUsers -= task.total;
 
    return {
      ...task,
      progress,
      isCompleted: canComplete,
      isClaimed: claimedTasks.includes(task.reward),
      isUnlocked: vipLevel > index+1,
    };
  });
 
 

  const location = useLocation();
    const currentPath = location.pathname;
  
    const tabs = [
      { key: 'invitation', label: t('Rapid Rise Bonus'), path: '/MissionCenter' },
      { key: 'longterm', label: t('Community Rewards'), path: '/longterm' },
    ];
  
    const wrapperStyle = {
      display: 'flex',
      borderBottom: '1px solid #333',
      paddingBottom: '6px',
      marginBottom: '10px',
      marginTop:'20px'
    };
  
    const tabStyle = (isActive) => ({
      color: isActive ? '#fff' : '#888',
      fontWeight: isActive ? 'bold' : 'normal',
      paddingRight: '20px',
      fontSize: '16px',
      cursor: 'pointer',
      position: 'relative',
    });
  
    const underlineStyle = {
      position: 'absolute',
      bottom: '-6px',
      left: 0,
      height: '2px',
      width: '100%',
      backgroundColor: '#51fbc1',
    };
  
  

 
    return (
        <div class="uni-body pages-index-message">
            <uni-app class="uni-app--maxwidth">
                <uni-page data-page="pages/index/message">
                    <uni-page-wrapper>
                       <Toaster />
                        <uni-page-body>
                            <uni-view data-v-c62a6474="" class="page">
                                <uni-view data-v-c62a6474="" class="ellipse"></uni-view>
                                <uni-view data-v-c62a6474="" class="top-box">
                                    <uni-view data-v-636c600c="" data-v-c62a6474="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                            <Link to="/dashboard">
                                                <uni-view data-v-c62a6474="" class="back">
                                                    <img data-v-c62a6474="" src="/static/img/back.png" alt="" style={{ width: '35px', filter: 'brightness(6) invert(0)' }} />
                                                </uni-view>
                                            </Link>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                            <uni-view data-v-c62a6474="" class="page-title">{t('Community Rewards')}</uni-view>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingright: '0px' }}></uni-view>
                                    </uni-view>
                                </uni-view>
                                
                                    <div style={wrapperStyle}>
                                    {tabs.map((tab) => {
                                        const isActive = currentPath.includes(tab.path);
                                        return (
                                        <div
                                            key={tab.key}
                                            style={tabStyle(isActive)}
                                            onClick={() => navigate(tab.path)}
                                        >
                                            {tab.label}
                                            {isActive && <div style={underlineStyle} />}
                                        </div>
                                        );
                                    })}
                                    </div>

                                   {vipTask.map((task, index) => {
  const isClaimed = task.claimed;
  const isUnlocked = task.activeReferrals >= 1; // You can change condition
  const canClaim = task.qualified && !isClaimed;

  return (
    <div key={index} style={cardStyle}>
      <div style={headingStyle}>
        Community Growth Target: {task.team}
      </div>
      <div style={subTextStyle}>
        Invite {task.teamSizeRequired} users in both Power and Vicker Teams who each deposit 100 USDT to unlock this reward.
      </div>
      <div style={rewardStyle}>You receive a bonus of  {task.bonus} USDT</div>
      <div style={subTextStyle}>
        {task.activeReferrals}/{task.teamSizeRequired} Members
      </div>

      {isClaimed ? (
        <button
          style={{
            ...buttonStyle,
            backgroundColor: '#ccc0',
            color: '#555',
          }}
          disabled
        >
          Claimed
        </button>
      ) : (
        <button
          style={{
            ...buttonStyle,
            backgroundColor: canClaim ? '#51fbc1' : '#ccc0',
            color: canClaim ? '#000' : '#F5C144',
            opacity: canClaim ? 1 : 0.5,
            cursor: canClaim ? 'pointer' : 'not-allowed',
          }}
          disabled={!canClaim}
          onClick={() => handleClaim(task.bonus)}
        >
          Claim
        </button>
      )}
    </div>
  );
})}

                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>
 
            </uni-app>
 
        </div>
    );
};
 
export default Longterm;
 
 
 