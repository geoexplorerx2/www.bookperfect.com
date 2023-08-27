import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToTranslationFormat } from '../../helpers';
import { activeOffersSearchTab, exclusiveOffers, resetOffersDetail } from '../../store/actions';
import Tabs from '../Tabs/Tabs';

export const OffersHeading: string[] = ['Best Offers', 'Flights & More', 'Hotel', 'Holiday', 'Flights + Hotels', 'Activities', 'Packages', 'Transfers', 'Rent a Car'];

interface ExclusiveOffersHeadProps {
  onSelectedTab?: any;
  statictext?: any;
  displayType?: any;
  pathname?: any;
};

const ExclusiveOffersHead: FC<ExclusiveOffersHeadProps> = ({ onSelectedTab, statictext, displayType, pathname }) => {
  const [activeTab, setActiveTab] = useState<any>();
  const [offersHeadParsed, setOffersHeadParsed] = useState(OffersHeading.map((heading, index ) => ({name: heading, id: index})))
  const theme = useSelector((state: any) => state.LightMode.mode);
  // @ts-ignore
  const { t } = useTranslation()
  const history = useHistory();
  const dispatch = useDispatch();
  
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);


  const handleSelectTab = (tab: any, index: number) => {
    setActiveTab(index);
    onSelectedTab(tab?.name);
  };

  const handleAllOffers = () => {

    dispatch(
      resetOffersDetail()
    );


    dispatch(
      activeOffersSearchTab(
        OffersHeading[activeTab]
      )
    );
    // dispatch(
    //   exclusiveOffers()
    // );

    history.push(`/${activeLang}/offers`);
  };

  const activetab = () => {
    switch (pathname) {
      case '':
        setActiveTab(0)
        onSelectedTab(
          OffersHeading[0]
        )
        break;
      case 'offers':
        setActiveTab(0)
        onSelectedTab(
          OffersHeading[0]
        )
        break;
      case 'flights':
        setActiveTab(1)
        onSelectedTab(
          OffersHeading[1]
        )
        break;
      case 'hotels':
        setActiveTab(2)
        onSelectedTab(
          OffersHeading[2]
        )
        break;
      case 'flights-hotels':
        setActiveTab(4);
        onSelectedTab(
          OffersHeading[4]
        );
        break;
      case 'activities':
        setActiveTab(5);
        onSelectedTab(
          OffersHeading[5]
        );
        break;
      case 'transfers':
        setActiveTab(7);
        onSelectedTab(
          OffersHeading[7]
        );
        break;
      case 'packages':
        setActiveTab(6);
        onSelectedTab(
          OffersHeading[6]
        );
        break;
      case 'car-rental':
        setActiveTab(8);
        onSelectedTab(
          OffersHeading[8]
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    activetab();
  }, [pathname]);
  const ref = useRef<any>()
  useEffect(() => {
    if (pathname == 'activities') { ref?.current.scrollTo(300, 0); }
    if (pathname == 'flights-hotels') { ref?.current.scrollTo(200, 0); }
    if (pathname == 'transfers') { ref?.current.scrollTo(600, 0); }
    if (pathname == 'packages') { ref?.current.scrollTo(500, 0); }
    if (pathname == 'car-rental') { ref?.current.scrollTo(600, 0); }
    console.log('pathname is :', pathname)
  }, [])
  return (
    <div>
      {
        displayType != 'all' &&
        <>
          <div className='flex justify-between items-end'><div className='w-full'>
            <div className='text-base md:text-xl lg:text-[32px] text-[#0E123D] font-poppins font-normal md:mt-[48px] lg:px-11 xl:px-[5px] dark:text-white'>{
              (statictext && statictext.exclusive_offers) ?? t("Exclusive Offers")}
            </div>
            <div className='text-xs md:text-lg lg:text-[18px] text-[#0E123D] font-poppins font-light mt-[5px] lg:px-11 xl:px-[5px] dark:text-white max-w-[80%]'>{(statictext && statictext.exclusive_description) ?? "Contrary to popular belief lorem Ipsum is not simply random text."}</div></div>

            <div className='w-[15%] max-h-[100px] hidden md:flex cursor-pointer justify-center items-center border-[1px] border-[#F75847] dark:border-[#fff] rounded-2xl py-[12px]' onClick={() => handleAllOffers()}>
              <div className='w-[90%] flex justify-around items-center'>
                <span className='text-[#F75847] dark:text-[#fff] text-[12px] 2xl:text-[16px] font-normal flex items-center'>{t('EXCLUSIVE_OFFERS_TABS.VIEW_ALL_OFFERS')}</span>
                <span className=''>
                  <svg className='' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_8847_2527)">
                      <path d="M4.375 11H17.6255" stroke={theme == 'dark' ? '#fff' : '#F75847'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12.2695 5.28516L17.9838 10.9994L12.2695 16.7137" stroke={theme == 'dark' ? '#fff' : '#F75847'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_8847_2527">
                        <rect width="20.3175" height="20.3175" fill="white" transform="translate(0.841797 0.84082)" />
                      </clipPath>
                    </defs>
                  </svg>

                </span>
              </div>
            </div>

          </div>
          <div className='xl:px-[5px]'><hr className='rounded-[16px] h-[1px] border-[rgba(102,102,102,0.2)] mt-4' /></div>
        </>
      }
      <div className='mt-3 md:mt-[22px]  lg:mx-11 xl:mx-[5px] overflow-x-scroll hiddenScrollbar md:flex' ref={ref}>
        <div className='w-full p-0'>
          {/* <ul className='flex justify-between items-center m-0 box-border px-1'> */}
            {/* {
              OffersHeading?.map((offer: any, idx: number) => (
                <li onClick={() => handleSelectTab(offer, idx)} className={`whitespace-nowrap ${activeTab == idx ? 'py-2 sm:py-3 px-3  sm:px-5 whitespace-nowrap cursor-pointer rounded-2xl text-[12px] 2xl:text-[14px] text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-[16px] cursor-pointer py-3 px-5  sm:px-5 text-[12px] 2xl:text-[14px] font-medium'}`}>{displayType == 'all' && idx == 0 ? 'New Offer' : t(`EXCLUSIVE_OFFERS_TABS.${ToTranslationFormat(offer)}`)}</li>
              ))
            } */}
            <Tabs tabs={offersHeadParsed} onTabclick={handleSelectTab} />
          {/* </ul> */}
        </div>
        {/* <div className='w-[15%] cursor-pointer flex justify-center items-center border-[1px] border-[#F75847] dark:border-[#fff] rounded-2xl py-[12px]'>
          <div className='w-[90%] flex justify-around'>
            <span className='text-[#F75847] dark:text-[#fff] text-[12px] 2xl:text-[14px] font-normal flex items-center'>View All Offers</span>
            <span className=''>
              <svg className='' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_8847_2527)">
                  <path d="M4.375 11H17.6255" stroke={theme=='dark'?'#fff':'#F75847'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.2695 5.28516L17.9838 10.9994L12.2695 16.7137" stroke={theme=='dark'?'#fff':'#F75847'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_8847_2527">
                    <rect width="20.3175" height="20.3175" fill="white" transform="translate(0.841797 0.84082)" />
                  </clipPath>
                </defs>
              </svg>

            </span>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ExclusiveOffersHead