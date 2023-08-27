import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BASE_URL_HOME, { BASE_URL } from '../../api/env';
import { stripHtml } from '../../common/stripHtml';

import Car1 from '../../images/car1.svg';
import LikeSVG from '../../images/like.svg';
// import People from '../../images/peopel.svg';
import Dollar from '../../images/dollar.svg';
import Pound from '../../images/pound.svg';
import bag from '../../images/bag.svg';
import { ReactComponent as LikeIcon } from '../../images/icons/likeIcon.svg';

import $ from 'jquery';
import { formatDate } from '../../common/formatDate';
import { currencySymbol } from '../StayCard/TripIdeaCard';
import { useTranslation } from 'react-i18next';


export const urlBaseCarRental: any = BASE_URL_HOME + "/home?directSubmit=true&tripType=ONLY_CAR"; // TODO: change the test base url to base url
interface CarCardProps {
    data?: any;
    cardClassNames?: string;
    cardWidth?: number;
};

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
};


const CarCard: FC<CarCardProps> = ({ data, cardClassNames, cardWidth }) => {
    const {
        name,
        datasheets,
        baseAdultPrice,
        currency,
    } = data;

    useEffect(() =>{
        // console.log('width task ::: cardWidth from CardCar', cardWidth)

    } ,[cardWidth])

    const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
    const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
    const LightMode :any = useSelector((state:any)=>state.LightMode.mode);
    const [destination, setDestination] = useState<any>();
    // @ts-ignore
    const {t} = useTranslation()
    let from = (data.description && stripHtml(data.description).split(' ')[1]) ?? stripHtml(datasheets.EN.description).split(' ')[1];

    // TODO: static dates
    let date = (new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000)));
    let newDate = (new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000)));

    const departureDate = {
        date: formatDate(date),
        time: '09:00'
    };

    const arrivalDate = {
        date: formatDate(newDate),
        time: '08:00'
    };

    const destinationCountries: any[] = [];
    useEffect(() => {
        $.ajax({
            url: BASE_URL_HOME + "/jsonp/locationSearch?callback=?&tripType=ONLY_CAR",
            dataType: "jsonp",
            data: {
                query: from,
                micrositeId: 'bookperfect',
                languageId: 'EN',
                destinationCountries: destinationCountries
            },
            success: function (data: any) {
                if (!$.isEmptyObject(data)) {
                    setDestination(data);
                }
            }
        })
    }, [from]);

    const handleCarRental = () => {
        if (destination && destination[0]) {
            // TODO: make it work with base url instead of https://online.travelcompositor.com
            // https://online.travelcompositor.com/home?directSubmit=true&tripType=ONLY_CAR&destination=TransportBase::IST&dropoffPoint=TransportBase::IST&departureDate=15/11/2022&arrivalDate=15/11/2022&useSameDropoff=true&pickupTime=00:15&dropoffTime=00:15&lang=EN&displayCurrency=EUR

            var linkToBooking = urlBaseCarRental + '&destination=' + destination[0].id + '&dropoffPoint=' + destination[0].id + '&departureDate=' + departureDate.date + '&arrivalDate=' + arrivalDate.date + '&useSameDropoff=true&pickupTime=' + departureDate.time + '&dropoffTime=' + arrivalDate.time + '&lang=' + activeLang.toUpperCase() + '&displayCurrency=' + activeCurrency
            window.open(linkToBooking, '_blank');
        }
    };
    const people = (color:any) => {
        return (
            <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6669_20076)">
                        <path d="M12 16.875C14.0711 16.875 15.75 15.1961 15.75 13.125C15.75 11.0539 14.0711 9.375 12 9.375C9.92893 9.375 8.25 11.0539 8.25 13.125C8.25 15.1961 9.92893 16.875 12 16.875Z" stroke={color} stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.375 10.875C19.2485 10.8735 20.1103 11.0762 20.8916 11.4669C21.6729 11.8575 22.3521 12.4253 22.875 13.125" stroke={color} stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1.125 13.125C1.64794 12.4253 2.32714 11.8575 3.10843 11.4669C3.88972 11.0762 4.75149 10.8735 5.625 10.875" stroke={color} stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.59961 20.2515C7.09351 19.24 7.86156 18.3876 8.81628 17.7913C9.77099 17.1951 10.874 16.8789 11.9996 16.8789C13.1252 16.8789 14.2282 17.1951 15.1829 17.7913C16.1377 18.3876 16.9057 19.24 17.3996 20.2515" stroke={color} stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.62512 10.875C5.05572 10.8756 4.49791 10.7141 4.01688 10.4094C3.53585 10.1048 3.15145 9.6695 2.9086 9.15449C2.66576 8.63947 2.57449 8.06598 2.64547 7.50102C2.71645 6.93607 2.94675 6.40298 3.30945 5.96404C3.67215 5.52511 4.15227 5.19845 4.69372 5.02225C5.23517 4.84605 5.81558 4.82758 6.36714 4.96899C6.9187 5.11041 7.41862 5.40587 7.8085 5.82085C8.19838 6.23583 8.4621 6.7532 8.56887 7.3125" stroke={color} stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.4316 7.3125C15.5384 6.7532 15.8021 6.23583 16.192 5.82085C16.5819 5.40587 17.0818 5.11041 17.6334 4.96899C18.1849 4.82758 18.7653 4.84605 19.3068 5.02225C19.8482 5.19845 20.3284 5.52511 20.6911 5.96404C21.0538 6.40298 21.2841 6.93607 21.355 7.50102C21.426 8.06598 21.3347 8.63947 21.0919 9.15449C20.8491 9.6695 20.4647 10.1048 19.9836 10.4094C19.5026 10.7141 18.9448 10.8756 18.3754 10.875" stroke={color} stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_6669_20076">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </>
        )
    }
    return (
        <>
            <div>
                <div>
                    <div className={`${cardClassNames} md:h-[530px] border-[1px] border-[#fff] rounded-3xl greenShadow hover:cursor-pointer shadow-[0_2px_13px_-4px_rgba(0,10,255,0.19)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)]`} style={{width: `${cardWidth && cardWidth > 100 ? cardWidth : null }px`}}>
                        <div className='w-[100%] h-[208px] flex justify-center radial items-center rounded-t-3xl'>
                            <img src={Car1} />
                        </div>
                        <div className='text-[#F75847] text-[12px] mt-[18px] px-3 dark:text-[#fff]'>{name && name.split(' ')[0]}</div>
                        <div className='text-[17px] text-[#15173F] font-semibold mt-[2px] px-3 truncate dark:text-[#fff]'>{name}</div>
                        <div className="relative w-[91%] ml-3 flex mt-5 h-[40px] rounded-xl">
                            <div className="flex w-[100%] h-[100%] rounded-xl z-0">
                                <div className="flex justify-center items-center rounded-xl">
                                    {/* <img src={LikeSVG} /> */}
                                    <LikeIcon className='mr-2' />
                                </div>
                                <div className="flex items-center">
                                    <div className=" h-[100%] text-[#F75847] dark:text-[#fff] font-normal text-[12px] flex justify-end items-center mr-3">{t("CAR_RENTAL.GENERAL")}</div>
                                    <div className="w-9 h-[100%] hidden md:flex justify-center items-center">
                                        <div className="w-[80%] h-[2px] bg-[#F75847] dark:bg-[#fff]"></div>
                                    </div>
                                </div>
                                <div className="h-[100%] dark:text-[#fff] text-[#F75847] font-bold text-[14px] flex justify-start items-center">
                                    79%
                                </div>
                            </div>
                            <div className="absolute w-[17%] h-[100%] flex justify-end items-center rounded-xl z-1">
                            </div>
                        </div>
                        <div className='flex px-3 md:px-6 mt-[18px]'>
                            <div className='mr-3'>{people(LightMode=='dark'?'#fff':'#0E123D')}</div>
                            <div className='text-[#0E123D] flex items-center text-[12px] font-normal dark:text-[#fff] whitespace-nowrap'>Seats 3 People</div>
                        </div>
                        <div className='flex justify-between px-3 md:px-6 mt-[18px]'>
                            <div><img src={Dollar} /></div>
                            <div className='flex items-center'>
                                <div className='text-[#0E123D] text-[12px] font-normal mr-1'>{t("CAR_RENTAL.FROM")}
                                    <span className='hidden md:inline-block'>
                                        &nbsp;&nbsp;
                                    </span>
                                 </div>
                                <div className='flex items-baseline space-x-1'>
                                    <div className='text-[16px] text-[#3944B3] font-medium dark:text-[#fff]'>{baseAdultPrice}</div>
                                    <div className='flex text-[#3944B3] dark:text-[#fff]'>{currencySymbol(currency)}</div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[100%] flex justify-center mt-8 '>
                            <div onClick={() => handleCarRental()} className='w-[100%] flex justify-between mx-0 md:mx-5 py-3 rounded-[15px] bg-[#3944B3] dark:bg-[transparent] border-2  border-[#fff] blueShadow px-5 2xl:px-12 '>
                                <div className=' flex justify-end text-[14px] font-medium text-[#fff] items-center'>{t("CAR_RENTAL.BOOK_THIS_VEHICLE")}</div>
                                <div className='flex justify-center items-center'>{svg()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='min-h-[530px] rounded-3xl greenShadow hover:cursor-pointer shadow-[0_2px_13px_-4px_rgba(0,10,255,0.19)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)]'>
                <div className='w-[100%] h-[208px] flex justify-center radial items-center rounded-t-3xl'>
                    <img src={Car1} />
                </div>
                <div className='text-[#F75847] text-[12px] mt-[18px] px-3 dark:text-[#fff]'> {name && name.split(' ')[0]} </div>
                <div className='text-[17px] text-[#15173F] font-semibold mt-[2px] px-3 truncate dark:text-[#fff]'> { name } </div>
                <div className="flex justify-between w-[97%] min-w-0 px-3 flex-row">
                    <div className="text-sm text-[#0E123D] truncate dark:text-gray-400">
                       { datasheets && stripHtml(datasheets.EN.description) } 
                    </div>
                    <div className='flex justify-end dark:text-[#fff]'>
                       { baseAdultPrice } { currency }
                    </div>
                </div>

                <div className="relative w-[91%] ml-3 flex mt-5 h-[40px] rounded-xl">
                    <div className="flex w-[100%] h-[100%] rounded-xl z-0">
                        <div className="flex justify-center items-center rounded-xl">
                            <LikeIcon className='hi'/>
                        </div>
                        <div className="flex items-center">
                            <div className="h-[100%] text-[#F75847] font-normal text-[12px] flex justify-end items-center mx-3">General</div>
                            <div className="h-[100%] flex justify-center items-center">
                                <div className="h-[2px] bg-[#F75847] dark:bg-[#fff]"></div>
                            </div>
                        </div>
                        <div className="w-[20%] h-[100%] text-[#F75847] font-bold text-[14px] flex justify-start items-center">
                            79%
                        </div>
                    </div>
                </div>
                <div className='flex px-4 mt-[18px]'>
                    <div className='w-[10%]'><img src={People} /></div>
                    <div className='w-[70%] text-[#0E123D] flex items-center text-[12px] font-normal ml-2 dark:text-[#fff]'>Seats 3 People</div>
                </div>
                <div className='flex px-4 mt-[18px]'>
                    <div className='w-[10%]'><img src={bag} /></div>
                    <div className='w-[70%] text-[#0E123D] flex items-center text-[12px] font-normal ml-2 dark:text-[#fff]'>Fits 3 medium suitcases</div>
                </div>

                <div className='w-[100%] flex justify-center mt-4' onClick={ (e: any) => handleCarRental()}>
                    <div className='w-[100%] flex justify-center mx-5 py-3 rounded-[15px] bg-[#3944B3] border-2  shadow-[0px_12px_29px_rgba(110,_122,_252,_0.33)]  border-[#fff] blueShadow'>
                        <div className='flex justify-end text-[14px] font-medium text-[#fff] items-center mr-1 md:mr-3 dark:text-[#fff]'>Book this vehicle</div>
                        <div className='flex justify-center items-center'>{svg()}</div>
                    </div>
                </div>
            </div> */}
            </div>
        </>

    )
}

export default CarCard;