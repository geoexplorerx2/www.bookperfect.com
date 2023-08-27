import React, { useEffect, useRef, useState } from "react";
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
import { createStyles } from "@mantine/core";
import dayjs from 'dayjs';
import BASE_URL_HOME from "../../api/env";
import { formatDate } from "../../common/formatDate";
import { useHistory } from 'react-router-dom'
import GuestsInput from "./GuestsInput";
import useWindowSize from "../../hooks/useWindowSize";
import NationalityPicker from "../NationalityPicker/NationalityPicker";
import { useSelector } from "react-redux";
import TYPES from "../../types/store";
import { useDispatch } from "react-redux";
import TermsOfServiceText from "../TermsOfServiceText/TermsOfServiceText";
import { useTranslation } from "react-i18next";
// 1 ::

export const urlBaseFlightHotel = BASE_URL_HOME + "/home?directSubmit=true&tripType=FLIGHT_HOTEL";

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

export interface FlightsHotelsSearchFormProps {
  radioHeight?: string;
  roundedTopLeft?: string;
  customStyle?: any;
  wrapperClassName?: string;
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
  },
];

const FlightsHotelsSearchForm: FC<FlightsHotelsSearchFormProps> = (props) => {

  const { radioHeight, roundedTopLeft, customStyle, wrapperClassName, searchcardplace } = props
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const lightmode: any = useSelector((state: any) => state.LightMode.mode);
  const TravellersEvent: any = useSelector((state: any) => state.TravellersReducer.status);
  // 2 ::
  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<"dropOffInput" | null
  >(null);

  const [flightClassState, setFlightClassState] = useState("Economy");

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);

  const [selectedDestination, setSelectedDestination] = useState<any>();
  const [selectedDeparture, setSelectedDeparture] = useState<any>();
  const [departureDate, setDepartureDate] = useState<any>();
  const [arrivalDate, setArrivalDate] = useState<any>();
  const [guestValue, setGuestValue] = useState<any>([]);
  const [sourceMarket, setSourceMarket] = useState<any>('UK');
  const [childrenAges, setChildrenAges] = useState();
  const [errors, setErrors] = useState<any>({});
// @ts-ignore
const {t} = useTranslation()

  // determine if we are on the mobile
  const [isMobile, setIsMobile] = useState<boolean>();
  const windowSize = useWindowSize();

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
  },
    [windowSize])

    useEffect(()=> {
      
      if(errors?.type === "comparison" && arrivalDate?.getTime() > departureDate?.getTime()){
        setErrors([])
      }
  
  } ,
  [departureDate ,arrivalDate])



  const StartDate = useRef<any>();
  const [toCounterClick, setToCounterClick] = useState<any>(0)
  const [counter, setCounter] = useState<any>(0)
  const FromClicking = () => {
    setToCounterClick(0);
    setCounter(counter + 1);
    if (counter > 1) {
      setCounter(1);
    }
  }
  const ToClicking = (row: any) => {
    setToCounterClick(toCounterClick + 1)
    if (toCounterClick > 1) {
      setToCounterClick(1)
    }
  }

  const myStyles = createStyles((theme) => ({
    calendarBase: {
      display: 'none',
    },
    root: {
    width: '100%'
  },
    input: {
      color: lightmode === 'dark' ? '#fff' : '#000',
      backgroundColor: 'transparent',
      paddingTop: '1rem',
      fontSize: '14px',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '72px',
      width: '100%',
      
      [`@media (max-width: 768px)`]: {
        fontSize: '12px',
        fontWeight: 400,
        paddingRight: '10px !important',
        paddingTop: '20px',
        height: '52px'
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




  }))
  // 4 ::
  const dispatch = useDispatch()

  let departure;
  let arrival;
  require('../../css/mantine-mrt426-block.css')
  if (departureDate) {

    departure = formatDate(departureDate);
  }
  if (arrivalDate) arrival = formatDate(arrivalDate);

  // function Delta(){

  //       $('.mantine-mrt426').css('display','none')
  // }
  // Delta();

  const ref = useRef<any>();

  // dl
  const distributions = guestValue?.map((guest: any) => guest.adults + "-" + guest.children + "-" + childrenAges);
  const resultLink = urlBaseFlightHotel + "&destination=" + selectedDestination?.id + "&departure=" + selectedDeparture?.id + "&departureDate=" + departure + "&arrivalDate=" + arrival + "&distribution=" + distributions.join("::") + "&businessCabin=" + (flightClassState == 'Business' ? "true" : "false") + "&lang=" + activeLang.toUpperCase() + "&sourceMarket=" + sourceMarket + "&displayCurrency=" + activeCurrency;


  const handleDate = (date: any) => {
    setDepartureDate(date);
    ref.current.click();
  };


  const selectInitialMonthForReturnDate = () => {
    let selectedDate = arrivalDate
    if(typeof arrivalDate == 'undefined') {return departureDate} 
    if(arrivalDate?.getTime() < departureDate?.getTime()){
      selectedDate = departureDate
    } 

    return selectedDate
  }


  const handleOnInputChange = (event: any, locationType: string) => {
    switch (locationType) {
      case 'departure':
        if (event == '') setSelectedDeparture(null);
        break;
      case 'destination':
        if (event == '') setSelectedDestination(null);
        break;
      default:
        break;
    }
  };

  const renderGuest = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >
                {/* <span>{`${guestAdultsInputValue !== 0 || guestChildrenInputValue !== 0 ? ( guestAdultsInputValue != 0 && guestAdultsInputValue + " Adults " + ( guestChildrenInputValue != 0 && guestChildrenInputValue + " Children " )) : " Travellers"}`}</span> */}
                <span className={localStorage.getItem('theme') === 'dark' ? 'text-[#fff]' : ''}>
                  {guestAdultsInputValue + " Adults "}
                  {guestChildrenInputValue + " Children "}
                </span>

                <ChevronDownIcon
                  className={`${open ? "" : "text-opacity-70"
                    } ${localStorage.getItem('theme') === 'dark' ?
                      'ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150 text-[#fff]' :
                      'ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150'}`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                  <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                    <div className="relative bg-white dark:bg-neutral-800 p-4">
                      <CInputNumber
                        className={localStorage.getItem('theme') === 'dark' ? "w-full text-[#fff]" : "w-full"}
                        defaultValue={guestAdultsInputValue}
                        onChange={(value) => setGuestAdultsInputValue(value)}
                        // max={4}
                        min={1}
                        label="Adults"
                      />

                      <CInputNumber
                        className={localStorage.getItem('theme') === 'dark' ? "text-[#fff] w-full mt-6" : "w-full mt-6"}
                        defaultValue={guestChildrenInputValue}
                        onChange={value => setGuestChildrenInputValue(value)}
                        // max={4}
                        min={0}
                        label="Children"
                      />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  };

  const renderSelectClass = () => {
    return (
      <div className="bg-transparent">
        <Popover className="relative flex flex-col sm:flex-row items-start sm:items-center ">
          {({ open, close }) => (
            <>
              <div className="w-12 inline-flex translate-y-[2px] translate-x-[5px] justify-between text-xs text-[#15173F] dark:text-white mr-3 font-normal md:font-semibold mb-2 sm:mb-0">
                <span>Class&nbsp;:&nbsp;</span>
              </div>
              <Popover.Button
                className={`
           ${open ? "" : ""}
           h-[34px] md:h-auto min-w-[136px] md:m-w-[unset] px-4 py-1.5 rounded-lg md:rounded-[20px] bg-[#F4F8FF] md:bg-white dark:bg-transparent border border:[#CBDEFF] md:border-transparent inline-flex items-center font-normal hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >

                <span className={`text-xs md:text-sm font-medium md:font-normal  translate-y-[2px] 
                ${localStorage.getItem('theme') === 'dark' ? "text-[#fff] -translate-x-[13px]" : "-translate-x-[13px]"}`}>{`${flightClassState}`}</span>
                <ChevronDownIcon
                  className={`${open ? "" : "text-opacity-70"
                    } ${localStorage.getItem('theme') === 'dark' ?
                      'text-[#fff] ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150 translate-x-[-12px]  translate-y-[2px]' :
                      'ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150 translate-x-[-12px] translate-y-[2px]'}`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                  <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                      {flightClass.map((item) => (
                        <a

                          key={item.name}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setFlightClassState(item.name);
                            close();
                          }}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <p className={localStorage.getItem('theme') === 'dark' ? "text-[#fff] text-sm font-medium" : "text-sm font-medium"}>{item.name}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  };

  // TODO: add select flight class + guests
  const RenderRadio = () => {
    let history = useHistory()
    return (
      <div className={`${history.location.pathname == '/flights-hotels' ? 'md:px-16 md:mt-7 md:mb-5' : ''} [ hero-field-padding ] md:pl-16 md:pr-7 justify-between md:mt-7 md:mb-5 px-5 md:px-0 py-3 md:max-h-[34px] md:py-0 bg-[#FFF9F9] md:bg-transparent dark:bg-transparent flex flex-row space-x-5 flex-nowrap md:flex-wrap`}>
        {renderSelectClass()}

        <div className="nationality_wrapper z-50 flex sm:items-center flex-col items-start sm:flex-row  max-h-[98%] !ml-0 -translate-y-[3px]">
          {/* <div className="h-[100%] flex items-center pt-2 md:pt-0"><span className={`text-xs text-[#000] dark:text-[#fff] md:font-semibold mb-[5px] md:mb-0`}>Nationality&nbsp;:&nbsp;</span></div> */}
          {/* <NationalityPicker
            styles="px-3 py-2 rounded-lg"
            spanText="Select a nationality"
            typeSize='text-xs'
            onNationalityChanged={(nationality: any) => { setSourceMarket(nationality.cca2) }}
          /> */}
        </div>
        {/* {renderGuest()} */}

      </div>
    );
  };

  const RenderForm = () => {
    const { classes } = myStyles()
    let history = useHistory()
    const [toCounterClick, setToCounterClick] = useState<any>(0)
    const [counter, setCounter] = useState<any>(0)
    const FromClicking = () => {
      setToCounterClick(0);
      setCounter(counter + 1);
      if (counter > 1) {
        setCounter(1);
      }
    }
    const ToClicking = (row: any) => {
      setToCounterClick(toCounterClick + 1)
      if (toCounterClick > 1) {
        setToCounterClick(1)
      }
    }
    const StartDate = useRef<any>();
    return (
      <div className={`w-full relative z-0 ${wrapperClassName}`}
      // style={{ position: `${history.location.pathname == '/flights-hotels' ? 'absolute' : 'relative'}`, bottom: `${history.location.pathname == '/flights-hotels' ? '0' : 'auto'}` }}
      >
        <form className={`w-full ${roundedTopLeft} ${radioHeight} md:!py-[1px] rounded-tr-xl relative bg-white ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'} max-h-[100%] md:h-[200px]`}>
          {RenderRadio()}

          <div className="relative z-[1] md:h-[50%] mt-[14px] md:mt-0 px-5 md:px-2 lg:px-11 flex flex-col md:flex-row w-full  space-x-0 sm:space-x-0 lg:space-x-0 rounded-full [ nc-divide-field ] max-w-[100%]">
            <div className=" flex flex-col md:flex-row w-full  space-x-0 sm:space-x-0 lg:space-x-0 rounded-full [ nc-divide-field ] h-[100%]">
              <div className={`w-[100%] h-auto md:h-[72px] flex flex-col md:flex-row justify-between items-center md:pr-2 `}>

                <div onClick={() => FromClicking()} className={`cursor-pointer w-full h-[54px] md:h-[100%] mt-2 md:mt-0 relative border ${errors.departure && (!selectedDeparture || selectedDeparture == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl`}>
                  {errors.departure && (!selectedDeparture || selectedDeparture == '') &&
                    <div className={`absolute translate-y-16 top-0 right-0`}>
                      <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                        <div className="translate-x-[9.1vw] -translate-y-3">
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
                          {errors.departure}
                        </div>
                      </div>

                    </div>}
                  <div className="mt-[0.3vh] text-xs xl:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 relative top-[20px] md:top-3 -translate-y-full md:translate-y-0">{t('FROM')}</div>
                  <div className="absolute w-[100%] h-[100%] top-1 flex items-center">
                    <LocationInput
                      tripType="FLIGHT_HOTEL"
                      iconcolor={errors.departure && (!selectedDeparture || selectedDeparture == '') ? '#FF2424' : '#AFB3E0'}
                      defaultValue=''
                      onChange={(e) => setPickUpInputValue(e)}
                      onInputDone={() => setFieldFocused("dropOffInput")}
                      onDestination={(selectedDeparture: any) => setSelectedDeparture(selectedDeparture)}
                      placeHolder=" "
                      // manualFocus={counter}
                      desc=""
                      inputClassNames='md:!translate-y-[6px] lg:!translate-y-0'
                      onInputChange={(event: any) => handleOnInputChange(event, 'departure')}
                     
                    />
                    {/* {errors.departure && <span className="text-[9px] text-red-900"> {errors.departure} </span>} */}
                  </div>
                </div>

                {/* Line : 390 */}
                <div onClick={() => ToClicking('focus')} className={`cursor-pointer w-full h-[54px] md:h-[100%] mt-2 md:mt-0 relative mx-0 md:ml-[.5vw] border ${errors.destination && (!selectedDestination || selectedDestination == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl`}>
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
                  <div className="mt-[0.3vh] text-xs xl:text-sm text-[#000] dark:text-[#fff] font-semibold px-4
                                  relative top-[20px] md:top-3 -translate-y-full md:translate-y-0
                  ">{t('TO')}</div>
                  <div className="absolute w-[100%] h-[100%] top-1 flex items-center">
                    <LocationInput
                      tripType="FLIGHT_HOTEL"
                      iconcolor={errors.destination && (!selectedDestination || selectedDestination == '') ? '#FF2424' : '#AFB3E0'}
                      defaultValue=''
                      onChange={(e) => setDropOffInputValue(e)}
                      onInputDone={() => setFieldFocused(null)}
                      onDestination={(selectedDestination: any) => {setSelectedDestination(selectedDestination); StartDate.current?.click()}}
                      placeHolder=" "
                      desc=""
                      autoFocus={fieldFocused === "dropOffInput"}
                      // manualFocus={toCounterClick}
                      inputClassNames='md:!translate-y-[6px] lg:!translate-y-0'
                      onInputChange={(event: any) => handleOnInputChange(event, 'destination')}
                    
                    />
                    {/* {errors.destination && <span className="text-[9px] text-red-900"> {errors.destination} </span>} */}
                  </div>
                </div>

                <div className={`relative cursor-pointer w-full h-[54px] md:h-[100%] mt-2 md:mt-0 ml-0 md:ml-[.5vw] flex justify-end border  ${errors.date && (!departureDate || departureDate == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl overflow-hidden`}>
                  <div className="w-full h-full absolute top-0 left-0" onClick={() => dispatch({ type: TYPES.TRAVELLERS, payload: { status: false } })}>
                    <div className="mt-[0.3vh] text-xs xl:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 
                                    relative top-1/2 md:top-3 -translate-y-full md:translate-y-0 whitespace-nowrap
                    ">{t("START_DATE")}</div>
                    {errors.date && (!departureDate || departureDate == '') &&
                      <div className={`absolute translate-y-16 translate-x-11 top-0 right-0`}>
                        <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                          <div className="translate-x-[8vw] -translate-y-3">
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
                    <div className="w-[100%] h-[100%] absolute top-0 left-0">
                      <DatePicker
                        placeholder="Select Date"
                        dropdownType={'popover'}
                        onChange={(date: any) => handleDate(date)}
                        amountOfMonths={isMobile ? 1 : 2}
                        zIndex={!TravellersEvent || TravellersEvent == undefined ? 10000 : -10000}
                        size="sm"
                        radius={10}
                        minDate={dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                        classNames={{
                          input: classes.input,
                          root: classes.root ,
                          monthPickerControlActive: classes.activeMonth,
                          yearPickerControlActive: classes.activeYear,
                          calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase
                        }}
                        ref={StartDate}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
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
                      {/* {errors.date. && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}
                    </div>
                  </div>
                  <div className="flex items-end h-[70%] px-4"><i className={`${errors.date && (!departureDate || departureDate == '') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}  fa fa-calendar`} aria-hidden="true"></i></div>
                </div>
                {/* 5 :: */}
                <div onClick={() => {
                  dispatch({ type: TYPES.TRAVELLERS, payload: { status: false } });
                  // ref.current?.click();
                }} className={`relative cursor-pointer w-full h-[54px]  md:h-[100%] mt-2 md:mt-0 flex justify-end ml-0 md:ml-[0.5vw] border ${errors._date && (!arrivalDate || arrivalDate == '' || errors.type == 'comparison') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl`}>

                  <div className="w-full h-full absolute top-0 left-0 cursor-pointer" >
                    {errors._date && (!arrivalDate || arrivalDate == '' || errors.type == 'comparison') &&
                      <div className={`absolute translate-x-11 translate-y-16 top-0 right-0 z-[12]`}>
                        <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                          <div className="translate-x-[8vw] -translate-y-3">
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
                    <div className="mt-[0.3vh] text-xs xl:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 
                                    relative top-1/2 md:top-3 -translate-y-full md:translate-y-0 whitespace-nowrap"
                    >{t("RETURN_DATE")}</div>
                    <div className="w-full h-full absolute top-0 left-0 ">
                      <DatePicker
                        placeholder="Select Date"
                        dropdownType={'popover'}
                        onChange={(date: any) => setArrivalDate(date)}
                        size="sm"
                        zIndex={!TravellersEvent || TravellersEvent == undefined ? 10000 : -10000}
                        amountOfMonths={isMobile ? 1 : 2}
                        radius={10}
                        ref={ref}
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
                        classNames={{
                          input: classes.input,
                          root: classes.root ,
                          monthPickerControlActive: classes.activeMonth,
                          yearPickerControlActive: classes.activeYear,
                          calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase

                        }}
                        // @ts-ignore
                        dayStyle={(date) => {
                          if (departureDate && formatDate(date) === formatDate(departureDate)) return { backgroundColor: '#0084ee', color: 'white' }
                          if (date > departureDate && arrivalDate && date < arrivalDate) {
                            return { backgroundColor: '#E7F5FF', color: 'black' };
                          }
                        }

                        }
                      />
                      {/* {errors._date && <span className="text-[9px] text-red-900"> {errors._date} </span>} */}
                    </div>
                  </div>
                  <div className="flex items-end h-[70%] px-4"><i className={`${errors._date ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}  fa fa-calendar`} aria-hidden="true"></i></div>
                </div>
                <div className="w-full h-[54px] md:h-[100%] ml-0 md:ml-[.5vw] mt-2 md:mt-0 border border-[#AFB3E0] rounded-2xl cursor-pointer z-[11] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]">
                  <GuestsInput
                    type="flighthotel"
                    onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                    // defaultValue={guestValue}
                    onChange={(data) => setGuestValue(data)}
                  />
                  {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
                </div>
              </div>
            </div>
            <div className={`flex items-center justify-center h-[93%] md:h-[72px] !mt-2 md:!mt-0 px-0 ${history.location.pathname == '/flights-hotels' ? 'mt-[0.5vh]' : 'mt-[0.1vh]'}`}>
              <SearchButton
                link={resultLink}
                passengers={guestValue}
                type="flighthotel"
                date={departureDate}
                _date={arrivalDate}
                classNames='!w-full md:!w-[74px] !h-[54px] md:!h-[72px]'
                onErrors={(errors: any) => setErrors(errors)}
                destination={selectedDestination}
                departure={selectedDeparture}
              />
            </div>
          </div>
          <TermsOfServiceText wrapperClassNames="my-3 md:my-0 px-5 md:-translate-y-full mt-[16px]" />
        </form>
      </div>
    );
  };

  return RenderForm();
};

export default FlightsHotelsSearchForm;
