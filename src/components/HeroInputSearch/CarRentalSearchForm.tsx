import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocationInput from "./LocationInput";
import { FC } from "react";
import { Listbox, Popover, Transition } from "@headlessui/react";
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
import TimeField from 'react-simple-timefield';
import dayjs from 'dayjs';
import { createStyles } from "@mantine/core";
import BASE_URL_HOME from "../../api/env";
import { formatDate } from "../../common/formatDate";
import { FIXLAYOUT } from "../../store/actions/layoutcontroller"
import { useHistory } from 'react-router-dom';
import randomId from "../../common/randomId";
import { TRANSFERS_LIMIT } from "../../constants/passengers";
import { ReactComponent as ClockIcon } from '../../images/icons/clockIcon.svg'
import useWindowSize from "../../hooks/useWindowSize";
import TYPES from "../../types/store";
import TermsOfServiceText from "../TermsOfServiceText/TermsOfServiceText";
import { ONLY_CAR } from "../../constants/triptypes";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
export const urlBaseCarRental = BASE_URL_HOME + "/home?directSubmit=true&tripType=ONLY_CAR";

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

export interface CarRentalSearchFormProps {
  roundedTopLeft?: string;
  customStyle?: any;
  search?: string;
  oneWayWrapperClassNames?: string,
  roundTripWrapperClassNames?: string,
  displayOneWayOnly?: boolean;
  showRadio?: boolean;
  showPassengerSelect?: boolean;
  showDateTimePicker?: boolean;
  defaultFrom?: string;
  defaultTo?: string;
  isParentModal?: boolean;
  searchcardplace?: string;
};

const TimeInput: FC = (props) => {
  return <input type='text' placeholder="Time" 
  //className={`w-full h-8 md:h-auto text-[10px] focus:ring-0 md:text-sm dark:text-white border-0 outline-0 relative py-0 pt-[9px] md:pt-0 bottom-2 md:bottom-0 pl-4 md:pl-[21px] bg-transparent ${localStorage.getItem('theme') === 'dark' ? '#fff' : ''}`}
  className={`w-full h-[52px] md:h-[72px] text-[10px] border-0 focus:ring-0 md:text-sm dark:text-white  outline-0 relative py-0 pt-4 pl-4 md:pl-[21px] bg-transparent ${localStorage.getItem('theme') === 'dark' ? '#fff' : ''}`} 
  {...props} />
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

export const hours: any = Array(24).fill(0).map((_, i) => { return ('0' + ~~(i)).replace(/\d(\d\d)/g, '$1') });
// export const minutes: any = Array(60).fill(0).map((_, i) => { return ('0' + ~~(i)).replace(/\d(\d\d)/g, '$1') });
export const minutes: any = ['00', '15', '30', '45'];

const CarRentalSearchForm: FC<CarRentalSearchFormProps> = memo(
  (props) => {
    const {
      defaultTo,
      search = "",
      roundedTopLeft,
      customStyle,
      roundTripWrapperClassNames,
      oneWayWrapperClassNames,
      displayOneWayOnly = false,
      showRadio = true,
      showPassengerSelect = true,
      showDateTimePicker = true,
      defaultFrom = "",
      isParentModal = false, searchcardplace } = props
    const dispatch = useDispatch();
    const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
    const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
    const guestsInputPopoverHeight = useSelector((state: any) => state.DynamicStyles.guestsInputPopoverHeight)
    const layout = useSelector((state: any) => state.LayoutReducer);
    const changeLighmode = useSelector((state: any) => state.LightMode);
    const TravellersEvent: any = useSelector((state: any) => state.TravellersReducer.status);
    // @ts-ignore
    const {t} = useTranslation()

    const [pickUpInputValue, setPickUpInputValue] = useState("");
    const [dropOffInputValue, setDropOffInputValue] = useState("");
    const [fieldFocused, setFieldFocused] = useState<"dropOffInput" | null
    >(null);
    const [dropOffLocationType, setDropOffLocationType] = useState<
      "oneWay" | "roundTrip" | ""
    >("roundTrip");

    const [selectedDestination, setSelectedDestination] = useState<any>();
    const [selectedDeparture, setSelectedDeparture] = useState<any>();
    const [departureDate, setDepartureDate] = useState<any>();
    const [arrivalDate, setArrivalDate] = useState<any>();
    const [childrenAges, setChildrenAges] = useState();
    const [guestValue, setGuestValue] = useState<any>([
      {
        id: randomId(),
        rooms: 1,
        adults: 2,
        children: 0,
        limit: TRANSFERS_LIMIT,
        limit1: TRANSFERS_LIMIT,
        deletebtn: false,
      }
    ]);
    const [errors, setErrors] = useState<any>({});
    const [departureTime, setDepartureTime] = useState<any>(
      {
        hour: '',
        minute: ''
      }
    );
    const [arrivalTime, setArrivalTime] = useState<any>(
      {
        hour: '',
        minute: ''
      }
    );
    const [displayTimeSelect, setDisplayTimeSelect] = useState<any>(false);
    const [displayTimeSelect2, setDisplayTimeSelect2] = useState<any>(false);
    const [displayTimeSelect3, setDisplayTimeSelect3] = useState<any>(false);
    const [checked, setChecked] = useState<any>({
        samedropoff: true, 
        driverage: true
    });
    const [modalFormPadding, setModalFormPadding] = useState(Math.ceil(guestsInputPopoverHeight))

    const oneWayInputContainerRef = useRef<HTMLDivElement>(null);
    const firstTimeInputcontainerRef = useRef<HTMLDivElement>(null);
    const secondTimeInputcontainerRef = useRef<HTMLDivElement>(null);
    const departureDatePickerRef = useRef<HTMLInputElement>(null);

    const [radio, setRadio] = useState<any>(displayOneWayOnly ? 'oneWay' : 'roundTrip');
    const [isMobile, setIsMobile] = useState(false);

    const transferSearchStartDate = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000));

    // const eventClickOutsideDiv = (event: MouseEvent) => {
    //   let containerRef: any;
    //   let bothAreOpen: boolean = false
    //   let clickedContainer: 'first' | 'second' | 'oneWay' | null = null

    //   // set which timeInput container is Clicked 
    //   if (firstTimeInputcontainerRef?.current?.contains(event.target as Node)) {
    //     clickedContainer = 'first'
    //   } else if (secondTimeInputcontainerRef?.current?.contains(event.target as Node)) {
    //     clickedContainer = "second"
    //   } else if (oneWayInputContainerRef?.current?.contains(event.target as Node)) {
    //     clickedContainer = "oneWay"
    //   }


    //   // determine if both time inputs are open
    //   if (displayTimeSelect2 && displayTimeSelect3) {
    //     bothAreOpen = true
    //   }

    //   //  set the refrence of the container
    //   if (clickedContainer === 'first') {
    //     containerRef = firstTimeInputcontainerRef
    //   } else if (clickedContainer === 'second') {
    //     containerRef = secondTimeInputcontainerRef
    //   } else if (clickedContainer === 'oneWay') {
    //     containerRef = oneWayInputContainerRef
    //   }
    //   // if no refrence exist means none of the containers are clicked
    //   // so set the inputs to invisible
    //   if (!containerRef?.current) {
    //     setDisplayTimeSelect2(false)
    //     setDisplayTimeSelect3(false)
    //     setDisplayTimeSelect(false)
    //     return
    //   };

    //   // click inside 
    //   if (containerRef.current.contains(event.target as Node)) {
    //     return;
    //   }

    //   // if one time input is open and another one is clicked
    //   //  close the open one and open the one the one clicked
    //   if (displayTimeSelect2 && clickedContainer == 'second') {
    //     setDisplayTimeSelect2(false)
    //     setDisplayTimeSelect3(true)
    //     return
    //   }

    //   //  when clicked outside if the first time input is open close it
    //   if (displayTimeSelect2) {
    //     setDisplayTimeSelect2(false)
    //     bothAreOpen = false

    //   }

    //   // if one time input is open and another one is clicked
    //   //  close the open one and open the one the one clicked
    //   if (displayTimeSelect3 && clickedContainer == 'first') {
    //     setDisplayTimeSelect3(false)
    //     setDisplayTimeSelect2(true)
    //     return
    //   }

    //   //  when clicked outside if the second time input is open close it
    //   if (displayTimeSelect3) {
    //     bothAreOpen = false
    //     setDisplayTimeSelect3(false)
    //   }

    //   if (displayTimeSelect) {
    //     bothAreOpen = false
    //     setDisplayTimeSelect(false)
    //   }
    // };


    //  this useEffect is used to attach click event listeners 
    // for closing the open time inputs on click outside
    // useEffect(() => {
    //   // remove the click event listener if any exists before attaching one later on
    //   if (eventClickOutsideDiv) {
    //     document.removeEventListener("click", eventClickOutsideDiv);
    //   }

    //   // add the event listaner if one of the time input fields is open 
    //   if ((!departureDate && displayTimeSelect2) || (!arrivalDate && displayTimeSelect3) || (!departureDate && displayTimeSelect)) {
    //     document.addEventListener("click", eventClickOutsideDiv);
    //   }

    //   return () => {
    //     // remove the event listener before component unmounts
    //     document.removeEventListener("click", eventClickOutsideDiv);
    //   };

    // }, [displayTimeSelect2, displayTimeSelect3, displayTimeSelect]);




    const handleClickOutside = (event:MouseEvent) => {
      // if the clikced outside of the time input for the departure date close the time input
      if (firstTimeInputcontainerRef.current && !firstTimeInputcontainerRef.current.contains(event.target as Node)) {
        if(displayTimeSelect2){
          setDisplayTimeSelect2(false)
        }
      }

      // if the clikced outside of the time input for the return date close the time input
      if (secondTimeInputcontainerRef.current && !secondTimeInputcontainerRef.current.contains(event.target as Node)) {
        if(displayTimeSelect3){
          setDisplayTimeSelect3(false)
        }
      }

    };


    useEffect(() => {

      document.removeEventListener("click", handleClickOutside);
      document.addEventListener('click', handleClickOutside, true);
      
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, [displayTimeSelect, displayTimeSelect2, displayTimeSelect3]);









    useEffect(() => {

      if (isParentModal && !isMobile) {
        setModalFormPadding(Math.ceil(guestsInputPopoverHeight))
      }

    }, [guestsInputPopoverHeight, dropOffLocationType])


  useEffect(()=> {
      
    if(errors?.type === "comparison" && arrivalDate?.getTime() > departureDate?.getTime()){
      setErrors([])
    }

} ,
[departureDate ,arrivalDate])
    let departure: any;
    let arrival;

    if (departureDate) departure = formatDate(departureDate);
    if (arrivalDate) arrival = formatDate(arrivalDate);

    if (displayOneWayOnly) {
      let date = new Date();
      departure = formatDate(new Date(date.getTime() + (3 * 24 * 60 * 60 * 1000)));
    };

    const ref = useRef<any>(null);

    const dTime = (departureTime.hour && departureTime.hour) + ':' + (departureTime.minute != '' ? departureTime.minute : '00');
    const aTime = radio != 'oneWay' ? ((arrivalTime.hour && arrivalTime.hour) + ':' + (arrivalTime.minute != '' ? arrivalTime.minute : '00')) : '';

    const resultLink = urlBaseCarRental + "&destination=" + selectedDeparture?.id + "&dropoffPoint=" + selectedDestination?.id + "&departureDate=" + departure + "&arrivalDate=" + (arrival ? arrival : '') + "&useSameDropoff=" + checked.samedropoff + "&pickupTime=" + dTime + "&dropoffTime=" + aTime + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;

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

    const overflowingDivRef = useRef<HTMLDivElement>();

    useEffect(() => {
      if (isMobile) return


      const overflowingDivrectangleStyles = overflowingDivRef.current?.getBoundingClientRect()
      const overflowingDivHeight = overflowingDivrectangleStyles?.height

      dispatch({
        type: TYPES.TRANSFERS_FORM_HEIGHT,
        payload: radio
      })

      dispatch({
        type: TYPES.TRANSFERS_SEARCH_FORM_HEIGHT,
        payload: overflowingDivHeight
      });

      return () => {
        dispatch({
          type: TYPES.TRANSFERS_SEARCH_FORM_HEIGHT,
          payload: 0
        })
      }
    }, [radio, window.location.pathname])

    // samedropoff controllers
    useEffect(() => {
        if(checked.samedropoff && selectedDeparture){
            if(!selectedDestination || (selectedDestination.id != selectedDeparture.id)){
                setSelectedDestination(
                    selectedDeparture
                );
            } else {
                setSelectedDestination(null);
            }
        } else if(checked.samedropoff && !selectedDeparture){
            setSelectedDestination(null);
        } else if(!checked.samedropoff){
            setSelectedDestination(null);
        }
    }, [checked]);

    // handle date selection
    const handleDateSelection = (date: any, type: string) => {
      switch (type) {
        case 'departure':
          setDepartureDate(date);
          setDisplayTimeSelect(!displayTimeSelect);
          setDisplayTimeSelect2(!displayTimeSelect2);
          break;
        case 'destination':
          setArrivalDate(date);
          setDisplayTimeSelect3(!displayTimeSelect3)
          break;
        default:
          break;
      }
    };

    // handle input change events
    const handleOnInputChange = (event: any, locationType: string) => {
      switch (locationType) {
        case 'departure':
          if (event == '') {
            setSelectedDeparture(null);
            if(checked.samedropoff) setSelectedDestination(null);
          }
          break;
        case 'destination':
          if (event == '') setSelectedDestination(null);
          break;
        default:
          break;
      }
    };

    // handle location selection change
    const handleLocationChange = (selected: any, type: string) => {
        switch (type) {
            case 'departure':
                setSelectedDeparture(selected);
                if(checked.samedropoff){ 
                  setSelectedDestination(selected);
                  departureDatePickerRef.current?.click()
                }
                break;
            case 'destination':
                setSelectedDestination(selected);
                departureDatePickerRef.current?.click()
                break;
            default:
                break;
        };
    };

    // console.log({errors});
    
    // handle auto focus
    const handleOnInputDone = () => {
        !checked.samedropoff ? setFieldFocused("dropOffInput") : setFieldFocused(null) ;
    };


    const selectInitialMonthForReturnDate = () => {
      let selectedDate = arrivalDate
      // if(typeof arrivalDate == 'undefined') {return departureDate} 
      if(arrivalDate?.getTime() < departureDate?.getTime()){
        selectedDate = departureDate
      } 
      if(!selectedDate){
        const minDateForReturnDate = (departureDate && dayjs(new Date(departureDate)).startOf('month').add(departureDate?.getDate() - 1, 'days').toDate()) ?? dayjs(new Date(transferSearchStartDate)).startOf('month').add(new Date(transferSearchStartDate).getDate() - 1, 'days').toDate()
        selectedDate = minDateForReturnDate
      }
      
      return selectedDate  
    }
  


    const RenderForm = () => {
      let history = useHistory()
      const useStyles = createStyles((theme) => ({
        calendarBase: {
          display: 'none',
        },
        root: {
          width: '100%',
          height: '100%'
        },
        input: {
          color: changeLighmode.mode === 'dark' ? '#fff' : '#000',
          fontSize: '16px',
          fontWeight: 500,
          paddingRight: 0,
          paddingTop: '1rem',
          height: '72px',


          [`@media (max-width: 768px)`]: {
            fontSize: '12px',
            fontWeight: 400,
            paddingRight: '10px !important',
            height: '54px'

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
      
      const { classes } = useStyles();

      const handleDepartureTime = () => {
        if (departureTime.hour == '' && departureTime.minute == '') {
          setDepartureTime({
            hour: '12',
            minute: '00'
          });
        };

        setDisplayTimeSelect2(false);
        if (ref.current) ref.current.click();
      };

      const handleArrivalTime = () => {
        if (arrivalTime.hour == '' && arrivalTime.minute == '') {
          setArrivalTime({
            hour: '12',
            minute: '00'
          });
        };

        setDisplayTimeSelect3(false);
      };
      
      return (
        <>
          <div className={`w-[100%] ${roundTripWrapperClassNames} relative
            `}
            style={{
              borderTopLeftRadius: history.location.pathname == '/transfers' ? '16px' : '0',
              // this is for increasing the height of the modal to avoid overflow of the guests input
              // if the form is rendered on a modal and the height guestsInputPopover minus 270 is bigger than zero then return it
              paddingBottom: isParentModal ? `${guestsInputPopoverHeight - 240 > 0 ? (guestsInputPopoverHeight - 240) : 0}px` : ''
            }}>
            <form className={`w-[100%] h-[100%] relative bg-white ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'} rounded-tr-xl md:py-[1px] ${roundedTopLeft}
                              ${isParentModal ? '' : 'md:h-[200px]'}
            `}>
              <div
                // @ts-ignore
                ref={overflowingDivRef}
                className={`w-full bg-white ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'} pb-4 rounded-2xl`}>
                <div className="w-[100%]">
                   <div className="w-[100%] flex flex-col md:flex-row justify-between py-3 md:py-0 mb-[0.7vh] md:mt-7 md:mb-[20px] md:h-[34px] px-5 md:px-2 lg:px-11">
                        <div className="flex flex-1 flex-col md:flex-row mb-3 md:mb-0">
                            <div className="flex items-center md:mx-2 p-3 bg-[#F4F8FF] dark:bg-opacity-10 rounded-[30px] cursor-pointer" onClick={() => setChecked({samedropoff: !checked.samedropoff, driverage: checked.driverage})}>
                              <div><input type='checkbox' onClick={() => setChecked({samedropoff: !checked, driverage: checked.driverage})} checked={checked.samedropoff} /></div>
                              <div className="text-sm text-[#000] dark:text-[#fff] ml-3 pt-[0.3vh]">{t("CAR_RENTAL_SEARCH_FORM.SAME_DROP-OFF")}</div>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-start md:justify-end" >
                        {
                            checked.driverage ? '' : <div className="w-[15%]  px-3 -translate-y-[2px] pb-2 flex justify-end cursor-pointer" >
                                                        <input defaultValue={25} className="w-[90%] h-[30px] rounded-xl text-center" placeholder="Driver" type="number" />
                                                     </div>
                        }
                           <div><input type='checkbox' className="cursor-pointer" onClick={() => setChecked({samedropoff: checked.samedropoff, driverage: !checked.driverage})} checked={checked.driverage} /></div>
                           <div className="text-sm text-[#000] dark:text-[#fff] ml-3 pt-[0.3vh] cursor-pointer" onClick={() => setChecked({samedropoff: checked.samedropoff, driverage: !checked.driverage})}>{t('CAR_RENTAL_SEARCH_FORM.DRIVER_AGED_BETWEEN_30-65_?')}</div>
                        </div>
                    </div> 
                </div>


                <div className={`w-[100%] 
                                  ${isParentModal ? 'grid grid-cols-2 gap-y-3 ' : 'px-3 md:px-2 lg:px-11 mt-3  flex flex-col md:flex-row justify-between md:h-[72px]'}
                `}>
                  <div className={`flex-1 md:mx-1 border ${errors.departure && (!selectedDeparture || selectedDeparture == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3]  dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl mb-2 md:mb-0 cursor-pointer`}>
                    <div className="relative w-[100%] h-[54px] md:h-[72px] mr-2">
                      {errors.departure && (!selectedDeparture || selectedDeparture == '') &&
                        <div className={`absolute -translate-x-[.4vw] translate-y-16 top-0 right-0`}>
                          <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                            <div className="translate-x-[9.5vw] -translate-y-3">
                              <div className="arrow-up"></div>
                            </div>
                            <div className="w-[10%] flex items-center md:mx-1">
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
                      <div className="text-xs md:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 md:px-5 pt-2 md:pt-3">{t("CAR_RENTAL_SEARCH_FORM.PICKUP")}</div>
                      <div className={`absolute top-0 w-full h-full flex items-center`}>
                        <LocationInput
                          defaultValue={defaultFrom !== '' ? defaultFrom : pickUpInputValue}
                          dontfetch={!isParentModal}
                          onChange={(e) => setPickUpInputValue(e)}
                          iconcolor={errors.departure ? '#FF2424' : '#AFB3E0'}
                          onInputDone={() => handleOnInputDone()}
                          onDestination={(selectedDeparture: any) => handleLocationChange(selectedDeparture, 'departure')}
                          placeHolder=""
                          tripType={ONLY_CAR}
                          desc=""
                          inputClassNames='md:!w-[calc(100%_-_40px)] '
                          onInputChange={(event: any) => handleOnInputChange(event, 'departure')}
                        />
                        {/* {errors.departure && <span className="text-[9px] text-red-900"> {errors.departure} </span>} */}
                      </div>
                    </div>
                  </div>
                  <div className={`flex-1 md:mx-1 border ${errors.destination && (!selectedDestination || selectedDestination == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0]'} rounded-2xl mb-2 md:mb-0 cursor-pointer`}>
                    <div className="relative w-[100%] h-[54px] md:h-[72px] mr-2">
                    {!checked.samedropoff && errors.destination && (!selectedDestination || selectedDestination == '') &&
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
                        <div className="text-sm text-[#000] dark:text-[#fff]  font-semibold px-4 md:px-5 pt-2 md:pt-3">{t("CAR_RENTAL_SEARCH_FORM.DROPOFF")}</div>
                        <div className={`absolute top-0 w-[100%] h-[100%] flex items-center ${checked.samedropoff && 'bg-slate-200 opacity-[.4] rounded-2xl'}`}>
                        { checked.samedropoff && <div className="text-sm text-[gray] dark:text-[#000] font-semibold px-4 md:px-5 pt-2 md:pt-3">{t("CAR_RENTAL_SEARCH_FORM.DROPOFF")}</div> }
                            <LocationInput
                                defaultValue={defaultTo ? defaultTo : ((!checked.samedropoff && selectedDestination ? selectedDestination.label : '') ?? dropOffInputValue)}
                                dontfetch={!isParentModal}
                                iconcolor={!checked.samedropoff && errors.destination ? '#FF2424' : '#AFB3E0'}
                                onChange={(e) => setDropOffInputValue(e)}
                                onInputDone={() => setFieldFocused(null)}
                                onDestination={(selectedDestination: any) => handleLocationChange(selectedDestination, 'destination')}
                                placeHolder=""
                                desc=""
                                tripType={ONLY_CAR}
                                autoFocus={fieldFocused == "dropOffInput"}
                                inputClassNames='md:!w-[calc(100%_-_40px)] pt-3 md:pt-3'
                                onInputChange={(event: any) => handleOnInputChange(event, 'destination')}
                                isDisabled={checked.samedropoff}
                            />
                        </div>
                    </div>
                </div>
                </div>
                <div className={`w-[100%]`}>
                  <div className={`w-[100%] mt-3 ${isParentModal ? 'grid grid-cols-1 gap-y-3' : ' px-3 lg:px-11 flex flex-col md:flex-row justify-between'}`}>
                    <div className={`w-[100%] h-[54px] md:h-[72px] flex md:mr-2 border ${(errors.date || errors.time) && (!departureDate || departureDate == '' || departureTime.hour == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl mb-2 md:mb-0`}>
                      <div className="relative w-[50%] md:my-0 flex justify-end border-r border-[#AFB3E0] cursor-pointer">
                        <div className="absolute top-0 left-0 w-full h-full">
                          {(errors.date || errors.time) && (!departureDate || departureDate == '' || departureTime.hour == '') &&
                            <div className={`absolute translate-y-[6vh] ${errors.date ? 'translate-x-[8vw]' : 'translate-x-[250px]'} top-0 right-0`}>
                              <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                                <div className="translate-x-[2vw] -translate-y-3">
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
                                  {errors.date ?? errors.time}
                                </div>
                              </div>

                            </div>}
                          <div className="mt-[0.3vh] text-xs md:text-sm text-[#000] dark:text-[#fff] font-semibold pl-4 pr-4 md:px-5 pt-2 md:pt-3">{t('DATE')} </div>
                          <div className="absolute top-0 w-[100%] h-[100%] flex items-center text-sm">
                            <DatePicker
                              placeholder={t("SELECT_DATE")}
                              amountOfMonths={isMobile ? 1 : 2}
                              dropdownType={"popover"}
                              onChange={date => handleDateSelection(date, 'departure')}
                              defaultValue={departureDate}
                              minDate={dayjs(transferSearchStartDate).startOf('month').add(transferSearchStartDate.getDate() - 1, 'days').toDate()}
                              initialMonth={dayjs(transferSearchStartDate).startOf('month').add(transferSearchStartDate.getDate() - 1, 'days').toDate()}
                              classNames={{
                                input: classes.input,
                                root: classes.root,
                                monthPickerControlActive: classes.activeMonth,
                                yearPickerControlActive: classes.activeYear,
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
                              ref={departureDatePickerRef}
                            />
                            {/* {errors.date && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}
                          </div>
                        </div>
                        <div><div className="h-[100%] flex items-center px-3"><i className={`fa fa-calendar ${errors.date && (!departureDate || departureDate == '') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}`} aria-hidden="true"></i></div></div>
                      </div>
                      <div ref={firstTimeInputcontainerRef} data-container-name='firstTimeInput' className="w-[50%] relative py-[.5vh] flex justify-between cursor-pointer">
                        <div className="w-[100%]">
                          <div className="mt-[0.3vh] md:mt-0 text-xs md:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 md:px-4 pt-2 md:pt-3">{t("CAR_RENTAL_SEARCH_FORM.TIME")}</div>
                          <div className="absolute w-full h-full top-0 left-0" onClick={() => { setDisplayTimeSelect2(!displayTimeSelect2); setDisplayTimeSelect3(false) }}>
                            <div className={`cursor-pointer absolute z-1 w-full px-4 pt-8 text-xs md:text-[14px] text-[#555] ${departureTime.hour == '' && departureTime.minute == '' ? '' : 'hidden'}`}>{t("CAR_RENTAL_SEARCH_FORM.TIME")}</div>
                            <div className={`absolute z-5 w-full ${departureTime.hour == '' && departureTime.minute == '' ? 'hidden' : ''}`}>
                              <TimeField
                                value={departureTime.hour + ':' + departureTime.minute}
                                onChange={(e) => setDepartureTime({ hour: '', minute: '' })}
                                colon=":"
                                showSeconds={false}
                                input={<TimeInput />}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="h-[100%] flex items-center px-2">
                          <ClockIcon className="text-[#3944B3] dark:text-white" />
                        </div>
                        <div className={`absolute ${displayTimeSelect2 ? '' : 'hidden'} z-[99999] min-w-[220px] bg-[#fff] dark:bg-[#202232] border-2 border-[#B0B4E1] rounded-xl -translate-x-12 md:translate-x-0
                          ${isParentModal ? 'bottom-20' : 'top-14 md:top-20'}
                        `}>
                          <div className="w-[100%] flex justify-between px-5 py-2">
                            <div>
                              {/* TODO: implement list box component by list type  displayTimeSelect*/}
                              <Listbox
                                value={departureTime.hour + ':' + departureTime.minute} onChange={(val: any) => setDepartureTime({ hour: val, minute: departureTime.minute })} >
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default border-2 border-[#B0B4E1] rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">
                                      {departureTime.hour == '' ? '12' : departureTime.hour}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute text-black z-50 mt-1 max-h-60 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {
                                        hours?.map((hour: any, idx: number) => (
                                          <Listbox.Option
                                            key={idx}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-2 md:pl-0 flex justify-center pr-4 ${active ? 'bg-[#4E5CF4] text-white' : 'text-gray-900'
                                              }`
                                            }
                                            value={hour}
                                          >
                                            {hour}
                                          </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>
                            <div>

                              {/* TODO: implement list box component by list type  */}
                              <Listbox
                                value={departureTime.hour + ':' + departureTime.minute}
                                onChange={(val: any) => setDepartureTime({ hour: departureTime.hour, minute: val })}
                              >
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default border-2 border-[#B0B4E1] rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">
                                      {departureTime.minute == '' ? '00' : departureTime.minute}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute text-black z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {
                                        minutes.map((minute: any, idx: number) => (
                                          <Listbox.Option
                                            key={idx}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-2 md:pl-10 pr-4 ${active ? 'bg-[#4E5CF4] text-white' : 'text-gray-900'
                                              }`
                                            }
                                            value={minute}
                                          >
                                            {minute}
                                          </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                              {/* </select> */}
                            </div>
                          </div>
                          <div className="w-[100%] flex justify-center my-5">
                            <div onClick={() => handleDepartureTime()} className="w-[80%] h-[43px] cursor-pointer bg-[#4E5CF4] text-[#fff] text-[14px] font-semibold rounded-full flex justify-center items-center">
                              Done
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div onClick={() => dispatch({ type: TYPES.TRAVELLERS, payload: { status: false } })} className={`w-[100%] h-[54px] md:h-[72px] flex border ${(errors._date || errors._time) && (!arrivalDate || arrivalDate == '' || errors.type == 'comparison' || arrivalTime.hour == '') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} rounded-2xl`}>
                      <div className="relative w-[50%] md:my-0 flex justify-end cursor-pointer" style={{ borderRight: '.1vw solid #D7DAF0' }}>
                        <div className="absolute top-0 left-0 w-full h-full">
                          {(errors._date || errors._time) && (!arrivalDate || arrivalDate == '' || errors.type == 'comparison' || arrivalTime.hour == '') &&
                            <div className={`absolute translate-y-[6vh] ${errors._date ? 'translate-x-[10vw]' : 'translate-x-[250px]'} top-0 right-0`}>
                              <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                                <div className="translate-x-[.2vw] -translate-y-3">
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
                                  {errors._date ?? errors._time}
                                </div>
                              </div>
                            </div>}
                          <div className="mt-[0.3vh] text-xs md:text-sm text-[#000] dark:text-[#fff] font-semibold pl-4 pr-4 md:px-5 pt-2 md:pt-3">{t("DATE")}</div>
                          <div className="absolute top-0 w-[100%] h-[100%] flex items-center text-sm">
                            <DatePicker
                              placeholder={t("SELECT_DATE")}
                              onChange={date => handleDateSelection(date, 'destination')}
                              amountOfMonths={isMobile ? 1 : 2}
                              dropdownType={"popover"}
                              zIndex={!TravellersEvent || TravellersEvent == undefined ? 10000 : -10000}
                              // initialMonth={departureDate && departureDate}
                              initialMonth={ 
                                (function () {
                                  // console.log('Car-Rental initial Month', selectInitialMonthForReturnDate())
                                 return selectInitialMonthForReturnDate() 
                                })()
                              }
                              minDate={(departureDate && dayjs(new Date(departureDate)).startOf('month').add(departureDate?.getDate() - 1, 'days').toDate()) ?? dayjs(new Date(transferSearchStartDate)).startOf('month').add(new Date(transferSearchStartDate).getDate() - 1, 'days').toDate()
                              }
                              defaultValue={arrivalDate}
                              ref={ref}
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
                                root: classes.root,
                                monthPickerControlActive: classes.activeMonth,
                                yearPickerControlActive: classes.activeYear,      
                                calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase
                              }}
                            />
                            {/* {errors._date && <span className="text-[9px] text-red-900"> {errors._date} </span>} */}
                          </div>
                        </div>
                        <div><div className="h-[100%] flex items-center px-3"><i className={`fa fa-calendar ${errors._date ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}`} aria-hidden="true"></i></div></div>
                      </div>
                      <div ref={secondTimeInputcontainerRef} data-container-name='secondTimeInput' className="w-[50%] relative py-[.5vh] flex justify-between cursor-pointer">
                        <div className="w-[100%]">
                          <div className="mt-[0.3vh] md:mt-0 text-xs md:text-sm text-[#000] dark:text-[#fff] font-semibold px-4 md:px-4 pt-2 md:pt-3">{t("CAR_RENTAL_SEARCH_FORM.TIME")}</div>
                          <div className="absolute top-0 left-0 w-full h-full" onClick={() => { setDisplayTimeSelect3(!displayTimeSelect3); setDisplayTimeSelect2(false) }}>
                            <div className={`cursor-pointer absolute z-1 w-full px-4 pt-8 text-xs md:text-[14px] text-[#555] ${arrivalTime.hour == '' && arrivalTime.minute == '' ? '' : 'hidden'}`}>{t("CAR_RENTAL_SEARCH_FORM.TIME")}</div>
                            <div className={`absolute z-5 w-full ${arrivalTime.hour == '' && arrivalTime.minute == '' ? 'hidden' : ''}`}>
                              <TimeField
                                value={arrivalTime.hour + ':' + arrivalTime.minute}
                                onChange={(e) => setArrivalTime({ hour: '', minute: '' })}
                                colon=":"
                                showSeconds={false}
                                input={<TimeInput />}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="h-[100%] flex items-center px-2">
                          <ClockIcon className="text-[#3944B3] dark:text-white" />
                        </div>
                        <div className={`absolute ${displayTimeSelect3 ? '' : 'hidden'} z-[99999] min-w-[220px] bg-[#fff] dark:bg-[#202232] border-2 border-[#B0B4E1] rounded-xl -translate-x-12 md:translate-x-0
                                        ${isParentModal ? 'bottom-20' : 'top-14 md:top-20'}
                        `}>
                          <div className="w-[100%] flex justify-between px-5 py-2">
                            <div>
                              {/* TODO: implement list box component by list type  displayTimeSelect*/}
                              <Listbox
                                value={arrivalTime.hour + ':' + arrivalTime.minute} onChange={(val: any) => setArrivalTime({ hour: val, minute: arrivalTime.minute })} >
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default border-2 border-[#B0B4E1] rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">
                                      {arrivalTime.hour == '' ? '12' : arrivalTime.hour}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute text-black z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {
                                        hours?.map((hour: any, idx: number) => (
                                          <Listbox.Option
                                            key={idx}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-2 md:pl-0 flex justify-center pr-4 ${active ? 'bg-[#4E5CF4] text-white' : 'text-gray-900'
                                              }`
                                            }
                                            value={hour}
                                          >
                                            {hour}
                                          </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>
                            <div>
                              {/* TODO: implement list box component by list type  */}
                              <Listbox
                                value={arrivalTime.hour + ':' + arrivalTime.minute}
                                onChange={(val: any) => setArrivalTime({ hour: arrivalTime.hour, minute: val })}
                              >
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default border-2 border-[#B0B4E1] rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">
                                      {arrivalTime.minute == '' ? '00' : arrivalTime.minute}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute text-black z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {
                                        minutes.map((minute: any, idx: number) => (
                                          <Listbox.Option
                                            key={idx}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-2 md:pl-10 pr-4 ${active ? 'bg-[#4E5CF4] text-white' : 'text-gray-900'
                                              }`
                                            }
                                            value={minute}
                                          >
                                            {minute}
                                          </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                              {/* </select> */}
                            </div>
                          </div>
                          <div className="w-[100%] flex justify-center my-5">
                            <div onClick={() => handleArrivalTime()} className="w-[80%] h-[43px] cursor-pointer bg-[#4E5CF4] text-[#fff] text-[14px] font-semibold rounded-full flex justify-center items-center">
                              Done
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center justify-center h-[93%] md:h-[72px] !mt-2 md:!mt-0 
                                      ${isParentModal ? '' : ' md:px-2'}
                    `}>
                      <SearchButton
                        link={resultLink}
                        passengers={guestValue}
                        type="transfers"
                        trip='roundTrip'
                        date={departureDate}
                        _date={arrivalDate}
                        classNames={`!w-full !h-[54px] md:!h-[72px] ${isParentModal ? '' : 'md:!w-[74px]'}`}
                        onErrors={(errors: any) => setErrors(errors)}
                        destination={selectedDestination}
                        departure={selectedDeparture}
                        departureTime={departureTime}
                        arrivalTime={arrivalTime}
                        textClassNames={`${isParentModal ? 'md:!inline-block' : ''}`}
                      />
                    </div>
                  </div>
                  <TermsOfServiceText wrapperClassNames="px-5"/>
                </div>
              </div>
            </form>
          </div>
          {/* </div> */}
        </>
      );
    };
    return RenderForm();
  }
)

export default CarRentalSearchForm;
