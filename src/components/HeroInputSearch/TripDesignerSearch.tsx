import React, { useEffect, useState, useRef } from "react";
import LocationInput from "./LocationInput";
import { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import CInputNumber from "../../lib/CInputNumber/CInpuNumber";
import SearchButton from "../SearchButton/SearchButton";
import styled, { css } from "styled-components";
import { DatePicker } from "@mantine/dates";
import GuestsInput from "./GuestsInput";
import { Calendar, HandClick } from "tabler-icons-react";
import dayjs from 'dayjs';
import BASE_URL_HOME from "../../api/env";
import { formatDate } from "../../common/formatDate";
import OrderBy from "../../views/Hotels/OrderBy";
import NationalityPicker from "../NationalityPicker/NationalityPicker";
import { useSelector } from "react-redux";
import { createStyles } from "@mantine/core";
import { useDispatch } from "react-redux";
import TYPES from "../../types/store"; import $ from 'jquery';
import TermsOfServiceText from "../TermsOfServiceText/TermsOfServiceText";
import useWindowSize from "../../hooks/useWindowSize";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

var urlBaseTripDesigner = BASE_URL_HOME + "/home?directSubmit=true&tripType=MULTI";

const SelectionClassWrapper = styled.div`
  font-weight: 500px;
  font-family: 'Poppins';
  size: 14px;
  line-height: 21px;
  margin-top: 3px
`;

const SelectedClassWrapper = styled.div`
  // position: relative;
  // width: 65px;
  // height: 21px;
  // left: 59px;
  // top: 0px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;

export interface TimeRage {
  startTime: string;
  endTime: string;
};

export interface TripDesignerSearchFormProps {
  className?: string;
  inputClassNames?: string;
  pls?: string;
  iconClassNames?: string;
  paddingLeft?: string;
  data?: string;
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

const TripDesignerSearchForm: FC<TripDesignerSearchFormProps> = ({ className = "", inputClassNames = "0px !important", pls = '', iconClassNames = '', paddingLeft = '', searchcardplace }) => {

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const TravellersEvent: any = useSelector((state: any) => state.TravellersReducer.status);
  const [guests, setGuests] = useState(1);
  const [flightClassState, setFlightClassState] = useState("Economy");

  const [locationInputValue, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState<any>([]);
  const [departureDate, setDepartureDate] = useState<any>('');

  const [sourceMarket, setSourceMarket] = useState<any>('UK');
  const [isMobile, setIsMobile] = useState(false);
  // @ts-ignore
  const { t } = useTranslation()
  const themeMode = useSelector((state: any) => state.LightMode);

  const [errors, setErrors] = useState<any>({});
  const [childrenAges, setChildrenAges] = useState();
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  let Count = 0;
  const clicking = (e: any) => {
    Count = Count + 1;
    if (Count == 1 || Count == 2) {
      ref.current?.click();
      // console.log('clicking::', Count);
    } else { Count = 0 }

  }


  // determine if we are on the mobile
  const windowSize = useWindowSize()
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




  const HandleClickOutSide = (e: any) => {
    // console.log(e);
  }

  const useStyles = createStyles((theme) => ({
    calendarBase: {
      display: 'none',
    },
    input: {
      color: themeMode.mode === 'dark' ? '#fff' : '#000',
      paddingLeft: pls,
      paddingTop: '20px',
      transform: 'translate(-4px, -4px)',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '72px',

      [`@media (max-width: 768px)`]: {
        fontSize: '12px',
        fontWeight: 400,
        paddingRight: '10px !important',
        transform: 'translate(-4px, -4px) !important',
        height: '52px',
        paddingLeft: '16px !important'
      },
    },
    root: {
      height: '100%'
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


  let departure;
  const distributions = guestValue?.map((guest: any) => guest.adults + "-" + guest.children + "-" + childrenAges);


  if (departureDate) departure = formatDate(departureDate);
  //  guestValue?.guestAdults + "-" + guestValue?.guestChildren
  const resultLink = urlBaseTripDesigner + "&departureDate=" + departure + "&distribution=" + distributions.join("::") + "&businessCabin=" + (flightClassState == 'Business' ? "true" : "false") + "&lang=" + activeLang.toUpperCase() + "&sourceMarket=" + sourceMarket + "&displayCurrency=" + activeCurrency;


  const renderGuest = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md border border-[#CBDEFF] h-[34px] max-h-full md:border-0 inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >
                <span>{`${guests} Guest`}</span>
                <ChevronDownIcon
                  className={`${open ? "" : "text-opacity-70"
                    } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
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
                        onChange={(e: any) => setGuests(e)}
                        min={1}
                        defaultValue={guests}
                        max={20}
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
      <div className="w-full">
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
             w-full px-4 py-1.5 rounded-md inline-flex justify-between items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >

                {/* <SelectedClassWrapper> */}
                <span className="text-xs md:text-sm font-medium md:font-normal">{`${flightClassState}`}</span>
                <ChevronDownIcon
                  className={`${open ? "" : "text-opacity-70"
                    } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                  aria-hidden="true"
                />
                {/* </SelectedClassWrapper> */}

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
                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
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
                          <p className="text-sm font-medium ">{item.name}</p>
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
  const renderRadio = () => {
    return (
      <div className={`max-w-[100%] py-5 md:py-0 md:mt-7 md:mb-5 md:h-[34px] flex justify-between flex-nowrap md:flex-wrap flex-row md:pl-[68px] `}>
        <div className="min-w-[156px] md:min-w-[auto] md:w-auto flex justify-start items-start md:items-center flex-col md:flex-row">
          <div className="h-[100%] flex items-center"><span className={`text-xs flex items-center h-full translate-y-[1.5px] text-[#000] dark:text-[#fff] font-medium mb-1 md:font-semibold`}>Class&nbsp;:&nbsp;</span></div>
          <div className="w-full">
            <div className="h-[34px] rounded-lg md:h-auto flex items-center border md:border-0 border-[#AFB3E0] bg-[#F4F8FF] dark:bg-transparent dark:text-white md:bg-transparent ">
              {renderSelectClass()}
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="flex justify-start items-start md:items-center flex-col md:flex-row">
          {/* <div className="h-[100%] flex items-center"><span className={`text-xs text-[#000] dark:text-[#fff] mb-1 font-normal md:font-semibold `}>{t('NATIONALITY')}</span></div> */}
          <div>
            <div className=" flex items-center">
              {/* <NationalityPicker
                styles="px-3 py-2 rounded-lg"
                spanText="Select a nationality"
                typeSize='text-xs'
                onNationalityChanged={(nationality: any) => setSourceMarket(nationality.cca2)}
              /> */}
            </div>
          </div>
        </div>
      </div>

    );
  };
  const RenderForm = () => {
    const { classes } = useStyles()
    let pathname = window.location.pathname.split('/');
    const { width } = useWindowSize();
    const breakPoint = () => {
      let pX = null;
      if (width < 600) { pX = '20px' }
      if (width >= 600) { pX = '0px' }
      return {
        pX
      }
    }
    return (
      <div className={`w-full ${`/${pathname[1]}` == '/tripdesigner' ? 'md:px-10' : 'px-0'}`}>
        <form style={{ paddingLeft: `/${pathname[1]}` == '/blog' || pathname.length == 9 || pathname.length == 7 ? '12px' : `${breakPoint().pX}`, paddingRight: `/${pathname[1]}` == '/blog' || pathname.length == 9 || pathname.length == 7 ? '12px' : `${breakPoint().pX}` }} className={`w-full ${className} relative px-5   pb-5 md:pb-0  ${pathname.length >= 7 || pathname.length >= 3 ? 'md:px-10 rounded-2xl' : 'md:px-0 rounded-tr-xl'} bg-white ${searchcardplace == 'travelguide' ? `dark:bg-[#171925]` : 'dark:bg-[#202232]'}  md:h-[200px] md:py-[1px]`}>
          {renderRadio()}
          <div className={`flex flex-col  md:h-[72px] ${paddingLeft} md:flex-row w-full rounded-full [ nc-divide-field ] 
                        ${window.location.pathname === '/' ? 'md:px-2 lg:px-11' : ''}
          `}>
            {/* Line : 288 */}
            <div className={`cursor-pointer w-full h-[54px] border  ${errors.date && departureDate == '' ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl md:w-[45%] md:h-[100%] relative px-[22px] mb-2 ml-0 flex flex-col md:flex-row flex-grow [ nc-divide-field ]`}>
              <div className="flex justify-end items-center w-[100%] h-full py-1">
                {errors.date && departureDate == '' &&
                  <div className={`absolute translate-y-16 translate-x-1 top-0 right-0`}>
                    <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                      <div className="translate-x-[7.6vw] -translate-y-3">
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
                <div className="w-full h-full absolute top-0 left-0">
                  <div className={`h-[10%] text-[#000] dark:text-[#fff] text-xs md:text-sm font-semibold pl-4 md:pl-[22px] translate-y-[10px] md:translate-y-4 ${inputClassNames}`}>{t('TRIP_DESIGNER_SEARCH_FORM.START_DATE')}</div>
                  <div className="h-[100%] translate-x-1 -translate-y-1">
                    <DatePicker
                      placeholder={t('TRIP_DESIGNER_SEARCH_FORM.SELECT_DATE')}
                      onChange={(date: any) => setDepartureDate(date)}
                      // zIndex={!TravellersEvent || TravellersEvent == undefined ? 10000 : -10000}
                      size="sm"
                      dropdownType={"popover"}
                      radius={10}
                      minDate={dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                      classNames={{
                        input: classes.input,
                        root: classes.root,
                        monthPickerControlActive: classes.activeMonth,
                        yearPickerControlActive: classes.activeYear
                        // calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase

                      }}
                      ref={ref}
                    />
                  </div>
                </div>
                <i
                  // onClick={() => ref?.current.click()}
                  className={`${errors.date && departureDate == '' ? `text-[#FF2424]` : `text-[#B0B4E1] `} ${iconClassNames} big:mb-0  fa fa-calendar cursor-pointer`} aria-hidden="true"></i>
              </div>
            </div>

            <div className=" mb-2 w-full border hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff] border-[#AFB3E0] rounded-2xl md:w-[45%] h-[54px] md:h-[100%] relative flex flex-col md:flex-row flex-grow [ nc-divide-field ] cursor-pointer mx-0 md:mx-2">
              <GuestsInput
                type="trip designer"
                // defaultValue={guestValue}
                onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                onChange={(data) => setGuestValue(data)}
              />
              {errors.passengers_limit &&
                <div className={`absolute translate-y-16 translate-x-1 top-0 right-0`}>
                  <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                    <div className="translate-x-[12.6vw] -translate-y-3">
                      <div className="arrow-up"></div>
                    </div>
                    <div className="w-[5%] flex items-center mx-1">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                        <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                      </svg>
                    </div>
                    <div className="w-[100%] text-[13px] text-[#fff] flex items-center">
                      {errors.passengers_limit}
                    </div>
                  </div>

                </div>}
              {/* { errors.passengers_limit && <span className="text-[9px] text-red-900"> { errors.passengers_limit } </span> } */}
            </div>

            {/* apply search */}
            <div className="mt-[0vh]">
              <SearchButton
                link={resultLink}
                passengers={guestValue}
                type="trip designer"
                date={departureDate}
                classNames='!w-full md:!w-[74px] !h-[54px] md:!h-[72px]'
                onErrors={(errors: any) => setErrors(errors)}
              />
            </div>
          </div>
          <TermsOfServiceText wrapperClassNames="py-4" />
        </form>
      </div>

    );
  };

  return RenderForm();
};

export default TripDesignerSearchForm;
