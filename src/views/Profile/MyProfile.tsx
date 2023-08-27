import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types'
import HeroHead from '../../components/HeroHeader/HeroHead';
import { CheapestFlights, Information, SectionBackground, TopInternationalDestinations, TravelBlog } from '../../components';
import { DEMO_CATS } from '../Homepage/Homepage';
import image from '../../images/airline.png';
import ProfileSidebar from './ProfileSidebar';
import { profileMenus } from '../../lib/MasterHeader/NavigationMenu';
import ButtonPrimary from '../../lib/Button/ButtonPrimary';
import Profile from './Profile';
import Bookings from './Bookings';
import Pendingpayments from './Pendingpayments';
import MyIdeas from './MyIdeas';
import MyPurchaseAttempts from './MyPurchaseAttempts';
import MyHolidays from './myHolidays/MyHolidays';
import MyData from './MyData';
import Rewards from './Rewards';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { 
  getBookingsData, 
  getUserTripIdeasHistory, 
  userData, 
  userProfileWithToken } from '../../store/actions';
import auths from '../../api/auths';
import { ReactComponent as ArrowRight } from "../../images/icons/arrow-right.svg";
import TYPES from '../../types/store';
import useWindowSize from '../../hooks/useWindowSize';
import { getRememberMeUser } from '../../helpers/rememberMe';
import { useLocation } from 'react-router-dom';
interface MyProfileProps {
  stickyClass?: string;
};

const MyProfile: FC<MyProfileProps> = ({
  stickyClass = "sticky top-20 overflow-hidden px-[8.5vw] bigMd:px-0"
}) => {

  const dispatch = useDispatch();
  const activeSideMenu = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.activemenu);
  const user = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userdata);
  const userprofile = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userprofile);
  const usertripideashistory: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.usertripideashistory);
  const SigninReducer = useSelector((state: { SigninReducer: any; }) => state.SigninReducer);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  const [isMobile, setIsMobile] = useState(false);

  const windowSize = useWindowSize();
  const isUserRemmebered = getRememberMeUser();

  useEffect(() => {
    setIsMobile((prevState) => {
      if (!prevState && windowSize.width < 860) {
        return true
      } else if (prevState && windowSize.width > 860) {
        return false
      } else {
        return prevState
      }
    })
  }, [windowSize]);


  const history = useHistory();

  let localuserdata: any = localStorage.getItem('userdata');
  var userd = JSON.parse(localuserdata);

  let auth = auths;
  let isAuthenticated = auth.isAuthenticated() || isUserRemmebered?.token;

  // get the current link 
  //  const href = window.location.pathname.split('/');

  // const [activeSideMenu, setActiveSideMenu] = useState<any>({
  //   menu: 'My Profile',
  //   active: true,
  //   data: null,
  //   href: href[1]
  // });

  // if(!userd.username ){
    // dispatch(
    //   userProfileWithToken()
    // )
  // };

  useEffect(() => {
    // if(!userd?.username){
      dispatch(
        userProfileWithToken()
      );
    // };

    // if (isAuthenticated && userd?.username) {
    //   dispatch(
    //     userData(
    //       userd?.username
    //     )
    //   )
    // };

    let start: string = '20220810';
    let end: string = '20221231';
    dispatch(
      getBookingsData(
        start, 
        end,
        activeLang
      )
    );

    if (!isAuthenticated) history.push('/');
  }, []);

  useEffect(() => {
    let username = userprofile?.name
    if(username){
      dispatch(
        getUserTripIdeasHistory(
          username
        )
      );
    };
  }, [userprofile]);

  // useEffect(() => {
  //   if (userprofile != '') {
  //     let username = userprofile?.name;
  //     dispatch(
  //       userData(
  //         username
  //       )
  //     )
  //   };
  // }, [userprofile]);

  const renderContent = () => {
    switch (activeSideMenu.href) {
      case 'myprofile':
        return <Profile />
      case 'bookings':
        return <Bookings userprofile = { userprofile } />
      case 'pendingpayments':
        return <Pendingpayments />
      case 'myideas':
        return <MyIdeas data={usertripideashistory} />
      case 'mypurchaseattempts':
        return <MyPurchaseAttempts />
      case 'myholiday':
        return <MyHolidays />
      case 'mydata':
        return <MyData data={userprofile ?? user} />
      case 'rewards':
        return <Rewards />
      default:
        break;
    }
  };

  const onMenuSelect = (menu: any) => {
    // setActiveSideMenu(menu.href.replaceAll('/', ''));
    // setActiveSideMenu({
    //   menu: menu.name, 
    //   active: true, 
    //   data: menu, 
    //   href: menu.href.replaceAll('/', '') 
    // });

    // var activemenu = {
    //     menu: menu.name, 
    //     active: true, 
    //     data: menu, 
    //     href: menu.href.replaceAll('/', '') 
    //   };

    // dispatch(
    //   acvivateSideM activemenu
    // )
  };

  const handleBackButton = () => {
    dispatch({ 
      type: TYPES.RESET_ACTIVE_USER_MENU 
    });
  };

  const Icon = activeSideMenu?.data?.icon;

  const currentURL = useLocation();

  return (
    <div>

      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || My Profile </title>
      </Helmet>

      <HeroHead
        className='hero-head-my-profile'
        searchCard=''
        headText=""
        subText=""
        headType="profile"
        headUserData={userprofile ?? user}
      />
      <div className={`bread-crumb flex bigMd:hidden  w-full bottom-0 left-0 bg-[#3944B3] items-center space-x-5
                      ${activeSideMenu?.href ? '' : 'hidden'}
      `}>
        <div className={`w-16 h-[53px] bigMd:hidden flex items-center justify-center z-10 text-white bg-[#1D2478]`} >
          <ArrowRight className="rotate-180" onClick={handleBackButton} />
        </div>
        {
          Icon && <Icon className="text-white" />
        }
        <span className='text-white'>{activeSideMenu.menu}</span>

      </div>
      <div className={`guide bigMd:mx-[10vw] relative`} >
        <div className="flex bigMd:space-x-6">
          <div className={`w-full bigMd:w-1/4  
                            ${isMobile ? '' : '!inline-block'}
                            ${isMobile && activeSideMenu.href == null ? '' : 'hidden'}`}>
            <div style={{ marginTop: '' }} className={`${stickyClass} ${currentURL.pathname == '/myprofile' ? 'h-[80vh]' : 'h-screen'} "space-y-8"`}>
              <ProfileSidebar
                menu={profileMenus}
                activeSideMenu={activeSideMenu}
                // setActiveSideMenu = { setActiveSideMenu} 
                onMenuSelect={(menu: any) => onMenuSelect(menu)}
              />
            </div>
          </div>
          <div className={`w-full bigMd:w-3/4 bigMd:inline-block overflow-hidden ${activeSideMenu.href == null ? "hidden" : ""}`} style={{ marginTop: '20px' }}>
            {/* content */}

            { renderContent() }

          </div>
        </div>
      </div>
    </div>
  )
};

export default MyProfile;