import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../common/capitalizeFirstLetter';
import { goToPage } from '../../common/goToPage';
import { tripIdeasData } from '../../store/actions';
import { cities, citiesClear, cityInformationData, continent, countries, destinationDetail, taxonomyClear, taxonomyDir, taxonomyUpdate } from '../../store/actions/TravelguideActions';
import TYPES from '../../types/store';
import BASE_URL_HOME from '../../api/env';
import StringToBoolean from '../../common/StringToBoolean';

interface TaxonomyHeaderProps {
  taxonomy?: any;
  onTaxonomy?: any;
  showTaxonomyDesc?: boolean;
  type?: string;
  isPageDataReady?: any;
  isDealsPage?: boolean;
};


const TravelguideTaxonomy: FC<TaxonomyHeaderProps> = ({ type = '', taxonomy, onTaxonomy, showTaxonomyDesc = true, isPageDataReady, isDealsPage }) => {

  const dispatch = useDispatch()
  const history = useHistory();

  const taxoRef = useRef<any>([]);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const LightMode: any = useSelector((state: any) => state.LightMode.mode);

  const isTravelCompositorDealsPage = StringToBoolean(process.env.REACT_APP_USE_TRAVEL_COMPOSITOR_DEALS_PAGE);
  
  const url = window.location.pathname;
  const taxonomyLink = url.split('/');

  taxonomyLink?.splice(0, 2);

  const [updateTaxonomy, setUpdateTaxonomy] = useState(new Date().getTime());

  var dynamicUrl;

  const handleTaxonomyChange = (param: any, index: any) => {
    if (param.name == 'Travel Guide') return;

    if (param == 'travelguide') {
      history.push('/' + activeLang + '/' + param);

      dispatch(
        continent()
      );

      dispatch(
        taxonomyClear()
      );

      dispatch(
        citiesClear()
      );

    } else {
      switch (index) {
        case 0:
          dispatch(
            countries(
              param.tid
            )
          );

          // destination detail
          dispatch(
            destinationDetail(
              param.tid
            )
          );

          dispatch(
            citiesClear()
          );

          //console.log(window.location, {taxonomyLink}, {param});

          // add select to dynamic url
          dynamicUrl = "/" + activeLang + "/travelguide/" + param.name.toLowerCase();
          // window.location.replace(dynamicUrl);
          window.location.href = dynamicUrl;
          break;
        case 1:
          dispatch(
            cities(param.tid)
          );

          // destination detail
          dispatch(
            destinationDetail(
              param.tid
            )
          );

          // add select to dynamic url
          dynamicUrl = "/" + activeLang + "/travelguide" + "/" + taxonomyLink[1] + "/" + param.name.toLowerCase() + "/" + param.tid;
          // window.location.replace(dynamicUrl);
          window.location.href = dynamicUrl;
          break;
        case 2:
          
          if (isTravelCompositorDealsPage) {
            let citycode = param.name.toLowerCase();
            let dealspage = BASE_URL_HOME + "/" + activeLang.toLowerCase() + "/destination/" + citycode;

            goToPage(dealspage, 'redirect');
            return;
          };

          dispatch(
            cityInformationData(
              param.tid
            )
          );

          let req = {
            lang: activeLang.toUpperCase(),
            currency: activeCurrency,
            countryCode: 'TR'
          };
          // get trip idea data: packages in a city
          dispatch(
            tripIdeasData(req)
          );

          // destination detail
          dispatch(
            destinationDetail(
              param.tid
            )
          );

          // add select to dynamic url
          dynamicUrl = "/" + activeLang + "/travelguide" + "/" + taxonomyLink[1] + "/" + taxonomyLink[2] + "/" + taxonomyLink[3] + "/" + param.name.toLowerCase() + "/" + param.tid;
          // window.location.replace(dynamicUrl);
          window.location.href = dynamicUrl;
          break;
        default:
          break;
      }

      dispatch(
        taxonomyUpdate(index)
      )
    };

    // on taxonomy
    onTaxonomy();
  };

  // useEffect(() => {
  //   if(taxonomy){
  //     setUpdateTaxonomy(new Date().getTime());
  //   }
  // }, [taxonomy]);

  useEffect(() => {
    if (!isPageDataReady) {
      let span = taxoRef.current;
      let lastTaxo;

      if (isDealsPage && taxonomyLink[taxonomyLink.length - 1] != "travelguide") {
        if (taxonomy[taxonomy?.length - 1]?.name != 'Travel Guide') {
          lastTaxo = span[span?.length - 1];
          lastTaxo?.click();
        } else {
          lastTaxo = span[span?.length - 2];
          lastTaxo?.click();
        }
      }
    };
  }, [url]);

  return (
    <div className='border-b-2 hidden bigMd:block'>
      <div className="flex flex-row h-[60px]  items-center space-x-3 mx-[10vw]">
        {/* <img src = {house} className = "font-poppins" style={{fontSize: '2px'}} />  */}
        <svg width="18" height="18" className='' viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_7511_22605)">
            <path d="M10.5742 14.8779V11.5029C10.5742 11.3537 10.515 11.2106 10.4095 11.1051C10.304 10.9997 10.1609 10.9404 10.0117 10.9404H7.76172C7.61253 10.9404 7.46946 10.9997 7.36397 11.1051C7.25848 11.2106 7.19922 11.3537 7.19922 11.5029V14.8779C7.19922 15.0271 7.13996 15.1702 7.03447 15.2756C6.92898 15.3811 6.7859 15.4404 6.63672 15.4404H3.26172C3.11253 15.4404 2.96946 15.3811 2.86397 15.2756C2.75848 15.1702 2.69922 15.0271 2.69922 14.8779V8.37399C2.70048 8.29615 2.7173 8.21934 2.7487 8.14809C2.78009 8.07685 2.82543 8.0126 2.88203 7.95915L8.50703 2.84743C8.61073 2.75256 8.74618 2.69995 8.88672 2.69995C9.02726 2.69995 9.16271 2.75256 9.26641 2.84743L14.8914 7.95915C14.948 8.0126 14.9933 8.07685 15.0247 8.14809C15.0561 8.21934 15.073 8.29615 15.0742 8.37399V14.8779C15.0742 15.0271 15.015 15.1702 14.9095 15.2756C14.804 15.3811 14.6609 15.4404 14.5117 15.4404H11.1367C10.9875 15.4404 10.8445 15.3811 10.739 15.2756C10.6335 15.1702 10.5742 15.0271 10.5742 14.8779Z" stroke={LightMode == 'dark' ? '#fff' : '#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_7511_22605">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <>
          <span className="text-[12px] text-[#3944B3] leading-[20px] font-poppins">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_7511_22608)">
                <path d="M5.25 11.375L9.625 7L5.25 2.625" stroke={LightMode == 'dark' ? '#fff' : '#3944B3'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_7511_22608">
                  <rect width="14" height="14" fill="white" transform="matrix(-1 0 0 1 14 0)" />
                </clipPath>
              </defs>
            </svg>
          </span>

          <span
            className={`text-[12px] ${taxonomy.length == 0 ? "text-[#0E123D] dark:text-[#fff]" : "text-[#3944B3] border-b-[1px] border-b-[#3944B3] pb-[1px] dark:border-b-[1px] dark:border-b-[#F75847]"}  leading-[20px] cursor-pointer font-poppins dark:text-[#fff]`}
            onClick={() => handleTaxonomyChange('travelguide', '')}
          >
            Destination
          </span>
        </>

        {
          taxonomy?.map((taxo: any, index: number) => (
            <>
              <span className="text-[12px] text-[#3944B3] leading-[20px] font-poppins">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7511_22608)">
                    <path d="M5.25 11.375L9.625 7L5.25 2.625" stroke={LightMode == 'dark' ? '#fff' : "#3944B3"} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7511_22608">
                      <rect width="14" height="14" fill="white" transform="matrix(-1 0 0 1 14 0)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span
                ref={(el: any) => taxoRef.current[index] = el}
                className={`text-[12px] dark:text-[#fff] ${taxonomy && taxonomy[taxonomy.length - 1].name == taxo.name ? "text-[#0E123D]" : "text-[#3944B3] pb-[1px] dark:border-b-[1px] dark:border-b-[#F75847] border-b-[1px] border-b-[#3944B3]"} leading-[20px] ${taxo?.name == 'Travel Guide' ? '' : 'cursor-pointer'} font-poppins`}
                onClick={() => handleTaxonomyChange(taxo, index)}
              >
                {taxo && capitalizeFirstLetter(taxo?.name)}
              </span>
            </>
          ))
        }

      </div>
    </div>
  )
};

export default TravelguideTaxonomy;