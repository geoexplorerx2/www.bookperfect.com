import React, { FC } from 'react'
import eyes from '../../images/eyes.svg';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
interface ReviewsProps {

};

const Reviews: FC<ReviewsProps> = () => {
    const LightMode = useSelector((state: any) => state.LightMode.mode);
    // @ts-ignore
    const {t} = useTranslation()
    const svg = () => {
        return (<>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6707_20094)">
                    <path d="M10 4.375C3.75 4.375 1.25 10 1.25 10C1.25 10 3.75 15.625 10 15.625C16.25 15.625 18.75 10 18.75 10C18.75 10 16.25 4.375 10 4.375Z" stroke={LightMode == 'dark' ? '#fff' : '#3944B3'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z" stroke={LightMode == 'dark' ? '#fff' : '#3944B3'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_6707_20094">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        </>)
    }
    return (
        <div className={`relative w-[100%] flex h-[40px] rounded-xl bg-[#E3EDFF] dark:bg-[transparent]  ${LightMode == 'dark' ? ' ' : 'boxShadoweye'}  border-2 border-[#fff]`}>
            <div className="absolute  flex w-[100%] h-[100%] rounded-xl z-0">
                <div className="w-[20%] flex justify-center items-center rounded-xl bg-[#F8FAFF]  dark:bg-[#171925]">
                    {svg()}
                </div>
                <div className='flex w-[80%]'>
                    <div className='w-[30%] flex justify-center items-center text-[18px] font-bold text-[#3944B3] dark:text-[#fff]'>16</div>
                    <div className='w-[70%] flex justify-start items-center text-[12px] font-normal text-[#3944B3] dark:text-[#fff]'>{t('REVIEWS')}</div>
                </div>
            </div>
            <div className="absolute w-[23%] h-[100%] flex justify-end items-center rounded-xl z-1">
                <div className={`${LightMode == 'dark' ? 'arrow-right-dark' : 'arrow-right'}`}></div>
            </div>
        </div>
    )
}

export default Reviews
