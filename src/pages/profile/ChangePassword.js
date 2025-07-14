import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Toast from "../../components/Toast";
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
  const { t } = useTranslation();

    const navigate = useNavigate();
      const [cooldown, setCooldown] = useState(0);

  const handleChangePassword = async () => {
    if (password !== passwordConfirmation) {
      setSuccess("Passwords do not match!");
      return;
    }
  
    try {
      const response = await Api.post('/changePassword', {
        password,
        password_confirmation: passwordConfirmation,
        verification_code: verificationCode
      });
  
      if (response.data.success) {
        setSuccess(response.data.message);
        setPassword('');
        setPasswordConfirmation('');
        setVerificationCode('');
      } else {
        setSuccess(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err.response);
      setSuccess(err.response?.data?.message || "Server error");
    }
  };
  

  const handleSendRequest = async () => {
    try {
      setCooldown(60);
      const response = await Api.post('/sendotp');
      console.log(response);
      if (response?.data?.success) {
        console.log('OTP sent successfully:', response.data);
        setSuccess("OTP sent successfully!");
            setTimeout(() => setSuccess(""), 2000); // fallback manual close
      } else {
        console.warn('Failed to send OTP:', response.data.message);
        setSuccess(response?.data?.message || "Failed to send OTP!");
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setSuccess(error?.response?.data?.message || "Failed to send OTP!");
    }
  };
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
   const backClick = () => {
        navigate(-1); // 👈 Go back to the previous page in history
    };
  return (
    <div class="uni-body pages-user-changepwd">
         {success && <Toast message={success} onClose={() => setSuccess('')} />}
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/changepwd">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-34a1f189="" class="page">
                <uni-view data-v-34a1f189="" class="ellipse"></uni-view>
                <uni-view data-v-34a1f189="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-34a1f189="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}><uni-view data-v-35b9a113="" data-v-34a1f189="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    
                      <uni-view data-v-34a1f189="" class="back"onClick={backClick}><img data-v-34a1f189="" src="/static/img/back.png" alt="" style={{ width: '35px',filter: 'brightness(6) invert(0)'}} /></uni-view>
                   
                  </uni-view>
                    <uni-view data-v-35b9a113="" data-v-34a1f189="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-34a1f189="" class="page-title">{t('Change Password')}</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-34a1f189="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view></uni-view></uni-view>
                <uni-view data-v-34a1f189="" class="content">
                  <uni-view data-v-34a1f189="" class="input-layer">
                    <uni-view data-v-34a1f189="" class="input-title">{t('New Password')}</uni-view>
                    <uni-view data-v-30449abe="" data-v-34a1f189="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}> <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
                      <div class="uni-input-wrapper">
                        <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="password" class="uni-input-input" value={password}
                          onChange={(e) => setPassword(e.target.value)} placeholder="Please enter new password" />
                      </div>
                    </uni-input>
                    </uni-view>
                    </uni-view>
                  </uni-view>
                  <uni-view data-v-34a1f189="" class="input-layer">
                    <uni-view data-v-34a1f189="" class="input-title">{t('Confirm Password')}</uni-view>
                    <uni-view data-v-30449abe="" data-v-34a1f189="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}> <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
                      <div class="uni-input-wrapper">
                        <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="password" class="uni-input-input" value={passwordConfirmation}
                          onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Please enter your new password again" />
                      </div>
                    </uni-input>
                    </uni-view>
                    </uni-view></uni-view>
                  <uni-view data-v-b918f992="" class="input-layer">
                    <uni-view data-v-b918f992="" class="input-title">{t('Verification Code')}</uni-view>
                    <uni-view data-v-30449abe="" data-v-b918f992="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}>
                      <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}>
                        <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                          <div class="uni-input-wrapper">
                            {/* <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-b918f992=""></div> */}
                            <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} type="" placeholder="Please Enter Verification Code" class="uni-input-input" />
                          </div>
                        </uni-input>
                        {/* <uni-view data-v-b918f992="" class="resend" onClick={handleSendRequest} style={{color:'#000'}}>Send</uni-view> */}
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
 
                      </uni-view>
                    </uni-view>
                  </uni-view>
                </uni-view>
                <uni-view data-v-34a1f189="" class="submit"onClick={handleChangePassword} style={{backgound:'#15d5c7'}}>{t('Submit')}</uni-view>
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>
      </uni-app>
    </div>
  );
};

export default ChangePassword;
