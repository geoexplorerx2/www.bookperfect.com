import React, { useState } from 'react';
import HeroInputSearch from '../../../components/HeroInputSearch/HeroInputSearch';
import CustomDivider from '../../../lib/Divider/CustomDivider';
import NotFound from '../../../components/NotFound/NotFound';

const MyHolidays = () => {
  const [holidays, setHolidays] = useState<[]>([])
  return (
    <div className="box-border w-full min-h-[500px] p-4 border-2 bigMd:rounded-lg bigMd:bg-[#F4F8FF] dark:bg-transparent">
      <div className="text-base text-[#3944B3] font-poppins dark:text-[#fff]">My Holidays</div>
      <span className='text-xs opacity-60 dark:text-[#fff]'>These are your holidays</span>

      <div className='w-full py-12'>
        <span className="text-[12px] font-poppins dark:text-[#fff]">Search holiday packages</span>
        <HeroInputSearch searchStyle = "w-full" lengthStyle = "w-full" />
      </div>
      <CustomDivider />
      {holidays && <NotFound/> }
    </div>
  )
}

export default MyHolidays