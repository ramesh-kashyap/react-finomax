import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Requests/Api";
import Loader from "../../components/Loader";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';


const Level = () => {
const { t } = useTranslation();

  const location = useLocation();
  const [level, setLevel] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Default limit
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const { lvl } = useParams(); // 🔹 Get the 'lvl' parameter from URL

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(location.search);
      const level = queryParams.get("selected_level"); // Get value from query param
      setSelectedLevel(level);

      console.log(level);
      const reaponse = await Api.get("list", {
        params: { // ✅ Ensure query parameters are passed correctly
          selected_level: level || 0
        },
      });

      if (reaponse.data.status) {
        setUsers(reaponse.data.direct_team);
      }

      // console.log(users);

    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
    setLoading(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false // 24-hour format
    }).replace(",", ""); // Remove comma from output;
  };





  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    loadUsers();
  };


  const levelFromUrl = new URLSearchParams(window.location.search).get('selected_level') || '1';
    const [activeTab, setActiveTab] = useState('Lvl'+levelFromUrl);
  
    const tabs = ['Lvl1', 'Lvl2', 'Lvl3'];
const tabHeaderStyle = {
    display: 'flex',
    borderBottom: '1px solid #2c2c2c',
    marginBottom: '12px',
  };


   const tabStyle = (isActive) => ({
    padding: '10px 16px',
    cursor: 'pointer',
    color: isActive ? '#fff' : '#888',
    fontWeight: isActive ? 'bold' : 'normal',
    borderBottom: isActive ? '2px solid #51fbc1' : 'none',
  });


  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    setPage(1); // Reset page on level change
  };
  // ✅ Show a loader while fetching data
  if (loading) {
    return <Loader />
  }
  return (
    <div class="uni-body pages-trade-trade">
      <uni-app class="uni-app--showtabbar uni-app--maxwidth">
        <uni-page data-page="pages/trade/trade">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-7cdca4f6="" class="page">
                <uni-view data-v-7cdca4f6="" class="ellipse"></uni-view>



                <uni-view data-v-1011963f="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-1011963f="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                      <Link to="/Team">
                        <uni-view data-v-1011963f="" class="back"><img data-v-1011963f="" src="/static/img/back.png" alt="" style={{ width: '35px',filter: 'brightness(6) invert(0)' }} /></uni-view>
                      </Link>

                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-1011963f="" class="page-title">{t('Level Team')}</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view>
                  </uni-view>
                </uni-view>

                  <div style={tabHeaderStyle}>
                    {tabs.map((tab) => (
                      <div
                        key={tab}
                        style={tabStyle(tab === activeTab)}
                         onClick={() => {
                        setActiveTab(tab);
                        const url = new URL(window.location);
                        const levelNumber = tab.slice(-1); // Gets '1', '2', or '3'
                        url.searchParams.set('selected_level', levelNumber);
                       window.location.href = url.toString(); // 🔁 forces full reload
                      }}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>




                  <uni-view data-v-b7dd60dc="" class="history-box">
                    {users.map((user, index) => (

                      <uni-view data-v-10f20c32="" class="member-item" key={index}>

                        <uni-view data-v-10f20c32="" class="first">
                          <uni-view data-v-10f20c32="" class="left">
                            <uni-view data-v-10f20c32="" class="ava-box">
                              <img data-v-10f20c32="" src="fino-fav.png" alt="" />
                              <uni-view data-v-10f20c32="" class="name-box">
                                <uni-view data-v-10f20c32="" class="name">{user.name || "User"}</uni-view>
                                <uni-view data-v-10f20c32="" class="uid"> {user.username}
                                </uni-view>
                              </uni-view>
                            </uni-view>
                            <uni-view data-v-10f20c32="" class="time">{formatDate(user.jdate)}
                            </uni-view>
                          </uni-view>
                          <uni-view data-v-10f20c32="" class="right">
                            <uni-view data-v-10f20c32="" class="value">${Number(user.package,).toFixed(2)}
                            </uni-view>
                            <uni-view data-v-10f20c32="" class="title">{t("Total Deposits")}</uni-view>
                            <uni-view data-v-10f20c32="" class="value">${user.todayCommission ? user.todayCommission.toFixed(2) : "0.00"}</uni-view>
                            <uni-view data-v-10f20c32="" class="title">{t("Today's Commission")}</uni-view>
                          </uni-view>
                        </uni-view>
                        <uni-view data-v-10f20c32="" class="h-line"style={{backgroundColor:'#bfbfbf'}}></uni-view>
                        {/* <uni-view data-v-10f20c32="" class="layout">
                          <uni-view data-v-10f20c32="" class="title">Number of Invitees</uni-view>
                          <uni-view data-v-10f20c32="" class="value">0(0)</uni-view>
                        </uni-view> */}
                        <uni-view data-v-10f20c32="" class="layout">
                          <uni-view data-v-10f20c32="" class="title">{t("Yesterday's Commission")}</uni-view>
                          <uni-view data-v-10f20c32="" class="value">${user.yesterdayCommission ? user.yesterdayCommission.toFixed(2) : "0.00"}</uni-view>
                        </uni-view>
                       
                        <uni-view data-v-10f20c32="" class="layout">
                          <uni-view data-v-10f20c32="" class="title">{t("Total Commission")}</uni-view>
                          <uni-view data-v-10f20c32="" class="value">${user.totalCommission.toFixed(2) || "0.00"}</uni-view>
                        </uni-view>

                      </uni-view>
                    ))}

                  </uni-view>
               

              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>
      </uni-app>
    </div>
  );
};

export default Level;