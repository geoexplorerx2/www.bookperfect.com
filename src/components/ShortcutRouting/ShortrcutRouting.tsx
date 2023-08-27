import React, { FC, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { stripHtml } from "../../common/stripHtml";
import { supportHelps } from "../../store/actions";
import randomId from "../../common/randomId";
import { DISABLEDROPDOWN } from '../../store/actions';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface ShortCutRoutingProps {
  padding?: string;
  statictext?: any;
};

const ShortCutRouting: FC<ShortCutRoutingProps> = ({ padding = 'md:px-[10vw] px-5', statictext }) => {
  // @ts-ignore
  const {t} = useTranslation()
  const items = [
    {
      id: randomId(),
      href: "/tripdesigner",
      name: "Trip Designer",

    },
    {
      id: randomId(),
      href: "/flights",
      name: "Flights & More",

    },
    {
      id: randomId(),
      href: "/hotels",
      name: "Hotels",

    },
    {
      id: randomId(),
      href: "/flights-hotels",
      name: "Flights + Hotels",

    },
    {
      id: randomId(),
      href: "/activities",
      name: "Activities",

    },
    {
      id: randomId(),
      href: "/transfers",
      name: "Transfers",

    },
    {
      id: randomId(),
      href: "/packages",
      name: "Packages",

    },
    {
      id: randomId(),
      href: "/car-rental",
      name: "Rent a Car",

    },
    {
      id: randomId(),
      href: "",
      name: "More",
      type: "dropdown",
    },
  ];
  const dispatch = useDispatch();
  const [hover, setHover] = useState<any>(false);
  const [id, setId] = useState<any>();

  const handleMouseEnter = (data: any) => {
    setHover(true);
    setId(data);
  };

  const handleMouseLeave = (data: any) => {
    setHover(false);
    setId(data);
  };

  const handleShortCut = (param: any) => {
    dispatch({
      type: DISABLEDROPDOWN,
      payload: {
        status: param,
      }
    });
    dispatch(
      supportHelps(
        {
          type: 'RESET'
        }
      )
    );
  };

  // let history = useHistory();
  const theme = useSelector((state: any) => state.LightMode.mode);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  return (
    <div className={`w-[100%] min-h-[360px] dark:bg-transparent bg-white ${padding} py-[1vh] dark:py-16`}>
      <div className={`w-[100%]`}>
        <div className={`text-base md:text-xl xl:text-2xl font-normal text-[#000] dark:text-[#fff]`}>
          {statictext && stripHtml(statictext.anything_embarrassing_hidden_in_the_middle)}
        </div>
        <div className={`w-[100%] text-xs md:text-sm text-[#000] font-light dark:text-[#fff] py-5 line-clamp-2 bigMd:line-clamp-none`}>
          <p>
            {statictext && stripHtml(statictext.anything_embarrassing_hidden_in_the_middle_description)}
          </p>
        </div>
      </div>
      <div className={`grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 py-2 w-[100%] h-[100%]`}>

        {/* TRIPDESIGNER CARD */}
        <div onClick={() => handleShortCut(items[0])} onMouseEnter={() => handleMouseEnter('tripdesigner')}
          onMouseLeave={() => handleMouseLeave('')}
          className={`hoverstyle overflow-hidden relative shadow-[0px_6px_17px_rgba(220,_164,_147,_0.15)] flex-1 rounded-[1.5vw] h-[180px] ${hover && id == 'tripdesigner' ? 'bg-gradient-to-b from-[#407BFE] to-[#3943B3] shadow-[0px_9px_19px_rgba(142,_177,_255,_0.52)] dark:shadow-none' : 'bg-[#fff] dark:border-[1px] border-[#fff] dark:bg-[#202232]'}`}>
          <Link to={`/${activeLang}/tripdesigner`}>
            <div className='h-[100%]'>
              <div className='w-[40%] mt-[15px] py-2 flex justify-center'>
                <svg className="mt-[15px] mb-[0px]" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.84961 11.3503L5.73285 10.1795C6.14288 10.9956 6.76372 11.9067 7.60256 12.9251C8.76014 14.3304 9.9017 15.4048 9.94975 15.4498L10.5585 16.0207L11.1672 15.4498C11.2153 15.4048 12.3568 14.3304 13.5144 12.9251C14.3948 11.8562 15.0334 10.9063 15.4417 10.0597L18.3448 11.3503L24.3881 7.59322V20.743L18.3448 24.5L9.89307 20.743L3.84961 24.5V11.3503ZM6.02035 8.03814C6.02035 5.53175 8.05219 3.5 10.5585 3.5C13.0648 3.5 15.0966 5.53175 15.0966 8.03814C15.0966 10.5445 10.5585 14.8008 10.5585 14.8008C10.5585 14.8008 6.02035 10.5444 6.02035 8.03814ZM10.5585 9.95127C11.6642 9.95127 12.5606 9.05486 12.5606 7.94915C12.5606 6.84345 11.6642 5.94703 10.5585 5.94703C9.45278 5.94703 8.55637 6.84345 8.55637 7.94915C8.55637 9.05486 9.45278 9.95127 10.5585 9.95127Z" fill={`${hover && id == 'tripdesigner' ? '#fff' : theme == 'dark' ? '#fff' : '#3946AF'}`} />
                </svg>
              </div>
              <div className='w-[100%] mt-[21px]  relative px-5'>
                <span className={`${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[#3946AF]'} text-[16px] font-medium dark:text-[#fff]`}>{t('SEARCH_TABS.TRIP_DESIGNER')}</span>
              </div>
              <div className='w-[100%] h-[30%] flex relative mt-1 px-5'>
                <div className={`w-[100%] text-[12px] font-light ${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[#000] dark:text-[#fff]'}`}>
                  <span className="line-clamp-2">
                    Lorem Ipsum is simply dummy text
                  </span>
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 translate-x-4 -translate-y-7 bg-[#F4F8FF] rounded-full ${hover && id == 'tripdesigner' ? 'opacity-25' : 'dark:opacity-20'}`}></div>

            </div>
          </Link>
        </div>


        {/* FLIGHTS & MORE CARD */}
        <div onClick={() => handleShortCut(items[1])} onMouseEnter={() => handleMouseEnter('flights&more')}
          onMouseLeave={() => handleMouseLeave('')}
          className={`hoverstyle overflow-hidden relative shadow-[0px_6px_17px_rgba(220,_164,_147,_0.15)] flex-1 rounded-[1.5vw] h-[180px] ${hover && id == 'flights&more' ? 'bg-gradient-to-b from-[#407BFE] to-[#3943B3] shadow-[0px_9px_19px_rgba(142,_177,_255,_0.52)] dark:shadow-none' : 'bg-[#fff] dark:border-[1px] border-[#fff] dark:bg-[#202232]'}`}>
          <Link to={`/${activeLang}/flights`}>
            <div className='h-[100%]'>
              <div className='w-[60%] mt-[15px] py-2 pl-6 flex justify-center'>
                <svg width="58" height="60" viewBox="0 0 52 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_6715_21807)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99631 20.2882L16.0748 17.9773L15.564 17.3182L13.2651 14.3512C13.0956 14.1326 13.0655 13.8208 13.1895 13.5674L13.625 12.6767C13.7832 12.3532 14.1415 12.2222 14.4424 12.378L20.7288 15.6319L21.7075 16.1385L27.2768 14.3203C27.5201 14.24 27.7732 14.1989 28.0272 14.1989C29.1811 14.1989 30.2175 15.0552 30.5475 16.281C30.9618 17.8212 30.1678 19.4474 28.7777 19.9062L16.9863 23.7336C16.9288 23.7524 16.8693 23.7617 16.8099 23.7617C16.7588 23.7617 16.7078 23.7548 16.6579 23.741L9.0218 21.6294C8.74704 21.5534 8.55229 21.2831 8.54641 20.9696C8.54037 20.656 8.72477 20.377 8.99631 20.2882ZM5.76228 17.3486L8.54626 18.7897L5.51819 19.7783L4.92107 18.2553C4.81722 17.9903 4.87212 17.6817 5.05903 17.4802C5.24602 17.2787 5.52604 17.2264 5.76228 17.3486Z" fill={`${hover && id == 'flights&more' ? '#fff' : theme == 'dark' ? '#fff' : '#3946AF'}`} />
                  </g>
                  <g clip-path="url(#clip1_6715_21807)">
                    <path d="M35.793 16.333H44.925" stroke={hover && id == 'flights&more' ? '#fff' : theme == 'dark' ? '#fff' : '#3946AF'} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M40.3574 11.75V20.9167" stroke={hover && id == 'flights&more' ? '#fff' : theme == 'dark' ? '#fff' : '#3946AF'} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_6715_21807">
                      <rect width="50.6415" height="35" fill="white" transform="translate(0.509766 0.5)" />
                    </clipPath>
                    <clipPath id="clip1_6715_21807">
                      <rect x="33.7168" y="9.6665" width="13.283" height="13.3333" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

              </div>
              <div className='w-[100%] mt-[6px] relative px-5'>
                <span className={`${hover && id == 'flights&more' ? 'text-[#fff]' : 'text-[#3946AF]'} text-sm font-medium dark:text-[#fff]`}>{t('SEARCH_TABS.FLIGHTS_&_MORE')}</span>
              </div>
              <div className='w-[100%] h-[30%] flex relative mt-1 px-5'>
                <div className={`w-[100%] text-[12px] font-light ${hover && id == 'flights&more' ? 'text-[#fff]' : 'text-[#000]'} line-clamp-2`}>
                  <span className="line-clamp-2 dark:text-[#fff]">
                    Lorem Ipsum is simply dummy text
                  </span>
                </div>

                {/* <i className={`${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i> */}
                {/* <div className='absolute bottom-[0] right-4'>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2627_9669)">
                          <path d="M3.47803 10H16.5215" stroke={`${hover && id == 'flights&more' ? '#fff' : 'blue'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke={`${hover && id == 'flights&more' ? '#fff' : 'blue'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_2627_9669">
                            <rect width="20" height="20" fill={`${hover && id == 'flights&more' ? '#fff' : 'blue'}`} />
                          </clipPath>
                        </defs>
                      </svg>
                    </div> */}
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 translate-x-4 -translate-y-7 bg-[#F4F8FF] rounded-full ${hover && id == 'flights&more' ? 'opacity-25' : 'dark:opacity-20'}`}></div>

            </div>
          </Link>
        </div>

        {/* HOTELS CARD */}
        <div onClick={() => handleShortCut(items[2])} onMouseEnter={() => handleMouseEnter('HOTELS')}
          onMouseLeave={() => handleMouseLeave('')}
          className={`hoverstyle overflow-hidden relative shadow-[0px_6px_17px_rgba(220,_164,_147,_0.15)] flex-1 rounded-[1.5vw] h-[180px] ${hover && id == 'HOTELS' ? 'bg-gradient-to-b from-[#407BFE] to-[#3943B3] shadow-[0px_9px_19px_rgba(142,_177,_255,_0.52)] dark:shadow-none' : 'bg-[#fff] dark:border-[1px] border-[#fff] dark:bg-[#202232]'}`}>
          <Link to={`/${activeLang}/hotels`}>
            <div className='h-[100%]'>
              <div className='w-[40%] mt-[24px] py-2 pl-6 flex justify-center'>
                <svg width="33" height="33" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7594_14210)">
                    <path d="M23.7569 9.74783H18.5403V6.3434C18.5403 5.93292 18.2076 5.6001 17.7973 5.6001H10.2027C9.79237 5.6001 9.45965 5.93292 9.45965 6.3434V9.74783H4.24308C3.83268 9.74783 3.5 10.0806 3.5 10.4911V21.6568C3.5 22.0673 3.83272 22.4001 4.24308 22.4001C5.16581 22.4001 22.9684 22.4001 23.7569 22.4001C24.1673 22.4001 24.5 22.0673 24.5 21.6568V10.4911C24.5 10.0806 24.1673 9.74783 23.7569 9.74783ZM8.02308 14.0589H6.42273C6.01237 14.0589 5.67965 13.7261 5.67965 13.3156C5.67965 12.9051 6.01233 12.5723 6.42273 12.5723H8.02304C8.4334 12.5723 8.76612 12.9051 8.76612 13.3156C8.76612 13.7262 8.43344 14.0589 8.02308 14.0589ZM17.0542 8.36034H15.7015C15.2912 8.36034 14.9585 8.69316 14.9585 9.10365C14.9585 9.51413 15.2911 9.84695 15.7015 9.84695H17.0542C17.0542 10.6446 17.0542 11.0163 17.0542 11.3831H15.7015C15.2912 11.3831 14.9585 11.7159 14.9585 12.1264C14.9585 12.5369 15.2911 12.8697 15.7015 12.8697H17.0542V14.4058H15.7015C15.2912 14.4058 14.9585 14.7386 14.9585 15.1491C14.9585 15.5596 15.2911 15.8924 15.7015 15.8924H17.0542V20.9136H16.2869V18.5683C16.2869 18.1578 15.9542 17.825 15.5438 17.825H12.4562C12.0459 17.825 11.7131 18.1578 11.7131 18.5683V20.9136H10.9459V15.8924H12.2985C12.7089 15.8924 13.0416 15.5596 13.0416 15.149C13.0416 14.7386 12.7089 14.4057 12.2985 14.4057H10.9459V12.8696H12.2985C12.7089 12.8696 13.0416 12.5368 13.0416 12.1263C13.0416 11.7158 12.7089 11.383 12.2985 11.383H10.9459C10.9459 10.8505 10.9459 10.3864 10.9459 9.84687H12.2985C12.7089 9.84687 13.0416 9.51409 13.0416 9.10356C13.0416 8.69308 12.7089 8.36026 12.2985 8.36026H10.9459V7.08667H17.0542V8.36034ZM21.5773 14.0589H19.977C19.5666 14.0589 19.2339 13.7261 19.2339 13.3156C19.2339 12.9051 19.5666 12.5723 19.977 12.5723H21.5773C21.9876 12.5723 22.3203 12.9051 22.3203 13.3156C22.3203 13.7262 21.9876 14.0589 21.5773 14.0589Z" fill={`${hover && id == 'HOTELS' ? '#fff' : theme == 'dark' ? '#fff' : '#3946AF'}`} />
                  </g>
                  <defs>
                    <clipPath id="clip0_7594_14210">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>


              </div>
              <div className='w-[100%]  mt-[24px] relative px-5'>
                <span className={`${hover && id == 'HOTELS' ? 'text-[#fff]' : 'text-[#3946AF]'} text-sm font-medium dark:text-[#fff]`}>{t('SEARCH_TABS.HOTELS')}</span>
              </div>
              <div className='w-[100%] h-[30%] flex relative mt-1 px-5'>
                <div className={`w-[100%] text-[12px] font-light ${hover && id == 'HOTELS' ? 'text-[#fff]' : 'text-[#000]'} line-clamp-2`}>
                  <span className="line-clamp-2 dark:text-[#fff]">
                    Lorem Ipsum is simply dummy text
                  </span>
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 translate-x-4 -translate-y-7 bg-[#F4F8FF] rounded-full ${hover && id == 'HOTELS' ? 'opacity-25' : 'dark:opacity-20'}`}></div>

            </div>
          </Link>
        </div>


        {/* FLIGHTS+HOTELS CARD */}
        <div onClick={() => handleShortCut(items[3])} onMouseEnter={() => handleMouseEnter('FLIGHTS+HOTELS')}
          onMouseLeave={() => handleMouseLeave('')}
          className={`hoverstyle overflow-hidden relative shadow-[0px_6px_17px_rgba(220,_164,_147,_0.15)] flex-z rounded-[1.5vw] h-[180px] ${hover && id == 'FLIGHTS+HOTELS' ? 'bg-gradient-to-b from-[#407BFE] to-[#3943B3] shadow-[0px_9px_19px_rgba(142,_177,_255,_0.52)] dark:shadow-none' : 'bg-[#fff] dark:border-[1px] border-[#fff] dark:bg-[#202232]'}`}>
          <Link to={`/${activeLang}/flights-hotels`}>
            <div className='h-[100%]'>
              <div className='w-[40%] mt-[26px] py-2 pl-6 flex justify-center'>
                <svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7594_14073)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4649 7.72564L5.13759 9.73508C4.89486 9.81221 4.73003 10.0549 4.73543 10.3275C4.74068 10.6001 4.91477 10.8352 5.16037 10.9012L11.9861 12.7374C12.0308 12.7494 12.0764 12.7554 12.122 12.7554C12.1751 12.7554 12.2283 12.7473 12.2797 12.731L22.8198 9.40289C24.0625 9.00392 24.7721 7.58987 24.4018 6.25062C24.1068 5.18471 23.1805 4.4401 22.149 4.4401C21.9219 4.4401 21.6957 4.47583 21.4782 4.54564L16.4999 6.12665L15.6251 5.6862L10.0057 2.85675C9.73679 2.72129 9.41652 2.83522 9.2751 3.11649L8.88577 3.89101C8.77499 4.11131 8.80192 4.38246 8.95336 4.57254L11.0083 7.15245L11.4649 7.72564ZM7.20588 8.03582L4.40013 6.59832C4.16203 6.47638 3.87983 6.52855 3.69138 6.72954C3.50301 6.93053 3.44767 7.23837 3.55233 7.50272L4.15413 9.02203L7.20588 8.03582ZM22.2742 15.7213H23.7714C24.1738 15.7213 24.5001 16.0216 24.5 16.3919V24.5292C24.5 24.8996 24.1737 25.1998 23.7713 25.1998H22.2741C21.8717 25.1998 21.5454 24.8996 21.5454 24.5292V23.1845H6.57853V24.5292C6.57853 24.8996 6.25228 25.1998 5.84985 25.1998H4.22868C3.82625 25.1998 3.5 24.8996 3.5 24.5292V13.426C3.5 13.0555 3.82625 12.7554 4.22868 12.7554H5.84985C6.25228 12.7554 6.57853 13.0555 6.57853 13.426V16.1083C6.62662 16.1043 6.67511 16.1015 6.72427 16.1015H10.0988C10.9828 16.1015 11.7019 16.7633 11.7019 17.5768V18.0208C11.7019 18.066 11.6989 18.1106 11.6946 18.1549H21.5455V16.3919C21.5455 16.0215 21.8718 15.7213 22.2742 15.7213ZM6.57853 20.5124H21.5454V19.4961H10.0988H6.72427H6.57853V20.5124Z" fill={`${hover && id == 'FLIGHTS+HOTELS' ? '#fff' : theme=='dark'?'#fff':'#3946AF'}`} />
                  </g>
                  <defs>
                    <clipPath id="clip0_7594_14073">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>



              </div>
              <div className='w-[100%] mt-[25px] relative px-5'>
                <span className={`${hover && id == 'FLIGHTS+HOTELS' ? 'text-[#fff]' : 'text-[#3946AF]'} text-sm font-medium dark:text-[#fff]`}>{t('SEARCH_TABS.FLIGHTS_+_HOTELS')}</span>
              </div>
              <div className='w-[100%] h-[30%] flex relative mt-1 px-5'>
                <div className={`w-[100%] text-[12px] font-light ${hover && id == 'FLIGHTS+HOTELS' ? 'text-[#fff]' : 'text-[#000]'} line-clamp-2`}>
                  <span className="line-clamp-2 dark:text-[#fff]">
                    Lorem Ipsum is simply dummy text
                  </span>
                </div>

                {/* <i className={`${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i> */}
                <div className='absolute bottom-[0] right-4'>
                  {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2627_9669)">
                          <path d="M3.47803 10H16.5215" stroke={`${hover && id == 'HOTELS' ? '#fff' : 'blue'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke={`${hover && id == 'HOTELS' ? '#fff' : 'blue'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_2627_9669">
                            <rect width="20" height="20" fill={`${hover && id == 'HOTELS' ? '#fff' : 'blue'}`} />
                          </clipPath>
                        </defs>
                      </svg> */}
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 translate-x-4 -translate-y-7 bg-[#F4F8FF] rounded-full ${hover && id == 'FLIGHTS+HOTELS' ? 'opacity-25' : 'dark:opacity-20'}`}></div>

            </div>
          </Link>
        </div>


        <div
          onClick={() => handleShortCut(items[4])}
          onMouseEnter={() => handleMouseEnter('Activities')}
          onMouseLeave={() => handleMouseLeave('')}
          className={`hoverstyle overflow-hidden relative shadow-[0px_6px_17px_rgba(220,_164,_147,_0.15)] flex-1 rounded-[1.5vw] h-[180px] ${hover && id == 'Activities' ? 'bg-gradient-to-b from-[#407BFE] to-[#3943B3] shadow-[0px_9px_19px_rgba(142,_177,_255,_0.52)] dark:shadow-none' : 'bg-[#fff] dark:border-[1px] border-[#fff] dark:bg-[#202232]'}`}>
          <Link to={`/${activeLang}/activities`}>
            <div className='h-[100%]'>
              <div className='w-[40%] mt-[14px] mb-[15px] py-2 flex justify-center'>
                <svg className="mt-[14px]" width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.912 3.5C10.2877 3.5 7.34961 6.22537 7.34961 9.58723C7.34961 9.65427 7.35227 9.72243 7.3574 9.79157C7.65546 9.44901 8.04587 9.1814 8.62051 9.1814C9.57647 9.1814 10.0229 9.92159 10.3817 10.5165L10.3819 10.5168C10.7337 11.1002 10.9356 11.375 11.2661 11.375C11.5966 11.375 11.7985 11.1002 12.1502 10.5168L12.1503 10.5166C12.5091 9.92172 12.9556 9.1814 13.9116 9.1814C14.8676 9.1814 15.3141 9.92167 15.673 10.5166L15.6731 10.5168C16.0248 11.1002 16.2269 11.375 16.5573 11.375C16.8878 11.375 17.0897 11.1002 17.4415 10.5168L17.4416 10.5166C17.8004 9.92171 18.2469 9.1814 19.2029 9.1814C19.778 9.1814 20.1686 9.44935 20.4668 9.79224C20.4719 9.72282 20.4746 9.65447 20.4746 9.58723C20.4746 6.22537 17.5364 3.5 13.912 3.5ZM19.4772 10.0625C19.1296 10.0625 18.9172 10.429 18.5472 11.2068C18.1699 12.0001 17.7002 12.9873 16.6945 12.9873C15.6888 12.9873 15.2191 12.0001 14.8417 11.2068C14.4718 10.429 14.2593 10.0625 13.9117 10.0625C13.564 10.0625 13.3517 10.429 12.9817 11.2068L12.9816 11.2071C12.6042 12.0003 12.1346 12.9873 11.129 12.9873C10.1234 12.9873 9.65376 12.0002 9.27637 11.2069L9.27632 11.2068C8.9063 10.429 8.69393 10.0625 8.34634 10.0625C7.99874 10.0625 7.78626 10.429 7.41624 11.2068L7.34961 11.3465C7.97027 13.4083 9.34638 15.861 10.679 18.2363L10.679 18.2363C11.1221 19.026 11.5604 19.8071 11.9645 20.5625H15.8599C16.2639 19.8073 16.7021 19.0263 17.1451 18.2367L17.1451 18.2367C18.4777 15.8617 19.8538 13.4091 20.4746 11.3472C20.4519 11.3 20.4295 11.253 20.4076 11.2068C20.0374 10.429 19.825 10.0625 19.4772 10.0625ZM11.2871 23.8811V21.875H16.5371V23.8811C16.5371 24.2224 16.1413 24.5 15.6549 24.5H12.1694C11.6829 24.5 11.2871 24.2224 11.2871 23.8811Z" fill={`${hover && id == 'Activities' ? '#fff' : theme=='dark'?'#fff':'#3946AF'}`}></path>
                </svg>
              </div>
              <div className='w-[100%] mt-[20px] relative px-5'>
                <span className={`${hover && id == 'Activities' ? 'text-[#fff]' : 'text-[#3946AF]'} text-sm font-medium dark:text-[#fff]`}>{t('SEARCH_TABS.ACTIVITIES')}</span>
              </div>
              <div className='w-[100%] flex relative px-5'>
                <div className={`w-[100%] mt-1 text-[12px] font-light ${hover && id == 'Activities' ? 'text-[#fff]' : 'text-[#000]'} line-clamp-2`}>
                  <span className="line-clamp-2 dark:text-[#fff]">
                    Lorem Ipsum is simply dummy text
                  </span>
                </div>

                {/* <i className={`${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i> */}
                <div className='absolute bottom-[0] right-4'>
                  {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2627_9669)">
                          <path d="M3.47803 10H16.5215" stroke={`${hover && id == 'Activities' ? '#fff' : 'blue'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke={`${hover && id == 'Activities' ? '#fff' : 'blue'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_2627_9669">
                            <rect width="20" height="20" fill={`${hover && id == 'Activities' ? '#fff' : 'blue'}`} />
                          </clipPath>
                        </defs>
                      </svg> */}
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 translate-x-4 -translate-y-7 bg-[#F4F8FF] rounded-full ${hover && id == 'Activities' ? 'opacity-25' : 'dark:opacity-20'}`}></div>
            </div>
          </Link>
        </div>

        <div onClick={() => handleShortCut(items[5])} onMouseEnter={() => handleMouseEnter('Transfers')}
          onMouseLeave={() => handleMouseLeave('')}
          className={`hoverstyle overflow-hidden relative  shadow-[0px_6px_17px_rgba(220,_164,_147,_0.15)] flex-1 rounded-[1.5vw] h-[180px] ${hover && id == 'Transfers' ? 'bg-gradient-to-b from-[#407BFE] to-[#3943B3] shadow-[0px_9px_19px_rgba(142,_177,_255,_0.52)] dark:shadow-none' : 'bg-[#fff] dark:border-[1px] border-[#fff] dark:bg-[#202232]'}`}>
          <Link to={`/${activeLang}/transfers`}>
            <div className='h-[100%]'>
              <div className='w-[40%] mt-[19px] mb-[15px] py-2 flex justify-center'>
                <svg className="mt-[15px]" width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.3034 13.0013L20.9283 16.7706C20.8577 16.8473 20.7722 16.9086 20.6771 16.9508C20.5819 16.9929 20.4792 17.015 20.3752 17.0156H14.0001V23.0464C14.0001 23.2463 13.9211 23.438 13.7804 23.5794C13.6398 23.7208 13.449 23.8002 13.2501 23.8002C13.0512 23.8002 12.8604 23.7208 12.7198 23.5794C12.5791 23.438 12.5001 23.2463 12.5001 23.0464V17.0156H5.00002C4.60219 17.0156 4.22065 16.8567 3.93934 16.574C3.65804 16.2912 3.5 15.9078 3.5 15.5079V9.47712C3.5 9.07725 3.65804 8.69377 3.93934 8.41102C4.22065 8.12827 4.60219 7.96943 5.00002 7.96943H12.5001V4.95404C12.5001 4.75411 12.5791 4.56237 12.7198 4.42099C12.8604 4.27962 13.0512 4.2002 13.2501 4.2002C13.449 4.2002 13.6398 4.27962 13.7804 4.42099C13.9211 4.56237 14.0001 4.75411 14.0001 4.95404V7.96943H20.3752C20.4792 7.97003 20.5819 7.99208 20.6771 8.03423C20.7722 8.07637 20.8577 8.1377 20.9283 8.21443L24.3034 11.9837C24.4299 12.1226 24.5 12.3042 24.5 12.4925C24.5 12.6809 24.4299 12.8624 24.3034 13.0013Z" fill={`${hover && id == 'Transfers' ? '#fff' : theme=='dark'?'#fff':'#3946AF'}`}></path>
                </svg>
              </div>
              <div className='w-[200%] relative mt-[10px] px-5'>
                <span className={`${hover && id == 'Transfers' ? 'text-[#fff]' : 'text-[#3946AF]'} text-sm font-medium dark:text-[#fff]`}>{t('SEARCH_TABS.TRANSFERS')}</span>
              </div>
              <div className='w-[100%] h-[30%] mt-1 flex relative px-5'>
                <div className={`w-[100%]  text-[12px] font-light ${hover && id == 'Transfers' ? 'text-[#fff]' : 'text-[#000]'} line-clamp-2`}>
                  <span className="line-clamp-2 dark:text-[#fff]">
                    Lorem Ipsum is simply dummy text

                  </span>
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 translate-x-4 -translate-y-7 bg-[#F4F8FF] rounded-full ${hover && id == 'Transfers' ? 'opacity-25' : 'dark:opacity-20'}`}></div>
            </div>
          </Link>
        </div>


        <div onClick={() => handleShortCut(items[6])} onMouseEnter={() => handleMouseEnter('Packages')}
          onMouseLeave={() => handleMouseLeave('')}
          className={`hoverstyle overflow-hidden relative shadow-[0px_6px_17px_rgba(220,_164,_147,_0.15)] flex-1 rounded-[1.5vw] h-[180px] ${hover && id == 'Packages' ? 'bg-gradient-to-b from-[#407BFE] to-[#3943B3] shadow-[0px_9px_19px_rgba(142,_177,_255,_0.52)] dark:shadow-none' : 'bg-[#fff] dark:border-[1px] border-[#fff] dark:bg-[#202232]'}`}>
          <Link to={`/${activeLang}/packages`}>
            <div className='h-[100%]'>
              <div className='w-[40%] mt-[15px] mb-[15px] py-2 flex justify-center'>
                <svg className='mt-[15px]' width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6116 5.98868C10.8987 5.98868 10.3186 6.55125 10.3186 7.24268L10.3186 8.4652H9.19605V7.24268C9.19605 5.95098 10.2797 4.90039 11.6115 4.90039H16.3917C17.7237 4.90039 18.8071 5.95098 18.8071 7.24268V8.4652H17.6848V7.24268C17.6848 6.55121 17.1047 5.98868 16.3917 5.98868H11.6116ZM23.5455 9.39107H4.45454C3.92741 9.39107 3.5 9.8055 3.5 10.3167V13.4127L12.3295 15.3576V14.4674C12.3295 14.212 12.5433 14.0046 12.8068 14.0046H15.1932C15.4569 14.0046 15.6704 14.212 15.6704 14.4674V15.3588L24.5 13.4203V10.3167C24.5 9.8055 24.0726 9.39107 23.5455 9.39107ZM15.6705 18.1699C15.6705 18.4253 15.4569 18.6327 15.1932 18.6327H12.8068C12.5434 18.6327 12.3296 18.4253 12.3296 18.1699V16.544L3.5 14.5988V22.3498C3.5 22.861 3.92741 23.2754 4.45454 23.2754H23.5455C24.0726 23.2754 24.5 22.8609 24.5 22.3498V14.6067L15.6705 16.5452V18.1699Z" fill={`${hover && id == 'Packages' ? '#fff' : theme=='dark'?'#fff':'#3946AF'}`}></path>
                </svg>
              </div>
              <div className='w-[100%] mt-[19px] relative px-5'>
                <span className={`${hover && id == 'Packages' ? 'text-[#fff]' : 'text-[#3946AF]'} text-sm font-medium dark:text-[#fff]`}>{t('SEARCH_TABS.PACKAGES')}</span>
              </div>
              <div className='w-[100%] h-[30%] flex relative mt-1 px-5'>
                <div className={`w-[100%]  text-[12px] font-light ${hover && id == 'Packages' ? 'text-[#fff]' : 'text-[#000]'} line-clamp-2`}>
                  <span className="line-clamp-2 dark:text-[#fff]">
                    Lorem Ipsum is simply dummy text
                  </span>
                </div>

                {/* <i className={`${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i> */}
                <div className='absolute bottom-[0] right-4'>
                  {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2627_9669)">
                          <path d="M3.47803 10H16.5215" stroke={`${hover && id == 'Packages' ? '#fff' : 'blue'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke={`${hover && id == 'Packages' ? '#fff' : 'blue'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_2627_9669">
                            <rect width="20" height="20" fill={`${hover && id == 'Packages' ? '#fff' : 'blue'}`} />
                          </clipPath>
                        </defs>
                      </svg> */}
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 translate-x-4 -translate-y-7 bg-[#F4F8FF] rounded-full ${hover && id == 'Packages' ? 'opacity-25' : 'dark:opacity-20'}`}></div>
            </div>
          </Link>
        </div>






        <div onClick={() => handleShortCut(items[7])} onMouseEnter={() => handleMouseEnter('Rent a Car')}
          onMouseLeave={() => handleMouseLeave('')}
          className={`hoverstyle overflow-hidden relative shadow-[0px_6px_17px_rgba(220,_164,_147,_0.15)] flex-1 rounded-[1.5vw] h-[180px] ${hover && id == 'Rent a Car' ? 'bg-gradient-to-b from-[#407BFE] to-[#3943B3] shadow-[0px_9px_19px_rgba(142,_177,_255,_0.52)] dark:shadow-none' : 'bg-[#fff] dark:border-[1px] border-[#fff] dark:bg-[#202232]'}`}>
          <Link to={`/${activeLang}/car-rental`}>
            <div className='h-[100%]'>
              {/* <div className='w-[40%] mt-[19px] mb-[15px] py-2 flex justify-center'>
                <svg className="mt-[15px]" width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.3034 13.0013L20.9283 16.7706C20.8577 16.8473 20.7722 16.9086 20.6771 16.9508C20.5819 16.9929 20.4792 17.015 20.3752 17.0156H14.0001V23.0464C14.0001 23.2463 13.9211 23.438 13.7804 23.5794C13.6398 23.7208 13.449 23.8002 13.2501 23.8002C13.0512 23.8002 12.8604 23.7208 12.7198 23.5794C12.5791 23.438 12.5001 23.2463 12.5001 23.0464V17.0156H5.00002C4.60219 17.0156 4.22065 16.8567 3.93934 16.574C3.65804 16.2912 3.5 15.9078 3.5 15.5079V9.47712C3.5 9.07725 3.65804 8.69377 3.93934 8.41102C4.22065 8.12827 4.60219 7.96943 5.00002 7.96943H12.5001V4.95404C12.5001 4.75411 12.5791 4.56237 12.7198 4.42099C12.8604 4.27962 13.0512 4.2002 13.2501 4.2002C13.449 4.2002 13.6398 4.27962 13.7804 4.42099C13.9211 4.56237 14.0001 4.75411 14.0001 4.95404V7.96943H20.3752C20.4792 7.97003 20.5819 7.99208 20.6771 8.03423C20.7722 8.07637 20.8577 8.1377 20.9283 8.21443L24.3034 11.9837C24.4299 12.1226 24.5 12.3042 24.5 12.4925C24.5 12.6809 24.4299 12.8624 24.3034 13.0013Z" fill={`${hover && id == 'Rent a Car' ? '#fff' : '#3946AF'}`}></path>
                </svg>
              </div> */}
              <div className='w-[40%] mt-[15px] mb-[15px] py-2 flex justify-center'>
                <svg className="mt-[18px]" width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.4231 12.0309H23.1253L19.817 6.06855C19.6743 5.81077 19.3146 5.59961 19.0185 5.59961H8.98154C8.68538 5.59961 8.32569 5.81077 8.183 6.06855L4.87415 12.0309H4.57692C3.98462 12.0309 3.5 12.5132 3.5 13.1027V18.4621C3.5 19.0516 3.98462 19.534 4.57692 19.534H5.65385V21.1418C5.65385 22.0261 6.38077 22.7496 7.26923 22.7496H7.80769C8.69615 22.7496 9.42308 22.0261 9.42308 21.1418V19.534H18.5769V21.1418C18.5769 22.0261 19.3038 22.7496 20.1923 22.7496H20.7308C21.6192 22.7496 22.3462 22.0261 22.3462 21.1418V19.534H23.4231C24.0154 19.534 24.5 19.0516 24.5 18.4621V13.1027C24.5 12.5132 24.0154 12.0309 23.4231 12.0309ZM6.46154 16.3184C5.71792 16.3184 5.11538 15.7186 5.11538 14.9785C5.11538 14.2384 5.71792 13.6387 6.46154 13.6387C7.20515 13.6387 7.80769 14.2384 7.80769 14.9785C7.80769 15.7186 7.20515 16.3184 6.46154 16.3184ZM7.53846 12.0309L9.72085 7.68709C9.85331 7.42287 10.2038 7.20742 10.5 7.20742H17.5C17.7962 7.20742 18.1467 7.42287 18.2792 7.68709L20.4615 12.0309H7.53846ZM21.5385 16.3184C20.7948 16.3184 20.1923 15.7186 20.1923 14.9785C20.1923 14.2384 20.7948 13.6387 21.5385 13.6387C22.2821 13.6387 22.8846 14.2384 22.8846 14.9785C22.8846 15.7186 22.2821 16.3184 21.5385 16.3184Z" fill={`${hover && id == 'Rent a Car' ? '#fff' : theme=='dark'?'#fff':'#3946AF'}`}></path>

                </svg>
              </div>
              <div className='w-[100%] relative px-5'>
                <span className={`${hover && id == 'Rent a Car' ? 'text-[#fff]' : 'text-[#3946AF]'} text-sm font-medium dark:text-[#fff]`}>{t('SEARCH_TABS.RENT_A_CAR')}</span>
              </div>
              <div className='w-[100%] h-[30%] flex relative mt-1 px-5'>
                <div className={`w-[100%]  text-[12px] font-light ${hover && id == 'Rent a Car' ? 'text-[#fff]' : 'text-[#000]'} line-clamp-2`}>
                  <span className="line-clamp-2 dark:text-[#fff]">
                    Lorem Ipsum is simply dummy text
                  </span>
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 translate-x-4 -translate-y-7 bg-[#F4F8FF] rounded-full ${hover && id == 'Rent a Car' ? 'opacity-25' : 'dark:opacity-20'}`}></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ShortCutRouting

