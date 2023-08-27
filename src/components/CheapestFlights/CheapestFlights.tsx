import React, { FC, Fragment, ReactNode, useState } from "react";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";
import ButtonSecondary from "../../lib/Button/ButtonSecondary";
import FlightCard from "../StayCard/FlightCard";
import StayCard from "../StayCard/StayCard";
import CheapestFlightsHeader from "./CheapestFlightsHeader";
import { useHistory } from 'react-router-dom'
import { Dialog, Transition } from "@headlessui/react";
import { ReactComponent as CrossIcon } from "../../images/icons/PopUpCloseIcon.svg";
import BookFlightModal from "../BookFlightModal/BookFlightModal";
import NotFound from "../NotFound/NotFound";
// limit demo stay listing
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 6);


interface CheapestFlightsProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  style?: object;
  classname?: string;
  data?: any;
  useCompactStyles? : boolean;
  ideasModel?: any;
  parrentClassname?: string;
};

const CheapestFlights: FC<CheapestFlightsProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
  style,
  classname="",
  data = '',
  useCompactStyles = false,
  ideasModel = "",
  parrentClassname = "bg-[#FFF9F9] dark:bg-[#202133]"
}) => {

  const [opened, setOpened] = useState(false);
  const [checkAvailability, setCheckAvailability] = useState<any>({
    opened: false, 
    data: '',
    defaultFrom: '',
    defaultTo: ''
  });

  // Determine if we are on the flights page
  let history = useHistory()
  let isFlightsPage = history.location.pathname == '/flights';

  const handleMoreFlights = () => {
    setCheckAvailability({
      opened: true, 
      data: '',
      defaultFrom: '',
      defaultTo: ''
    })
  };

  const renderCard = (flight: any) => {
    return <FlightCard
               onCheckAvailability = {(flight_avail: any) => setCheckAvailability(flight_avail)}
               data = { flight } 
               useCompactStyles = { useCompactStyles }
            />;
  };

  const FILTER_CHEAPEST_FLIGHTS = data && data.filter((flight: any) => flight.transportType == 'PLANE');
  const CHEAPEST_FLIGHTS_DATA = FILTER_CHEAPEST_FLIGHTS && FILTER_CHEAPEST_FLIGHTS.filter((_: any, i: number) => i < 9);

  return (
    <div className={parrentClassname}>

    <div
      className={`cheapest-flights relative px-5 lg:px-0 lg:mx-[10.1vw] pt-[30px] ${classname}`}
      // style = { style } mt-52 ml-92 w-8/12 mx-auto mx-auto
      // style={{marginTop: '57px', marginLeft: '220px', width: '1000px'}}
    >
      <CheapestFlightsHeader
        subHeading={subHeading}
        heading={heading}
        onSecondaryBtnClick = { () => handleMoreFlights() }
        ideasModel={ideasModel}
      />
      {
        CHEAPEST_FLIGHTS_DATA && CHEAPEST_FLIGHTS_DATA.length === 0 && <NotFound innerText="No Flights found for this criteria" />
      }

      <div className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ${gridClass}`}>
        { CHEAPEST_FLIGHTS_DATA && CHEAPEST_FLIGHTS_DATA.map((flight: any) => (new Date() < new Date(flight.endDate) || (new Date(flight.endDate).getTime() == new Date(flight.endDate).getTime())) && flight.transportType == 'PLANE' && renderCard(flight)) }
      </div>

      <ButtonSecondary onClick={() => handleMoreFlights()} className="!leading-none md:hidden !rounded-2xl mt-5 ml-92 border-[#3944B3] bg-[#3944B3] w-full min-w-[333px] !h-[40px] ">
        <span className="text-white font-normal">More flights</span>
        <i className="ml-3 las la-arrow-right text-xl text-white"></i>
      </ButtonSecondary>

      <div className="flex mt-11 md:mt-16 justify-center items-center">
          {/*  */}
      </div>

     </div>


     {/*  flight popup */}
     <Transition appear show={checkAvailability && checkAvailability.opened} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => {
          setCheckAvailability({
            opened: false, 
            data: '',
            defaultFrom: '',
            defaultTo: ''
          })
        }}
        // style={{backgroundImage: `url(${login})`}}
      >
        <div className="min-h-screen px-1 text-center md:px-4" >
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
            <div className={`inline-block w-[50vw] min-w-[334px] bigMd:w-[723px] !max-w-[unset] my-5 pb-[1px] text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300`}>
                <div 
                  className='close_button w-7 h-7 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white shadow-[0px_5px_5px_rgba(77,_87,_203,_0.29)] cursor-pointer'
                  onClick={() => {
                    setCheckAvailability({
                      opened: false, 
                      data: '',
                      defaultFrom: '',
                      defaultTo: ''
                    })
                  }}
                >
                   <CrossIcon className='text-[#F75847]' />
                </div>
                <div className="w-full h-full pt-6 px-2 md:px-9 overflow-hidden">
                    <BookFlightModal  
                      data={checkAvailability.data}
                      searchFormProps={{
                        type :'staticSearch',
                        displayType: 'dialog',
                        radioHeight:"py-5",
                        showClassGuest:true,
                        roundedTopLeft:"",
                        customStyle:'',
                        defaultFrom : checkAvailability.defaultFrom ,
                        defaultTo : checkAvailability.defaultTo,
                        
                      }}
                    />
                </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>

    </div>
    
  );
};

export default CheapestFlights;
