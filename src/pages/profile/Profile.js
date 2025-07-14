import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useAuth } from "../../components/AuthContext";

import Api from "../../Requests/Api";
import Level from "../../pages/team/Level";
import UserProfileCard from "./UserProfileCard";
import FeatureIconsBar from "./FeatureIconsBar";
import { useTranslation } from 'react-i18next';

const NodeDetails = () => {
  const { t } = useTranslation();

  const [serverc, setServerC] = useState('');
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const handleOpenTelegram = () => {
    window.open('https://t.me/Finomax', '_blank');
  };

  useEffect(() => {
    fetchserve();
  })

  const fetchserve = async () => {
    try {
      const response = await Api.get(`/serverc`); // Pass a refid if 
      console.log(response.data);
      if (response.data?.success) {
        setServerC(response.data.totalIncome || 0);
      }
    } catch (error) {
      console.error("Something went wrong fetching the wallet:", error);
    }
  };

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await Api.get('/user');
      setUserDetails(response.data); // This should be your user object
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const [income, setIncome] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchteam();
  }, []);


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


  return (

    <div class="uni-body pages-user-user">

      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/user">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-3dcfa33c="" class="page">
                <uni-view data-v-3dcfa33c="" class="ellipse">
                </uni-view>
                <uni-view data-v-3dcfa33c="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-3dcfa33c="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/dashboard"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          >

                        <uni-view data-v-1011963f="" class="back">
                          <img data-v-1011963f="" src="/static/img/back.png" alt="" style={{ width: '0px', filter: 'brightness(6) invert(0)' }} />
                        </uni-view>
                      </Link>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-3dcfa33c="" class="page-title">{t('Profile')}</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/notice">
                        <uni-view data-v-3dcfa33c="" class="set"><img data-v-3dcfa33c="" src="/static/img/belliy.png" alt="" style={{ width: '35px' }} /></uni-view>
                      </Link>
                    </uni-view>
                  </uni-view>
                </uni-view>
                {/* <uni-view data-v-3dcfa33c="" class="ava-box"style={{background: "linear-gradient(to right, rgb(255, 255, 255), #51fbc1)", borderRadius:20, height:180}}>
                  <div style={{marginTop:-15}}>
                  <uni-view data-v-3dcfa33c="" class="ava">
                    <img data-v-3dcfa33c="" src="../fino-fav.png" alt="" />
                    </uni-view>
                    <uni-view >
                      <uni-view
                        data-v-3dcfa33c="" class="nickname">{userDetails?.name}</uni-view>
                      <uni-view data-v-3dcfa33c="" class="uid">Username: {userDetails?.username}</uni-view>
                    </uni-view>
                  </div>
                </uni-view> */}

                <UserProfileCard />
                <br></br>
                <uni-view data-v-3dcfa33c="" class="two-group">
                  <uni-view data-v-3dcfa33c="" class="item">
                    {/* <Link to="/transaction" style={{ textDecorationLine: 'none',filter:'' }}> */}
                    <uni-view data-v-3dcfa33c="" class="title">{t('Team Deposits')}</uni-view>
                    <uni-view data-v-3dcfa33c="" translate="no" class="value"><img data-v-3dcfa33c="" src="/static/img/income.png" alt="" />$ {(
  Number(income.data?.gen_team1Recharge || 0) +
  Number(income.data?.gen_team2Recharge || 0) +
  Number(income.data?.gen_team3Recharge || 0)
).toFixed(4)}</uni-view>
                    {/* </Link> */}

                  </uni-view>

                  <uni-view data-v-3dcfa33c="" class="item"> <Link to="/Team" style={{ textDecorationLine: 'none', filter: '' }}>
                    <uni-view data-v-3dcfa33c="" class="title">{t('My Team')}</uni-view>
                    <uni-view data-v-3dcfa33c="" class="value"><img data-v-3dcfa33c="" src="/static/img/teama.png" alt="" />{income.data?.ActivetotalTeam}/{income.data?.totalTeam}</uni-view>
                  </Link>

                  </uni-view>
                </uni-view>
                <FeatureIconsBar />
                <Link to="/change-mail" style={{ textDecorationLine: 'none' }}>
                  <uni-view data-v-3dcfa33c="" class="email-box">
                    <uni-view data-v-3dcfa33c="" class="title" style={{ color: '#898989' }}>{t('Email Address')}</uni-view>
                    <uni-view data-v-3dcfa33c="" class="value">**{userDetails?.email}</uni-view>
                  </uni-view>
                </Link>
                <Link to="/Refer" style={{ textDecorationLine: 'none' }}>
                  <uni-view data-v-3dcfa33c="" class="invite-box">

                    <img data-v-3dcfa33c="" src="/static/img/invitefriend.png" alt=""/>
                    <uni-view data-v-3dcfa33c="" class="invite">
                      <uni-view data-v-3dcfa33c="" class="title">{t('Invite Friends')}</uni-view>
                      <uni-view data-v-3dcfa33c="" class="text">{t('Invite friends and earn referral commission')}</uni-view>
                    </uni-view>
                  </uni-view>
                </Link>

                {/* <uni-view data-v-3dcfa33c="" class="kyc-box"><Link to="/Kyc"style={{ textDecorationLine: 'none' }}>
                  <uni-view data-v-3dcfa33c="" class="value"><img data-v-3dcfa33c="" src="/static/img/warn.png" alt="" />KYC Certification</uni-view>
                  <uni-view data-v-3dcfa33c="" class="title">Your account is not verified yet please add add your personal details to verify</uni-view>
                  <uni-view data-v-3dcfa33c="" class="go-kyc">Verify Now</uni-view>
                  </Link>
                </uni-view> */}
                <Link to="/Wallet" style={{ textDecorationLine: 'none' }}>
                  <uni-view data-v-3dcfa33c="" class="invite-box">
                    <img data-v-3dcfa33c="" src="/static/img/wallets.png" alt="" />
                    <uni-view data-v-3dcfa33c="" class="invite">
                      <uni-view data-v-3dcfa33c="" class="title">{t('Wallet')}</uni-view>
                      <uni-view data-v-3dcfa33c="" class="text">{t('Manage wallet addresses and bank cards')}</uni-view>
                    </uni-view>
                  </uni-view>
                </Link>
              <Link to="/langauge" style={{ textDecorationLine: 'none' }}>
                <uni-view data-v-3dcfa33c="" class="invite-box">
                  <img data-v-3dcfa33c="" src="/static/img/lang.png" alt="" style={{filter:'none'}} />
                  <uni-view data-v-3dcfa33c="" class="invite">
                    <uni-view data-v-3dcfa33c="" class="title">{t('Language')}</uni-view>
                    <uni-view data-v-3dcfa33c="" class="text">{t('you can change own Language')}</uni-view>
                  </uni-view>
                </uni-view> 
                </Link>

                <Link to="/change-password" style={{ textDecorationLine: 'none' }}>
                  <uni-view data-v-3dcfa33c="" class="invite-box">
                    <img data-v-3dcfa33c="" src="/static/img/loginpass.png" alt="" />
                    <uni-view data-v-3dcfa33c="" class="invite">
                      <uni-view data-v-3dcfa33c="" class="title">{t('Login Password')}</uni-view>
                      <uni-view data-v-3dcfa33c="" class="text">{t('Manage or Update Your Login Passowrd')}</uni-view>
                    </uni-view>
                  </uni-view>
                </Link>




                {/* <Link to="/payment-password" style={{ textDecorationLine: 'none' }}> */}
                <uni-view data-v-3dcfa33c="" class="invite-box" style={{ cursor: 'pointer' }} onClick={handleOpenTelegram} >
                  <img data-v-3dcfa33c="" src="/static/img/teleg.png" alt="" />
                  <uni-view data-v-3dcfa33c="" class="invite">
                    <uni-view data-v-3dcfa33c="" class="title">{t('Telegram Channel')}</uni-view>
                    <uni-view data-v-3dcfa33c="" class="text">{t('Lets join Our team')}</uni-view>
                  </uni-view>
                </uni-view>
                {/* </Link> */}

                {/* <Link to="https://play.google.com/store/apps/details?id=com.wnapp.id1749919274619" target="_blank" style={{ textDecorationLine: 'none' }}>
                  <uni-view data-v-3dcfa33c="" class="invite-box">
                    <img data-v-3dcfa33c="" style={{ filter: 'none' }} src="/static/img/icons8-playstore-96.png" alt="" />
                    <uni-view data-v-3dcfa33c="" class="invite">
                      <uni-view data-v-3dcfa33c="" class="title">{t('Google Play Store')}</uni-view>
                      <uni-view data-v-3dcfa33c="" class="text">{t('Finomax application')}</uni-view>
                    </uni-view>
                  </uni-view>
                </Link> */}



                <uni-view data-v-3dcfa33c="" class="logout" onClick={handleLogout}>{t('Logout')}</uni-view>

              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>



      </uni-app>
    </div>
  );
};

export default NodeDetails;
