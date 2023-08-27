import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { travelnews, travelnewsdetails } from '../../store/actions';
import __Section_4 from './__Section_4';
import __Section_5 from './__Section_5';
import __Section_6 from './__Section_6';

const __Section_3 = ({ data }: any) => {

  const dispatch = useDispatch();

  const history = useHistory();

  const handleTravelNew = (news: any) => {
    dispatch(
      travelnewsdetails(
        news.nid
      )
    );

    dispatch(
      travelnews()
    );
    
    history.push('/travelnews');
  };


  return (
    <div className='px-5 bigMd:px-[10.1vw] mt-[38px] pb-[38px] dark:pb-[60px] cursor-pointer'>
      <div className='w-[100%] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {data && data?.map((item:any,index:any)=>(
            <div className='hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] dark:bg-[#202232] flex-1 min-w-[345px] flex rounded-[10px] py-4 shadow-[0_13px_30px_-7px_rgba(0,10,255,0.09)] cursor-pointer'  onClick={() => handleTravelNew(item)}>
               <div className='w-[20%] flex items-center ml-[0.9rem]'>
                <__Section_4 data={item.field_image.url} />
              </div>
               <div className='w-[65%] flex items-center'>
                <__Section_5 
                    news = { item }
                    title={item.title} 
                    description={item.body} 
                />
              </div>
               <div className='w-[15%] flex items-center'>
                <__Section_6 
                    m={new Date(item.created * 1000).toLocaleString('en-US', { month: 'short' })} 
                    d={new Date(item.created * 1000).getDate()} 
                />
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default __Section_3
