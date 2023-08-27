import React from 'react'

const __section_1_1_1 = ( { data }: any) => {
    return (
        <>
           {
            data &&
            data?.map((item: any) =>  (
                <div className='w-[100%] md:border-b-[1px] border-[rgba(14,18,61,0.1)] h-[47px] md:mb-0 grid grid-cols-3 gap-1 md:gap-0 mb-1'>
                  <div className='flex px-6 text-[14px] font-medium bg-[#F7F8F9] items-center rounded-md md:rounded-none dark:bg-transparent dark:text-[#fff]'>
                    { item.field_service }
                    </div>
                  <div className='flex justify-center text-[#3F4249] bg-[#F7F8F9] items-center text-[14px] font-normal rounded-md md:rounded-none dark:bg-transparent dark:text-[#fff]'> 
                    { item.field_minimum_booking_amount } 
                  </div>
                <div className='text-[#0E123D] font-medium text-[14px] text-center flex items-center justify-center rounded-md md:rounded-none bg-[#F7F8F9] dark:bg-transparent dark:text-[#fff]'> 
                    { item.field_offer_detail }
                 </div>
            </div>
               
               
             ))
           } 
            {/* <div className='w-[100%] bg-[rgba(244,248,255,0.4)] border-b-[1px] border-[rgba(14,18,61,0.1)] h-[47px] mb-0 flex items-center'>
                <div className='w-[15%] flex px-6 text-[14px] font-medium'>Hotel</div>
                <div className='w-[60%] flex justify-center text-[#3F4249] text-[14px] font-normal'>Rs.2,500</div>
                <div className='w-[20%] text-[#0E123D] font-medium text-[14px]'>Up to 25% discount</div>
            </div>
            <div className='w-[100%] bg-[rgba(244,248,255,0.4)]  h-[47px] mb-0 flex items-center'>
                <div className='w-[15%] flex px-6 text-[14px] font-medium'>Bus</div>
                <div className='w-[60%] flex justify-center text-[#3F4249] text-[14px] font-normal'>No Minimum Booking Amount</div>
                <div className='w-[20%] text-[#0E123D] font-medium text-[14px]'>Flat 10% discount</div>
            </div> */}
        </>
    )
}

export default __section_1_1_1
