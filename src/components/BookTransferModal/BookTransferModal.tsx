import React, { FC } from 'react'
import { useCurrencyPicker } from '../../hooks';
import { ReactComponent as AirPlaneIcon } from '../../images/icons/AirplaneIcon.svg'
import FlightSearchForm, { FlightSearchFormProps } from '../HeroInputSearch/FlightSearchForm'
import TransfersSearchForm, { TransfersSearchFormProps } from '../HeroInputSearch/TransfersSearchForm';
import { flightCurrencyPicker } from '../StayCard/FlightCard';


interface BookFlightModalProps {
    data: any;
    searchFormProps: TransfersSearchFormProps,
}


const BookTransferModal: FC<BookFlightModalProps> = (props) => {
    const {arrival, currency, basePrice, id, startDate, endDate} = props.data
    const {customStyle ,roundedTopLeft ,defaultFrom , isParentModal} = props.searchFormProps
 

      let start = new Date(startDate).toDateString();
      let end = new Date(endDate).toDateString();
    const transferCurrency = useCurrencyPicker(currency)

    return (
        <div className='w-full h-full relative'>
            <h1 className='text-base sm:text-xl md:text-2xl text-[#F75847] mb-4'>Book your transfers online</h1>
            <div className='from_to w-full flex  justify-center md:justify-start items-center px-4 py-3 sm:py-5 bg-[#F75847] rounded-[10px] shadow-[6px_12px_22px_-2px_rgba(29,_136,_221,_0.22)]'>
                <AirPlaneIcon className='w-5 h-5 text-white mr-[10px] hidden md:inline-block' />
                <div className=''>
                    <div className='first_text_line text-center md:text-left mb-2 sm:mb-0'>

                        <span className='from text-white md:text-base font-normal mr-1'>
                            {defaultFrom}
                           
                        </span>
                        <span className='text-white text-base font-normal mr-1'>
                            to
                        </span>
                        <span className='to text-white mr-1 font-bold'>
                           {arrival?.name}
                           
                        </span>
                    </div>
                    <div className='second_text_line flex'>
                        <div className='mr-6 text-center md:text-left'>
                            <span className='text-white mr-2 text-xs font-semibold '>Economy Return form</span>
                            <span className='return_price text-white font-bold inline-block'>
                                {transferCurrency} {basePrice}
                            </span>

                        </div>
                        <div className='text-center md:text-left'>
                            <span className='text-white text-sm sm:text-base'>Deal number: </span>
                            <span className='text-white font-bold text-sm sm:text-base'>{id} </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className='flight_dates mt-[18px]'>
                <span className='text-xs text-black font-light'>Travel between</span>
                <span className='text-black font-medium text-xs px-[11px]'> 
                    {start} - {end}
                </span>
                <span className='text-xs text-black font-light'>for this deal.</span>

            </div>
            <div className='form_container w-full '>
                <TransfersSearchForm {...props.searchFormProps} isParentModal/> 
                {/* <FlightSearchForm {...props.searchFormProps} isParentModal/> */}

            </div>
        </div>
    )
}

export default BookTransferModal