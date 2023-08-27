import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import BASE_URL_HOME, { BASE_URL } from '../../api/env';
import { sortArraytBy } from '../../common/arrayMove';
import { goToPage } from '../../common/goToPage';
import Heading from '../../lib/Heading/Heading';
import { scrollToTargetAction } from '../../store/actions';
import { cityInformationData, guideDetailData, taxonomyDir } from '../../store/actions/TravelguideActions';
import PopularCard from '../StayCard/PopularCard';
import Tabs from '../Tabs/Tabs';
import PopularTabs from './PopularTabs';
import StringToBoolean from '../../common/StringToBoolean';

interface PopularProps {
    className?: string;
    isHeadingCenter?: boolean;
    subHeading?: string;
    headingWrapperClassNames?: string;
    subheadingClassNames?: string;
    headingClassNames?: string;
    heading?: string;
    data?: any;
    tabs?: any;
    type?: string;
    cardsContainer?: string;
};

const Popular: FC<PopularProps> = ({data, className, isHeadingCenter, subHeading, headingWrapperClassNames = '', subheadingClassNames = '', headingClassNames, heading, tabs, type = '', cardsContainer = 'grid-cols-2 grid gap-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-4 pb-14 md:pb-0'}) => {
  const countriesData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.countries);
  const [renderTab, setRenderTab] = useState<any>({
    name: 'Recommended'
  });

  const dispatch = useDispatch();
  let history = useHistory();
  
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const isTravelCompositorDealsPage = StringToBoolean(process.env.REACT_APP_USE_TRAVEL_COMPOSITOR_DEALS_PAGE);
  

  if(!tabs) tabs = data && data[1].field_city_destinations;
  const browseDestination = (taxo: any, guide: any) => {
    // if(taxo){
      dispatch(
        scrollToTargetAction(
          null
        )
      );
      
      if(guide) taxo.push({name: 'Travel Guide'});
      for(let i = 0; i < taxo.length; i++) {
        dispatch(
          taxonomyDir(taxo[i])
        );
      };

      // request city data
      if(taxo[2]){
        dispatch(
          cityInformationData(
            taxo[2].tid
          )
        );
      }

      if(guide){
        dispatch(
          guideDetailData(guide)
        ); 
      }

    // }

    let continent = taxo[0].name.replaceAll(' ', '');
    var dynamicUrl = '';
    let rootUrl = window.location.origin 
    if(guide) dynamicUrl = '/' + activeLang + "/travelguide/" + taxo[0].name.toLowerCase() + "/" + taxo[1].name.toLowerCase() + "/" + taxo[1].tid + "/" + taxo[2].name.toLowerCase() +  "/" + taxo[2].tid + '/travelguide/173';
    else dynamicUrl = '/' + activeLang + "/travelguide/" + taxo[0].name.toLowerCase() + "/" + taxo[1].name.toLowerCase() + "/" + taxo[1].tid + "/" + taxo[2].name.toLowerCase() +  "/" + taxo[2].tid + "/deals";

    let renderUrl = rootUrl + dynamicUrl;
    // goToPage(renderUrl, '');

    // let link = '/travelguide/' + `${continent.toLowerCase()}`;
    history.push(dynamicUrl);
  };

  const handleAllDestinations = () => {
    history.push(`${activeLang}/travelguide`);
  };
  
  const FILTER_DISCOVER_TABS = tabs && tabs.filter((_: any, i: number) =>  i < 7);
  const DISCOVER_POPULAR_TABS = useMemo(() => {
    return  FILTER_DISCOVER_TABS && FILTER_DISCOVER_TABS?.map(
      (country: any) => {
        return {
          name: country.field_title ?? country.name,
          tid: country.tid
        }
      }
    )
  }, [data]);
  
  // if(DISCOVER_POPULAR_TABS && DISCOVER_POPULAR_TABS[0] && DISCOVER_POPULAR_TABS[0].name !== 'Recommended') DISCOVER_POPULAR_TABS.splice(0, 0, { name: 'Recommended', tid: '' });

  if(DISCOVER_POPULAR_TABS && DISCOVER_POPULAR_TABS[0] && DISCOVER_POPULAR_TABS[0].name !== 'Recommended' && type !== '') DISCOVER_POPULAR_TABS.splice(0, 0, { name: 'Recommended', tid: '' });

  const POPULAR_CITIES_DATA = useMemo(() => {
    return data && data[1].field_city_destinations?.map(
      (city: any, index: number) => {
        return  city.field_cities.map((dest: any, index: number) => {
          return {
            name: dest.name,
            tid: dest.tid,
            image: dest.field_cover_image && BASE_URL + dest.field_cover_image.url,
            continent_name: dest.continent_name,
            continent_tid: dest.continent_tid,
            country_name: dest.country_name,
            country_tid: dest.country_tid,
            button: [
              {
                tid: dest.tid,
                citycode: dest.name,
                type: 'deals',
                name: 'Travel Deals',
                icon: 'deals'
              },
              {
                tid: dest.tid,
                nid: dest.tid, //TODO: get this nid from drupal
                type: 'guide',
                name: 'Travel Guide',
                icon: 'guide'
              }
            ]
          }  
        })
      });
  }, [data]);

  const DISCOVER_POPULAR_TABS_FILTERED = DISCOVER_POPULAR_TABS && sortArraytBy(DISCOVER_POPULAR_TABS, ['Recommended'], 'name');
  const POPULAR_CITIES_DATA_FILTERED =  renderTab && renderTab.name !== 'Recommended' && type == '' ? 
                                                         POPULAR_CITIES_DATA && POPULAR_CITIES_DATA.filter((country: any, index: number) =>  country[0].country_name == renderTab.name) : 
                                                                              ( renderTab && renderTab.name == 'Recommended' && type == '' ? POPULAR_CITIES_DATA && [POPULAR_CITIES_DATA[6]] : POPULAR_CITIES_DATA );

  const renderCard = (city: any, index: any) => {
      return <PopularCard 
                key={index} 
                data = { city } 
                browseDestination = {(taxo: any, guide: any) => browseDestination(taxo, guide) } 
              />
  };

  return (
    <div className={`mx-5 bigMd:mx-[10vw] popular relative z-10 ${className}`}>
        <Heading
          isCenter={isHeadingCenter}
          desc={subHeading}
          headingWrapperClassNames={`${headingWrapperClassNames} md:!text-[32px] font-normal`}
          subheadingClassNames={`${subheadingClassNames} text-[#15173F] !py-0`}
          showMoreButton={true}
          handleMoreDeals={handleAllDestinations}
          ideasType="discoverdestination"
        >
          <span className={`${headingClassNames} text-[#15173F] dark:text-white !text-base md:!text-[32px]`}>{heading}</span>
        </Heading>
        <div className='hi'><hr className={`rounded-[16px] h-[1px] border-[rgba(102,102,102,0.2)] mt-4`} /></div>

        {
          DISCOVER_POPULAR_TABS_FILTERED &&
          <div className='w-full pb-5'>
            {/* <PopularTabs tabs = { DISCOVER_POPULAR_TABS_FILTERED } onSelectedTab = { (tab: any) =>  { setRenderTab(tab)}} dividerClassNames="!mt-0" /> */}
            <Tabs 
              tabs={DISCOVER_POPULAR_TABS_FILTERED} 
              onTabclick = { (tab: any) =>  { setRenderTab(tab)}} 
            />
          </div>
        }

        <div className={`${cardsContainer}`}>
            { POPULAR_CITIES_DATA_FILTERED && type == '' ?
                           POPULAR_CITIES_DATA_FILTERED[0]?.map((data: any, index: number) => renderCard(data, index) ) :
                           data?.map((data: any, index: number) => renderCard(data, index) )
            }
        </div>
    </div>
  )
};

export default Popular;