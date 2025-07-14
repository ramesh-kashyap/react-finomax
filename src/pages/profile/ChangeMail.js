import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Toast from "../../components/Toast";

const ChangeMail = () => {
  const [email, setEmail] = useState("");
  const [changeEmail, setchangeEmail] = useState('');
  const [changeEmailConfirmation, setchangeEmailConfirmation] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCode1, setVerificationCode1] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
  
    const navigate = useNavigate();
      const [cooldown, setCooldown] = useState(0);
      const [cooldown1, setCooldown1] = useState(0);

  const handleChangeMail = async () => {
  
    try {
      const response = await Api.post('/ChangeMail', {
        changeEmail,
        verification_code1:verificationCode1,        
        newmail:changeEmailConfirmation,
        verification_code: verificationCode,
      });
  
      if (response.data.success) {
        setSuccess(response.data.message);
        setchangeEmail('');
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
      const response = await Api.post('/sendRegisterOtp', { email: changeEmailConfirmation });
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


    const handleSendRequest1 = async () => {
    try {
      setCooldown1(60);
      const response = await Api.post('/sendRegisterOtp', { email: changeEmail});
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
    if (cooldown1 > 0) {
      const timer1 = setTimeout(() => setCooldown1(cooldown1 - 1), 1000);
      return () => clearTimeout(timer1);
    }
  }, [cooldown1]);
   const backClick1 = () => {
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
                  <uni-view data-v-636c600c="" data-v-34a1f189="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-34a1f189="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>                    
                      <uni-view data-v-34a1f189="" class="back"onClick={backClick}><img data-v-34a1f189="" src="/static/img/back.png" alt="" style={{ width: '35px',filter: 'brightness(6) invert(0)'}} /></uni-view>                   
                  </uni-view>
                    <uni-view data-v-35b9a113="" data-v-34a1f189="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-34a1f189="" class="page-title">Change Mail</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-34a1f189="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view></uni-view></uni-view>
                <uni-view data-v-34a1f189="" class="content">
                  <uni-view data-v-34a1f189="" class="input-layer">
                    <uni-view data-v-34a1f189="" class="input-title">Old Mail</uni-view>
                    <uni-view data-v-30449abe="" data-v-34a1f189="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}> <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
                      <div class="uni-input-wrapper">
                        <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="email" class="uni-input-input" value={changeEmail}
                          onChange={(e) => setchangeEmail(e.target.value)} placeholder="Please enter Old Email" />
                      </div>
                    </uni-input>
                    </uni-view>
                    </uni-view>
                  </uni-view>
                  <uni-view data-v-b918f992="" class="input-layer">
                    <uni-view data-v-b918f992="" class="input-title">Verification Code</uni-view>
                    <uni-view data-v-30449abe="" data-v-b918f992="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}>
                      <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}>
                        <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                          <div class="uni-input-wrapper">
                            {/* <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-b918f992=""></div> */}
                            <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" value={verificationCode1} onChange={(e) => setVerificationCode1(e.target.value)} type="" placeholder="Please Enter Verification Code" class="uni-input-input" />
                          </div>
                        </uni-input>
                        {/* <uni-view data-v-b918f992="" class="resend" onClick={handleSendRequest} style={{color:'#000'}}>Send</uni-view> */}
                        <uni-view data-v-b918f992=""
                                            class="resend"
                                            onClick={cooldown1 === 0 ? handleSendRequest1 : null}
                                            style={{
                                              color: cooldown1 === 0 ? '#fff' : 'rgb(76 70 70)',
                                              cursor: cooldown1 === 0 ? 'pointer' : 'not-allowed',
                                            }}
                                          >
                                            {cooldown1 === 0 ? 'Send' : `Wait ${cooldown1}s`}
                                          </uni-view>
 
                      </uni-view>
                    </uni-view>
                  </uni-view>
                  <uni-view data-v-34a1f189="" class="input-layer">
                    <uni-view data-v-34a1f189="" class="input-title">New Email</uni-view>
                    <uni-view data-v-30449abe="" data-v-34a1f189="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}> <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
                      <div class="uni-input-wrapper">
                        <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="changeEmail" class="uni-input-input" value={changeEmailConfirmation}
                          onChange={(e) => setchangeEmailConfirmation(e.target.value)} placeholder="Please enter your new New Email" />
                      </div>
                    </uni-input>
                    </uni-view>
                    </uni-view>
                    </uni-view>
                  <uni-view data-v-b918f992="" class="input-layer">
                    <uni-view data-v-b918f992="" class="input-title">Verification Code</uni-view>
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
                <uni-view data-v-34a1f189="" class="submit"onClick={handleChangeMail} style={{backgound:'#15d5c7'}}>Submit</uni-view>
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>
      </uni-app>
    </div>
  );
};

export default ChangeMail;
