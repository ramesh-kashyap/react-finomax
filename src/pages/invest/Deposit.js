import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Requests/Api";
import { QRCodeCanvas } from 'qrcode.react';
import { QRCode } from 'react-qrcode-logo';

import { FaRegCopy } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import Toast from "../../components/Toast";
import DepositInfo from './DepositInfo';
import { useTranslation } from 'react-i18next';

const Deposit = () => {


  const navigate = useNavigate();
  const { t } = useTranslation();

  const [walletAddress, setWalletAddress] = useState('');
  const [scanner, setScanner] = useState('');
  const [loading, setLoading] = useState(false);
  const [deposit, setDeposit] = useState("");
  const [vip, setVip] = useState("");
  const [amount, setAmount] = useState(""); 
  const [selected, setSelected] = useState('bep20'); // default bep20
  const [error, setError] = useState("");
  const [qrCodeData, setQrCodeData] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  // const [method, setMethod] = useState("");
  useEffect(() => {
    fetchwallet(selected);
    fetchvip();

  }, [selected]);


      const fetchvip = async () => {
      try {
         const response = await Api.get("/depositInfo");
         if (response.data.success) {
      const userPackage = response.data.data.package;
      setDeposit(userPackage);
         }
      const response_vip = await Api.get("/get_vip");
      if (response_vip.data.success) {
        const vipValue = response_vip.data.vip;
        setVip(vipValue);
        // setVipType(vipTypeMap[vipValue] || "0");
      }

      } catch (error) {
         console.error("Error fetching servers:", error);
      }
   };
  const vipLimits = {
                0: 1000,
                1: 1000,
                2: 2500,
                3: 5000,
                4: 10000,
                5: 25000,
                6: 100000,
            };

const handleAmountChange = (e) => {
  const value = e.target.value;
  setAmount(value);
  // const numericValue = parseFloat(value);
  // const previousDeposit = parseFloat(deposit) || 0;
  // const vipLimit = vipLimits[vip] || 0;
  // const total = numericValue + previousDeposit;
  // if (total > vipLimit) {
  //   const maxAllowed = vipLimit - previousDeposit;
  //   setError(`Your VIP allows ${vipLimit}.already deposited ${previousDeposit}, can enter up to ${maxAllowed}.`);
  // } else {
  //   setError("");
  // }
};

  const fetchwallet = async () => {
    try {
      setLoading(true);
      const response = await Api.get(`/fetchwallet?type=${selected}`); // Pass a refid if 
      console.log(response.data);
      if (response.data?.success) {
        setWalletAddress(response.data.data.address_in);
        setScanner(response.data.data.callback_url);
      } else {
        console.error("Wallet API did not return data.");
      }
    } catch (error) {
      console.error("Something went wrong fetching the wallet:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const confirmDeposit = async () => {  
    const numericAmount = parseFloat(amount);
  const vipLimit = vipLimits[vip] || 0;
  const previousDeposit = parseFloat(deposit) || 0;
  const total = numericAmount + previousDeposit;

  const maxAllowed = vipLimit - previousDeposit;

  if (total > vipLimit) {
    toast.error(`Deposit limit exceeded for  ${vipLimit}. Max allowed: ${maxAllowed} USDT`);
    return;
  } else {
    setError("");
  }  
    try {
      setLoading(true);
      const response = await Api.post(`/confirmDeposit`, { method: "USDT BEP20", amount });
      if (response.data?.success) {
        console.log("deposit successful", response.data);
        setWalletAddress(response.data.walletAddress);
        setQrCodeData(response.data.qr_code); // This is base64 image string
        setShowScanner(true)
      }
    } catch (error) {
      console.error("Something went wrong submitting the deposit:", error);
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
      .then(() => {
        toast.success('Wallet address copied!');
      })
      .catch(() => {
        toast.error('Failed to copy wallet address');
      });
  };
  const backClick = () => {
    navigate(-1); // 👈 Go back to the previous page in history
  };
  return (
    <div class="uni-body pages-user-recharge">
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/recharge">
          <uni-page-wrapper>
            <uni-page-body>
              <Toaster position="top-right" reverseOrder={false} />
              <uni-view data-v-bec7c7ce="" class="page">
                <uni-view data-v-bec7c7ce="" class="ellipse"></uni-view>
                <uni-view data-v-bec7c7ce="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-bec7c7ce="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-bec7c7ce="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                      <uni-view data-v-53c5f33f="" class="back" onClick={backClick}><img data-v-53c5f33f="" src="/static/img/back.png" alt="" style={{ width: '35px', filter: 'brightness(6) invert(0)' }} /></uni-view>


                    </uni-view><uni-view data-v-35b9a113="" data-v-bec7c7ce="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}><uni-view data-v-bec7c7ce="" class="page-title">Deposit</uni-view></uni-view>
                    <uni-view data-v-35b9a113="" data-v-bec7c7ce="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/deposit-history">
                        <uni-view data-v-53c5f33f="" class="records"><img data-v-53c5f33f="" src="/static/img/records.png" alt="" style={{ width: '25px', marginTop: '5px', filter: 'brightness(6) invert(0)' }} /></uni-view>

                      </Link>                                    </uni-view></uni-view></uni-view>
                      {!showScanner ? (
                      <>
                      {/* deposit  form*/}
                      <uni-view data-v-53c5f33f="" class="content">  

  <uni-view data-v-53c5f33f="" class="input-layer" style={{ marginTop: "15px" }}>
    <uni-view data-v-53c5f33f="" class="input-title">
      Wallet Type
      {/* <uni-view data-v-53c5f33f="" class="right">
        <img
          data-v-53c5f33f=""
          src="/static/img/add.png"
          alt=""
          style={{ color: "rgb(0, 0, 0)", filter: "brightness(6) invert(0)" }}
        />
        Add New
      </uni-view> */}
    </uni-view>

    <uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{ color: "rgb(255, 255, 255)" }}>
      <uni-view
        data-v-30449abe=""
        class="uni-easyinput__content is-input-border is-disabled"
        style={{ borderColor: "rgb(81, 251, 193)", backgroundColor: "unset" }}
      >
        <uni-input data-v-30449abe="" class="uni-easyinput__content-input">
          <div class="uni-input-wrapper">
            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f="">
            </div>
            <div style={{ position: 'relative', display: 'inline-block', margin: '16px' }}>
  <img
    src="/static/img/icon-Cash.png" // use actual path to your USDT icon
    alt="USDT"
    style={{
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      pointerEvents: 'none',
    }}
  />
  <input
    readOnly
    autoComplete="off"
    type="text"
    name="method"
    value="USDT BEP20"
    className="uni-input-input"
    style={{
      paddingLeft: '40px',
      height: '36px',
    }}
  />
</div>

          </div>
        </uni-input>
      </uni-view>
    </uni-view>
  </uni-view>

  <uni-view data-v-53c5f33f="" class="input-layer" style={{ marginTop: "15px" }}>
    <uni-view data-v-53c5f33f="" class="input-title">Amount</uni-view>

    <uni-view
      data-v-30449abe=""
      data-v-53c5f33f=""
      class="uni-easyinput"
      style={{ color: "rgb(255, 255, 255)" }}
    >
      <uni-view
        data-v-30449abe=""
        class="uni-easyinput__content is-input-border"
        style={{ borderColor: "rgb(81, 251, 193)", backgroundColor: "unset" }}
      >
        <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: "10px" }}>
          <div class="uni-input-wrapper">
            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f="">
            </div>
            <input type="number"class="uni-input-input" value={amount} placeholder='Enter Amount' onChange={handleAmountChange} />
            {/* {error && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {error}
              </div>
            )} */}
          </div>
        </uni-input>
      </uni-view>
    </uni-view>
  </uni-view>

  <uni-view data-v-53c5f33f="" class="submit" onClick={confirmDeposit}>
    Submit
  </uni-view>
                        </uni-view>
                        </>
) : (
  <>
                      {/* deposit Scanner */}
                      <uni-view data-v-bec7c7ce="" class="recharge-box">
                  <uni-view data-v-bec7c7ce="" class="input-layer">
                    {/* <uni-view data-v-bec7c7ce="" class="input-title">{t('Select Deposit Type')}</uni-view>
                    <uni-view class="select-box" style={{ display: 'flex', gap: '10px' }}>
                     

                      <uni-view
                        class="item"
                        onClick={() => setSelected('bep20')}
                        style={{
                           backgroundColor: selected === 'bep20' ? '#fff' : '#000000',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: selected === 'bep20' ? '#000' : '#fff',
                             border:'1px solid #51fbc1'
                        }}
                      >
                        <img src="/static/img/USDT.png" alt="" style={{ width: '20px', marginRight: '6px' ,filter: "brightness(5) invert(0)"}} />
                        BEP20
                      </uni-view>

                       <uni-view
                        class="item"
                        onClick={() => setSelected('trc20')}
                        style={{
                          backgroundColor: selected === 'trc20' ? '#fff' : '#000000',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: selected === 'trc20' ? '#000' : '#fff',
                          border:'1px solid #51fbc1'
                        }}
                      >
                        <img src="/static/img/USDT.png" alt="" style={{ width: '20px', marginRight: '6px',filter: "brightness(5) invert(0)" }} />
                        TRC20
                      </uni-view>

                    </uni-view> */}
                  </uni-view><uni-view data-v-bec7c7ce="" class="input-layer" style={{ marginTop: '20px' }}>
                    <uni-view data-v-bec7c7ce="" class="input-title">{t('Amount')}</uni-view>
                    <uni-view data-v-30449abe="" data-v-bec7c7ce="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}>
                      <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border2 " style={{ bordBEPolor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'unset', margin: '0px auto' }}>
                        <div className="scanner-image-section">
                          <div className="scanner-image-wrapper" >
                            {loading ? (
                              <img src="/static/img/loading.gif" alt="Loading..." style={{ width: '50px', height: '50px', marginLeft: 100 }} />
                            ) : qrCodeData ? (
                              <img src={`data:image/png;base64,${qrCodeData}`} alt="USDT QR Code" style={{ maxWidth: '250px' }}/>                              
                            ): null}
                          </div>
                        </div>

                      </uni-view>
                      <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ bordBEPolor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'unset', marginTop: '20px' }}>
                        <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
                          <div class="uni-input-wrapper">
                            {walletAddress && (
                            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-bec7c7ce="" style={{ color: '#ffffff' }}>{walletAddress}</div>
                           )}
                          </div>

                        </uni-input>
                        
                        <button onClick={copyToClipboard} className="text-xl text-[#ffffff]" style={{ width: "30px", border: "2px", background: "none", color: "#fff" }}>
                          <FaRegCopy />
                        </button>
                      </uni-view >
                    </uni-view>
                  </uni-view>
                      </uni-view>
                  </>
)}
                <DepositInfo/>
                {/* <uni-view data-v-bec7c7ce="" class="submit">Submit</uni-view>   */}
              </uni-view>
              </uni-page-body>
              </uni-page-wrapper>
              </uni-page>

      </uni-app>
    </div>
  );
};

export default Deposit;