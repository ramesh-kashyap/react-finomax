import React,{ useState, useEffect } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import Api from "../../Requests/Api";
import { toast } from "react-toastify";
import Toast from "../../components/Toast";
import { useTranslation } from 'react-i18next';

const AddWalletAddress = () => {
  const { t } = useTranslation();

  const [cooldown, setCooldown] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [address, setAddress] = useState("");
  const { networkType } = useParams();
   const [success, setSuccess] = useState('');
  
    const navigate = useNavigate();
  
      // Countdown timer effect
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  
const saveAddress = async () => {
  try {
     const response = await Api.post(
      `/save-address/${networkType}`,
      {
        address,
        verificationCode,
        networkType  
      },
   
    );

    if (response.data?.alreadySaved) {
        setSuccess(response.data.message);  // e.g., "This address is already saved"
      } else {
        setSuccess("Address saved successfully!");
        setAddress("");  // Clear form
        setVerificationCode("");
      }
  } catch (error) {
    console.error("Error saving address:", error.response?.data || error.message);
    setSuccess(error.response?.data?.message || "Failed to save address!"); // optional: error toast
  }
};

  const handleSendRequest = async () => {
    try {
      setSuccess("OTP sent successfully!");
          setTimeout(() => setSuccess(""), 2000); // fallback manual close

      // Start countdown
      setCooldown(60);
      const response = await Api.post('/sendotp');
      if (response?.data?.success) {
       
      } else {
        setSuccess(response?.data?.message || "Failed to send OTP!");
      }
    } catch (error) {
      setCooldown(0);
      console.error('Error sending OTP:', error);
      setSuccess(error?.response?.data?.message || "Failed to send OTP!");
    }
  };
    //   const [activeTab, setActiveTab] = useState();
    const backClick = () => {
      navigate(-1); // 👈 Go back to the previous page in history
  };
    return (
    <div class="uni-body pages-user-addCard">
        {success && <Toast message={success} onClose={() => setSuccess('')} />}
        <uni-app class="uni-app--maxwidth">
            <uni-page data-page="pages/user/addCard">
                <uni-page-wrapper>
                    <uni-page-body>
                        <uni-view data-v-b918f992="" class="page">
                            <uni-view data-v-b918f992="" class="ellipse"></uni-view>
                             <uni-view data-v-b918f992="" class="top-box">
                                <uni-view data-v-636c600c="" data-v-b918f992="" class="uni-row" style={{marginLeft: '0px', marginRight: '0px'}}>
                                    <uni-view data-v-35b9a113="" data-v-b918f992="" class="uni-col uni-col-6" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                        
                                              <uni-view data-v-53c5f33f="" class="back"onClick={backClick}><img data-v-53c5f33f="" src="/static/img/back.png" alt="" style={{width: '35px',filter: 'brightness(6) invert(0)'}} /></uni-view>
                                      

                                    </uni-view>
                                    <uni-view data-v-35b9a113="" data-v-b918f992="" class="uni-col uni-col-12" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                        <uni-view data-v-b918f992="" class="page-title">{t('Add Wallet Address')}</uni-view>
                                    </uni-view>
                                    <uni-view data-v-35b9a113="" data-v-b918f992="" class="uni-col uni-col-6" style={{paddingLeft: '0px', paddingRight: '0px'}}></uni-view>
                                </uni-view>
                            </uni-view>
                            <uni-view data-v-b918f992="" class="trc-box">
                                <uni-view data-v-b918f992="" class="input-layer">
                                    <uni-view data-v-b918f992="" class="input-title">{t('Wallet Address')}({ networkType.toUpperCase() })</uni-view>
                                    <uni-view data-v-30449abe="" data-v-b918f992="" class="uni-easyinput" style={{color: 'rgb(255, 255, 255)'}}>
                                        <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{borderColor: '#51fbc1', backgroundColor: 'unset'}}>
                                            <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{paddingLeft: '10px'}}>
                                                <div class="uni-input-wrapper">
                                                    {/* <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-b918f992=""></div> */}
                                                    <input maxlength="140" step="" enterkeyhint="done" autocomplete="off"value={address} onChange={(e) => setAddress(e.target.value)} type=""placeholder="Please Enter Wallet Address" class="uni-input-input"required/>
                                                </div>
                                            </uni-input>
                                        </uni-view>
                                    </uni-view>
                                </uni-view>
                                <uni-view data-v-b918f992="" class="input-layer">
                                    <uni-view data-v-b918f992="" class="input-title">{t('Verification Code')}</uni-view>
                                    <uni-view data-v-30449abe="" data-v-b918f992="" class="uni-easyinput" style={{color: 'rgb(255, 255, 255)'}}>
                                        <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{borderColor: '#51fbc1', backgroundColor: 'unset'}}>
                                            <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{paddingRight: '10px', paddingLeft: '10px'}}>
                                                <div class="uni-input-wrapper">
                                                    {/* <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-b918f992=""></div> */}
                                                    <input maxlength="140" step="" enterkeyhint="done" autocomplete="off"value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} type=""placeholder="Please Enter Verification Code" class="uni-input-input"/>
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
                                <uni-view data-v-b918f992="" class="submit" onClick={saveAddress}>{t('Submit')}</uni-view>
                            </uni-view>
                        </uni-view>
                    </uni-page-body>
                </uni-page-wrapper>
            </uni-page>

        </uni-app>

    </div>

  );
};

export default AddWalletAddress;

