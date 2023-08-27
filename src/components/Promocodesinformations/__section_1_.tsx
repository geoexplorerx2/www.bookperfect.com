import React from 'react';
import { stripHtml } from '../../common/stripHtml';
import ULtoArray from '../../common/ULtoArray';
import __section_1_1 from './__section_1_1';

const __section_1_ = ( { data }: any ) => {

  const whatyougetdata = data && data.field_offer_what_you_get && ULtoArray(data.field_offer_what_you_get);
  return (
    <div className='w-full bigMd:px-4'>
      <div className='text-[#3944B3] text-[18px] font-normal mt-[27px] dark:text-[#fff]'>What You Get&nbsp;?</div>
      {
        whatyougetdata &&
        whatyougetdata?.map(((item: any, idx: number) => (
          <div className='flex'>
            <div className='w-[3%] pt-[6px] flex items-center'>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 1.375L6.375 7L0.75 12.625" stroke="#0E123D" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div className='w-fulltext-[#3F4249] flex  text-[14px] font-light mt-[5px] dark:text-[#fff]'>{item.text}</div>
          </div>
        )))
      }
      <__section_1_1 data = { data && data.field_offer_benefits } />
    </div>
  )
}

export default __section_1_
