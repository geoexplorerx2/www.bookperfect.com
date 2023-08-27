import React, { FC, useState } from 'react';
import { BASE_URL } from '../../api/env';
import { stripHtml } from '../../common/stripHtml';
import file from '../../images/file.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faqs, offerDetail } from '../../store/actions';
import { DEFAULT_FAQ_ID } from '../Disclosure/FAQTab';
import { useTranslation } from 'react-i18next';
import PromoCode from './PromoCode';
import { useSelector } from 'react-redux';

interface ExclusiveOfferContentProps {
  data?: any;
};

const ExclusiveOfferContent: FC<ExclusiveOfferContentProps> = ({ data }) => {
  const {
    title,
    body,
    nid,
    field_offer_promo_code,
    field_offer_validity,
    field_offer_image
  } = data;

  const dispatch = useDispatch();
  const history = useHistory();
  const [clicked, setClicked] = useState(false)
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  // @ts-ignore
  const {t} = useTranslation() 
  // image from drupal
  const image = BASE_URL + field_offer_image.url;

  const handleClipboard = () => {
    navigator.clipboard.writeText(field_offer_promo_code).then(
      () => {
        /* clipboard successfully set */
        setClicked(true)
        setTimeout(() => {setClicked(false)} , 500)
      },
      () => {
        /* clipboard write failed */
      }
    );
  };

  const handleOffer = () => {
    // todo: render offer with dynamic url
    let dynamicPromoCodeUrl = '/offers/' + field_offer_promo_code;

    let offe_id = nid && nid;
    dispatch(
      offerDetail(offe_id)
    );

    dispatch(
      faqs(DEFAULT_FAQ_ID)
    );

    history.push(`/${activeLang}/offers`);
  };

  return (
     <>
      <div>
         <div className='hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] w-[100%] max-w-[446px] flex justify-between mr-2 rounded-xl  p-2 border-[1px] border-[#DADBE8] cursor-pointer' onClick={(e: any) => handleOffer()}>
            <div className='w-[50%]'><img className='w-[90%] h-full' src={image} /></div>
            <div className='w-[50%] flex flex-col item-start justify-between '>
             <div className='text-sm md:text-[16px] font-medium md:mt-[8px] text-[#0E123D] dark:text-white'> { title } </div>
             <div className='font-normal text-[10px] md:text-[14px] text-[#666] mt-0 md:mt-[10px] line-clamp-2 overflow-ellipsis'> { body && stripHtml(body) } </div>
            
              <PromoCode promocode={field_offer_promo_code} checkMarkClassnames='left-2' wrapperClassNames='' handleOffer={handleOffer}/>

            <div className='text-[#666] w-[80%] whitespace-nowrap text-[10px] md:text-[12px] font-normal text-center mt-2 md:mt-[15px]'>{t("VALID_TILL")} { new Date(field_offer_validity).toDateString() }</div>
          </div>
        </div>
      </div>
     </>
      
  )
}

export default ExclusiveOfferContent;