import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BASE_URL_HOME from "../../api/env";
import services from "../../api/services";
import { formatDate } from "../../common/formatDate";
import Logger from "../../common/Logger";
import { destinationsResource, LOCATIONID } from "../../store/actions";
import ClearDataButton from "./ClearDataButton";
import { MULTISTOP, LOCATIONIDENTIFICATION, LOCATIONIDENTIFICATION_DESTINATION } from "../../store/actions";
import $ from 'jquery';

export interface LocationInputProps {
  defaultValue: string;
  onChange?: (value: string) => void;
  onInputDone?: (value: string) => void;
  placeHolder?: string;
  desc?: string;
  id?: string;
  className?: string;
  inputClassNames?: string;
  autoFocus?: boolean;
  onDestination?: any;
  tripType?: any,
  iconcolor?: any,
  dontfetch?: boolean;
  pointer_activator?: boolean,
  autocompleteBasedOnthePreviewsRow?: boolean,
  onInputChange?: any;
  manualFocus?: any;
  isDisabled?: boolean;
}

const LocationInput: FC<LocationInputProps> = ({
  tripType = 'ONLY_HOTEL',
  iconcolor = "#AFB3E0",
  defaultValue = "",
  autoFocus = false,
  manualFocus,
  id,
  onChange,
  onInputDone,
  onDestination,
  placeHolder = "",
  desc = "",
  dontfetch = true,
  className = "text-[#000] dark:text-[#fff] w-[100%] bg-[transparent]",
  inputClassNames = '',
  autocompleteBasedOnthePreviewsRow = false,
  onInputChange,
  isDisabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  const [searchingDestination, setSearchingDestination] = useState(defaultValue);
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [allDestinations, setAllDestinations] = useState<any>([]);
  const [customDestnations, setCustomDestinations] = useState([])

  const dispatch = useDispatch();
  const server = services;

  const destinationsData = useSelector((state: { destinations: object; }) => state.destinations);

  const allDestinationsArr = [];

  useEffect(() => {
    // console.log('multiStop row: the default value for  the name',name, "and index: " ,index, defaultValue)
    setSearchingDestination(defaultValue)
  },[defaultValue]);

  // TODO: get data throuh store route
  // location search
  const destinationCountries: any[] = [];
  
  // jsonp/locationSearch?callback=?&tripType=ONLY_HOTEL"
  useEffect(() => {
    $.ajax({
      url: BASE_URL_HOME + "/jsonp/locationSearch?callback=?&tripType=" + tripType,
      dataType: "jsonp",
      data: {
        query: searchingDestination,
        micrositeId: 'bookperfect',
        languageId: 'EN',
        destinationCountries: destinationCountries
      },
      success: function (data: any) {
        if (!$.isEmptyObject(data)) {
          setAllDestinations(data);
        }
      }
    })
  }, [searchingDestination]);


  // console.log(Object.values(allDestinations));

  const formatAllDestinations = Object.values(allDestinations);

  // const searchFormatAllDestinations = searchingDestination !== "" ? formatAllDestinations.filter((destination: any) => destination.name.toLowerCase().indexOf(searchingDestination?.toLocaleLowerCase()) >= 0) : formatAllDestinations;

  // console.log(searchFormatAllDestinations);

  // for (let entity of allDestinations){
  //   console.log(allDestinations[entity]);
  // };

  // console.log({allDestinations});


  const destinations = allDestinations.filter((destination: any) => destination.type == "Destination:");
  const pointOfInterests = allDestinations.filter((destination: any) => destination.type == "PointOfInterest:");
  const hotels = allDestinations.filter((destination: any) => destination.type == "Hotel:");
  const airports = allDestinations.filter((destination: any) => destination.type == "TransportBase:AIRPORT");
  const trains = allDestinations.filter((destination: any) => destination.type == "TransportBase:TRAIN_STATION");
  const ports = allDestinations.filter((destination: any) => destination.type == "TransportBase:PORT");
  const [fetchedOnce, setFetchedOnce] = useState(dontfetch)
  //   const renderNoref = useRef({
  //     renderCount: 0
  // });

  // handle default value
  useEffect(() => {

    if (allDestinations && defaultValue && !fetchedOnce) {
      if (autocompleteBasedOnthePreviewsRow) {
        setSearchingDestination(Array.isArray(allDestinations) && allDestinations.filter((destination: any) => destination.label == defaultValue)[0]?.label);
      } else {
        setSearchingDestination(allDestinations[0] && allDestinations[0].label);
      }
      if (allDestinations[0] && allDestinations[0]) onDestination(allDestinations[0] && allDestinations[0]);

      if (Array.isArray(allDestinations) && allDestinations.length !== 0) {
        setFetchedOnce(true);
      }
    }
  }, [allDestinations]);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    // console.log('render the fetch: fetched once : ', fetchedOnce)
  }, [fetchedOnce]);

  // click outside event handler
  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    onChange && onChange(searchingDestination);
  }, [searchingDestination]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);
  // useEffect(() => {

  // }, [pointer_activator])
  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  // dispatch({ type: MULTISTOP, payload: { status: 'Empty' } })
  if (searchingDestination == '') {
    dispatch({ type: LOCATIONID, payload: { status: 'Empty' } })
  }

  const handleSelectLocation = (item: any) => {
    setSearchingDestination(item.label);

    onDestination(item);
    onInputDone && onInputDone(item);

    setShowPopover(false);
    dispatch({ type: LOCATIONID, payload: { status: 'Empty' } })
  };

  const handleInputChange = (event: any, id: any) => {

    let inputV = event.currentTarget.value;
    dispatch({
      type: LOCATIONIDENTIFICATION,
      payload: {
        status: event.currentTarget.value,
        id: id
      }
    });


    dispatch({ type: LOCATIONID, payload: { status: 'full' } })
    setShowPopover(true);

    if (event.currentTarget.value === '') {
      dispatch({
        type: LOCATIONID,
        payload: { status: 'Empte' }
      });

      setShowPopover(true);
      // setSearchingDestination('');
      // inputRef.current.focus();
    }
    onInputChange && onInputChange(inputV);
    if (inputV !== '') setSearchingDestination(inputV);
    else {
      setSearchingDestination('');
      setAllDestinations([]);
      setShowPopover(false);
    }
  };

  if (manualFocus == 1 || manualFocus == 2) {
    inputRef.current?.focus();
  };
  
  const renderAutoCompleteLocationSearches = () => {
    return (
      <>

        <div className="locationSubScroller w-[90%] h-[30vh] overflow-y-scroll">
          {!['FLIGHT_HOTEL', 'ONLY_TICKET', 'ONLY_TRANSFER', 'ROUTING'].includes(tripType) && destinations.length > 0 && <div className="text-base px-10 w-[100%] font-medium text-[#3F4249] leading-[24px]"> Destinations </div>}
          {
            destinations?.map((item: any) => (
              <>
                <span
                  onClick={() => handleSelectLocation(item)}
                  key={item.value}
                  className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <span className="block text-neutral-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-6 sm:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#B0B4E1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span className="block text-sm font-normal font-poppins text-[#3F4249] leading-[21px] dark:text-neutral-200">
                    {item.label}
                  </span>
                </span>
              </>
            ))}

          {!['FLIGHT_HOTEL', 'ROUTING'].includes(tripType) && airports.length > 0 && <span className="text-base px-10 w-[100%] font-medium text-[#3F4249] leading-[24px]"> Airports </span>}
          {
            airports?.map((item: any) => (
              <>
                <span
                  onClick={() => handleSelectLocation(item)}
                  key={item.value}
                  className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <span className="block text-neutral-400">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.4" clip-path="url(#clip0_5931_21424)">
                        <path d="M1.875 16.875H13.125" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1.32071 10.9687L4.26602 13.7265C4.65874 14.0947 5.15981 14.3262 5.69469 14.3867C6.22958 14.4473 6.76971 14.3335 7.23477 14.0625L19.0629 7.18746L17.6098 5.40621C17.2318 4.94454 16.7011 4.6333 16.1137 4.5287C15.5262 4.42411 14.9208 4.53307 14.4066 4.8359L10.9379 6.87496L6.25039 5.31246L4.96133 5.86715C4.86489 5.90848 4.78041 5.97342 4.71567 6.05599C4.65093 6.13856 4.60802 6.2361 4.5909 6.33962C4.57378 6.44313 4.58299 6.5493 4.61769 6.64832C4.65239 6.74733 4.71146 6.83602 4.78946 6.90621L7.18789 9.06246L5.00039 10.3125L2.81289 9.37496L1.50039 9.93746C1.40491 9.97848 1.32115 10.0427 1.25671 10.1242C1.19228 10.2057 1.14919 10.3021 1.13135 10.4044C1.11351 10.5068 1.12148 10.612 1.15454 10.7106C1.18761 10.8091 1.24472 10.8978 1.32071 10.9687V10.9687Z" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_5931_21424">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span className="block text-sm font-normal font-poppins text-[#3F4249] leading-[21px] dark:text-neutral-200">
                    {item.label}
                  </span>
                </span>
              </>
            ))}

          {trains.length > 0 && <span className="text-base px-10 w-[100%] font-medium text-[#3F4249] leading-[24px]"> Train Station </span>}
          {
            trains?.map((item: any) => (
              <>
                <span
                  onClick={() => handleSelectLocation(item)}
                  key={item.value}
                  className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <span className="block text-neutral-400">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.4" clip-path="url(#clip0_5931_21437)">
                        <path d="M3.4375 10H16.5625" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.5 16.25L5.625 18.75" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.5 16.25L14.375 18.75" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.6875 2.5H5.3125C4.27697 2.5 3.4375 3.33947 3.4375 4.375V14.375C3.4375 15.4105 4.27697 16.25 5.3125 16.25H14.6875C15.723 16.25 16.5625 15.4105 16.5625 14.375V4.375C16.5625 3.33947 15.723 2.5 14.6875 2.5Z" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.5625 14.375C7.08027 14.375 7.5 13.9553 7.5 13.4375C7.5 12.9197 7.08027 12.5 6.5625 12.5C6.04473 12.5 5.625 12.9197 5.625 13.4375C5.625 13.9553 6.04473 14.375 6.5625 14.375Z" fill="#3944B3" />
                        <path d="M13.4375 14.375C13.9553 14.375 14.375 13.9553 14.375 13.4375C14.375 12.9197 13.9553 12.5 13.4375 12.5C12.9197 12.5 12.5 12.9197 12.5 13.4375C12.5 13.9553 12.9197 14.375 13.4375 14.375Z" fill="#3944B3" />
                      </g>
                      <defs>
                        <clipPath id="clip0_5931_21437">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span className="block text-sm font-normal font-poppins text-[#3F4249] leading-[21px] dark:text-neutral-200">
                    {item.label}
                  </span>
                </span>
              </>
            ))}

          {ports.length > 0 && <span className="text-base px-10 w-[100%] font-medium text-[#3F4249] leading-[24px]"> Ports </span>}
          {
            ports?.map((item: any) => (
              <>
                <span
                  onClick={() => handleSelectLocation(item)}
                  key={item.value}
                  className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <span className="block text-neutral-400">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.4" clip-path="url(#clip0_5931_21428)">
                        <path d="M10 3.75V1.875" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 12.5001C16.3594 16.4844 11.0781 17.8751 10.1406 18.0938C10.0483 18.1173 9.95165 18.1173 9.85937 18.0938C8.92187 17.8751 3.64063 16.4844 2.5 12.5001V9.8282C2.49999 9.6966 2.54152 9.56835 2.61868 9.46173C2.69583 9.35512 2.80467 9.27558 2.92969 9.23445L9.80469 6.93758C9.93195 6.89841 10.068 6.89841 10.1953 6.93758L17.0703 9.23445C17.1953 9.27558 17.3042 9.35512 17.3813 9.46173C17.4585 9.56835 17.5 9.6966 17.5 9.8282V12.5001Z" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 13.125V6.90625" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.375 8.75V4.375C4.375 4.20924 4.44085 4.05027 4.55806 3.93306C4.67527 3.81585 4.83424 3.75 5 3.75H15C15.1658 3.75 15.3247 3.81585 15.4419 3.93306C15.5592 4.05027 15.625 4.20924 15.625 4.375V8.75" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_5931_21428">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span className="block text-sm font-normal font-poppins text-[#3F4249] leading-[21px] dark:text-neutral-200">
                    {item.label}
                  </span>
                </span>
              </>
            ))}

          {pointOfInterests.length > 0 && <span className="text-base px-10 w-[100%] font-medium text-[#3F4249] leading-[24px]"> Point of Interest </span>}
          {
            pointOfInterests?.map((item: any) => (
              <>
                <span
                  onClick={() => handleSelectLocation(item)}
                  key={item.value}
                  className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <span className="block text-neutral-400">
                    <span className="block text-neutral-400">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.4" clip-path="url(#clip0_5931_21434)">
                          <rect width="20" height="20" fill="white" />
                          <path d="M10.3439 14.8985L14.2814 17.3985C14.7892 17.7188 15.4142 17.2422 15.2657 16.6563L14.1251 12.1719C14.0943 12.0476 14.0992 11.9171 14.1393 11.7955C14.1793 11.6738 14.253 11.566 14.3517 11.4844L17.8829 8.53908C18.3439 8.15627 18.1095 7.38283 17.5079 7.34377L12.8986 7.04689C12.7728 7.03958 12.6519 6.99578 12.5506 6.92086C12.4493 6.84594 12.372 6.74314 12.3282 6.62502L10.6095 2.29689C10.564 2.17182 10.4811 2.06377 10.3721 1.98742C10.2631 1.91107 10.1332 1.87012 10.0001 1.87012C9.86702 1.87012 9.73715 1.91107 9.62814 1.98742C9.51912 2.06377 9.43624 2.17182 9.39074 2.29689L7.67199 6.62502C7.62819 6.74314 7.55092 6.84594 7.44964 6.92086C7.34836 6.99578 7.22745 7.03958 7.10168 7.04689L2.49231 7.34377C1.89074 7.38283 1.65637 8.15627 2.11731 8.53908L5.64856 11.4844C5.74726 11.566 5.82089 11.6738 5.86097 11.7955C5.90106 11.9171 5.90596 12.0476 5.87512 12.1719L4.82043 16.3281C4.64074 17.0313 5.39074 17.6016 5.99231 17.2188L9.65637 14.8985C9.75912 14.8331 9.87836 14.7984 10.0001 14.7984C10.1219 14.7984 10.2411 14.8331 10.3439 14.8985V14.8985Z" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_5931_21434">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </span>
                  <span className="block text-sm font-normal font-poppins text-[#3F4249] leading-[21px] dark:text-neutral-200">
                    {item.label}
                  </span>
                </span>
              </>
            ))}

          {hotels.length > 0 && <span className="text-base px-10 w-[100%] font-medium text-[#3F4249] leading-[24px]"> Hotels </span>}
          {
            hotels?.map((item: any) => (
              <>
                <span
                  onClick={() => handleSelectLocation(item)}
                  key={item.value}
                  className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <span className="block text-neutral-400">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.4" clip-path="url(#clip0_5931_21445)">
                        <path d="M1.25 16.875H18.75" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.25 16.875V3.125C11.25 2.95924 11.1842 2.80027 11.0669 2.68306C10.9497 2.56585 10.7908 2.5 10.625 2.5H3.125C2.95924 2.5 2.80027 2.56585 2.68306 2.68306C2.56585 2.80027 2.5 2.95924 2.5 3.125V16.875" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 16.875V8.125C17.5 7.95924 17.4342 7.80027 17.3169 7.68306C17.1997 7.56585 17.0408 7.5 16.875 7.5H11.25" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 5.625H7.5" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.25 10.625H8.75" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 13.75H7.5" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.75 13.75H15" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.75 10.625H15" stroke="#3944B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_5931_21445">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span className="block text-sm font-normal font-poppins text-[#3F4249] leading-[21px] dark:text-neutral-200">
                    {item.label}
                  </span>
                </span>
              </>
            ))}

        </div>
      </>
    );
  };
  const ClearButtonProcess = () => {
    setSearchingDestination("")
    dispatch({ type: MULTISTOP, payload: { status: 'Empty' } })
  }

  return (
    <div className={`relative flex h-full ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(false)}
        className={`flex flex-1 relative h-full [ hero-field-padding ] flex-shrink-0 justify-end items-center lg:px-4 md:space-x-3 focus:outline-none text-left  ${showPopover ? "hero-field-focused" : ""
          }`}
      >
        <div className="flex-grow absolute h-full w-full left-0 top-0">
          <input
            className={`${inputClassNames} block w-full md:w-[80%] h-full mt-[2px] md:mt-0 md:pt-3 pl-3 md:pl-4 bg-transparent focus:ring-0 p-0 focus:outline-none
            md:translate-y-0 translate-x-1 md:translate-x-0 cursor-pointer !border-0
            focus:placeholder-neutral-300 text-[10px] xl:text-sm font-normal placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={searchingDestination}
            autoFocus={autoFocus}
            onChange={(event) => handleInputChange(event, id)}
            // onClick={()=>dispatch({ type: MULTISTOP, payload: { status: 'full' } })}
            ref={inputRef}
            disabled={isDisabled}
            type='text'
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!searchingDestination ? placeHolder : desc}</span>
          </span>
          {searchingDestination && showPopover && (
            <ClearDataButton onClick={() => ClearButtonProcess()} />
          )}
        </div>

        <div className="text-[#b1b0e5] dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke={allDestinations.length > 0 ? '#AFB3E0' : iconcolor}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

      </div>
      {showPopover && (
        <div className="absolute left-0 z-40 locationScroll w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {
            // value ? 
            //  renderAutocompleteLocationSearchValue() :
            renderAutoCompleteLocationSearches()
          }
        </div>
      )}
    </div>
  );
};

export default LocationInput;

