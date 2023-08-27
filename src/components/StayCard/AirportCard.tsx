import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import city1 from '../../images/tripidea.png';
import TransfersSearchForm, { urlBaseTransfers } from '../HeroInputSearch/TransfersSearchForm';
import { ReactComponent as CrossIcon } from "../../images/icons/PopUpCloseIcon.svg";
import { ReactComponent as LikeIcon } from '../../images/icons/likeIcon.svg';
import BookTransferModal from '../BookTransferModal/BookTransferModal';
import { useTranslation } from 'react-i18next';

interface AirportCardProps {
    data?: any,
    cardWidth?: number,
}


const AirportCard: FC<AirportCardProps> = ({ data, cardWidth}) => {
    const {
        departure,
        images,
        basePrice,
        pricesByOccupancy,
        arrival,
        currency,
        id,
        startDate,
        endDate
    } = data;
    
    const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
    const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
    const LightMode: any = useSelector((state: any) => state.LightMode.mode);
    const [opened, setOpened] = useState(false);
    const [shouldProgressLineBeVisible, setShouldProgressLineBeVisible] = useState(false)
    const cardContainerRef = useRef<HTMLDivElement>(null)

    const CalcCardWidth = useCallback(() => {

        const cardContainerWidth = cardContainerRef?.current?.getBoundingClientRect().width
       
        let scrollRight: number = 0
    
     
        // how/hide the button
        if (cardContainerWidth && cardContainerWidth < 190) {
          setShouldProgressLineBeVisible(false)
        } else {
            setShouldProgressLineBeVisible(true)
    
        }
    
      }
        , [shouldProgressLineBeVisible, window.innerWidth]);
    
    
    
      useEffect(() => {
        CalcCardWidth()
        window.addEventListener("resize", CalcCardWidth);
        return () => window.removeEventListener("resize", CalcCardWidth);
      },
        [])
    
    // @ts-ignore
    const {t} = useTranslation()

    // const svg = (color:any) => {
    //     return (<>
    //         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    //             <g clip-path="url(#clip0_6354_22993)">
    //                 <path d="M2.5 8.125H6.25V16.25H2.5C2.33424 16.25 2.17527 16.1842 2.05806 16.0669C1.94085 15.9497 1.875 15.7908 1.875 15.625V8.75C1.875 8.58424 1.94085 8.42527 2.05806 8.30806C2.17527 8.19085 2.33424 8.125 2.5 8.125V8.125Z" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    //                 <path d="M6.25 8.125L9.375 1.875C10.038 1.875 10.6739 2.13839 11.1428 2.60723C11.6116 3.07607 11.875 3.71196 11.875 4.375V6.25H16.7109C16.8882 6.24956 17.0635 6.28706 17.225 6.35997C17.3866 6.43288 17.5306 6.53953 17.6476 6.67273C17.7645 6.80593 17.8516 6.96262 17.9029 7.13226C17.9543 7.3019 17.9687 7.48056 17.9453 7.65625L17.0078 15.1562C16.9699 15.4573 16.8237 15.7343 16.5966 15.9356C16.3695 16.1368 16.0769 16.2486 15.7734 16.25H6.25" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    //             </g>
    //             <defs>
    //                 <clipPath id="clip0_6354_22993">
    //                     <rect width="20" height="20" fill="white" />
    //                 </clipPath>
    //             </defs>
    //         </svg>
    //     </>)
    // }
    // const [departureTime, setDepartureTime] = useState<any>(
    //     {
    //         hour: '08',
    //         minute: '00'
    //     }
    // );
    // const [arrivalTime, setArrivalTime] = useState<any>(
    //     {
    //         hour: '09',
    //         minute: '00'
    //     }
    // );

    const guestValue = {
        adults: 1,
        children: 0
    };

    let defaultFrom = departure.name;

    const distributions = guestValue.adults + "-" + guestValue.children;
    const handleTransfer = () => {
        setOpened(true);
    };
    
//   const svgLeft = (color: any) => {
//     return (<>
//       <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <g clip-path="url(#clip0_6655_20133)">
//           <path d="M25 32.5L12.5 20L25 7.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//         </g>
//         <defs>
//           <clipPath id="clip0_6655_20133">
//             <rect width="40" height="40" fill="white" />
//           </clipPath>
//         </defs>
//       </svg>
//     </>)
//   }
//   const svgRight = (color: any) => {
//     return (<>
//       <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <g clip-path="url(#clip0_6655_20136)">
//           <path d="M15 32.5L27.5 20L15 7.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//         </g>
//         <defs>
//           <clipPath id="clip0_6655_20136">
//             <rect width="40" height="40" fill="white" transform="matrix(-1 0 0 1 40 0)" />
//           </clipPath>
//         </defs>
//       </svg>
//     </>)
//   }
    return (

        <div>
            <div ref={cardContainerRef} className='md:h-[430px] dark:border-2 dark:border-[#fff] rounded-3xl boxShadowblack hover:cursor-pointer shadow-[0_2px_13px_-4px_rgba(0,10,255,0.19)] hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] cursor-pointer pb-5' onClick={(e) => handleTransfer()} 
                    style={{width: `${cardWidth && cardWidth > 100 ? cardWidth : null }px`}}
                    >
                <div className='w-[100%] aspect-1 md:h-[258px] flex justify-center items-center rounded-t-3xl relative'>
                    <img className='w-full h-full rounded-t-3xl absolute' src={(images && images[0]) ?? city1} />
                </div>
                <div className='text-[#15173F] text-[17px] mt-2 md:mt-[18px] font-semibold px-3 dark:text-[#fff]'>{departure && departure.name}</div>

                {/* <div className={`relative w-[91%] ml-3 flex mt-5 h-[40px] rounded-xl bg-[#FFEAE8] dark:bg-[#171925] ${LightMode == 'dark' ? '' : 'boxShadowlike'}  border-2 border-[#fff]`}>
                    <div className="absolute  flex w-[100%] h-[100%] rounded-xl z-0">
                        <div className="w-[15%] flex justify-center items-center rounded-xl bg-[#FFF9F9] dark:bg-[#0E123D]">
                            {svg(LightMode=='dark'?'#fff':'#F75847')}
                        </div>
                        <div className="w-[65%] flex items-center">
                            <div className=" w-[30%] h-[100%] text-[#F75847] dark:text-[#fff] font-normal text-[12px] flex justify-end items-center">General</div>
                            <div className="w-[70%] h-[100%] flex justify-center items-center">
                                <div className="w-[80%] h-[2px] bg-[#F75847] dark:bg-[#fff]"></div>
                            </div>
                        </div>
                        <div className="w-[20%] h-[100%] text-[#F75847] dark:text-[#fff] font-bold text-[14px] flex justify-start items-center">
                            79%
                        </div>
                    </div>
                    <div className="absolute w-[17%] h-[100%] flex justify-end items-center rounded-xl z-1">
                        <div className={`${LightMode == 'dark' ? 'arrow-right-dark' : 'arrow-right'}`}></div>
                    </div>
                </div> */}
                <div className="relative w-[91%] ml-3 flex mt-2 md:mt-5 h-[40px] rounded-xl">
                    <div className="flex w-[100%] h-[100%] rounded-xl z-0">
                        <div className="flex justify-center items-center rounded-xl">
                            {/* <img src={LikeSVG} /> */}
                            <LikeIcon className='mr-2' />
                        </div>
                        <div className="flex items-center">
                            <div className=" h-[100%] text-[#F75847] dark:text-[#fff] font-normal text-[12px] flex justify-end items-center mr-3">General</div>
                            <div className={`w-9 h-[100%] flex justify-center items-center ${shouldProgressLineBeVisible ? "" : "hidden"}`}>
                                <div className="w-[80%] h-[2px] bg-[#F75847] dark:bg-[#fff]"></div>
                            </div>
                        </div>
                        <div className="h-[100%] text-[#F75847] dark:text-[#fff] font-bold text-[14px] flex justify-start items-center">
                            79%
                        </div>
                    </div>
                    <div className="absolute w-[17%] h-[100%] flex justify-end items-center rounded-xl z-1">
                    </div>
                </div>


                <div className='flex px-4 mt-2 md:mt-[18px]'>
                    <div className='w-[100%] text-[#0E123D] dark:text-[#fff] flex items-center text-[12px] font-normal'>
                        {t('TRANSFER_DEALS.TRANSFER_PRICES_FROM')} {" "}
                        {/* {pricesByOccupancy && pricesByOccupancy[0].basePrice.amount}  */}
                        {basePrice} {" "}
                        {pricesByOccupancy && pricesByOccupancy[0]?.basePrice.currency}
                    </div>
                </div>
            </div>

            {/* render popup */}
            <Transition appear show={opened} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={() => setOpened(false)}
                >
                    <div className="h-[20px] px-1 text-center md:px-4" >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-75"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 dark:bg-opacity-80" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={`inline-flex w-[85vw] md:w-[761px] my-5 pb-[1px] text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300`}>
                                <div
                                    className='close_button w-11 h-11 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white shadow-[0px_5px_5px_rgba(77,_87,_203,_0.29)] cursor-pointer'
                                    onClick={() => { setOpened(false) }}
                                >
                                    <CrossIcon className='text-[#F75847] w-10 h-10' />
                                </div>

                                <div className="w-full h-full pt-6 px-3 md:px-5 lg:px-9 overflow-hidden">
                                    <BookTransferModal
                                        data={{
                                            arrival, 
                                            currency,
                                            basePrice,
                                            id,
                                            endDate,
                                            startDate
                                        }}
                                        searchFormProps={{
                                            defaultFrom: defaultFrom,
                                            showRadio: true,
                                            defaultTo: arrival?.name,
                                            displayOneWayOnly: false
                                        }}
                                    />
                                    {/* <TransfersSearchForm
                                        defaultFrom={defaultFrom}
                                        displayOneWayOnly={true}
                                        showRadio={false}
                                        showPassengerSelect={false}
                                        showDateTimePicker={false}
                                        isParentModal
                                    /> */}
                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

        </div>
        // <TransfersSearchForm displayOneWayOnly = { true } showRadio = { false } showPassengerSelect = { false } showDateTimePicker = { false } />
    )
}

export default AirportCard;
