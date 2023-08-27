import React, { FC } from 'react'
import LikeSVG from '../../images/like.svg';
import { useSelector } from 'react-redux';
import lightmodeReducer from '../../store/reducers/lightmodeReducer';
import { ReactComponent as LikeIcon } from '../../images/icons/likeIcon.svg';
import { useTranslation } from 'react-i18next';

interface ActivitisProps {
    cardDescrClassNames?: string
};

const Activitis: FC<ActivitisProps> = (props) => {
    const {cardDescrClassNames = 'sm:mr-0'} = props;
    const LightMode = useSelector((state: any) => state.LightMode.mode);
    // @ts-ignore
    const {t} = useTranslation()
    const svg = () => {
        return (<>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_6354_22993)">
                    <path d="M2.5 8.125H6.25V16.25H2.5C2.33424 16.25 2.17527 16.1842 2.05806 16.0669C1.94085 15.9497 1.875 15.7908 1.875 15.625V8.75C1.875 8.58424 1.94085 8.42527 2.05806 8.30806C2.17527 8.19085 2.33424 8.125 2.5 8.125V8.125Z" stroke={LightMode=='dark'?'#fff':'#F75847'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.25 8.125L9.375 1.875C10.038 1.875 10.6739 2.13839 11.1428 2.60723C11.6116 3.07607 11.875 3.71196 11.875 4.375V6.25H16.7109C16.8882 6.24956 17.0635 6.28706 17.225 6.35997C17.3866 6.43288 17.5306 6.53953 17.6476 6.67273C17.7645 6.80593 17.8516 6.96262 17.9029 7.13226C17.9543 7.3019 17.9687 7.48056 17.9453 7.65625L17.0078 15.1562C16.9699 15.4573 16.8237 15.7343 16.5966 15.9356C16.3695 16.1368 16.0769 16.2486 15.7734 16.25H6.25" stroke={LightMode=='dark'?'#fff':'#F75847'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_6354_22993">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>)
    }
    return (
        <div className="flex w-[100%] h-[100%] rounded-xl z-0 items-center">
            <div className="flex justify-center items-center rounded-xl">
                <LikeIcon className='mr-2' />
            </div>
            <div className="flex items-center">
                <div className={`${cardDescrClassNames} h-[100%] text-[#F75847] dark:text-[#fff] font-normal text-[12px] flex justify-end items-center mr-2 sm:mr-3`}>{t("GENERAL")}</div>
                <div className="hidden sm:flex w-5 h-[100%] justify-center items-center">
                    <div className="w-[80%] h-[2px] bg-[#F75847] dark:bg-[#fff]"></div>
                </div>
            </div>
            <div className="h-[100%] dark:text-[#fff] text-[#F75847] font-bold text-[14px] flex justify-start items-center">
                79%
            </div>
    </div>
    )
}

export default Activitis
