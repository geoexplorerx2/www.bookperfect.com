import React, { forwardRef, Fragment, LegacyRef, useEffect, useState } from "react";
import { Dialog, Listbox, Menu, Transition } from "@headlessui/react";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import CInputNumber from "../../lib/CInputNumber/CInpuNumber";
import { useRef } from "react";
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux'
import randomId from "../../common/randomId";
import {
  ACTIVITIES_LIMIT,
  FLIGHT_PASSENGERS_LIMIT,
  HOTEL_FLIGHT_PASSENGERS_LIMIT,
  HOTEL_PASSENGERS_LIMIT,
  ROUNTING_LIMIT,
  TRANSFERS_LIMIT,
  TRIP_DESIGNER_PASSENGERS_LIMIT,
  TRIP_DESIGNER_ROW_LIMIT
} from "../../constants/passengers";
import { BabyCarriage } from "tabler-icons-react";
import useWindowSize from "../../hooks/useWindowSize";
import { Modal, createStyles } from "@mantine/core";
import Bed from "../../images/icons/bed";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import TYPES from "../../types/store";
import { Popover, Text, Button } from '@mantine/core';
import { useTranslation } from "react-i18next";
export interface GuestsInputProps {
  defaultValue?: {
    guestRooms?: number;
    guestAdults?: number;
    guestChildren?: number;
  };
  isParentInModal?: boolean
  onChange?: (data: GuestsInputProps["defaultValue"]) => void;
  fieldClassName?: string;
  type?: string;
  onChildrenAgeChanged?: any;
  changeTravellersStatus?: any;
};

interface ChildrenAgeType {
  rowIndex: number,
  ageInputIndex: number,
  age: number

}

const useStyles = createStyles((theme) => ({
  modal: {
    background: 'transparent !important'
  }
}
))

const GuestsInput = forwardRef<HTMLButtonElement, GuestsInputProps> (

  ({
   defaultValue,
   onChange,
   changeTravellersStatus,
   fieldClassName = "[ nc-hero-field-padding ]",
   type = "",
   isParentInModal = false,
   onChildrenAgeChanged
 }, refFromProps ) => {
   let storage: any = '';
   const [guestRoomsInputValue, setGuestRoomsInputValue] = useState(1);
   const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
   const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
 
   const [defaultguestAdultsValue, setdefaultguestAdultsValue] = useState<any>(1)
   const [defaultguestChildrenValue, setdefaultguestChildrenValue] = useState<any>(1)
   const [defaultguestRoomValue, setdefaultguestRoomValue] = useState<any>(1)
   const [childrenAge, setChildrenAge] = useState<ChildrenAgeType[]>([{ rowIndex: 0, ageInputIndex: 0, age: 1 }])
 
   const [isMobile, setIsMobile] = useState(false)
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [isPopOverOpen, setIsPopoverOpen] = useState(false)
   const windowSize = useWindowSize();
   const { classes } = useStyles()
 
   const [testAdultMax, setTestAdultMax] = useState(6)
   const [testChildrenMax, setTestChildrenMax] = useState(6 - testAdultMax)
   const [storeTravellersStatus, setstoreTravellersStatus] = useState<any>(false);
   // @ts-ignore
   const { t } = useTranslation()
 
   // const TravellersEvent: any = useSelector((state: any) => state.TravellersReducer.status);
   // console.log('TravellersEvent..',TravellersEvent)
 
   useEffect(() => {
     setTestChildrenMax(testAdultMax - 6)
   }, [testAdultMax])
 
 
 
   // useEffect(()=>{
   //    setTestAdultMax(testAdultMax - 6)
   // },[testChildrenMax])
 
   // useEffect(()=>{
   // },[])
   useEffect(() => {
     setIsMobile((prevState) => {
       if (!prevState && windowSize.width <= 767) {
         return true
       } else if (prevState && windowSize.width > 768) {
         return false
       } else {
         return prevState
       }
     })
   },
     [windowSize])
 
 
 
 
 
 
   const [row, setRow] = useState<any>(defaultValue ?? [{
     id: randomId(),
     rooms: 1,
     adults: ['trip designer', 'hotel', 'flighthotel', 'routing', 'transfers', 'activities'].includes(type) ? 2 : 1,
     children: 0,
     limit: ['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) ? TRIP_DESIGNER_ROW_LIMIT : (type == 'flight' ? FLIGHT_PASSENGERS_LIMIT : (type == 'activities' ? ACTIVITIES_LIMIT : (type == 'transfers' ? TRANSFERS_LIMIT : 9))),
     limit1: ['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) ? TRIP_DESIGNER_ROW_LIMIT : (type == 'flight' ? FLIGHT_PASSENGERS_LIMIT : (type == 'activities' ? ACTIVITIES_LIMIT : (type == 'transfers' ? TRANSFERS_LIMIT : 9))),
     deletebtn: false,
   }
   ])
 
   const [rowCounter, setRowCounter] = useState<any>([])
   const [rowCounterDefault, setRowCounterDefault] = useState<any>(0)
   const dispatch = useDispatch()
   const [close, setClose] = useState<any>(true)
   const [rooms, setRooms] = useState<any>([]);
   const [adults, setAdults] = useState<any>([])
   const [children, setChildren] = useState<any>([])
   const [defVal, setDefVal] = useState<any>([])
   const [childrenDefval, setChildrenDefval] = useState<any>([])
   const [counter, setCounter] = useState<any>(0)
   const [updateUI, setUpdateUI] = useState(Math.floor(Math.random() * 100));
   // const [clickStatus, setClickStatus] = useState<any>(false);
   let childrenAgesForURL: number[];
 
   useEffect(() => {
     childrenAgesForURL = childrenAge.map(childAge => childAge.age);
     onChildrenAgeChanged && onChildrenAgeChanged(childrenAgesForURL);
   }, [childrenAge])
 
 
 
 
   const overflowingDivRef = useRef<HTMLDivElement>(null)
 
   // This function captures the click outside of the guests input 
   const eventClickOutsideDiv = (event: MouseEvent) => {
     if (!overflowingDivRef.current) return;
 
     // click inside
     if (overflowingDivRef.current.contains(event.target as Node)) {
       return;
     }
 
     // click outside
 
 
     dispatch({ type: TYPES.TRAVELLERS, payload: { status: false } })
     setIsPopoverOpen(false);
   };
 
   useEffect(() => {
     if (eventClickOutsideDiv) {
       document.removeEventListener("click", eventClickOutsideDiv);
     }
     overflowingDivRef && document.addEventListener("click", eventClickOutsideDiv);
     return () => {
       document.removeEventListener("click", eventClickOutsideDiv);
     };
   }, [isPopOverOpen]);
 
 
   useEffect(() => {
 
     if (isMobile) return
 
 
     const overflowingDivrectangleStyles = overflowingDivRef.current?.getBoundingClientRect()
     const overflowingDivHeight = overflowingDivrectangleStyles?.height
 
     if (isPopOverOpen) {
       dispatch({ type: TYPES.GUESTS_INPUT_POPOVER_HEIGHT, payload: overflowingDivHeight })
     }
 
     if (!isPopOverOpen) {
       dispatch({ type: TYPES.GUESTS_INPUT_POPOVER_HEIGHT, payload: 0 })
 
     }
 
     return () => {
       dispatch({ type: TYPES.GUESTS_INPUT_POPOVER_HEIGHT, payload: 0 })
     }
 
   }, [row, isPopOverOpen, window.location.pathname])
 
   const ROW_LIMIT = TRIP_DESIGNER_ROW_LIMIT;
 
   const PASSENGERS_LIMIT = () => {
     switch (type) {
       case 'trip designer':
         return TRIP_DESIGNER_PASSENGERS_LIMIT;
       case 'flight':
         return FLIGHT_PASSENGERS_LIMIT;
       case 'hotel':
         return HOTEL_PASSENGERS_LIMIT;
       case 'flighthotel':
         return HOTEL_FLIGHT_PASSENGERS_LIMIT;
       case 'activities':
         return ACTIVITIES_LIMIT;
       case 'transfers':
         return TRANSFERS_LIMIT;
       case 'routing':
         return ROUNTING_LIMIT;
       default:
         break;
     }
   };
 
   useEffect(() => {
     let adult = 0;
     let children = 0;
 
     row?.forEach((rw: any) => {
       adult += rw.adults;
       children += rw.children;
     });
 
     setGuestAdultsInputValue(adult);
     setGuestChildrenInputValue(children);
     setGuestRoomsInputValue(row.length);
 
   }, [row])
 
 
 
   let popoverButtonRef =  useRef() as LegacyRef<HTMLButtonElement> | undefined
   let chosenRef = refFromProps ?? popoverButtonRef
 
   useEffect(() => {
     if (onChange) {
       onChange(row);
       // onChange({
       //   guestRooms: guestRoomsInputValue,
       //   guestAdults: guestAdultsInputValue,
       //   guestChildren: guestChildrenInputValue
       // });
     }
   }, [row]);
   // }, [guestRoomsInputValue, guestAdultsInputValue, guestChildrenInputValue]);
 
   // passengers size
   const passengersSize = () => {
     let size = 0;
 
     row?.forEach((rw: any) => {
       size += rw.adults;
       size += rw.children;
     });
 
     return size;
   };
 
   const Add_Function = () => {
     setRowCounterDefault(row.rooms);
     rowCounter.push(rowCounterDefault)
     // row.push(`Row${rowCounterDefault}`);
 
     setRow((prevState: any) => [
       ...prevState,
       {
         id: randomId(),
         adults: 2,
         limit: ['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) ? TRIP_DESIGNER_ROW_LIMIT : (type == 'flight' ? FLIGHT_PASSENGERS_LIMIT : (type == 'activities' ? ACTIVITIES_LIMIT : (type == 'transfers' ? TRANSFERS_LIMIT : 9))),
         limit1: ['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) ? TRIP_DESIGNER_ROW_LIMIT : (type == 'flight' ? FLIGHT_PASSENGERS_LIMIT : (type == 'activities' ? ACTIVITIES_LIMIT : (type == 'transfers' ? TRANSFERS_LIMIT : 9))),
         deletebtn: true
       }]);
     // setGuestRoomsInputValue(row.length);
     // setGuestAdultsInputValue(guestRoomsInputValue);
     // setGuestChildrenInputValue(guestChildrenInputValue);
   };
 
   const Remove_Function = (item: any, index: any) => {
     setRow((row: any) => row.filter((rw: any) => { return rw.id !== item.id }));
 
     // update row
     setUpdateUI(Math.floor(Math.random() * 100));
   };
 
   const Display = (item: any, rowIndex: any) => {
 
     const setValueAdults = (value: any, item: any, index: any) => {
       if (counter + guestAdultsInputValue <= 6) {
         setCounter(counter + 2);
         setGuestAdultsInputValue(counter)
       }
     }
 
     const setValueChildren = (value: any, item: any, index: any) => {
       children[index] = { id: item, Children: value }
 
       // setChildrenDefval(value)
       childrenDefval[index] = value
     }
 
     const handleChange = (e: number, rowIndex: number, ageInputIndex: number) => {
       // e is the number of children coming from the headless Ui Menu Component
       let items = [...childrenAge];
       // find the target ageInput inside the state
       let target = items.filter(item => (item.ageInputIndex == ageInputIndex && item.rowIndex == rowIndex))
 
       target[0] = { age: e, rowIndex, ageInputIndex }
       let modified: boolean = false;
       let newArray = items.map(item => {
 
         // if the target was already in the state modify it  
         if (item.ageInputIndex == target[0].ageInputIndex && item.rowIndex == target[0].rowIndex) {
           modified = true
           item.age = target[0].age
         }
         return item
       })
       // if the target already does not exist in the state , add it to the state
       if (!modified) {
         newArray = [...newArray, target[0]];
       };

       items = [...newArray];

       // set the state to the new modified/incremented array
       setChildrenAge(items)
     };
 
 
     const handlePlus = (type: string, value: any, item: any, index: any) => {
       // const selectedRow = row.filter((row: any) => row.id == item.id)
       // selectedRow[0].adults = value;
 
       switch (type) {
         case 'adult':
           setRow((roow: any[]) =>
             roow.map(rw => {
               return rw.id == item.id ? { ...rw, adults: value, limit: 6 - item.children, limit1: 6 - value } : rw
             })
           );
           setGuestAdultsInputValue(value);
           break;
         case 'children':
           setRow((roow: any[]) =>
             roow.map(rw => {
               return rw.id == item.id ? { ...rw, children: value, limit1: 6 - rw.adults, limit: 6 - value } : rw
             })
           );
           setGuestChildrenInputValue(value);
           break;
         default:
           break;
       }
     };
 
     const NEW__PASSENGERS_MAX = passengersSize() == 0 ? PASSENGERS_LIMIT() : (PASSENGERS_LIMIT() - passengersSize());
 
     const rowLimit = (itm: any, typ: string) => {
       switch (type) {
         case 'trip designer':
           if (NEW__PASSENGERS_MAX == 9) return ROW_LIMIT - (typ == 'adult' ? itm.children : itm.adults);
           if (NEW__PASSENGERS_MAX <= 6) return NEW__PASSENGERS_MAX - (typ == 'adult' ? itm.children : itm.adults);
           if (NEW__PASSENGERS_MAX == 7) return 7;
           if (NEW__PASSENGERS_MAX == 8) return 6
           break;
         case 'flight':
           return NEW__PASSENGERS_MAX;
         case 'hotel':
           if (NEW__PASSENGERS_MAX == 9) return ROW_LIMIT - (typ == 'adult' ? itm.children : itm.adults);
           if (NEW__PASSENGERS_MAX <= 6) return NEW__PASSENGERS_MAX - (typ == 'adult' ? itm.children : itm.adults);
           if (NEW__PASSENGERS_MAX == 7) return 7;
           if (NEW__PASSENGERS_MAX == 8) return 6
           break;
         case 'flighthotel':
           if (NEW__PASSENGERS_MAX == 9) return ROW_LIMIT - (typ == 'adult' ? itm.children : itm.adults);
           if (NEW__PASSENGERS_MAX <= 6) return NEW__PASSENGERS_MAX - (typ == 'adult' ? itm.children : itm.adults);
           if (NEW__PASSENGERS_MAX == 7) return 7;
           if (NEW__PASSENGERS_MAX == 8) return 6
           break;
         case 'activities':
           return NEW__PASSENGERS_MAX;
         case 'transfers':
           return NEW__PASSENGERS_MAX;
         case 'routing':
           if (NEW__PASSENGERS_MAX == 9) return ROW_LIMIT - (typ == 'adult' ? itm.children : itm.adults);
           if (NEW__PASSENGERS_MAX <= 6) return NEW__PASSENGERS_MAX - (typ == 'adult' ? itm.children : itm.adults);
           if (NEW__PASSENGERS_MAX == 7) return 7;
           if (NEW__PASSENGERS_MAX == 8) return 5;
           break;
         default:
           break;
       }
     };
     // arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
 
 
     return (
       <>
         <div>
           <div className={`w-[100%] pl-8 pr-6 md:!px-3 py-3 mb-3 flex justify-between
                          ${rowIndex == 1 ? 'bg-[#F4F8FF] md:!bg-transparent' : ''}
                          ${rowIndex > 1 && rowIndex % 2 !== 0 ? 'bg-[#F4F8FF] md:!bg-transparent' : ''} 
             `}>
             {
               ['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) &&
               <div className="md:flex-1 md:first-letter:pl-8 flex justify-center">
                 <Bed className="text-[#3842B2] dark:text-white w-5 h-5" /><span className='mx-2'>{rowIndex + 1}</span>
               </div>
             }
             <div className="md:first-line:flex-1 flex justify-center">
               <CInputNumber
                 key={updateUI}
                 className=""
                 defaultValue={item.adults}
                 onChange={value => { handlePlus('adult', value, item, rowIndex) }}
                 min={1}
                 max={
                   // passengersSize() > PASSENGERS_LIMIT() || 
                   (type == 'flight' ? 9 : (type == 'transfers' ? 54 : (type == 'activities' ? 15 : item.limit >= 0 ? item.limit : 0)))}
                 name='adult'
                 disabled={passengersSize() >= PASSENGERS_LIMIT()}
 
               />
             </div>
             <div className="md:flex-1 flex justify-center">
               <CInputNumber
                 key={updateUI}
                 className=""
                 defaultValue={item.children}
                 onChange={value => { handlePlus('children', value, item, rowIndex) }}
                 min={0}
                 max={
                   // passengersSize() >= PASSENGERS_LIMIT()
                   (type == 'flight' ? 9 : (type == 'transfers' ? 54 : (type == 'activities' ? 15 : item.limit1 >= 0 ? item.limit1 : 0)))}
                 // max={2}
                 name={'children'}
                 disabled={passengersSize() >= PASSENGERS_LIMIT()}
               />
             </div>
             {item.deletebtn &&
               <div className="flex items-center mr-1 cursor-pointer">
                 <i onClick={(value) => Remove_Function(item, rowIndex)} style={{ fontSize: '2em' }} className="fa fa-trash-o text-[red]" aria-hidden="true"></i>
               </div>
             }
 
           </div>
 
           {
             item.children > 0 &&
             <div className=" relative flex flex-wrap justify-start px-10" style={{ direction: 'rtl' }}>
               {
                 [...Array(item.children)].map((child, ageInputIndex) => {
                   const target = childrenAge.filter(child => child.rowIndex == rowIndex && child.ageInputIndex == ageInputIndex)
                   return (<div className={`px-3 py-3 ml-1 mb-3 flex justify-center items-center ${ageInputIndex === 2 ? 'md:mr-[83px]' : ''}`}>
                     <div className="text-xs md:text-base whitespace-nowrap dark:text-[#fff]">{ageInputIndex == 0 ? 'Child Age :' : ''}</div>
                     <div className={`mx-3 relative`}>
                       {/* <select className="rounded-xl border-[#DADBE8]" name="1" id="children">
                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item: any, index: any) => {
                       return (<option value={`${item}`}>{item}</option>)
                     })}
                   </select> */}
 
                       <div className="w-full">
                         <Listbox value={target[0]?.age ?? 1} onChange={(e) => handleChange(e, rowIndex, ageInputIndex)}>
                           <div className="relative mt-1">
                             <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-transparent dark:text-[#fff] dark:border-[1px] dark:border-[#fff] py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                               <span className="block truncate">
                                 {/* {childrenAge[rowIndex] ?? 0} */}
                                 {target[0]?.age ?? 1}
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
                               <Listbox.Options className={`absolute text-black z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-x-hidden ${isParentInModal ? 'translate-y-[-18rem]' : 'translate-y-[0]'}`}>
                                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((person, personIdx) => (
                                   <Listbox.Option
                                     key={personIdx}
                                     className={({ active }) =>
                                       `relative cursor-default select-none py-2 pl-2 md:pl-10 pr-4 ${active ? 'bg-[#4E5CF4] text-white' : 'text-gray-900'
                                       }`
                                     }
                                     value={person}
                                   >
                                     {person}
                                   </Listbox.Option>
                                 ))}
                               </Listbox.Options>
                             </Transition>
                           </div>
                         </Listbox>
                       </div>
                     </div>
                   </div>)
                 }
                 )
               }
             </div>
 
 
           }
         </div>
       </>)
   }
 
   const Done_Function = (open?: any) => {
     let sumAdults = 0;
     let sumChildren = 0;
 
     adults.map((item: any) => {
       sumAdults = sumAdults + item.Adults
     });
 
     children.map((item: any) => {
       sumChildren = sumChildren + item.Children
     });
 
     sumAdults = sumAdults + defaultguestAdultsValue;
     sumChildren = sumChildren + defaultguestChildrenValue;
     // @ts-ignore
     chosenRef?.current.click()
     setIsPopoverOpen(false)
   }
 
   const handleClick = () => {
     // clickStatus , setClickStatus
     dispatch({ type: TYPES.TRAVELLERS, payload: { status: true } })
     if (isMobile) {
       setIsModalOpen(prevState => !prevState)
     } else if (!isMobile) {
       setIsPopoverOpen(prevState => !prevState)
     }
   }
 
   return (
     <>
       {/* guestAdultsInputValue + t(`GUESTS_INPUT.ADULTS`) + " " */}
       <div className="w-full cursor-auto">
         <div className="w-full">
           <Menu as="div" className="flex relative [ nc-flex-1 ] h-[100%] w-full">
             <div className="w-full">
               <Menu.Button ref={chosenRef} onClick={handleClick} className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 pt-[10px] md:pt-4 px-4 py-1 md:py-3">
                 <div className="flex-grow h-[100%] w-full">
                   <span className={`block text-left text-xs xl:text-sm font-semibold text-[#000] dark:text-[#fff]`}>
                     {t('GUESTS_INPUT.TRAVELLERS')}
                   </span>
                   <span className="block mt-2 xl:mt-1 text-left text-[10px] xl:text-sm text-[#15173F] dark:text-white leading-none font-light ">
                     {/* {totalGuests ?  totalGuests + "Guests" : "Add guests"} */}
                     {['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) &&
                       <>
                         <span className="mr-[1px]">{guestRoomsInputValue}</span>
                         <span className="mr-[5px]">{t(`GUESTS_INPUT.ROOMS`)}</span>
                       </>
                     }
                     {
                       <>
                         <span className="ml-[1px] mr-[1px]">{guestAdultsInputValue}</span>
                         <span>{t(`GUESTS_INPUT.ADULTS`)}</span>
                       </>
                     }
                     {
                       guestChildrenInputValue > 0 &&
                       <span className="inline-flex">
                         {" "} {guestChildrenInputValue} {" "} <i className="fa fa-child"></i>
                       </span>
                     }
 
                     {/* add travelers... */}
                     {/* {guestRoomsInputValue === 1 && guestAdultsInputValue === 1 && guestChildrenInputValue === 0 && "Add travelers"} */}
                   </span>
 
                   {isPopOverOpen && (
                     <ClearDataButton
                       onClick={() => {
                         setGuestRoomsInputValue(1);
                         setGuestAdultsInputValue(2);
                         setGuestChildrenInputValue(0);
                       }}
                     />
                   )}
                 </div>
                 <div className="text-neutral-300 dark:text-neutral-400 md:pt-[1.3vh]">
                   {
                     localStorage.getItem('theme') == 'dark' ?
                       <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g opacity="0.3">
                           <path d="M9.625 18.0276C12.7661 18.0276 15.3125 15.4953 15.3125 12.3715C15.3125 9.24778 12.7661 6.71547 9.625 6.71547C6.48388 6.71547 3.9375 9.24778 3.9375 12.3715C3.9375 15.4953 6.48388 18.0276 9.625 18.0276Z" stroke="#fff" stroke-width="2" stroke-miterlimit="10" />
                           <path d="M16.9971 6.92213C17.4998 6.78653 18.0183 6.71705 18.5393 6.71547C20.0477 6.71547 21.4943 7.31138 22.561 8.3721C23.6276 9.43282 24.2268 10.8715 24.2268 12.3715C24.2268 13.8716 23.6276 15.3103 22.561 16.371C21.4943 17.4317 20.0477 18.0276 18.5393 18.0276" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M1.75 22.0956C2.63807 20.8389 3.81723 19.8131 5.18788 19.105C6.55854 18.3969 8.08043 18.0272 9.625 18.0272C11.1696 18.0272 12.6915 18.3969 14.0621 19.105C15.4328 19.8131 16.6119 20.8389 17.5 22.0956" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M18.5391 18.0276C20.0838 18.0267 21.606 18.3959 22.9768 19.104C24.3476 19.8121 25.5266 20.8383 26.4141 22.0956" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                         </g>
                       </svg>
                       :
                       <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g opacity="0.3">
                           <path d="M9.625 18.0276C12.7661 18.0276 15.3125 15.4953 15.3125 12.3715C15.3125 9.24778 12.7661 6.71547 9.625 6.71547C6.48388 6.71547 3.9375 9.24778 3.9375 12.3715C3.9375 15.4953 6.48388 18.0276 9.625 18.0276Z" stroke="#3842B2" stroke-width="2" stroke-miterlimit="10" />
                           <path d="M16.9971 6.92213C17.4998 6.78653 18.0183 6.71705 18.5393 6.71547C20.0477 6.71547 21.4943 7.31138 22.561 8.3721C23.6276 9.43282 24.2268 10.8715 24.2268 12.3715C24.2268 13.8716 23.6276 15.3103 22.561 16.371C21.4943 17.4317 20.0477 18.0276 18.5393 18.0276" stroke="#3842B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M1.75 22.0956C2.63807 20.8389 3.81723 19.8131 5.18788 19.105C6.55854 18.3969 8.08043 18.0272 9.625 18.0272C11.1696 18.0272 12.6915 18.3969 14.0621 19.105C15.4328 19.8131 16.6119 20.8389 17.5 22.0956" stroke="#3842B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M18.5391 18.0276C20.0838 18.0267 21.606 18.3959 22.9768 19.104C24.3476 19.8121 25.5266 20.8383 26.4141 22.0956" stroke="#3842B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                         </g>
                       </svg>
                   }
 
                 </div>
               </Menu.Button>
             </div>
             <Transition
               as={Fragment}
               enter="transition ease-out duration-100"
               enterFrom="transform opacity-0 scale-95"
               enterTo="transform opacity-100 scale-100"
               leave="transition ease-in duration-75"
               leaveFrom="transform opacity-100 scale-100"
               leaveTo="transform opacity-0 scale-95"
             >
               <Menu.Items className="absolute right-0 top-16 mt-2 bg-transparent w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white focus:outline-none hidden md:inline-block">
                 <div ref={overflowingDivRef} className="px-1 py-1">
                   <div className="">
                     <div className={`shadow-[0_30px_30px_-30px_rgba(0,0,255,0.9)] min-w-[415px] flex flex-col justify-center w-[32vw] max-w-md rounded-xl bg-white dark:bg-[#202232]`} style={{ border: '.1vw solid #DADBE8' }}>
                       <div className="w-full max-w-md bg-[#3944B3] dark:bg-[#171925] flex justify-around px-10  py-3 rounded-tr-xl rounded-tl-xl">
                         {['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) && <div className="text-[#fff]">Rooms</div>}
                         <div className="text-[#fff]">Adults</div>
                         <div className="text-[#fff]">Children</div>
                       </div>
 
                       {row.length > 0 && row.map((item: any, index: any) => {
                         return (Display(item, index))
                       })}
 
                       {['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) &&
                         <div className="w-[100%] md:px-16 py-7 mb-3 flex justify-between bg-white">
                           {(row.length !== 4 && passengersSize() < PASSENGERS_LIMIT()) ?
                             <div
                               className={`bg-[#28C36F] text-[#fff] p-4 rounded-3xl w-[8vw] md:w-36 flex justify-center cursor-pointer md:mr-4
                                           ${isMobile ? '' : ''}
                              `}
                               onClick={() => Add_Function()}>Add Room</div> :
                             <div className="p-4 rounded-3xl w-[8vw] xl:w-[10vw] flex justify-center cursor-pointer"></div>
                           }
                           <div className="bg-[#4E5CF4] text-[#fff] p-4 rounded-3xl w-[8vw] md:w-36 flex justify-center cursor-pointer" onClick={() => Done_Function()}>Done</div>
                         </div>
                       }
 
                     </div>
 
                   </div>
                 </div>
               </Menu.Items>
             </Transition>
           </Menu>
         </div>
         {/* <Popover className="flex relative [ nc-flex-1 ] h-[100%] w-full">
           {({ open }) => (
 
             <>
               <Popover.Button
                 //  onClick={closeFunc}
                 onClick={handleClick}
                 ref={popoverButtonRef}
                 className={`flex text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${open ? "nc-hero-field-focused" : ""
                   }`}
               >
                 <div className="flex-grow h-[100%]">
                   <span className={`block text-xs xl:text-sm font-semibold translate-y-[10px] md:transform-0 md:mt-1 text-[#000] dark:text-[#fff]`}>
                     Travellers
                   </span>
                   <span className="block mt-5 xl:mt-3 text-[10px] xl:text-sm text-[#15173F] dark:text-white leading-none font-light ">
                     {/* {totalGuests ?  totalGuests + "Guests" : "Add guests"} */}
         {/* {['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) && guestRoomsInputValue + " Rooms" + " "}
                     {guestAdultsInputValue + " Adults" + " "}
                     {
                       guestChildrenInputValue > 0 &&
                       <span className="inline-flex">
                         {" "} {guestChildrenInputValue} {" "} <i className="fa fa-child"></i>
                       </span>
                     } */}
 
         {/* add travelers... */}
         {/* {guestRoomsInputValue === 1 && guestAdultsInputValue === 1 && guestChildrenInputValue === 0 && "Add travelers"} */}
         {/* </span>
 
                   {open && (
                     <ClearDataButton
                       onClick={() => {
                         setGuestRoomsInputValue(guestAdultsInputValue);
                         setGuestAdultsInputValue(guestAdultsInputValue);
                         setGuestChildrenInputValue(guestAdultsInputValue);
                       }}
                     />
                   )}
                 </div>
 
                 <div className="text-neutral-300 dark:text-neutral-400 pt-[1.3vh]">
                   { */}
         {/* localStorage.getItem('theme') == 'dark' ?
                       <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g opacity="0.3">
                           <path d="M9.625 18.0276C12.7661 18.0276 15.3125 15.4953 15.3125 12.3715C15.3125 9.24778 12.7661 6.71547 9.625 6.71547C6.48388 6.71547 3.9375 9.24778 3.9375 12.3715C3.9375 15.4953 6.48388 18.0276 9.625 18.0276Z" stroke="#fff" stroke-width="2" stroke-miterlimit="10" />
                           <path d="M16.9971 6.92213C17.4998 6.78653 18.0183 6.71705 18.5393 6.71547C20.0477 6.71547 21.4943 7.31138 22.561 8.3721C23.6276 9.43282 24.2268 10.8715 24.2268 12.3715C24.2268 13.8716 23.6276 15.3103 22.561 16.371C21.4943 17.4317 20.0477 18.0276 18.5393 18.0276" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M1.75 22.0956C2.63807 20.8389 3.81723 19.8131 5.18788 19.105C6.55854 18.3969 8.08043 18.0272 9.625 18.0272C11.1696 18.0272 12.6915 18.3969 14.0621 19.105C15.4328 19.8131 16.6119 20.8389 17.5 22.0956" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M18.5391 18.0276C20.0838 18.0267 21.606 18.3959 22.9768 19.104C24.3476 19.8121 25.5266 20.8383 26.4141 22.0956" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                         </g>
                       </svg>
                       :
                       <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g opacity="0.3">
                           <path d="M9.625 18.0276C12.7661 18.0276 15.3125 15.4953 15.3125 12.3715C15.3125 9.24778 12.7661 6.71547 9.625 6.71547C6.48388 6.71547 3.9375 9.24778 3.9375 12.3715C3.9375 15.4953 6.48388 18.0276 9.625 18.0276Z" stroke="#3842B2" stroke-width="2" stroke-miterlimit="10" />
                           <path d="M16.9971 6.92213C17.4998 6.78653 18.0183 6.71705 18.5393 6.71547C20.0477 6.71547 21.4943 7.31138 22.561 8.3721C23.6276 9.43282 24.2268 10.8715 24.2268 12.3715C24.2268 13.8716 23.6276 15.3103 22.561 16.371C21.4943 17.4317 20.0477 18.0276 18.5393 18.0276" stroke="#3842B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M1.75 22.0956C2.63807 20.8389 3.81723 19.8131 5.18788 19.105C6.55854 18.3969 8.08043 18.0272 9.625 18.0272C11.1696 18.0272 12.6915 18.3969 14.0621 19.105C15.4328 19.8131 16.6119 20.8389 17.5 22.0956" stroke="#3842B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M18.5391 18.0276C20.0838 18.0267 21.606 18.3959 22.9768 19.104C24.3476 19.8121 25.5266 20.8383 26.4141 22.0956" stroke="#3842B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                         </g>
                       </svg>
                   }
 
                 </div>
 
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
                 <Popover.Panel className={`absolute  z-30 hidden md:inline-block bg-[transparent] mt-3 rounded-3xl
                           ${isParentInModal ? 'top-10 right-0' : 'top-full right-[10vw]'}
            `}>
                   <div ref={overflowingDivRef} className={`shadow-[0_30px_30px_-30px_rgba(0,0,255,0.9)] min-w-[415px] flex flex-col justify-center w-[32vw] max-w-md rounded-xl bg-white`} style={{ border: '.1vw solid #DADBE8' }}>
                     <div className="w-full max-w-md bg-[#3944B3] flex justify-around px-10  py-3 rounded-tr-xl rounded-tl-xl">
                       {['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) && <div className="text-[#fff]">Rooms</div>}
                       <div className="text-[#fff]">Adults</div>
                       <div className="text-[#fff]">Children</div>
                     </div>
 
                     {row.length > 0 && row.map((item: any, index: any) => {
                       return (Display(item, index))
                     })}
 
                     {['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) &&
                       <div className="w-[100%] md:px-16 py-7 mb-3 flex justify-between bg-white">
                         {(row.length !== 4 && passengersSize() < PASSENGERS_LIMIT()) ?
                           <div
                             className={`bg-[#28C36F] text-[#fff] p-4 rounded-3xl w-[8vw] md:w-36 flex justify-center cursor-pointer md:mr-4
                                           ${isMobile ? '' : ''}
                              `}
                             onClick={() => Add_Function()}>Add Room</div> :
                           <div className="p-4 rounded-3xl w-[8vw] xl:w-[10vw] flex justify-center cursor-pointer"></div>
                         }
                         <div className="bg-[#4E5CF4] text-[#fff] p-4 rounded-3xl w-[8vw] md:w-36 flex justify-center cursor-pointer" onClick={() => Done_Function({ open })}>Done</div>
                       </div>
                     }
 
                   </div>
 
                 </Popover.Panel>
               </Transition>
             </>
           )} */}
         {/* </Popover> */}
       </div>
       {
         isMobile ?
           <Modal
             opened={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             withCloseButton={false}
             classNames={{ modal: classes.modal }}
           >
             <div className={`w-[330px] md:w-[32vw] shadow-[0_30px_30px_-30px_rgba(0,0,255,0.9)] flex flex-col justify-center rounded-xl bg-white`} style={{ border: '.1vw solid #DADBE8' }}>
               <div className="w-full md:w-[31.9vw] bg-[#3944B3] flex justify-between md:justify-around pl-6 pr-9 md:!px-6  py-3 rounded-tr-xl rounded-tl-xl">
                 {['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) && <div className="text-[#fff] text-sm">Rooms</div>}
                 <div className="text-[#fff] text-sm">Adults</div>
                 <div className="text-[#fff] text-sm" >Children</div>
               </div>
               {row.length > 0 && row.map((item: any, index: any) => {
                 return (Display(item, index))
               })}
 
               {['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type) &&
                 <div className="w-[100%] px-5 xl:px-16 2xl:px-24 py-7 mb-3 flex justify-between bg-white">
                   {(row.length !== 4 && passengersSize() < PASSENGERS_LIMIT()) ?
                     <div className="bg-[#28C36F] text-[#fff] p-4 rounded-3xl w-full md:w-[8vw] xl:w-[10vw] mr-4 flex justify-center cursor-pointer" onClick={() => Add_Function()}>Add Room</div> :
                     <div className="p-4 rounded-3xl w-[8vw] xl:w-[10vw] flex justify-center cursor-pointer"></div>
                   }
                   <div className="bg-[#4E5CF4] text-[#fff] p-4 rounded-3xl w-full md:w-[8vw] xl:w-[10vw] flex justify-center cursor-pointer" onClick={() => setIsModalOpen(false)}>Done</div>
                 </div>
               }
 
             </div>
 
           </Modal>
           : <></>
       }
     </>
   );
 }
)

export default GuestsInput;