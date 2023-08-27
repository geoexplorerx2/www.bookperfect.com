import React, { useState } from 'react';
import HeroInputSearch from '../../components/HeroInputSearch/HeroInputSearch';
import CustomDivider from '../../lib/Divider/CustomDivider';
import NoResults from '../../components/NoResults/NoResults';
const MyHolidays = () => {
  const [holidays, setHolidays] = useState<[]>([])
  return (
    <div className="box-border w-full min-h-[500px] p-4 bigMd:border-2 rounded-lg bigMd:bg-[#F4F8FF]">
      <div className="text-base text-[#3944B3] font-poppins">My Holidays</div>
      <span className='text-xs opacity-60'>These are your holidays</span>

      <div className='w-full py-12'>
        <span className="text-[12px] font-poppins">Search holiday packages</span>
        <HeroInputSearch searchStyle = "w-full" lengthStyle = "w-full" />
      </div>
      <CustomDivider />
      {holidays && <NoResults /> }
    </div>
  )
}

export default MyHolidays