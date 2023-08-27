import { LoadingOverlay } from "@mantine/core";
import React, { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Glide from "@glidejs/glide";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";
import { accomodationData, hotelsbyCityData, tripIdeasData, discoverdestinations } from "../../store/actions";
import { cities, cityInformationData, destinationDetail, guideDetailData, taxonomyDir } from "../../store/actions/TravelguideActions";
import Loader from "../Loader/Loader";
import StayCard from "../StayCard/StayCard";
import TripIdeaCard from "../StayCard/TripIdeaCard";
import TripIdeasHeader from "./TripIdeasHeader";
import { useHistory } from 'react-router-dom'
import HotelIdeaCard from "../StayCard/HotelIdeaCard";
import PopularCard from "../StayCard/PopularCard";
import popularparisImg from '../../images/popularparisImg.svg';
import { goToPage } from "../../common/goToPage";
import NextPrev from "../../lib/NextPrev/NextPrev";
import Slider from "react-slick";
import { ReactComponent as Arrow } from '../../images/icons/SliderArrow.svg'
import NotFound from "../NotFound/NotFound";
import BASE_URL_HOME from "../../api/env";
import StringToBoolean from "../../common/StringToBoolean";
import { TRIP_IDEAS_DEFAULT_TABS } from "../../data/TripIdeas";



interface TripIdeasProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: any;
  ideasType?: string;
  OnTripIdea?: any;
  ideaData?: any;  // TODO: create data type : IDEA_DATA_TYPE
  ideasModel?: any;
  taxonomy?: any;
  wrapperClassNames?: string;
  bgColor?: string;
  showMoreButton?: boolean;
  navigationType?: string;
  destCategories?: any;
  onTabChange?: any;
  className?: string;
  margin?: any
  activeTab?: any;
  headingWrapperClassNames?: string;
  subheadingClassNames?: string;
  topSectionClassNames?: string;
  tabStyle?: string;
  containerTripdesigner?: string;
  navItemStyle?: string;
  listStyle?: string;
  subNave?: string;
  id?: boolean;
  componentId?: string;
  displayStyle?: string;
  itemPerRow?: number;
  ButtonAndTextWrapperClassName?: string,
  showMobileNavigationButtons?: boolean,
  isTripAdv?: boolean,
  innerWrapperClassName?: string,
  showHeader?: boolean
}

const TripIdeas: FC<TripIdeasProps> = ({
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
  tabs = TRIP_IDEAS_DEFAULT_TABS,
  ideasType = "",
  ideasModel = "",
  OnTripIdea,
  ideaData,
  wrapperClassNames,
  bgColor = "bg-[#FFF9F9]",
  taxonomy,
  showMoreButton = true,
  navigationType,
  destCategories,
  onTabChange,
  activeTab,
  className = "grid grid-cols-2 gap-3 mt-3 md:mt-5 md:gap-[14px] sm:grid-cols-2  xl:grid-cols-4 2xl:grid-cols-4 min-h-[400px]",
  headingWrapperClassNames = '',
  subheadingClassNames = '',
  topSectionClassNames = '',
  margin = '',
  tabStyle = '',
  containerTripdesigner,
  navItemStyle,
  listStyle,
  subNave,
  id,
  componentId,
  displayStyle = '',
  itemPerRow = 4,
  ButtonAndTextWrapperClassName,
  showMobileNavigationButtons = false,
  isTripAdv,
  innerWrapperClassName,
  showHeader = true
}) => {

  const [tripTo, setTripTo] = useState<any>();
  // const [destData, setDestData] = useState<object[]>(ideaData);
  const [isSearching, setIsSearching] = useState(false);
  const [renderTab, setRenderTabContent] = useState<any>(activeTab);

  const dispatch = useDispatch();

  const citiesData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.cities);
  const city_data = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.citydata);
  const taxonomyData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.taxonomydir);

  const trip_ideas: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.tripideas);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const cityhotels: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.cityhotels);
  const citiesbundles: any = useSelector((state: { BundlesReducer: any; }) => state.BundlesReducer.citiesbundles);
  const accomodations: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.accomodations);
  const discoverDestination = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.discoverdestination);

  const isTravelCompositorDealsPage = StringToBoolean(process.env.REACT_APP_USE_TRAVEL_COMPOSITOR_DEALS_PAGE);
  const taxoLength = Array.from(new Set(taxonomyData)).length;

  let history = useHistory();

  const UNIQUE_CLASS = "_tripideas" + ideasType;

  const browseDestination = (taxo: any, guide: any) => {

    // if(taxo){
    if (guide) taxo.push({ name: 'Travel Guide' });
    for (let i = 0; i < taxo.length; i++) {
      dispatch(
        taxonomyDir(taxo[i])
      );
    };

    // request city data
    if (taxo[2]) {
      dispatch(
        cityInformationData(
          taxo[2].tid
        )
      );
    }

    if (guide) {
      dispatch(
        guideDetailData(guide)
      );
    }

    // }

    let continent = taxo[0].name.replaceAll(' ', '');

    var dynamicUrl = '';

    if (guide) dynamicUrl = window.location.origin + '/' + activeLang + "/travelguide/" + (taxo[0].name && taxo[0].name.toLowerCase()) + "/" + taxo[1].name.toLowerCase() + "/" + taxo[1].tid + "/" + taxo[2].name.toLowerCase() + "/" + taxo[2].tid + '/' + 'travelguide/173' ;
    else dynamicUrl = window.location.origin + '/' + activeLang + "/travelguide/" + (taxo[0].name && taxo[0].name.toLowerCase()) + "/" + taxo[1].name.toLowerCase() + "/" + taxo[1].tid + "/" + taxo[2].name.toLowerCase() + "/" + taxo[2].tid + "/deals";

    // goToPage(dynamicUrl, '');
    window.location.href = dynamicUrl
    // let link = '/travelguide/' + `${continent.toLowerCase()}`;
    // history.push(link);
  };

  const renderCard = (trip: any) => {
    if (ideasType == 'hotels' && trip.main) return <HotelIdeaCard data={trip} />
    else if (ideasType !== 'discoverdestination' && ideasType !== 'hotels') return <TripIdeaCard className={margin} key={trip && trip.id} data={trip} OnTripIdea={(trip: any) => OnTripIdea(trip)} TripTo={(tripTo: any) => setTripTo(tripTo)} taxoLength={taxoLength} />;
    else if (ideasType == 'discoverdestination') return <PopularCard data={trip} browseDestination={(taxo: any, guide: any) => browseDestination(taxo, guide)} />
  };

  let accomodations_unique: any = {};
  let filter_duplicated_accomodations = accomodations.filter((accomodation: { id: string | number; }) => !accomodations_unique[accomodation.id as keyof any] && (accomodations_unique[accomodation.id] = true));

  const CITY_HOTELS_DEALS = city_data && city_data[0].hasOwnProperty('field_popular_hotels') && city_data[0].field_popular_hotels; 
  // const FILTERED_CITY_BASE_DATA = ideasType == 'hotels' && renderTab.name !== 'Paris' && citiesbundles && citiesbundles?.filter((idea: any) => !idea.hasOwnProperty('error') && idea.destination.code == renderTab.name);
  const FILTERED_CITY_BUNDLES = ideasType == 'hotels' && renderTab && citiesbundles && citiesbundles[0].field_cities?.filter((idea: any) => idea && !idea.hasOwnProperty('error') && idea.name == renderTab.name);
  const FILTERED_ACCOMODATIONS = renderTab && filter_duplicated_accomodations?.filter((idea: any) => !idea.hasOwnProperty('error') && FILTERED_CITY_BUNDLES && FILTERED_CITY_BUNDLES[0].popular_hotels.find((_deal_id: any) =>  _deal_id.field_hotel_id == idea.id));
  const FILTERED_CITY_BASE_DATA = ideasModel == "travelguidecitydeals" ?
                                            ideaData && ideaData?.filter((idea: any) => idea && !idea.hasOwnProperty('error') && CITY_HOTELS_DEALS && CITY_HOTELS_DEALS.find((__deal_id: any) => __deal_id.field_hotel_id == idea.id)) :
                                            ideasType == 'hotels' && renderTab.name !== 'Paris' && citiesbundles ? FILTERED_ACCOMODATIONS : (ideaData && ideaData?.filter((idea: any) => idea && !idea.hasOwnProperty('error') && (idea.destination && idea.destination.name == 'Paris')));
  const FILTERED_PACKAGES_IDEAS = ideasType == 'packages' && renderTab !== 'Recommended' && ideaData && ideaData?.filter((idea: any) => !idea.hasOwnProperty('error') && idea.themes.includes(renderTab && renderTab.name));

  // add hotel prices
  if (ideasType == 'hotels' && ideasModel != "travelguidecitydeals" && FILTERED_CITY_BUNDLES && FILTERED_CITY_BUNDLES[0].popular_hotels) {
    for (let city_base_hotel of FILTERED_CITY_BASE_DATA) {
      for (let i = 0; i < FILTERED_CITY_BUNDLES[0].popular_hotels.length; i++) {
        if (city_base_hotel.id == FILTERED_CITY_BUNDLES[0].popular_hotels[i].field_hotel_id) {
          city_base_hotel.basePrice = FILTERED_CITY_BUNDLES[0].popular_hotels[i].price;
        }
      }
    };
  } else if(ideasModel == "travelguidecitydeals" && CITY_HOTELS_DEALS && CITY_HOTELS_DEALS.length > 0){
    for (let city_base_hotel of FILTERED_CITY_BASE_DATA) {
      for (let i = 0; i < CITY_HOTELS_DEALS.length; i++) {
        if (city_base_hotel.id == CITY_HOTELS_DEALS[i].field_hotel_id) {
          city_base_hotel.basePrice = CITY_HOTELS_DEALS[i].price;
        }
      }
    };
  };

  const _CITY_BASE_DATA = () => {
    if (FILTERED_CITY_BASE_DATA && FILTERED_CITY_BASE_DATA.length <= 4) {
      return [
        {
          main: FILTERED_CITY_BASE_DATA ? FILTERED_CITY_BASE_DATA[0] : '',
          subHotels: FILTERED_CITY_BASE_DATA ? FILTERED_CITY_BASE_DATA.slice(1, FILTERED_CITY_BASE_DATA.length) : ''
        }
      ];
    } else if (FILTERED_CITY_BASE_DATA.length > 4 && FILTERED_CITY_BASE_DATA.length < 16) {
      return [
        {
          main: FILTERED_CITY_BASE_DATA ? FILTERED_CITY_BASE_DATA[0] : '',
          subHotels: FILTERED_CITY_BASE_DATA ? FILTERED_CITY_BASE_DATA.slice(1, 5) : ''
        },
        {
          main: FILTERED_CITY_BASE_DATA ? FILTERED_CITY_BASE_DATA[5] : '',
          subHotels: FILTERED_CITY_BASE_DATA ? FILTERED_CITY_BASE_DATA.slice(6, FILTERED_CITY_BASE_DATA.length) : ''
        }
      ];
    }
  };

  const _DISCOVER_POPULAR_CITIES_DATA = useMemo(() => {
    return discoverDestination && discoverDestination?.map(
      (city: any, index: number) => {
        return {
          name: city.name,
          tid: city.tid,
          image: popularparisImg,
          continent_name: city.continent_name,
          continent_tid: city.continent_tid,
          country_name: city.country_name,
          country_tid: city.country_tid,
          button: [
            {
              tid: city.tid,
              citycode: city.name,
              type: 'deals',
              name: 'Travel Deals',
              icon: 'deals'
            },
            {
              tid: city.tid,
              nid: city.tid,
              type: 'guide',
              name: 'Travel Guide',
              icon: 'guide'
            }
          ]
        }
      });
  }, [discoverDestination]);

  // trip ideas data
  const destData = useMemo(() => {
    let packages = [
      {
        pack: 'Package 1'
      },
      {
        pack: 'Package 2'
      },
      {
        pack: 'Package 3'
      },
      {
        pack: 'Package 4'
      }
    ];

    return (
      ideasType !== 'hotels' && taxoLength != 3 && citiesData && citiesData.length > 0 && ideasType !== 'discoverdestination') ?
      citiesData.filter((_: any, i: number) => i < 4) : (taxoLength == 3 && ideasType !== 'deals' && ideasModel == "" ?
        ((trip_ideas && trip_ideas.idea) ?? packages) : (ideasType == 'hotels' && ((renderTab && renderTab.name != 'All') || ideasModel == "travelguidecitydeals") ?
          _CITY_BASE_DATA() : (renderTab && renderTab.name != 'Recommended' && ideasType == 'packages' ?
            FILTERED_PACKAGES_IDEAS : (discoverDestination && ideasType == 'discoverdestination' ?
              (renderTab && renderTab.name !== 'Recommended' ? _DISCOVER_POPULAR_CITIES_DATA : ideaData) : (ideasType == 'deals' ? ideaData : ideaData))))
      )

  }, [tripTo, ideaData, citiesData, trip_ideas, renderTab]);

  useEffect(() => {
    if (tripTo) {

      setIsSearching(true)
      setTimeout(() => {

        setIsSearching(false);

      }, 2000);

      const tripDir = ideaData && ideaData.filter((trip: any) => trip.name == tripTo.name);
      if (taxoLength === 3) {
        dispatch(
          cityInformationData(
            tripTo.tid
          )
        );

        // TODO: get trip ideas by country code
        let country_code = "TR";
        let req = {
          lang: activeLang.toUpperCase(),
          currency: activeCurrency,
          countryCode: 'TR'
        };

        // get trip idea data: packages in a city
        dispatch(
          tripIdeasData(req)
        );

      };

      if (taxoLength == 2) {
        dispatch(
          cities(
            taxonomyData[taxonomyData.length - 1].tid
          )
        );

        dispatch(
          discoverdestinations(
            taxonomyData[taxonomyData.length - 1].tid
          )
        );
      };

      dispatch(
        destinationDetail(
          tripTo.tid
        )
      );

      // callback to outer component
      OnTripIdea(tripTo);

      let currentUrl = window.location.pathname.split("/");

      // add select to dynamic url

      // TODO: use history instead of goToPage;
      // strip in with the current taxo item value
      // if(!currentUrl.includes(tripTo.name.toLowerCase()) && !currentUrl.includes(tripTo.tid)) history(dynamicUrl);
      if (tripTo.name && !currentUrl.includes(tripTo.name && tripTo.name.toLowerCase()) && !currentUrl.includes(tripTo.tid)) {
        let dynamicUrl = window.location.pathname + "/" + tripTo.name.toLowerCase() + "/" + tripTo.tid;
        // goToPage(dynamicUrl, '');
        window.location.href = dynamicUrl
      };
    }
  }, [tripTo, taxoLength, taxonomyData]);

  // hotels city data
  useEffect(() => {
    if (renderTab && ideasType !== 'discoverdestination') {
      // dispatch(
      //   hotelsbyCityData(renderTab.name)
      // );
    };

    if (renderTab && ideasType === 'discoverdestination' && renderTab.tid) {
      dispatch(
        discoverdestinations(
          renderTab.tid
        )
      )
    }
  }, [renderTab]);

  // hotels city data
  useEffect(() => {
    if (ideasType == 'hotels' && ideasModel !== "travelguidecitydeals" && renderTab && renderTab.name !== tabs[0].name && citiesbundles && FILTERED_CITY_BUNDLES && FILTERED_CITY_BUNDLES[0].popular_hotels && FILTERED_CITY_BUNDLES[0]?.popular_hotels.length > 0) {
      for (let hotel of FILTERED_CITY_BUNDLES[0].popular_hotels) {
        dispatch(
          accomodationData(
            hotel.field_hotel_id,
            activeLang.toUpperCase()
          )
        )
      }
    }
  }, [renderTab, activeLang]);

  // setDestData(ideaData);
  let isHomepage = history.location.pathname = '/'


  const slider = useRef<Slider>(null);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    speed: 500,
    autoplay: (destData?.length  > 4),
    initialSlide:0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ],
  };


  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      type: 'carousel',
      perView: 4,
      gap: 24,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
      },
    })
  }, [UNIQUE_CLASS]);
  
  // mount glide
  // useEffect(() => {
  //   if(ideasType == 'packages' && destData && destData.length > 0){
  //     setTimeout(() => {
  //       MY_GLIDEJS && MY_GLIDEJS.mount();
  //     }, 100);
  //   }
  // }, [MY_GLIDEJS, UNIQUE_CLASS, destData, renderTab]);
 
  // if(destData && destData.length === 0 ) {
  //   return <div className="my-0 mx-5 bigMd:mx-[10.1vw] h-[420px]">
  //           <NotFound innerWrapperClassNames="h-[420px]" />
  //     </div>
  // }

  return (
    <div className={`w-full ${bgColor} dark:bg-[#171925] ${wrapperClassNames} z-[-1] ${isHomepage ? 'md:mb-0 dark:md:pb-14 dark:pt-0' : 'md:mb-[165px]'}`}>

      <div className={`${innerWrapperClassName} my-0 mx-5 bigMd:mx-[10.1vw]`}>
        <div className={`${ideasType == 'packages' && UNIQUE_CLASS} flow-root trip-ideas w-full relative sm:pt-8  sm:pb-10 pb-28 md:py-0`}>
          {
            ideasModel !== "travelguidecitydeals" &&
            <TripIdeasHeader
              tabActive={tabs[0]}
              subHeading={subHeading}
              tabs={tabs}
              heading={heading}
              onClickTab={(tab: any) => { setRenderTabContent(tab) }}
              ideasType={ideasType}
              showMoreButton={showMoreButton}
              navigationType={navigationType}
              destCategories={destCategories}
              onTabChange={onTabChange}
              headingWrapperClassNames={headingWrapperClassNames}
              subheadingClassNames={subheadingClassNames}
              topSectionClassNames={topSectionClassNames}
              tabStyle={tabStyle}
              containerTripdesigner={containerTripdesigner}
              navItemStyle={navItemStyle}
              listStyle={listStyle}
              subNave={subNave}
              id={id}
              componentId={componentId}
              ButtonAndTextWrapperClassName={ButtonAndTextWrapperClassName}
              showHeader={showHeader}
            />
          }
          {
            destData && destData.length === 0 &&
               <div className="my-0 h-[420px]">
                  <NotFound 
                    innerWrapperClassNames="h-[420px]" 
                    innerText="No deals found for this criteria"
                  />
              </div>
            
          }
          {
           destData && destData.length > 0 && 
           (

           displayStyle == 'slider' ?
              // <div className={`glide`} > 
              <div
              // className="!bg-orange-400"
               id={destData[0]?.id}
              >
                {
                  displayStyle == 'slider' &&
                  <div 
                   className='hidden xl:inline-flex items-center justify-center w-10 h-10 cursor-pointer  absolute left-0 z-10 -translate-x-[140%] top-[60%] bg-white dark:bg-transparent border border-neutral-200 rounded-full' 
                   onClick={() => slider?.current?.slickPrev()}
                  >
                    <Arrow className="arrow-left w-4 h-4 text-[#101828] dark:text-white" />
                  </div>
                }
                <Slider {...settings}
                  ref={slider}
                  className='max-h-[300px] sm:max-h-[420px] md:min-h-[420px]  overflow-hidden'
                  key={destData[0]?.id}
                >
                  {
                    destData && destData.length > 0 && destData.map((stay: any, i: any) => {
                      return (
                        <>
                          <div
                            key={i}
                            className={`glide__slide`}
                          >
                            { renderCard(stay) }
                          </div>
                        </>
                      )
                    })
                  }
                  <div></div><div></div><div></div>
                </Slider >
                {
                  displayStyle == 'slider' &&
                  <div onClick={() => slider?.current?.slickNext()} className='hidden xl:inline-flex justify-center items-center w-10 h-10  cursor-pointer absolute right-0 top-[60%] z-10 translate-x-[120%] bg-white dark:bg-transparent border border-neutral-200 rounded-full'>
                    <Arrow className='rotate-180 right-arrow w-4 h-4 text-[#101828] dark:text-white' />
                  </div>
                }
                {
                  showMobileNavigationButtons && (

                    <div className={`md:hidden w-full  bottom-0 flex justify-center space-x-2  h-10`}>
                      <div className='flex items-center justify-center w-10 h-10 cursor-pointer left-0 z-10 top-[40%] bg-white dark:bg-transparent border border-neutral-200 rounded-full' onClick={() => slider?.current?.slickPrev()}>
                        <Arrow className="arrow-left w-4 h-4 text-[#101828] dark:text-white" />
                      </div>
                      <div onClick={() => slider?.current?.slickNext()} className='flex justify-center items-center w-10 h-10 cursor-pointer right-0 top-[40%] z-10 bg-white dark:bg-transparent border border-neutral-200 rounded-full'>
                        <Arrow className='rotate-180 right-arrow w-4 h-4 text-[#101828] dark:text-white' />
                      </div>
                    </div>
                  )
                }

              </div>
              :
              <div className={`min-h-[400px] ${className} ${gridClass}`} >
                {
                  <>
                    {<Loader data={isSearching} />}
                    {destData && destData.length > 0 && destData.map((stay: any) => renderCard(stay))}
                  </>
                }
              </div>
           )
          }
        </div>
      </div>
    </div>
  );
};

export default TripIdeas;
