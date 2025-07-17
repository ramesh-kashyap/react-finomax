import React, { useEffect, useState } from "react";
import Api from "../../Requests/Api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../../components/Toast";
import { useTranslation } from 'react-i18next';

const UserProfileCard = () => {

  const navigate = useNavigate();
  const [vipType, setVipType] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
 const [vip, setVip] = useState(0);
  const [success, setSuccess] = useState('');
 const { t } = useTranslation();

  const cardStyle = {
    background: "linear-gradient(#51fbc1, #21ffb4)",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    color: "#000",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    maxWidth: "500px",
  };

  const logoStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
  };

  const iconImgStyle = {
    width: "40px",
    height: "40px",
  };

  const contentStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "6px",
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "11px",
    marginTop: "4px",
    flexWrap: "wrap",
  };

  const labelStyle = {
    color: "#000",
    marginLeft: "6px",
    marginRight: "8px",
  };

  const codeStyle = {
    color: "#000",
    marginRight: "6px",
  };

  const copyBoxStyle = {
    width: "16px",
    height: "16px",
    background: "#17171b",
    borderRadius: "3px",
    display: "inline-block",
  };

  const editButtonStyle = {
    background: "#171b20",
    border: "none",
    borderRadius: "20px",
    color: "#fff",
    padding: "6px 14px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    position: "absolute",
    right: "16px",
    top: "16px",
  };

  const inputStyle = {
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "11px",
    padding: "4px 8px",
    margin: "4px 8px 4px 0",
    color: "#000",
    fontFamily: "inherit",
    background: "#fff",
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

    const vipTypeMap = {
    1: "Trainee",
    2: "Skilled",
    3: "Advance",
    4: "Expert",
    5: "Professional",
    6: "Ultimate"
  };
  const fetchUserDetails = async () => {
    try {
      const response = await Api.get("/user");
      console.log(response.data);
      setUserDetails(response.data);
      
    const response_vip = await Api.get("/get_vip");
    
    if (response_vip.data.success) {
      const newVip = response_vip.data.vip;
  setVip(newVip);
  setVipType(vipTypeMap[newVip] || "0")      
    }

    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleEditClick = () => {
    if (userDetails) {
      setName(userDetails.name);
      setUsername(userDetails.username);
      setSponsor(userDetails.sponsor);
      setIsEditing(true);
    }
  };

  const handleChange = async () => {
    try {
      const response = await Api.post("/changedetails", {
        username,
        name,
        sponsor,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditing(false);
        fetchUserDetails();
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err.response);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={cardStyle}>
        {success && <Toast message={success} onClose={() => setSuccess('')} />}
      <div style={logoStyle}>
        <img src="fino-fav.png" alt="Logo" style={iconImgStyle} />
      </div>

    <div style={contentStyle}>
  {isEditing ? (
    <input
      style={{ ...titleStyle, ...inputStyle }}
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder={t('Name')}
    />
  ) : (
    <div style={titleStyle}>{userDetails?.name}</div>
  )}

  <div style={rowStyle}>
    <span style={labelStyle}>{t('UID')}:</span>
    {isEditing ? (
      <input
        style={inputStyle}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t('Username')}
      />
    ) : (
      <span style={codeStyle}>{userDetails?.username}</span>
    )}
    <span
      onClick={() => {
        navigator.clipboard.writeText(userDetails?.username || "");
        setSuccess(t("Username copied"));
      }}
      title={t("Copy Username")}
    >
      <img style={{ width: '18px' }} src="/static/img/icons8-copy-48.png" />
    </span>

    <span style={{ marginLeft: "16px", ...labelStyle }}>
      {t('Current Rank')} :
    </span>
    {isEditing ? (
      <input
        style={inputStyle}
        type="text"
        value={sponsor}
        onChange={(e) => setSponsor(e.target.value)}
        placeholder={t('Sponsor')}
      />
    ) : (
      <span style={codeStyle}>{vipType}</span>
    )}
  </div>

  {isEditing && (
    <div style={{ marginTop: "10px" }}>
      <button
        onClick={handleChange}
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "8px 16px",
          border: "none",
          borderRadius: "6px",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        {t('Save')}
      </button>
      <button
        onClick={() => setIsEditing(false)}
        style={{
          backgroundColor: "#aaa",
          color: "#000",
          padding: "8px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {t('Cancel')}
      </button>
    </div>
  )}
</div>

      {!isEditing && (
        <button style={editButtonStyle} onClick={() => navigate('/userinfo')}>
          {t('Edit')}
        </button>
      )}
    </div>
  );
};

export default UserProfileCard;
