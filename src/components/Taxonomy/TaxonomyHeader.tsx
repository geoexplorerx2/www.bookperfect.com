import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../common/capitalizeFirstLetter';
import house from "../../images/house.svg";
import { tripIdeasData } from '../../store/actions';
import { cities, citiesClear, cityInformationData, countries, destinationDetail, discoverdestinations, taxonomyClear, taxonomyDir, taxonomyUpdate } from '../../store/actions/TravelguideActions';

interface TaxonomyHeaderProps {
  taxonomy?: any;
  onTaxonomy?: any;
  showTaxonomyDesc?: boolean;
  type?: string;
};

const TaxonomyHeader: FC<TaxonomyHeaderProps> = ({ type = '', taxonomy, onTaxonomy, showTaxonomyDesc = true }) => {
  const dispatch = useDispatch();
  const [updateTaxonomy, setUpdateTaxonomy] = useState(new Date().getTime());
  let history = useHistory();
  // const taxonomyLink = window.location.pathname.split('/');
  // const taxonomy = taxonomyLink.slice(2, taxonomyLink.length);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const discoverDestination = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.discoverdestination);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const activeSideMenu = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.activemenu);

  const pathname = window.location.pathname.split('/');
  const pathnameFiltered = pathname.filter(path => path != "" );

  // @ts-ignore
  const { t } = useTranslation()

  const handleTaxonomyChange = (param: any, index: any) => {
    if (param.name == 'Travel Guide') return;

    if (param == 'travelguide') {
      history.push('/' + param);

      dispatch(
        taxonomyClear()
      );

      dispatch(
        citiesClear()
      );

    } else {
      switch (index) {
        case 0:
          //alert(param.tid)
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

          break;
        case 1:
          dispatch(
            cities(param.tid)
          );

          // discover destination
          if (!discoverDestination) {
            discoverdestinations(
              param.tid
            )
          };

          // destination detail
          dispatch(
            destinationDetail(
              param.tid
            )
          );
          break;
        case 2:
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

  // regulations data
  const privacyHead = () => {
    switch (pathnameFiltered[1]) {
      case 'privacy-policy':
        return 'Privacy Policy';;
      case 'terms-of-use':
        return 'Terms Of Use';
      default:
        break;
    }
  };

  useEffect(() => {
    if (taxonomy) {
      setUpdateTaxonomy(new Date().getTime());
    }
  }, [taxonomy])

  return (
    <div className={`rounded-t-2xl bg-[#3842B2] dark:bg-[#171925] opacity-[0.9] w-[100%] ${type === 'travelguidetaxo' && 'h-[84px]'} pt-[.5vw] pb-[2vw] relative md:absolute bottom-0 left-0`} >
      <div className='md:space-y-4'>
        {type !== 'travelguidetaxo' &&
          <div className="ml-4 flex flex-row space-x-3 mx-auto">
            <img src={house} className="mt-2 font-poppins" style={{ fontSize: '2px' }} />
            {
              showTaxonomyDesc &&
              <>
                <span className="text-[12px] text-[#FFFFFF] leading-[20px] font-poppins mt-3"> {">"} </span>
                <span className="text-[12px] text-[#FFFFFF] leading-[20px] mt-3 cursor-pointer font-poppins" onClick={() => handleTaxonomyChange('travelguide', '')}>Destination</span>
              </>
            }
            {taxonomy?.length > 0 &&
              !['company', 'privacypolicy'].includes(type) &&
              taxonomy.map((taxonomy: any, index: number) => (
                <>
                  <span className="text-[12px] text-[#FFFFFF] leading-[20px] font-poppins mt-3">{">"}</span>
                  <span
                    className={`text-[12px] text-[#FFFFFF] leading-[20px] mt-3 ${taxonomy?.name == 'Travel Guide' ? '' : 'cursor-pointer'} font-poppins`}
                    onClick={() => handleTaxonomyChange(taxonomy, index)}
                  >
                    {taxonomy && capitalizeFirstLetter(taxonomy?.name)}
                  </span>
                </>
              ))
            }
            {
              type == 'company' &&
              <>
                <span className="text-[12px] text-[#FFFFFF] leading-[20px] font-poppins mt-3">{">"}</span>
                <span
                  className={`text-[12px] text-[#FFFFFF] leading-[20px] mt-3 ${taxonomy?.name == 'Travel Guide' ? '' : 'cursor-pointer'} font-poppins`}
                  onClick={() => handleTaxonomyChange(taxonomy[0], 0)}
                >
                  {taxonomy && capitalizeFirstLetter(taxonomy[0]?.name)}
                </span>
                {
                  activeSideMenu &&
                  <>
                    <span className="text-[12px] text-[#FFFFFF] leading-[20px] font-poppins mt-3">{">"}</span>
                    <span
                      className={`text-[12px] text-[#FFFFFF] leading-[20px] mt-3 ${taxonomy?.name == 'Travel Guide' ? '' : 'cursor-pointer'} font-poppins`}
                      onClick={() => handleTaxonomyChange(activeSideMenu.data, 0)}
                    >
                      {activeSideMenu && activeSideMenu?.data && capitalizeFirstLetter(activeSideMenu?.data.name)}
                    </span>
                  </>
                }
              </>
            }
            {
              type == 'privacypolicy' &&
              <>
                <span className="text-[12px] text-[#FFFFFF] leading-[20px] font-poppins mt-3">{">"}</span>
                <span
                  className={`text-[12px] text-[#FFFFFF] leading-[20px] mt-3 font-poppins`}
                >
                  { privacyHead() }
                </span>
              </>
            }
          </div>
        }
        {showTaxonomyDesc &&
          <>
            <div className='ml-4 my-3 md:py-4   justify-center items-center pb-0 text-sm md:text-xl font-light text-white' >
              {taxonomy?.length > 0 ? capitalizeFirstLetter(taxonomy[taxonomy.length - 1].name) + " Holidays " : ((staticpagetext && staticpagetext[0].translations.explore_the_world) ?? t(("TAXONOM_HEADER.EXPLORE_THE_WORLD")))}
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default TaxonomyHeader;