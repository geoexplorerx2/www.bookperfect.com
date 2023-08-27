import { t } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import __Section_2 from './__Section_2'
const __Section_1 = () => {
    // @ts-ignore
    const {t} = useTranslation()
    return (
        <div className='w-[100%] px-5 bigMd:px-[10vw]'>
            <div className='bg-[#3944B3] flex justify-between h-[59px] rounded-b-[10px] dark:bg-[#171925] dark:border-[1px] dark:border-[#fff]'>
                <div className='flex'>
                    <div className='h-full flex items-center ml-[0.8rem]'>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_7069_22388)">
                                <path d="M3.25 21.9375V5.6875C3.25 5.47201 3.3356 5.26535 3.48798 5.11298C3.64035 4.9606 3.84701 4.875 4.0625 4.875H21.9375C22.153 4.875 22.3597 4.9606 22.512 5.11298C22.6644 5.26535 22.75 5.47201 22.75 5.6875V21.9375L19.5 20.3125L16.25 21.9375L13 20.3125L9.75 21.9375L6.5 20.3125L3.25 21.9375Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.625 11.375H19.5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.625 14.625H19.5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.375 9.75H6.5V16.25H11.375V9.75Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_7069_22388">
                                    <rect width="26" height="26" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className='text-[20px] font-normal h-full flex items-center text-[#fff] mx-[0.5rem]'>
                        {t('TRAVEL_NEWS.TRAVEL_NEWS')}
                    </div>
                </div>
                <__Section_2 />
            </div>
        </div>
    )
}

export default __Section_1
