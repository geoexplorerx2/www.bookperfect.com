import React, { FC } from 'react';
import ButtonPrimary from '../../lib/Button/ButtonPrimary';
import CustomDivider from '../../lib/Divider/CustomDivider';

interface ProfileProps{

};

const Profile: FC<ProfileProps> = () => {
  return (
    <div className="box-border w-full bigMd:h-[500px] p-4 bigMd:border-2 rounded-lg bigMd:bg-[#F4F8FF] dark:bg-transparent">
        <div className="text-base text-lg text-[#3944B3] font-poppins dark:text-[#fff]">My Profile</div>

        {/* <div className='px-5 py-5 pb-5 mt-8 divide-y-4 divide-neutral-100 dark:divide-neutral-800'> */}

        <div className="flex mt-16 flex-grow justify-between">
          <div className="text-base text-[#0E123D] font-poppins text-md dark:text-[#fff]">My Bookings</div>
          <div className="">
            <ButtonPrimary className='bg-[#3944B3] w-[150px]'> See All</ButtonPrimary>
          </div>
        </div>

        {/* TODO: use deivide-y-4 divider */}
        <div className="relative flex py-10 items-center">
          <div className="flex-grow border-[0.5px] border-gray-400 divide-y-1 divide-neutral-100 "></div>
          <div className="flex-grow border-[0.5px]  border-gray-400 divide-y-1 divide-neutral-100 "></div>
        </div>

        <div className="flex mt-8 flex-grow justify-between">
          <div className="flex flex-col text-base text-[#0E123D] font-poppins text-md dark:text-[#fff]">
            My Stored Ideas
            <span className = "text-xs text-light font-poppins dark:text-[#fff]">These are your stoed ideas</span>
          </div>
          <div className="">
            <ButtonPrimary className='bg-[#3944B3] w-[150px]'> See All</ButtonPrimary>
          </div>
        </div>

        {/* TODO: use deivide-y-4 divider */}
        <CustomDivider />
        
        {/* </div> */}

    </div>
  )
}

export default Profile;