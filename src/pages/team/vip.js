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
import LevelCard from "./LevelCard";
import { useTranslation } from 'react-i18next';

const Server = () => {
   const { t } = useTranslation();

   const [activeTab, setActiveTab] = useState("running");
   const [servers, setQualitys] = useState([])
   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
   const [slides, setSlides] = useState([
  {
    title: t("Trainee"),
    heading: t("Trainee Upgrade Conditions"),
    text: t("Amount that can be invested $: 50-1000"),
    text1: t("Optional investment period (hours): 12"),
    text2: t("To: 24"),
    price: "vi1-CIyqDPCR",
    days: 7,
    purchased: false,
    effectiveAmount: "50",
    tradeAmount: "50",
    maxtradeAmount: "1000",
    DailyTrade: "3",
    TeamA: "0",
    TeamBC: "0",
    roi: "0.9% - 1.10%",
    level: "N/A",
    bgImg: "/static/img/bg_v1.5140c5ef.png"
  },
  {
    title: t("Skilled"),
    heading: t("Skilled Upgrade Conditions"),
    text: t("Amount that can be invested $: 501-2500"),
    text1: t("Optional investment period (hours): 24"),
    text2: t("To: 48"),
    price: "vip2-by-2",
    days: 15,
    purchased: false,
    effectiveAmount: "501",
    tradeAmount: "501",
    maxtradeAmount: "2500",
    DailyTrade: "3",
    TeamA: "3",
    TeamBC: "6",
    roi: "1.9% - 2.10%",
    level: "10% / 6% / 4% /2% /1%",
    bgImg: "/static/img/bg_v2.ecaae616.png"
  },
  {
    title: t("Advance"),
    heading: t("Advance Upgrade Conditions"),
    text: t("Amount that can be invested $: 2001-5000"),
    text1: t("Optional investment period (hours): 24"),
    text2: t("To: 48"),
    price: "vi2-CCAxt9OI",
    days: 15,
    purchased: false,
    effectiveAmount: "2001",
    tradeAmount: "2001",
    maxtradeAmount: "5000",
    DailyTrade: "3",
    TeamA: "10",
    TeamBC: "25",
    roi: "2.40% - 2.60%",
    level: "10% / 6% / 4% /2% /1%",
    bgImg: "/static/img/bg_v3.1f7aca15.png"
  },
  {
    title: t("Expert"),
    heading: t("Expert Upgrade Conditions"),
    text: t("Amount that can be invested $: 5001-10000"),
    text1: t("Optional investment period (hours): 24"),
    text2: t("To: 48"),
    price: "vi3-BxULMU4r",
    days: 15,
    purchased: false,
    effectiveAmount: "5001",
    tradeAmount: "5001",
    maxtradeAmount: "10000",
    DailyTrade: "3",
    TeamA: "20",
    TeamBC: "75",
    roi: "2.90% - 3.10%",
    level: "10% / 6% / 4% /2% /1%",
    bgImg: "/static/img/bg_v4.f972d897.png"
  }
,


  {
    title: t("Professional"),
    heading: t("Professional Upgrade Conditions"),
    text: t("Amount that can be invested $: 10001-25000"),
    text1: t("Optional investment period (hours): 24"),
    text2: t("To: 48"),
    price: "vi3-BxULMU4r",
    days: 15,
    purchased: false,
    effectiveAmount: "10001",
    tradeAmount: "10001",
    maxtradeAmount: "25000",
    DailyTrade: "3",
    TeamA: "25",
    TeamBC: "125",
    roi: "3.40% - 3.60%",
    level: "10% / 6% / 4% /2% /1%",
    bgImg: "/static/img/vip5.png"
  }
,

  {
    title: t("Ultimate"),
    heading: t("Ultimate Upgrade Conditions"),
    text: t("Amount that can be invested $: 25000-100000"),
    text1: t("Optional investment period (hours): 24"),
    text2: t("To: 48"),
    price: "vi3-BxULMU4r",
    days: 15,
    purchased: false,
    effectiveAmount: "25000",
    tradeAmount: "25000",
    maxtradeAmount: "100000",
    DailyTrade: "3",
    TeamA: "30",
    TeamBC: "250",
    roi: "3.90% - 4.10%",
    level: "10% / 6% / 4% /2% /1%",
    bgImg: "/static/img/vip6.png"
  }
]);

   useEffect(() => {
      fetchvip();
   }, [])
   const handleBuyClick = async (slideData) => {
      try {
         const response = await Api.post('/quality', {
         });
         if (response.data.success) {
            //  fetchwallet();
            toast.success("trade successful", response.data.message);
            toast.success("trade successful", response.data.message);
            // console.log("Purchase successful");
         } else {
            toast.error(response.data.message);
            console.error(response.data);
         }
      } catch (error) {
         toast.error("Error making purchase:", error);
         // console.error("Error making purchase:", error);
      }
   };

   const fetchvip = async () => {
      try {
         const response = await Api.get('/fetchvip');
         // console.log(response.data);
         if (response.data?.success) {
            setQualitys(response.data);
            const serverData = response.data;
            const updatedSlides = slides.map((slide) => {
               // const balanceOk = parseFloat(serverData.balance) >= parseFloat(slide.effectiveAmount);
               const balanceOk = parseFloat(serverData.deposit) >= parseFloat(slide.effectiveAmount);
               const directOk = parseInt(serverData.directmembers) >= parseInt(slide.TeamA);
               const teamB = parseInt(serverData.sponsor?.teamBCount || 0);
               const teamC = parseInt(serverData.sponsor?.teamCCount || 0);
               const totalTeamBC = teamB + teamC;
               const teamOk = totalTeamBC >= parseInt(slide.TeamBC);
               const isPurchased = balanceOk && directOk && teamOk;

               return {
                  ...slide,
                  purchased: isPurchased,
               };
            });

            setSlides(updatedSlides);
         } else {
            console.error("API did not return success");
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
      background: 'linear-gradient(to bottom, #0f1f1f, #111)',
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


   return (
      <div class="uni-body pages-server-server">
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
                                       <img data-v-1011963f="" src="/static/img/back.png" alt="" style={{ width: '29px', filter: 'brightness(6) invert(0)' }} />
                                    </uni-view>
                                 </Link>
                              </uni-view>
                              <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                 <uni-view data-v-3dcfa33c="" class="page-title">{t('Upgrade Level')}</uni-view>
                              </uni-view>

                           </uni-view>
                        </uni-view>

                        <uni-view data-v-7542ab04="" class="container" >
                           {/* {activeTab  ( */}

                           <uni-swiper data-v-7542ab04="" class="swiper">
                              <div class="uni-swiper-wrapper">
                                 <div class="uni-swiper-slides">
                                    <div class="uni-swiper-slide-frame"
                                       style={{ width: '100%', height: '340px', transform: 'translate(0%, 0px) translateZ(0px)' }}>

                                       <uni-swiper-item
                                          data-v-7542ab04="" class="product-card" style={{ marginTop: '10px', borderRadius: '10px' }}
                                       >
                                          <Slider {...settings} beforeChange={(oldIndex, newIndex) => setCurrentSlideIndex(newIndex)}>
                                             {slides.map((slide, index) => (
                                                <uni-view data-v-b19b400c="" key={index}>
                                                   <div>
                                                      <LevelCard
                                                      level={slide.title}
                                                      status={
                                                         slide.purchased
                                                            ? index === lastPurchasedIndex
                                                            ? t("Current")
                                                            : t("Achieved")
                                                            : t("Not Achieved")
                                                      }
                                                      description={
                                                         slide.purchased
                                                            ? index === lastPurchasedIndex
                                                            ? t("Unlocked this level")
                                                            : t("Unlocked this level")
                                                            : t("Not unlocked this level yet")
                                                      }
                                                      locked={!slide.purchased}
                                                      backgroundImage={slide.bgImg}
                                                      />
                                                   </div>
                                                </uni-view>
                                             ))}
                                          </Slider>
                                       </uni-swiper-item>


                                    </div>
                                 </div>
                              </div>
                              <uni-view data-v-0f43bbff="" class="rule-box">
                                 <uni-view data-v-0f43bbff="" class="title">{slides[currentSlideIndex]?.heading || "Rank Upgrade Conditions"}</uni-view>
                                 <uni-view data-v-0f43bbff="" class="layout">
                                    <uni-view data-v-0f43bbff="" class="level">
                                       {/* <img data-v-0f43bbff="" src="/static/img/TeamA.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                                       {t('Wallet Balance')}</uni-view>
                                    <uni-view data-v-0f43bbff="" class="rate">${servers.deposit || 0}/ ${slides[currentSlideIndex]?.tradeAmount || "10%"}</uni-view>
                                 </uni-view>
                                 <uni-view data-v-0f43bbff="" class="layout">
                                    <uni-view data-v-0f43bbff="" class="level">
                                       {/* <img data-v-0f43bbff="" src="/static/img/TeamBC.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                                       {t('First Layer Valid Members')}</uni-view>
                                    <uni-view data-v-0f43bbff="" class="rate">{servers.directmembers || 0}/{slides[currentSlideIndex]?.TeamA}</uni-view>
                                 </uni-view>
                                 <uni-view data-v-0f43bbff="" class="layout">
                                    <uni-view data-v-0f43bbff="" class="level">
                                       {/* <img data-v-0f43bbff="" src="/static/img/TeamC.png" alt="" style={{filter: 'brightness(0.72) invert(0)'}}/> */}
                                       {t('Second + Third Layer Valid Members')}</uni-view>
                                    <uni-view data-v-0f43bbff="" class="rate">{(servers?.sponsor?.teamBCount ?? 0) + (servers?.sponsor?.teamCCount ?? 0)}/{slides[currentSlideIndex]?.TeamBC}</uni-view>
                                 </uni-view>
                                 {/* <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      Third Layer Valid Members</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">{servers?.sponsor?.teamCCount || 0}</uni-view>
                  </uni-view> */}

                              </uni-view>
                              <uni-view data-v-0f43bbff="" class="rule-box">
                                 <uni-view data-v-0f43bbff="" class="title">{t('Rank Benefits')}</uni-view>
                                 <uni-view data-v-0f43bbff="" class="layout">
                                    <uni-view data-v-0f43bbff="" class="level">
                                       {/* <img data-v-0f43bbff="" src="/static/img/TeamA.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                                       {t('Minimum Trade Wallet')}</uni-view>
                                    <uni-view data-v-0f43bbff="" class="rate">${slides[currentSlideIndex]?.tradeAmount || "10%"}</uni-view>
                                 </uni-view>
                                 <uni-view data-v-0f43bbff="" class="layout">
                                    <uni-view data-v-0f43bbff="" class="level">
                                       {/* <img data-v-0f43bbff="" src="/static/img/TeamBC.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                                       {t('Maximum Trade Wallet')}</uni-view>
                                    <uni-view data-v-0f43bbff="" class="rate">${slides[currentSlideIndex]?.maxtradeAmount || "10%"}</uni-view>
                                 </uni-view>
                                 <uni-view data-v-0f43bbff="" class="layout">
                                    <uni-view data-v-0f43bbff="" class="level">
                                       {/* <img data-v-0f43bbff="" src="/static/img/TeamC.png" alt="" style={{filter: 'brightness(0.72) invert(0)'}}/> */}
                                      {t('Daily Trade times')}</uni-view>
                                    <uni-view data-v-0f43bbff="" class="rate">{slides[currentSlideIndex]?.DailyTrade || "3"}</uni-view>
                                 </uni-view>
                                 <uni-view data-v-0f43bbff="" class="layout">
                                    <uni-view data-v-0f43bbff="" class="level">
                                       {/* <img data-v-0f43bbff="" src="/static/img/Vm4.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                                      {t('Return on Investment')}</uni-view>
                                    <uni-view data-v-0f43bbff="" class="rate">{slides[currentSlideIndex]?.roi}</uni-view>
                                 </uni-view>
                                 <uni-view data-v-0f43bbff="" class="layout">
                                    <uni-view data-v-0f43bbff="" class="level">
                                       {/* <img data-v-0f43bbff="" src="/static/img/Vm4.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                                      {t('Level Income Up to Level')}</uni-view>
                                    <uni-view data-v-0f43bbff="" class="rate">{slides[currentSlideIndex]?.level}</uni-view>
                                 </uni-view>
                              </uni-view>
                           </uni-swiper>



                           {/* )} */}
                        </uni-view>

                     </uni-view>
                  </uni-page-body>
               </uni-page-wrapper>
            </uni-page>


         </uni-app>



      </div>
   );
};

export default Server;






