import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
 
import Api from "../../Requests/Api";
import { FaCopy } from 'react-icons/fa'; // Import the copy icon
import { toast } from "react-toastify";
import InviteCard from "./InviteCard";
import Toast from "../../components/Toast";
 import { useTranslation } from 'react-i18next';

const Refer = () => {
  const { t } = useTranslation();

  const [inviteLink, setInviteLink] = useState(null);
  const [username, setUsername] = useState(null);
  const [serR, setServerR] = useState(null);
  const [incomeData, setIncome] = useState([]);
  const [error, setError] = useState("");
   const [success, setSuccess] = useState('');
    
   const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await Api.get("/getinvate"); 
      if (response.data && response.data.data && response.data.data.username) { 
        const fetchedUsername = response.data.data.username; 
        setUsername(fetchedUsername); 
        // Construct the invite link with the username
        const inviteLink = `${window.location.origin}/register?inviteCode=${fetchedUsername}`;
        setInviteLink(inviteLink);
      } else {
        setInviteLink(null);
      } 
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching user data");
    }
  };
 
  useEffect(() => {
    fetchUsers();
    fetchRef();
    // fetchteam();
  }, []);
 
 
  const copyToClipboard = (text) => {
    // Create a dummy input to copy text from
    const dummyInput = document.createElement('input');
    document.body.appendChild(dummyInput);
    dummyInput.value = text;
    dummyInput.select();
    document.execCommand('copy'); // Execute the copy command
    document.body.removeChild(dummyInput); // Remove the dummy input element
    setSuccess('Invite link copied to clipboard!');
  };
 
 
  const fetchRef = async () => {
    try {
      const response = await Api.get(`/totalRef`); 
      if (response.data?.success) {
        setServerR(response.data.totalIncome || 0);
      }
    } catch (error) {
      console.error("Something went wrong fetching the wallet:", error);
    }
  };
  const fetchteam = async () => {        
    try {            
        const response =await Api.get('/getTeamRecord');
        if(response.data){
          setIncome(response.data);
        }
        // console.log(response.data)
    } catch (err) {
        setError(err.response?.data?.error || "Error fetching income");
    }
};
 
  const containerStyle = {
    background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    borderRadius: '16px',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const labelStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#fff',
  };

  const inputStyle = {
    backgroundColor: '#f3f3f3',
    borderRadius: '12px',
    padding: '11px 9px',
    fontSize: '13px',
    color: '#555',
    marginBottom: '16px',
    wordBreak: 'break-all',
  };

  const buttonStyle = {
    background: 'linear-gradient(rgb(45, 204, 69), #4edb57)',
    border: 'none',
    color: '#000',
    fontWeight: 'bold',
    padding: '12px',
    borderRadius: '12px',
    width: '100%',
    fontSize: '16px',
    cursor: 'pointer',
  };


  return (
 
    <div class="uni-body pages-user-invite">
         {success && <Toast message={success} onClose={() => setSuccess('')} />}
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/invite">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-0f43bbff="" class="page">
                <uni-view data-v-0f43bbff="" class="ellipse"></uni-view>
                <uni-view data-v-0f43bbff="" class="ellipse1"></uni-view>
                <uni-view data-v-0f43bbff="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-0f43bbff="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                     <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                        <uni-view data-v-0f43bbff="" class="back"><img data-v-0f43bbff="" src="/static/img/back.png" alt="" style={{ width: '35px',filter:'brightness(6) invert(0)' }} /></uni-view>
                       </div>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-0f43bbff="" class="page-title">{t('Invite Friends')}</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view>
                  </uni-view>
                </uni-view>


               
                <InviteCard
                  code={username}
                  qrUrl={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/register?sponsor=${username}`} // replace with your actual QR image path
                />



               <br></br>

              <div style={containerStyle}>
              <div style={labelStyle}>{t('Invitation link')}</div>
              <div style={inputStyle}>
                {inviteLink ? inviteLink : t('Invite link not available')}
              </div>
              <button style={buttonStyle} onClick={() => copyToClipboard(inviteLink)}>
                {t('Copy invitation link')}
              </button>
            </div>
                {/* <uni-view data-v-0f43bbff="" class="two-btn">
                  <uni-view data-v-0f43bbff="" class="btn-item">
                    <uni-view data-v-0f43bbff="" class="imgbox"><img data-v-0f43bbff="" src="/static/img/dollar.png" alt="" /></uni-view>
                    <uni-view data-v-0f43bbff="" class="value">$ {incomeData.data?.totalLevelIncome}</uni-view>
                    <uni-view data-v-0f43bbff="" class="title">Total Referral Commission</uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="btn-item">
                    <uni-view data-v-0f43bbff="" class="imgbox"><img data-v-0f43bbff="" src="/static/img/people2.png" alt=""/></uni-view>
                    <uni-view data-v-0f43bbff="" class="value">{incomeData.data?.totalActive}/<span data-v-0f43bbff="" >{incomeData.data?.totalDirect}</span></uni-view>
                    <uni-view data-v-0f43bbff="" class="title">Total Referrals</uni-view>
                  </uni-view>
                </uni-view> */}
              
               
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>
 
      </uni-app>
 
 
    </div>
  );
};
 
export default Refer;