import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Requests/Api.js";
import { Toaster, toast } from 'react-hot-toast';
import WithdrawalInfo from "./WithdrawalInfo";
import Toast from "../../components/Toast";
import moment from 'moment-timezone';

import { useTranslation } from 'react-i18next';

const WithdrawReq = () => {
  const { t } = useTranslation();
  const [wallets, setWallets] = useState({ bep20: "", trc20: "" });
  const [selectedWallet, setSelectedWallet] = useState("");
    const [adate, setAdate] = useState(null);
  const [amount, setAmount] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [availbal, setAvailableBal] = useState();
  const [walletType, setWalletType] = useState("");
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(0);
  const [detailChangeDate, setChangedDate] = useState(null);
  const [unlockTime, setUnlockTime] = useState(null);
  const [unlockHours, setUnlockHours] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [pop, setPop] = useState(false);
   const [success, setSuccess] = useState('');
  
  useEffect(() => {
    withfatch();
    withreq();
  }, [])

  const withfatch = async () => {
  try {
    const response = await Api.get("/availbal");
    console.log(response.data);
    if (response.data) {
              setAvailableBal(response.data.AvailBalance);
    } 
  } catch (error) {
    console.error(error);
    // setSuccess("Error submitting withdraw request.");
  }
  };
  const handleSendRequest = async () => {
    try {
      setCooldown(60);
      const response = await Api.post('/sendotp');
      // console.log(response);
      if (response) {
       setSuccess('OTP sent successfully');
        setTimeout(() => setSuccess(""), 2000); // fallback manual close
        // console.log('OTP sent successfully:', response.data);
      } else {
        setSuccess('Failed to send OTP');
        // console.warn('Failed to send OTP:', response.data.message);
      }
    } catch (error) {
      setSuccess('Error sending OTP');
    }
  };
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  const handleSubmit = async () => {
    try {
       if (!amount || !walletType || !selectedWallet || !verificationCode) {
      setSuccess("All fields are required."); // Show error message
      return;
    }

      // Assuming you have a backend endpoint to process the withdrawal request
      if(amount<30)
      {
        setSuccess('Minimum withdrawal amount is 25');
        return false;
      }

       if (isDisabled) {
        setPop(true); // Set pop-up variable to true
        return;
      }


      const response = await Api.post("/process-withdrawal", {
        wallet: selectedWallet,
        type: walletType,
        amount: amount,
        verificationCode: verificationCode,
      });
      if (response.data.success) {
        setSuccess(response.data.message);
        // setSelectedWallet("");
        // setWalletType("");
        setAmount("");
        setVerificationCode("");
        withfatch();
      } else {
        setSuccess(response.data.message);
      }
    } catch (error) {
      setSuccess("Error processing withdrawal");
    }
  };

  const withreq = async () => {
    try {
      const response = await Api.get("/withreq");
      if (response.data.success) {
          const changedDate = response.data.detail_changed_date;
        const addressDate = response.data.adate;
        setChangedDate(changedDate);
        setAdate(addressDate);

        // Now process unlockTime calculation
      if (addressDate) {
        let unlockDate = moment(addressDate).add(72, 'hours'); // Default: 72h from addressDate

        if (changedDate) {
          const changedMoment = moment(changedDate);

          // 🛠️ If changedDate is already the unlock date, just use it as-is
          if (changedMoment.isAfter(unlockDate)) {
            unlockDate = changedMoment.clone(); // Do NOT add extra 48h here
          }
        }

        const now = moment();
        const remainingHours = unlockDate.diff(now, 'hours');

        setUnlockTime(unlockDate.toDate()); // JS Date object for countdowns
        setUnlockHours(remainingHours);
        setIsDisabled(now.isBefore(unlockDate)); // Button disabled if now < unlock time
      }

        setWallets({
          bep20: response.data.bep20,
          trc20: response.data.trc20,
        });
      }
       if (response.data.bep20 && response.data.trc20) {
        setSelectedWallet(response.data.bep20);
        setWalletType("BEP20");
      }
    } catch (error) {
      console.error(error);
      // setSuccess("Error fetching wallet addresses.");
    }
  };

  const handleSuccess = () => {
    navigate("/add-wallet");
  };
  const backClick = () => {
    navigate(-1); // 👈 Go back to the previous page in history
};
  return (
    
    <div class="uni-body pages-user-withdrawal" > <uni-app class="uni-app--maxwidth"><uni-page data-page="pages/user/withdrawal"> 
      {success && <Toast message={success} onClose={() => setSuccess('')} />}
      <uni-page-wrapper><uni-page-body><uni-view data-v-53c5f33f="" class="page">
      <uni-view data-v-53c5f33f="" class="ellipse"></uni-view><uni-view data-v-53c5f33f="" class="top-box">
        <uni-view data-v-636c600c="" data-v-53c5f33f="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
          <uni-view data-v-35b9a113="" data-v-53c5f33f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
     
        <Toaster position="top-right" reverseOrder={false} />
        <uni-view data-v-53c5f33f="" class="back"onClick={backClick}>
          <img data-v-53c5f33f="" src="/static/img/back.png" alt="" style={{ width: '35px',filter: 'brightness(6) invert(0)' }} /></uni-view>

     
    </uni-view><uni-view data-v-35b9a113="" data-v-53c5f33f="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}><uni-view data-v-53c5f33f="" class="page-title">{t('Withdrawal')}</uni-view></uni-view><uni-view data-v-35b9a113="" data-v-53c5f33f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
        <Link to="/withdraw-history">
          <uni-view data-v-53c5f33f="" class="records"><img data-v-53c5f33f="" src="/static/img/records.png" alt="" style={{ width: '25px', marginTop: '5px' ,filter: 'brightness(6) invert(0)'}} /></uni-view>

        </Link>
      </uni-view></uni-view></uni-view>
      <uni-view data-v-53c5f33f="" class="balance-box"><uni-view data-v-53c5f33f="" translate="no" class="value">$ {availbal}</uni-view>
      <uni-view data-v-53c5f33f="" class="title">{t('Available Balance')}</uni-view></uni-view>
      <uni-view data-v-53c5f33f="" class="content">
        <uni-view data-v-53c5f33f="" class="input-layer">
          {/* <uni-view data-v-53c5f33f="" class="input-title">{t('Wallet Type')}</uni-view> */}
      

          {/* <uni-view style={{ display: 'flex', gap: '10px' }}>
            <uni-view  data-v-53c5f33f="" 
              class="item"
              onClick={() => {
                setSelectedWallet(wallets.trc20);
                setWalletType("TRC20");
              }}
              style={{
                backgroundColor: walletType === "TRC20" ? '#000000' : 'rgb(30 23 23)',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: walletType === "TRC20" ? '#fff' : 'rgb(233 218 218)',
                border: '1px solid #51fbc1'
              }}
            >
              <img  data-v-53c5f33f=""  src="/static/img/USDT.png" alt="" style={{ marginRight: '8px', filter: "brightness(5) invert(0)" }} />TRC20

               {walletType === "TRC20" && (
                <span style={{
                  position: 'relative',
                  top: '1px',
                  right: '-6px',
                  color: '#00ff00',
                  fontWeight: 'bold',
                  fontSize:'xx-small'
                }}>
                  ✅
                </span>
              )}
            </uni-view>

            <uni-view  data-v-53c5f33f="" 
              class="item"
              onClick={() => {
                setSelectedWallet(wallets.bep20);
                setWalletType("BEP20");
              }}
              style={{
                backgroundColor: walletType === "BEP20" ? '#000000' : 'rgb(30 23 23)',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: walletType === "BEP20" ? '#fff' : 'rgb(233 218 218)',
                border: '1px solid #51fbc1'
              }}
            >
              <img  data-v-53c5f33f=""  src="/static/img/USDT.png" alt="" style={{ marginRight: '8px', filter: "brightness(5) invert(0)" }} />BEP20

                {walletType === "BEP20" && (
                <span style={{
                  position: 'relative',
                  top: '1px',
                  right: '-6px',
                  color: '#00ff00',
                  fontWeight: 'bold',
                  fontSize:'xx-small'
                }}>
                  ✅
                </span>
              )}
              
            </uni-view>
          </uni-view> */}



          
        </uni-view>
        <uni-view data-v-53c5f33f="" class="input-layer" style={{ marginTop: '15px' }}>
          <uni-view data-v-53c5f33f="" class="input-title">{t('Wallet Address')}<uni-view data-v-53c5f33f="" class="right" onClick={handleSuccess}><img data-v-53c5f33f="" src="  /static/img/add.png" alt="" style={{color:'#000',filter: 'brightness(6) invert(0)'}}/>{t('Add New')}</uni-view></uni-view><uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border is-disabled " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}> 
              <uni-input data-v-30449abe="" class="uni-easyinput__content-input" >
          <div class="uni-input-wrapper">
            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f=""> </div>
            <input disabled="disabled" style={{margin:'16px'}} maxlength="140" step="" enterkeyhint="done" autocomplete="off" value={selectedWallet} readOnly type="" class="uni-input-input" />
          </div>
        </uni-input>   </uni-view></uni-view></uni-view>
        <uni-view data-v-53c5f33f="" class="input-layer" style={{ marginTop: '15px' }}><uni-view data-v-53c5f33f="" class="input-title">{t('Amount')}</uni-view>
        <uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}>   <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
          <div class="uni-input-wrapper">
            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f=""></div>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Please Enter Amount" className="uni-input-input" />
          </div>
        </uni-input>   </uni-view></uni-view>    </uni-view>
        {/* <uni-view data-v-53c5f33f="" class="input-layer" style={{marginTop: '10px'}}><uni-view data-v-53c5f33f="" class="input-title">Payment Password</uni-view>
        <uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{color: 'rgb(255, 255, 255)'}}>
          <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{borderColor: 'rgba(255, 255, 255, 0.2)',backgroundColor: 'unset'}}>  
             <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{paddingLeft: '10px'}}>
          <div class="uni-input-wrapper">
            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f=""></div>
            <input maxlength="140" step="" enterkeyhint="done" placeholder="Please enter your payment password" autocomplete="off" type="text" class="uni-input-input" />
          </div>
        </uni-input>  
         </uni-view>
         </uni-view>
         </uni-view> */}

        <uni-view data-v-53c5f33f="" class="input-layer">
          <uni-view data-v-53c5f33f="" class="input-title">{t('Verification Code')}</uni-view>
          <uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}>
            <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}>
              <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                <div class="uni-input-wrapper">
                  <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f=""></div>
                  <input value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} type="text" placeholder="Enter Verification Code" className="uni-input-input" />
                </div>
              </uni-input>
              <uni-view data-v-b918f992=""
                                            class="resend"
                                            onClick={cooldown === 0 ? handleSendRequest : null}
                                            style={{
                                              color: cooldown === 0 ? '#fff' : 'rgb(76 70 70)',
                                              cursor: cooldown === 0 ? 'pointer' : 'not-allowed',
                                            }}
                                          >
                                            {cooldown === 0 ? 'Send' : `Wait ${cooldown}s`}
                                          </uni-view>
 
              {/* <uni-view data-v-53c5f33f="" class="resend" onClick={handleSend}  style={{color:'#000'}}>Send</uni-view> */}
            </uni-view>
          </uni-view>
        </uni-view>

        <uni-view data-v-53c5f33f="" class="submit" onClick={handleSubmit}>{t('Submit')}</uni-view>
        </uni-view>


      {pop && (
  <div
    className="modal-overlay"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}
  >
    <div
      className="modal"
      style={{
        background: '#1c1c1c',
        padding: '1rem',
        borderRadius: '1rem',
        textAlign: 'center',
        maxWidth: '350px',
        width: '90%',
        color: '#fff',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        style={{
          background: 'rgb(194 146 43)',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto',
        }}
      >
        <img src="/static/img/icons8-warning-48.png"/>      </div>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
     withdrawal can be made
      </h2>
      <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Please note that your first withdrawal can<br></br>be made only after {unlockHours} hours at {unlockTime?.toLocaleString()}.
      </p>
      
      <button
        onClick={() => setPop(false)}
        style={{
          background: 'rgb(194 146 42)',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '0.5rem',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Confirm
      </button>
    </div>
  </div>
)}


       <WithdrawalInfo/>
        </uni-view>
        </uni-page-body></uni-page-wrapper></uni-page>
    </uni-app>
    </div>
  );
};

export default WithdrawReq;
