import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { stripHtml } from '../../common/stripHtml';
import { travelnews, travelnewsdetails } from '../../store/actions';
import useWindowSize from '../../hooks/useWindowSize';
import {useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
interface __Section_5_Props {
  news?: any;
  title?: any;
  description?: any;
};

const __Section_5: FC<__Section_5_Props> = ({news, title, description }) => {

  const { height, width } = useWindowSize();
  const dispatch = useDispatch();
  // @ts-ignore
  const {t} = useTranslation()
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
    <div className='w-[100%] cursor-pointer' onClick={() => handleTravelNew()}>
      <div className='text-[#0E123D] text-[14px] dark:text-[#fff] font-medium mx-4'>{title}</div>
      <div className='relative w-[100%] h-[50px]'>
        <div className='text-[#3F4249] text-[12px] font-normal mx-4 w-[100%]  mt-[5px] relative'>
          <div className={`relative w-[90%]`}>
            <div className='flex w-full'>
              <div className=' overflow-ellipsis dark:text-[#fff]'>
                <span>{description && stripHtml(description).slice(0,
                  width>=1024 && width<1280 ? 60:
                  width>=1280 && width<1480 ? 40:
                  width>=1480 && width<1880 ? 50:
                  width>=300 && width<417 ?   40:
                  width>=417 && width<600 ?   60:70)} ...</span>
                <span className='ml-2 text-[#3944B3] text-[12px] font-medium dark:text-[#fff]'>{t('MORE')}</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default __Section_5
