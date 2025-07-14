import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Api from '../../Requests/Api';
import MyIncomeCard from './MyIncomeCard';
import TransactionCard from './TransactionCard';
import { useTranslation } from 'react-i18next';
const moment = require('moment-timezone');

const Assets = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [balance, setBalance] = useState(null);
    const { t } = useTranslation();
    useEffect(() => {
        fetchUsers();
        withavail();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await Api.get("/getUserHistory");

            if (response.data && response.data.success) {
                console.log(response.data);
                setTransactions(response.data.transactions);
            } else {
                setTransactions([]);
            }

            console.log("Fetched:", response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching history");
        }
    };
    const withavail = async () => {
          try {
             const response = await Api.get("/availbal");
             if (response.data) {
                setBalance(response.data.AvailBalance);
             }
          } catch (error) {
             console.error(error);
             setError(error);
          }
       }


     const getAmountColor = (type) => {
        return type === 'buyfund' || type === 'income'  || type === 'investment'  ? '#569d35' : 'rgb(255, 61, 61)';
    };

    const getAmountPrefix = (type) => {
        return type === 'buyfund' || type === 'income' ? '+ ' : '- ';
    };
    const getAmount = (type, item) => {
        return type === 'income' ? item.comm : item.amount;
    };
    
    const topTransactions = transactions.slice(0, 8); // top 5 only


    const formatUTCDate = (dateStr) => {
        return moment(dateStr).format('DD/MM/YYYY, HH:mm:ss');
        };
  
    return (
        <div class="uni-body pages-assets-assets">
            <uni-app class="uni-app--showtabbar uni-app--maxwidth">
                <uni-page
                    data-page="pages/assets/assets">
                    <uni-page-wrapper>
                        <uni-page-body>
                            <uni-view data-v-248ca5b8=""
                                class="page">
                                <uni-view data-v-248ca5b8="" class="ellipse"></uni-view>
                                <uni-view
                                    data-v-248ca5b8="" class="page-title">{t('Asset Management')}</uni-view>
                                    
                                <uni-view
                                    data-v-248ca5b8="" class="balance-card">
                                    <uni-view data-v-248ca5b8="" class="first">
                                        <uni-view
                                            data-v-248ca5b8="" class="balance-title">{t('Your Balance(USDT)')}
                                        </uni-view>
                                    </uni-view>
                                    <uni-view data-v-248ca5b8="" class="second">
                                        <uni-view
                                            data-v-248ca5b8="" translate="no" class="balance-num">$ {balance ||0}</uni-view>
                                        <uni-view
                                            data-v-248ca5b8="" translate="no" class="profit-num">
                                            
                                        </uni-view>
                                    </uni-view>
                                    <uni-view
                                        data-v-248ca5b8="" class="third">
                                        <uni-view data-v-06ae08d2=""
                                            class="balance-btn">
                                            <Link to="/deposit" style={{ color: '#000', textDecoration: 'none', fontWeight: '500', fontSize: '16px' }}>
                                                {t('Deposit')}
                                            </Link><img data-v-06ae08d2="" src="/static/img/usdtdown.png"
                                                alt="" />
                                        </uni-view>
                                      
                                        <uni-view
                                            data-v-06ae08d2="" class="balance-btn">  <Link to="/withdraw-req" style={{ color: '#000', textDecoration: 'none', fontWeight: '500', fontSize: '16px' }}>
                                                {t("Withdraw")}
                                            </Link><img data-v-06ae08d2=""
                                                src="/static/img/usdtup.png" alt="" /></uni-view>
                                    </uni-view>
                                </uni-view>
                                {/* <uni-view data-v-248ca5b8="" class="user-title">Earnings in the past 7 days</uni-view> */}
                                <br></br>
                                <MyIncomeCard/>
                                <uni-view data-v-248ca5b8="" class="user-title"
                                    style={{ marginTop: '30px' }}>{t('Funding Details')} <uni-view data-v-248ca5b8=""
                                        class="right"
                                       
                                    >
                                        
                                        <Link to="/transaction"   style={{ textDecoration: 'none', color: '#fff' }}><p>{t('View all')}</p></Link>
                                    </uni-view></uni-view>
                                    <br></br>
                                {topTransactions.map((item, index) => (

                                     <>
                                    <TransactionCard
                                            remarks={item.remarks || item.source || '—'}
                                            amount={getAmount(item.type, item)}
                                            date={formatUTCDate(item.created_at)} color={getAmountColor(item.type)} status={item.status?item.status:'Completed'} /></>

                                              
                                                
                                            ))


                                   
                                }
                                

{/* <uni-view data-v-248ca5b8="" class="item">
                                        <uni-view data-v-248ca5b8="" class="first">
                                            <uni-view data-v-248ca5b8="" class="left">2025-04-21 14:48:49</uni-view>

                                            <uni-view data-v-248ca5b8="" class="right" style={{ color: 'rgb(255, 61, 61)' }}>-10.000000</uni-view>
                                        </uni-view>
                                        <uni-view data-v-248ca5b8="" class="layer">
                                            <uni-view data-v-248ca5b8="" class="title">Fund Flows</uni-view>
                                            <uni-view data-v-248ca5b8="" class="value">Buy Server</uni-view>

                                        </uni-view>
                                    </uni-view> */}

                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>

            </uni-app>
        </div >
    );
};

export default Assets;