import React, { FC, useState } from 'react'
import arrowLeft from '../../images/arrowLeft2.svg';
import arrowRight from '../../images/arrowRight2.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Car1 from '../../images/car1.svg';
import LikeSVG from '../../images/like.svg';
import People from '../../images/peopel.svg';
import bag from '../../images/bag.svg';
import Dollar from '../../images/dollar.svg';
import Pound from '../../images/pound.svg';
import Thrifty from '../../images/thrifty.svg';
import Hertz from '../../images/hertz.svg';
import Sixt from '../../images/sixt.svg';
interface CarBookingProps {

};
const CarBooking: FC<CarBookingProps> = () => {
    const [item, setItem] = useState<any>(1)
    const svg = () => {
        return (<>
            <svg width="26" height="25" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6660_20268)">
                    <path d="M10.5 17.5C14.6421 17.5 18 14.1421 18 10C18 5.85786 14.6421 2.5 10.5 2.5C6.35786 2.5 3 5.85786 3 10C3 14.1421 6.35786 17.5 10.5 17.5Z" stroke="white" stroke-width="1.4" stroke-miterlimit="10" />
                    <path d="M10.9766 12.6484L13.625 10L10.9766 7.35156" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.375 10H13.625" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_6660_20268">
                        <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                    </clipPath>
                </defs>
            </svg>
        </>)
    }
    const slider = React.useRef<Slider>(null)
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    };
    return (
        <div className='w-[100%] max-h-[780px] min-h-[780px]'>
            <div className='w-[100%] px-[10vw]'>
                <div className='text-[#15173F] text-[28px] font-normal'>Many desktop publishing packages</div>
                <div className='text-[#15173F] text-[16px] font-light mt-1'>There are many variations of passages of Lorem Ipsum available, but the</div>
                <div className=''><hr className='rounded-[16px] h-[1px] border-[rgba(102,102,102,0.2)] mt-4' /></div>
                
                
                <div className='w-[100%] mt-10'>
                    <ul className='w-[100%] flex justify-between items-center m-0 box-border'>
                        <li onClick={() => setItem(1)} className={`${item == 1 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>Paris</li>
                        <li onClick={() => setItem(2)} className={`${item == 2 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>New York</li>
                        <li onClick={() => setItem(3)} className={`${item == 3 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>Tokyo</li>
                        <li onClick={() => setItem(4)} className={`${item == 4 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>London</li>
                        <li onClick={() => setItem(5)} className={`${item == 5 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>Rome</li>
                        <li onClick={() => setItem(6)} className={`${item == 6 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>Viena</li>
                        <li onClick={() => setItem(7)} className={`${item == 7 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>Madrid</li>
                        <li onClick={() => setItem(8)} className={`${item == 8 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>Barcelona</li>
                        <li onClick={() => setItem(9)} className={`${item == 19 ? 'py-3 cursor-pointer px-10 rounded-2xl text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 'text-[rgba(102,102,102,1)] cursor-pointer text-[14px] font-medium'}`}>
                            <div className='flex items-center px-5 border-[1px] border-[#F75847] rounded-[16px] py-1'>
                                <span className='text-[#F75847] mr-4'>More Ideas</span>
                                <span>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_7142_8681)">
                                            <path d="M9.37402 16H22.6245" stroke="#F75847" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M17.2695 10.2871L22.9838 16.0014L17.2695 21.7157" stroke="#F75847" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_7142_8681">
                                                <rect width="20.3175" height="20.3175" fill="white" transform="translate(5.84082 5.8418)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </span>
                            </div>
                        </li>
                    </ul>
                </div>


            </div>
            <div className='w-[100%] h-[600px] mt-5'>
                <div className='w-[100%] h-[590px] px-[5vw] flex'>
                    <div onClick={() => slider?.current?.slickPrev()} className='w-[5%] h-[100%] flex items-center justify-end'><img className='cursor-pointer' src={arrowLeft} /></div>
                    <div className='w-[90%] h-[100%]'>
                        <Slider ref={slider} {...settings}>
                            <div>
                                <div className='h-[530px] rounded-3xl greenShadow hover:cursor-pointer shadow-[0_2px_13px_-4px_rgba(0,10,255,0.19)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)]'>
                                    <div className='w-[100%] h-[208px] flex justify-center radial items-center rounded-t-3xl'>
                                        <img src={Car1} />
                                    </div>
                                    <div className='text-[#F75847] text-[12px] mt-[18px] px-3'>Mercedes-Benz</div>
                                    <div className='text-[17px] text-[#15173F] font-semibold mt-[2px] px-3'>Vito Tourer</div>
                                    <div className="relative w-[91%] ml-3 flex mt-5 h-[40px] rounded-xl bg-[#FFEAE8] boxShadowlike border-2 border-[#fff]">
                                        <div className="absolute  flex w-[100%] h-[100%] rounded-xl z-0">
                                            <div className="w-[15%] flex justify-center items-center rounded-xl bg-[#FFF9F9]">
                                                <img src={LikeSVG} />
                                            </div>
                                            <div className="w-[65%] flex items-center">
                                                <div className=" w-[30%] h-[100%] text-[#F75847] font-normal text-[12px] flex justify-end items-center">General</div>
                                                <div className="w-[70%] h-[100%] flex justify-center items-center">
                                                    <div className="w-[80%] h-[2px] bg-[#F75847]"></div>
                                                </div>
                                            </div>
                                            <div className="w-[20%] h-[100%] text-[#F75847] font-bold text-[14px] flex justify-start items-center">
                                                79%
                                            </div>
                                        </div>
                                        <div className="absolute w-[17%] h-[100%] flex justify-end items-center rounded-xl z-1">
                                            <div className="arrow-right"></div>
                                        </div>
                                    </div>
                                    <div className='flex px-6 mt-[18px]'>
                                        <div className='w-[10%]'><img src={People} /></div>
                                        <div className='w-[70%] text-[#0E123D] flex items-center text-[12px] font-normal'>Seats 3 People</div>
                                    </div>
                                    <div className='flex justify-between px-6 mt-[18px]'>
                                        <div><img src={Dollar} /></div>
                                        <div className='flex items-center'>
                                            <div className='text-[#0E123D] text-[12px] font-normal'>From&nbsp;:&nbsp;</div>
                                            <div className='flex items-baseline'>
                                                <div className='text-[16px] text-[#3944B3] font-medium'>410</div>
                                                <div className='flex'><img src={Pound} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[100%] flex justify-center mt-8 '>
                                        <div className='w-[100%] flex mx-5 py-3 rounded-[15px] bg-[#3944B3] border-2  border-[#fff] blueShadow'>
                                            <div className='w-[60%] flex justify-end text-[14px] font-medium text-[#fff] items-center'>Book this vehicle</div>
                                            <div className='w-[20%] flex justify-center items-center'>{svg()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='h-[530px] rounded-3xl greenShadow hover:cursor-pointer shadow-[0_2px_13px_-4px_rgba(0,10,255,0.19)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)]'>
                                    <div className='w-[100%] h-[208px] flex justify-center radial items-center rounded-t-3xl'>
                                        <img src={Car1} />
                                    </div>
                                    <div className='text-[#F75847] text-[12px] mt-[18px] px-3'>Mercedes-Benz</div>
                                    <div className='text-[17px] text-[#15173F] font-semibold mt-[2px] px-3'>Vito Tourer</div>
                                    <div className="relative w-[91%] ml-3 flex mt-5 h-[40px] rounded-xl bg-[#FFEAE8] boxShadowlike border-2 border-[#fff]">
                                        <div className="absolute  flex w-[100%] h-[100%] rounded-xl z-0">
                                            <div className="w-[15%] flex justify-center items-center rounded-xl bg-[#FFF9F9]">
                                                <img src={LikeSVG} />
                                            </div>
                                            <div className="w-[65%] flex items-center">
                                                <div className=" w-[30%] h-[100%] text-[#F75847] font-normal text-[12px] flex justify-end items-center">General</div>
                                                <div className="w-[70%] h-[100%] flex justify-center items-center">
                                                    <div className="w-[80%] h-[2px] bg-[#F75847]"></div>
                                                </div>
                                            </div>
                                            <div className="w-[20%] h-[100%] text-[#F75847] font-bold text-[14px] flex justify-start items-center">
                                                79%
                                            </div>
                                        </div>
                                        <div className="absolute w-[17%] h-[100%] flex justify-end items-center rounded-xl z-1">
                                            <div className="arrow-right"></div>
                                        </div>
                                    </div>
                                    <div className='flex px-4 mt-[18px]'>
                                        <div className='w-[10%]'><img src={People} /></div>
                                        <div className='w-[70%] text-[#0E123D] flex items-center text-[12px] font-normal'>Seats 3 People</div>
                                    </div>
                                    <div className='flex justify-between px-6 mt-[18px]'>
                                        <div><img src={Thrifty} /></div>
                                        <div className='flex items-center'>
                                            <div className='text-[#0E123D] text-[12px] font-normal'>From&nbsp;:&nbsp;</div>
                                            <div className='flex items-baseline'>
                                                <div className='text-[16px] text-[#3944B3] font-medium'>410</div>
                                                <div className='flex'><img src={Pound} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[100%] flex justify-center mt-8 '>
                                        <div className='w-[100%] flex mx-5 py-3 rounded-[15px] bg-[#3944B3] border-2  border-[#fff] blueShadow'>
                                            <div className='w-[60%] flex justify-end text-[14px] font-medium text-[#fff] items-center'>Book this vehicle</div>
                                            <div className='w-[20%] flex justify-center items-center'>{svg()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='h-[530px] rounded-3xl greenShadow hover:cursor-pointer shadow-[0_2px_13px_-4px_rgba(0,10,255,0.19)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)]'>
                                    <div className='w-[100%] h-[208px] flex justify-center radial items-center rounded-t-3xl'>
                                        <img src={Car1} />
                                    </div>
                                    <div className='text-[#F75847] text-[12px] mt-[18px] px-3'>Mercedes-Benz</div>
                                    <div className='text-[17px] text-[#15173F] font-semibold mt-[2px] px-3'>Vito Tourer</div>
                                    <div className="relative w-[91%] ml-3 flex mt-5 h-[40px] rounded-xl bg-[#FFEAE8] boxShadowlike border-2 border-[#fff]">
                                        <div className="absolute  flex w-[100%] h-[100%] rounded-xl z-0">
                                            <div className="w-[15%] flex justify-center items-center rounded-xl bg-[#FFF9F9]">
                                                <img src={LikeSVG} />
                                            </div>
                                            <div className="w-[65%] flex items-center">
                                                <div className=" w-[30%] h-[100%] text-[#F75847] font-normal text-[12px] flex justify-end items-center">General</div>
                                                <div className="w-[70%] h-[100%] flex justify-center items-center">
                                                    <div className="w-[80%] h-[2px] bg-[#F75847]"></div>
                                                </div>
                                            </div>
                                            <div className="w-[20%] h-[100%] text-[#F75847] font-bold text-[14px] flex justify-start items-center">
                                                79%
                                            </div>
                                        </div>
                                        <div className="absolute w-[17%] h-[100%] flex justify-end items-center rounded-xl z-1">
                                            <div className="arrow-right"></div>
                                        </div>
                                    </div>
                                    <div className='flex px-4 mt-[18px]'>
                                        <div className='w-[10%]'><img src={People} /></div>
                                        <div className='w-[70%] text-[#0E123D] flex items-center text-[12px] font-normal'>Seats 3 People</div>
                                    </div>
                                    <div className='flex justify-between px-6 mt-[18px]'>
                                        <div><img src={Hertz} /></div>
                                        <div className='flex items-center'>
                                            <div className='text-[#0E123D] text-[12px] font-normal'>From&nbsp;:&nbsp;</div>
                                            <div className='flex items-baseline'>
                                                <div className='text-[16px] text-[#3944B3] font-medium'>410</div>
                                                <div className='flex'><img src={Pound} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[100%] flex justify-center mt-8 '>
                                        <div className='w-[100%] flex mx-5 py-3 rounded-[15px] bg-[#3944B3] border-2  border-[#fff] blueShadow'>
                                            <div className='w-[60%] flex justify-end text-[14px] font-medium text-[#fff] items-center'>Book this vehicle</div>
                                            <div className='w-[20%] flex justify-center items-center'>{svg()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='h-[530px] rounded-3xl greenShadow hover:cursor-pointer shadow-[0_2px_13px_-4px_rgba(0,10,255,0.19)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)]'>
                                    <div className='w-[100%] h-[208px] flex justify-center radial items-center rounded-t-3xl'>
                                        <img src={Car1} />
                                    </div>
                                    <div className='text-[#F75847] text-[12px] mt-[18px] px-3'>Mercedes-Benz</div>
                                    <div className='text-[17px] text-[#15173F] font-semibold mt-[2px] px-3'>Vito Tourer</div>
                                    <div className="relative w-[91%] ml-3 flex mt-5 h-[40px] rounded-xl bg-[#FFEAE8] boxShadowlike border-2 border-[#fff]">
                                        <div className="absolute  flex w-[100%] h-[100%] rounded-xl z-0">
                                            <div className="w-[15%] flex justify-center items-center rounded-xl bg-[#FFF9F9]">
                                                <img src={LikeSVG} />
                                            </div>
                                            <div className="w-[65%] flex items-center">
                                                <div className=" w-[30%] h-[100%] text-[#F75847] font-normal text-[12px] flex justify-end items-center">General</div>
                                                <div className="w-[70%] h-[100%] flex justify-center items-center">
                                                    <div className="w-[80%] h-[2px] bg-[#F75847]"></div>
                                                </div>
                                            </div>
                                            <div className="w-[20%] h-[100%] text-[#F75847] font-bold text-[14px] flex justify-start items-center">
                                                79%
                                            </div>
                                        </div>
                                        <div className="absolute w-[17%] h-[100%] flex justify-end items-center rounded-xl z-1">
                                            <div className="arrow-right"></div>
                                        </div>
                                    </div>
                                    <div className='flex px-4 mt-[18px]'>
                                        <div className='w-[10%]'><img src={People} /></div>
                                        <div className='w-[70%] text-[#0E123D] flex items-center text-[12px] font-normal'>Seats 3 People</div>
                                    </div>
                                    <div className='flex justify-between px-6 mt-[18px]'>
                                        <div><img src={Sixt} /></div>
                                        <div className='flex items-center'>
                                            <div className='text-[#0E123D] text-[12px] font-normal'>From&nbsp;:&nbsp;</div>
                                            <div className='flex items-baseline'>
                                                <div className='text-[16px] text-[#3944B3] font-medium'>410</div>
                                                <div className='flex'><img src={Pound} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[100%] flex justify-center mt-8 '>
                                        <div className='w-[100%] flex mx-5 py-3 rounded-[15px] bg-[#3944B3] border-2  border-[#fff] blueShadow'>
                                            <div className='w-[60%] flex justify-end text-[14px] font-medium text-[#fff] items-center'>Book this vehicle</div>
                                            <div className='w-[20%] flex justify-center items-center'>{svg()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='h-[530px] rounded-3xl greenShadow hover:cursor-pointer shadow-[0_2px_13px_-4px_rgba(0,10,255,0.19)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)]'>
                                    <div className='w-[100%] h-[208px] flex justify-center radial items-center rounded-t-3xl'>
                                        <img src={Car1} />
                                    </div>
                                    <div className='text-[#F75847] text-[12px] mt-[18px] px-3'>Mercedes-Benz</div>
                                    <div className='text-[17px] text-[#15173F] font-semibold mt-[2px] px-3'>Vito Tourer</div>
                                    <div className="relative w-[91%] ml-3 flex mt-5 h-[40px] rounded-xl bg-[#FFEAE8] boxShadowlike border-2 border-[#fff]">
                                        <div className="absolute  flex w-[100%] h-[100%] rounded-xl z-0">
                                            <div className="w-[15%] flex justify-center items-center rounded-xl bg-[#FFF9F9]">
                                                <img src={LikeSVG} />
                                            </div>
                                            <div className="w-[65%] flex items-center">
                                                <div className=" w-[30%] h-[100%] text-[#F75847] font-normal text-[12px] flex justify-end items-center">General</div>
                                                <div className="w-[70%] h-[100%] flex justify-center items-center">
                                                    <div className="w-[80%] h-[2px] bg-[#F75847]"></div>
                                                </div>
                                            </div>
                                            <div className="w-[20%] h-[100%] text-[#F75847] font-bold text-[14px] flex justify-start items-center">
                                                79%
                                            </div>
                                        </div>
                                        <div className="absolute w-[17%] h-[100%] flex justify-end items-center rounded-xl z-1">
                                            <div className="arrow-right"></div>
                                        </div>
                                    </div>
                                    <div className='flex px-4 mt-[18px]'>
                                        <div className='w-[10%]'><img src={People} /></div>
                                        <div className='w-[70%] text-[#0E123D] flex items-center text-[12px] font-normal'>Seats 3 People</div>
                                    </div>
                                    <div className='flex justify-between px-6 mt-[18px]'>
                                        <div><img src={Dollar} /></div>
                                        <div className='flex items-center'>
                                            <div className='text-[#0E123D] text-[12px] font-normal'>From&nbsp;:&nbsp;</div>
                                            <div className='flex items-baseline'>
                                                <div className='text-[16px] text-[#3944B3] font-medium'>410</div>
                                                <div className='flex'><img src={Pound} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[100%] flex justify-center mt-8 '>
                                        <div className='w-[100%] flex mx-5 py-3 rounded-[15px] bg-[#3944B3] border-2  border-[#fff] blueShadow'>
                                            <div className='w-[60%] flex justify-end text-[14px] font-medium text-[#fff] items-center'>Book this vehicle</div>
                                            <div className='w-[20%] flex justify-center items-center'>{svg()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className='w-[5%] h-[100%] flex items-center' onClick={() => slider?.current?.slickNext()}><img className='cursor-pointer' src={arrowRight} /></div>
                </div>
            </div>
        </div>
    )
}

export default CarBooking