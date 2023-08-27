
import React, { FC } from 'react'
import __Section_7 from './__Section_7'
interface TravelNewsCollectionProps {
  title?: any;
  data?: any;
  id?:any;
}
const TravelNewsCollection: FC<TravelNewsCollectionProps> = ({ title, data , id}) => {

  return (
    <>
      <div className='w-full px-5 md:px-[10.1vw]'>
        <div className='w-full'>
          <div className='text-[20px] text-[#3944B3] font-normal pt-[50px] pb-[20px] dark:text-[#fff]'>{title}</div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {
              data?.map((item: any, index: any) => {
                return <__Section_7 
                           id = {id}
                           news={item}
                            img={item.field_image.url} 
                            title={item.title} 
                            description={item.body}
                            monthName={new Date(item.created * 1000).toLocaleString('en-US', { month: 'short' })}
                            day={new Date(item.created * 1000).getDate()}  
                        />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TravelNewsCollection