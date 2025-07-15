import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const CheckUsers = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
    const [Users, setUsers] = useState(0);
    const [error, setError] = useState("");
    const [claimedTasks, setClaimedTasks] = useState([]);
    const [qualifiedTasks, setQualifiedTasks] = useState([]);
    const [qualifiedTasks, setQualifiedTasks] = useState([]);
    useEffect(() => {
        fetchClaimedTasks();
        const interval = setInterval(() =>{
            fetchClaimedTasks();
        },1000);
        return () => clearInterval(interval);
        const interval = setInterval(() =>{
            fetchClaimedTasks();
        },1000);
        return () => clearInterval(interval);
        checkUsers();        
    }, []);
    const checkUsers = async () => {
    try {
        const response = await Api.get("/checkusers");
        setUsers(parseInt(response.data?.countSponor || 0)); // 💡 ensure it's a number
    } catch (err) {
        setError(err.response?.data?.error || "Error fetching history");
    }
};

    
       const fetchClaimedTasks = async () => {
    try {
        const response = await Api.get("/checkClaimed");
        const claimed = response.data;
        console.log(response.data);
         const results = response.data?.results || [];
    setQualifiedTasks(results);
    } catch (err) {
        console.error("Failed to fetch claimed tasks", err);
    }
};


    const handleClaim = async (bonus) => {
  try {
    const res = await Api.post('/claimRRB', { taskReward: bonus});  
    toast.success("Rapid Rise Bonus claimed successfully!");
    fetchClaimedTasks(); // refresh claim list
  } catch (err) {
    toast.error(err.response?.data?.message || "Claim failed");
  }
};
    const handleClaim = async (bonus) => {
  try {
    const res = await Api.post('/claimRRB', { taskReward: bonus});  
    toast.success("Rapid Rise Bonus claimed successfully!");
    fetchClaimedTasks(); // refresh claim list
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
        fontSize: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#51fbc1',
        background: 'linear-gradient(to bottom, #51fbc1, #ffffff)',
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

    const progressBarFill = (progress) => ({
        height: '100%',
        width: `${progress}%`,
        backgroundColor: '#51fbc1',
    });

    const buttonStyle = {
        padding: '10px 16px',
        border: '1px solid #51fbc1',
        backgroundColor: 'transparent',
        color: '#51fbc1',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '90%',
        width: '90%',
        marginTop: '10px',
    };



   const rawTasks = [
  {
    title: t('task.invite_3_title'),
    description: t('task.invite_3_desc'),
    reward: 18,
    progress: 0,
    total: 3,
  },
  {
    title: t('task.invite_6_title'),
    description: t('task.invite_6_desc'),
    reward: 36,
    progress: 0,
    total: 6,
  },
  {
    title: t('task.invite_12_title'),
    description: t('task.invite_12_desc'),
    reward: 72,
    progress: 0,
    total: 12,
  },
  {
    title: t('task.invite_24_title'),
    description: t('task.invite_24_desc'),
    reward: 144,
    progress: 0,
    total: 24,
  },
  {
    title: t('task.invite_48_title'),
    description: t('task.invite_48_desc'),
    reward: 288,
    progress: 0,
    total: 48,
  },
  {
    title: t('task.invite_96_title'),
    description: t('task.invite_96_desc'),
    reward: 576,
    progress: 0,
    total: 96,
  },
];

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


    let usedUsers = 0;

const tasks = rawTasks.map((task) => {
    const requiredUsers = task.total;
    const isClaimed = claimedTasks.includes(task.reward);

    let progress = 0;
    let isCompleted = false;

    if (isClaimed) {
        // Already claimed → assume users were used
        progress = requiredUsers;
        isCompleted = true;
        usedUsers += requiredUsers;
    } else {
        // Available users = total invited - already used in claimed tasks
        const availableUsers = Users - usedUsers;

        if (availableUsers >= requiredUsers) {
            progress = requiredUsers;
            isCompleted = true;
            usedUsers += requiredUsers;
        } else {
            progress = Math.max(0, availableUsers);
            isCompleted = false;
            usedUsers += progress; // Even partial users count as attempted
        }
    }

    return {
        ...task,
        progress,
        isCompleted,
        isClaimed,
    };
});




    return (
        <div class="uni-body pages-index-message">
            <uni-app class="uni-app--maxwidth">
                <uni-page data-page="pages/index/message">
                    <uni-page-wrapper>
                        <Toaster />
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
                                            <uni-view data-v-c62a6474="" class="page-title">{t('Rapid Rise Bonus')}</uni-view>
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


   {qualifiedTasks.map((task, index) => {
  const isClaimed = task?.claimed === true;
  const canClaim = task.qualified === true;
  const isExpired = task.timeLeft === "Expired";
  const showTimer = typeof task.timeLeft === "object" && !canClaim;

  return (
    <div key={index} style={cardStyle}>
      <div style={headingStyle}>
        Invited {task.team} Valid users within {task.days} days
      </div>
      <div style={subTextStyle}>
        You Invite {task.teamSizeRequired} Person within {task.days} Days and they deposit 100 into their Finomax account. You receive {task.bonus} Bonus
      </div>
      <div style={rewardStyle}>
        {t('Reward')}: {task.bonus} USDT
      </div>
      <div style={progressBarBackground}>
        <div style={progressBarFill((task.activeReferrals / task.teamSizeRequired) * 100)} />
      </div>
      <div style={subTextStyle}>
        {task.activeReferrals}/{task.teamSizeRequired}
      </div>

      {isClaimed || isExpired ? (
        <button
          style={{ ...buttonStyle, backgroundColor: '#ccc0', color: '#555' , width:"100%"}}
          disabled
        >
          {isExpired ? "Expired" : "Claimed"}
        </button>
      ) : canClaim ? (
        <button
          style={{
            ...buttonStyle,
            backgroundColor: '#51fbc1',
            color: '#000',
            cursor: 'pointer',
            opacity: 1,
            width: "100%"
          }}
          onClick={() => handleClaim(task.bonus.replace("$", ""))}
        >
          Claim
        </button>
      ) : showTimer ? (
        <div style={{ ...buttonStyle, textAlign: 'center', cursor: 'default' }}>
          ⏳ {task.timeLeft.days}d {task.timeLeft.hours}h {task.timeLeft.minutes}m {task.timeLeft.seconds}s
        </div>
      ) 
      : (
        <button
          style={{
            ...buttonStyle,
            backgroundColor: 'transparent',
            color: '#aaa',
            cursor: 'not-allowed',
            opacity: 0.5
          }}
          disabled
        >
          Not Eligible
        </button>
      )
      }
    </div>
  );
})}


   {qualifiedTasks.map((task, index) => {
  const isClaimed = task?.claimed === true;
  const canClaim = task.qualified === true;
  const isExpired = task.timeLeft === "Expired";
  const showTimer = typeof task.timeLeft === "object" && !canClaim;

  return (
    <div key={index} style={cardStyle}>
      <div style={headingStyle}>
        Invited {task.team} Valid users within {task.days} days
      </div>
      <div style={subTextStyle}>
        You Invite {task.teamSizeRequired} Person within {task.days} Days and they deposit 100 into their Finomax account. You receive {task.bonus} Bonus
      </div>
      <div style={rewardStyle}>
        {t('Reward')}: {task.bonus} USDT
      </div>
      <div style={progressBarBackground}>
        <div style={progressBarFill((task.activeReferrals / task.teamSizeRequired) * 100)} />
      </div>
      <div style={subTextStyle}>
        {task.activeReferrals}/{task.teamSizeRequired}
      </div>

      {isClaimed || isExpired ? (
        <button
          style={{ ...buttonStyle, backgroundColor: '#ccc0', color: '#555' , width:"100%"}}
          disabled
        >
          {isExpired ? "Expired" : "Claimed"}
        </button>
      ) : canClaim ? (
        <button
          style={{
            ...buttonStyle,
            backgroundColor: '#51fbc1',
            color: '#000',
            cursor: 'pointer',
            opacity: 1,
            width: "100%"
          }}
          onClick={() => handleClaim(task.bonus.replace("$", ""))}
        >
          Claim
        </button>
      ) : showTimer ? (
        <div style={{ ...buttonStyle, textAlign: 'center', cursor: 'default' }}>
          ⏳ {task.timeLeft.days}d {task.timeLeft.hours}h {task.timeLeft.minutes}m {task.timeLeft.seconds}s
        </div>
      ) 
      : (
        <button
          style={{
            ...buttonStyle,
            backgroundColor: 'transparent',
            color: '#aaa',
            cursor: 'not-allowed',
            opacity: 0.5
          }}
          disabled
        >
          Not Eligible
        </button>
      )
      }
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

export default CheckUsers;




