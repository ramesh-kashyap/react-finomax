import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import Api from '../../Requests/Api';
import TransactionCard from './TransactionCard';
import { useTranslation } from 'react-i18next';
const moment = require('moment-timezone');

const Transaction = () => {
    const { t } = useTranslation();

    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [balance, setBalance] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedType, setSelectedType] = useState('All');
    const [selectedMonth, setSelectedMonth] = useState('Time');
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers(page); // Reload from page 1 on filter change
    }, [page, selectedType, selectedMonth]);
    const limit = 10;

    const fetchUsers = async (pageNumber = 1) => {
        try {
            const typeParam = selectedType !== 'All' ? selectedType : '';
            const monthParam = selectedMonth !== 'Time' ? selectedMonth : '';
            const response = await Api.get(`/getUserHistory?page=${pageNumber}&limit=${limit}&type=${typeParam}&month=${monthParam}`);
            if (response.data && response.data.success) {
                console.log(response.data);
                setTransactions(response.data.transactions);
                setTotalPages(response.data.totalPages);
                setPage(response.data.page);
            } else {
                setTransactions([]);
            }
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching history");
        }
    };

    const nextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const getAmountColor = (type) => {
        return type === 'buyfund' || type === 'income'  || type === 'investment'  ? '#569d35' : 'rgb(255, 61, 61)';
    };

    const getAmountPrefix = (type) => {
        return type === 'buyfund' || type === 'income' || type === 'investment' ? '+ ' : '- ';
    };
    const getAmount = (type, item) => {
        return type === 'income' ? item.comm : item.amount;
    };


    const backClick = () => {
        navigate(-1); // 👈 Go back to the previous page in history
    };

    const revenueOptions = ['All','Deposits','Withdrawal','Order Revenue','Task Income','Team Commission',];
    const monthOptions = ['Time','2025-12','2025-11','2025-10','2025-09','2025-08','2025-07', '2025-06'];

    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        padding: '15px',
        color: '#fff',
        // backgroundColor: '#0f0f0f',
        maxWidth: '600px',
        margin: 'auto',
    };

    const labelStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '12px',
    };

    const selectWrapper = {
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
    };

    const selectBox = {
        flex: 1,
        backgroundColor: 'transparent',
        border: '1px solid #444',
        color: '#fff',
        padding: '10px',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
    };

    const dropdownModalStyle = {
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#111',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        padding: '10px 0',
        zIndex: 999,
        left: 'auto !important',
        maxWidth: '25.5rem',
        bottom: 0,
        width: '100%',
        maxHeight: '100%',
        overflowX: 'auto',
        marginLeft: '-26px'
    };

    const dropdownItem = (active) => ({
        padding: '14px 20px',
        textAlign: 'center',
        fontSize: '15px',
        color: active ? '#00ff99' : '#fff',
        borderBottom: '1px solid #222',
        cursor: 'pointer',
    });

   
        
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
                                <uni-view data-v-35b9a113="" data-v-b0a5c882="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                    <uni-view data-v-53c5f33f="" class="back" onClick={backClick}><img data-v-53c5f33f="" src="/static/img/back.png" alt="" style={{ width: '35px', marginTop: '5px', filter: 'brightness(6) invert(0)' }} /></uni-view>


                                </uni-view>
                                {/* <uni-view
                                    data-v-248ca5b8="" class="page-title" style={{marginRight:'95px'}}>Revenue Distribution</uni-view>
 */}

                                {/* <uni-view data-v-248ca5b8="" class="user-title"
                                    style={{ marginTop: '30px' }}>Funding Details</uni-view> */}


                                <div style={containerStyle}>
                                    <div style={labelStyle}>{t('Revenue Distribution')}</div>

                                    <div style={selectWrapper}>
                                        {/* Revenue Type Dropdown */}
                                        <div style={selectBox} onClick={() => setShowTypeDropdown(true)}>
                                            {selectedType}
                                            <span style={{ float: 'right' }}>▼</span>
                                        </div>

                                        {/* Month Dropdown */}
                                        <div style={selectBox} onClick={() => setShowMonthDropdown(true)}>
                                            {selectedMonth}
                                            <span style={{ float: 'right' }}>▼</span>
                                        </div>
                                    </div>

                                    {/* Type Popup */}
                                    {showTypeDropdown && (
                                        <div style={dropdownModalStyle}>
                                            {revenueOptions.map((option, index) => (
                                                <div
                                                    key={index}
                                                    style={dropdownItem(option === selectedType)}
                                                    onClick={() => {
                                                        if (option !== 'Cancel') {
                                                            setSelectedType(option);
                                                        }
                                                        setShowTypeDropdown(false);
                                                    }}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                            <div
                                                style={{
                                                    ...dropdownItem(false),
                                                    color: '#aaa',
                                                    fontWeight: 'bold',
                                                }}
                                                onClick={() => setShowTypeDropdown(false)}
                                            >
                                                Cancel
                                            </div>
                                        </div>
                                    )}

                                    {/* Month Popup */}
                                    {showMonthDropdown && (
                                        <div style={dropdownModalStyle}>
                                            {monthOptions.map((option, index) => (
                                                <div
                                                    key={index}
                                                    style={dropdownItem(option === selectedMonth)}
                                                    onClick={() => {
                                                        if (option !== 'Cancel') {
                                                            setSelectedMonth(option);
                                                        }
                                                        setShowMonthDropdown(false);
                                                    }}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                            <div
                                                style={{
                                                    ...dropdownItem(false),
                                                    color: '#aaa',
                                                    fontWeight: 'bold',
                                                }}
                                                onClick={() => setShowMonthDropdown(false)}
                                            >
                                                Cancel
                                            </div>
                                        </div>
                                    )}
                                </div>


                                   

                                {transactions.length > 0 ? (transactions.map((item, index) => (
                                    
                                    <>
                                    <TransactionCard
                                            remarks={item.remarks || item.source || '—'}
                                            amount={getAmount(item.type, item)}
                                            date={formatUTCDate(item.created_at)} color={getAmountColor(item.type)} /></>

                                ))

                                ) : (
                                    <div style={{ marginTop: '20px', color: '#aaa' }}>No matching records.</div>
                                )}
                                <div className="pagination-container">
                                    <button
                                        className="pagination-btn"
                                        onClick={prevPage}
                                        disabled={page <= 1}
                                    >
                                        ⬅ Prev
                                    </button>

                                    <span className="pagination-info">Page {page} of {totalPages}</span>

                                    <button
                                        className="pagination-btn"
                                        onClick={nextPage}
                                        disabled={page >= totalPages}
                                    >
                                        Next ➡
                                    </button>
                                </div>



                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>

            </uni-app>
        </div >
    );
};

export default Transaction;










