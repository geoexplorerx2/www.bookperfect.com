import { Divider } from '@mantine/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ButtonPrimary from '../../lib/Button/ButtonPrimary';
import CustomDivider from '../../lib/Divider/CustomDivider';
import CInput from '../../lib/Input/CInput';
import Table from '../../lib/Table/Table';
import { getBookingsData } from '../../store/actions';


const BOOKING_TABLE_HEAD = ['Booking reference', 'Dates', 'Name', 'Trip', 'Total price'];

const Bookings = ({userprofile}: any) => {
  const bookingsdata: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.bookings);
  const user = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userdata);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  const dispatch = useDispatch();

  let start: string = '20220810';
  let end: string = '20221231';

  useEffect(() => {
    dispatch(
      getBookingsData(
        start, 
        end,
        activeLang.toLowerCase()
      )
    )
  }, []);


  // const CURRENT_USER_BOOKINGS = bookingsdata && bookingsdata.bookedTrip.filter((trip: any) => trip.user.username == userprofile?.name);pmlm

  return (
    <div className="box-border w-full bigMd:h-auto p-4 bigMd:border-2 rounded-lg bigMd:bg-[#F4F8FF] dark:bg-transparent">
        <div className="text-lg text-[#3944B3] font-poppins hidden bigMd:inline-block dark:text-[#fff]">Bookings</div>

        <div className='flex flex-col bigMd:flex-row bigMd:space-x-2 space-y-6 bigMd:space-y-0 py-6'>
          <span className='bigMd:hidden text-sm text-[#0E123D] dark:text-[#fff]'>
            Booking refrence
          </span>
          <div className ='flex-1'>
            <CInput 
              sizeClass = "h-13 py-3" 
              placeholder='Booking reference'
            />
          </div>
          <span className='bigMd:hidden text-sm text-[#0E123D]'>
            Name
          </span>
          <div className ='flex-1'>
            <CInput 
              sizeClass = "h-13 py-3" 
              placeholder='Name'
            />
          </div>
        </div>

        {/* search bookings */}
        <ButtonPrimary className='bg-[#3944B3] bigMd:w-[150px] w-full'>
            SEARCH
        </ButtonPrimary>


        {/* TODO: use deivide-y-4 divider */}
        <CustomDivider />

        <Table 
          tableHead = { BOOKING_TABLE_HEAD } 
          data = { bookingsdata?.bookedTrip } 
          userprofile =  { userprofile } 
        />
    </div>
  )
}

export default Bookings;