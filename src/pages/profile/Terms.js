import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Api from "../../Requests/Api";
import { FaCopy } from 'react-icons/fa'; // Import the copy icon
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const Terms = () => {
const { t } = useTranslation();


    const [inviteLink, setInviteLink] = useState(null);
    const [username, setUsername] = useState(null);
    const [serR, setServerR] = useState(null);
    const [incomeData, setIncome] = useState([]);
    const [error, setError] = useState("");

    const containerStyle = {
        // backgroundColor: '#001f29',
        padding: '14px',
        color: '#d0d8dd',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        borderRadius: '10px',
        maxWidth: '700px',
        margin: 'auto',
    };

    const sectionTitleStyle = {
        color: '#ffca36',
        fontWeight: 'bold',
        fontSize: '16px',
        marginTop: '24px',
        marginBottom: '8px',
    };

    const paragraphStyle = {
        marginBottom: '12px',
        fontSize: '14px',
    };


    return (

        <div class="uni-body pages-user-invite">
            <uni-app class="uni-app--maxwidth">
                <uni-page data-page="pages/user/invite">
                    <uni-page-wrapper>
                        <uni-page-body>
                            <uni-view data-v-0f43bbff="" class="page">
                                <uni-view data-v-0f43bbff="" class="ellipse"></uni-view>
                                <uni-view data-v-0f43bbff="" class="ellipse1"></uni-view>
                                <uni-view data-v-0f43bbff="" class="top-box">
                                    <uni-view data-v-636c600c="" data-v-0f43bbff="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                        <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                            <Link to="/profile">
                                                <uni-view data-v-0f43bbff="" class="back"><img data-v-0f43bbff="" src="/static/img/back.png" alt="" style={{ width: '35px', filter: 'brightness(6) invert(0)' }} /></uni-view>
                                            </Link>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                            <uni-view data-v-0f43bbff="" class="page-title">{t('Terms')}</uni-view>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view>
                                    </uni-view>
                                </uni-view>


                                <div style={containerStyle}>
                                    <p style={paragraphStyle}>
                                        {t('Finomax is a platform providing investment, team management, and cryptocurrency revenue services. The following content is based on user input to ensure clarity and compliance with policies.')}
                                    </p>

                                    <div style={sectionTitleStyle}>{t('Data Collection And Usage')}</div>
                                    <p style={paragraphStyle}>
                                        {t('Policies may require users to provide information such as phone numbers, usernames, and passwords to create accounts, which are used for account management, risk control, and commission calculation purposes.')}
                                    </p>
                                    <p style={paragraphStyle}>
                                        {t('Collected personal information includes contact details, identity verification, financial transaction records, and team structure. Purposes of use include service provision, compliance operations, and platform improvement.')}
                                    </p>

                                    <div style={sectionTitleStyle}>{t('Data Sharing And Security')}</div>
                                    <p style={paragraphStyle}>
                                        {t('Security measures include SSL encryption, regular data backups, and employee confidentiality agreements. Cross-border data transfer declarations are required under GDPR/CCPA.')}
                                    </p>

                                    <div style={sectionTitleStyle}>{t('User Rights')}</div>
                                    <p style={paragraphStyle}>
                                        {t('Users have the right to access, correct, or delete personal information and may revoke authorization. Contact information will be provided to users to exercise these rights.')}
                                    </p>

                                    <div style={sectionTitleStyle}>{t('Background And Policy Framework')}</div>
                                    <p style={paragraphStyle}>
                                        {t('Finomax provides services such as investment, team management, and revenue calculation. The privacy policy covers key modules such as data collection scope, usage, sharing, security measures, and user rights. Additionally, special clauses on cross-border transfers and dispute resolution address complex data processing scenarios.')}
                                    </p>
                                </div>

                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>

            </uni-app>


        </div>
    );
};

export default Terms;