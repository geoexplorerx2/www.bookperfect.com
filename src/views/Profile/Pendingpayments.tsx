import React from 'react'
import ButtonPrimary from '../../lib/Button/ButtonPrimary';
import CustomDivider from '../../lib/Divider/CustomDivider';
import CInput from '../../lib/Input/CInput';
import Table from '../../lib/Table/Table';

const Pendingpayments = () => {
  return (
    <div className="box-border w-full bigMd:h-[500px] p-4 bigMd:border-2 rounded-lg bigMd:bg-[#F4F8FF] dark:bg-transparent">
        <div className="text-lg text-[#3944B3] font-poppins dark:text-[#fff]">Pending Payments</div>

        
        <div className='flex flex-col bigMd:flex-row bigMd:space-x-2 space-y-6 bigMd:space-y-0 py-12 '>
          <div className ='flex-1'>
            <CInput
              sizeClass = "h-13 py-3" 
              placeholder='Surname'
            />
          </div>
          <div className ='flex-1'>
            <CInput 
              sizeClass = "h-13 py-3" 
              placeholder='From'
            />
          </div>
          <div className ='flex-1'>
            <CInput 
              sizeClass = "h-13 py-3" 
              placeholder='To'
            />
          </div>
        </div>

        {/* search bookings */}
        <div className = "flex justify-between bigMd:justify-start bigMd:space-x-4 ">
          <ButtonPrimary className='bg-[#3944B3] w-[150px]'>
              SEARCH
          </ButtonPrimary>
          <ButtonPrimary className='bg-[#3944B3] w-[150px]'>
              CLEAR
          </ButtonPrimary>
        </div>

        {/* TODO: use deivide-y-4 divider */}
        <CustomDivider />

        <Table />

    </div>
  )
};

export default Pendingpayments;