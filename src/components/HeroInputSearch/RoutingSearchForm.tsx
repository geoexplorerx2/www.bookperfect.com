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
import FloatingInput from "../HeroSearch/FloatingInput";
import styled, { css } from "styled-components";
import GuestsInput from "./GuestsInput";
import { Chip, Chips } from "@mantine/core";
import dayjs from 'dayjs';
import BASE_URL_HOME from "../../api/env";
import { formatDate } from "../../common/formatDate";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { createStyles } from "@mantine/core";
import useWindowSize from "../../hooks/useWindowSize";
import TYPES from "../../types/store";
import TermsOfServiceText from "../TermsOfServiceText/TermsOfServiceText";
export const urlBaseRouting = BASE_URL_HOME + "/home?directSubmit=true&tripType=ROUTING";

const DriverClassWrapper = styled.div`
font-family: Poppins;
font-size: 12px;
font-weight: 400;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
`;


export interface TimeRage {
  startTime: string;
  endTime: string;
};

export interface RoutingSearchFormProps {
  roundedTopLeft?: string;
  customStyle?: any;
  flightAndCarWrapperClassNames?: string,
  onlyCarWrapperClassNames?: string,
  withMyCarWrapperClassNames?: string,
  searchcardplace?: string,
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

const RoutingSearchForm: FC<RoutingSearchFormProps> = (props) => {

  const { roundedTopLeft, customStyle, flightAndCarWrapperClassNames, onlyCarWrapperClassNames, withMyCarWrapperClassNames, searchcardplace } = props

  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const changeLighmode = useSelector((state: any) => state.LightMode);
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<"dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "FLIGHT_PLUS_CAR" | "ONLY_RENT_CAR" | "OWN_CAR" | ""
  >("ONLY_RENT_CAR");
  const [flightClassState, setFlightClassState] = useState("Economy");
  const [selectedDestination, setSelectedDestination] = useState<any>();
  const [selectedDeparture, setSelectedDeparture] = useState<any>();

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [value, setValue] = useState();
  const [guestValue, setGuestValue] = useState<any>([]);
  const [departureDate, setDepartureDate] = useState<any>();
  const [changTab, setChangTab] = useState<any>('onlyCar');
  const [childrenAges, setChildrenAges] = useState();
  const [checked, setChecked] = useState(true);
  const [errors, setErrors] = useState<any>({});
  const [isMobile, setIsMobile] = useState(false);
  const TravellersEvent: any = useSelector((state: any) => state.TravellersReducer.status);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const startDate = useRef<any>();
  
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

  let departure;
  let arrival;

  if (departureDate) departure = formatDate(departureDate);

  // "&arrivalDate=" +arrival+
  // dl
  const distributions = guestValue?.map((guest: any) => guest.adults + "-" + guest.children + "-" + childrenAges);
  const resultLink = urlBaseRouting + "&routingType=" + dropOffLocationType + "&destination=" + (selectedDestination?.id || selectedDeparture?.id) + "&departure=" + (selectedDeparture?.id || "") + "&departureDate=" + departure + "&distribution=" + distributions.join("::") + "&lang=EN";

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

  useEffect(() => {
    if (selectedDeparture) setSelectedDeparture('');
    if (selectedDestination) setSelectedDestination('');
    if (departureDate) setDepartureDate(null);
  }, [changTab]);

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
                    } ${localStorage.getItem('theme') === 'dark' ? 'text-[#fff] ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150' :
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
                      {/* <CInputNumber
                        className="w-full"
                        onChange={(e) => setGuests(e)}
                        min={1}
                        label="Rooms"
                        defaultValue={guests}
                        max={20}
                      /> */}
                      {/* <CInputNumber
                        className="w-full"
                        defaultValue={guestRoomsInputValue}
                        onChange={value => setGuestRoomsInputValue(value)}
                        label="Rooms"
                      /> */}
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
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <div className="w-12 inline-flex justify-between text-xs text-[#15173F] dark:text-white mr-3 font-normal">
                <span>Class</span>
                <span>:</span>
              </div>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-[20px] bg-white dark:bg-transparent border border-[#EEDAD8] inline-flex items-center font-normal hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >

                <span className={localStorage.getItem('theme') === 'dark' ? "text-[#fff] text-sm font-normal" : "text-sm md:text-xs lg:text-sm font-normal "}>{`${flightClassState}`}</span>
                <ChevronDownIcon
                  className={`${open ? "" : "text-opacity-70"
                    } ${localStorage.getItem('theme') === 'dark' ?
                      'text-[#fff] ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150' :
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

  const renderRadio = () => {
    return (
      <div className="py-5 [ hero-field-padding ] flex flex-row space-x-3 flex-wrap">

        <Chips multiple={false} value={dropOffLocationType} variant="filled">
          <Chip value="ONLY_RENT_CAR" onClick={(e) => setDropOffLocationType("ONLY_RENT_CAR")}>Only rent a car</Chip>
          <Chip value="FLIGHT_PLUS_CAR" onClick={(e) => setDropOffLocationType("FLIGHT_PLUS_CAR")}>Flight and rent a car</Chip>
          <Chip value="OWN_CAR" onClick={(e) => setDropOffLocationType("OWN_CAR")}>With my car</Chip>
        </Chips>

        <div className="" style={{ marginLeft: "100px" }}>
          {renderSelectClass()}
        </div>
        <div>
          {renderGuest()}
        </div>
        {/* </div> */}
      </div>
    );
  };

  const [toCounterClick, setToCounterClick] = useState<any>(0);
  const [counter, setCounter] = useState<any>(0);

  const FromClicking = () => {
    setToCounterClick(0);
    setCounter(counter + 1);
    if (counter > 1) {
      setCounter(1);
    }
  };

  const ToClicking = (row: any) => {
    setToCounterClick(toCounterClick + 1)
    if (toCounterClick > 1) {
      setToCounterClick(1)
    }
  };
  
  const OnlyCar = () => {

    let history = useHistory()
    const useStyles = createStyles((theme) => ({
      calendarBase: {
        display: 'none',
      },
      input: {
        color: changeLighmode.mode === 'dark' ? '#fff' : '#000',
        fontSize: '14px',
        paddingLeft: '0px',
        [`@media (max-width: 768px)`]: {
          fontSize: '12px',
          fontWeight: 400,
          paddingRight: '10px !important',
          transform: 'translate(0px, 2px) !important',

        },


        [`@media (max-width: 1280px)`]: {
          fontSize: '10px',
          fontWeight: 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          paddingRight: '10px !important',
          paddingLeft: '2px !important',
          transform: 'translate(0px, 2px)',



        },
      }
    }));
    const { classes } = useStyles();

    return (
      // <div className="w-[100%] h-[100%] realative">
      <div className={`w-[100%] md:h-[200px] ${onlyCarWrapperClassNames} relative
        `}
        style={{ borderTopLeftRadius: history.location.pathname == '/routing' ? '16px' : '0' }}>
        <form className={`w-[100%] h-[100%] bg-white ${roundedTopLeft} ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'} rounded-tr-xl md:py-[1px] ${history.location.pathname == '/routing' ? 'rounded-tl-xl' : ' '}`}>
          <div className="w-[100%] flex flex-col md:flex-row justify-between py-3 md:py-0 mb-[0.7vh] md:mt-7 md:mb-[20px] md:h-[34px] px-5 md:px-2 lg:px-11">
            <div className="flex flex-1 flex-col md:flex-row mb-3 md:mb-0">
              <div className="flex items-center md:mx-2 p-3 bg-[#F4F8FF] dark:bg-opacity-10 rounded-[30px]">

                <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'onlyCar' ? true : false} onClick={() => setChangTab('onlyCar')} /></div>
                <div className="text-[10px] lg:text-[.7vw] whitespace-nowrap text-[#000] dark:text-[#fff] mt-[2px] mr-2 ">Only rent a Car</div>
              </div>

              <div className="flex items-center p-3">
                <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'FlightCar' ? true : false} onClick={() => setChangTab('FlightCar')} /></div>
                <div className="text-[10px]  lg:text-[.7vw] whitespace-nowrap text-[#000] dark:text-[#fff] mt-[3px] mr-2">Flight and rent a Car</div>
              </div>

              <div className="flex items-center p-3">
                <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'withmycar' ? true : false} onClick={() => setChangTab('withmycar')} /></div>
                <div className="text-[10px] lg:text-[.7vw] whitespace-nowrap text-[#000] dark:text-[#fff] mt-[2px] mr-2">With my Car</div>
              </div>

            </div>
            {/* <div className="flex-1 flex justify-center"> */}
            {/* <div className="text-sm text-[#000] dark:text-[#fff] pt-[0.3vh]">Class  :</div>
                <div>{renderSelectClass()}</div> */}
            {/* </div> */}
            <div className="flex-1 flex justify-start md:justify-end" >
              {
                checked ? '' : <div className="w-[15%]  px-3 -translate-y-[2px] pb-2 flex justify-end" >
                  <input defaultValue={25} className="w-[90%] h-[30px] rounded-xl text-center" placeholder="Driver" type="number" />
                </div>
              }
              <div><input type='checkbox' onClick={() => setChecked(!checked)} checked={checked} /></div>
              <div className="text-sm text-[#000] dark:text-[#fff] ml-3 pt-[0.3vh]">Driver aged between 30-65 ?</div>
            </div>
          </div>
          <div onClick={() => FromClicking()} className="w-[100%] flex flex-col md:flex-row justify-between px-5 md:px-2 lg:px-11 mt-5">
            <div className="flex-1 md:mr-2">
              <div className={`relative w-[100%] h-[54px] md:h-[72px] mb-2 md:mb-0 border  rounded-2xl ${errors.departure && (!selectedDeparture || selectedDeparture == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0]'} cursor-pointer`}>
                {errors.departure && (!selectedDeparture || selectedDeparture == '') &&
                  <div className={`absolute -translate-x-[9px] translate-y-16 top-0 right-0`}>
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
                        {errors.departure}
                      </div>
                    </div>

                  </div>}
                <div className="text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold mt-[10px] md:mt-3 px-4 md:px-[22px]">Pickup Location</div>
                <div className={`absolute top-[1vh] w-[100%] h-[85%] flex items-center`}>
                  <LocationInput
                    defaultValue=''
                    iconcolor={errors.departure && (!selectedDeparture || selectedDeparture == '') ? '#FF2424' : '#AFB3E0'}
                    onChange={(e) => setPickUpInputValue(e)}
                    onInputDone={() => setFieldFocused("dropOffInput")}
                    onDestination={(selectedDeparture: any) => setSelectedDeparture(selectedDeparture)}
                    placeHolder=""
                    tripType='ROUTING&routingType=ONLY_RENT_CAR'
                    desc=""
                    manualFocus={counter}
                    inputClassNames='md:!translate-x-[10px]'
                    onInputChange={(event: any) => handleOnInputChange(event, 'departure')}
                  />
                  {/* {errors.departure && <span className="text-[9px] text-red-900"> {errors.departure} </span>} */}
                </div>
              </div>
            </div>
            <div onClick={() => {
              dispatch({ type: TYPES.TRAVELLERS, payload: { status: false } });
              startDate.current?.click();
            }} className="flex-1 md:mr-2">
              <div className={`relative w-[100%] h-[54px] md:h-[72px] mb-2 md:mb-0 border rounded-2xl ${errors.date && (!departureDate || departureDate == '') ? '!border-[#FF2424]' : '!border-[#AFB3E0]'} rounded-2xl`}>
                {errors.date && (!departureDate || departureDate == '') &&
                  <div className={`absolute translate-y-16 -translate-x-0 top-0 right-0`}>
                    <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                      <div className="translate-x-[7.8vw] -translate-y-3">
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
                <div className="text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold mt-[0.5vh] md:mt-3 px-4 md:px-[22px] ">Start Date</div>
                <div className={`absolute top-[0.8vh] w-[100%] h-[85%] flex justify-between items-center`}>
                  <div className="w-[50%] md:w-full px-[14px] md:px-[22px]">
                    <DatePicker
                      dropdownType={isMobile ? "modal" : "popover"}
                      placeholder="Select Date"
                      onChange={(date: any) => setDepartureDate(date)}
                      zIndex={!TravellersEvent || TravellersEvent == undefined ? 10000 : -10000}
                      size="sm"
                      radius={10}
                      ref={startDate}
                      minDate={dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                      classNames={{
                        input: classes.input,
                        calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase,
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-end h-[70%] px-4"><i className={`${errors.date && (!departureDate || departureDate == '') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}  fa fa-calendar`} aria-hidden="true"></i></div>
                  </div>
                  {/* {errors.date && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}
                </div>

              </div>
            </div>

            <div className="flex-1 md:mr-2 z-[11]">
              <div className="w-[100%] h-[54px] md:h-[72px] px-4 lg:px-2 md:pt-3 border border-[#AFB3E0] rounded-2xl">
                <GuestsInput
                  type="routing"
                  onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                  // defaultValue={guestValue}
                  onChange={(data) => setGuestValue(data)}
                />
                {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
              </div>
            </div>
            <div className="flex items-center justify-center h-[93%] md:h-[72px] !mt-2 md:!mt-0 md:pl-2">
              <SearchButton
                link={resultLink}
                passengers={guestValue}
                type="routing"
                date={departureDate}
                _date=''
                onErrors={(errors: any) => setErrors(errors)}
                destination={selectedDestination}
                departure={selectedDeparture}
                classNames="!w-full md:!w-[74px] !h-[54px] md:!h-[72px]"

              />
            </div>
          </div>
          <TermsOfServiceText wrapperClassNames="absolute" />
        </form>
      </div>
      // </div> 
    );
  }
  const FlightAndCar = () => {
    let history = useHistory()

    const useStyles = createStyles((theme) => ({
      calendarBase: {
        display: 'none',
      },
      input: {
        color: changeLighmode.mode === 'dark' ? '#fff' : '#000',


        [`@media (max-width: 766px)`]: {
          fontSize: '12px',
          fontWeight: 400,
          paddingRight: '10px !important',
          paddingLeft: '0px !important',
          transform: 'translate(12px, -12px) !important',

        },


        [`@media (max-width: 1280px)`]: {
          fontSize: '10px',
          fontWeight: 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          paddingRight: '10px !important',
          paddingLeft: '0px !important',
          transform: 'translate(13px, -4px)',



        },


      }
    }));
    const { classes } = useStyles();
    return (
      <>
        {/* <div className="w-[100%] h-[100%] realative"> */}
        <div className={`w-[100%] md:h-[200px] ${flightAndCarWrapperClassNames} relative
           `}
          style={{ borderTopLeftRadius: history.location.pathname == '/routing' ? '16px' : '0' }}>
          <form className={`w-[100%] h-[100%] bg-white ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'} rounded-tr-xl md:py-[1px] ${history.location.pathname == '/routing' ? 'rounded-tl-xl' : ' '}`}>
            <div className="w-[100%] flex flex-col md:flex-row justify-between py-3 md:py-0 mb-[0.7vh] md:mt-7 md:mb-[20px] md:h-[34px] px-5 md:px-2 lg:px-11">
              <div className="flex flex-1 flex-col md:flex-row mb-3 md:mb-0 ">

                <div className="flex items-center md:mx-2 p-3">
                  <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'onlyCar' ? true : false} onClick={() => setChangTab('onlyCar')} /></div>
                  <div className="text-[10px] lg:text-[.7vw] text-[#000] dark:text-[#fff] mt-[3px] mr-2 md:whitespace-nowrap">Only rent a Car</div>
                </div>
                <div className="flex items-center p-3 rounded-[20px] bg-[#F4F8FF] dark:bg-opacity-10">
                  <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'FlightCar' ? true : false} onClick={() => setChangTab('FlightCar')} /></div>
                  <div className="text-[10px] lg:text-[.7vw] text-[#000] dark:text-[#fff] mt-[3px] mr-2 md:whitespace-nowrap">Flight and rent a Car</div>
                </div>
                <div className="flex items-center p-3">
                  <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'withmycar' ? true : false} onClick={() => setChangTab('withmycar')} /></div>
                  <div className="text-[10px] lg:text-[.7vw] text-[#000] dark:text-[#fff] mt-[3px] mr-2 md:whitespace-nowrap">With my Car</div>
                </div>
              </div>
              <div className="flex-1 flex justify-start md:justify-center">
                <div>{renderSelectClass()}</div>
              </div>
              <div className="flex justify-start md:justify-end mt-3 md:mt-0 pr-1">
                {
                  checked ? '' : <div className="w-[20%]  px-3 -translate-y-[2px] pb-2 flex justify-end">
                    <input className="w-[80%] h-[30px] rounded-xl text-center" placeholder="25" type="text" />
                  </div>
                }
                <div><input type='checkbox' onClick={() => setChecked(!checked)} checked={checked} /></div>
                <div className="text-sm md:text-[10px] lg:text-sm text-[#000] dark:text-[#fff] ml-3 pt-[0.3vh]">Driver aged <br className="hidden md:inline-block bigMd:hidden" /> between 30-65 ?</div>
              </div>
            </div>
            <div className="w-[100%] flex-col md:flex-row flex justify-between px-5 md:px-2 lg:px-11 mt-4 md:mt-0">
              <div className="flex-1 md:mr-2">
                <div onClick={() => FromClicking()} className={`cursor-pointer relative w-[100%] h-[54px] md:h-[72px] mb-2 md:mb-0 border rounded-2xl ${errors.departure && (!selectedDeparture || selectedDeparture == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0]'} rounded-2xl`}>
                  <div className="text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold mt-[10px] px-4 md:px-[22px]">Origin</div>
                  {errors.departure && (!selectedDeparture || selectedDeparture == '') &&
                    <div className={`absolute -translate-x-2 translate-y-16 top-0 right-0`}>
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
                          {errors.departure}
                        </div>
                      </div>

                    </div>}
                  <div className={`absolute top-[1vh] w-[100%] h-[85%] flex items-center`}>
                    <LocationInput
                      defaultValue=''
                      iconcolor={errors.departure && (!selectedDeparture || selectedDeparture == '') ? '#FF2424' : '#AFB3E0'}
                      onChange={(e) => setPickUpInputValue(e)}
                      onInputDone={() => setFieldFocused("dropOffInput")}
                      onDestination={(selectedDeparture: any) => setSelectedDeparture(selectedDeparture)}
                      placeHolder=""
                      tripType='ROUTING&routingType=FLIGHT_PLUS_CAR'
                      desc=""
                      manualFocus={counter}
                      inputClassNames='md:!translate-x-[10px]'
                      onInputChange={(event: any) => handleOnInputChange(event, 'departure')}
                    />
                    {/* {errors.departure && <span className="text-[9px] text-red-900"> {errors.departure} </span>} */}
                  </div>
                </div>
              </div>
              <div className="flex-1 md:mr-2">

                <div onClick={() => ToClicking('focus')} className={`cursor-pointer relative w-[100%] h-[54px] md:h-[72px] mb-2 md:mb-0 border rounded-2xl ${errors.destination && (!selectedDestination || selectedDestination == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0]'} rounded-2xl`}>

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
                  <div className="text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold mt-[10px] px-4 md:px-[22px]">First Destination</div>

                  <div className={`absolute top-[1vh] w-[100%] h-[85%] flex items-center`}>
                    <LocationInput
                      defaultValue=''
                      iconcolor={errors.destination && (!selectedDestination || selectedDestination == '') ? '#FF2424' : '#AFB3E0'}
                      onChange={(e) => setDropOffInputValue(e)}
                      onInputDone={() => setFieldFocused(null)}
                      onDestination={(selectedDestination: any) => setSelectedDestination(selectedDestination)}
                      placeHolder=""
                      desc=""
                      tripType='ROUTING&routingType=FLIGHT_PLUS_CAR'
                      autoFocus={fieldFocused == "dropOffInput"}
                      inputClassNames='md:!translate-x-[10px]'
                      manualFocus={toCounterClick}
                      onInputChange={(event: any) => handleOnInputChange(event, 'destination')}
                    />
                    {/* {errors.destination && <span className="text-[9px] text-red-900"> {errors.destination} </span>} */}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div onClick={() => startDate.current?.click()}  className={`cursor-pointer w-[100%] flex justify-between relative h-[54px] md:h-[72px] mb-2 md:mb-0 border  rounded-2xl ${errors.date && (!departureDate || departureDate == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0]'} rounded-2xl overflow-hidden`}>
                  {errors.date && (!departureDate || departureDate == '') &&
                    <div className={`absolute translate-x-2  translate-y-16 top-0 right-0`}>
                      <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                        <div className="translate-x-[7.5vw] -translate-y-3">
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
                  <div className="w-[100%]">
                    <div className="w-[100%] pt-2 pl-3">
                      <span className="text-[#000] dark:text-[#fff] text-xs lg:text-sm font-semibold">Start Date</span>
                    </div>
                    <div className="w-[100%] h-[100%] relative overflow-hidden">
                      <div className="absolute top-0 w-[100%] h-[100%] flex">
                        <DatePicker
                          dropdownType={isMobile ? "modal" : "popover"}
                          placeholder="Select Date"
                          onChange={(date: any) => setDepartureDate(date)}
                          size="sm"
                          radius={10}
                          ref={startDate}
                          minDate={dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                          classNames={{
                            input: classes.input,
                            calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase,
                          }}
                        />
                        {/* {errors.date && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end h-[70%] px-4"><i className={`${errors.date && (!departureDate || departureDate == '') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}  fa fa-calendar`} aria-hidden="true"></i></div>
                </div>
              </div>
              <div className="flex-1 md:mx-2 z-[11]">
                <div className="w-[100%] h-[54px] md:h-[72px] mb-2 md:mb-0 px-4 lg:px-2 border border-[#AFB3E0] rounded-2xl cursor-pointer">
                  <GuestsInput
                    type="routing"
                    onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                    // defaultValue={guestValue}
                    onChange={(data) => setGuestValue(data)}
                  />
                  {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
                </div>
              </div>
              <div className="flex items-center justify-center h-[93%] md:h-[72px] !mt-2 md:!mt-0 px-0 md:!ml-2">
                <SearchButton
                  link={resultLink}
                  passengers={guestValue}
                  type="routing"
                  trip="flightwithcar"
                  date={departureDate}
                  _date=''
                  onErrors={(errors: any) => setErrors(errors)}
                  destination={selectedDestination}
                  departure={selectedDeparture}
                  classNames="!w-full md:!w-[74px] !h-[54px] md:!h-[72px]"
                />
              </div>
            </div>
            <TermsOfServiceText wrapperClassNames="absolute" />
          </form>
        </div>
        {/* </div> */}
      </>
    );
  };
  const Wmycar = () => {
    let history = useHistory()
    const useStyles = createStyles((theme) => ({
      calendarBase: {
        display: 'none',
      },
      input: {
        color: changeLighmode.mode === 'dark' ? '#fff' : '#000',
        fontSize: '14px',
        fontWeight: 400,

        paddingLeft: "18px",
        transform: 'translate(4px, 4px)',
        [`@media (max-width: 766px)`]: {
          fontSize: '12px',
          fontWeight: 400,
          paddingRight: '10px !important',
          // paddingLeft: '22px !important',
          transform: 'translate(-6px, 0px) !important',

        },


        [`@media (max-width: 1280px)`]: {
          fontSize: '10px',
          fontWeight: 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          paddingRight: '10px !important',
          paddingLeft: '22px !important',
          transform: 'translate(0px, 0px)',



        },
      }
    }));
    const { classes } = useStyles();
    return (
      // <div className="w-[100%] h-[100%] realative">
      <div className={`w-[100%] md:h-[200px] ${withMyCarWrapperClassNames} relative
         `}
        style={{ borderTopLeftRadius: history.location.pathname == '/routing' ? '16px' : '0' }}>
        <form className={`w-[100%] h-[100%] bg-white ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'} rounded-tr-xl md:py-[1px] ${history.location.pathname == '/routing' ? 'rounded-tl-xl' : ' '}`}>
          <div className="w-[100%] flex justify-between py-3 md:py-0 mb-[0.7vh] md:mt-7 md:mb-[20px] md:h-[34px] px-5 md:px-2 lg:px-11">
            <div className="flex flex-1 flex-col md:flex-row mb-3 md:mb-0">

              <div className="flex items-center md:mx-2 p-3">
                <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'onlyCar' ? true : false} onClick={() => setChangTab('onlyCar')} /></div>
                <div className="text-[10px] lg:text-[.7vw] text-[#000] dark:text-[#fff] mt-[3px] mr-2 md:whitespace-nowrap">Only rent a Car</div>
              </div>
              <div className="flex items-center p-3">
                <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'FlightCar' ? true : false} onClick={() => setChangTab('FlightCar')} /></div>
                <div className="text-[10px] lg:text-[.7vw] text-[#000] dark:text-[#fff] mt-[3px] mr-2 md:whitespace-nowrap">Flight and rent a Car</div>
              </div>
              <div className="flex items-center p-3 rounded-[20px] bg-[#F4F8FF] dark:bg-opacity-10">
                <div><input className="w-[20px] h-[20px] mr-2 focus:ring-transparent" type="radio" id="radio" name="trip" checked={changTab == 'withmycar' ? true : false} onClick={() => setChangTab('withmycar')} /></div>
                <div className="text-[10px] lg:text-[.7vw] text-[#000] dark:text-[#fff] mt-[3px] mr-2 md:whitespace-nowrap">With my Car</div>
              </div>
            </div>
            {/* <div className="flex-1 flex justify-center"> */}
            {/* <div className="text-sm text-[#000] dark:text-[#fff] pt-[0.3vh]">Class  :</div>
                <div>{renderSelectClass()}</div> */}
            {/* </div> */}
            {/* <div className="flex-1 flex"> */}
            {/* <div><input type='checkbox' checked /></div>
                <div className="text-sm text-[#000] dark:text-[#fff] ml-3 pt-[0.3vh]">Driver aged between 30-65 ?</div> */}
            {/* </div> */}
          </div>
          <div onClick={() => FromClicking()} className="w-[100%] px-5 md:px-2 lg:px-11 flex flex-col md:flex-row justify-between  mt-5">
            <div className="flex-1 md:mr-2">
              <div className={`relative w-[100%] h-[54px] md:h-[72px] mb-2 md:mb-0 border rounded-2xl ${errors.departure && (!selectedDeparture || selectedDeparture == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0]'} rounded-2xl cursor-pointer`}>
                {errors.departure && (!selectedDeparture || selectedDeparture == '') &&
                  <div className={`absolute -translate-x-[9px] translate-y-16 top-0 right-0`}>
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
                        {errors.departure}
                      </div>
                    </div>

                  </div>}
                <div className="text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold mt-[10px] md:mt-3 px-4 md:px-[22px]">Starting Place</div>
                <div className={`absolute top-[1vh] w-[100%] h-[85%] flex items-center`}>
                  <LocationInput
                    defaultValue=''
                    iconcolor={errors.departure && (!selectedDeparture || selectedDeparture == '') ? '#FF2424' : '#AFB3E0'}
                    onChange={(e) => setPickUpInputValue(e)}
                    onInputDone={() => setFieldFocused("dropOffInput")}
                    onDestination={(selectedDeparture: any) => setSelectedDeparture(selectedDeparture)}
                    placeHolder=""
                    tripType='ROUTING&routingType=OWN_CAR'
                    desc=""
                    inputClassNames='md:!translate-x-[10px] lg:!translate-x-[6px]'
                    manualFocus={counter}
                    onInputChange={(event: any) => handleOnInputChange(event, 'departure')}
                  />
                  {/* {errors.departure && <span className="text-[9px] text-red-900"> {errors.departure} </span>} */}
                </div>
              </div>
            </div>
            <div className="flex-1 md:mr-2">
              <div onClick={() => startDate.current?.click()} className={`cursor-pointer relative w-[100%] h-[54px] md:h-[72px] mb-2 md:mb-0 border  rounded-2xl ${errors.date && (!departureDate || departureDate == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0]'} rounded-2xl`}>
                {errors.date && (!departureDate || departureDate == '') &&
                  <div className={`absolute translate-y-16 top-0 right-0`}>
                    <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                      <div className="translate-x-[7.9vw] -translate-y-3">
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
                  {/* find me: */}
                <div className="text-xs lg:text-sm text-[#000] dark:text-[#fff] font-semibold mt-[10px] md:mt-3 px-4 md:px-[22px]">Start Date</div>
                <div className={`absolute top-[1vh] w-[100%] h-[85%] flex justify-between items-center`}>
                  <div className="">
                    <DatePicker
                      dropdownType={isMobile ? "modal" : "popover"}
                      placeholder="Select Date"
                      onChange={(date: any) => setDepartureDate(date)}
                      size="sm"
                      ref={startDate}
                      radius={10}
                      minDate={dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                      classNames={{
                        input: classes.input,
                        calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-end h-[70%] px-4"><i className={`${errors.date && (!departureDate || departureDate == '') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}  fa fa-calendar`} aria-hidden="true"></i></div>
                  </div>

                  {/* {errors.date && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}
                </div>
              </div>
            </div>

            <div className="flex-1 md:mr-2 z-[11]">
              <div className="w-[100%] h-[54px] md:h-[72px]  px-2 md:px-4 border border-[#AFB3E0] rounded-2xl cursor-pointer">
                <GuestsInput
                  type='routing'
                  onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                  // defaultValue={guestValue}
                  onChange={(data) => setGuestValue(data)}
                />
                {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
              </div>
            </div>
            <div className="flex items-center justify-center h-[93%] md:h-[72px] !mt-2 md:!mt-0 px-0 md:!ml-2">
              <SearchButton
                link={resultLink}
                passengers={guestValue}
                type="routing"
                date={departureDate}
                _date=''
                onErrors={(errors: any) => setErrors(errors)}
                destination={selectedDestination}
                departure={selectedDeparture}
                classNames='!w-full md:!w-[74px] !h-[54px] md:!h-[72px]'
              />
            </div>
          </div>
          <TermsOfServiceText wrapperClassNames="absolute" />
        </form>
      </div>
      // </div> 
    );
  }
  const RenderForm = () => {
    let display = FlightAndCar();
    if (changTab == 'FlightCar') {
      display = FlightAndCar()
    } else {
      if (changTab == 'onlyCar') {
        display = OnlyCar()
      } else {
        display = Wmycar()
      }
    }
    return (
      <>
        {display}
      </>
    )
  }
  // return changTab=='FlightCar'?RenderForm():changTab=='onlyCar'?FlightCar():'';
  // let display = changTab==='FlightCar' ? RenderForm() : (changTab==='onlyCar'?FlightCar():'');
  return RenderForm();
};

export default RoutingSearchForm;
