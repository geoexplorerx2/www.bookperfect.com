import React from 'react';
import __section_1_1_1 from './__section_1_1_1';

const __section_1_1 = ({ data } : any) => {
    return (
        <>
            <div className='w-[100%] bg-[#F4F8FF] rounded-[6px] mt-5 md:mb-0 grid grid-cols-3 items-center justify-between p-4 dark:bg-[transparent] dark:border-[1px] dark:border-[#fff] mb-1'>
                <div className='text-xs sm:text-base flex dark:text-[#fff]'>Services</div>
                <div className='text-xs sm:text-base flex justify-center dark:text-[#fff]'>Minimum Booking Amount</div>
                <div className='text-xs sm:text-base dark:text-[#fff]flex justify-center text-center dark:text-[#fff]'>Offer</div>
            </div>
            <__section_1_1_1  data = { data }/>
        </>
    )
}

export default __section_1_1
