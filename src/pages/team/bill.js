import React, { useEffect, useState } from 'react';
 
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Notice = () => {
      const navigate = useNavigate();
const { t } = useTranslation();

    const [Contract, setContract] = useState([]);
        const [error, setError] = useState("");
        useEffect(() => {
            fetchcontract();
        }, []);
   
        const fetchcontract = async () => {
            try {
                const response = await Api.get("/fetchcontract");
                if (response.data && response.data.success) {
                    console.log(response.data);
                    setContract(response.data.fetchcontract);
                }
            } catch (err) {
                setError(err.response?.data?.error || "Error fetching history");
            }
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
    marginTop:'10px',
     border:'1px solid #5c5757'
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
     
 
    return (
        <div class="uni-body pages-index-message">
            <uni-app class="uni-app--maxwidth">
                <uni-page data-page="pages/index/message">
                    <uni-page-wrapper>
                        <uni-page-body>
                            <uni-view data-v-c62a6474="" class="page">
                                <uni-view data-v-c62a6474="" class="ellipse"></uni-view>
                                <uni-view data-v-c62a6474="" class="top-box">
                                    <uni-view data-v-636c600c="" data-v-c62a6474="" class="uni-row" style={{marginLeft: '0px',marginRight: '0px'}}>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                          <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                                                <uni-view data-v-c62a6474="" class="back">
                                                    <img data-v-c62a6474="" src="/static/img/back.png"  alt="" style={{width: '35px',filter: 'brightness(6) invert(0)'}}/>
                                                </uni-view>
                                           </div>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-12" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                                            <uni-view data-v-c62a6474="" class="page-title">{t('Quantify History')}</uni-view>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{paddingLeft: '0px',paddingright: '0px'}}></uni-view>
                                    </uni-view>
                                </uni-view>
                              {Contract.map((item, index) => (
                                <div style={cardStyle2}>
                              {/* Top Row */}
                              <div style={topRowStyle}>
                              <span><span>{new Date(item.created_at).toLocaleString()}</span>
</span>
                              <span>
                                 <span style={greenDotStyle}></span>{item.c_status === -1 ? 'Completed' : item.c_status === 1 ? 'Completed' : 'Unknown'}
                              </span>
                              </div>
 
                              <div style={dividerStyle2}></div>
 
                              {/* Detail Grid */}
                              <div style={gridStyle}>
                              <div>
                                 <div style={labelStyle2}>{t('Trading Pair')}</div>
                                 <div style={valueStyle2}>USDT-{item.c_name.toUpperCase()}</div>
                              </div>
                              <div>
                                 <div style={labelStyle2}>{t('Position')}</div>
                                 <div style={valueStyle2}>{item.trade}</div>
                              </div>
                              <div>
                                 <div style={labelStyle2}>{t('Amount Of Income')}</div>
                                 <div style={incomeStyle}>${item.profit}</div>
                              </div>
                              </div>
                           </div>
                           ))
                                        }
 
                                {/* {Contract.map((item, index) => (
                                                <uni-view data-v-248ca5b8="" class="item" >
                                                    <uni-view data-v-248ca5b8="" class="first">
                                                        <uni-view data-v-248ca5b8="" class="left">
                                                         Buy : {item.c_buy}
                                                        </uni-view>
                                                        <uni-view data-v-248ca5b8=""
                                                            class="right" style={{ color: "#fff",fontWeight:"900"}}>
                                                            Sell :{item.c_sell}
                                                        </uni-view>
                                                    </uni-view>
 
                                                    <uni-view data-v-248ca5b8="" class="layer">
                                                        <uni-view data-v-248ca5b8="" class="title">Profit</uni-view>
                                                        <uni-view data-v-248ca5b8="" class="value" style={{ color: "#51fbc1",fontWeight:"900"}}>
                                                            {item.profit || item.c_sell || '—'}
                                                        </uni-view>
                                                    </uni-view>
                                                </uni-view>
                                               
                                            ))
                                        } */}
                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>
 
            </uni-app>
 
        </div>
    );
};
 
export default Notice;
 