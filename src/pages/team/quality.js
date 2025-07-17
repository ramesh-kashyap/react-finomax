import React, { useState, useEffect } from "react";
import Slider from "react-slick";
// App.js ya index.js me
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
import SmartTradeQuantization from "./SmartTradeQuantization";
import { Link } from "react-router-dom";
import PairCard from "./PairCard";
import Toast from "../../components/Toast";
import { useTranslation } from 'react-i18next';
const Server = () => {
   const { t } = useTranslation();
     const [vipType, setVipType] = useState('');
   const [activeTab, setActiveTab] = useState("running");
   const [servers, setQualitys] = useState([])
   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
   const [Contract, setContract] = useState([]);
    const [incomes, setIncomes] = useState("");
    const [deposit, setDeposit] = useState("");
    const [withdraw, setWithdraw] = useState("");
   const [error, setError] = useState("");
    const [success, setSuccess] = useState('');
   
      const [availbal, setAvailableBal] = useState();
      const [vip, setVip] = useState(0);
   
   const [slides, setSlides] = useState([
      {
         title: "VIP 1",
         heading: "VIP 1 Upgrade Conditions",
         text: "Amount that can be invested $: 30-500",
         text1: "Optional investment period (hours): 12",
         text2: "To: 24",
         price: "vi1-CIyqDPCR",
         days: 7,
         purchased: false,
         effectiveAmount: "30",
         effectiveAmount: "30",
         tradeAmount: "30",
         maxtradeAmount: "100",
         TeamA: "0",
         TeamBC: "0",
         roi: "1.3% - 1.5%",
         level: "8% / 2% / 1%",
      },
      {
         title: "VIP 2",
         heading: "VIP 2 Upgrade Conditions",
         text: "Amount that can be invested $: 100-300",
         text1: "Optional investment period (hours): 24",
         text2: "To: 48",
         price: "vip2-by-2",
         days: 15,
         purchased: false,
         effectiveAmount: "500",
         purchased: false,
         effectiveAmount: "500",
         tradeAmount: "500",
         maxtradeAmount: "2000",
         TeamA: "3",
         TeamBC: "6",
         roi: "1.6% - 1.8%",
         level: "10% / 3% / 2%",
      },
      {
         title: "VIP 3",
         heading: "VIP 3 Upgrade Conditions",
         text: "Amount that can be invested $: 500-2000",
         text1: "Optional investment period (hours): 24",
         text2: "To: 48",
         price: "vi2-CCAxt9OI",
         days: 15,
         purchased: false,
         effectiveAmount: "2000",
         purchased: false,
         effectiveAmount: "2000",
         tradeAmount: "2000",
         maxtradeAmount: "5000",
         TeamA: "10",
         TeamBC: "24",
         roi: "2.0% - 2.4%",
         level: "12% / 4% / 3%",
      },
      {
         title: "VIP 4",
         heading: "VIP 4 Upgrade Conditions",
         text: "Amount that can be invested $: 2000-5000",
         text1: "Optional investment period (hours): 24",
         text2: "To: 48",
         price: "vi3-BxULMU4r",
         days: 15,
         purchased: false,
         effectiveAmount: "5000",
         purchased: false,
         effectiveAmount: "5000",
         tradeAmount: "5000",
         maxtradeAmount: "15000",
         TeamA: "15",
         TeamBC: "48",
         roi: "2.6% - 3%",
         level: "14% / 4% / 3%",
      },
   ]);

  // VIP level mapping
  const vipTypeMap = {
    1: "Trainee",
    2: "Skilled",
    3: "Advance",
    4: "Expert",
    5: "Professional",
    6: "Ultimate"
  };


   useEffect(() => {
      fetchvip();
      fetchcontract();
      IncomeInfo();
      DepositInfo();
   }, [])
   const handleBuyClick = async (slideData) => {
      try {
         const response = await Api.post('/quality', {
         });
         if (response.data.success) {
            //  fetchwallet();
            setSuccess("trade successful", response.data.message);
            setSuccess("trade successful", response.data.message);
            // console.log("Purchase successful");
         } else {
            setSuccess(response.data.message);
            console.error(response.data);
         }
      } catch (error) {
         setSuccess("Error making purchase:", error);
         // console.error("Error making purchase:", error);
      }
   };

   const fetchcontract = async () => {
      try {
         const response = await Api.get("/fetchcontract");
         if (response.data && response.data.success) {
            console.log(response.data);
            setContract(response.data.fetchcontract?.slice(0, 10));
         }
      } catch (err) {
         setError(err.response?.data?.error || "Error fetching history");
      }
   };


      const IncomeInfo = async () => {
      try {
         const response = await Api.get("/incomeInfo");
         if (response.data) {
            // console.log(response.data);
            setIncomes(response.data.data);
         }
      } catch (error) {
         console.error(error);
         setError(error);
      }
   }

       const DepositInfo = async () => {
      try {
         const response = await Api.get("/depositInfo");
         if (response.data.success) {
      const userPackage = response.data.data.package;
      const withdraw = response.data.data.withdraw;
      // console.log("User package:", userPackage, withdraw);
      setWithdraw(withdraw);
      setDeposit(userPackage); // uncomment this to store it in state
    } else {
      console.error("Server error:", response.data.message);
    }
      } catch (error) {
    console.error("API error:", error);
    setError(error);
  }
   }

   const fetchvip = async () => {
      try {
         const response = await Api.get("/availbal");
         if (response.data?.AvailBalance !== undefined) {
            setAvailableBal(response.data.AvailBalance);
         }

          const response_vip = await Api.get("/get_vip");

      if (response_vip.data.success) {
        const vipValue = response_vip.data.vip;
        setVip(vipValue);
        setVipType(vipTypeMap[vipValue] || "0");
      }

      } catch (error) {
         console.error("Error fetching servers:", error);
      }
   };

   const PLAN_IMAGES = {
      0: "S1",
      5: "S2",
      10: "S3",
      50: "S4",
      120: "S5",
      340: "S6",
   };
   const getImageName = (plan) => PLAN_IMAGES[plan] || "S1";

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
   };
   const lastPurchasedIndex = slides.map(s => s.purchased).lastIndexOf(true);

   const cardStyle = {
      background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
      borderRadius: '12px',
      padding: '16px 20px',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
      //  width: '100%',
      maxWidth: '600px',
      boxShadow: '0 0 8px rgba(0,0,0,0.3)',
      fontSize: '14px',
      border: '1px solid #5c5757'
   };

   const rowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      alignItems: 'center',
   };



   

   const labelStyle = {
      color: '#bbb',
   };

   const valueStyle = {
      fontWeight: 'bold',
      fontSize: '15px',
      display: "flex",
      justifyContent: 'center'
   };

   const iconStyle = {
      width: '20px',
      height: '20px',
      marginRight: '6px',
      verticalAlign: 'middle',
   };

   const dividerStyle = {
      borderTop: '1px solid rgba(255,255,255,0.1)',
      margin: '12px 0',
   };


   //   tramsactoion css 

   const cardStyle2 = {
      background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
      borderRadius: '12px',
      padding: '16px 20px',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
      maxWidth: '500px',
      border: '1px solid #2a2a2a',
      marginBottom: '10px',
      marginTop: '4px',
      border: '1px solid #5c5757'
   };

   const topRowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      color: '#aaa',
      marginBottom: '10px',
   };

   const greenDotStyle = {
      width: '8px',
    height: '8px',
    backgroundColor: '#569d35',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '6px',
   };

   const dividerStyle2 = {
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      margin: '12px 0',
   };

   const gridStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#aaa',
   };

   const labelStyle2 = {
      marginBottom: '4px',
      fontSize: '13px',      
   };

   const valueStyle2 = {
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#fff',
   };
   

   const incomeStyle = {
      fontWeight: 'bold',
    fontSize: '15px',
    color: '#569d35',
    textAlign:'center'
   };

   const wrapperStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      //  backgroundColor: '#121212',
      padding: '6px 4px',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
   };

   const titleStyle = {
      fontSize: '15px',
      fontWeight: 'bold',
   };

   const buttonStyle = {
      border: '1px solid #333',
      borderRadius: '20px',
      padding: '6px 14px',
      fontSize: '14px',
      backgroundColor: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
   };

   const arrowStyle = {
      marginLeft: '6px',
      fontSize: '16px',
   };



   const [pair, setPair] = useState(null);
   
     // List of crypto pairs and icons
     const pairs = [
       { name: 'ETH-BNB', icons: ['eth.png', 'bnb.png'] },
       { name: 'BTC-USDT', icons: ['btc.png', 'usdt.png'] },
       { name: 'ADA-ETH', icons: ['ada.png', 'eth.png'] },
       { name: 'SOL-DOT', icons: ['solana.png', 'dot.png'] },
       { name: 'XRP-BNB', icons: ['xrp.png', 'bnb.png'] },
     ];
   
     useEffect(() => {
       const random = pairs[Math.floor(Math.random() * pairs.length)];
       setPair(random);
     }, []);
   
     const cardStyleNew = {
       background: 'linear-gradient(135deg, rgb(40 40 43), rgb(27, 27, 30))',
       borderRadius: '16px',
       padding: '20px',
       color: '#fff',
       fontFamily: 'Arial, sans-serif',
       maxWidth: '400px',
       border: '1px solid #2a2a2a',
       boxShadow: '0 0 10px rgba(0,0,0,0.3)',
       marginTop:'10px'
     };
   
     const headerStyle = {
       display: 'flex',
       alignItems: 'center',
       marginBottom: '10px',
       fontSize: '16px',
       fontWeight: 'bold',
     };
   
     const coinImgStyle = {
       width: '24px',
       height: '24px',
       borderRadius: '50%',
       marginRight: '-8px',
       border: '2px solid #121212',
       backgroundColor: '#000',
     };
   
     const chartWrapperStyle = {
       width: '100%',
       height: '100px',
       marginTop: '12px',
       marginBottom: '20px',
     };
   
     const infoRowStyle = {
       display: 'flex',
       justifyContent: 'space-between',
       fontSize: '14px',
       color: '#aaa',
     };
   
     const infoValueStyle = {
       color: '#fff',
       fontSize: '14px',
       fontWeight: 'bold',
     };
   
     const vipRateMap = {
      1: '1.3% - 1.5%',
      2: '1.6% - 1.8%',
      3: '2.0% - 2.4%',
      4: '2.6% - 3%',
      };
const vipRateRange = vipRateMap[vip] || '0';
  if (!pair) return null;






  
   return (
      <div class="uni-body pages-server-server">
          {success && <Toast message={success} onClose={() => setSuccess('')} />}
         <uni-app class="uni-app--showtabbar uni-app--maxwidth">
            <uni-page
               data-page="pages/server/server">

               <uni-page-wrapper>
                  <uni-page-body>
                     <Toaster position="top-right" reverseOrder={false} />
                     <uni-view data-v-7542ab04=""
                        class="page" style={{ paddingBottom: 90 }}>
                        <uni-view data-v-7542ab04="" class="ellipse"></uni-view>
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
                                 <uni-view data-v-3dcfa33c="" class="page-title">{t('Trade')}</uni-view>
                              </uni-view>
                              <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                 <Link to="/bill">
                                    <uni-view data-v-3dcfa33c="" class="set"><img data-v-53c5f33f="" src="/static/img/records.png" alt="" style={{ width: '25px', marginTop: '5px', filter: 'brightness(6) invert(0)' }} /></uni-view>
                                 </Link>
                              </uni-view>
                           </uni-view>
                        </uni-view>


                        <div style={cardStyle}>
      <div style={rowStyle}>
        <div>
          <span style={labelStyle}>{t('My Rank')}</span><br />
          <span style={valueStyle}>{vipType}</span>
        </div>
        <div>
          <span style={labelStyle}>{t('Income Balance')}</span><br />
          <span style={valueStyle}>$ {availbal ? availbal : "0.00"}.00</span>
        </div>
        <div>
          <span style={labelStyle}>{t('Total Income')}</span><br />
          <span style={valueStyle}>${incomes.totalIncome ? incomes.totalIncome : 0}.00</span>
        </div>
      </div>

      <div style={dividerStyle}></div>

      <div style={rowStyle}>
        <div>
          <span style={labelStyle}>{t("Total Deposit")}</span><br />
          <span style={{ ...valueStyle, color: '#00ff99' }}>${deposit ? deposit : 0}.00</span>
        </div>
        <div>
          <span style={labelStyle}>{t('Trade Income')}</span><br />
          <span style={valueStyle}>${incomes.tradingIncome ? incomes.tradingIncome : 0}.00</span>
        </div>
        <div>
          <span style={labelStyle}>{t('Team Benefits')}</span><br />
          <span style={valueStyle}>${incomes.teamIncome ? incomes.teamIncome : 0}.00</span>
        </div>
      </div>
    </div>


                        <SmartTradeQuantization />
                       

                       <div style={cardStyleNew}>
                              <div style={headerStyle}>
                              <img
                                 src={`/static/coin/${pair.icons[0]}`}
                                 alt={pair.name.split('-')[0]}
                                 style={coinImgStyle}
                              />
                              <img
                                 src={`/static/coin/${pair.icons[1]}`}
                                 alt={pair.name.split('-')[1]}
                                 style={{ ...coinImgStyle, marginLeft: '8px' }}
                              />
                              <span style={{ marginLeft: '12px' }}>{pair.name}</span>
                              </div>

                              <div style={chartWrapperStyle}>
                              <svg width="100%" height="100%">
                                 <path
                                    d="M0,90 Q20,40 40,60 Q60,80 80,65 Q100,70 120,60 Q140,75 160,55 Q180,65 200,55 Q220,75 240,65 Q260,85 280,75 Q300,70 320,60"
                                    stroke="#51fbc1"
                                    strokeWidth="2"
                                    fill="none"
                                 />
                              </svg>
                              </div>

                              <div style={infoRowStyle}>
                              <div>
                                 <div>{t('Transaction Amount')}</div>
                                 <div style={infoValueStyle}>{deposit ? deposit : 0}.00 USDT</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                 <div>{t('Rate Of Return')}</div>
                                 <div style={infoValueStyle}>{vipRateRange}</div>
                              </div>
                              </div>
                           </div>


                        <div style={wrapperStyle}>
                           <div style={titleStyle}>{t('My Trade')}</div>
                           <button style={buttonStyle}>
                              <Link to="/bill" style={{ color: '#fff', textDecoration: 'none' }}>
                                 {t('Bill List')} <span style={arrowStyle}>›</span>
                              </Link>
                           </button>
                        </div>


                        {Contract.map((item, index) => (
                           <div style={cardStyle2}>
                              {/* Top Row */}
                            


                              {/* Detail Grid */}
                             <div style={gridStyle}>
                                 <div>
                                    <div style={labelStyle2}>{t('Position')}</div>
                                    <div style={valueStyle2}>{item.trade}</div>
                                 </div>
                                
                                 <div>
                                    <div style={{labelStyle2 , marginLeft:"30px"}}>{t('Profit')}</div>
<div style={{ ...valueStyle2, color: 'rgb(33, 255,180)', marginBottom: 0 }}>${item.profit}</div>
                                 </div>
                                 </div>
                                    <div style={gridStyle}>
                                 <div>
                                    <div style={labelStyle2}>{t('Entry Price')}</div>
                                    <div style={valueStyle2}>{item.c_buy}</div>
                                 </div>
                                
                                 <div>
                                    <div style={{ ...labelStyle2, marginLeft: 23 }}>{t('Exit Price')}</div>
                                    <div style={{valueStyle2}}>{item.c_sell}</div>
                                 </div>
                                 </div>
                                    <div style={gridStyle}>
                                 <div>
                                    <div style={labelStyle2}>{t('Symbol')}</div>
                                    <div style={valueStyle2}>USDT-{item.c_name.toUpperCase()}</div>
                                 </div>
                                
                                 <div>
<div style={{ ...labelStyle2, marginLeft: 54 }}>
  {t('Completion Time')}
</div>                                    <div style={valueStyle2}>   {new Date(item.created_at).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })}</div>
                                 </div>
                                 </div>
                           </div>
                        ))
                        }
                     </uni-view>
                  </uni-page-body>
               </uni-page-wrapper>
            </uni-page>


         </uni-app>



      </div>
   );
};

export default Server;






