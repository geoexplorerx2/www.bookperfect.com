import React from 'react';
import { stripHtml } from '../../common/stripHtml';
import ULtoArray from '../../common/ULtoArray';

const __section_2_1 = ({ data } : any) => {
    
    const howdoyougetitdata = data && ULtoArray(data);
    return (
        <>
            {/* <div className='w-full text-[#3944B3] text-[18px] font-normal mt-[27px] mx-6'> { data.field_offer_how_do_you_get_it && stripHtml(data.field_offer_how_do_you_get_it) }</div> */}
            <div className='w-full text-[#3944B3] text-[18px] font-normal mt-[27px] mx-6 dark:text-[#fff]'> How do you get it ?</div>
            {
                howdoyougetitdata &&
                howdoyougetitdata.length >0 ?
                howdoyougetitdata?.map((item: any, idx: number) => (
                    <div className = {`mt-[17px] ${ howdoyougetitdata.length - 1 == idx && "mb-[30px]"} px-[30px] flex`}>
                        <div className='w-[3%] pt-[6px] flex items-center'>
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 1.375L6.375 7L0.75 12.625" stroke="#0E123D" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                       <div className='w-full text-[#3F4249] flex  text-[14px] font-light mt-[5px] dark:text-[#fff]'>{item.text}</div>
                    </div>  
                )):<div className='dark:text-[#fff] w-full flex justify-center py-2'>Data Not Found</div>
            }
        </>
    )
}

export default __section_2_1
