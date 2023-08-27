import React from 'react'
import wall1 from '../../images/wall1.svg'
import wall2 from '../../images/wall2.svg'
import wall3 from '../../images/wall3.svg'
import wall5 from '../../images/wall5.svg'
import wall6 from '../../images/wall6.svg'
import wall7 from '../../images/wall7.svg'
import wall8 from '../../images/wall8.svg'
import mobile from '../../images/mobile.svg'
import { ReactComponent as LineWithCircle } from '../../images/icons/lineWithCircle.svg'
import { ReactComponent as LineWithCarIcon } from '../../images/icons/LineWithCarIcon.svg'
import { ReactComponent as LineWithAirplane } from '../../images/icons/lineWithAirplane.svg'
import { ReactComponent as LineWithHumanFigure } from '../../images/icons/lineWithHumanFigure.svg'
import { useSelector } from 'react-redux';





function Index() {
    const url = 'https://bookperfect.imgix.net/tripdesign/';
    const theme = useSelector((state: any) => state.LightMode.mode);
    return (
        <div className='relative -translate-y-7 md:translate-y-0 transition-all overflow-hidden z-[0]'>
            <div className="hidden lg:flex w-[100%] justify-start my-14 min-h-[600px] bg-[#fff] dark:bg-[#202133] relative">
                <div className='w-[30%] relative'>
                    <div className='w-[100%] flex justify-end ml-20'>
                        <img src={theme=='dark'?`${url}mockdarkmode.svg`:`${url}mock.svg`} />
                    </div>
                </div>
                <div className='w-[70%] pl-36'>
                    <div className="w-[90%] flex" >

                        <div className="w-[50%]">
                            <div className="flex justify-center px-20"><img src={theme=='dark'?`${url}airport.svg`:wall3} className="w-[50%]" /></div>
                            <div className="w-[100%] flex justify-center text-[14px] lg:text-[10px] lg:my-3 font-semibold my-5 dark:text-white"><span>Many Desktop Publishing</span></div>
                            <div className="w-[100%] flex justify-center">
                                <div className="w-[20%] ml-3 lg:text-[10px] dark:text-white dark:text-opacity-70">
                                    Letraset sheets containing Lorem Ipsum passages, and more recently with.
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%]">
                            <div className="flex justify-start px-20">
                                <img src={theme=='dark'?`${url}city.svg`:wall5} className="w-[50%] mt-3" />
                            </div>
                            <div className="lg:ml-7 w-[60%] flex justify-center font-semibold my-5 text-[10px] dark:text-white"><span>Embarrassing Hidden</span></div>
                            <div className="w-[50%] ml-6 flex justify-center">
                                <div className="w-[40%] ml-9 text-[10px] dark:text-white dark:text-opacity-70">
                                    Many desktop publishing packages and web page editors now use.
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="w-[80%] flex mt-[5vh]">
                        <div className="w-[50%]">
                            <div className="flex justify-start">
                                <img src={wall1} className="w-[40%]" />
                            </div>
                            <div className="w-[38%] flex justify-center text-[14px] lg:text-[10px] font-semibold lg:my-3 my-5 dark:text-white"><span className='text-center'>Contrary Popular Belief</span></div>
                            <div className="2xl:w-[30%] 2xl:ml-6 w-[38%] flex justify-center">
                                <div className="w-[100%] lg:text-[10px] lg:ml-5 ml-16 dark:text-white dark:text-opacity-70">
                                    There are many variations of passages of Lorem
                                    Ipsum available, but the.
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%]">
                            <div className="flex justify-start"> <img src={theme=='dark'?`${url}hotel.svg`:wall2} className="w-[40%]" /></div>
                            <div className="w-[40%] flex justify-center text-[14px] lg:text-[10px] lg:my-3 font-semibold my-5 dark:text-white"><span className='text-center'>Various Versions Have</span></div>
                            <div className="w-[30%] 2xl:ml-8 flex justify-center">
                                <div className="w-[100%] lg:text-[10px] lg:ml-5 ml-16 dark:text-white dark:text-opacity-70">
                                    All the Lorem Ipsum generators on the Internet tend to repeat.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute w-[70%] h-[100%] top-0 flex">
                        <div className="w-[11vw] h-[28vh] flex justify-end items-end">
                            <img src={wall6} className='w-[3.3vw]' />
                        </div>
                        <div className="w-[21vw] h-[44vh] flex justify-end items-center">
                            <img src={wall7} className="w-[5.5vw]" />
                        </div>
                        <div className="w-[9vw] h-[29vh] relative flex justify-end items-end">
                            <img src={wall8} className="absolute w-[3.5vw]" />
                        </div>
                        <div className="w-[48vw] relative flex justify-start items-center"></div>
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className='lg:hidden'>

                <LineWithCircle className='mx-auto' />
                <div className='flex flex-col items-center space-y-28'>
                    <div className='w-full flex flex-col items-center'>
                        <img src={wall1} className='mx-auto' />
                        <div className='relative mt-6'>
                            <h3 className='text-sm font-medium text-center'>Contrary Popular Belief</h3>
                            <p className='max-w-[212px] text-sm font-light text-center'>
                                There are many variations of passages of Lorem Ipsum available, but the.
                            </p>
                            <LineWithCarIcon className='absolute top-1 left-0 -translate-x-[100%]' />

                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center'>
                        <img src={wall3} className='mx-auto' />
                        <div className='relative mt-6'>
                            <h3 className='text-sm font-medium text-center'>Many Desktop Publishing </h3>
                            <p className='max-w-[212px] text-sm font-light text-center'>
                                Letraset sheets containing Lorem Ipsum passages, and more recently with.                    </p>
                            <LineWithAirplane className='absolute top-1 right-0 translate-x-[100%]' />

                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center'>
                        <img src={wall2} className='mx-auto' />
                        <div className='relative mt-6'>
                            <h3 className='text-sm font-medium text-center'>Various Versions Have</h3>
                            <p className='max-w-[212px] text-sm font-light text-center'>
                                All the Lorem Ipsum generators on the Internet tend to repeat.                    </p>
                            <LineWithHumanFigure className='absolute top-1 left-0 -translate-x-[100%]' />

                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center'>
                        <img src={wall5} className='mx-auto' />
                        <div className='relative mt-6'>
                            <h3 className='text-sm font-medium text-center'>Various Versions Have</h3>
                            <p className='max-w-[212px] text-sm font-light text-center'>
                                Many desktop publishing packages and web page editors now use.                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index