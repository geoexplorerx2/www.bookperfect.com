import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { travelnews, travelNewsDetailsClear } from '../../store/actions';

const __Section_2 = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // @ts-ignore
    const {t} = useTranslation()
    const handleViewAllNews = () => {

        dispatch(
          travelNewsDetailsClear()
        );

        // get travel news data
        dispatch(
          travelnews()
        );
        
        history.push('/travelnews');
    };

    return (
        <div className='flex cursor-pointer' onClick={() => handleViewAllNews()}>
            <div className='h-full flex mr-[0.5rem] items-center text-[16px] font-normal text-[#fff] cursor-pointer' onClick={() => handleViewAllNews()}>{t('TRAVEL_NEWS.VIEW_ALL_NEWS')}</div>
            <div className='h-full flex mr-[0.9rem] items-center'>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_7740_1482)">
                        <path d="M4.375 11H17.6255" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.2695 5.28516L17.9838 10.9994L12.2695 16.7137" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_7740_1482">
                            <rect width="20.3175" height="20.3175" fill="white" transform="translate(0.841797 0.84082)" />
                        </clipPath>
                    </defs>
                </svg>

            </div>
        </div>
    )
}

export default __Section_2
