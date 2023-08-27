import React , {FC} from 'react'
import BASE_URL_HOME from '../../api/env';
import { goToPage } from '../../common/goToPage';
interface BookingBtnProps{
  booking?: any;
};

const BookingBtn :FC<BookingBtnProps> = ({ booking  }) => {

  const bookingDetailUrl = BASE_URL_HOME + '/secure/trip-detail.xhtml?id=' + booking.id; 
  
  const handleBookingDetails = () => {
    if(booking && booking.id){
      goToPage(bookingDetailUrl, 'redirect');
    }
  };

  return (
    <div className='relative w-full'>
      <div className='absolute right-0 top-0 w-[50%]'>
         <ul className='w-full flex justify-between'>
            <li className='flex-1 flex justify-center mx-3 items-center text-[14px] cursor-pointer py-2 rounded-md text-[#fff] bg-[#3944B3]'>Modify</li>
            <li className='flex-1 flex justify-center mx-3 items-center text-[14px] cursor-pointer py-2 rounded-md text-[#000] bg-[#D7DBDD]' onClick={() => handleBookingDetails()} >Details</li>
            <li className='flex-2 flex justify-center mx-3 items-center text-[14px] cursor-pointer py-2 rounded-md text-[#fff] bg-[#3944B3] px-5'>improve your booking</li>
         </ul>
      </div>
    </div>
  )
}

export default BookingBtn
