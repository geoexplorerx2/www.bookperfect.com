import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToTranslationFormat, TranslateIfExists } from '../../helpers';

interface PopularTabsProps {
    onSelectedTab?: any;
    tabs?: any;
    dividerClassNames?: string;
    moreButtonClassNames?: string;
};

const PopularTabs: FC<PopularTabsProps> = ({onSelectedTab, tabs, dividerClassNames, moreButtonClassNames= ''}) => {

  const [item,setItem]=useState<any>(0);
  const LightMode = useSelector((state:any)=>state.LightMode.mode);

  const history = useHistory();
  // @ts-ignore
  const {t, i18n} = useTranslation()
  const handleSelectTab = (tab: any, index: number) => {
    setItem(index);
    onSelectedTab(tab);
  };

  const handleAllDestinations = () => {
    history.push('/travelguide');
  };

  return (
    <div>
        <div className='flex justify-between'>
          <ul className='w-full flex items-center justify-between m-0 box-border overflow-scroll hiddenScrollbar'>
            {   tabs &&
                tabs?.map((tab: any, idx: number) => (
                    <li 
                      onClick={()=> handleSelectTab(tab, idx) } 
                      className={`whitespace-nowrap mr- ${item == idx ?'px-[32px] whitespace-nowrap cursor-pointer text-base rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]':'text-[rgba(102,102,102,1)] dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-[16px] cursor-pointer text-base py-[10px] px-[15px] font-medium'}`}>
                       <button
                        className={`block !leading-none font-medium whitespace-nowrap lg:text-[15px] h-[34px] sm:h-[unset] sm:mt-0 text-xs sm:text-[12px] sm:px-[60px] sm:py-[16px] capitalize rounded-[16px] focus:outline-none`}>
                        {/* { typeof children == 'string' ? t(`TRIP_IDEAS.${ToTranslationFormat(children)}`) : t(children)} */}
                        {/* {i18n.exists(`TRIP_IDEAS.${ToTranslationFormat(children as string)}`) ?  t(`TRIP_IDEAS.${ToTranslationFormat(children as string)}`) : children} */}
                        {/* { t(ToTranslationFormat(`POPULAR_DESTINATIONS.${tab.name}`)) } */}
                        {
                        i18n.exists(ToTranslationFormat(`POPULAR_DESTINATIONS.${tab.name}`))
                        ? ToTranslationFormat(`POPULAR_DESTINATIONS.${tab.name}`)
                        : tab.name 
                      }
                      </button>
                                      
                    </li>
                ))
            }
            </ul>
            <ul>

            <li className={`${moreButtonClassNames} w-full md:w-auto absolute sm:hidden bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0  text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium `} onClick = {() => handleAllDestinations()}>
                <div className='flex justify-between md:justify-start items-center px-5 border-[1px] border-[#F75847] dark:bg-[#171925] dark:border-[#fff] rounded-[16px] py-1'>
                    <span className='text-[#F75847] mr-4 dark:text-[#f4f8ff] '>All Destinations</span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_7142_8681)">
                                <path d="M9.37402 16H22.6245" stroke={LightMode=='dark'?'#fff':'#F75847'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.2695 10.2871L22.9838 16.0014L17.2695 21.7157" stroke={LightMode=='dark'?'#fff':'#F75847'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_7142_8681">
                                    <rect width="20.3175" height="20.3175" fill="white" transform="translate(5.84082 5.8418)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </span>
                </div>
            </li>

          </ul>
          
        </div>
        
    </div>
  )
}

export default PopularTabs;