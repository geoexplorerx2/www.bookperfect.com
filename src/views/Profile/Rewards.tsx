import React from 'react';
import { FC } from 'react';

interface RewardsType {
  balance?: number,
  bookingRefrence?: string,
  amount?: string,
  type?: string,
  status?: string,
  valueType?: string,
  valueDate?: string,
  expirationDate?: string,

}

export const sampleData: RewardsType[] = [
  {
    balance: 25,
    bookingRefrence: 'Refrence',
    amount: '45 unit',
    type: 'type',
    status: 'active',
    valueType: 'Value Type',
    valueDate: '20/11/2022',
    expirationDate: '30/11/2022',
  }
]


const Rewards: FC<RewardsType> = (props) => {
  const {balance = 25} = props
  return (
    <div className="box-border w-full h-[500px] p-4 bigMd:border-2 rounded-lg bigMd:bg-[#F4F8FF] dark:bg-transparent">
      <div className="text-base text-lg text-[#3944B3] font-poppins dark:text-[#fff]">Rewards</div>
      <span className='opacity-60 text-xs dark:text-[#fff]'>See Terms and conditions of rewards program</span>

      <div className='h-[60px] border-t border-b flex items-center my-10 py-6 dark:text-[#fff]'> Actual Balance: <span className='ml-2'>{balance}</span> </div>

      <span className='dark:text-[#fff]'>These are your Transactions</span>
    <div className='overflow-auto'>

      <table className='w-full my-6 border-2 border-separate border-spacing-0 overflow-hidden rounded-2xl'>
        <thead className='h-12 text-[#3944B3] text-md !font-light text-left
                         bg-[#E1E9F9] !rounded-2xl border-seperate dark:bg-[#171925] dark:text-[#fff]'>

          <tr className='border-separate'>
            <th className='font-medium p-2 rounded-bl-2xl dark:text-[#fff]'>Booking Refrennce</th>
            <th className='font-medium p-2 dark:text-[#fff]'>Amount</th>
            <th className='font-medium p-2 dark:text-[#fff]'>Type</th>
            <th className='font-medium p-2 dark:text-[#fff]'>Status</th>
            <th className='font-medium p-2 dark:text-[#fff]'>Value Date</th>
            <th className='font-medium p-2 rounded-br-2xl dark:text-[#fff]'>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {
            sampleData.map( data => (
              <tr>
                <td className='text-sm p-3 dark:text-[#fff]'>{data.bookingRefrence}</td>
                <td className='text-sm p-3 dark:text-[#fff]'>{data.amount}</td>
                <td className='text-sm p-3 dark:text-[#fff]'>{data.type}</td>
                <td className='text-sm p-3 dark:text-[#fff]'>{data.valueDate}</td>
                <td className='text-sm p-3 dark:text-[#fff]'>{data.valueType}</td>
                <td className='text-sm p-3 dark:text-[#fff]'>{data.expirationDate}</td>
              </tr>

            ))
          }

        </tbody>
  
     </table>
    </div>
    </div>
  )
}

export default Rewards;