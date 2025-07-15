import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
import Toast from '../../components/Toast';
import { useTranslation } from 'react-i18next';

const UserInfo = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await Api.get("/user");
      if (response.data) {
        const userData = response.data;
        setName(userData.name || "");
        setUsername(userData.username || "");
        setSponsor(userData.email || "");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching data");
    }
  };

  const handleSave = async () => {
    try {
      const response = await Api.post("/changedetails", {
        name: name,
      });
      if (response.data.success) {
        setSuccess(response.data.message);
      } else {
        setSuccess("Failed to update user info");
      }
    } catch (err) {
      setSuccess("Server error");
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  };

  const avatarWrapper = {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: '20px',
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const logoStyle = {
    width: '60px',
    height: '60px',
  };

  const formCardStyle = {
    background: 'linear-gradient(135deg, rgb(25, 32, 32), rgb(27, 27, 30))', border: "1px solid rgb(83, 78, 78)",
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
  };

  const fieldStyle = {
    marginBottom: '18px',
    borderBottom: '1px solid #2a2a2a',
    paddingBottom: '10px',
  };

  const labelStyle = {
    fontSize: '14px',
    color: 'rgb(255 251 251)',
    marginBottom: '4px',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
  };

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    flex: 1,
    outline: 'none',
  };

  const copyIconStyle = {
    width: '16px',
    height: '16px',
    background: 'linear-gradient(#51fbc1, #21ffb4)',
    borderRadius: '3px',
    marginLeft: '10px',
  };

  const saveButtonStyle = {
    width: '100%',
    background: 'linear-gradient(#51fbc1, #21ffb4)',
    padding: '14px',
    color: '#000',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div class="uni-body pages-index-message">
      {success && <Toast message={success} onClose={() => setSuccess('')} />}
      <Toaster position="top-center" reverseOrder={false} />
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/index/message">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-c62a6474="" class="page">
                <uni-view data-v-c62a6474="" class="ellipse"></uni-view>
                <uni-view data-v-c62a6474="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-c62a6474="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/profile">
                        <uni-view data-v-c62a6474="" class="back">
                          <img data-v-c62a6474="" src="/static/img/back.png" alt="" style={{ width: '35px', filter: 'brightness(6) invert(0)' }} />
                        </uni-view>
                      </Link>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-c62a6474="" class="page-title">{t('Account Information')}</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingright: '0px' }}></uni-view>
                  </uni-view>
                </uni-view>
                {/* <uni-view data-v-c62a6474="" class="tabs-box">
                                    <uni-view data-v-c62a6474="" class="tab-item selected">All</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item">News</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item">Notice</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item">System</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item">Message</uni-view>
                                </uni-view> */}

               <div style={containerStyle}>
      <div style={avatarWrapper}>
        <div style={avatarStyle}>
          <img src="fino-fav.png" alt="Profile" style={logoStyle} />
        </div>
      </div>

      <div style={formCardStyle}>
        <div style={fieldStyle}>
          <div style={labelStyle}>{t('Name')}</div>
          <div style={rowStyle}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <div style={labelStyle}>{t('Username')}</div>
          <div style={rowStyle}>
            <input
              type="text"
              value={username}
              // onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <div style={labelStyle}>{t('Email ID')}</div>
          <div style={rowStyle}>
            <input
              type="email"
              value={sponsor}
              onChange={(e) => setSponsor(e.target.value)}
              style={inputStyle}
            />
            <span style={copyIconStyle}></span>
          </div>
        </div>
      </div>

      <button style={saveButtonStyle} onClick={handleSave}>
        {t('Save')}
      </button>
    </div>
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>

      </uni-app>

    </div>
  );
};

export default UserInfo;




