import React, { useState } from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import commingsoonLogo from '../../images/commingsoon.svg';
import commingsoondarkmode from '../../images/commingsoondarkmode.svg';
import InputComponent from '../../components/CommingSoon/CommingSoon';
import useWindowSize from '../../hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { MAILCHIMP_API_URL } from '../../api/env';

const btnArrow = () => {
    return (
        <>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_7879_22825)">
                    <path d="M4.0625 13H21.9375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.625 5.6875L21.9375 13L14.625 20.3125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_7879_22825">
                        <rect width="26" height="26" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
};

const CommingSoon = () => {
    const { width, height } = useWindowSize();
    const theme = useSelector((state: any) => state.LightMode.mode);
    const breakPoints = () => {
        let top: any = null;
        let Height: any = null;
        if (width <= 420) { Height = 'h-[700px]'; top = 'translate-y-[380px] pl-1'; }
        if (width > 420 && width <= 500) { Height = 'h-[50rem]'; top = 'translate-y-[30rem] pl-4'; }
        if (width > 500 && width <= 620) { Height = 'h-[55rem]'; top = 'translate-y-[35rem] pl-4'; }
        if (width > 620 && width <= 800) { Height = 'h-[55rem]'; top = 'translate-y-[35rem] pl-8'; }
        if (width > 800 && width <= 1023) { Height = 'h-[55rem]'; top = 'translate-y-[35rem] pl-10'; }
        return { Height, top }
    }
    const desktopbreakPoints = () => {
        let Shift: any = 'right-64 w-50';
        let Height: any = 'h-[528px]';
        let width1: any = 'w-[25%]';
        let btnSpace: any = 'flex w-[34%] translate-y-[70px]';
        if (width > 1023 && width <= 1300) { Shift = 'right-0 w-[45%] flex items-center'; Height = 'h-[550px]'; width1 = 'w-[45%]'; btnSpace = 'flex w-[52%] translate-y-[70px]' }
        if (width > 1300 && width <= 1600) { Shift = 'right-0 w-[45%] flex items-center'; Height = 'h-[550px]'; width1 = 'w-[40%]'; btnSpace = 'flex w-[45%] translate-y-[70px]' }
        if (width > 1600 && width <= 1800) { Shift = 'right-0 w-[45%] flex items-center'; Height = 'h-[550px]'; width1 = 'w-[35%]'; btnSpace = 'flex w-[45%] translate-y-[70px]' }
        return { Shift, Height, width1, btnSpace }
    }
    const classes = [{
        desktop: {
            className1: `w-full h-[550px] relative bg-[#FFF9F9] dark:bg-[#202232]`,
            className2: `w-full ${desktopbreakPoints().Height}  absolute top-0 z-2 `,
            className3: 'h-full px-[10vw]',
            className4: 'text-[#F75847] dark:text-[#fff] text-[42px] font-light mt-16',
            className5: 'text-[#3944B3] dark:text-[#fff] text-[64px] font-bold',
            className6: `${desktopbreakPoints().width1} dark:text-[#fff] text-justify text-[18px] font-light`,
            className7: `${desktopbreakPoints().btnSpace} relative`,
            className8: `w-[30%] h-[58px] mx-3 border-2 border-[#fff] rounded-[20px] ${theme == 'dark' ? '' : 'boxShadowCommingSoon'} `,
            className9: 'w-full h-full flex justify-center items-center rounded-[16px] text-[#FFFFFF]  text-[16px] font-medium bg-gradient-to-b from-[#FE9A7A] to-[#FA6455]',
            className10: 'ml-2',
            className11: `absolute top-0 ${desktopbreakPoints().Shift} h-full z-1`,
        },
        mobile: {
            className1: `w-full ${breakPoints().Height} relative`,
            className2: 'w-full h-full bg-[#FFF9F9] absolute top-0',
            className3: 'text-center absolute w-full z-20',
            className4: 'text-[#F75847] text-[28px] font-light mt-[50px]',
            className5: 'text-[#3944B3] w-full text-[32px] font-bold',
            className6: 'hidden',
            className7: `w-full ${breakPoints().top}`,
            className8: 'w-[90%] mt-5 h-[55px] translate-x-4 border-2 border-[#fff] rounded-[20px] boxShadowCommingSoon',
            className9: 'w-full h-full flex justify-center items-center rounded-[16px] text-[#FFFFFF]  text-[16px] font-medium bg-gradient-to-b from-[#FE9A7A] to-[#FA6455]',
            className10: 'translate-x-2',
            className11: `absolute z-1 translate-y-[120px] w-full flex justify-center`,
        }
    }]
    return (
        <div className={width < 1024 ? classes[0].mobile.className1 : classes[0].desktop.className1}>
            <div className={width < 1024 ? classes[0].mobile.className2 : classes[0].desktop.className2}>
                <div className={width < 1024 ? classes[0].mobile.className3 : classes[0].desktop.className3}>
                    <div className={width < 1024 ? classes[0].mobile.className4 : classes[0].desktop.className4}>We’re </div>
                    <div className={width < 1024 ? classes[0].mobile.className5 : classes[0].desktop.className5}>COMING SOON.</div>
                    <div className={width < 1024 ? classes[0].mobile.className6 : classes[0].desktop.className6}>
                      Leave your e-mail and get notified about our discounts in launch week.
                    </div>
                    <div className={width < 1024 ? classes[0].mobile.className7 : classes[0].desktop.className7}>
                        <>
                            <MailchimpSubscribe
                                url={MAILCHIMP_API_URL}
                                render={({ subscribe, status, message }: any) => {
                                    return (
                                        <>
                                            <InputComponent
                                                status={status}
                                                message={message}
                                                onValidated={(formData: any) => subscribe(formData)}
                                            />
                                        </>
                                    )
                                }}
                            />
                            {/* {
                                error ? <div className='absolute top-0 w-[300px] h-[50px] translate-y-[60px] translate-x-[10px]'>
                                    <div className='arrow-up translate-x-[30px]'></div>
                                    <div className='w-[60%] h-[40px] bg-[red] text-[#fff] text-sm flex justify-center items-center rounded-[8px]'>
                                        email not found
                                    </div>
                                </div> : null
                            } */}
                            {/* <div className={width < 1024 ? classes[0].mobile.className8 : classes[0].desktop.className8}>
                                <button className={width < 1024 ? classes[0].mobile.className9 : classes[0].desktop.className9}>
                                    <span>Notify Me</span><span className={width < 1024 ? classes[0].mobile.className10 : classes[0].desktop.className10}>{btnArrow()}</span>
                                </button>
                            </div> */}
                        </>
                    </div>
                </div>
            </div>
            <div className={width < 1024 ? classes[0].mobile.className11 : classes[0].desktop.className11}>
                <img src={theme == 'dark' ? commingsoondarkmode : commingsoonLogo} />
            </div>
        </div>
    );
}

export default CommingSoon;
