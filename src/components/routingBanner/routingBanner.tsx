import React, { useState } from 'react'
import img1 from '../../images/routingBanner.svg';
import { useSelector } from 'react-redux';
import { ReactComponent as BundleIcon } from '../../images/icons/bundleIcon.svg'
import { ReactComponent as BedIcon } from '../../images/icons/bedIcon.svg'
import { ReactComponent as AirplaneIcon } from '../../images/icons/bundleAirPlaneIcon.svg';
import { ReactComponent as CarWithKeysIcon } from '../../images/icons/carWithKeysicon.svg'
import { ReactComponent as BundlePLusIcon } from '../../images/icons/bundlePlusIcon.svg'
import {ReactComponent as BundleEqualIcon} from '../../images/icons/bundleEqualIcon.svg'
import { useTranslation } from 'react-i18next';




const svg = (color: any) => {
    return (
        <>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6597_22421)">
                    <path d="M3.47852 10H16.522" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_6597_22421">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}
const Membership = ({statictext}: any) => {
    let LightMode = useSelector((state: any) => state.LightMode);
    // @ts-ignore
    const {t} = useTranslation()
    return (
        <div className='w-[100%] bg-[#FFF9F9] dark:bg-[#171925] pb-16'>
            <div className='tex-base md:text-lg lg:text-xl xl:text-[28px] text-[#0E123D] pt-[42px] font-normal w-[100%] flex justify-center dark:text-[#fff]'>{statictext && statictext.bundle_and_save}</div>
            <div className='w-[100%] flex justify-center'>
                <div className='w-[60%] flex text-center pt-[21px] text-xs text-[14px] font-light dark:text-[#fff] line-clamp-3 md:line-clamp-none'>
                    {statictext && statictext.bundle_and_save_description}
                </div>
            </div>
            <div className='w-[100%] mt-[60px] flex justify-center'>
                <div className='grid grid-cols-7'>
                    <div>

                    <div className='relative w-[5vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px]'>
                        <div className='absolute flex justify-center items-center z-10 w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px] bg-[#FCE1DB] dark:bg-[#202232] rounded-xl xl:rounded-[30px] rotate-45 border-2 border-[#fff]'>
                            <div className='-rotate-[45deg]'>
                               <CarWithKeysIcon className='w-4 h-4 lg:w-9 lg:h-9  xl:w-12 xl:h-12 ' />
                            </div>
                        </div>
                        <div className='absolute z-1 w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px] bg-[#FFEAE0] opacity-[0.5] dark:opacity-[10%]  rounded-xl xl:rounded-[30px] rotate-[75deg] border-2 border-[transparent]'></div>
                    </div>
                        <div className='flex-1 flex justify-center dark:text-[#fff] text-[10px] md:text-sm xl:text-base font-medium translate-y-5'>{t("BUNDLE_AND_SAVE.CAR")}</div>
                    </div>

                    <div className='flex justify-center items-center'>
                    <BundlePLusIcon className='min-w-3 min-h-3 w-[6vw] h-[6vw] max-w-8 max-h-8 ' />

                    </div>
                <div>
                    
                    <div className='relative w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px]'>
                        <div className='absolute z-10 w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px] bg-[#E2F4FE] rounded-xl xl:rounded-[30px] dark:bg-[#202232] rotate-45 border-2 border-[#fff]'>
                            <div className='-rotate-[45deg] flex justify-center items-center h-full'>
                              <AirplaneIcon className='w-4 h-4 lg:w-9 lg:h-9  xl:w-12 xl:h-12 ' />
                            </div>
                        </div>
                        <div className='absolute z-1 w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px] bg-[#E2F4FE] opacity-[0.5] dark:opacity-[10%] rounded-xl xl:rounded-[30px] rotate-[75deg] border-2 border-[transparent]'></div>
                    </div>
                    <div className='flex-1 flex justify-center dark:text-[#fff] text-[10px] md:text-sm xl:text-base font-medium translate-y-5'>{t("BUNDLE_AND_SAVE.FLIGHT")}</div>

                </div>

                    <div className='flex justify-center items-center'>
                       <BundlePLusIcon className='min-w-3 min-h-3 w-[6vw] h-[6vw] max-w-8 max-h-8 ' />
                    </div>

             <div>

                    <div className='relative w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px]'>
                        <div className='absolute z-10 w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px] bg-[#F7ECFF] rounded-xl xl:rounded-[30px] dark:bg-[#202232] rotate-45 border-2 border-[#fff]'>
                            <div className='-rotate-[45deg] flex justify-center items-center h-full'>
                                <BedIcon className='w-4 h-4 lg:w-9 lg:h-9  xl:w-12 xl:h-12 ' />

                            </div>
                        </div>
                        <div className='absolute z-1 w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px] bg-[#F6ECFF] opacity-[0.5] dark:opacity-[10%] rounded-xl xl:rounded-[30px] rotate-[75deg] border-2 border-[transparent]'>

                        </div>
                    </div>
                    <div className='flex-1 flex justify-center dark:text-[#fff] text-[10px] md:text-sm xl:text-base font-medium translate-y-5'>{t("BUNDLE_AND_SAVE.HOTEL")}</div>

            </div>



                    <div className='flex justify-center items-center'>
                    <BundleEqualIcon className='min-w-3 min-h-3 w-[6vw] h-[6vw] max-w-8 max-h-8  ' />
                    </div>


                <div >

                    <div className='relative w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px]'>
                        <div className='absolute z-10 w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px] bg-[#28C46F] rounded-xl xl:rounded-[30px] dark:bg-[#202232] rotate-45 border-2 border-[#fff]'>
                            <div className='-rotate-[45deg] flex justify-center items-center h-full'>
                               <BundleIcon className='w-4 h-4 lg:w-9 lg:h-9  xl:w-12 xl:h-12' />
                            </div>
                        </div>
                        <div className='absolute z-1 w-[6vw] h-[6vw] min-w-[45px] min-h-[45px] max-w-[105px] max-h-[105px] bg-[#28C46F] opacity-[0.1] dark:bg-[#fff] dark:opcity-[10%] rounded-xl xl:rounded-[30px] rotate-[75deg] border-2 border-[transparent]'>

                        </div>
                    </div>
                    <div className='flex-1 flex justify-center dark:text-[#fff] text-[10px] md:text-sm xl:text-base font-medium translate-y-5'>{t("BUNDLE_AND_SAVE.BUNDLE")}</div>

                </div>
                </div>
            </div>
            {/* <div className='w-[100%] flex justify-center'>
               <div className='w-[40%] flex justify-between mt-[20px]'>
                  <div className='flex-1 flex justify-center dark:text-[#fff] text-[16px] font-medium'>Car</div>
                  <div className='flex-1 flex justify-center'></div>
                  <div className='flex-1 flex justify-center dark:text-[#fff] text-[16px] font-medium'>Flight</div>
                  <div className='flex-1 flex justify-center'></div>
                  <div className='flex-1 flex justify-center dark:text-[#fff] text-[16px] font-medium'>Hotel</div>
                  <div className='flex-1 flex justify-center'></div>
                  <div className='flex-1 flex justify-center text-[16px] font-medium text-[#28C46F]'>Bundle</div>
               </div>
            </div> */}
        </div>
    )
}

export default Membership