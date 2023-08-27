import React, { useEffect, useState, useRef, LegacyRef } from "react";
import LocationInput from "./LocationInput";
import { FC } from "react";
import SearchButton from "../SearchButton/SearchButton";
import styled, { css } from "styled-components";
import { DatePicker, DateRangePicker } from "@mantine/dates";
import GuestsInput from "./GuestsInput";
import { Calendar } from "tabler-icons-react";
import { Chip, Chips, createStyles } from "@mantine/core";
import BASE_URL_HOME from "../../api/env";
import { format } from "node:path/win32";
import { addLeadingZeros } from "../../common/AddLeadingZeros";
import { formatDate } from "../../common/formatDate";
import dayjs from 'dayjs';
import { plusIcon, trashIcon } from "./FlightSearchForm";
import randomId from "../../common/randomId";
import ButtonPrimary from "../../lib/Button/ButtonPrimary";
import { removeUndefined } from "../../common/removeUndefined";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import useWindowSize from "../../hooks/useWindowSize";
import NationalityPicker from "../NationalityPicker/NationalityPicker";
import TYPES from "../../types/store";
import TermsOfServiceText from "../TermsOfServiceText/TermsOfServiceText";
import moment from "moment";
import { sortByIndex } from "../../helpers";
import { isEmptyObject } from "jquery";
import { useTranslation } from "react-i18next";
// import { MULTISTOP } from "../../store/actions";
// urlBaseHome == https://bookperfect.paquetedinamico.com/home?directSubmit=true &tripType=ONLY_HOTEL &distribution=2-0 &lang=EN &carRental=false &hotelDestination=Destination::IST &departureDate=30/06/2022 &arrivalDate=05/07/2022
export const urlBaseHotel: any = BASE_URL_HOME + "/home?directSubmit=true&tripType=ONLY_HOTEL";

const SelectionClassWrapper = styled.div`
  font-weight: 500px;
  font-family: 'Poppins';
  size: 14px;
  line-height: 21px
`;

const SelectedClassWrapper = styled.div`
  // position: relative;
  width: 65px;
  height: 21px;
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

export interface HotelsSearchFormProps {
  roundedTopLeft: string;
  radioHeight?: string;
  showClassRadio?: boolean;
  customStyle?: any;
  headType?: string;
  searchCardHight?: string;
  dynamicHeight?: string;
  wrapperClassName?: string;
  searchcardplace?: string;
};

const HotelsSearchForm: FC<HotelsSearchFormProps> = (props) => {
  const {
    roundedTopLeft,
    radioHeight,
    showClassRadio,
    customStyle,
    headType = "",
    searchCardHight = "",
    dynamicHeight = "",
    wrapperClassName = "",
    searchcardplace
  } = props

  const dispatch = useDispatch();
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const lightmode: any = useSelector((state: any) => state.LightMode.mode);
  const [status, setStatus] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  const [errors, setErrors] = useState<any>({});
  const [pointerActivation, setPointerAvtication] = useState<any>(true);
  // @ts-ignore
  const {t} = useTranslation()
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

  const TravellersEvent: any = useSelector((state: any) => state.TravellersReducer.status);
  const myStyles = createStyles((theme) => ({
    calendarBase: {
      display: 'none',
    },
    input: {
      color: lightmode == 'dark' ? '#fff' : '#000',
      backgroundColor: 'transparent',
      fontSize: '16px',
      fontWeight: 400,
      paddingLeft: '13px',
      paddingTop: '10px',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '72px',
      [`@media (max-width: 768px)`]: {
        fontSize: '12px',
        fontWeight: 400,
        paddingLeft: '13px',
        transform: 'translateY(-6px)',
        height: '52px',
      },
      [`@media (max-width: 1280px)`]: {
        fontSize: '10px',
        fontWeight: 400,
        paddingLeft: '13px',
        transform: 'translateY(-2px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
    },
    activeMonth: {
      color: 'white',
      backgroundColor: '#1c7ed6 !important'
    },
    activeYear: {
      color: 'white',
      backgroundColor: '#1c7ed6 !important'
    },
    popOver: {
      transform: 'translateY(60px)'
    }

  }))


  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<"dropOffInput" | null
  >(null);

  const [guestValue, setGuestValue] = useState<any>([]);
  let history = useHistory()
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>();
  // const [selectedDestination, setSelectedDestination] = useState<any>();
  const [checkInDate, setCheckInDate] = useState<any>()

  const [checkOutDate, setCheckOutDate] = useState<any>()
  const [moreHotelRow, setMoreHotelRow] = useState<any>([
    {
      id: randomId(),
      deleteIcon: false
    }
  ]);
  const overflowingDivRef = useRef<HTMLDivElement>()
  let isHoteslPage = window?.location?.pathname == '/hotels'
  let LightMode = useSelector((state: any) => state.LightMode)
  let isHotelsPage = history.location.pathname == '/hotels'

  useEffect(() => {
    if (isMobile) return

    const overflowingDivrectangleStyles = overflowingDivRef.current?.getBoundingClientRect()
    const overflowingDivHeight = overflowingDivrectangleStyles?.height

    dispatch({ type: TYPES.HOTELS_FORM_HEIGHT, payload: overflowingDivHeight })

    return () => {
      dispatch({
        type: TYPES.HOTELS_FORM_HEIGHT,
        payload: 0
      })
    }

  }, [moreHotelRow, history.location.pathname, isMobile])


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
    //   {
    //   id: null,
    //   date: null
    //  }
  ]);


  useEffect(()=> {
    if(departureDate && !isEmptyObject(errors)){
     
      // let dDateRow = departureDate[departureDate.length - 1]?.id
      let dDateRow = departureDate.find((dP: any) => dP.id == errors.id)?.id
      hasErrors(dDateRow, 'departuredate')
      if(dDateRow == errors.id){
        setErrors([])

      }

    }
  
  
  } ,
  [departureDate])



  const [returnDate, setReturnDate] = useState<any>([
    // {
    // id: null,
    // date: null
    // }
  ]);

  const [sourceMarket, setSourceMarket] = useState<any>('UK');

  const [childrenAges, setChildrenAges] = useState();

  // var checkInDate: any;
  // var checkOutDate;

  if (typeof dateValue === 'object') {
    // checkInDate = dateValue[0];
    // checkOutDate = dateValue[1];
  };

  // const checkIn = dateValue[0].toLocaleDateString();

  let checkIn;
  let checkOut;

  if (checkInDate) checkIn = formatDate(checkInDate);
  if (checkOutDate) checkOut = formatDate(checkOutDate);

  dispatch({
    type: 'MULTISTOP', payload: {
      status: status
    }
  })

  // const resultLink = urlBaseHotel + "&distribution=" + guestValue?.guestAdults + "-" + guestValue?.guestChildren + "&lang=EN&carRental=false" + "&hotelDestination=" + selectedDestination?.id + "&departureDate=" + checkIn + "&arrivalDate=" + checkOut;
  const handleMoreHotelRow = () => {
    setMoreHotelRow((prevState: any) => [...prevState, { id: randomId(), deleteIcon: moreHotelRow.length >= 1 && true }]);
    setStatus(status + 1)
    dispatch({ type: TYPES.EXCLUSIVE_OFFERS_VIEW, payload: { status: `accom${status}` } });
  };


  const removeMoreHotelRow = (id: string) => {
    setStatus(status - 1);
    dispatch({ type: TYPES.EXCLUSIVE_OFFERS_VIEW, payload: { status: `accom${status-2}` } });
    setMoreHotelRow((row: any[]) =>
      row.filter(rw => {
        return rw.id !== id;
      })
    );
    setSelectedDestination((prevState: any) => prevState.filter( (destination:any) => destination.id !== id))
    setDepartureDate((prevState: any) => prevState.filter( (departureDate:any) => departureDate.id !== id))
    setReturnDate((prevState: any) => prevState.filter( (returnDate:any) => returnDate.id !== id))
    
    
  };


  const getDepartureDate = (rowId: any) => {
    let rowDate = departureDate && departureDate.filter((sDepart: any) => sDepart.id == rowId);

    return rowDate && rowDate.length > 0 && rowDate[0].date;
  };

  const getReturnDate = (rowId: any) => {
    let rowDate = returnDate && returnDate.filter((sReturn: any) => sReturn.id == rowId);

    return rowDate && rowDate.length > 0 && rowDate[0].date;
  };


  const accommodations = sortByIndex(selectedDestination)?.slice(1).map((destination: { id: string, selected: { id: string; }; }, index: string | number) => (destination && destination.selected && destination.selected.id + "_" + getDepartureDate(destination.id) + "--" + getReturnDate(destination.id)));
  const distributions = guestValue?.map((guest: any) => guest.adults + "-" + guest.children + "-" + childrenAges);

  const resultLink: any = () => {
    if (moreHotelRow.length === 1) {
      return urlBaseHotel + "&distribution=" + distributions.join("::") + "&lang=" + activeLang.toUpperCase() + "&sourceMarket=" + sourceMarket + "&displayCurrency=" + activeCurrency + "&carRental=false" + "&hotelDestination=" + (selectedDestination && selectedDestination[selectedDestination.length - 1] && selectedDestination[selectedDestination.length - 1].selected?.id) + "&departureDate=" + (departureDate && departureDate[departureDate.length - 1] && departureDate[departureDate.length - 1].date) + "&arrivalDate=" + (returnDate && returnDate[returnDate.length - 1] && returnDate[returnDate.length - 1].date);
    } else {
      return urlBaseHotel + "&distribution=" + distributions.join("::") + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency + "&carRental=false&multiHotel=true&accommodations=" + removeUndefined(accommodations).join()
    }
  };

  // verified if has errors
  const hasErrors = (rowId: any, locationType: string) => {
    switch (locationType) {
      case 'destination':
        return selectedDestination.find((sd: any) => sd.id == rowId);;
      case 'departure':
        return selectedDeparture.find((sd: any) => sd.id == rowId);
      case 'departuredate':
        return errors.type == 'subsequent' ? false : departureDate.find((sdd: any) => sdd.id == rowId);
      case 'returndate':
        return errors.type == 'comparison' ? false : returnDate.find((srd: any) => srd.id == rowId);
      default:
        break;
    }
  };

  // const renderRadio = () => {
  //   return (
  //     <div className={`[ hero-field-padding ] pb-2 pt-6 md:py-0 pl-0 md:pl-[68px] md:mt-7 flex justify-start w-[100%] space-x-3 flex-wrap h-[100%] md:h-[34px]
  //                       ${isHotelsPage ? 'md:!mb-5 pl-0' : 'md:mb-5'}
  //     `} >
  //       <div className="flex justify-start  w-[100%]">
  //         <div className="w-[50%] flex flex-col md:flex-row justify-start">
  //           <div className="flex items-center">
  //             <div><input type="checkbox" /></div>
  //             <div className="text-xs xl:text-[.7vw] whitespace-nowrap mx-1 mt-1 text-[#000] dark:text-[#fff]">Add Car</div>
  //           </div>
  //           <div className="flex items-center md:mx-4">
  //             <div><input type="checkbox" /></div>
  //             <div className="text-xs xl:text-[.7vw] whitespace-nowrap mx-1 mt-1 text-[#000] dark:text-[#fff]">Add a Flight</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  //  shadow-xl dark:shadow-2xl
  const RenderForm = () => {
    const ref = useRef<any>([]);
    const CheckInDatePickerRef = useRef<any>();
    let pathname = window.location.pathname.split('/');
    const handleSelectLocation = (row: any, selected: any, locationType: string, index: number) => {
      switch (locationType) {
        case 'destination':
          setSelectedDestination((prev: any) => [...prev, { id: row.id, selected: selected, index }]);
          CheckInDatePickerRef?.current?.click()
          break;
        case 'checkindate':
          let isRowExist = departureDate.find((dd: any) => (dd.id == row.id && dd.date));
          if (isRowExist && isRowExist.id == row.id) {
            setDepartureDate((sDepartureDate: any) =>
              sDepartureDate.filter((sdd: any) => {
                return sdd.id !== row.id;
              })
            );
            

            setDepartureDate((prev: any) => {
              return [...prev, { id: row.id, date: formatDate(selected), unformattedDate: selected, index }];
            });

          } else {
            setDepartureDate((prev: any) => {
              return [...prev, { id: row.id, date: formatDate(selected), unformattedDate: selected, index }];
            });
          }

          setCheckInDate(selected);
   
          const returnDateOnTheSameRow = returnDate.filter((rDate: any) => rDate.id === row.id)[0]?.unformattedDate

          const isCheckInDateGreaterThanReturnDate = selected.getTime() > returnDateOnTheSameRow?.getTime() 
          if(returnDateOnTheSameRow && isCheckInDateGreaterThanReturnDate){
            const selectedDate = selected
              const nextDayOfTheSelectedDepartureDate = moment(selectedDate).add(1, 'days').toDate()
              // console.log('this is the day after selected date: ', nextDayOfTheSelectedDepartureDate)
                 setReturnDate((ReturnDate: any) => (
    
                   ReturnDate.map((Rdate: any) => {
                     if(Rdate.index == index){
                      Rdate.unformattedDate = nextDayOfTheSelectedDepartureDate
                      Rdate.date = formatDate(nextDayOfTheSelectedDepartureDate)

                      return Rdate
                     }
                     return Rdate
                   })
                 )
              );
    
              
          }

          // if(isCheckInDateGreaterThanReturnDate){

          // //   setReturnDate((sReturnDate: any) =>
          // //   sReturnDate.filter((sdd: any) => {
          // //     return sdd.id !== row.id;
          // //   })
          // // );

          //    setReturnDate((ReturnDate: any) => (

          //      ReturnDate.map((Rdate: any) => {
          //        if(Rdate.index == index){
          //         Rdate.unformattedDate = selected
          //         Rdate.date = formatDate(selected)
          //         return Rdate
          //        }
          //        return Rdate
          //      })
          //    )
          // );

          // }




          ref.current[index].click();
          break;
        case 'checkoutdate':
          let _isRowExist = returnDate.find((dd: any) => (dd.id == row.id && dd.date));

          if (_isRowExist && _isRowExist.id == row.id) {
            setReturnDate((sReturnDate: any) =>
              sReturnDate.filter((sdd: any) => {
                return sdd.id !== row.id;
              })
            );

            setReturnDate((prev: any) => {
              return [...prev, { id: row.id, date: formatDate(selected), unformattedDate: selected, index }]
            });

          } else {
            setReturnDate((prev: any) => {
              return [...prev, { id: row.id, date: formatDate(selected), unformattedDate: selected, index }]
            });
          }

          setCheckOutDate(selected)
          break;
        default:
          break;
      }
    };



    const handleOnInputChange = (event: any, row: any, locationType: any) => {
      if (event == '') {
        switch (locationType) {
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

    // useEffect(() => {
    //   console.log('hotels date task: this is the depatureDate', departureDate)
    // }, [departureDate])

    // useEffect(() => {
    //   console.log('hotels date task: this is the checkInDate', checkInDate)
    // }, [checkInDate])

    // useEffect(() => {
    //   console.log('hotels date task: this is the setReturnDate', returnDate)
    // }, [returnDate])

    // useEffect(() => {
    //   console.log('hotels date task: this is the setReturnDate', checkOutDate)
    // }, [checkOutDate])


    const { classes } = myStyles();
    let history = useHistory();
    let isHomepage = history.location.pathname == '/';
    const eventClickOutsideDiv = () => {
      setPointerAvtication(!pointerActivation)
    };

    useEffect(() => {
      document.removeEventListener("click", eventClickOutsideDiv);
    }, [pointerActivation]);


    const CheckinInitialDate = (index: any) => returnDate?.slice(0).reverse().filter((returnDate: any) => returnDate.index + 1 == index)[0]?.unformattedDate ?? new Date();
    const [counter, setCounter] = useState<any>(0)
    const whereTo = () => {

      setCounter(counter + 1);
      if (counter > 1) {
        setCounter(1);
      }
    }
    function removeObjectWithId(arr: any , index: number) {
      const objWithIdIndex = arr.findIndex((obj:any) => obj.id === index);
    
      if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
      }
    
      return arr;
    }

    const selectMinDateForCheckIn = (index: number) => {
      const selectedMinDate = returnDate?.filter((rDate: any) => rDate.index == (index - 1))[0]?.unformattedDate
      return selectedMinDate ?? new Date()
    }

    const selectMindateForCheckout = (index: number) => {

      const chosenDateBasedOnIndex = departureDate.filter((depDate: any) => depDate.index === index )[0]?.unformattedDate

      // if there was no min date based on index use checkIn date 
     const minDateBasedOnCheckinDate = (checkInDate && dayjs(new Date(checkInDate)).startOf('month').add(checkInDate?.getDate() - 1, 'days').toDate()) ?? dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()

      const checkoutDateOnTheSameRow = returnDate.filter((rDate: any) => rDate.index === index)[0]?.unformattedDate

      // checkIf Checkin Date is greater than return date 
      const isCheckInDateGreaterThanCheckoutDate = chosenDateBasedOnIndex?.getTime() > checkoutDateOnTheSameRow?.getTime()

      
      const chosenDate = chosenDateBasedOnIndex ?? minDateBasedOnCheckinDate
      return moment(chosenDate).add(1, 'days').toDate()

    }

  const selectInitialMonthForReturnDate = (index: number) => {
      // initialMonth={checkInDate && checkInDate}
    const selectedReturDate = returnDate?.filter((rDate: any) => rDate.index === index)[0]?.unformattedDate
    let selectedInitialMonth = selectedReturDate ?? checkInDate

    if(selectedInitialMonth?.getTime() < selectMindateForCheckout(index)?.getTime() )
    {
      selectedInitialMonth = selectMindateForCheckout(index)
    }

    return selectedInitialMonth
  }

  const pickValueForCheckInDate = (index: number) => {
    const selectedDate = departureDate?.filter((rDate: any) => rDate?.index === index)[0]?.unformattedDate
    return selectedDate
 }


  const selectInitialMonthForCheckIn = (index: number) => {
    const selectedValue = pickValueForCheckInDate(index)
    const selectedMinDate = selectMinDateForCheckIn(index)
    
    // return the greater one
    if(selectedValue?.getTime() > selectedMinDate?.getTime()){
      return selectedValue
    } else {
      return selectedMinDate
    }
  }


 const pickValueForReturnDate = (index: number) => {
    const selectedDate = returnDate.filter((rDate: any) => rDate?.index === index)[0]?.unformattedDate
    return selectedDate
 }


    return (
      <>
        {/* <div className={`w-full h-full relative ${wrapperClassName}`}> */}
        <div className={` ${wrapperClassName} relative w-full`}
        >
          <form
            style={{ borderTopLeftRadius: window.location.pathname == '/hotels' ? '10px' : '0px' }}
            className={`${history.location.pathname == '/hotels' ? ` ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]  h-auto md:h-[200px] relative w-[100%]'}` : 'md:rounded-tr-2xl relative h-auto md:h-[200px]'} px-5  md:px-0 w-[100%] flex items-center bg-[#fff] ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'}`}>
            <div className="w-[100%] h-full">
              <div className="w-full flex ">

                {/* {headType !== 'result' && showClassRadio && renderRadio()} */}
                {history.location.pathname == '/hotels' ? '' :
                  <div className="hidden md:h-[78px]"></div>
                }
                {/* {
                  isHomepage ? ( */}
                    <div className="md:h-[34px] mt-4 md:mt-7 md:mb-5 md:pl-[68px] flex items-center justify-start md:justify-end md:pr-7">
                      <div className="nationality_wrapper flex md:items-center flex-col items-start md:flex-row !ml-0 ">
                        {/* <div className="h-[100%] flex items-center"><span className={`text-xs text-[#000] dark:text-[#fff] md:font-semibold mb-[5px] md:mb-0`}>{t('NATIONALITY')}</span></div> */}
                        {/* <NationalityPicker
                          styles="px-3 py-2 rounded-lg"
                          spanText="Select a nationality"
                          typeSize='text-xs'
                          onNationalityChanged={(nationality: any) => { setSourceMarket(nationality.cca2) }}
                        /> */}
                      </div>
                    </div>
                  {/* )
                    : ''
                } */}
              </div>


              <div className="h-auto md:h-[100px] w-[100%]">
                <div
                  className={`${history.location.pathname == '/hotels' ? 'pl-2 md:px-11' : `${pathname.length >= 7 ? 'md:px-2 lg:px-11' : 'md:px-2 lg:px-11'}`} md:pb-4 relative rounded-r-sm w-[100%] z-10 ${localStorage.getItem('theme') == 'dark' ? `${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'}` : 'bg-[#fff]'} ${moreHotelRow.length > 1 && 'md:multiStopShadow'} rounded-b-lg `}
                  //  @ts-ignore
                  ref={overflowingDivRef}
                >
                  {
                    moreHotelRow.map((row: any, index: number) => (
                      <div className={`w-[100%] flex-col md:flex-row flex justify-between items-center bg-[#fff]  ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'}
                         ${index > 0 ? 'mt-2' : ''}`}
                        style={{zIndex : (12 - index), }}
                         >
                        <div className={`cursor-pointer w-full md:w-auto md:mr-2 flex h-[54px] md:h-[72px] mt-4 md:mt-0 relative flex-grow-[2.5] flex-shrink rounded-2xl border ${errors.destination && !hasErrors(row.id, 'destination') && errors.id == row.id ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3]  dark:hover:border-[1px] dark:hover:border-[#fff]'}`}
                        // style={{ border: '.1vw solid #DADBE8 ', borderRadius: '16px'}}
                        >
                          {errors.id == row.id && !hasErrors(row.id, 'destination') && errors.destination &&
                            <div className={`absolute translate-y-16 z-10 top-0 right-0`}>
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
                          {/* Line : 483 */}
                          <div className="text-xs xl:text-sm font-semibold absolute z-[0] top-1.5 md:top-3 left-4 dark:text-[#fff]">{t("HOTELS_SEARCH_FORM.WHERE_TO_?")}</div>
                          <div className="absolute top-0 w-[100%] left-0 h-[100%] flex items-center" 
                            style={{zIndex: (10 - index)}}
                          >
                            <LocationInput
                              tripType="ONLY_HOTEL"
                              iconcolor={errors.destination && errors.id == row.id && !hasErrors(row.id, 'destination') ? '#FF2424' : '#AFB3E0'}
                              defaultValue={pickUpInputValue}
                              // onChange={(e) => setPickUpInputValue(e)}
                              onInputDone={() => setFieldFocused("dropOffInput")}
                              onDestination={(selectedDestination: any) => handleSelectLocation(row, selectedDestination, 'destination', index)}
                              placeHolder=""
                              manualFocus={counter}
                              desc=""
                              onInputChange={(event: any) => handleOnInputChange(event, row, 'destination')}
                            />
                            {/* {errors.index == index && errors.destination && <span className="text-[9px] text-red-900"> {errors.destination} </span>} */}
                          </div>
                        </div>
                        <div 
                         className={`relative cursor-pointer w-full md:w-auto md:mr-2 flex justify-end items-center h-[54px] md:h-[72px] mt-2 md:mt-0 flex-grow-[2] flex-shrink rounded-2xl border ${errors.id == row.id && errors.date && !hasErrors(row.id, 'departuredate') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'}`}
                        // onClick={() => { darkText.current?.click() }}
                        // style={{ border: '.1vw solid #DADBE8 ', borderRadius: '16px', flex: '2' }}
                        >
                          <div className="w-full h-full absolute top-0 left-0 ">
                            {errors.id == row.id && errors.date && !hasErrors(row.id, 'departuredate') &&
                              <div className={`absolute translate-y-16 z-10 translate-x-10 top-0 right-0`}>
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

                            <div className="absolute w-[100%] height-[100%] top-1.5 md:top-3 left-3 text-xs xl:text-sm font-semibold dark:text-[#fff]">{t('HOTELS_SEARCH_FORM.CHECK_IN')}</div>
                            <div className="absolute w-[100%] height-[100%] top-0 left-0">
                              <DatePicker
                                value={pickValueForCheckInDate(index)}
                                dropdownType={"popover"}
                                placeholder={t("SELECT_DATE")}
                                onChange={(date: any) => handleSelectLocation(row, date, 'checkindate', index)}
                                size="sm"
                                radius={10}
                                amountOfMonths={isMobile ? 1 : 2}
                                // minDate={CheckinInitialDate && dayjs(new Date(CheckinInitialDate(index))).startOf('month').add(new Date(CheckinInitialDate(index)).getDate() - 1, 'days').toDate()}
                                minDate={selectMinDateForCheckIn(index)}
                                ref={CheckInDatePickerRef}
                                classNames={{
                                  // input: localStorage.getItem('theme') === 'dark' ? classes.darkInput : classes.lightInput,
                                  input: classes.input,
                                  monthPickerControlActive: classes.activeMonth,
                                  yearPickerControlActive: classes.activeYear,
                                  dropdownWrapper: classes.popOver
                                }}
                                // initialMonth={checkOutDate && checkOutDate}
                                initialMonth = {selectInitialMonthForCheckIn(index)}
                                // @ts-ignore
                                dayStyle={(date) => {
                                  if (pickValueForReturnDate(index) && formatDate(date) === formatDate(pickValueForReturnDate(index))) return { backgroundColor: '#0084ee', color: 'white' }
                                  if (date > pickValueForCheckInDate(index) && pickValueForReturnDate(index) && date < pickValueForReturnDate(index)) {
                                    return { backgroundColor: '#E7F5FF', color: 'black' };
                                  }
                                }}
                              />
                              {/* {errors.date && <span className="text-[9px] text-red-900"> {errors.date} </span>} */}
                            </div>
                            <div></div>
                          </div>
                          <div className="flex items-end h-[50%] px-4">
                            <i className={`fa fa-calendar ${errors.id == row.id && errors.date && !hasErrors(row.id, 'departuredate') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}`} aria-hidden="true"></i>
                          </div>
                        </div>
                        <div className={`relative cursor-pointer w-full md:w-auto md:mr-2 md:mb-0 flex items-center justify-end h-[54px] md:h-[72px] mt-2 md:mt-0 flex-grow-[2] flex-shrink rounded-2xl border ${errors.id == row.id && errors._date && !hasErrors(row.id, 'returndate') ? 'border-[#FF2424]' : 'border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]'}
                                        ${status > 0 ? 'mb-2' : ''}
                          `}
                        //  style={{ border: '.1vw solid #DADBE8 ', borderRadius: '16px', flex: '2' }}
                        >
                          <div className="w-full h-full absolute left-0 top-0 ">
                            {errors.id == row.id && errors._date && !hasErrors(row.id, 'returndate') &&
                              <div className={`absolute translate-y-16 translate-x-10 top-0 right-0`}>
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

                            <div className="absolute w-[100%] height-[100%] top-1.5 md:top-3 left-3 text-xs xl:text-sm font-semibold dark:text-[#fff]">{t('HOTELS_SEARCH_FORM.CHECK_OUT')}</div>
                            <div className="absolute w-[100%] height-[100%] top-0 left-0">
                              <DatePicker
                                clearable={true}
                                value={pickValueForReturnDate(index)}
                                dropdownType={"popover"}
                                placeholder={t("SELECT_DATE")}
                                // onChange={(value) => onChange(value)}
                                onChange={(date: any) => handleSelectLocation(row, date, 'checkoutdate', index)}
                                size="sm"
                                zIndex={!TravellersEvent || TravellersEvent == undefined ? 10000 : -10000}
                                radius={10}
                                style={{ border: 'none' }}
                                amountOfMonths={isMobile ? 1 : 2}
                                initialMonth= {selectInitialMonthForReturnDate(index)}
                                // minDate={(checkInDate && dayjs(new Date(checkInDate)).startOf('month').add(checkInDate?.getDate() - 1, 'days').toDate()) ?? dayjs(new Date()).startOf('month').add(new Date().getDate() - 1, 'days').toDate()}
                                // minDate={checkInDate && returnDate ? checkInDate : dayjs(new Date()).date()}
                                minDate={selectMindateForCheckout(index)}
                                ref={el => ref.current[index] = el}
                                classNames={{
                                  // input: lightmode === 'dark' ? classes.darkInput : classes.lightInput,
                                  input: classes.input,
                                  calendarBase: !TravellersEvent || TravellersEvent == undefined ? '' : classes.calendarBase,
                                  monthPickerControlActive: classes.activeMonth,
                                  yearPickerControlActive: classes.activeYear,
                                  dropdownWrapper: classes.popOver

                                }}
                                // @ts-ignore
                                // dayStyle={(date) => {
                                //   if (checkInDate && formatDate(date) === formatDate(checkInDate)) return { backgroundColor: 'orange', color: 'white' }
                                //   if (date > checkInDate && checkOutDate && date < checkOutDate) {
                                //     return { backgroundColor: '#E7F5FF', color: 'black' };
                                //   }
                                // }}
                                dayStyle={(date) => {
                                  if (pickValueForCheckInDate(index) && formatDate(date) === formatDate(pickValueForCheckInDate(index))) return { backgroundColor: '#0084ee', color: 'white' }
                                  if (date > pickValueForCheckInDate(index) && pickValueForReturnDate(index) && date < pickValueForReturnDate(index)) {
                                    return { backgroundColor: '#E7F5FF', color: 'black' };
                                  }
                                }}
                                
                              />

                                

                              {/* {errors._date && <span className="text-[9px] text-red-900"> {errors._date} </span>} */}
                            </div>
                            <div></div>
                          </div>
                          <div className="flex items-end h-[50%] px-4"><i className={`fa fa-calendar ${errors.id == row.id && errors._date && !hasErrors(row.id, 'returndate') ? 'text-[#FF2424]' : 'text-[#B0B4E1]'}`} aria-hidden="true"></i></div>
                        </div>
                        {
                          moreHotelRow.length == 1 &&
                          <div className="w-full flex-grow-[2] h-[54px] md:h-[72px] flex-shrink  md:w-auto md:mr-0 flex items-center md:px-3 mt-2 md:mt-0 mb-2 md:mb-0 border border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff] rounded-2xl md:flex-[2] cursor-pointer md:z-[11]">
                            <GuestsInput
                              type="hotel"
                              // defaultValue={guestValue}
                              onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                              onChange={(data) => setGuestValue(data)}
                            />
                            {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
                          </div>
                        }
                        {
                          moreHotelRow.length == 1 &&
                          <div className="w-full md:w-auto md:mr-2 md:mr-0 md:ml-2 flex h-[100%]">
                            <div className="w-full md:w-auto flex h-[100%] items-center">
                              <SearchButton
                                link={resultLink()}
                                passengers={guestValue}
                                type="hotel"
                                multiRow={moreHotelRow}
                                date={departureDate}
                                _date={returnDate}
                                classNames='!w-full md:!w-[74px] !h-[54px] md:!h-[72px]'
                                onErrors={(errors: any) => setErrors(errors)}
                                destination={selectedDestination}
                              // departure = ""
                              />
                            </div>
                            {/* <SearchButton link={resultLink()} /> */}
                          </div>
                        }
                        {
                          row.deleteIcon &&
                          <div className="bg-[#FFF9F9] dark:bg-[#171925]  rounded-lg  items-center justify-center cursor-pointer" onClick={() => removeMoreHotelRow(row.id)}>
                            <span className="">{trashIcon}</span>
                          </div>
                        }
                        {/* <div className="mr-2 flex items-center h-[3.5em]" style={{ border: '.1vw solid #DADBE8 ', borderRadius: '16px', flex: '2' }}>

                    </div>
                    <div className="mr-2" style={{ border: '.1vw solid #DADBE8 ', borderRadius: '16px' }}>55555</div> */}
                      </div>
                    ))
                  }
                  <div className="w-full flex items-center justify-between mt-4">
                    {
                      moreHotelRow.length == 1 &&
                      <div className="w-[100%]  ml-2 flex items-center">
                        <div className="w-[90%] md:w-min flex items-center text-[#3944B3] dark:text-white h-[100%] cursor-pointer whitespace-nowrap" onClick={handleMoreHotelRow}>
                          {plusIcon} <span className="text-[#3944B3] text-sm font-medium dark:text-white ml-2 ">Add Stay</span>
                        </div>
                      </div>
                    }
                    <TermsOfServiceText wrapperClassNames={`${moreHotelRow.length > 1 ? 'hidden' : ''}`} />
                  </div>
                  {
                    moreHotelRow.length > 1 &&
                    <div className="w-[100%] mt-[0.7vw] flex flex-col md:flex-row">

                      <div className="w-full md:w-[90%] mt-3 md:mt-0  flex h-[100%] md:h-auto">
                        {
                          moreHotelRow.length < 5 &&
                          <ButtonPrimary type="button" className='w-full !rounded-[16px] md:!rounded-full bg-[#F4F8FF] dark:bg-[#171925] border border-[#AFB3E0]' onClick={handleMoreHotelRow}>
                            {plusIcon} <span className="text-[#3944B3] dark:text-white ml-2">Add Accommodation</span>
                          </ButtonPrimary>
                        }
                      </div>

                      <div className="w-full md:w-[50%] h-[54px] my-2 md:my-0 md:h-[72px] md:mx-[0.5vw] flex flex-col items-center  border border-[#AFB3E0] rounded-2xl cursor-pointer">
                        <div className="w-[100%] flex items-center px-3">
                          <GuestsInput
                            type="hotel"
                            onChildrenAgeChanged={(ages: any) => setChildrenAges(ages)}
                            // defaultValue={guestValue}
                            onChange={(data) => setGuestValue(data)}
                          />
                          {errors.passengers_limit && <span className="text-[9px] text-red-900"> {errors.passengers_limit} </span>}
                        </div>
                      </div>

                      <div className="h-[100%] my-3 md:m-0 flex justify-end items-center">
                        <SearchButton
                          link={(function(){ console.log('date prolem: the result link: ', resultLink());return resultLink()})()}
                          passengers={guestValue}
                          type="hotel"
                          trip="withAccommodation"
                          date={departureDate}
                          _date={returnDate}
                          classNames='!w-full md:!w-[74px] !h-[54px] md:!h-[72px]'
                          onErrors={(errors: any) => setErrors(errors)}
                          destination={selectedDestination}
                          multiRow={moreHotelRow}
                        />
                      </div>
                    </div>
                  }
                  
                  <TermsOfServiceText wrapperClassNames={`${moreHotelRow.length > 1 ? '' : 'hidden'} py-2`} />
                </div>

              </div>
            </div>
          </form>
        </div>
        {/* </div> */}
      </>
    );
  };

  return RenderForm();
};

export default HotelsSearchForm;
