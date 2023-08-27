import React, { FC, useState } from 'react'
import {useSelector} from 'react-redux'
import PopularTabs from '../Popular/PopularTabs';
import Tabs from '../Tabs/Tabs';
export const RentalTabs: string[] = ['Recommended', 'Paris', 'New York', 'Tokyo', 'London', 'Rome', 'Viena', 'Madrid', 'Barcelona'];

interface CarRentalTabsProps {
    onSelectedTab?: any;
    tabs?: any;
};

const CarRentalTabs: FC<CarRentalTabsProps> = ({onSelectedTab, tabs}) => {
  const [item,setItem]=useState<any>(0);
  const theme  = useSelector((state:any)=>state.LightMode.mode)
  const handleSelectTab = (tab: any, index: number) => {
    setItem(index);
    onSelectedTab(tab);
  };
//   console.log('tabs in the CarRentalTabs: ', tabs)
  return (
    <div>
        <div className=''><hr className='rounded-[16px] h-[1px] border-[rgba(102,102,102,0.2)] mt-4' /></div>
        {/* <div className='mt-3 md:mt-10 overflow-scroll xl:overflow-hidden hiddenScrollbar'> */}
          
            {/* {
                tabs?.map((tab: any, idx: number) => (
                    <li 
                      onClick={()=> handleSelectTab(tab, idx) } 
                      className={`whitespace-nowrap ${item == idx ? 'py-2 sm:py-3 px-3  sm:px-5 whitespace-nowrap cursor-pointer rounded-2xl text-[12px] 2xl:text-[14px] text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-[16px] cursor-pointer py-3 px-5  sm:px-5 text-[12px] 2xl:text-[14px] font-medium'}`}>
                        
                        { tab.name }
                    </li>
                ))
            } */}

            <Tabs tabs={tabs} onTabclick={handleSelectTab}/>

            {/* <li className={`${'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>
                <div className='flex items-center px-5 border-[1px] border-[#F75847] dark:border-[#fff] rounded-[16px] py-1'>
                    <span className='text-[#F75847] dark:text-[#fff] mr-4'>More Car Rental</span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_7142_8681)">
                                <path d="M9.37402 16H22.6245" stroke={theme=='dark'?'#fff':'#F75847'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.2695 10.2871L22.9838 16.0014L17.2695 21.7157" stroke={theme=='dark'?'#fff':'#F75847'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_7142_8681">
                                    <rect width="20.3175" height="20.3175" fill="white" transform="translate(5.84082 5.8418)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </span>
                </div>
            </li> */}

          {/* <PopularTabs tabs={tabs} moreButtonClassNames={'hidden'}/> */}
         
          
        {/* </div> */}
        
    </div>
  )
}

export default CarRentalTabs