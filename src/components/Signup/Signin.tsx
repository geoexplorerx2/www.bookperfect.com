import { Dialog, Transition, Switch, FocusTrap } from '@headlessui/react';
// import { Switch } from '@mantine/core';
import React, { Fragment, useEffect, useMemo, useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ReactComponent as CloseIcon } from '../../images/icons/PopUpCloseIcon.svg'
import login from '../../images/login.png';
import ButtonAnimated from '../../lib/Button/ButtonAnimated';
import ButtonClose from '../../lib/Button/ButtonClose';
import ButtonPrimary from '../../lib/Button/ButtonPrimary';
import ButtonSecondary from '../../lib/Button/ButtonSecondary';
import Checkbox from '../../lib/Checkbox/Checkbox';
import CInput from '../../lib/Input/CInput';
import Privacy from '../Privacy/Privacy';
import loginImage from '../../images/login.png'
import { 
  allExternalCountries, 
  signin, 
  signup, 
  socialLoginOrSignup, 
  socialLoginSDK, 
  userProfileWithToken} from '../../store/actions';
import { goToPage } from '../../common/goToPage';
import { Cookies } from 'react-cookie';

import $ from 'jquery';
import auths from '../../api/auths';
import services from '../../api/services';
import useForm from '../../hooks/useForm';
import useValidate from '../../hooks/useValidate';
import BASE_URL_HOME, { BASE_URL } from '../../api/env';
import NationalityPicker from '../NationalityPicker/NationalityPicker';
import { Select } from '@mantine/core';
import { Slider, createStyles } from '@mantine/core';
import { useFacebookLogin } from '../../hooks/useFacebookLogin';
import useGoogleLogin from '../../hooks/useGoogleLogin';
import { getRememberMeUser, setRememberMeUser } from '../../helpers/rememberMe';
import useToggle from '../../hooks/useToggle';
import signupImage from '../../images/signup.png'
import CInputTel from '../../lib/Input/CInputTel';

interface SignupProps {
  name?: string;
  surname: string;
  email: string;
  telephone: string;
  country: string;
  signuppassword: string;
  confirmsignuppassowrd: string;
};

const Signin = ({
  opened,
  setOpened,
  contentPaddingClass = "py-4 px-6 md:py-5",
  contentExtraClass = "max-w-[780px]" }: any
) => {
  const useStyles = createStyles((theme) => ({
    input: {
      border: '0.1vw solid transparent !important',
    },
  }));
  const { classes } = useStyles();
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // signup
  const [email, setEmail] = useState<SignupProps["email"]>();
  const [name, setName] = useState<SignupProps["name"]>();
  const [surname, setSurname] = useState<SignupProps["surname"]>();
  const [telephone, setTelephone] = useState<SignupProps["telephone"]>();
  const [signuppassword, setSignupPassword] = useState<SignupProps["signuppassword"]>();
  const [confirmsignuppassowrd, setConfirmSignupPassword] = useState<SignupProps["confirmsignuppassowrd"]>();
  const [country, setCountry] = useState<string>();
  const [GbtnHover, setGBtnHover] = useState<boolean>(false)
  const [fbtnHover, setFBtnHover] = useState<boolean>(false)
  const [csrf, setCSRF] = useState();
  const theme = useSelector((state: any) => state.LightMode.mode);
  const themeMode = useSelector((state: any) => state.LightMode.mode);
  const [servererror, setServererror] = useState<any>();
  const [notDataProtectionAccepted, setNotDataProtectionAccepted] = useState<any>({
    notchecked: true,
    message: 'Please read and accept the information about the services and personal data protection'
  });

  const dispatch = useDispatch();

  const auth = auths;
  const server = services;
  const sigintoken = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.token);
  const socialloginsdk = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.socialloginsdk);
  const externalcountries: any = useSelector((state: { ExternalEPReducer: any; }) => state.ExternalEPReducer.externalepcountries);
  const userprofile = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userprofile);

  const history = useHistory();

  const pathname = window.location.search;
  const search = pathname?.split('&');
  const state = ['facebook_login', 'google_login'].includes(search[0]?.split('=')[1]) ? search[0]?.split('=')[1] : search[1]?.split('=')[1];
  const code = ['facebook_login', 'google_login'].includes(search[1]?.split('=')[1]) ? search[0]?.split('=')[1] : search[1]?.split('=')[1];
  const origin = state == 'facebook_login' ? window.location.origin + '/' : window.location.origin;
  const params = useParams();


  
  /* 
     user type 
     by state: 
        google_login
        facebook_login
  */


  // use form submission hooks
  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(showSignup ? _handleSignup : _handleLogin, useValidate, showSignup ? 'signup' : 'login');

  const { toggleValue, toggle } = useToggle(true);


  // login with fb hooks
  const appid: any = process.env.REACT_APP_FACEBOOK_APP_ID;
  const googleclientid = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const {
    logIn,
    getProfile } = useFacebookLogin({
      appId: appid,
      useRedirect: false
    });

  const { signIn, loaded } = useGoogleLogin({
    onLoginSuccess: onGoogleLoginSuccess,
    clientId: googleclientid,
    cookiePolicy: 'single_host_origin',
    // prompt
  });

  // on google login login success
  function onGoogleLoginSuccess(res: any) {
    // console.log('google user data',{res});
    let profile = !!res && res.profileObj;

    const thirdPartyUserData = {
      email: profile.email,
      name: profile.givenName,
      surname: profile.familyName,
      password: profile.googleId,
      userType: 2
    };

    // signup with third party
    _handleSignup(thirdPartyUserData);
  };

  // handle login submission
  function _handleLogin() {
    dispatch(
      signin(
        values.username,
        values.password,
        (error: any) => {
          if (error) {
            if (error.error) setServererror(error.message);
            else setServererror(error.error[0]);
          }
        },
        (res: any, success: any) => {
          if (success) {

            let rememberMeCredential = {
              token: res.token,
              ttl: res.expirationInSeconds
            };

            if (toggleValue) setRememberMeUser(rememberMeCredential);

            setOpened(false);
            // goToPage('/myprofile', 'local');

            let token = res.api_token.token;
            let customLoginPage = BASE_URL_HOME + '/home?&token=' + token + '&submit=true';
            goToPage(customLoginPage, 'redirect', true);

            // user profile token
            dispatch(
              userProfileWithToken()
            );
          }
        }
      )
    );

    // this data is use to request user data
    var userdata = {
      username: values.username,
    };
    localStorage.setItem('userdata', JSON.stringify(userdata));
  };

  // handle signup
  function _handleSignup(data: any = {}) {
    // is data protection accept
    if ($.isEmptyObject(data) && (notDataProtectionAccepted.notchecked)) {
      setNotDataProtectionAccepted({
        toggle: true,
        notchecked: true,
        message: notDataProtectionAccepted.message
      });
      return;
    };

    // registry new data
    let register = {
      name: values?.name,
      field_name: values?.name,
      field_surname: values?.surname,
      mail: values?.email,
      field_telephone: values?.telephone,
      field_country: values?.country,
      field_birth_date: "1996-01-04",
      field_newsletter: 0,
      field_agency: "BOOKPERFECT",
      password: values?._password
    };

    // store username in local storage: to be check with isUserRemembered
    var userdata = {
      username: register.mail ?? data.email
    };

    localStorage.setItem(
      'userdata',
      JSON.stringify(userdata)
    );

    dispatch(
      signup(
        register,
        (res: any, success: any) => {

          if (success) {
            setOpened(false);
            // window.location.href = window.location.origin + "/myprofile";
            // goToPage('/myprofile', 'local');

            let token = res.entity.api_token?.token;
            let customLoginPage = BASE_URL_HOME + '/home?&token=' + token + '&submit=true';
            goToPage(customLoginPage, 'redirect', true);

            // user profile token
            dispatch(
              userProfileWithToken()
            );
          }
        },
        (error: any) => {
          if(error) setServererror(error.message.message);
        }
      )
    )
  };

  // handle signup achieve
  // function __handleSignup(data: any = {}) {
  //   if($.isEmptyObject(data) && (notDataProtectionAccepted.notchecked)){
  //     setNotDataProtectionAccepted({
  //       toggle: true,
  //       notchecked: true,
  //       message: notDataProtectionAccepted.message
  //     });
  //     return;
  //   };

  //   var new_user = {
  //     Email: values.email ?? data.email,
  //     Password: values._password ?? data.password,
  //     Name: values.name ?? data.name,
  //     Surname: values.surname ?? (data.surname ?? data.name),
  //     Country: values.country ?? 'TR', // TODO: third party user country with geolocation
  //     Telephone: values.telephone ?? '',
  //     userType: data.userType ?? 1
  //   };

  //   var userdata = {
  //     username: new_user.Email ?? data.email
  //   };

  //   localStorage.setItem(
  //     'userdata', 
  //     JSON.stringify(userdata)
  //   );

  //   axios({
  //     method: "post",
  //     url: BASE_URL + "rest-api/create__user",
  //     data: {
  //       Email: new_user.Email,
  //       Password: new_user.Password,
  //       Name: new_user.Name,
  //       Lastname: new_user.Surname,
  //       Country: new_user.Country,
  //       Telephone: new_user.Telephone,
  //       Type: new_user.userType
  //     },
  //   })
  //     .then((response: any) => {
  //       console.log({ response });
  //     })
  //     .then((response: any) => {
  //       console.log({ response });
  //       let signup_username = new_user.Email;
  //       let signup_password = new_user.Password;

  //       // auth.signIn(signup_username, signup_password);
  //       if (signup_username && signup_password) {
  //         dispatch(
  //           signin(
  //             signup_username,
  //             signup_password,
  //             (error: any) => {
  //               if (error) {
  //                 if (error.status === "UNAUTHORIZED") setServererror('Email is already in use');
  //                 else alert(error.error[0]);
  //               }
  //             },
  //             (res: any, success: boolean) => {
  //               if (success) {
  //                 setOpened(false);
  //                 goToPage('/myprofile', 'local');
  //               }
  //             }
  //           )
  //         );
  //       }
  //     })
  //     .catch((error: any) => console.log(error));
  // };

  // handle third party login
  const handleThirdPartyLogin = async (thirdPartyUserType: any) => {
    if (thirdPartyUserType == 'facebook') {
      // goToPage(socialloginsdk?.facebook, '');
      window.location.href = socialloginsdk?.facebook;
      // const response = await logIn();

      // if (response?.status === "connected") {
      //     const profile: any = await getProfile();

      //     const thirdPartyUserData = {
      //       email: profile.email,
      //       name: profile.name,
      //       password: response.authResponse.userID,
      //       userType: 3
      //     };

      //     _handleSignup(thirdPartyUserData);
      // }
    } else if (thirdPartyUserType == 'google') {
      // google user goes here
      // goToPage(socialloginsdk?.google, '');
      window.location.href = socialloginsdk?.google;
      // signIn && signIn();
    }
  };

  // useeffect with no argument
  useEffect(() => {
    dispatch(
      allExternalCountries()
    );

    dispatch(
      socialLoginSDK(
        origin
      )
    );
  }, []);

  // login with social
  useEffect(() => {
    if (state && code) {
      dispatch(
        socialLoginOrSignup(
          state,
          code,
          origin,
          (res: any, success: boolean) => {
            if (success) {
              setOpened(false);
              // history.push('/myprofile');
              // goToPage('/myprofile', 'local');
              window.location.href = window.location.origin + '/myprofile';
            }
          }
        )
      )
    }
  }, [search]);

  const handleDialogClose = () => {
    setOpened(false)
    setTimeout(() => {
      setShowSignup(false)
    }, 500)
  };

  const _COUNTRIES = useMemo(() => {
    return externalcountries && externalcountries?.map(
      (country: any) => {
        return {
          label: country.flag + ' ' + country.name.common,
          value: country.cca2
        }
      }
    )
  }, [externalcountries]);

  
  const signinChildren = (
    <React.Fragment>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 max-w-[925px]"
        style={{
          height: '100%'
        }}
      >
        <div className="hidden lg:inline-block bg-[#F75847] rounded-[16px] xl:pl-11" >
          <img
            src={loginImage}
            alt='login-image'
            className='absolute bottom-[-5px] w-[595px] h-[510px] left-[110px] '
          />
          <div className='ml-4 mt-8 mr-4 text-3xl text-white '>
            Welcome!
          </div>

          <span className='text-sm text-white ml-4'>
            Login to continue
          </span>

          <div className='mt-[310px] ml-4'>
            <span className='text-[14px] ml-[8px] text-white'>Create your account</span>
            <ButtonAnimated classes='bg-gradient-to-b from-[#407BFE] to-[#3943B3] w-[323px] h-[55px] text-[18px] font-medium justify-center' clickEvent={(event: any) => setShowSignup(event)} />
          </div>
        </div>

        <div className="flex justify-end h-full z-50">
          <div className='h-full w-[50vw] min-w-[334px] lg:w-[323px] mt-[69px] lg:mt-[54px] lg:mx-11 px-5 lg:px-0'>
            <div className='w-full absolute top-0 left-0 lg:hidden rounded-t-2xl bg-[#F75847] px-5 py-3'>
              <h3 className='text-xl font-medium text-white'>Welcome</h3>
              <p className='text-xs text-white font-normal'>Login to continue</p>
            </div>
            <span className='text-xs lg:text-[18px] text-[#F96254] font-normal mb-3'>Signin with one click </span>


            <div className='flex space-x-5 h-[50px] mt-[13px]'>
              <div onClick={() => handleThirdPartyLogin('google')} className={`flex-1 flex justify-center border-2 rounded-xl  border-[#F75847] w-36 dark:hover:bg-[#171925] dark:bg-[#171925] ${GbtnHover ? 'hover:bg-[#F75847]' : ' '} `} onMouseEnter={() => setGBtnHover(true)} onMouseLeave={() => setGBtnHover(false)}>
                <ButtonSecondary className='focus:!ring-0 focus:outline-none focus:ring-offset-0'>
                  {/* google */}
                  <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.58519 10.5434H13.8535C13.1043 12.6616 11.0751 14.1803 8.69951 14.1628C5.81703 14.1415 3.43362 11.8356 3.32172 8.95521C3.20177 5.86765 5.67884 3.31754 8.74022 3.31754C10.14 3.31754 11.4174 3.85089 12.3804 4.72483C12.6085 4.93188 12.9557 4.93319 13.18 4.72203L14.7478 3.24654C14.9929 3.01576 14.9938 2.62603 14.7494 2.39448C13.2221 0.947606 11.1734 0.0457634 8.91419 0.00164608C4.0955 -0.0924312 0.0337824 3.8584 0.000217423 8.67792C-0.0336456 13.5336 3.89238 17.4805 8.74022 17.4805C13.4023 17.4805 17.2108 13.8301 17.4659 9.23183C17.4727 9.17418 17.4772 7.2258 17.4772 7.2258H9.58519C9.2617 7.2258 8.9995 7.488 8.9995 7.81149V9.95768C8.9995 10.2812 9.26176 10.5434 9.58519 10.5434Z" fill={`${GbtnHover ? '#fff' : '#F75847'}`} />
                    <path d="M24.7102 7.42075V5.3238C24.7102 5.04032 24.4805 4.81055 24.197 4.81055H22.432C22.1486 4.81055 21.9188 5.04032 21.9188 5.3238V7.42075H19.8218C19.5384 7.42075 19.3086 7.65051 19.3086 7.934V9.69893C19.3086 9.98241 19.5384 10.2122 19.8218 10.2122H21.9188V12.3091C21.9188 12.5926 22.1486 12.8224 22.432 12.8224H24.197C24.4805 12.8224 24.7102 12.5926 24.7102 12.3091V10.2122H26.8072C27.0907 10.2122 27.3204 9.98241 27.3204 9.69893V7.934C27.3204 7.65051 27.0907 7.42075 26.8072 7.42075H24.7102Z" fill={`${GbtnHover ? '#fff' : '#F75847'}`} />
                  </svg>
                </ButtonSecondary>
              </div>
              <div onClick={() => handleThirdPartyLogin('facebook')} className='flex-1  flex justify-center border-2 rounded-xl border-[#385C8E] w-36 hover:bg-[#385C8E] dark:hover:bg-[#171925] dark:bg-[#171925]' onMouseEnter={() => setFBtnHover(true)} onMouseLeave={() => setFBtnHover(false)}>
                <ButtonSecondary>
                  {/* facebook */}
                  <svg className='ml-4' width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.351263 12.2498H2.73823V22.629C2.73823 22.834 2.89542 23 3.08945 23H7.13666C7.33068 23 7.48788 22.834 7.48788 22.629V12.2987H10.2319C10.4104 12.2987 10.5605 12.1573 10.5809 11.9701L10.9976 8.14901C11.0091 8.04389 10.9775 7.93859 10.9109 7.85971C10.8443 7.78078 10.7489 7.73559 10.6488 7.73559H7.48805V5.34031C7.48805 4.61828 7.85611 4.25212 8.5822 4.25212C8.68568 4.25212 10.6488 4.25212 10.6488 4.25212C10.8428 4.25212 11 4.086 11 3.88116V0.373705C11 0.168772 10.8428 0.00274023 10.6488 0.00274023H7.80069C7.78062 0.00170703 7.736 0 7.67025 0C7.17608 0 5.45838 0.102467 4.10152 1.42088C2.59813 2.88192 2.80713 4.63122 2.85706 4.93453V7.7355H0.351221C0.157195 7.7355 0 7.90153 0 8.10647V11.8788C4.2531e-05 12.0837 0.157237 12.2498 0.351263 12.2498Z" fill={`${fbtnHover ? '#fff' : '#385C8E'}`} />
                  </svg>
                </ButtonSecondary>
              </div>
            </div>

            {/* divider */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400 divide-y-2 divide-neutral-100 "></div>
              <span className="flex-shrink mx-4 text-[#3944B3] text-sm">or</span>
              <div className="flex-grow border-t border-gray-400 divide-y-2 divide-neutral-100 "></div>
            </div>


            {/* input */}
            <div className='space-y-3 relative w-[100%]'>
              {
                servererror && !errors.username && !errors.password &&
                <div className='bg-[#FF2424] p-2 rounded-md flex justify-between items-center'>
                  <div className='w-[10%] h-[100%] mt-[.1em]'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                      <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                    </svg>
                  </div>
                  <div className='w-[90%] h-[100%]'>
                    <span className='text-[.7em] text-[#fff]'>{servererror}</span>
                  </div>
                </div>
              }
              <div className={`w-[100%] flex justify-between border-2 ${errors.username ? 'border-[#FF2424]' : 'border-[#DADBE8]'}  rounded-xl relative`}>
                <div className='w-[90%]'>
                  <CInput
                    sizeClass={`h-13 py-3`}
                    type="text"
                    name='username'
                    placeholder='User or email address'
                    onChange={(event: any) => handleChange(event)}
                    className={`h-[63px] border-0 ${errors.username ? 'placeholder-[#FF2424]' : ''}`}
                  />
                </div>
                <div className='w-[10%] flex items-center'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.4" clip-path="url(#clip0_510_4426)">
                      <g clip-path="url(#clip1_510_4426)">

                        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={errors.username ? '#FF2424' : theme == 'dark' ? '#fff' : '#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z" stroke={errors.username ? '#FF2424' : theme == 'dark' ? '#fff' : '#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.98047 18.6943C6.54476 17.5828 7.40581 16.6493 8.46816 15.9972C9.53052 15.3452 10.7527 15 11.9992 15C13.2457 15 14.4679 15.3452 15.5303 15.9972C16.5926 16.6493 17.4537 17.5828 18.018 18.6943" stroke={errors.username ? '#FF2424' : theme == 'dark' ? '#fff' : '#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_510_4426">
                        <rect width="24" height="24" fill={errors.username ? '#FF2424' : "#3944B3"} />
                      </clipPath>
                      <clipPath id="clip1_510_4426">
                        <rect width="24" height="24" fill={errors.username ? '#FF2424' : "#3944B3"} />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className={`w-[100%] flex justify-between border-2 border-[#DADBE8] rounded-xl ${errors.password ? 'border-[#FF2424]' : 'border-[#DADBE8]'}`}>
                <div className='w-[90%]'>
                  <CInput
                    sizeClass={`h-13 py-3`}
                    placeholder='Password'
                    type="password"
                    name='password'
                    // onChange={(password: any) => setPassword(password)}
                    onChange={(event: any) => handleChange(event)}
                    className={`h-[63px] border-0 ${errors.password ? 'placeholder-[#FF2424]' : ''}`}
                  />
                </div>
                <div className='w-[10%] flex items-center'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.4">
                      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={errors.password ? '#FF2424' : theme == 'dark' ? '#fff' : '#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M13.2563 12.4318C13.7685 12.1526 14.1731 11.7108 14.4063 11.176C14.6394 10.6413 14.6878 10.0441 14.5437 9.47875C14.3997 8.91345 14.0714 8.41223 13.6108 8.05426C13.1501 7.69628 12.5834 7.50195 12 7.50195C11.4166 7.50195 10.8499 7.69628 10.3892 8.05426C9.92861 8.41223 9.60035 8.91345 9.45629 9.47875C9.31224 10.0441 9.3606 10.6413 9.59374 11.176C9.82688 11.7108 10.2315 12.1526 10.7438 12.4318L9.45 15.4506C9.40029 15.5645 9.37966 15.689 9.38997 15.8128C9.40028 15.9367 9.4412 16.056 9.50907 16.1601C9.57693 16.2642 9.6696 16.3499 9.77874 16.4093C9.88789 16.4687 10.0101 16.5001 10.1344 16.5006H13.8656C13.9899 16.5001 14.1121 16.4687 14.2213 16.4093C14.3304 16.3499 14.4231 16.2642 14.4909 16.1601C14.5588 16.056 14.5997 15.9367 14.61 15.8128C14.6203 15.689 14.5997 15.5645 14.55 15.4506L13.2563 12.4318Z" stroke={errors.password ? '#FF2424' : theme == 'dark' ? '#fff' : '#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg>

                </div>
              </div>
              {errors.username &&
                <div className='absolute w-[23em] top-[2em] right-0'>
                  <div className="arrow-up absolute right-[.9em] top-[.4em]"></div>
                  <div className="absolute rounded-md w-[50%] right-[.1em] top-[.8em] bg-[#FF2424] flex items-center justify-between p-2">
                    <span className='w-[10%]'>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                        <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                      </svg>

                    </span>
                    <span className='w-[90%] text-[.7em] text-[#fff] flex justify-center'>{errors.username}</span>
                  </div>
                </div>}
              {
                errors.password &&
                <div className='absolute w-[23em] top-[7em] right-0'>
                  <div className="arrow-up absolute right-[.9em] top-[.4em]"></div>
                  <div className="absolute rounded-md w-[50%] right-[.1em] top-[.8em] bg-[#FF2424] flex items-center justify-between p-2">
                    <span className='w-[10%]'>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                        <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                      </svg>

                    </span>
                    <span className='w-[90%] text-[.7em] text-[#fff] flex justify-center'>{errors.password}</span>
                  </div>
                </div>
              }
            </div>

            {/* Remember me button */}
            <div className='my-1 py-1 flex items-center lg:mb-[83px] mt-4'>
              <Switch
                checked={toggleValue}
                onChange={toggle}
                className={`${toggleValue ? 'bg-[#F75847]' : 'bg-white'}
                  relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border border-[#F75847] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only"></span>
                <span
                  aria-hidden="true"
                  className={`${toggleValue ? 'translate-x-[18px]' : 'translate-x-0'}
                    pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out border border-[#F75847]`}
                />
              </Switch>
              <span className='text-xs ml-2'>Remember me</span>
            </div>

            {/* login button */}
            <div className='mt-4 lg:mt-8 flex flex-col items-start xl:items-end'>
              <ButtonPrimary className='rounded-2xl w-full max-w-[unset] xl:max-w-[322px] bg-[#F75847] h-[55px] text-[18px]' onClick={handleSubmit} >
                LOGIN
              </ButtonPrimary>
              <span className='text-[12px] ml-[20px] cursor-pointer self-start'>Forgot your password?</span>
            </div>
            <div className='mt-5 lg:hidden'>
              <span className='text-xs font-light ml-5 text-[#3944B3]' >Create your account</span>
              <ButtonAnimated classes='bg-gradient-to-b from-[#407BFE] to-[#3943B3] w-full h-[55px] text-[18px] font-medium justify-center' clickEvent={(event: any) => setShowSignup(event)} />
            </div>
            {/*flex-1 footer */}
            <div className={`ml-8 space-x-4 my-5 lg:mt-[50px] lg:mb-10 ${servererror ? 'mt-[10px]' : 'lg:mt-[50px]'}`}>
              <Privacy />
            </div>

          </div>
        </div>

      </div>
    </React.Fragment>
  );

  // Signup children
  let style = useRef<any>();

  const signupChildren = (
    <div>
      <div className="xl:w-[90%] min-w-[334px] px-[4vw] mt-24 lg:mt-5 mx-auto">
        <div className='w-full absolute top-0 left-0 lg:hidden bg-[#3944B3] px-5 py-3 rounded-t-2xl'>
          <h3 className='text-xl font-medium text-white'>Sign Up</h3>
          <p className='text-xs text-white font-normal'>Create your account</p>
        </div>
        <div className='hidden lg:inline-block mt-10 text-center text-[#3944B3] dark:text-[#fff] font-semibold text-[32px]' style={{ fontFamily: 'Poppins' }}>
          Signup
        </div>
        <div className='px-5 border-l-4  border-l-[#FF2424] mt-5'>
          {
            servererror &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>

              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{servererror}</div>
            </div>
          }
          {
            notDataProtectionAccepted.toggle &&
            notDataProtectionAccepted.notchecked &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>

              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{notDataProtectionAccepted.message}</div>
            </div>
          }
          {
            errors.email &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>

              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{errors.email}</div>
            </div>
          }
          {
            errors._password &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>

              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{errors._password}</div>
            </div>
          }
          {
            errors.name &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>

              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{errors.name}</div>
            </div>
          }
          {
            errors.surname &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>

              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{errors.surname}</div>
            </div>
          }
          {
            errors.country &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>

              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{errors.country}</div>
            </div>
          }
          {
            errors.confirmpassword &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>

              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{errors.confirmpassword}</div>
            </div>
          }
          {
            errors.pwdnotmatch &&
            <div className='w-[100%] flex'>
              <div className='w-[4%] h-[2em] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#FF2424" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M10 6.25V10.625" stroke="#FF2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#FF2424" />
                </svg>
              </div>
              <div className={`text-[12px] text-[#FF2424] flex items-center font-medium p-1`}>{errors.pwdnotmatch}</div>
            </div>
          }
        </div>
        <div className='w-full grid grid-cols-1 mt-8'>
          <CInput
            sizeClass="h-13 py-3"
            name='email'
            onChange={(event: any) => handleChange(event)}
            placeholder='Email' required
            className={`${errors.email ? 'border-2 border-[#FF2424] placeholder-[#FF2424]' : ' '}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">

          <div className='space-y-4'>
            <CInput
              sizeClass="h-13 py-3"
              name='_password'
              onChange={(event: any) => handleChange(event)}
              placeholder='Password'
              type="password"
              required
              className={`${errors._password ? 'border-2  border-[#FF2424] placeholder-[#FF2424]' : ''}`}
            />
            <CInput
              sizeClass="h-13 py-3"
              name='name'
              onChange={(event: any) => handleChange(event)}
              placeholder='Name'
              required
              className={`${errors.name ? 'border-2 border-[#FF2424] placeholder-[#FF2424]' : ''}`}
            />
            
            <div className='countriesSelector rounded-[10px] h-[47px] px-2 py-1 border-[1px] border-[#666]'>
              {
                _COUNTRIES?.length > 0 &&
                <Select
                  label=""
                  placeholder="Select country"
                  searchable
                  nothingFound="No options"
                  data={_COUNTRIES}
                  classNames={{
                    input: classes.input
                  }}
                  styles={(theme) => ({
                    input: {
                      color: 
                      themeMode === 'dark' ? 'gray' : 'black',
                      background: 'transparent',
                      border: '.1vw solid transparent',
                      '&:focus': {
                        border: 'outline-none',
                        boxShadow: 'none !important',
                      },
                    },
                    item: {
                      // applies styles to selected item
                      '&[data-selected]': {
                        '&, &:hover': {
                          backgroundColor:
                            'transparent',
                        },
                      },
            
                      // applies styles to hovered item (with mouse or keyboard)
                      '&[data-hovered]': {},
                    },
                  })}
                  onChange={(country: any) => handleChange({ cca2: country })}
                />
              }
            </div>

            {/* <NationalityPicker
              styles="px-3 py-3 rounded-lg"
              spanText="Select country"
              typeSize='text-xs'
              nodeName='country'
              id='nationality'
              onNationalityChanged={(nationality: any) => handleChange(nationality)}
            /> */}
          </div>

          <div className='space-y-4'>
            <CInput
              sizeClass="h-13 py-3"
              name='confirmpassword'
              onChange={(event: string) => handleChange(event)}
              placeholder='Confirm Password'
              type="password"
              required
              className={`${(errors.confirmpassword || errors.pwdnotmatch) ? 'border-2 border-[#FF2424] placeholder-[#FF2424]' : ''}`}
            />
            <CInput
              sizeClass="h-13 py-3"
              name='surname'
              onChange={(event: string) => handleChange(event)}
              placeholder='Surname'
              required
              className={`${errors.surname ? 'border-2 border-[#FF2424] placeholder-[#FF2424]' : ''}`}
            />

            <CInputTel
              sizeClass="h-13 py-3"
              name='telephone'
              type='number'
              handleChange={handleChange}
              placeholder='Telephone'
              required
              className={`${errors.telephone ? 'border-2 border-[#FF2424] placeholder-[#FF2424]' : ''}`}
            />
            
          </div>

        </div>

        <div className='space-y-4 mt-10'>
          <div>
            <Checkbox
              name=""
              label="By checking this box, I expressly authorize the sending of news, offers and relevant information by email"
              subLabel=''
              defaultChecked={false}
              labelClassNames='!text-xs'
            />
          </div>
          <div>
            <Checkbox
              name="guideline"
              onChange={(checked: any) => setNotDataProtectionAccepted({ toggle: checked, notchecked: !checked, message: notDataProtectionAccepted.message })}
              label="By checking this box I confirm that I have read and accept the information about the service and personal data protection"
              subLabel=''
              defaultChecked={false}
              labelClassNames='!text-xs'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-12 space-x-[48px] py-[60px]'>
          <div className='w-full flex justify-center z-10 mx-auto'>
            <ReCAPTCHA
              sitekey="6LfPZSYhAAAAAHPQvaQF-gnfQNN21MDLmWN6-6xD"
            // onChange={onChange}
            />
          </div>
          <div style={{ margin: "auto" }}>
            <ButtonPrimary className='bg-[#3944B3] py-6 text-lg z-[1] w-[346px] !h-[55px] rounded-[100px]' onClick={handleSubmit} >
              REGISTER
            </ButtonPrimary>
            <span className='hidden lg:inline-block text-[9px]'>By clicking Register, i agree to the Terms of Use and Privacy Policy</span>
          </div>
        </div>

        {/*flex-1 footer */}
        <div className='mt-5 mb-3 lg:pb-[1rem] lg:mt-[5rem]'>
          <Privacy className='lg:-space-x-28 justify-between text-center relative z-10' />
        </div>

        <img src={signupImage} alt="" style={{position: "absolute", bottom: "0", left: "29%", opacity: "0.12", height: "650px", zIndex: -1,}}  />
      </div>

    </div>
  );

  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleDialogClose}
      // style={{backgroundImage: `url(${login})`}}
      >
        <div className="min-h-screen px-1 text-center md:px-4" >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 dark:bg-opacity-80" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              //  style={{backgroundImage: `url(${login})`}}
              className={`lg:w-[95%] xl:w-[80%] 2xl:w-[65%] inline-block lg:!max-w-[925px] my-5 text-left align-middle transition-all transform bg-white border border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300 ${contentExtraClass} opacity-100 scale-100`}
            >
              <div
                className='w-7 h-7 sm:w-11 sm:h-11 absolute right-0 top-0 flex items-center justify-center bg-white rounded-full z-[51] translate-x-[50%] -translate-y-1/2 cursor-pointer'
                onClick={() => handleDialogClose()}
              >
                {/* <CrossIcon className='text-[#F75847] dark:text-black w-10 h-10' />  */}
                <CloseIcon className='font-semibold text-[#F75847] dark:text-[#000]' />
              </div>
              {showSignup ? signupChildren : signinChildren}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Signin;
