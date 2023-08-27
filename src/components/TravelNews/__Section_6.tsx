import React  , {FC} from 'react'
interface __Section_6_Props {
  m?: any;
  d?: any;
}
const __Section_6:FC<__Section_6_Props> = ({m='',d=''}) => {
  return (
    <div className='relative w-full flex justify-center'>
      <div className='w-[42px] bg-[#FFEFED] rounded-t-[10px] rounded-b-[1px] flex flex-col'>
      <div className='bg-[#F75847] w-[100%] rounded-[4px] text-[12px] text-[#fff] font-medium flex items-center justify-center py-2'>{m}</div>
      <div className='bg-[transparent] w-[100%] rounded-b-[4px] text-[14px] text-[#0E123D] font-body flex items-center justify-center py-2'>{d}</div>
      </div>
    </div>
  )
}

export default __Section_6
