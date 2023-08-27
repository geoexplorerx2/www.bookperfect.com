import React, { FC, useState } from 'react'
import logo from '../../images/logo.svg'
import logoDark from '../../images/darkpic.svg'
import { useSelector } from 'react-redux';
import { currentYear } from '../../common/formatDate';
import googlePlayIcon from '../../images/icons/googlePlayDownload.svg'
import appStoreIcon from '../../images/icons/appStoreDownload.svg'
interface footerfooterProps {

}
const Footerfooter: FC<footerfooterProps> = () => {
  let LightMode = useSelector((state: any) => state.LightMode);

    return (
        <>
            <div className="hidden dark:lg:bg-[#202133] h-full lg:flex px-[10.9vw] bottom-0 w-full items-center min-h-[80px] bg-[#fff]">
              <div className='w-full flex justify-between my-4'>
                <div className='flex items-end'>

                <div className='mr-4'> <img
                className="block w-[113px] h-[67px]"
                // find me :
                src={LightMode.mode == 'dark' ? "https://bookperfect.imgix.net/logo/logodarkmode.svg" : "https://bookperfect.imgix.net/logo/logo.svg"}
                alt="Our Logo"
              /></div>
                <div className='flex items-center justify-between h-full'>
                  <span className='text-[12px] dark:text-[#fff] text-[#0E123D] font-normal whitespace-nowrap mr-4'>Copyright © {currentYear()} bookperfect.com&nbsp;</span>
                  {/* <span className='text-[12px] dark:text-[#fff] text-[#0E123D] font-semibold whitespace-nowrap'>All rights reserved</span> */}
                </div>
                </div>
                <div className='flex space-x-4'>
                  <a href='https://play.google.com/store/apps/details?id=com.travelc.moguapp' target={'_blank'} className=''> 
                    <img src={googlePlayIcon} className="cursor-pointer"/>
                  </a>
                  <a href='https://apps.apple.com/ve/app/mo/id1632877166' target={'_blank'} className=''>
                    <img src={appStoreIcon} className="cursor-pointer"/>
                  </a>
                </div>
                {/* <div className='flex justify-end items-center'>
                   <div className="flex justify-between space-x-4">
                      <section><img src={instagram} /></section>
                      <section><img src={facebook} /></section>
                      <section><img src={twitter} /></section>
                      <section><img src={youtube} /></section>
                      <section><img src={whatsapp} /></section>
                      <section className='text-[#43AF77] text-[14px] font-medium flex items-center whitespace-nowrap'>+90 212 344 xx xx</section>
                   </div>
                </div> */}
                <div className='flex justify-end items-center'>
                   <div className="flex justify-between space-x-4">
                      <section className='flex justify-between items-center'>
                        <a href='https://hotelistan.com' target={"_blank"} className='flex justify-between items-center'>
                          <span className='mr-4 font-[cursive] font-semibold text-[#b4916e] text-xl'> By </span>
                          <img className='w-[150px]' src="https://hotelistan.com/assets/images/logo.svg" />
                        </a>
                      </section>
                    
                      {/* <section className='text-[#43AF77] text-[14px] font-medium flex items-center whitespace-nowrap'>+90 212 344 xx xx</section> */}
                   </div>
                </div>
              </div>
            </div>
            <div className="w-full flex lg:hidden px-8 lg:px-[10.9vw] mt-24 bigMd:mt-24 lg:pt-20 bottom-0 items-center min-h-[80px] bg-[#fff]">
              <div className='w-full relative flex items-center flex-col my-4 space-y-5'>
                <div className=' w-64 absolute -top-24 flex justify-center py-[18px] rounded-lg bg-white'>
                   <img src={'https://bookperfect.imgix.net/logo/logo.svg'} className="w-32"/>
                </div>
                {/* <div className='w-full flex justify-center items-center'>
                   <div className="w-full flex justify-between">
                    <div className='flex space-x-3'>

                      <section><img src={instagram} /></section>
                      <section><img src={facebook} /></section>
                      <section><img src={twitter} /></section>
                      <section><img src={youtube} /></section>
                      <section><img src={whatsapp} /></section>
                    </div>
                      <section className='text-[#43AF77] text-[14px] font-medium flex items-center'>+90 212 344 xx xx</section>
                   </div>
                </div> */}
                <div className='flex space-x-4'>
                  <a href='https://play.google.com/store/apps/details?id=com.travelc.moguapp' target={'_blank'} className=''> 
                    <img src={googlePlayIcon} className="cursor-pointer"/>
                  </a>
                  <a href='https://apps.apple.com/ve/app/mo/id1632877166' target={'_blank'} className=''>
                    <img src={appStoreIcon} className="cursor-pointer"/>
                  </a>
                </div>
                <div className='w-full flex flex-wrap justify-center'>
                  <span className='text-xs font-normal whitespace-nowrap '>
                  <span className='text-[#0E123D] dark:text-[#fff]'>Copyright © {currentYear()} bookperfect.com</span>&nbsp;</span>
                  <span className='text-xs text-[#0E123D] font-semibold whitespace-nowrap dark:text-[#fff]'>All rights reserved</span>
                  </div>
              </div>
            </div>
        </>
    )
}

export default Footerfooter
