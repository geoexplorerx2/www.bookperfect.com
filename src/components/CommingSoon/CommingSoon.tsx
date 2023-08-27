import React from 'react'
import { useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import useValidate from '../../hooks/useValidate';
import useWindowSize from '../../hooks/useWindowSize';

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

const CommingSoon = ({ status, message, onValidated, statictext }: any) => {
    const { width } = useWindowSize();
    const theme = useSelector((state: any) => state.LightMode.mode);

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(_handleSubscribe, useValidate, 'membership');

    function _handleSubscribe() {
        onValidated({
            EMAIL: values.membershipemail
        });
    };

    // TODO: write this styles in styles.ts
    const breakPoints = () => {
        let top: any = null;
        let Height: any = null;
        if (width <= 420) { Height = 'h-[700px]'; top = 'translate-y-[380px] pl-1'; }
        if (width > 420 && width <= 500) { Height = 'h-[50rem]'; top = 'translate-y-[30rem] pl-4'; }
        if (width > 500 && width <= 620) { Height = 'h-[55rem]'; top = 'translate-y-[35rem] pl-4'; }
        if (width > 620 && width <= 800) { Height = 'h-[55rem]'; top = 'translate-y-[35rem] pl-8'; }
        if (width > 800 && width <= 1023) { Height = 'h-[55rem]'; top = 'translate-y-[35rem] pl-10'; }
        return { Height, top }
    };

    const desktopbreakPoints = () => {
        let Shift: any = 'right-64 w-50';
        let Height: any = 'h-[528px]';
        let width1: any = 'w-[25%]';
        let btnSpace: any = 'flex w-[34%] translate-y-[70px]';
        if (width > 1023 && width <= 1300) { Shift = 'right-0 w-[45%] flex items-center'; Height = 'h-[550px]'; width1 = 'w-[45%]'; btnSpace = 'flex w-[52%] translate-y-[70px]' }
        if (width > 1300 && width <= 1600) { Shift = 'right-0 w-[45%] flex items-center'; Height = 'h-[550px]'; width1 = 'w-[40%]'; btnSpace = 'flex w-[45%] translate-y-[70px]' }
        return { Shift, Height, width1, btnSpace }
    };

    const classes = [{
        desktop: {
            className1: `w-full h-[550px] relative mb-10`,
            className2: `w-full ${desktopbreakPoints().Height} bg-[#FFF9F9] absolute top-0 z-2 dark:bg-[#202232]`,
            className3: 'h-full px-[10vw]',
            className4: 'text-[#F75847] dark:text-[#fff] text-[42px] font-light mt-16',
            className5: 'text-[#3944B3] dark:text-[#fff] text-[64px] font-bold',
            className6: `${desktopbreakPoints().width1} dark:text-[#fff] text-justify text-[18px] font-light`,
            className7: `${desktopbreakPoints().btnSpace}`,
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
    }];

    return (
        <>
            <div className={width < 1024 ? 'w-[100%] h-[55px] translate-x-4 border-2 border-[#3944B3] dark:border-[#fff] rounded-2xl' : 'w-[60%] border-2 border-[#3944B3] dark:border-[#fff] rounded-2xl'}>
                <input onChange={(event: any) => handleChange(event)} name="membershipemail" className={'border-none text-[#3944B3] dark:text-[#fff] placeholder:dark:text-[#fff] bg-transparent h-full focus:ring-0 placeholder:text-[#3944B3] max-w-full absolute left-[-2px] top-0 w-[16rem]'} type={'email'} placeholder='E-Mail Address' />
            </div>
            <div className={width < 1024 ? classes[0].mobile.className8 : classes[0].desktop.className8}>
                <button onClick={e => handleSubmit()} className={width < 1024 ? classes[0].mobile.className9 : classes[0].desktop.className9}>
                    <span>Notify Me</span><span className={width < 1024 ? classes[0].mobile.className10 : classes[0].desktop.className10}>{btnArrow()}</span>
                </button>
            </div>
            {errors.membershipemail ? <div className='absolute top-0 w-[300px] h-[50px] translate-y-[60px] translate-x-[10px]'>
                <div className='arrow-up translate-x-[30px]'></div>
                <div className='w-[80%] h-[40px] bg-[red] text-[#fff] text-sm flex justify-center items-center rounded-[8px]'>
                    {errors.membershipemail}
                </div>
            </div> : null}
        </>
    )
}

export default CommingSoon