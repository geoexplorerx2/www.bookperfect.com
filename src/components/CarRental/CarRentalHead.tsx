import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CarRentalTabs from './CarRentalTabs';


const CarRentalHead = ({ withTabs, selectedTab, statictext }: any) => {
  const theme  = useSelector((state:any)=>state.LightMode.mode)


  return (
    <div className='w-full px-5 md:px-[10vw]'>
      <div className='w-full flex justify-between items-end '>
    
       <div className='text-[#15173F] text-base md:text-[24px] lg:text-[28px] font-normal dark:text-[#fff] flex flex-col'>
         <span>
          { (statictext && (statictext.car_Rental || statictext.car_rental )) ?? 'Car Rental'} 
          </span>
       <div className='text-[#15173F] text-xs lg:text-[16px] font-light mt-1 dark:text-[#fff]'>{statictext.car_rental_description ?? 'There are many variations of passages of Lorem Ipsum available, but the'}</div>
       </div>
          <MoreCarRentalButton wrapperClassNames='hidden md:inline-block'/>
      </div>

       { withTabs && <CarRentalTabs tabs = {  withTabs } onSelectedTab = { (tab: any) =>  selectedTab(tab)} /> }
    </div>
  )
}

interface MoreCarRentalType {
    wrapperClassNames?: string;
}


export const MoreCarRentalButton: FC<MoreCarRentalType> = (props) => {
    const {wrapperClassNames} = props
    const theme  = useSelector((state:any)=>state.LightMode.mode)
    // @ts-ignore
    const {t} = useTranslation()

    return (
        <div className={`${wrapperClassNames} text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium`}>
            <div className='flex items-center justify-between px-5 border-[1px] border-[#F75847] dark:border-[#fff] rounded-[16px] py-1'>
                <span className='text-[#F75847] dark:text-[#fff] mr-4'>{t('CAR_RENTAL.MORE_CAR_RENTAL')}</span>
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
        </div> 
    )
}



export default CarRentalHead;