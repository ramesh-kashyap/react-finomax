import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
   const { t } = useTranslation();
  const activeFilter = '';
  const activeColor = '#51fbc1';

  return (

    <div class="uni-body pages-index-index">

      <uni-app class="uni-app--showtabbar uni-app--maxwidth">


        <uni-tabbar
          class="uni-tabbar-bottom" >
          <div class="uni-tabbar" style={{ backgroundColor: '#1d1b23', backdropFilter: 'none',width: '100%' }}>
            <div class="uni-tabbar-border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}></div>
            <div class="uni-tabbar__item">
            <Link to="/dashboard"style={{ textDecoration: "none", color: "inherit",cursor: "none"  }}>
                <div class="uni-tabbar__bd" style={{ height: '65px' }}>
                  <div class="uni-tabbar__icon" style={{ width: '24px', height: '24px' }}>
                    
                  <img
                   src={`/static/tabbar/${currentPath === '/dashboard' ? 'home_active' : 'home'}.png`}
                      style={{
                        filter: currentPath === '/dashboard' ? activeFilter : 'brightness(6) invert(0)',
                      }}
                      alt="Home"
                    />
                    
                    </div>
                  <div  className="uni-tabbar__label"
                    style={{
                      color:
                        currentPath === '/dashboard' ? '#51fbc1' : '#fff',
                      fontSize: '13px',
                      lineHeight: 'normal',
                      marginTop: '3px',
                    }}>
                    {t('Home')} </div>
                </div>
              </Link>
            </div>

              <div class="uni-tabbar__item">
            <Link to="/assets"style={{ textDecoration: "none", color: "inherit", cursor: "none" }}>

                <div class="uni-tabbar__bd" style={{ height: '65px' }}>
                  <div class="uni-tabbar__icon" style={{ width: '24px', height: '24px' }}>
                    
                    
                  <img
                         src={`/static/tabbar/${currentPath === '/assets' ? 'assets_active' : 'assets'}.png`}
                      style={{
                        filter: currentPath === '/assets' ? activeFilter : 'brightness(6) invert(0)',
                      }}
                      alt="Assets"
                    />
                    
                    
                    </div>
                  <div  className="uni-tabbar__label"
                    style={{
                      color:
                        currentPath === '/assets' ? '#51fbc1' : '#fff',
                      fontSize: '13px',
                      lineHeight: 'normal',
                      marginTop: '3px',
                    }}>
                    {t('Assets')} </div>
                </div>
              </Link>
            </div>

            <div class="uni-tabbar__item">
            <Link to="/quality"style={{ textDecoration: "none", color: "inherit",cursor: "none" }}>

                <div class="uni-tabbar__bd" style={{ height: '65px' }}>
                  <div class="uni-tabbar__icon" style={{ width: '56px', height: '58px' }}>
                    
                  <img
                     src={`/static/tabbar/${currentPath === '/quality' ? 'trade' : 'trade'}.png`}
                      // style={{
                      //   filter: currentPath === '/quality' ? activeFilter : 'brightness(6) invert(0)',
                      // }}
                      alt="Trade"
                    />
                    
                    
                    </div>
                 
                </div>
                </Link>
            </div>

              <div class="uni-tabbar__item">
            <Link to="/Team"style={{ textDecoration: "none", color: "inherit", cursor: "none" }}>

                <div class="uni-tabbar__bd" style={{ height: '65px' }}>
                  <div class="uni-tabbar__icon" style={{ width: '24px', height: '24px' }}>
                    
                    
                  <img
                         src={`/static/tabbar/${currentPath === '/Team' ? 'team_active' : 'team'}.png`}
                      style={{
                        filter: currentPath === '/Team' ? activeFilter : 'brightness(6) invert(0)',
                      }}
                      alt="Assets"
                    />
                    
                    
                    </div>
                  <div  className="uni-tabbar__label"
                    style={{
                      color:
                        currentPath === '/Team' ? '#51fbc1' : '#fff',
                      fontSize: '13px',
                      lineHeight: 'normal',
                      marginTop: '3px',
                    }}>
                    {t('Team')} </div>
                </div>
              </Link>
            </div>

          
            <div class="uni-tabbar__item">
            <Link to="/profile"style={{ textDecoration: "none", color: "inherit",cursor: "none" }}>

                <div class="uni-tabbar__bd" style={{ height: '65px' }}>
                  <div class="uni-tabbar__icon" style={{ width: '24px', height: '24px' }}>
                  <img
                     
                          src={`/static/tabbar/${currentPath === '/profile' ? 'user_active' : 'user'}.png`}
                      style={{
                        filter: currentPath === '/profile' ? activeFilter : '',
                      }}
                      alt="Server"
                    />
                    
                    </div>
                  <div className="uni-tabbar__label"
                    style={{
                      color:
                        currentPath === '/profile' ? '#51fbc1' : '#fff',
                      fontSize: '13px',
                      lineHeight: 'normal',
                      marginTop: '3px',
                    }}>
                    {t('My')} </div>
                </div>
              </Link>
            </div>
          </div>  
          <div class="uni-placeholder" style={{ height: '65px' }}></div>
        </uni-tabbar>
      </uni-app>
    </div>  
  );
}