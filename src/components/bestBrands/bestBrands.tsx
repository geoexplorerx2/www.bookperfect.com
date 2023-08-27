import React, { useState } from 'react'
import bestBrandbanner from '../../images/bestBrandbanner.svg';
import image1 from '../../images/image1.svg';
import image2 from '../../images/image2.svg';
import image3 from '../../images/image3.svg';
import image4 from '../../images/image4.svg';
import image6 from '../../images/image6.svg';
import image7 from '../../images/image7.svg';
import image8 from '../../images/image8.svg';
import image9 from '../../images/image9.svg';
import image10 from '../../images/image10.svg';
import image11 from '../../images/image11.svg';
import image12 from '../../images/image12.svg';
import image13 from '../../images/image13.svg';
import image14 from '../../images/image14.svg';
import image16 from '../../images/image16.svg';
import dollar from '../../images/dollar.svg';
import { useTranslation } from 'react-i18next';

const BestBrands = ({statictext}: any) => {
  // @ts-ignore
  const {t} = useTranslation()
  return (
    <>
      <div className='w-[100%] min-h-[800px] px-[10.1vw] mb-14 lg:mb-0'>
        <div className='w-[100%] text-center text-[#0E123D] text-base md:text-lg lg:text-2xl xl:text-[32px] font-normal pt-[48px] dark:text-[#fff]'>{(statictext && statictext.best_brands_best_prices) ?? t("BEST_BRANDS_BEST_PRICES_!") }</div>
        <div className='text-xs md:text-sm lg:text-base pt-[8px] font-light text-center dark:text-[#fff]'>{(statictext && statictext.best_brands_best_prices_description) ?? "All the Lorem Ipsum generators on the Internet tend to repeat"}</div>
        <div className='flex flex-col lg:flex-row justify-between mt-[50px]'>
          <div className='lg:h-[450px] flex justify-center lg:justify-start'><img className='lg:w-[100%] lg:h-[100%]' src={bestBrandbanner} /></div>
          <div className='w-full bigMd:w-[52%] pl-[0.6vw] py-[1.4vh] mx-auto lg:mx-0'>
            <div className='relative h-[30%]'>
              <ul className='w-[100%] right-0 bottom-0 flex'>
                <li className='flex-1 hidden xl:flex h-[130px] justify-center items-center border-[1px]  border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image6} /></li>
                <li className='flex-1 hidden xl:flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={dollar} /></li>
                <li className='flex-1 hidden xl:flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image4} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image3} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image2} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image1} /></li>
              </ul>
            </div>
            <div className='relative h-[30%]'>
              <ul className='w-[100%] right-0 flex'>
                <li className='flex-1 hidden xl:flex h-[130px] justify-center items-center'></li>
                <li className='flex-1 hidden xl:flex  h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image11} /></li>
                <li className='flex-1 hidden xl:flex  h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image10} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image9} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image8} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image7} /></li>
              </ul>
            </div>
            <div className='relative h-[30%]'>
              <ul className='w-[100%] top-[.1vh] right-0 flex'>
                <li className='flex-1 hidden xl:flex  h-[130px] justify-center items-center'></li>
                <li className='flex-1 hidden xl:flex  h-[130px] justify-center items-center'></li>
                <li className='flex-1 hidden xl:flex  h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image16} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image14} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image13} /></li>
                <li className='flex-1 flex h-[130px] justify-center items-center border-[1px] border-[rgba(56, 66, 178, 0.1)] rounded-[16px] hover:cursor-pointer hover:bg-[#fff] hover:shadow-[0_0px_40px_-23px_rgba(0,0,255,0.9)]'><img src={image12} /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BestBrands