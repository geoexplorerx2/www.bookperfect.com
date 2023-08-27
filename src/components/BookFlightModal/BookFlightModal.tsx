import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TranslateIfExists } from '../../helpers';
import { ReactComponent as AirPlaneIcon } from '../../images/icons/AirplaneIcon.svg'
import FlightSearchForm, { FlightSearchFormProps } from '../HeroInputSearch/FlightSearchForm'
import { flightCurrencyPicker } from '../StayCard/FlightCard';


interface BookFlightModalProps {
    data: any;
    searchFormProps: FlightSearchFormProps,
}


const BookFlightModal: FC<BookFlightModalProps> = (props) => {
    const {customStyle, radioHeight,roundedTopLeft,showClassGuest,defaultFrom,defaultTo,displayType,isParentModal,type,wrapperClassName} = props.searchFormProps
    const {
        name,
        id,
        startDate,
        endDate,
        baseAdultPrice,
        currency,
        departureLocationCode,
        arrivalLocationCode,
        datasheets
      } = props.data;

      const flightCurrency = flightCurrencyPicker(currency)
    //   @ts-ignore
      const { t } = useTranslation()
      let start = new Date(startDate).toDateString();
      let end = new Date(endDate).toDateString();

    return (
        <div className='w-full h-full relative'>
            <h1 className='text-base sm:text-xl md:text-2xl text-[#F75847] mb-4'>{t('BOOK_FLIGHT_MODAL.BOOK_YOUR_FLIGHTS_ONLINE')}</h1>
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
                           {defaultTo}
                        </span>
                    </div>
                    <div className='second_text_line flex'>
                        <div className='mr-6 text-center md:text-left'>
                            <span className='text-white mr-2 text-xs font-semibold '>{t('BOOK_FLIGHT_MODAL.ECONOMY_RETURN_FROM')}</span>
                            <span className='return_price text-white font-bold inline-block'>{ flightCurrency } { baseAdultPrice }</span>
                        </div>
                        <div className='text-center md:text-left'>
                            <span className='text-white text-sm sm:text-base'>{t('BOOK_FLIGHT_MODAL.DEAL_NUMBER')}: </span>
                            <span className='text-white font-bold text-sm sm:text-base'> { id } </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className='flight_dates mt-[18px] mb-4 md:mb-9'>
                <span className='text-xs text-black font-light'>{t('BOOK_FLIGHT_MODAL.TRAVEL_BETWEEN')}</span>
                <span className='text-black font-medium text-xs px-[11px]'> {start} - {end} </span>
                <span className='text-xs text-black font-light'>{t('BOOK_FLIGHT_MODAL.FOR_THIS_DEAL')}.</span>

            </div>
            <div className='form_container w-full '>
                <FlightSearchForm {...props.searchFormProps} isParentModal/>
            </div>
        </div>
    )
}

export default BookFlightModal