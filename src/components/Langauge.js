import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Language = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const [selectedLang, setSelectedLang] = useState(localStorage.getItem('i18nextLng') || 'en');

  const backClick = () => navigate(-1);

  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
      setSelectedLang(lng);
    } catch (error) {
      console.error("Language change error:", error);
    }
  };
    return (

        <div class="uni-body pages-login-language">
            <uni-app class="uni-app--maxwidth">
                <uni-page data-page="pages/login/language">
                    <uni-page-wrapper>
                        <uni-page-body style={{background:'#1d1b23'}}>
                            <uni-view data-v-002d254a="" class="page">
                                <uni-view data-v-002d254a="" class="ellipse"></uni-view>
                                <uni-view data-v-002d254a="" class="top-box">
                                    <uni-view data-v-636c600c="" data-v-002d254a="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                        <uni-view onClick={backClick} data-v-35b9a113="" data-v-002d254a="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>


                                            <uni-view data-v-002d254a="" class="back"><img data-v-002d254a="" src="/static/img/back.png" alt="" style={{ width: '35px',filter: 'brightness(6) invert(0)'  }} /></uni-view>
                                            
                                       
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-002d254a="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                            <uni-view data-v-002d254a="" class="page-title">{t('Language')}</uni-view>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-002d254a="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view>
                                    </uni-view>
                                </uni-view>
                                <uni-view data-v-002d254a="" class="content">
                                    <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'en' ? 'selected' : ''}`} onClick={() => changeLanguage('en')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/en.png" alt="" />English</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'en' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt="" style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                        {/* <uni-view data-v-002d254a="" class="right"><img data-v-002d254a="" src="/static/img/selected.png" alt="" /></uni-view> */}
                                    </uni-view>
                                  <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'ar' ? 'selected' : ''}`} onClick={() => changeLanguage('ar')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/arbi.png" alt="" />Arabic</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'ar' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                     <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'ru' ? 'selected' : ''}`} onClick={() => changeLanguage('ru')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/Flag_of_Russia.jpg" alt="" />Russia</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'ru' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                    <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'de' ? 'selected' : ''}`} onClick={() => changeLanguage('de')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/Flag_of_Germany.png" alt="" />Germany</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'de' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                     <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'fr' ? 'selected' : ''}`} onClick={() => changeLanguage('fr')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/french.png" alt="" />France</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'fr' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                    <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'es' ? 'selected' : ''}`} onClick={() => changeLanguage('es')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/Spain_flag_300.png" alt="" />Spanish</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'es' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                     <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'it' ? 'selected' : ''}`} onClick={() => changeLanguage('it')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/italian.png" alt="" />Italian</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'it' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                    <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'tr' ? 'selected' : ''}`} onClick={() => changeLanguage('tr')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/Flag_of_Turkey.png" alt="" />Turkish</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'tr' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                     <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'fa' ? 'selected' : ''}`} onClick={() => changeLanguage('fa')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/Flag_of_Iran.png" alt="" />Farsi</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'fa' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                     <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'pl' ? 'selected' : ''}`} onClick={() => changeLanguage('pl')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/Polish_Flag_70_x_110__71942.jpg" alt="" />Polish</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'pl' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                     <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'br' ? 'selected' : ''}`} onClick={() => changeLanguage('br')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/flag-brazil-image-rgb-beautiful-country-flag-symbol-silk-silk-weaving-texture_430468-573.avif" alt="" />Brail</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'br' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                     <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'pt' ? 'selected' : ''}`} onClick={() => changeLanguage('pt')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/istockphoto-1569504346-612x612.jpg" alt="" />Portuguese</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'pt' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 

                                     <uni-view data-v-002d254a="" style={{background:'#1a1818'}} class={`item ${selectedLang === 'bg' ? 'selected' : ''}`} onClick={() => changeLanguage('bg')}>
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/Flag-Bulgaria.webp" alt="" />Bulgarian</uni-view>
                                        <uni-view data-v-002d254a="" class="right">
                                            {selectedLang === 'bg' && (
                                                <img data-v-002d254a="" src="/static/img/selected.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} />
                                            )}
                                        </uni-view>
                                    </uni-view> 
                                    

                                    

                                    




















                                    {/* <uni-view data-v-002d254a="" class="item">
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/pt.png" alt="" />Português</uni-view>
                                    </uni-view>
                                    <uni-view data-v-002d254a="" class="item">
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/tr.png" alt="" />Türkçe</uni-view>
                                    </uni-view>
                                    <uni-view data-v-002d254a="" class="item">
                                        <uni-view data-v-002d254a="" class="left"><img data-v-002d254a="" src="/static/img/ro.png" alt="" />Română</uni-view>
                                    </uni-view> */}

                                </uni-view>
                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>

            </uni-app>

        </div>
    );
}
export default Language;


