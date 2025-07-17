import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import Api from "../../Requests/Api";
import Collapse from 'react-collapse';
import { SlArrowRight } from "react-icons/sl";
import TradingChart from "./TradingChart";
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import FeatureGrid from "./FeatureGrid";
import WelcomeMarquee from "./WelcomeMarquee";
import WelcomePopup from "./WelcomePopup";
import AICarousel from "./AICarousel";

const symbols = ["dogeusdt", "ethusdt", "dotusdt", "nearusdt"];



const Dashboard = () => {
     const { i18n, t } = useTranslation();
   const [selectedSymbol, setSelectedSymbol] = useState(null);
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

   // const [isOpen, setIsOpen] = useState(false); // Modal visibility state
   // const toggleDropdown = () => setIsOpen(!isOpen);

   const [cryptoData, setCryptoData] = useState({});
   const [binanceSymbols, setBinanceSymbols] = useState([]);
   const [showAll, setShowAll] = useState(false); // toggle state

     useEffect(() => {
    const alreadyClosed = sessionStorage.getItem('welcome_popup_closed');
    if (!alreadyClosed) {
      setShowPopup(true);
    }
  }, []);


    const handleClose = () => {
    sessionStorage.setItem('welcome_popup_closed', 'true');
    setShowPopup(false);
  };



   useEffect(() => {
      const fetchCrypto = async () => {
         try {
            const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
               params: {
                  vs_currency: "usd",
                  order: "market_cap_desc",
                  per_page: 20,
                  page: 1,
                  sparkline: false
               }
            });

            const formatted = {};
            const binanceSyms = [];

            res.data.forEach((coin) => {
               const symbol = `${coin.symbol}usdt`.toUpperCase();
               formatted[symbol] = {
                  id: coin.id,
                  name: coin.name,
                  symbol: symbol,
                  image: coin.image,
                  price: coin.current_price,
                  change: coin.price_change_24h,
                  percent: coin.price_change_percentage_24h,
                  volume: (coin.total_volume / 1_000_000).toFixed(2) + "M"
               };
               binanceSyms.push(symbol.toLowerCase());
            });

            setCryptoData(formatted);
            setBinanceSymbols(binanceSyms);
         } catch (error) {
            console.error("CoinGecko fetch error:", error);
         }
      };

      fetchCrypto();
   }, []);

   useEffect(() => {
      if (binanceSymbols.length === 0) return;

      const ws = new WebSocket(
         `wss://stream.binance.com:9443/stream?streams=${binanceSymbols
            .map((s) => `${s}@ticker`)
            .join("/")}`
      );

      ws.onmessage = (event) => {
         const msg = JSON.parse(event.data);
         const data = msg.data;

         setCryptoData((prev) => {
            const existing = prev[data.s];
            if (!existing) return prev;

            return {
               ...prev,
               [data.s]: {
                  ...existing,
                  price: parseFloat(data.c),
                  change: parseFloat(data.p),
                  percent: parseFloat(data.P),
                  volume: (parseFloat(data.v) / 1_000_000).toFixed(2) + "M"
               }
            };
         });
      };

      return () => ws.close();
   }, [binanceSymbols]);

   const allCoins = Object.values(cryptoData);
   const coinsToShow = showAll ? allCoins : allCoins.slice(0, 5);
   const [loading, setLoading] = useState(true);
   const [availbal, setAvailableBal] = useState();



   const [userDetails, setUserDetails] = useState(null);
   const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

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
   // }, [token]);
   useEffect(() => {
      withfatch();
   }, []);

   const withfatch = async () => {
      try {
         const response = await Api.get("/availbal");
         if (response.data?.AvailBalance !== undefined) {
            setAvailableBal(response.data.AvailBalance);
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };


 const faqData = [
  { 
    question: t('What is Finomax?'), 
    answer: t('Finomax is a quantification-based crypto trading platform that uses advanced algorithms and AI models to generate daily profits through high-frequency and arbitrage strategies') 
  },
  { 
    question: t('How does Finomax generate profit?'), 
    answer: t('Finomax leverages real-time market data, machine learning, and automated trading bots to execute high-speed trades with minimal latency. Profits are shared with users through structured VIP plans.') 
  },
  { 
    question: t('What is Arbitrage ?'), 
    answer: t('Buying a cryptocurrency at a lower price on one exchange and simultaneously selling it at a higher price on another exchange. The profit is made from the difference in prices') 
  },
];
   const [openIndex, setOpenIndex] = useState(null);

   const toggleDropdown = (index) => {
      setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
   };

   const navTeam = () => {
      navigate("/Refer"); // 👈 Go back to the previous page in history
   };
   const navQuality = () => {
      navigate("/quality"); // 👈 Go back to the previous page in history
   };
   return (

      <div class="uni-body pages-index-index">

          <div>
            {showPopup && <WelcomePopup onClose={() => handleClose()} />}
         </div>

         <uni-app class="uni-app--showtabbar uni-app--maxwidth">
            <uni-page
               data-page="pages/index/index"> <uni-page-wrapper><uni-page-body>
                  <uni-view data-v-06ae08d2=""
                     class="page">
                     <uni-view
                        data-v-06ae08d2="" class="top-box"><uni-view data-v-06ae08d2="" class="left">
                           <Link to="/setting">
                              <uni-view
                                 data-v-06ae08d2="" class="ava"><img data-v-06ae08d2="" src="/static/img/image.png"
                                    alt="" /></uni-view>
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
                              <Link target="" to="#">
                           <uni-view data-v-06ae08d2="" class="notice"><img
                              data-v-06ae08d2="" src="/static/img/supprt.png" alt=""
                              style={{ width: '28px', height: '28px'}} /></uni-view> 
                              </Link>
                           <Link to="/notice">
                              <uni-view data-v-06ae08d2="" class="notice"><img
                                 data-v-06ae08d2="" src="/static/img/belliy.png" alt="" style={{ width: '28px', height: '28px'}} /><uni-view
                                    data-v-06ae08d2=""
                                    class=""></uni-view></uni-view>
                           </Link>
                        </uni-view>
                     </uni-view>
                     {/* {t('welcome')}, {userDetails?.name} */}
                     <uni-view data-v-06ae08d2="" class="ellipse"></uni-view>


                      <AICarousel />

                    
                        <br></br>

                        <WelcomeMarquee/>

                     {/* <uni-view data-v-06ae08d2=""
                        class="attention-box">

                           {coinsToShow.map((coin, index) => {
                                 const isPositive = coin.percent >= 0;
                                 const percentColor = isPositive ? '#51fbc1' : 'rgb(255, 87, 87)';
                                 return (
                           <uni-view  key={coin.symbol}

                           // onClick={() => setSelectedSymbol(coin.symbol)} 
                           // onClick={() => coin.symbol && navigate(`/dashboard/TradingChart/${coin.symbol.toUpperCase()}`)} 
                           data-v-06ae08d2="" class="attention-item">
                              <uni-view data-v-06ae08d2="" class="coin-layer">
                                 <img data-v-06ae08d2=""
                                 src={coin.image} alt="" />
                                 <uni-view data-v-06ae08d2=""
                                    class="coin-name">{coin.symbol}<uni-view data-v-06ae08d2=""
                                       class="coin">{coin.volume}</uni-view></uni-view></uni-view>
                              <uni-view
                                 data-v-06ae08d2="" class="price">{coin.price}</uni-view>
                              <uni-view data-v-06ae08d2="" style={{ color: percentColor }}
                                 class="prop-updown"> {coin.percent > 0 ? `+${coin.percent}%` : `${coin.percent}%`}</uni-view></uni-view>


                              );
                           })}
                  </uni-view> */}
                    
                  <FeatureGrid/>
                     <uni-view data-v-06ae08d2="" class="market-box"><uni-view
                        data-v-06ae08d2="" class="market-title">{t('MarketQuotes')}</uni-view>


                        <div style={{ padding: "2px", color: "#fff", maxWidth: "500px" }}>
                           {coinsToShow.map((coin) => {
                              const isPositive = coin.percent >= 0;
                              return (
                                 <div
                                    key={coin.symbol}

                                    // onClick={() => setSelectedSymbol(coin.symbol)} 
                                    // onClick={() => coin.symbol && navigate(`/dashboard/TradingChart/${coin.symbol.toUpperCase()}`)}
                                    style={{
                                       display: "flex",
                                       alignItems: "center",
                                       justifyContent: "space-between",
                                       background: "linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))",
                                       padding: "12px",
                                       borderRadius: "10px",
                                       marginBottom: "10px"
                                    }}
                                 >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <img
                                          src={coin.image}
                                          alt={coin.name}
                                          style={{
                                             width: "40px",
                                             height: "40px",
                                             borderRadius: "50%",
                                             marginRight: "10px",
                                             color: "#fff"

                                          }}
                                       />

                                       <div>
                                          <div style={{ fontWeight: "bold", color: "#fff" }}>{coin.symbol}</div>
                                          <div style={{ fontSize: "12px", color: "#fff" }}>{coin.volume}</div>
                                       </div>
                                    </div>

                                    <div style={{ textAlign: "right", marginRight: "10px" }}>
                                       <div style={{ color: "#fff" }}>${coin.price?.toFixed(2)}</div>
                                       <div style={{ fontSize: "12px", color: isPositive ? "#0f0" : "#f44" }}>
                                          {coin.change?.toFixed(2)}
                                       </div>
                                    </div>

                                    <div
                                       style={{
                                          background: isPositive ? "linear-gradient(to bottom, #51fbc1, #51fbc1)" : "#f44336",
                                          color: "#000",
                                          padding: "4px 10px",
                                          borderRadius: "12px",
                                          fontSize: "13px",
                                          minWidth: "60px",
                                          textAlign: "center"
                                       }}
                                    >
                                       {isPositive ? "+" : ""}
                                       {coin.percent?.toFixed(2)}%
                                    </div>
                                 </div>
                              );
                           })}

                           {/* Show More / Less Button */}
                           {allCoins.length > 5 && (
                              <uni-view data-v-06ae08d2="" onClick={() => setShowAll(!showAll)}
                                 style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '3px' }}> {showAll ? "Hide " : "More "}<img
                                    data-v-06ae08d2="" src="/static/img/Expand.png" alt=""
                                    style={{ width: '30px', height: '20px', filter: 'brightness(6) invert(0)' }} /> </uni-view>
                           )}
                        </div>
                        {selectedSymbol && <TradingChart symbol={selectedSymbol} />}



                     </uni-view>
                     <uni-view
                        data-v-06ae08d2="" class="market-title"
                        style={{ marginTop: '10px', marginBottom: '8px' }}>{t('FAQ')}</uni-view>
                     <uni-view data-v-06ae08d2=""
                        class="content"
                     >

                        <uni-view data-v-6fe2d4dd="" data-v-06ae08d2="" class="uni-collapse">
                           {faqData.map((faq, index) => (
                              <uni-view
                                 key={index}
                                 data-v-9da912bc=""
                                 data-v-06ae08d2=""
                                 class="uni-collapse-item"
                              >
                                 <uni-view
                                    data-v-9da912bc=""
                                    onClick={() => toggleDropdown(index)}
                                    class="uni-collapse-item__title uni-collapse-item-border"
                                 >
                                    <uni-view data-v-9da912bc="" class="uni-collapse-item__title-wrap">
                                       <uni-view data-v-9da912bc="" class="uni-collapse-item__title-box">
                                          <uni-text
                                             data-v-9da912bc=""
                                             class="uni-collapse-item__title-text"
                                          >
                                             <span>{faq.question}</span>
                                          </uni-text>
                                       </uni-view>
                                    </uni-view>
                                    <uni-view
                                       data-v-9da912bc=""
                                       class="uni-collapse-item__title-arrow uni-collapse-item--animation"
                                    >
                                       <uni-text
                                          data-v-45a6b600=""
                                          data-v-9da912bc=""
                                          class="uni-icons"
                                          style={{ color: 'rgb(187, 187, 187)', fontSize: '2px' }}
                                       >
                                          <img
                                             src="/static/img/downarrow.png"
                                             alt=""
                                             style={{
                                                width: '14px',
                                                marginLeft: '2px',
                                                transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.3s ease",
                                                filter: 'brightness(0) invert(1)'
                                             }}
                                          />
                                       </uni-text>
                                    </uni-view>
                                 </uni-view>
                                 {openIndex === index && (
                                    <Collapse isOpened={true} data-v-9da912bc="" class="uni-collapse-item__wrap is--transition">
                                       <uni-view data-v-9da912bc="" id="Uni_la5w" class="uni-collapse-item__wrap-content open">
                                          <uni-view data-v-06ae08d2="" class="content">
                                             <uni-text data-v-06ae08d2="" class="text">
                                                <span>{faq.answer}</span>
                                             </uni-text>
                                          </uni-view>
                                       </uni-view>
                                    </Collapse>
                                 )}
                              </uni-view>
                           ))}
                        </uni-view>



                        {/* <uni-view data-v-06ae08d2="" class="title">{t('Policy')}</uni-view>
                        <uni-view data-v-06ae08d2="" class="policy-item">{t('FIREFLYAgreement')}<SlArrowRight size={11} style={{ marginLeft: '5px' }} /></uni-view>
                        <uni-view data-v-06ae08d2="" class="policy-item">{t('FireflyServerUsageAgreement')}<SlArrowRight size={11} style={{ marginLeft: '5px' }} /></uni-view> */}
                     </uni-view>

                  </uni-view>

               </uni-page-body>
               </uni-page-wrapper>
            </uni-page>

         </uni-app>
         <Outlet />
      </div>
   );

};
export default Dashboard;
