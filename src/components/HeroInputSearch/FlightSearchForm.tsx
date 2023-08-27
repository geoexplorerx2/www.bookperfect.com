import React, { useEffect, useRef, useState, useMemo, createRef } from "react";
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
import dayjs from 'dayjs';
import BASE_URL_HOME from "../../api/env";
import { formatDate } from "../../common/formatDate";
import ButtonPrimary from "../../lib/Button/ButtonPrimary";
import randomId from "../../common/randomId";
import { removeUndefined } from "../../common/removeUndefined";
import { useMantineTheme } from '@mantine/core';
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux";
import { createStyles } from '@mantine/core';
import { useDispatch } from "react-redux";
import { MULTISTOP } from "../../store/actions";
import { LOCATIONID } from "../../store/actions";
import useWindowSize from "../../hooks/useWindowSize";
import { ReactComponent as BigTrashIcon } from '../../images/icons/bigTrashIcon.svg'
import TYPES from "../../types/store";
import { destinationDetail } from "../../store/actions/TravelguideActions";
import TermsOfServiceText from "../TermsOfServiceText/TermsOfServiceText";
import moment from "moment";
import { isEmptyObject } from "jquery";
import { sortByIndex, TranslateIfExists } from "../../helpers";
import { useTranslation } from "react-i18next";

export const urlBaseFlight = BASE_URL_HOME + "/home?directSubmit=true&tripType=ONLY_FLIGHT";

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

export interface FlightSearchFormProps {
  radioHeight: string;
  showClassGuest: boolean;
  roundedTopLeft: string;
  customStyle: any;
  defaultFrom?: any;
  defaultTo?: any;
  type?: any;
  wrapperClassName?: string
  displayType?: string;
  isParentModal?: boolean;
  searchcardplace?: string;
};

interface MultiStopProps {
  id: string,
  deleteIcon: boolean
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


export const plusIcon = <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
  <path d="M14.324 8.48H8.08V14.78H6.26V8.48H0.0440002V6.8H6.26V0.5H8.08V6.8H14.324V8.48Z" />
</svg>;

export const trashIcon = <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M27 7H5" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M13 13V21" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M19 13V21" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>;

const FlightSearchForm: FC<FlightSearchFormProps> = (props) => {

  const {
    radioHeight = "",
    showClassGuest,
    roundedTopLeft = "",
    customStyle,
    defaultFrom = "",
    defaultTo = "",
    type = "",
    wrapperClassName = '',
    displayType = "",
    isParentModal = false,
    searchcardplace,

  } = props

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const flightSearchFormHeight = useSelector((state: any) => state.DynamicStyles);
  const TravellersEvent: any = useSelector((state: any) => state.TravellersReducer.status);
  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  // const LayoutReducer = useSelector((state:any)=>state.LayoutReducer.status)  ;
  const [pickUpInput, setPickUpInput] = useState("");
  const [dropOffInput, setDropOffInput] = useState("");

  // const [fieldFocused, setFieldFocused] = useState<"dropOffInput" | "dropOff"  | null
  // >(null);
  const [fieldFocused, setFieldFocused] = useState<any>(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "oneWay" | "roundTrip" | "multiStop" | ""
  >("roundTrip");
  const [flightClassState, setFlightClassState] = useState("Economy");

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [value, setValue] = useState();
  const [guestValue, setGuestValue] = useState<any>([]);

  const [errors, setErrors] = useState<any>({});
  const [childrenAges, setChildrenAges] = useState();

  const changeLighmode = useSelector((state: any) => state.LightMode);
  const dispatch = useDispatch();

  // determine if we are on the mobile
  const [isMobile, setIsMobile] = useState<boolean>()
  const windowSize = useWindowSize();
  // @ts-ignore
  const { t } = useTranslation()
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

  const guestsInputPopoverHeight = useSelector((state: any) => state.DynamicStyles.guestsInputPopoverHeight)
  // this padding is based on the height of the GuestsInput component to avoid overflowing parent
  const [modalFormPadding, setModalFormPadding] = useState(Math.ceil(guestsInputPopoverHeight))

  useEffect(() => {

    if (isParentModal && !isMobile) {
      setModalFormPadding(Math.ceil(guestsInputPopoverHeight))
    }

  }, [guestsInputPopoverHeight, dropOffLocationType])



  const [selectedDestination, setSelectedDestination] = useState<any>([
    {
      id: null,
      value: null
    }
  ]);
  const [selectedDeparture, setSelectedDeparture] = useState<any>([{
    id: null,
    value: null
  }]);

  const [departureDate, setDepartureDate] = useState<any>([
    // {
    // id: null,
    // date: null
    // }
  ]);

  const [returnDate, setReturnDate] = useState<any>([
    {
      id: null,
      date: null,
      unformattedDate: null,
      index: 0
    }
  ]);
  const [multiStopRow, setMultiStopRow] = useState<any>(
    [
      {
        id: randomId(),
        deleteIcon: false,
        index: 0
      },
      {
        id: randomId(),
        deleteIcon: false,
        index: 1
      }
    ]
  );

  const [roundTrip, setRoundTrip] = useState(false);

  const [checkInDate, setCheckInDate] = useState<any>();
  const [checkOutDate, setCheckOutDate] = useState<any>();
  const [counter, setCounter] = useState<any>(0);


  const overflowingDivRef = useRef<HTMLDivElement>(null);
  const ref = useRef<any>(null);
  const FromLocatinInputContainerRef = useRef<HTMLDivElement>(null);
  const startDateRefs = useRef<HTMLInputElement[]>([])


  const multiStopSearchStartDate = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000));

  useEffect(() => {

    if (isMobile) return;

    const overflowingDivrectangleStyles = overflowingDivRef.current?.getBoundingClientRect()
    const overflowingDivHeight = overflowingDivrectangleStyles?.height

    dispatch({
      type: TYPES.FLIGHTS_FORM_HEIGHT,
      payload: overflowingDivHeight
    });

    return () => {
      dispatch({
        type: TYPES.FLIGHTS_FORM_HEIGHT,
        payload: 0
      })
    }

    
  }, [multiStopRow, dropOffLocationType, window.location.pathname])


  let departure: string;
  let returnd: string;

  // if (departureDate) departure = formatDate(departureDate);
  // if (returnDate) returnd = formatDate(returnDate);
  // home?directSubmit=true&tripType=ONLY_FLIGHT&destination=Destination::PAR&departure=Destination::IST&departureDate=30/07/2022&arrivalDate=&roundTripFlight=false&distribution=2-2-12,12&businessCabin=false&lang=EN
  // const resultLink = urlBaseFlight + "&destination=" + selectedDestination?.id + "&departure=" + selectedDeparture?.id + "&departureDate=" + departure + "&arrivalDate=" + (returnd || "") + "&roundTripFlight=" + (dropOffLocationType == 'roundTrip') + "&distribution=" + guestAdultsInputValue + "-" + guestChildrenInputValue + "&businessCabin=false&lang=EN";
  // multi dl

  // create muti destination
  const getDestination = (rowId: any) => {
    let rowDest = selectedDestination && selectedDestination.filter((sDest: any) => sDest.id == rowId);

    return rowDest && rowDest.length > 0 && rowDest[0].selected.id;
  };

  const getDepartureDate = (rowId: any) => {
    let rowDate = departureDate && departureDate.filter((sDepart: any) => sDepart.id == rowId);

    return rowDate && rowDate.length > 0 && rowDate[0].date;
  };

  const connections = sortByIndex(selectedDeparture)?.slice(1).
  map((departure: { id: any, selected: { id: any; }, index: any }, index: number) => (departure && departure.selected && departure.selected.id + "_" + getDestination(departure.id) + "$" + getDepartureDate(departure.id) + "$0"));
  const distributions = guestValue?.map((guest: any) => guest.adults + "-" + guest.children + "-" + childrenAges);

  // TODO: update selectedDeparture && selectedDestination
  // console.log({connections},{selectedDeparture}, {selectedDestination});
  // console.log({errors}, {departureDate});

  const resultLink: any = () => {
    switch (dropOffLocationType) {
      case 'oneWay':
        return urlBaseFlight + "&destination=" + (selectedDestination && selectedDestination[selectedDestination.length - 1] && selectedDestination[selectedDestination.length - 1].selected?.id) + "&departure=" + (selectedDeparture && selectedDeparture[selectedDeparture.length - 1].selected?.id) + "&departureDate=" + (departureDate && departureDate[departureDate.length - 1] && departureDate[departureDate.length - 1].date) + "&arrivalDate=" + ((returnDate && returnDate[returnDate.length - 1] && returnDate[returnDate.length - 1].date) || "") + "&roundTripFlight=false" + "&distribution=" + distributions.join("::") + "&businessCabin=" + (flightClassState == 'Business' ? "true" : "false") + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
      case 'roundTrip':
        return urlBaseFlight + "&destination=" + (selectedDestination && selectedDestination[selectedDestination.length - 1] && selectedDestination[selectedDestination.length - 1].selected?.id) + "&departure=" + (selectedDeparture && selectedDeparture[selectedDeparture.length - 1] && selectedDeparture[selectedDeparture.length - 1].selected?.id) + "&departureDate=" + (departureDate && departureDate[departureDate.length - 1] && departureDate[departureDate.length - 1].date) + "&arrivalDate=" + ((returnDate && returnDate[returnDate.length - 1] && returnDate[returnDate.length - 1].date) || "") + "&roundTripFlight=true" + "&distribution=" + distributions.join("::") + "&businessCabin=" + (flightClassState == 'Business' ? "true" : "false") + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
      case 'multiStop':
        return urlBaseFlight + "&connections=" + removeUndefined(connections).join() + "&multiTransport=true&distribution=" + distributions.join("::") + "&businessCabin=" + (flightClassState == 'Business' ? "true" : "false") + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
      default:
        break;
    }
  };

  // find add transport
  const handleMultiStop = () => {
    setCounter(counter + 1);
    dispatch({
      type: TYPES.EXCLUSIVE_OFFERS_VIEW,
      payload: {
        status: `addTransport${counter}`
      }
    });
    setMultiStopRow((prevState: any) => [...prevState, { id: randomId(), deleteIcon: true, index: counter + 2 }]);
  };

  const removeMultiStopRow = (id: string) => {
    if (counter > 0) {
      setCounter(counter - 1)
      setTimeout(() => dispatch({ type: TYPES.EXCLUSIVE_OFFERS_VIEW, payload: { status: `addTransport${counter - 2}` } }), 100)
    }
    setMultiStopRow((row: any) =>
      row.filter((rw: any) => {
        return rw.id !== id;
      })
    );

    setSelectedDeparture((prevState: any) => prevState.filter( (departure:any) => departure.id !== id))
    setSelectedDestination((prevState: any) => prevState.filter( (destination:any) => destination.id !== id))
    setDepartureDate((prevState: any) => prevState.filter( (departureDate:any) => departureDate.id !== id))
    

  };

  const handleOnInputChange = (event: any, row: any, locationType: any) => {
    if (event == '') {
      switch (locationType) {
        case 'departure':
          setSelectedDeparture((sDeparture: any) =>
            sDeparture.filter((sd: any) => {
              return sd.id !== row.id;
            })
          );
          break;
        case 'destination':
          setSelectedDestination((sDestination: any) =>
            sDestination.filter((sd: any) => {
              return sd.id !== row.id;
            })
          );
          break;
        default:
          break;
      }
    }
  };



  const handleSelectLocation = (row: any, selected: any, locationType: string, index?: any) => {
    switch (locationType) {
      case 'departure':
        // if (selectedDeparture && selectedDeparture.length > 0 && index == 0) {
        //   // selectedDeparture.splice(1, 0, { id: row.id, selected: selected, index: index });
        //   // selectedDeparture.map((sDeparture: any ) => {
        //   //   if(sDeparture.id === row.id){
        //   //     sDeparture.selected = selected
        //   //   }
        //   // })

        //   selectedDeparture[1] = { id: row.id, selected, index }

        // } else {
        //   selectedDeparture.splice(index + 1, 0, { id: row.id, selected: selected, index: index });
        //   // setSelectedDeparture((prev: any) => [...prev, { id: row.id, selected: selected, index: index }]);
        // }

        let departuresCopy = [...selectedDeparture]

        let existingDeparture = departuresCopy.filter((departure: any) => departure.id == row.id)

        if (existingDeparture && existingDeparture.length > 0) {

          departuresCopy = departuresCopy.map((departure: any) => {

            if (departure.id == existingDestination[0]?.id) {
              departure.selected = selected
              return departure
            }

            return departure
          })

        } else {
          departuresCopy = [...departuresCopy, { id: row.id, selected, index }]
        }

          setSelectedDeparture(departuresCopy)

        break;
      case 'destination':
        // setSelectedDestination((prev: any) => [...prev, { id: row.id, selected: selected }]);

        // the strategy is to see if the destination selected by the user existis
        // if yes edit the location stored inside the object 
        // if not add a new object at the end of the array selectedDestination 
        let destinationsCopy = [...selectedDestination]

        let existingDestination = destinationsCopy.filter((destination: any) => destination.id == row.id)

        if (existingDestination && existingDestination.length > 0) {

          destinationsCopy = destinationsCopy.map((destination: any) => {

            if (destination.id == existingDestination[0]?.id) {
              destination.selected = selected
              return destination
            }

            return destination
          })

        } else {
          destinationsCopy = [...destinationsCopy, { id: row.id, selected, index }]
        }

          setSelectedDestination(destinationsCopy)
          if(!isParentModal){
            // @ts-ignore
            startDateRefs.current[index]?.current.click() 
          } 

          
        break;
      case 'departuredate':

        let isRowExist = departureDate.find((dd: any) => (dd.id == row.id && dd.date));

        if (isRowExist && isRowExist.id == row.id) {
          setDepartureDate((sDepartureDate: any) =>
            sDepartureDate.filter((sdd: any) => {
              return sdd.id !== row.id;
            })
          );

          setDepartureDate((prev: any) => {
            return [
              ...prev,
              {
                id: row.id,
                date: formatDate(selected),
                unformattedDate: selected,
                index: index
              }
            ]
          });

        } else {
          setDepartureDate((prev: any) => {
            return [
              ...prev,
              {
                id: row.id,
                date: formatDate(selected),
                unformattedDate: selected,
                index: index
              }
            ]
          });
        };

        if (index == 0) {
          setCheckInDate(selected);
        };

        // auto fill 
        let nextIndex = index + 1;
        let rowLength = multiStopRow.length;

        if (rowLength > nextIndex) {
          let nextRowId = multiStopRow[nextIndex] && multiStopRow[nextIndex].id;
          let departExist = selectedDeparture.find((d: any) => d.id === nextRowId);
          let destFound = selectedDestination.find((d: any) => d.id == row.id);

          if (!departExist && destFound && dropOffLocationType == 'multiStop') {
            selectedDeparture.splice(
              selectedDeparture.length,
              0,
              {
                id: nextRowId,
                selected: destFound.selected,
                index: nextIndex
              }
            );
          } else if (departExist && destFound && dropOffLocationType == 'multiStop') {
            return
            // selectedDeparture.map((sd: any, i: number) => {
            //   if(sd.id == departExist.id){
            //     setSelectedDeparture((sDeparture: any) =>
            //       sDeparture.filter((sd: any) => {
            //           return sd.id !== departExist.id;
            //       })
            //     );   
            //     setSelectedDeparture((prev: any) => [
            //       ...prev, 
            //       { 
            //         id: nextRowId, 
            //         selected: destFound.selected, 
            //         index: nextIndex 
            //       }
            //     ])
            //   }
            // });    

          }
        };
        if (selected?.getTime() > returnDate[0]?.unformattedDate?.getTime())
          setReturnDate((ReturnDates: any) => (

            ReturnDates.map((Rdate: any) => {
              if (Rdate.index == index) {
                // because moment.js modifies the original input a copy of the date is made
                let selectedDate = selected

                Rdate.unformattedDate = selectedDate
                Rdate.date = formatDate(selectedDate)
                return Rdate
              }
              return Rdate
            })
          )
          );

        if (ref.current) ref.current.click();
        break;
      case 'returndate':
        // setReturnDate((prev: any) => [...prev, { id: row.id, date: formatDate(selected), unformattedDate: selected, index }]);
        setReturnDate((ReturnDates: any) => (

          ReturnDates.map((Rdate: any) => {
            if (Rdate.index == row.index) {
              // because moment.js modifies the original input a copy of the date is made
              let selectedDate = selected

              //  const nextDayOfTheSelectedDate = moment(selectedDate).add(1, 'days').toDate()

              Rdate.unformattedDate = selectedDate
              Rdate.date = formatDate(selectedDate)
              Rdate.id = row.id
              Rdate.index = index
              return Rdate
            }
            return Rdate
          })
        ))
        setCheckOutDate(selected);
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   console.log("StartDate Focus: startDateRef", startDateRef)
  // }, [startDateRef])

  const selectDefaultValueForDestination = (index: number) => {
    const selectedValue = selectedDestination?.filter((sDestination: any) => sDestination.index == index)[0]?.selected?.label
    return selectedValue
  }

  const selectValueFroDepartureDate = (index: number) => {
    const selectedValue = departureDate.filter((dDate: any) => dDate.index === index)[0]?.unformattedDate
    return selectedValue
  }


  const selectInitialMonthForDepartureDate = (index: number) => {
    const checkInDateOnThePreviousRow = departureDate.filter((dDate: any) => dDate.index == (index - 1))[0]?.unformattedDate
    // the strategy is that, we want the initial month be the value that is being shown as the placeholder on the datepicker 
    // other wise use the checkInDateOntheSameRow
    const theValueOfTheInput = selectValueFroDepartureDate(index)

    let selectedInitialMonth;
    if (theValueOfTheInput && theValueOfTheInput.getTime() > checkInDateOnThePreviousRow?.getTime()) {
      selectedInitialMonth = theValueOfTheInput
    } else {
      selectedInitialMonth = checkInDateOnThePreviousRow ?? checkInDate
    }

    // return  theValueOfTheInput ?? checkInDateOntheSameRow ?? checkInDate 
    return selectedInitialMonth
  }



  const selectInitialMonthForReturnDate = (index: number) => {
    const checkInDateOntheSameRow = departureDate.filter((dDate: any) => dDate.index == index)[0]?.unformattedDate
    // the strategy is that, we want the initial month be the value that is being shown as the placeholder on the datepicker 
    // other wise use the checkInDateOntheSameRow
    const theValueOfTheInput = selectValueForReturnDate(index)

    let selectedInitialMonth;
    if (theValueOfTheInput && theValueOfTheInput?.getTime() > checkInDateOntheSameRow?.getTime()) {
      selectedInitialMonth = theValueOfTheInput
    } else {
      selectedInitialMonth = checkInDateOntheSameRow ?? checkInDate
    }

    // return  theValueOfTheInput ?? checkInDateOntheSameRow ?? checkInDate 
    return selectedInitialMonth
  }

  const selectValueForReturnDate = (index: number) => {
    const selectedValue = returnDate.filter((rDate: any) => rDate.index === index)[0]?.unformattedDate

    return selectedValue
  }

  const hasErrors = (rowId: any, locationType: string) => {
    switch (locationType) {
      case 'destination':
        return selectedDestination.find((sd: any) => sd.id == rowId);;
      case 'departure':
        return selectedDeparture.find((sd: any) => sd.id == rowId);
      case 'departuredate':
        return errors.type == 'comparison' ? false : departureDate.find((sdd: any) => sdd.id == rowId);
      case 'returndate':
        return returnDate.find((srd: any) => srd.id == rowId);
      default:
        break;
    }
  };

  // check if we can auto fill 
  const autoFillAvail = (row: any) => {
    let departFound = selectedDeparture.filter((_row: any) => _row.id == row.id)[0];

    return departFound && departFound.selected.label
  };

  // start date
  const startInitialDate = (index: any) => {
    let prevDate = departureDate && departureDate?.filter((sD: any) => sD.index == index - 1)[0];
    return (index == 0 ? multiStopSearchStartDate : (prevDate?.unformattedDate) ?? multiStopSearchStartDate);
  };

  // console.log({selectedDeparture});
  // show row limit for differnt tab
  const showRow = dropOffLocationType !== 'multiStop' ? multiStopRow.slice(0, 1) : multiStopRow;
   startDateRefs.current = showRow.map((row: any, index: number) => startDateRefs.current[index] ?? createRef())

  useEffect(() => {
    if (departureDate && !isEmptyObject(errors)) {

      // let dDateRow = departureDate[departureDate.length - 1]?.id
      let dDateRow = departureDate.find((dP: any) => dP.id == errors.id)?.id
      hasErrors(dDateRow, 'departuredate')
      if (dDateRow == errors.id) {
        setErrors([])

      }

    }


  },
    [departureDate])

  // autofill next depature location if prev has destination 
  useEffect(() => {
    if (multiStopRow) {
      let rowLength = multiStopRow.length;
      let nextIndex = rowLength - 1;
      let prevIndex = rowLength - 2;

      if (rowLength > nextIndex) {
        let nextRowId = multiStopRow[nextIndex] && multiStopRow[nextIndex].id;
        let prevRowId = multiStopRow[prevIndex] && multiStopRow[prevIndex].id;

        let departExist = selectedDeparture.find((d: any) => d.id === nextRowId);
        let destFound = selectedDestination.find((d: any) => d.id == prevRowId);

        if (!departExist && destFound && dropOffLocationType == 'multiStop') {
          selectedDeparture.splice(
            selectedDeparture.length,
            0,
            {
              id: nextRowId,
              selected: destFound.selected,
              index: nextIndex
            }
          );
        }
      };
    }
  }, [multiStopRow]);

  const renderSelectClass = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >
                <span className={localStorage.getItem('theme') == 'dark' ? 'text-[#fff]' : ''}>{`${flightClassState}`}</span>
                <ChevronDownIcon
                  className={`${open ? "" : "text-opacity-70"
                    } ${localStorage.getItem('theme') == 'dark' ? 'text-[#fff] ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150' :
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
                <Popover.Panel className="absolute z-[12] w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
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
                          className={localStorage.getItem('theme') == 'dark' ? "text-[#fff] flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50" :
                            "flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"}
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
  const RenderRadio = () => {
    let history = useHistory()
    const SET_MultiStop = () => {
      //find me:
      dispatch({ type: TYPES.EXCLUSIVE_OFFERS_VIEW, payload: { status: 'multiStop' } });
      setDropOffLocationType("multiStop");
    }
    const SET_roundTrip = () => {
      dispatch({ type: TYPES.EXCLUSIVE_OFFERS_VIEW, payload: { status: 'roundTrip' } });
      // dispatch({ type: MULTISTOP, payload: { status: 'Round Trip' } });
      setDropOffLocationType("roundTrip")
    }
    const SET_oneWay = () => {
      dispatch({ type: TYPES.EXCLUSIVE_OFFERS_VIEW, payload: { status: 'oneWay' } });
      setDropOffLocationType("oneWay")
    }

    return (
      <div className={`flex flex-col md:flex-row space-x-3 flex-wrap justify-between 
                        ${isParentModal ? 'py-0 md:py-4' : 'md:pl-16 md:px-4 md:h-[34px] py-4 md:py-0'}
      `}>
        <div className={`mb-4 md:mb-0 flex max-w-[332px] md:max-w-[auto] justify-between
                        ${isParentModal ? '' : 'pl-2'}
        `}>

          <div className={`radio md:mr-4  py-[10px] rounded-[20px] 
          ${dropOffLocationType === "oneWay" ? 'bg-[#F4F8FF] dark:bg-[#171925]' : ''}
          ${isParentModal ? "px-1" : "px-3"}
          `}
          
          >
            <label className='text-xs md:text-sm font-normal dark:text-white whitespace-nowrap'>
              <input
                type="radio"
                value="oneWay"
                checked={dropOffLocationType === "oneWay"}
                onClick={SET_oneWay}
                className='w-[20px] h-[20px] mr-2 p-2 focus:ring-transparent'
              />
              {t('FLIGHT_SEARCH_FORM.ONE_WAY')}
            </label>
          </div>
          <div className={`radio md:mr-4 px-3 py-[10px] rounded-[20px] ${dropOffLocationType === "roundTrip" ? 'bg-[#F4F8FF] dark:bg-[#171925]' : ''}`}>
            <label className='text-xs md:text-sm font-normal dark:text-white whitespace-nowrap'>
              <input
                type="radio"
                value="roundTrip"
                checked={dropOffLocationType === "roundTrip"}
                onChange={SET_roundTrip}
                className='w-[20px] h-[20px] mr-2 focus:ring-transparent'
              />
              {t('FLIGHT_SEARCH_FORM.ROUND_TRIP')}
            </label>
          </div>
          <div className={`radio md:md-4 px-3 py-[10px] rounded-[20px]  ${dropOffLocationType === "multiStop" ? 'bg-[#F4F8FF] dark:bg-[#000]' : ''}`}>
            <label className='text-xs md:text-sm font-normal dark:text-white whitespace-nowrap'>
              <input
                type="radio"
                value="multiStop"
                checked={dropOffLocationType === "multiStop"}
                onChange={SET_MultiStop}
                className='w-[20px] h-[20px] mr-2 focus:ring-transparent'
              />
              {t('FLIGHT_SEARCH_FORM.MULTI_STOP')}
            </label>
          </div>
        </div>
        <div>
          {/* <Chips multiple={false} value={dropOffLocationType} variant="filled">
            <Chip value="oneWay" onClick={(e) => SET_oneWay()} size='xs'>One Way</Chip>
            <Chip value="roundTrip" onClick={(e) => SET_roundTrip()} size='xs'>Round Trip</Chip>
            <Chip value="multiStop" onClick={(e) => SET_MultiStop()} size='xs'>Multi Stop</Chip>
          </Chips> */}
        </div>
        <div className="flex justify-start items-center">
          <div className="h-[100%] flex items-center"><span className={`text-xs text-[#000] dark:text-[#fff] font-semibold `}>Class&nbsp;:&nbsp;</span></div>
          <div>
            {/* {showClassGuest && */}
            <>
              <div className=" flex items-center">
                {renderSelectClass()}
              </div>
            </>
          </div>
        </div>
      </div>
    );
  };

  const RenderForm = () => {
    const useStyles = createStyles((theme) => ({
      root: {
        width: '100%',
      },
      input: {
        color: changeLighmode.mode === 'dark' ? '#fff' : '#000',
        paddingRight: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '72px',
        width: '100%',
        paddingTop: '20px',
        paddingLeft: '1rem',
        [`@media (max-width: 768px)`]: {
          fontSize: '12px',
          fontWeight: 400,
          paddingLeft: '1rem',
          height: '52px'
        },
        [`@media (max-width: 1280px)`]: {
          fontSize: '10px',
          fontWeight: 400,
          paddingLeft: '1rem',
          paddingTop: '20px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
      },
      locationInput: {
        color: 'blue'
      },
      calendarBase: {
        display: 'none',
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
    const theme = useMantineTheme();
    const [Ddate, setDdate] = useState(departureDate);

    let history = useHistory();
    let isFlightsPage = history.location.pathname == '/flights'
    const [changeTravellersStatus, setChangeTravellesStatus] = useState<any>(false);

    return (
      <div className={`${wrapperClassName} relaive w-full  ${type == 'staticSearch' && dropOffLocationType == 'multiStop' ? 'h-[375px] overflow-y-auto' : (type == 'staticSearch' ? 'overflow-y-auto' : '')}
        ${isParentModal ? '!h-auto !overflow-visible' : ''}
      `}

      //#202232 style={{ position: `${history.location.pathname == '/flights' ? 'absolute' : 'relative'}`, bottom: `${history.location.pathname == '/flights' ? '0' : 'auto'}` }}
      >
        <form className={`w-full ${roundedTopLeft} md:rounded-tr-xl relative flex flex-col  bg-white ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'} 
            ${history.location.pathname == '/' && dropOffLocationType === 'multiStop' ? 'md:px-0' : ''}
            ${history.location.pathname == '/flights' && dropOffLocationType === 'multiStop' ? ' ' : ''}   max-h-[100%] z-[10]
            ${isParentModal ? 'px-0 md:px-5' : 'md:h-[200px] px-5 md:px-0'}
            `}>
          <div className={`pb-1 md:pb-0 ${isParentModal ? 'mb-[10px]' : 'md:mt-7 md:mb-5'}`}>
            {RenderRadio()}
          </div>
          <div className={`bg-[#fff] ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232] z-[-1]'}  
            ${dropOffLocationType === 'multiStop' ? 'md:py-2' : ''}
            ${isParentModal ? 'relative' : 'md:px-2 lg:px-11'}
            ${isParentModal && dropOffLocationType === 'multiStop' ? '!pb-5' : ''}
            `}
            ref={overflowingDivRef}
          // style={{
          //   // see if we are on multi stop tab, then add padding according to the height of the height of the GuestsInput 
          //   paddingBottom: dropOffLocationType === 'multiStop' ? `${modalFormPadding + 208}px` : ''
          // }}
          >
            {
              showRow &&
              showRow.map((row: any, index: number) => (
                // change the Background color for even items
                <div className={`w-[100%] md:flex-row items-center md:items-start h-auto    
                                ${index == 1 ? 'bg-transparent' : ''}  -
                                ${index > 1 && index % 2 !== 0 ? 'bg-transparent' : ''}
                                ${isParentModal ?
                    dropOffLocationType === 'multiStop' ?
                      // when the form is rendered in modal and the multi stop tab is active
                      'md:grid md:grid-cols-3 md:gap-3 mb-3  ' :
                      // when the form is rendered in modal and the multi stop tab is not active
                      'md:grid md:grid-cols-2 md:gap-3 py-[14px] md:mb-2' :
                    // when the form is not rendered in modal
                    'flex flex-col md:h-[72px] md:py-0 md:mb-2'}  
                `
                  // localStorage.getItem('theme') == 'dark' ? "w-[100%] flex mt-4 h-[72px]" : "w-[100%] flex mt-4 h-[72px]"
                }
                // style={{paddingBottom: isParentModal && dropOffLocationType !== "multiStop"? `${modalFormPadding}px` : ''}}
                >
                  {
                    row.deleteIcon &&
                    <div className="md:hidden w-full md:w-[3%] mb-[15px] md:mb-0 md:bg-[#FFF9F9] rounded-lg flex justify-end items-center text-[#F75847]" onClick={() => removeMultiStopRow(row.id)}>
                      <span className="">{trashIcon}</span>
                      <span className="text-xs">Delete</span>
                    </div>
                  }
                  <div className={`w-full h-[54px] mb-2 md:mb-0 ml-[0.5vw] md:ml-0 flex flex-col relative rounded-2xl border ${errors.id == row.id && !hasErrors(row.id, 'departure') && errors.departure ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff] cursor-pointer'} 
                                  ${isParentModal ? 'md:h-[72px]' : 'md:w-[50%] md:h-full'}
                  `}>
                    <div className="w-[100%] md:px-4 pt-[0.3vh]">
                      <span
                        //  className={localStorage.getItem('theme') == 'dark' ? "text-[#fff] text-[0.9em] font-semibold px-1" : "text-[0.9em] font-semibold px-1"}
                        className={`text-xs md:text-[0.9em] font-semibold absolute xl:static left-4 md:left-[10px] top-[5px]
                        ${localStorage.getItem('theme') == 'dark' ? 'text-[#fff]' : ''} `}
                      >{t('FROM')}</span>

                    </div>

                    <div className="w-[100%] h-full absolute top-0 left-0 flex items-center" onClick={() => dispatch({ type: LOCATIONID, payload: { status: "From" } })}>
                      <LocationInput
                        iconcolor={errors.id == row.id && !hasErrors(row.id, 'departure') && errors.departure ? '#FF2424' : '#AFB3E0'}
                        tripType='ONLY_FLIGHT'
                        // defaultValue={pickUpInput}
                        // defaultValue={dropOffLocationType == 'multiStop' ? autoFillAvail(row) : defaultFrom}
                        defaultValue={(defaultFrom && defaultFrom.length > 0) ? defaultFrom : autoFillAvail(row)}
                        onInputChange={(event: any) => handleOnInputChange(event, row, 'departure')}
                        onInputDone={() => setFieldFocused("dropOff" + row.id)}
                        onDestination={(selectedDeparture: any) => handleSelectLocation(row, selectedDeparture, 'departure', index)}
                        placeHolder=""
                        desc=""
                        dontfetch={!isParentModal}
                      />
                      {/* dropOffLocationType == 'roundTrip' */}
                      {errors.departure &&
                        !hasErrors(row.id, 'departure') &&
                        errors.id == row.id &&
                        <div className={`absolute translate-y-16 z-[100]  top-0 right-0 ${dropOffLocationType == 'oneWay' ? 'w-[80%] translate-x-[2px]' : dropOffLocationType == 'multiStop' ? 'w-[55%] -translate-x-[1px] z-50' : 'w-[100%] translate-x-[2px]'}`}>
                          <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                            <div className="-translate-y-3">
                              <div className="arrow-up"></div>
                            </div>
                            <div className="w-[10%] flex items-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                                <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                              </svg>
                            </div>
                            <div className="w-[90%] text-[14px] text-[#fff]">
                              {errors.departure}
                            </div>
                          </div>

                        </div>}
                    </div>
                  </div>

                  <div className={`w-full h-[54px] mb-2 md:mb-0 md:h-full flex flex-col relative rounded-2xl border cursor-pointer  ${errors.id == row.id && !hasErrors(row.id, 'destination') && errors.destination ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'}
                                  ${isParentModal ? '' : 'md:w-[50%] ml-[0.5vw]'}
                  `}>
                    <div className="absolute w-[100%] left-[12px]  top-0 md:pt-[0.3vh]">
                      <span
                        //  className={localStorage.getItem('theme') == 'dark' ? "text-[0.9em] text-[#fff] font-semibold px-4" :
                        //   "text-[0.9em] font-semibold px-4"}
                        className={`font-semibold px-[3px] text-xs md:text-[0.9em]
                        ${localStorage.getItem('theme') == 'dark' ? 'text-white' : ''}
                        `}
                      >{t("TO")}</span>
                    </div>
                    <div className={`w-[100%] h-full absolute flex items-center z-1 right-0 `} onClick={() => dispatch({ type: LOCATIONID, payload: { status: "To" } })}>
                      <LocationInput
                        iconcolor={errors.id == row.id && !hasErrors(row.id, 'destination') && errors.destination ? '#FF2424' : '#AFB3E0'}
                        tripType='ONLY_FLIGHT'
                        // defaultValue={dropOffInput}
                        // defaultValue={defaultTo}
                        defaultValue={defaultTo && defaultTo.length > 0 ? defaultTo : selectDefaultValueForDestination(index)}
                        // onChange={(e) => setDropOffInput(e)}
                        onInputChange={(event: any) => handleOnInputChange(event, row, 'destination')}
                        onInputDone={() => setFieldFocused(null)}
                        onDestination={(destination: any) => handleSelectLocation(row, destination, 'destination', index)}
                        placeHolder=""
                        desc=""
                        autoFocus={fieldFocused === ("dropOff" + row.id)}
                        dontfetch={!isParentModal}
                      />
                      {errors.destination &&
                        !hasErrors(row.id, 'destination') &&
                        errors.id == row.id &&
                        <div className={`absolute translate-y-14 top-0 right-0 ${dropOffLocationType == 'oneWay' ? 'w-[80%] translate-x-[2px]' : dropOffLocationType == 'multiStop' ? 'w-[55%] -translate-x-[1px] z-50' : 'w-[100%] translate-x-[2px]'}`}>
                          <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                            <div className="translate-x-52 -translate-y-3">
                              <div className="arrow-up"></div>
                            </div>
                            <div className="w-[10%] flex items-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                                <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                              </svg>
                            </div>
                            <div className="w-[90%] text-[14px] text-[#fff]">
                              {errors.destination}
                            </div>
                          </div>

                        </div>}
                      {/* {errors.index == index && errors.destination && <span className="text-[9px] text-red-900"> {errors.destination} </span>} */}
                    </div>
                  </div>

                  <div className={`w-full h-[54px] mb-2 md:mb-0  flex justify-between relative rounded-2xl cursor-pointer
                                  ${isParentModal ? 'md:h-[72px]' : 'md:w-[50%] md:h-full ml-[0.5vw]'}
                  `}
                    // inline styles is used because dynamically changing z-index using tailwind classNames does not work 
                    style={{ zIndex: 15 - index ?? 1 }}>
                    {/* {
                          row.deleteIcon && 
                          <div className={`hidden md:inline-flex md:w-[61px] md:h-[72px] bg-[#FFF9F9] rounded-2xl items-center  flex-grow-0 flex-shrink-0 basis-auto ml-[10px]
                                          ${isParentModal ? 'absolute right-0 translate-x-2/3 z-[-1] bg-[#FFF1F1] justify-end pr-4':'justify-center'}
                          `} onClick={() => removeMultiStopRow(row.id)}>
                            <span className="">
                              {<BigTrashIcon
                                  className={`text-[#666666] 
                                              ${isParentModal ? 'text-[#FF2424]' : ''}
                                  `}/>}
                              </span>
                          </div>
                        } */}
                    <div className={`new_container w-full h-full relative z-10  flex justify-end rounded-2xl border bg-white dark:bg-transparent ${errors.date && !hasErrors(row.id, 'departuredate') && errors.id == row.id ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'}`}>

                      {
                        errors.date &&
                        !hasErrors(row.id, 'departuredate') &&
                        errors.id == row.id &&
                        <div className={`absolute translate-y-16 top-0 right-0 ${dropOffLocationType == 'oneWay' ? 'w-[64%] translate-x-[2px]' : dropOffLocationType == 'multiStop' ? 'w-[44%] -translate-x-[1px] z-50' : 'w-[80%] translate-x-[2px]'}`}>
                          <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                            <div className="translate-x-[8.7vw] -translate-y-3">
                              <div className="arrow-up"></div>
                            </div>
                            <div className="w-[10%] flex items-center mx-1">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                                <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                              </svg>
                            </div>
                            <div className="w-[90%] text-[14px] text-[#fff] flex items-center">
                              {errors.date}
                            </div>
                          </div>

                        </div>}
                      <div className="w-full h-full absolute top-0 left-0">
                        <div className="w-[100%] pt-[0.3vh] pl-4 md:pl-[12px] xl:pl-4">
                          <span className="text-[#000] dark:text-[#fff] text-xs lg:text-sm font-semibold">{t("START_DATE")}</span>
                        </div>
                        {/* <div className="w-[100%] h-[100%] relative overflow-hidden -translate-y-[30px]">
                          <div className="absolute top-0 w-[100%] h-[100%] flex">
                            <DatePicker
                              value={selectValueFroDepartureDate(index)}
                              placeholder="Select Date"
                              dropdownType={'popover'}
                              amountOfMonths={isMobile ? 1 : 2}
                              onChange={(date: any) => handleSelectLocation(row, date, 'departuredate', index)}
                              size="sm"
                              radius={10}
                              // initialMonth = { dropOffLocationType == 'multiStop' ? new Date(startInitialDate(index)) : checkInDate && checkInDate}
                              initialMonth={dropOffLocationType == 'multiStop' ? selectInitialMonthForDepartureDate(index) : checkInDate && checkInDate}
                              minDate={
                                dropOffLocationType == 'multiStop' ?
                                  dayjs(new Date(startInitialDate(index))).startOf('month').add(new Date(startInitialDate(index)).getDate() - 1, 'days').toDate() :
                                  (
                                    index == 0 ? dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate() :
                                      checkInDate && dayjs(new Date(checkOutDate)).startOf('month').add(checkOutDate?.getDate() - 1, 'days')?.toDate()
                                  )
                              }
                              classNames={{
                                input: classes.input,
                                root: classes.root,
                                monthPickerControlActive: classes.activeMonth,
                                yearPickerControlActive: classes.activeYear
                              }}
                              // @ts-ignore
                              dayStyle={(date) => {
                                // TODO: on cursor hover date, set range background color
                                if (dropOffLocationType == 'multiStop') return
                                if (checkOutDate && formatDate(date) === formatDate(checkOutDate)) return { backgroundColor: '#0084ee', color: 'white' }
                                if (date > checkInDate && date < checkOutDate) {
                                  return { backgroundColor: '#E7F5FF', color: 'black' }
                                };
                              }
                              }
                            />
                            {/* {errors.date && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}
                          {/* </div>

                        </div> */}

                      </div>
                      <div className="w-[100%] h-[100%] relative overflow-hidden">
                        <div className="absolute top-0 w-[100%] h-[100%] flex">
                          <DatePicker
                            value={selectValueFroDepartureDate(index)}
                            placeholder="Select Date"
                            dropdownType={'popover'}
                            amountOfMonths={isMobile ? 1 : 2}
                            onChange={(date: any) => handleSelectLocation(row, date, 'departuredate', index)}
                            size="sm"
                            ref={startDateRefs.current[index] as any}
                            radius={10}
                            // initialMonth = { dropOffLocationType == 'multiStop' ? new Date(startInitialDate(index)) : checkInDate && checkInDate}
                             initialMonth = { dropOffLocationType == 'multiStop' ? selectInitialMonthForDepartureDate(index) : checkInDate && checkInDate}
                            minDate={
                              dropOffLocationType == 'multiStop' ?
                                dayjs(new Date(startInitialDate(index))).startOf('month').add(new Date(startInitialDate(index)).getDate() - 1, 'days').toDate() :
                                (
                                 index == 0 ? dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate() :
                                 checkInDate && dayjs(new Date(checkOutDate)).startOf('month').add(checkOutDate?.getDate() - 1, 'days')?.toDate()
                                )
                            }
                            classNames={{
                              input: classes.input,
                              root: classes.root,
                              monthPickerControlActive: classes.activeMonth,
                              yearPickerControlActive: classes.activeYear
                            }}
                            // @ts-ignore
                            dayStyle={(date) => {
                              // TODO: on cursor hover date, set range background color
                              if(dropOffLocationType == 'multiStop') return
                              if (checkOutDate && formatDate(date) === formatDate(checkOutDate)) return { backgroundColor: '#0084ee', color: 'white' }
                              if (date > checkInDate && date < checkOutDate) {
                                return { backgroundColor: '#E7F5FF', color: 'black' }
                              };
                            }
                            }
                                                       
                          />
                          {/* {errors.date && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}                          
                        </div>
                       
                      <div className="flex items-end h-[70%] px-4 md:px-4 justify-end">
                        <i className={`fa fa-calendar ${errors.id == row.id && !hasErrors(row.id, 'departuredate') && errors.date ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}`} aria-hidden="true"></i>
                      </div>
                      </div>
                    </div>
                    {
                      row.deleteIcon &&
                      <div className={`hidden md:inline-flex md:w-[61px] md:h-[72px] bg-[#FFF9F9] rounded-2xl items-center  flex-grow-0 flex-shrink-0 basis-auto ml-[10px]
                                      ${isParentModal ? 'absolute right-0 translate-x-2/3 z-[1] bg-[#FFF1F1] justify-end pr-[14px]' : 'justify-center'}
                      `} onClick={() => removeMultiStopRow(row.id)}>
                        <span className="">
                          {<BigTrashIcon
                            className={`text-[#666666] 
                                          ${isParentModal ? 'text-[#FF2424] w-6 h-6' : ''}
                              `} />}
                        </span>
                      </div>
                    }
                  </div>

                  {
                    dropOffLocationType == 'roundTrip' &&
                    <div className={`w-full h-[54px] mb-2 md:mb-0  flex justify-end relative rounded-2xl border  cursor-pointer overflow-hidden ${errors._date ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'} 
                                    ${isParentModal ? 'md:h-[72px]' : 'md:w-[50%] md:h-full ml-[0.5vw]'}
                                    
                    `}>
                      {errors._date && !hasErrors(row.id, 'returndate') &&
                        <div className="absolute w-[80%] translate-y-16 translate-x-1 top-0 right-0">
                          <div className="w-[100%] bg-[#FF2424] rounded-xl flex p-2">
                            <div className="translate-x-[8.7vw] -translate-y-3">
                              <div className="arrow-up"></div>
                            </div>
                            <div className="w-[10%] flex items-center mx-1">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                                <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                              </svg>
                            </div>
                            <div className="w-[90%] text-[14px] text-[#fff] flex items-center">
                              {errors._date}
                            </div>
                          </div>

                        </div>}
                      <div className="w-full h-full absolute top-0 left-0">
                        <div className="w-[100%] pt-[0.3vh] pl-4">
                          <span className={`text-[#000] dark:text-[#fff] text-xs xl:text-sm font-semibold whitespace-nowrap ${errors._date && !hasErrors(row.id, 'returndate') ? 'border-[#FF2424]' : 'border-[#AFB3E0] '}`}>{t('RETURN_DATE')}</span>
                        </div>
                        <div className="w-[100%] h-[100%] relative overflow-hidden -translate-y-[30px]">
                          <div className="absolute top-0 w-[100%] h-[100%] flex" onClick={() => dispatch({ type: TYPES.TRAVELLERS, payload: { status: false } })}>
                            <DatePicker
                              value={selectValueForReturnDate(index)}
                              placeholder="Select Date"
                              dropdownType={'popover'}
                              amountOfMonths={isMobile ? 1 : 2}
                              onChange={(date: any) => handleSelectLocation(row, date, 'returndate', index)}
                              size="sm"
                              // zIndex={!TravellersEvent || TravellersEvent==undefined ?10000 :-10000}
                              radius={10}
                              initialMonth={selectInitialMonthForReturnDate(index)}
                              minDate={(checkInDate && dayjs(new Date(checkInDate)).startOf('month').add(checkInDate?.getDate() - 1, 'days').toDate()) ?? dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                              ref={ref}
                              // @ts-ignore
                              dayStyle={(date) => {
                                // TODO: on cursor hover date, set range background color
                                if (checkInDate && formatDate(date) === formatDate(checkInDate)) return { backgroundColor: '#0084ee', color: 'white' }
                                if (date > checkInDate && date < checkOutDate) {
                                  return { backgroundColor: '#E7F5FF', color: 'black' }
                                };
                              }
                              }
                              classNames={{
                                input: classes.input,
                                root: classes.root,
                                monthPickerControlActive: classes.activeMonth,
                                yearPickerControlActive: classes.activeYear

                                // calendarBase : !TravellersEvent || TravellersEvent==undefined ? '': classes.calendarBase
                              }}


                            />
                            {/* Find me : */}
                          </div>
                        </div>

                      </div>
                      <div className="flex items-end h-[70%] px-4">
                        <i className={`fa fa-calendar  ${errors._date && !hasErrors(row.id, 'returndate') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}`} aria-hidden="true"></i>
                      </div>
                    </div>
                  }
                  {/* <div className="w-[45%] mx-[0.5vw] flex flex-col" style={{ border: '.2vw solid #DADBE8 ', borderRadius: '16px' }}>
                <div className="w-[100%]">
                <GuestsInput
                    defaultValue={guestValue}
                    onChange={(data) => setGuestValue(data)}
                />
                </div>
              </div> */}

                  {
                    dropOffLocationType !== 'multiStop' &&
                    <div className={`w-full  h-[54px] mb-2 md:mb-0 rounded-2xl border border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff] cursor-pointer z-[11] md:pt-1
                         ${isParentModal ? 'md:h-[72px]' : 'md:w-[50%] md:h-full ml-[0.5vw]'}
                         ${isParentModal && dropOffLocationType == 'roundTrip' ? 'col-span-2' : ''}

                    `}
                      style={{ marginBottom: isParentModal ? `${modalFormPadding}px` : '' }}
                    >
                      <div className="py-0">
                        <GuestsInput
                          type="flight"
                          // defaultValue={guestValue}
                          onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                          onChange={(data) => setGuestValue(data)}
                          isParentInModal={isParentModal}
                          changeTravellersStatus={changeTravellersStatus}
                        />
                        {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
                      </div>
                    </div>
                  }
                  {
                    dropOffLocationType !== 'multiStop' ?
                      <>
                        {/* {
                      isParentModal &&
                     <div className="h-full flex justify-start items-center">
                        <div><input id='addHotel' type='checkbox' /></div>
                        <label htmlFor="addHotel" className="text-sm text-[#000] dark:text-[#fff] ml-3 pt-[0.3vh]">Add a hotel to your flight and save!</label>
                    </div>
                    } */}
                        <div className={`w-full flex justify-center items-center 
                                      ${isParentModal ? 'col-span-2 mt-3' : 'md:w-[10%] md:ml-2'}
                     `} >
                          {/* <SearchButton link={resultLink()} classNames="!w-full md:!w-[74px] !h-[54px] md:!h-[72px]" /> */}
                          <SearchButton
                            link={resultLink()}
                            passengers={guestValue}
                            type="flight"
                            date={departureDate}
                            _date={dropOffLocationType == 'oneWay' ? '' : returnDate}
                            classNames={`!w-full !h-[54px] md:!h-[72px]
                                      ${isParentModal ? 'md:!rounded-2xl !bg-gradient-to-br' : ' md:!w-[74px] '}
                          `}
                            textClassNames={`${isParentModal ? 'md:!inline-block' : ''}`}
                            onErrors={(errors: any) => setErrors(errors)}
                            destination={selectedDestination}
                            departure={selectedDeparture}
                            multiRow={multiStopRow}
                          />
                        </div>

                      </>
                      :
                      <>
                        {/* {
                          row.deleteIcon &&
                          <div className="hidden md:inline-flex md:w-[61px] md:h-[72px] bg-[#FFF9F9] rounded-2xl items-center justify-center flex-grow-0 flex-shrink-0 basis-auto ml-[10px]" onClick={() => removeMultiStopRow(row.id)}>
                            <span className="">{bigTrashIcon}</span>
                          </div>
                        } */}
                      </>

                  }

                </div>

              ))
            }
            {
              dropOffLocationType == 'multiStop' &&
              <div className={`w-[100%] flex flex-col md:flex-row items-center
                                ${isParentModal ? 'grid grid-cols-2 gap-4 mt-0' : 'mt-5 '}
                `}>

                <div className={`w-full  flex items-center h-[54px] md:h-[72px] rounded-2xl 
                                  ${isParentModal ? 'md:w-full hidden' : 'md:w-[90%]'}
                                  ${counter < 3 ? 'border border-[#D7DAF0]' : ''}
                     `}

                // style={{ border: counter < 3 ? '.1vw solid #D7DAF0 ' : '', borderRadius: '16px' }}
                >
                  {
                    multiStopRow.length < 8 &&
                    <ButtonPrimary type="button" className='w-full text-[#3944B3] dark:text-white md:w-full !rounded-[16px] bg-[#F4F8FF] dark:bg-transparent !h-[100%]' onClick={handleMultiStop}>
                      <span className="text-[#3944B3] dark:text-white"> {plusIcon} </span><span className="text-[#3944B3] dark:text-white ml-2">Add Transport</span>
                    </ButtonPrimary>
                  }
                </div>

                <div className={`w-full h-[54px] flex flex-col my-2 border border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff] cursor-pointer rounded-2xl md:pt-1 z-[11]
                                  ${isParentModal ? 'w-full md:h-[72px] m-0' : ' md:w-[50%] md:h-full mx-[0.5vw]'}
                                  ${isParentModal && dropOffLocationType == 'multiStop' ? 'w-full col-span-2' : ''}
                                  
                `}
                  style={{ marginBottom: isParentModal && dropOffLocationType == "multiStop" ? `${modalFormPadding}px` : '' }}
                >
                  <div className="px-4 py-0 h-[69px]">
                    <GuestsInput
                      type="flight"
                      // defaultValue={guestValue}
                      onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                      onChange={(data) => setGuestValue(data)}
                      isParentInModal={isParentModal}
                    />
                    {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
                  </div>
                </div>

                <div className={`w-full  flex items-center h-[54px] md:h-[72px] rounded-2xl 
                                  ${isParentModal ? 'md:w-full' : 'md:w-[90%] hidden'}
                                  ${counter < 3 ? 'border border-[#D7DAF0]' : ''}
                     `}

                // style={{ border: counter < 3 ? '.1vw solid #D7DAF0 ' : '', borderRadius: '16px' }}
                >
                  {
                    multiStopRow.length < 5 &&
                    <ButtonPrimary type="button" className='w-full text-[#3944B3] dark:text-white md:w-full !rounded-[16px] bg-[#F4F8FF] dark:bg-transparent !h-[100%]' onClick={handleMultiStop}>
                      <span className="text-[#3944B3] dark:text-white"> {plusIcon} </span><span className="text-[#3944B3] dark:text-white ml-2">Add Transport</span>
                    </ButtonPrimary>
                  }
                </div>

                <div className={`h-[100%] w-full md:w-auto flex justify-end items-center
                                ${isParentModal ? '' : 'md:!min-w-[74px]'}
                `}>
                  <SearchButton
                    link={resultLink()}
                    passengers={guestValue}
                    type="flight"
                    date={departureDate}
                    trip='multiStop'
                    _date=''
                    classNames={`!w-full !h-[54px] md:!h-[72px] ${isParentModal ? 'md:!rounded-2xl' : ''}`}
                    onErrors={(errors: any) => setErrors(errors)}
                    destination={selectedDestination}
                    departure={selectedDeparture}
                    multiRow={multiStopRow}
                    textClassNames={isParentModal ? 'md:!inline-block' : ''}
                  />
                </div>

              </div>
            }
          </div>
          <TermsOfServiceText wrapperClassNames={` bg-white pb-3  ${dropOffLocationType === 'multiStop' && 'md:multiStopShadow'} rounded-b-lg`} />
        </form>
      </div>
    );
  };

  return RenderForm();
};

export default FlightSearchForm;
