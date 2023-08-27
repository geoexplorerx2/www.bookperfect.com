import React , {FC} from 'react'
import { BASE_URL } from '../../api/env';
interface __Section_4_Props{
  data?:any;
}
const __Section_4:FC<__Section_4_Props> = ({data}) => {
  return (
    <div className='w-[100%] flex items-center dark:border-[1px] border-2 border-[#EBECF7]  rounded-[10px]'>
      <img className='p-2' src={BASE_URL + data} />
    </div>
  )
}

export default __Section_4
