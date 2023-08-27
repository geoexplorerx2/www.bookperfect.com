import React, { FC, useState } from 'react'
import img1 from '../../images/student.svg'
import { ReactComponent as Envelope } from '../../images/paper.svg'
import img3 from '../../images/arrowLeftsign.svg'
import useValidate from '../../hooks/useValidate';
import useForm from '../../hooks/useForm';
import SubscribeLogo from '../../images/SubscribeLogo.svg'
import { stripHtml } from '../../common/stripHtml';
import { useTranslation } from 'react-i18next';

interface MemberShipProps {
    status?: any;
    message?: any;
    onValidated?: any;
    statictext?: any;
};

const Membership: FC<MemberShipProps> = ({ status, message, onValidated, statictext }) => {
    const [email, setEmail] = useState();
    // const [errors, setErrors] = useState<any>({});
    // @ts-ignore
    const {t} = useTranslation()
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

    return (
        <div className='w-[100%] bg-[#FFF9F9] py-9 dark:bg-[#171925]'>
            <div className='w-[100%] flex justify-center items-center dark:bg-[#171925]'>
                <div className='w-[80%] flex flex-col items-center bigMd:flex-row justify-between rounded-xl bg-[#fff] dark:bg-[#202232] px-5 md:px-10 bigMd:px-0 pb-10 bigMd:pb-0 bigMd:py-4'>
                    <div className='bigMd:w-[20%] flex items-center'>
                        <img className='w-[90%] h-[264px]' src={img1} />
                    </div>
                    <div className='bigMd:w-[30%] flex items-center'>
                        <div className='w-[100%]'>
                            <div className='font-normal text-sm xl:text-[20px] dark:text-white text-center bigMd:text-left'>
                                {/* { statictext && stripHtml(statictext.bottom_cta_title) } */}
                                <div dangerouslySetInnerHTML={{ __html: statictext && statictext.bottom_cta_title }} />
                            </div>
                            {/* <div className='text-sm xl:text-[20px] font-bold dark:text-white text-center bigMd:text-left'>savings</div> */}
                            <div className='text-xs xl:text-lg font-light text-[#3F4249] mt-4 bigMd:mt-[21px] dark:text-[#F4F8FF] text-center bigMd:text-left'>
                                {/* { statictext && stripHtml(statictext.bottom_cta_description) } */}
                                <div dangerouslySetInnerHTML={{ __html: statictext && statictext.bottom_cta_description }} />
                            </div>
                        </div>
                    </div>

                    {/* {errors.membershipemail && (
                        <div dangerouslySetInnerHTML={{ __html: errors.membershipemail }} />
                    )
                    } */}

                    {status === "error" && (
                        <div dangerouslySetInnerHTML={{ __html: message }} />
                    )
                    }
                    {
                        status !== "success" ? (
                            <>
                                <div className='relative w-full bigMd:w-[40%] flex justify-center bigMd:justify-start items-center mt-6 bigMd:mt-0'>
                                    <div className='absolute top-0 w-full -translate-y-[60px] flex justify-center'>
                                        {errors.membershipemail && (
                                            <>
                                                <div className='w-[40%] translate-x-[60px]'>
                                                    <div className='w-full bg-[red] py-3 rounded-[10px] text-[14px] text-[#fff] flex justify-center'>
                                                        <div dangerouslySetInnerHTML={{ __html: errors.membershipemail }} />
                                                    </div>
                                                    <div className='arrow-down translate-x-[205px]'></div>
                                                </div>
                                            </>

                                        )
                                        }

                                    </div>
                                    <div className='w-[100%]'>
                                        <div className={`${errors.membershipemail ? 'border-[1px] border-[red]' : ''} w-full bigMd:w-[80%] px-5 py-3 text-[14px] font-light flex justify-between text-[#0E123d] border-[1px] border-[#DADBE8] rounded-xl`}>
                                            <input onChange={(event: any) => handleChange(event)} name="membershipemail" className={`w-[100%] h-[100%] focus:outline-none dark:bg-transparent  dark:text-white ${errors.membershipemail ? 'placeholder-red-600' : 'currentColor'}`} placeholder={t('MEMBERSHIP.ENTER_YOUR_EMAIL_ADDRESS')} />
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" stroke={errors.membershipemail ? 'red' : 'currentColor'} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.4">
                                                        <path d="M21 5.25L12 13.5L3 5.25" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M10.3594 12L3.23438 18.5344" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M20.7656 18.5344L13.6406 12" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className='w-full bigMd:w-[80%] flex justify-end mt-3' onClick={e => handleSubmit()}>
                                            <div className={`w-full sm:w-auto cursor-pointer  hover:bg-[#3944B3] text-[#3944B3] dark:text-white  hover:text-[#fff] px-3 py-3 flex justify-around items-center rounded-xl border-[1px] border-[#3944B3] dark:border-white`}>
                                                <div className='text-[14px] font-medium cursor-pointer whitespace-nowrap'>{t("MEMBERSHIP.LET'S_DO_THIS")}</div>
                                                <div> <i className="ml-3 las la-arrow-right text-xl text-[#3944B3] dark:text-white  "></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) :
                            <>
                                <div className='w-[30%]'>
                                    {status === "success" && (
                                        <>
                                            <div className='w-full flex justify-center'>
                                                <img src={SubscribeLogo} />
                                            </div>
                                            <div className='w-[70%] rounded-[10px] bg-[#006400] text-[#fff] flex justify-center py-3'>
                                                <div dangerouslySetInnerHTML={{ __html: message }} />
                                            </div>

                                        </>

                                    )
                                    }

                                </div>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}

export default Membership