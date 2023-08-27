import React, { FC } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from'react-router-dom';
import { BASE_URL } from '../../api/env';
import { stripHtml } from '../../common/stripHtml';
import { travelnews, travelnewsdetails } from '../../store/actions';
import {useSelector} from 'react-redux';
interface __Section_7Props {
    img?: any;
    title?: any;
    description?: any;
    monthName?: any;
    day?: any;
    news?: any;
    id?:any;
};

const __Section_7: FC<__Section_7Props> = ({news, img, title, description, monthName, day , id }) => {
    console.log('ID__NEWS',id);
    //ID__NEWS NEWS
    const dispatch = useDispatch();

    const history = useHistory();
    const theme = useSelector((state:any)=>state.LightMode.mode);
    const handleTravelNew = () => {
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
        <div className='flex  rounded-[10px] py-4 shadow-[0_13px_30px_-7px_rgba(0,10,255,0.09)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] cursor-pointer' onClick={() => handleTravelNew()}>
            
            <div className={`${id=='NEWS'?'w-[20%]':''} rounded-[10px] border-[1px] border-[#EBECF7] p-1 m-3 flex items-center`}>
                <img className={`${id=='NEWS'?'w-full':''}`} src={ BASE_URL + img } />
            </div>


            <div className={`${id=='NEWS'?'w-[65%]':''}`}>
                <div className={`text-[15px] font-medium text-[#0E123D] mt-[21px] dark:text-[#ffff]`}>{title}</div>
                <div className='text-[#3F4249] text-[12px] font-normal mt-[3px]'>
                    <span>
                        <span className='line-clamp-2 overflow-ellipsis dark:text-[#ffff]'>{description && stripHtml(description)}</span>
                        <span className='text-[#3944B3] text-[12px] font-medium dark:text-[#fff]'>More</span>
                        <span>
                            <svg className='inline-block mb-[1px]' width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_7069_25284)">
                                    <path d="M4.5 2.75L8.25 6.5L4.5 10.25" stroke={theme=='dark'?'#fff':'#3944B3'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_7069_25284">
                                        <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </span>

                </div>
            </div>


            <div className={`${id=='NEWS'?'w-[15%]':''} flex items-center mx-2`}>
                <div className='m-2 bg-[#FFEFED] rounded-t-[10px] rounded-b-[1px] flex items-center'>
                    <div className=''>
                        <div className='bg-[#F75847] rounded-[4px] flex justify-center items-center px-3 py-2'>
                            <span className='text-[#FFFFFF] text-[12px] font-medium'>{monthName}</span>
                        </div>
                        <div className='bg-[transparent] flex justify-center items-center p-2'>
                            <span className='text-[#0E123D] text-[14px] font-normal'>{day}</span>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default __Section_7
