import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PopularData } from "../../data/PopularData";
import { useHistory } from "react-router-dom";
import { ReactComponent as DealsIcon } from '../../images/icons/DealsIcon.svg'
// import { ReactComponent as GuideIcon } from '../../images/icons/guideIcon.svg'
import { destinationDetail, guideDetailClear, guideDetailData, popularDestView, taxonomyClear } from "../../store/actions/TravelguideActions";
import { t } from "i18next";
import { ToTranslationFormat } from "../../helpers";
import { useTranslation } from "react-i18next";
import StringToBoolean from "../../common/StringToBoolean";
import { goToPage } from "../../common/goToPage";
import BASE_URL_HOME from "../../api/env";

export interface PopularCardProps {
  className?: string;
  data?: any;
  browseDestination?: any;
};

const INIT_DATA = PopularData && PopularData[0];

const PopularCard: FC<PopularCardProps> = ({
  className = "",
  data = INIT_DATA,
  browseDestination
}) => {

  const {
    name,
    tid,
    image,
    button,
    continent_name,
    country_name,
    continent_tid,
    country_tid
  } = data;

  const dispatch = useDispatch();

  const destinationDetailData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.destinationdetail);
  const taxonomyData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.taxonomydir);
  const guideDetail = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.guidedetail);
  const theme = useSelector((state: any) => state.LightMode.mode);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  const isTravelCompositorDealsPage = StringToBoolean(process.env.REACT_APP_USE_TRAVEL_COMPOSITOR_DEALS_PAGE);

  // @ts-ignore
  const {t} = useTranslation();

  const DealsIcon = (color: any) => {
    return (
      <>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_7197_21968)">
            <mask id="mask0_7197_21968" style={{ maskType:'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
              <rect width="48" height="48" fill={color} />
            </mask>
            <g mask="url(#mask0_7197_21968)">
              <path d="M12.009 15.9955L15.2173 12.7872C15.3854 12.6191 15.5076 12.432 15.584 12.2257C15.6604 12.0195 15.6986 11.8018 15.6986 11.5726C15.6986 11.0837 15.5267 10.6674 15.1829 10.3236C14.8392 9.97988 14.4229 9.80801 13.934 9.80801C13.6284 9.80801 13.3229 9.90731 13.0173 10.1059C12.7118 10.3045 12.3757 10.6254 12.009 11.0684C11.6423 10.6254 11.3062 10.3045 11.0007 10.1059C10.6951 9.90731 10.3895 9.80801 10.084 9.80801C9.59509 9.80801 9.17877 9.97988 8.83503 10.3236C8.49128 10.6674 8.3194 11.0837 8.3194 11.5726C8.3194 11.8018 8.35759 12.0195 8.43398 12.2257C8.51037 12.432 8.6326 12.6191 8.80065 12.7872L12.009 15.9955ZM12.8111 19.7768C12.5361 20.0518 12.2038 20.1893 11.8142 20.1893C11.4246 20.1893 11.0923 20.0518 10.8173 19.7768L2.22357 11.183C2.07079 11.0302 1.96767 10.8698 1.91419 10.7018C1.86072 10.5337 1.83398 10.358 1.83398 10.1747V3.20801C1.83398 2.81079 1.96385 2.48231 2.22357 2.22259C2.48329 1.96287 2.81176 1.83301 3.20898 1.83301H10.1757C10.359 1.83301 10.5423 1.85974 10.7256 1.91322C10.909 1.96669 11.077 2.06981 11.2298 2.22259L19.7777 10.7705C20.068 11.0608 20.2131 11.4007 20.2131 11.7903C20.2131 12.1799 20.068 12.5198 19.7777 12.8101L12.8111 19.7768ZM11.8715 18.8372L18.8381 11.8705L10.1757 3.20801H3.20898V10.1747L11.8715 18.8372ZM5.61523 6.78301C5.93607 6.78301 6.21489 6.6646 6.45169 6.4278C6.6885 6.19099 6.8069 5.91217 6.8069 5.59134C6.8069 5.27051 6.6885 4.99169 6.45169 4.75488C6.21489 4.51808 5.93607 4.39967 5.61523 4.39967C5.2944 4.39967 5.01558 4.51808 4.77878 4.75488C4.54197 4.99169 4.42357 5.27051 4.42357 5.59134C4.42357 5.91217 4.54197 6.19099 4.77878 6.4278C5.01558 6.6646 5.2944 6.78301 5.61523 6.78301Z" fill={color} />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_7197_21968">
              <rect width="22" height="22" fill="white" />
            </clipPath>
          </defs>
        </svg>

      </>
    )
  };

  const GuideIcon = (color: any) => {
    return (
      <>
        <>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_7197_21980)">
              <mask id="mask0_7197_21980" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
                <rect width="48" height="48" fill={color} />
              </mask>
              <g mask="url(#mask0_7197_21980)">
                <path d="M11.9617 20.1206V18.7456C12.6492 18.6539 13.3176 18.4744 13.9669 18.207C14.6162 17.9397 15.2235 17.5845 15.7888 17.1414L16.7284 18.1497C16.0256 18.7303 15.277 19.181 14.4826 19.5018C13.6881 19.8227 12.8478 20.0289 11.9617 20.1206ZM18.1263 16.7289L17.1409 15.7893C17.5534 15.2393 17.8971 14.6473 18.1721 14.0133C18.4471 13.3793 18.6381 12.6956 18.7451 11.9622H20.143C20.0207 12.8789 19.7878 13.7383 19.444 14.5404C19.1003 15.3424 18.661 16.072 18.1263 16.7289ZM18.7451 10.0372C18.6381 9.30391 18.4471 8.62404 18.1721 7.99766C17.8971 7.37127 17.5534 6.77543 17.1409 6.21016L18.1263 5.27057C18.7069 6.03446 19.1499 6.79071 19.4555 7.53932C19.761 8.28793 19.9902 9.12057 20.143 10.0372H18.7451ZM10.0138 20.1206C7.69158 19.8609 5.7513 18.864 4.19297 17.1299C2.63464 15.3959 1.85547 13.3525 1.85547 10.9997C1.85547 8.64696 2.63464 6.60356 4.19297 4.86953C5.7513 3.1355 7.69158 2.13863 10.0138 1.87891V3.25391C8.07352 3.51363 6.4579 4.38064 5.16693 5.85495C3.87595 7.32925 3.23047 9.04418 3.23047 10.9997C3.23047 12.9553 3.87595 14.6702 5.16693 16.1445C6.4579 17.6188 8.07352 18.4859 10.0138 18.7456V20.1206ZM15.8117 4.85807C15.2159 4.44557 14.5933 4.10564 13.944 3.83828C13.2947 3.57092 12.6492 3.37613 12.0076 3.25391V1.87891C12.8326 2.00113 13.6499 2.22266 14.4596 2.54349C15.2694 2.86432 16.0256 3.29974 16.7284 3.84974L15.8117 4.85807ZM10.9992 15.8352C9.70061 14.7352 8.73811 13.7154 8.11172 12.7758C7.48533 11.8362 7.17213 10.9692 7.17213 10.1747C7.17213 8.96779 7.5579 8.00911 8.32943 7.2987C9.10095 6.58828 9.99088 6.23307 10.9992 6.23307C12.0076 6.23307 12.8975 6.58828 13.669 7.2987C14.4405 8.00911 14.8263 8.96779 14.8263 10.1747C14.8263 10.9692 14.5131 11.8362 13.8867 12.7758C13.2603 13.7154 12.2978 14.7352 10.9992 15.8352ZM10.9992 11.0456C11.2895 11.0456 11.5339 10.9463 11.7326 10.7477C11.9312 10.549 12.0305 10.3046 12.0305 10.0143C12.0305 9.7546 11.9312 9.51779 11.7326 9.30391C11.5339 9.09002 11.2895 8.98307 10.9992 8.98307C10.7089 8.98307 10.4645 9.09002 10.2659 9.30391C10.0673 9.51779 9.96797 9.7546 9.96797 10.0143C9.96797 10.3046 10.0673 10.549 10.2659 10.7477C10.4645 10.9463 10.7089 11.0456 10.9992 11.0456Z" fill={color} />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_7197_21980">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>

        </>
      </>
    )
  };

  let history = useHistory();

  const handleTravelRoute = (btn: any) => {
    // continent
    let staticTaxo: any = [
      {
        name: continent_name,
        tid: continent_tid
      },
      {
        name: country_name,
        tid: country_tid
      },
      {
        name: name,
        tid: tid
      }
    ];

    // callback
    // let guide_id = destinationDetailData[0].field_info_subtopics[0].nid;
    if (taxonomyData && taxonomyData.length > 0) {
      dispatch(
        taxonomyClear()
      );
    };
    
    if (btn.type == 'deals') {
       if(isTravelCompositorDealsPage){
        let citycode = name.toLowerCase() ?? btn.citycode.toLowerCase();
        let dealspage = BASE_URL_HOME + "/" + activeLang.toLowerCase() + "/destination/" + citycode;

        goToPage(dealspage, 'redirect');
        return;
       };
      if (guideDetail && guideDetail.data.length > 0) {
        dispatch(
          guideDetailClear()
        )
      };
      // scroll to deals deals
      dispatch(
        popularDestView(13)
      );

      browseDestination(staticTaxo, null);
    } else {

      // dispatch(
      //   guideDetailData(guide_id)
      // ); 

      // staticTaxo.push({
      //   name: 'Travel Guide'
      // });

      let guide_id = btn.nid;
      browseDestination(staticTaxo, guide_id);

    };

    // let link = '/travelguide/' + `${destinationDetailData[0].continent_name.toLowerCase()}`;
    // history.push(link);
  };

  const renderContent = () => {
    return (
      <div className="bg-white rounded-lg shadow-[0_13px_30px_-7px_rgba(0,10,255,0.09)] mb-4 dark:mb-0 dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow w-[100%] rounded-t-2xl overflow-hidden">
        <div className="relative w-full aspect-1 h-[140px] md:h-[250px] overflow-hidden flex items-center justify-center">
          <img className="min-h-full min-w-full " src={image} alt="product image" />
        </div>
        <div className="p-2 md:p-5 flex-1">
          <div className="cursor-pointer">
            <a>
              <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            </a>
          </div>
          <div className="grid col-1 mt-2 md:mt-4 space-y-2 md:space-y-4">
            {
              button?.map((btn: any, index: number) => (
                <div key={index} onClick={(event: any) => handleTravelRoute(btn)} className="box-border border-2 border-[#F4F8FF] bg-[#FFFFFF] dark:bg-transparent h-[40px] rounded-[8px] space-y-2 cursor-pointer flex items-center">
                  <div className="ml-2 flex space-x-3 items-center">
                    <div className="">
                      {btn.icon == 'deals' ? DealsIcon(theme == 'dark' ? '#fff' : '#0E123D') : GuideIcon(theme == 'dark' ? '#fff' : '#0E123D')}
                    </div>
                    <div className="font-poppins font-normal text-[12px] text-[#0E123D] leading-[18px] dark:text-white">{(btn.name == "Travel Deals" || btn.name == "Travel Guide") ? t(`POPULAR_DESTINATIONS.${ToTranslationFormat(btn.name)}`) : t(btn.name) }</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`popular-card group flex relative bg-white dark:bg-neutral-900 dark:border-neutral-800 rounded-2xl mb-[2vw] ${className}`}>
      {renderContent()}
    </div>
  );
};

export default PopularCard;
