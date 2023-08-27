import React, { FC } from 'react';
import { useHistory } from "react-router-dom";
import LogoBtn from '../../images/LogoBtn.svg';
import LetsGo from '../../images/letsgobtn.svg';
import { useDispatch, useSelector } from 'react-redux';
import { cityInformationData, destinationDetail } from '../../store/actions/TravelguideActions';
import { scrollToTargetAction, tripIdeasData } from '../../store/actions';
import { capitalizeFirstLetter } from '../../common/capitalizeFirstLetter';
import { useTranslation } from 'react-i18next';
import StringToBoolean from '../../common/StringToBoolean';
import { goToPage } from '../../common/goToPage';
import BASE_URL_HOME from '../../api/env';
interface CityDealsShortcutBtnProps {
    taxonomy?: any;
    wrapperClassNames?: string;
};

const CityDealsShortcutBtn: FC<CityDealsShortcutBtnProps> = ({taxonomy, wrapperClassNames}) => {
    const dispatch = useDispatch();
    let history = useHistory();

    const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
    const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

    const isTravelCompositorDealsPage = StringToBoolean(process.env.REACT_APP_USE_TRAVEL_COMPOSITOR_DEALS_PAGE);
    // @ts-ignore
    const {t} = useTranslation()

    const handleRenderDealsPage = () => {
        var dynamicUrl;

        if(isTravelCompositorDealsPage){
            let citycode = taxonomy[2].name.toLowerCase();
            let dealspage = BASE_URL_HOME + "/" + activeLang.toLowerCase() + "/destination/" + citycode;
    
            goToPage(dealspage, 'redirect');
            return;
        };

        dispatch(
            cityInformationData(
                taxonomy[2].tid
            )
        );

        let req = {
            lang: activeLang.toUpperCase(),
            currency: activeCurrency,
            countryCode: 'TR'
        };

        dispatch(
          scrollToTargetAction(
            'deals'
          )
        );

        // get trip idea data: packages in a city
        // dispatch(
        //   tripIdeasData(req)
        // );

        // destination detail
        dispatch(
            destinationDetail(
                taxonomy[2].tid
            )
        );

        // add select to dynamic url
        // TODO: 
        dynamicUrl = "/" + activeLang + "/travelguide" + "/" + taxonomy[0].name.toLowerCase() + "/" + taxonomy[1].name.toLowerCase() + "/" + taxonomy[1].tid + "/" + taxonomy[2].name.toLowerCase() +  "/" + taxonomy[2].tid + "/" + 'deals';
        // window.location.replace(dynamicUrl);
        window.location.href = dynamicUrl
        // history.replace({ pathname: dynamicUrl, search: '', state:{isActive: true}})
        // history.replace(dynamicUrl);
    };

    return (
        <div className={`${wrapperClassNames} relative w-full`}>
            <div className='absolute top-0 w-[95%] bg-gradient-to-r from-[#FE9A7A] to-[#FA6455] rounded-[10px] h-[120px]'>
                <div className='text-[14px] text-[#fff] font-normal w-full px-3 mt-3'>{t("TRAVEL_GUIDE.LET'S_LOOK_AT_THE")}</div>
                <div className='text-[#FFFFFF] text-[14px] font-bold px-3 mt-1'>{ capitalizeFirstLetter(taxonomy[2]?.name ?? '')} {t('TRAVEL_GUIDE.TRAVEL_DEALS!')}</div>
                <div>
                    <div className='flex bg-[#3944B3] mt-3 ml-3 w-[40%] py-2 rounded-[6px] cursor-pointer' onClick={() => handleRenderDealsPage()}>
                        <div className='text-[#fff] px-3 text-[12px] font-bold'>{t("TRAVEL_GUIDE.LET'S_GO")}</div>
                        <div><img className='h-full w-full' src={LetsGo}/></div>
                    </div>
                </div>
            </div>
            <div className='absolute top-0 -translate-y-[20px] translate-x-[20px] right-0'>
                <img src={LogoBtn} />
            </div>
        </div>
    )
};

export default CityDealsShortcutBtn;
