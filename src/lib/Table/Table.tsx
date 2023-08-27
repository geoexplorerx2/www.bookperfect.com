import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { sampleData } from '../../views/Profile/Rewards';
import BookingBtn from '../../components/BookingBtn/BookingBtn';
interface TableProps {
  data?: any;
  tableHead?: any;
  userprofile?: any;
};

const Table: FC<TableProps> = ({ tableHead, data = sampleData, userprofile }) => {
  const user = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userdata);
  return (
    <div className="">
      <div className=" overflow-hidden">
        <span className="text-sm font-normal leading-tight dark:text-[#fff]">These are your bookings</span>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto whitespace-nowrap">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className='w-full border-2 border-separate border-spacing-0 overflow-hidden rounded-2xl'>
              <thead className='h-12 text-[#3944B3] dark:text-[#fff] text-md !font-light text-left
                                    bg-[#E1E9F9] dark:bg-[#171925] !rounded-2xl border-seperate'>

                <tr className='border-separate'>
                  {
                    tableHead?.map((head: any) => (
                      <th className='font-medium p-2'>{head}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((booking: any) => (
                    booking.user &&
                    booking.user.username == userprofile?.name &&
                    <>
                      <tr>
                        <td className='text-sm p-3 dark:text-[#fff]'>{booking.bookingReference} {" "} {booking.status} </td>
                        <td className='text-sm p-3 flex flex-col dark:text-[#fff]'>
                          <span>Created: {new Date(booking.startDate).toLocaleDateString()} </span>
                          <span>Departure: {new Date(booking.endDate).toLocaleDateString()} </span>
                        </td>
                        <td className='text-sm p-3 dark:text-[#fff]'>{booking.user && booking.user.username}</td>
                        <td className='text-sm p-3 dark:text-[#fff]'>{data.valueDate}</td>
                        <td className='text-sm p-3 dark:text-[#fff]'>{booking.pricebreakdown && booking.pricebreakdown.totalPrice.operator.amount.toFixed(2)} {" "} {booking.pricebreakdown && booking.pricebreakdown.totalPrice.operator.currency} </td>
                      </tr>
                      <tr>
                        <td className='pb-[50px]' colSpan={5} >
                          <BookingBtn booking = { booking } />
                        </td>
                      </tr>
                    </>
                  ))
                }
                {/*  */}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>

  )
};

export default Table;