import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocationInput from "./LocationInput";
import { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import CInputNumber from "../../lib/CInputNumber/CInpuNumber";
import SearchButton from "../SearchButton/SearchButton";
import { DatePicker } from "@mantine/dates";
import { Calendar, CurrentLocation } from "tabler-icons-react";
import styled, { css } from "styled-components";
import dayjs from 'dayjs';
import BASE_URL_HOME from "../../api/env";
import { formatDate } from "../../common/formatDate";
import { useHistory } from 'react-router-dom'
import { createStyles } from "@mantine/core";
import GuestsInput from "./GuestsInput";
import useWindowSize from "../../hooks/useWindowSize";
import TYPES from "../../types/store";
import TermsOfServiceText from "../TermsOfServiceText/TermsOfServiceText";
import { useTranslation } from "react-i18next";


export const urlBaseActivities = BASE_URL_HOME + "/home?directSubmit=true&tripType=ONLY_TICKET";

const SelectionClassWrapper = styled.div`
  font-weight: 500px;
  font-family: 'Poppins';
  size: 14px;
  line-height: 21px;
`;

export interface TimeRage {
  startTime: string;
  endTime: string;
}

export interface ActivitiesSearchFormProps {
  roundedTopLeft?: string;
  customStyle?: any;
  wrapperClassNames?: string;
  searchcardplace?: string;
};

const flightClass = [
  {
    name: "Economy",
    href: "##",
  },
  {
    name: "Business",
    href: "##",
  }
];

const ActivitiesSearchForm: FC<ActivitiesSearchFormProps> = (props) => {
  const { roundedTopLeft, customStyle, wrapperClassNames, searchcardplace } = props

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const changeLighmode = useSelector((state: any) => state.LightMode);
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<"dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "oneWay" | "roundTrip" | "multiStop" | ""
  >("oneWay");
  const [flightClassState, setFlightClassState] = useState("Economy");

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState<any>();
  const [departureDate, setDepartureDate] = useState<any>();
  const [arrivalDate, setArrivalDate] = useState<any>();
  const [guestValue, setGuestValue] = useState<any>([]);
  const TravellersEvent: any = useSelector((state: any) => state.TravellersReducer.status);
  const [errors, setErrors] = useState<any>({});
  const [childrenAges, setChildrenAges] = useState();

  // var departureDate: any;
  // var arrivalDate;

  const ref = useRef<any>();
  
  const [isMobile, setIsMobile] = useState(false);
  const windowSize = useWindowSize();
  // @ts-ignore
  const {t} = useTranslation()

  useEffect(() => {
    setIsMobile((prevState) => {
      if (!prevState && windowSize.width < 768) {
        return true
      } else if (prevState && windowSize.width > 768) {
        return false
      } else {
        return prevState
      }
    })
  },[windowSize])

  useEffect(()=> {
      
    if(errors?.type === "comparison" && arrivalDate?.getTime() > departureDate?.getTime()){
      setErrors([])
    }

} ,
[departureDate ,arrivalDate])

  // if(typeof dateValue === 'object') {
  // departureDate = dateValue[0];
  // arrivalDate = dateValue[1];
  // };

  // const checkIn = dateValue[0].toLocaleDateString();

  let departure;
  let arrival;

  if (departureDate) departure = formatDate(departureDate);
  if (arrivalDate) arrival = formatDate(arrivalDate);

  // dl
  const distributions = guestValue?.map((guest: any) => guest.adults + "-" + guest.children + "-" + childrenAges);
  const resultLink = urlBaseActivities + "&destination=" + selectedDestination?.id + "&departureDate=" + departure + "&arrivalDate=" + arrival + "&distribution=" + distributions.join("::") + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;


  const handleDate = (date: any) => {
    setDepartureDate(date);
    ref.current.click();
  };

  const handleOnInputChange = (event: any, locationType: string) => {
    switch (locationType) {
      case 'destination':
        if (event == '') setSelectedDestination(null);
        break;
      default:
        break;
    }
  };


  const selectInitialMonthForReturnDate = () => {
    let selectedDate = arrivalDate
    if(typeof arrivalDate == 'undefined') {return departureDate} 
    if(arrivalDate?.getTime() < departureDate?.getTime()){
      selectedDate = departureDate
    } 

    return selectedDate
  }

  // const renderGuest = () => {
  //   return (
  //     <div className="">
  //       <Popover className="relative">
  //         {({ open }) => (
  //           <>
  //             <Popover.Button
  //               className={`
  //          ${open ? "" : ""}
  //           px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
  //             >
  //               {/* <span>{`${guestAdultsInputValue !== 0 || guestChildrenInputValue !== 0 ? ( guestAdultsInputValue != 0 && guestAdultsInputValue + " Adults " + ( guestChildrenInputValue != 0 && guestChildrenInputValue + " Children " )) : " Travellers"}`}</span> */}
  //               <span className={localStorage.getItem('theme') === 'dark' ? 'text-[#fff]' : ''}>
  //                 {guestAdultsInputValue + " Adults "}
  //                 {guestChildrenInputValue + " Children "}
  //               </span>

  //               <ChevronDownIcon
  //                 className={`${open ? "" : "text-opacity-70"
  //                   } ${localStorage.getItem('theme') === 'dark' ?
  //                     'text-[#fff] ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150' :
  //                     'ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150'}`}
  //                 aria-hidden="true"
  //               />
  //             </Popover.Button>
  //             <Transition
  //               as={Fragment}
  //               enter="transition ease-out duration-200"
  //               enterFrom="opacity-0 translate-y-1"
  //               enterTo="opacity-100 translate-y-0"
  //               leave="transition ease-in duration-150"
  //               leaveFrom="opacity-100 translate-y-0"
  //               leaveTo="opacity-0 translate-y-1"
  //             >
  //               <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
  //                 <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
  //                   <div className="relative bg-white dark:bg-neutral-800 p-4">
  //                     <CInputNumber
  //                       className={localStorage.getItem('theme') === 'dark' ? "w-full text-[#fff]" : "w-full"}
  //                       defaultValue={guestAdultsInputValue}
  //                       onChange={(value) => setGuestAdultsInputValue(value)}
  //                       // max={4}
  //                       min={1}
  //                       label="Adults"
  //                     />

  //                     <CInputNumber
  //                       className={localStorage.getItem('theme') === 'dark' ? "w-full mt-6 text-[#fff]" : "w-full mt-6"}
  //                       defaultValue={guestChildrenInputValue}
  //                       onChange={value => setGuestChildrenInputValue(value)}
  //                       // max={4}
  //                       min={0}
  //                       label="Children"
  //                     />

  //                   </div>
  //                 </div>
  //               </Popover.Panel>
  //             </Transition>
  //           </>
  //         )}
  //       </Popover>
  //     </div>
  //   );
  // };

  // const renderSelectClass = () => {
  //   return (
  //     <div className="">
  //       <Popover className="relative">
  //         {({ open, close }) => (
  //           <>
  //             <Popover.Button
  //               className={`
  //          ${open ? "" : ""}
  //           px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
  //             >
  //               <span>{`${flightClassState}`}</span>
  //               <ChevronDownIcon
  //                 className={`${open ? "" : "text-opacity-70"
  //                   } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
  //                 aria-hidden="true"
  //               />
  //             </Popover.Button>
  //             <Transition
  //               as={Fragment}
  //               enter="transition ease-out duration-200"
  //               enterFrom="opacity-0 translate-y-1"
  //               enterTo="opacity-100 translate-y-0"
  //               leave="transition ease-in duration-150"
  //               leaveFrom="opacity-100 translate-y-0"
  //               leaveTo="opacity-0 translate-y-1"
  //             >
  //               <Popover.Panel className="absolute z-10 w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
  //                 <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
  //                   <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
  //                     {flightClass.map((item) => (
  //                       <a
  //                         key={item.name}
  //                         href={item.href}
  //                         onClick={(e) => {
  //                           e.preventDefault();
  //                           setFlightClassState(item.name);
  //                           close();
  //                         }}
  //                         className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
  //                       >
  //                         <p className="text-sm font-medium ">{item.name}</p>
  //                       </a>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </Popover.Panel>
  //             </Transition>
  //           </>
  //         )}
  //       </Popover>
  //     </div>
  //   );
  // };

  // TODO: add select flight class + guests
  const renderRadio = () => {
    return (
      <div className="h-[7.1vh] md:h-[34px] [ hero-field-padding ] md:py-0 md:mt-7 md:mb-5 md:pl-[68px]  flex flex-row space-x-5 flex-wrap">

        {/* {renderGuest()} */}
      </div>
    );
  };

  const RenderForm = () => {
    let history = useHistory()
    const useStyles = createStyles((theme) => ({
      calendarBase: {
        display: 'none',
      },
      root: {
        height: '100%',
        width: '100%'
      },
      input: {
        color: changeLighmode.mode === 'dark' ? '#fff' : '#000',
        fontSize: '14px',
        fontWeight: 400,
        paddingLeft: '1rem',
        paddingTop: '14px',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '72px',
        width: '100%',
        [`@media (max-width: 768px)`]: {
          fontSize: '12px',
          fontWeight: 400,
          paddingRight: '10px !important',
          height: '52px',
        },


        [`@media (max-width: 1280px)`]: {
          fontSize: '10px',
          fontWeight: 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          paddingRight: '10px !important',
          paddingLeft: '1rem !important',
        },
      },

      activeMonth: {
        color: 'white',
         backgroundColor: '#1c7ed6 !important'
      },
      activeYear: {
        color: 'white',
        backgroundColor: '#1c7ed6 !important'
      }


    }));
    const dispatch = useDispatch()
    const { classes } = useStyles();
    const StartDate = useRef<any>();
    const [counter, setCounter] = useState<any>(0)
    const FromClicking = () => {
      setCounter(counter + 1);
      if (counter > 1) {
        setCounter(1);
      }
    }
    return (
      <div className={`w-[100%] ${wrapperClassNames}`}
      //  style={{ position: `${history.location.pathname == '/activities' ? 'absolute' : 'relative'}`, bottom: `${history.location.pathname == '/activities' ? '0' : 'auto'}` }}
      >
        <form className={`w-full max-h-full md:h-[200px] ${roundedTopLeft} rounded-tr-xl relative md:py-[1px] bg-white ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'}`}>
          {renderRadio()}
          <div className="h-auto md:h-[50%] w-full flex flex-col md:flex-row space-x-0 sm:space-x-0 lg:space-x-0 rounded-full [ nc-divide-field ] ">
            <div className=" flex flex-col md:flex-row w-full md:px-2 lg:px-11  space-x-0 sm:space-x-0 lg:space-x-0 rounded-full [ nc-divide-field ] h-[100%]">
              <div className={`w-full md:h-[72px] flex justify-between flex-col md:flex-row px-5 md:px-0`}>
                {/* Line:315 */}
                <div onClick={() => FromClicking()} className={`cursor-pointer w-full flex h-[54px] md:h-[72px] relative mb-2 md:mb-0 border ${errors.destination && (!selectedDestination || selectedDestination == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl`}>
                  {errors.destination && (!selectedDestination || selectedDestination == '') &&
                    <div className={`absolute translate-y-16 top-0 right-0`}>
                      <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                        <div className="translate-x-[9.5vw] -translate-y-3">
                          <div className="arrow-up"></div>
                        </div>
                        <div className="w-[10%] flex items-center mx-1">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                            <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                          </svg>
                        </div>
                        <div className="w-[90%] text-[13px] text-[#fff] flex items-center">
                          {errors.destination}
                        </div>
                      </div>

                    </div>}
                  <div className="mt-[0.3vh] text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 md:px-5 pt-2 md:pt-3">{t('WHERE')}</div>
                  <div className="absolute w-[100%] h-[100%] top-1 flex items-center">
                    <LocationInput
                      tripType="ONLY_TICKET"
                      iconcolor={errors.destination ? '#FF2424' : '#AFB3E0'}
                      defaultValue=''
                      onChange={(e) => setPickUpInputValue(e)}
                      onInputDone={() => setFieldFocused("dropOffInput")}
                      onDestination={(selectedDestination: any) => {setSelectedDestination(selectedDestination); StartDate.current?.click()} }
                      placeHolder=" "
                      desc=""
                      manualFocus={counter}
                      inputClassNames='md:!translate-y-[6px] lg:!translate-y-0 md:!translate-x-[6px]'
                      onInputChange={(event: any) => handleOnInputChange(event, 'destination')}
                    />
                    {/* {errors.destination && <span className="text-[9px] text-red-900"> {errors.destination} </span>} */}
                  </div>
                </div>
                {/* <div className="w-full flex h-[54px] md:h-[72px] relative mb-2 md:mb-0 md:mx-2 border border-[#AFB3E0] rounded-2xl">
                  <div className="mt-[0.3vh] text-sm text-[#000] dark:text-[#fff] font-semibold px-4 md:px-5 pt-2">To</div>
                  <div className="absolute w-[100%] h-[100%] top-1 flex items-center">
                    <LocationInput
                      tripType="ONLY_TICKET"
                      defaultValue={dropOffInputValue}
                      onChange={(e) => setDropOffInputValue(e)}
                      onInputDone={() => {}}
                      onDestination={()=>{}}
                      placeHolder=" "
                      desc=""
                      
                    />
                  </div>
                </div> */}

                <div className={`relative cursor-pointer w-full flex h-[54px] md:h-[72px] justify-end mb-2 md:mb-0 md:ml-[.5vw] border ${errors.date && (!departureDate || departureDate == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl`}>
                  <div className="w-full h-full absolute top-0 left-0 cursor-pointer">
                    {errors.date && (!departureDate || departureDate == '') &&
                      <div className={`absolute translate-x-10 translate-y-16 top-0 right-0`}>
                        <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                          <div className="translate-x-[8.2vw] -translate-y-3">
                            <div className="arrow-up"></div>
                          </div>
                          <div className="w-[10%] flex items-center mx-1">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                              <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                            </svg>
                          </div>
                          <div className="w-[90%] text-[13px] text-[#fff] flex items-center">
                            {errors.date}
                          </div>
                        </div>

                      </div>}
                    <div className="mt-[0.3vh] text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 md:px-5 pt-2 md:pt-3">{t('START_DATE')}</div>
                    <div className="w-[100%] h-[100%] absolute top-0" onClick={() => dispatch({ type: TYPES.TRAVELLERS, payload: { status: false } })}>
                      <DatePicker
                        placeholder={t("SELECT_DATE")}
                        onChange={(date: any) => handleDate(date)}
                        size="lg"
                        radius={10}
                        amountOfMonths={isMobile ? 1 : 2}
                        dropdownType={"popover"}
                        minDate={dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                        classNames={{
                          input: classes.input,
                          root: classes.root,
                          monthPickerControlActive: classes.activeMonth,
                          yearPickerControlActive: classes.activeYear,
                          calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase
                        }}
                        ref={StartDate}
                        // @ts-ignore
                        dayStyle={(date) => {
                          // TODO: on cursor hover date, set range background color
                         
                          if (arrivalDate && formatDate(date) === formatDate(arrivalDate)) return { backgroundColor: '#0084ee', color: 'white' }
                          if (date > departureDate && date < arrivalDate) {
                            return { backgroundColor: '#E7F5FF', color: 'black' }
                          };
                        }
                        }

                      />
                      {/* {errors.date && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}
                    </div>
                  </div>
                  <div className="flex items-end h-[70%] px-4"><i className={`${errors.date && (!departureDate || departureDate == '') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}  fa fa-calendar`} aria-hidden="true"></i></div>
                </div>
                <div onClick={() => {
                 // ref.current?.click();
                  dispatch({ type: TYPES.TRAVELLERS, payload: { status: false } })
                }} className={`relative cursor-pointer w-full flex h-[54px] md:h-[72px] justify-end mb-2 md:mb-0 md:ml-[.5vw] border ${errors._date && (!arrivalDate || arrivalDate == '' || errors.type == 'comparison') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl`}>
                  <div className="w-[100%] h-[100%] absolute top-0 left-0 cursor-pointer" >
                    {errors._date && (!arrivalDate || arrivalDate == '' || errors.type == 'comparison') &&
                      <div className={`absolute translate-x-11 translate-y-16 top-0 right-0 z-[12]`}>
                        <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                          <div className="translate-x-[8.0vw] -translate-y-3">
                            <div className="arrow-up"></div>
                          </div>
                          <div className="w-[10%] flex items-center mx-1">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                              <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                            </svg>
                          </div>
                          <div className="w-[90%] text-[13px] text-[#fff] flex items-center">
                            {errors._date}
                          </div>
                        </div>

                      </div>}
                    <div className="mt-[0.3vh] text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 md:px-5 pt-2">{t("RETURN_DATE")}</div>
                    <div className="w-[100%] h-[100%] absolute top-0 flex items-center">
                      <DatePicker
                        value={arrivalDate}
                        placeholder={t('SELECT_DATE')}
                        onChange={(date: any) => setArrivalDate(date)}
                        size="lg"
                        zIndex={!TravellersEvent || TravellersEvent == undefined ? 10000 : -10000}
                        radius={10}
                        amountOfMonths={isMobile ? 1 : 2}
                        dropdownType={"popover"}
                        // initialMonth={departureDate && departureDate}
                        initialMonth={selectInitialMonthForReturnDate()}
                        minDate={(departureDate && dayjs(new Date(departureDate)).startOf('month').add(departureDate?.getDate() - 1, 'days').toDate()) ?? dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                        // @ts-ignore
                        dayStyle={(date) => {
                          // TODO: on cursor hover date, set range background color
                          if (departureDate && formatDate(date) === formatDate(departureDate)) return { backgroundColor: '#0084ee', color: 'white' }
                          if (date > departureDate && date < arrivalDate) {
                            return { backgroundColor: '#E7F5FF', color: 'black' }
                          };
                        }
                        }
                        ref={ref}
                        classNames={{
                          input: classes.input,
                          root: classes.root,
                          monthPickerControlActive: classes.activeMonth,
                          yearPickerControlActive: classes.activeYear,
                          calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase

                        }}
                      />
                      {/* {errors._date && <span className="text-[9px] text-red-900"> {errors._date} </span>} */}
                    </div>
                  </div>
                  <div className="flex items-end h-[70%] px-4"><i className={`${errors._date && (!arrivalDate || arrivalDate == '' || errors.type == 'comparison') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}  fa fa-calendar`} aria-hidden="true"></i></div>
                </div>
                <div className="w-full h-[54px] md:h-[72px] md:ml-[.5vw] mb-2 md:mb-0 border border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff] rounded-2xl cursor-pointer z-[11]" >
                  <GuestsInput
                    type="activities"
                    onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                    // defaultValue={guestValue}
                    onChange={(data) => setGuestValue(data)}
                  />
                  {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
                </div>
                <div className={`h-[100%] md:m-0 flex justify-end items-center md:ml-2`}>
                  <SearchButton
                    link={resultLink}
                    passengers={guestValue}
                    type="activities"
                    date={departureDate}
                    _date={arrivalDate}
                    classNames='!w-full md:!w-[74px] !h-[54px] md:!h-[72px]'
                    onErrors={(errors: any) => setErrors(errors)}
                    destination={selectedDestination}
                  />
                </div>
              </div>

            </div>

          </div>
          <TermsOfServiceText wrapperClassNames="md:-translate-y-[90%] px-5" />
        </form>

      </div>
    );
  };

  return RenderForm();
};

export default ActivitiesSearchForm;
