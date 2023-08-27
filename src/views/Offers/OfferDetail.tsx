import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/env';
import BookingPeriod from '../../components/ExclusiveOffers/BookingPeriod';
import PromoCode from '../../components/ExclusiveOffers/PromoCode';
import PromoCodeInformations from '../../components/Promocodesinformations/Promocodesinformations';
import promoimage from '../../images/promoimage.png';


interface OfferDetailProps {
    data?: any;
};

const OfferDetail: FC<OfferDetailProps> = ({ }) => {
    const offerdetail = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.offerdetail);
    const LayoutReducer = useSelector((state:any)=>state.LayoutReducer.status);
    const promocode = offerdetail && offerdetail.length > 0 && offerdetail[0].field_offer_promo_code;
    const bookingperiod = offerdetail && offerdetail.length > 0 && offerdetail[0].field_offer_validity;
    const promoimage = BASE_URL + ( offerdetail && offerdetail.length > 0 && offerdetail[0].field_offer_image && offerdetail[0].field_offer_image.url );
    
    
    return (
        <div className={`guide px-5  lg:mx-[10vw] relative
        ${window.location.pathname=='/offers' && LayoutReducer=='multiStop'?'mt-[200px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='addTransport0'?'mt-[300px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='addTransport1'?'mt-[380px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='addTransport2'?'mt-[450px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='addTransport-1'?'mt-[220px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='accom0'?'mt-[150px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='accom1'?'mt-[250px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='accom2'?'mt-[320px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='accom3'?'mt-[420px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='Transfers'?'mt-[100px]':''}
        ${window.location.pathname=='/offers' && LayoutReducer=='Rent a Car'?'mt-[100px]':''}
        
        `}>
            <div className="flex space-x-6">
                <div className="w-full">
                    <div className="space-y-8">
                        <p className='font-poppins font-normal leading-[42px] text-[#0E123D] text-base md:text-lg lg:text-xl xl:text-[28px] dark:text-[#fff]'> Register and Get Discount on Booking First Flight with Us </p>
                        
                            <img src={promoimage} width={384} height={327} className="block bigMd:hidden mx-auto" />
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                            <div className=''>
                                <PromoCode promocode={promocode} />
                            </div>
                            <div className=''>
                                <BookingPeriod bookingperiod={bookingperiod} />
                            </div>

                        </div>
                        <div>
                            <PromoCodeInformations data = { offerdetail && offerdetail[0] } />
                        </div>

                    </div>
                </div>
                <div className="hidden bigMd:inline-block w-1/4 mt-5">
                    {/* TODO: dynamic image */}
                    <img src={promoimage} width={384} height={327} />
                </div>
            </div>
        </div>
    )
}

export default OfferDetail;