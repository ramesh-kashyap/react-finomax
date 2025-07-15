import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { PhoneInput } from "react-international-phone";
import { useLocation } from "react-router-dom";
import "react-international-phone/style.css";
import 'react-phone-input-2/lib/style.css';
import '../../index.css'
import Toast from "../../components/Toast";
const Register = () => {
   const [isChecked, setIsChecked] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
    const [input, setInput] = useState('');
   const [success, setSuccess] = useState('');
  

    useEffect(() => {
        if (cooldown > 0) {
          const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
          return () => clearTimeout(timer);
        }
      }, [cooldown]);
   const toggleCheckbox = () => {
      setIsChecked(!isChecked);
   };

  const [formData, setFormData] = useState({
    sponsor: "",
    email: "",
    password: "",
    password_confirmation: "",
    countryCode: "",
    country: "",
    verificationCode:""
  });
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sponsorCode = params.get("inviteCode");
    if (sponsorCode) {
      setFormData((prevData) => ({ ...prevData, sponsor: sponsorCode }));
    }
  }, [location.search]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit random number
  }

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };



  const handleSendRequest = async () => {
    try {

      if (!formData.email.trim()) {
          setSuccess("Invalid Email ID!");
          return false;
      }
       setSuccess("OTP sent successfully");
       setTimeout(() => setSuccess(""), 2000); // fallback manual close
          // Start countdown
            setCooldown(60);
      const response = await Api.post('/sendRegisterOtp', {
        email: formData.email.trim() // Make sure 'email' state variable exists
      });
     
      // console.log(response);
      
  
      if (response?.data?.success) {
      } else {
        setCooldown(0);
        setSuccess(response?.data?.message || "Failed to send OTP!");
      }
    } catch (error) {
      setCooldown(0);
      console.error('Error sending OTP:', error);
      setSuccess(error?.response?.data?.message || "Failed to send OTP!");
    }
  };
  

  const handleRegister = async () => {
    if (formData.password !== formData.password_confirmation) {
      setSuccess("Passwords do not match");
      return;
    }
     if (input !== captcha) {
            setSuccess("Invalid Captcha Code!");
            return false;
     }


    try {
      const res = await Api.post("/register", {
        sponsor: formData.sponsor,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        countryCode: formData.countryCode,
        verificationCode: formData.verificationCode,
      });
      if (res.status === 201) {
        setSuccess(res.data.message);
          //  setTimeout(() => setSuccess(""), 2000); // fallback manual close
       navigate('/login', {
        state: { successMessage: 'Registered successfully!' }
      });
      }
    } catch (err) {
      setSuccess(err.response?.data?.error || "Registration failed");
    }
  };


  
    const containerStyle = {
    // background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '12px',
    maxWidth: '600px',
  };

  const logoWrapperStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
  };

  const logoStyle = {
    width: '36px',
    height: '36px',
  };

  const textWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const helloStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  const welcomeStyle = {
    fontSize: '16px',
  };


  return (
    <div class="uni-body pages-login-login">
        {success && <Toast message={success} onClose={() => setSuccess("")} />}
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/login/login">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-2b56ecaf="" class="page">
                <uni-view data-v-2b56ecaf="" class="ellipse"></uni-view>
                
                
                <div style={containerStyle}>
                <div style={logoWrapperStyle}>
                  <img
                    src="fino-fav.png" // Replace with your actual path
                    alt="Logo"
                    style={logoStyle}
                  />
                </div>
                <div style={textWrapperStyle}>
                  <div style={helloStyle}>Hello,</div>
                  <div style={welcomeStyle}>Welcome Finomax</div>
                </div>
              </div>

                <uni-view data-v-2b56ecaf="" class="input-box">
                  <uni-view data-v-2b56ecaf="" class="input-layer">
                    <uni-view data-v-2b56ecaf="" class="input-title">
                      Name
                    </uni-view>
                    <uni-view
                      data-v-30449abe=""
                      data-v-2b56ecaf=""
                      class="uni-easyinput"
                    >
                      <uni-view
                        data-v-30449abe=""
                        class="uni-easyinput__content is-input-border "
                        
                      >
                        <uni-view data-v-30449abe="" class="content-clear-icon">
                          <img
                            data-v-30449abe=""
                            src="/static/img/user.png"
                            alt=""
                          />
                        </uni-view>{" "}
                        <uni-input
                          data-v-30449abe=""
                          class="uni-easyinput__content-input"
                          style={{ paddingLeft: "10px" }}
                        >
                          <div class="uni-input-wrapper">
                            <input
                              maxlength="140"

                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter your name"

                              type="text"
                              name="name"
                              required
                              class="uni-input-input"
                            />
                          </div>
                        </uni-input>
                        <uni-text
                          data-v-45a6b600=""
                          data-v-30449abe=""
                          class="uni-icons content-clear-icon "
                          style={{
                            color: "rgb(192, 196, 204)",
                            fontSize: "24px",
                          }}
                        >
                          <span></span>
                        </uni-text>
                      </uni-view>
                    </uni-view>
                  </uni-view>
              


                  <uni-view data-v-2b56ecaf="" class="input-layer">
                    <uni-view data-v-2b56ecaf="" class="input-title">
                      Email
                    </uni-view>
                    <uni-view
                      data-v-30449abe=""
                      data-v-2b56ecaf=""
                      class="uni-easyinput"
                    >
                      <uni-view
                        data-v-30449abe=""
                        class="uni-easyinput__content is-input-border "
                        
                      >
                        <uni-view data-v-30449abe="" class="content-clear-icon">
                          <img
                            data-v-30449abe=""
                            src="/static/img/email-fill.png"
                            alt=""
                          />
                        </uni-view>{" "}
                        <uni-input
                          data-v-30449abe=""
                          class="uni-easyinput__content-input"
                          style={{ paddingLeft: "10px" }}
                        >
                          <div class="uni-input-wrapper">
                            <input
                              maxlength="140"

                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Enter your email"

                              type="email"
                              name="email"
                              required
                              class="uni-input-input"
                            />
                          </div>
                        </uni-input>
                        <uni-text
                          data-v-45a6b600=""
                          data-v-30449abe=""
                          class="uni-icons content-clear-icon "
                          style={{
                            color: "rgb(192, 196, 204)",
                            fontSize: "24px",
                          }}
                        >
                          <span></span>
                        </uni-text>
                      </uni-view>
                    </uni-view>
                  </uni-view>

                  <uni-view data-v-b918f992="" class="input-layer">
                    <uni-view data-v-b918f992="" class="input-title">Verification Code</uni-view>
                    <uni-view data-v-30449abe="" data-v-b918f992="" class ="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}>
                      <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " >
                        <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                          <div class="uni-input-wrapper">
                            {/* <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-b918f992=""></div> */}
                            <input type="text"  name="verificationCode" value={formData.verificationCode}   onChange={handleChange}  placeholder="Please Enter Verification Code" class="uni-input-input" />
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
                      </uni-view>
                    </uni-view>
                  </uni-view>


                  <uni-view data-v-2b56ecaf="" class="input-layer">
                    <uni-view data-v-2b56ecaf="" class="input-title">
                      Password
                    </uni-view>
                    <uni-view
                      data-v-30449abe=""
                      data-v-2b56ecaf=""
                      class="uni-easyinput"
                    >
                      <uni-view
                        data-v-30449abe=""
                        class="uni-easyinput__content is-input-border "
                        
                      >
                        <uni-view data-v-30449abe="" class="content-clear-icon">
                          <img
                            data-v-30449abe=""
                            src="/static/img/lock.png"
                            alt=""
                          />
                        </uni-view>{" "}
                        <uni-input
                          data-v-30449abe=""
                          class="uni-easyinput__content-input"
                          style={{ paddingLeft: "10px" }}
                        >
                          <div class="uni-input-wrapper">
                            <input
                              maxlength="140"
                              step=""
                              enterkeyhint="done"

                              type="password"
                              value={formData.password}
                              onChange={handleChange}
                              name="password"
                              placeholder="Enter your password"
                              required
                              class="uni-input-input"
                            />
                          </div>
                        </uni-input>
                        <uni-text
                          data-v-45a6b600=""
                          data-v-30449abe=""
                          class="uni-icons content-clear-icon "
                          style={{
                            color: "rgb(192, 196, 204)",
                            fontSize: "24px",
                          }}
                        >
                          <span></span>
                        </uni-text>
                      </uni-view>
                    </uni-view>
                  </uni-view>

                  <uni-view data-v-2b56ecaf="" class="input-layer">
                    <uni-view data-v-2b56ecaf="" class="input-title">
                      Confirm Password{" "}
                    </uni-view>
                    <uni-view
                      data-v-30449abe=""
                      data-v-2b56ecaf=""
                      class="uni-easyinput"
                    >
                      <uni-view
                        data-v-30449abe=""
                        class="uni-easyinput__content is-input-border "
                        
                      >
                        <uni-view data-v-30449abe="" class="content-clear-icon">
                          <img
                            data-v-30449abe=""
                            src="/static/img/lock.png"
                            alt=""
                          />
                        </uni-view>{" "}
                        <uni-input
                          data-v-30449abe=""
                          class="uni-easyinput__content-input"
                          style={{ paddingLeft: "10px" }}
                        >
                          <div class="uni-input-wrapper">
                            {/* <div
                              class="uni-input-placeholder uni-easyinput__placeholder-class"
                              data-v-30449abe=""
                              data-v-2b56ecaf=""
                              style={{ display: "none" }}
                            >
                              Please Enter password
                            </div> */}
                            <input
                              maxlength="140"
                              step=""
                              enterkeyhint="done"

                              type="password"
                              name="password_confirmation"

                              value={formData.password_confirmation}
                              onChange={handleChange}

                              required
                              class="uni-input-input"
                              placeholder="Enter your Confirm Password"

                            />
                          </div>
                        </uni-input>
                        <uni-text
                          data-v-45a6b600=""
                          data-v-30449abe=""
                          class="uni-icons content-clear-icon "
                          style={{
                            color: "rgb(192, 196, 204)",
                            fontSize: "24px",
                          }}
                        >
                          <span></span>
                        </uni-text>
                      </uni-view>
                    </uni-view>
                  </uni-view>

                  <uni-view data-v-2b56ecaf="" class="input-layer">
                    <uni-view data-v-2b56ecaf="" class="input-title">
                      Invitation Code
                    </uni-view>
                    <uni-view
                      data-v-30449abe=""
                      data-v-2b56ecaf=""
                      class="uni-easyinput"
                    >
                      <uni-view
                        data-v-30449abe=""
                        class="uni-easyinput__content is-input-border "
                        
                      >
                        <uni-view data-v-30449abe="" class="content-clear-icon">
                          <img
                            data-v-30449abe=""
                            src="/static/img/user.png"
                            alt=""
                          />
                        </uni-view>{" "}
                        <uni-input
                          data-v-30449abe=""
                          class="uni-easyinput__content-input"
                          style={{ paddingLeft: "10px" }}
                        >
                          <div class="uni-input-wrapper">
                            <input
                              maxLength="140"

                              type="text"
                              name="sponsor"
                              value={formData.sponsor}
                              onChange={handleChange}

                              class="uni-input-input"
                              required

                              placeholder="Enter Invitation Code"
                            />
                          </div>
                        </uni-input>
                        <uni-text
                          data-v-45a6b600=""
                          data-v-30449abe=""
                          class="uni-icons content-clear-icon "
                          style={{
                            color: "rgb(192, 196, 204)",
                            fontSize: "24px",
                          }}
                        >
                          <span></span>
                        </uni-text>
                      </uni-view>
                    </uni-view>
                  </uni-view>

                  <div className="captcha-container">
                  <label>Captcha</label>
                  <input
                    type="text"
                    placeholder="Type The Number Below"
                    className="captcha-input"
                    value={input}
                    onChange={handleInputChange}
                  />

                  <div className="captcha-box">
                    <span className="captcha-text">Captcha {captcha}</span>
                    <span className="refresh-icon" onClick={refreshCaptcha}><img src="/static/img/refresh.png" style={{width:'20px',height:"20px"}}/></span>
                  </div>
                </div>


                  <uni-view
                    data-v-90aab294=""
                    class="check-box"
                    style={{ marginTop: '10px' }}
                  >
                    <uni-checkbox-group data-v-90aab294="">
                      <uni-label
                        data-v-90aab294=""
                        class="warning-text uni-label-pointer"
                      >
                        <uni-checkbox
                          data-v-90aab294=""
                          style={{ transform: 'scale(0.7)', cursor: 'pointer' }}
         onClick={toggleCheckbox}
                        >
                          <div class="uni-checkbox-wrapper">
                            <div class={`uni-checkbox-input ${isChecked ? 'uni-checkbox-input-checked' : 'uni-checkbox-input-unchecked'}`}
                          style={{ color: 'rgb(0, 0, 0)' }}
                            ></div>
                          </div>
                        </uni-checkbox>
                        <uni-text data-v-90aab294="" class="agreement-tips">
                          <span>
                            I have read and agree to the following agreement:
                          </span>
                        </uni-text>
                        {/* <uni-text data-v-90aab294="" class="agreement">
                          <span>"AML/CFT Policy"</span>
                        </uni-text>
                        ,
                        <uni-text data-v-90aab294="" class="agreement">
                          <span>"Synero STAR LLC User Agreement"</span>
                        </uni-text> */}
                      </uni-label>
                    </uni-checkbox-group>
                  </uni-view>

                  <button
                    data-v-2b56ecaf=""
                    class="login"
                    style={{ width: "100%" }}
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                  

                  <uni-view data-v-2b56ecaf="" class="register">
                    Don't have an account?
                    <Link to="/login" style={{ textDecorationLine: 'none' }}><uni-view data-v-2b56ecaf="" class="create">Log in</uni-view></Link>
                  </uni-view>
                </uni-view>
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>
      </uni-app>
    </div>
  );
};

export default Register;