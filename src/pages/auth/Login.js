import React, { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Api from "../../Requests/Api";
import Toast from "../../components/Toast";
const Login = () => {
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [input, setInput] = useState('');
   const [success, setSuccess] = useState(location.state?.successMessage || "");

  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  useEffect(() => {
    if (success) {
      // Show message (custom toast or console or UI)
      console.log(success); // or use your toast logic
      // Clear state from history so it doesn't show again on back
      navigate(location.pathname, { replace: true }); 
    }
  }, [success, navigate, location.pathname]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (input !== captcha) {
        setSuccess("Invalid Captcha Code!");
        return false;
      }
      const response = await Api.post("/login", {
        email,
        password
      });
    
      if (response.data?.token) {
        const { token, message } = response.data;
        localStorage.setItem("authToken", token);
        // toast.success(message || "Login successful");
        navigate("/dashboard");
      } else {
        setSuccess(response.data?.message || "Invalid credentials");
        console.error("Login failed:", response.data);
      }
    
    } catch (error) {
      console.error("Login error:", error);
      setSuccess(error.response?.data?.error || "Something went wrong!");
    }
    
    
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
          {success && <Toast message={success} onClose={() => setSuccess('')} />}
      <uni-app class="uni-app--maxwidth">
        
        <uni-page data-page="pages/login/login">
          <uni-page-wrapper>
            <uni-page-body>

              
              <uni-view data-v-2b56ecaf="" class="page"style={{height:'500px'}} >
                <uni-view data-v-2b56ecaf="" class="ellipse"></uni-view>
                <uni-view data-v-2b56ecaf="" class="service">
                 </uni-view>

                  <uni-view
                                         data-v-06ae08d2="" class="top-box"><uni-view data-v-06ae08d2="" class="left">
                                            <Link to="/setting">
                                               {/* <uni-view
                                                  data-v-06ae08d2="" class="ava"><img data-v-06ae08d2="" src="/static/img/image.png"
                                                     alt="" /></uni-view> */}
                                            </Link>
                 
                                            <uni-view data-v-06ae08d2="" class="top-text">
                                               {/* <uni-view
                                                  data-v-06ae08d2="" class="name">{t('welcome')}, {userDetails?.name}</uni-view>
                                               <uni-view data-v-06ae08d2=""
                                                  class="uid">Username: {userDetails?.username}</uni-view> */}
                 
                                            </uni-view>                         
                                         </uni-view>
                                         
                                         <uni-view
                                            data-v-06ae08d2="" class="right">
                                               <Link target="_blank" to="https://t.me/AidenSabestin ">
                                            <uni-view data-v-06ae08d2="" class="notice"><img
                                               data-v-06ae08d2="" src="/static/img/supprt.png" alt=""
                                               style={{ width: '28px', height: '28px', }} /></uni-view> 
                                               </Link>
                                            <Link   target="_blank"  to="https://t.me/Finomax">
                                               <uni-view data-v-06ae08d2="" class="notice"><img
                                                  data-v-06ae08d2="" src="/static/img/belliy.png" alt="" style={{ width: '28px', height: '28px', }} /><uni-view
                                                     data-v-06ae08d2=""
                                                     class=""></uni-view></uni-view>
                                            </Link>
                                         </uni-view>
                                      </uni-view>
                                      
                 
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

                    <uni-view data-v-2b56ecaf="" class="input-title">Email</uni-view>
                    <uni-view data-v-30449abe="" data-v-2b56ecaf="" class="uni-easyinput" ><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}><uni-view data-v-30449abe="" class="content-clear-icon"><img data-v-30449abe="" src="/static/img/user.png" alt="" /></uni-view>  <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
                      <div class="uni-input-wrapper">
                        <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-2b56ecaf="" style={{ display: 'none' }}>Please Enter Email</div>
                        <input maxLength="140" autoComplete="off" type="text" name="email" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="uni-input-input" required enterKeyHint="done" />
                      </div>
                    </uni-input>
                      <uni-text data-v-45a6b600="" data-v-30449abe="" class="uni-icons content-clear-icon " style={{ color: 'rgb(192, 196, 204)', fontSize: '24px' }}><span></span></uni-text></uni-view></uni-view>

                  </uni-view>
                  <uni-view data-v-2b56ecaf="" class="input-layer">

                    <uni-view data-v-2b56ecaf="" class="input-title">Password</uni-view>
                    <uni-view data-v-30449abe="" data-v-2b56ecaf="" class="uni-easyinput" ><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#51fbc1', backgroundColor: 'unset' }}><uni-view data-v-30449abe="" class="content-clear-icon"><img data-v-30449abe="" src="/static/img/lock.png" alt="" /></uni-view>  <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
                      <div class="uni-input-wrapper">
                        <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-2b56ecaf="" style={{ display: 'none' }}>Please Enter password</div>
                        <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="password"  placeholder="Enter Password" name="password" value={password}
                          onChange={(e) => setPassword(e.target.value)} required className="uni-input-input" />
                      </div>
                    </uni-input>
                      <uni-text data-v-45a6b600="" data-v-30449abe="" class="uni-icons content-clear-icon " style={{ color: 'rgb(192, 196, 204)', fontSize: '24px' }}><span></span></uni-text></uni-view></uni-view>

                  </uni-view>

                  <Link to="/forgot-password">
                  <uni-view data-v-2b56ecaf="" class="forget" style={{color:'#fff'}}>Forget Password?</uni-view>
                  </Link>

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

                  <button data-v-2b56ecaf="" class="login" style={{ width: '100%' }} onClick={handleLogin}>Log in</button>


                  <uni-view data-v-2b56ecaf="" class="register">Don't have an account?<Link to="/register" style={{ textDecorationLine: 'none' }}><uni-view data-v-2b56ecaf="" class="create" style={{color:'#51fbc1'}}>Create Account</uni-view></Link></uni-view>
                </uni-view>
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>


      </uni-app>

    </div>
  );
};

export default Login;
