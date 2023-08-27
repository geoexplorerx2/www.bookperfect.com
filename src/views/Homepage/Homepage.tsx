import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import {
  BrowserProperty,
  CheapestFlights,
  Footer,
  HeroHeader,
  Information,
  SectionBackground,
  SEOHelmet,
  TopInternationalDestinations,
  TravelBlog,
  TripIdeas
} from "../../components";
import image from '../../images/homepage_information.png';
import novaplaza from '../../images/novaplaza.png';
import { TaxonomyType } from "../../data/types";

import paris from '../../images/category/Paris.svg';
import dubai from '../../images/category/Dubai.svg';
import amsterdam from '../../images/category/Amsterdam.svg';
import sydney from '../../images/category/Sydney.svg';
import prague from '../../images/category/Parague.svg';
import { Map } from 'tabler-icons-react';
import tabs from '../../components/HeroInputSearch/HomepageHeroSearch';
import SearchItemOfArray from '../../common/ItemOfArray';
import services from '../../api/services';
import { useDispatch } from 'react-redux';
import {
  allDestinationData,
  allExternalCountries,
  arrivalByCodeData,
  departureByCodeData,
  exclusiveOffers,
  transportsData,
  tripIdeasData, faqs, accomodationData, hotelsData, hotelsbyCityData, popularcities, travelnews, cityBundlesById, staticPageText
} from '../../store/actions';
import { useSelector } from 'react-redux';
import { goToPage } from '../../common/goToPage';
import Disclosure from '../../components/Disclosure/Disclosure';
import FAQData from '../../data/FAQ';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import { continent, countries, taxonomyClear } from '../../store/actions/TravelguideActions';
import Loader from '../../components/Loader/Loader';
import TravelNews from '../../components/TravelNews/TravelNews';
import Popular from '../../components/Popular/Popular';
import { PopularData, POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';
import { acommodationIds, DEST_IDEAS_TABS } from '../Hotels/SearchHotels';
import BASE_URL_HOME, { BASE_URL } from '../../api/env';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { HOTELS_BUNDLES_ID } from '../../constants/bundles';
import { GENERAL_HOMEPAGE_PAGE_ID } from '../../constants/pages';
import useWindowSize from '../../hooks/useWindowSize';
import CommingSoon from './CommingSoon';
import withTracker from '../../hooks/withTracker';
import useGeolocation from '../../hooks/useGeolocation';


export const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Paris",
    taxonomy: "category",
    count: 188288,
    thumbnail: paris,
  },
  {
    id: "222",
    href: "/listing-stay",
    name: "Dubai",
    taxonomy: "category",
    count: 188288,
    thumbnail: dubai
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "Amsterdam",
    taxonomy: "category",
    count: 188288,
    thumbnail: amsterdam
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Sydney",
    taxonomy: "category",
    count: 188288,
    thumbnail: sydney
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "Prague",
    taxonomy: "category",
    count: 188288,
    thumbnail: prague
  },
];

export const DEMO_CATS_1: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "New York",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Singapore",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Paris",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "London",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Tokyo",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Maldives",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

export const IDEA_DATA_DEFAULT = [
  {
    id: 1,
    type: 'continent',
    name: 'Europe',
    country: 'Rome',
    cities: ['London', 'Birmingham City', 'Belfast City', 'Edinburgh']
  },
  {
    id: 2,
    type: 'continent',
    name: 'Europe',
    country: 'United Kingdom',
    cities: ['London', 'Birmingham City', 'Belfast City', 'Edinburgh']
  },
  {
    id: 3,
    type: 'continent',
    name: 'Europe',
    country: 'North Of Spain',
    cities: ['London', 'Birmingham City', 'Belfast City', 'Edinburgh']
  },
  {
    id: 4,
    type: 'continent',
    name: 'Europe',
    country: 'Paris',
    cities: ['London', 'Birmingham City', 'Belfast City', 'Edinburgh']
  }
];

const Homepage = (props: any) => {
  const { page = "/", title = "Homepage" } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const trip_ideas: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.tripideas);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const transports: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.transports);
  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);
  const accomodations: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.accomodations);
  const cityhotels: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.cityhotels);
  const citiesbundles: any = useSelector((state: { BundlesReducer: any; }) => state.BundlesReducer.citiesbundles);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const travelnewsdata: any = useSelector((state: { TravelNewsReducer: any; }) => state.TravelNewsReducer.travelnews);
  const hotelsSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.hotelsFormHeight);
  const transfersSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.transfersSearchFormHeight);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const dynamicStyles = useSelector((state: any) => state.DynamicStyles);
  const taxonomyData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.taxonomydir);
  const departure: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.departure);
  const arrival: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.arrival);

  const [calculatedSpace, setCalculatedSpace] = useState(0);

  const [closeLoader, setCloseLoader] = useState<boolean>(true);
  let localStorageTheme = localStorage.getItem('theme');
  const [isDark, setIsDark] = useState<boolean>(localStorageTheme == 'dark');
  const [isMobile, setIsMobile] = useState(false);
  const [flightsReady, setFlightsReady] = useState(0);

  const pathname = window.location.pathname;
  const taxonomyLink = window.location.pathname.split('/');

  // determine if we are on the mobile
  const windowSize = useWindowSize();

  const production = process.env.REACT_APP_PRODUCTION;
  // useEffect(() => {
  //   if(pathname == '/'){
  //     dispatch(
  //       taxonomyClear()
  //     );
  //   }
  // }, [pathname]);

  // useEffect(() => {
  //   if(pathname == '/'){
  //     console.log({pathname});
  //   }
  // }, [pathname]);

  // const geolocation = useGeolocation({}, onGeolocationUpdate);
  // function onGeolocationUpdate(geolocation: any) {
    // handle geolocation update
    // console.log({geolocation});
  // };

  useEffect(() => {
    setIsMobile((prevState) => {
      if (!prevState && windowSize.width < 768) {
        return true
      } else if (prevState && windowSize.width > 768) {
        return false
      } else {
        return prevState
      }
    })
  }, [windowSize]);

  useEffect(() => {
    if (isMobile) return
    setCalculatedSpace(
      hotelsSearchFormHeight > 0 ?
        hotelsSearchFormHeight - 130 : transfersSearchFormHeight > 0 ?
          transfersSearchFormHeight - 180 : 0
    )
  }, [hotelsSearchFormHeight, transfersSearchFormHeight]);

  useEffect(() => {
    setIsDark(localStorageTheme == 'dark')
  }, [localStorageTheme])

  const [currentTab, setCurrentTab] = useState({
    tabName: "Trip Designer",
    tabIcon: <Map size={23} />
  });

  const server = services;

  const IDEA_DATA = (trip_ideas && trip_ideas.idea) ?? IDEA_DATA_DEFAULT;
  // let searchtab = SearchItemOfArray('tabName', 'Flights', tabs);
  // console.log(searchtab);

  const handleTripIdeas = (data: any) => {

    let id = data && data.id;
    let title = data.title.toLowerCase().replaceAll(',', " ");
    let city = title.split(" ");
    let cityFormated = [];

    for (let i = 0; i < city.length; i++) {
      if (city[i] !== '' || city[i] !== '+') cityFormated.push(city[i]);
    };

    let cityName = cityFormated.join("-");
    const ideaUrl = BASE_URL_HOME + "/idea/brochure.xhtml?id=" + id + "&title=" + cityName + "&lang=" + activeLang + "&currency=" + activeCurrency + "&agency=bookperfect"

    // render url
    if (ideaUrl) goToPage(ideaUrl, 'redirect');
  };

  useEffect(() => {
    // tabs events
    switch (page) {
      case '/':
        setCurrentTab({
          tabName: "Trip Designer",
          tabIcon: <Map size={23} />
        });
        break;
      case '/flights':
        let searchtab = SearchItemOfArray('tabName', 'Flights', tabs);
        setCurrentTab({
          tabName: "Flights",
          tabIcon: searchtab.tabIcon
        });
        break;
      case '/hotels':
        setCurrentTab({
          tabName: "Hotels",
          tabIcon: SearchItemOfArray('tabName', 'Hotels', tabs).tabIcon
        });
        break;
      case '/flightshotels':
        setCurrentTab({
          tabName: "Flights + Hotels",
          tabIcon: SearchItemOfArray('tabName', 'Flights + Hotels', tabs).tabIcon
        });
        break;
      case '/activities':
        setCurrentTab({
          tabName: "Activities",
          tabIcon: SearchItemOfArray('tabName', 'Activities', tabs).tabIcon
        });
        break;
      case '/packages':
        setCurrentTab({
          tabName: "Packages",
          tabIcon: SearchItemOfArray('tabName', 'Packages', tabs).tabIcon
        });
        break;
      case '/transfers':
        setCurrentTab({
          tabName: "Transfers",
          tabIcon: SearchItemOfArray('tabName', 'Transfers', tabs).tabIcon
        });
        break;
      case '/routing':
        setCurrentTab({
          tabName: "Routing",
          tabIcon: SearchItemOfArray('tabName', 'Routing', tabs).tabIcon
        });
        break;
      // case '/travelguide':
      //   setCurrentTab({
      //     tabName: "Travelguide", 
      //     tabIcon: SearchItemOfArray('tabName', 'Travelguide', tabs).tabIcon
      //   });
      //   break;
      default:
        break;
    }
  }, [page]);

  // language parser
  useEffect(() => {
    if (page == '/') {
      history.push(activeLang);
    }
  }, [activeLang]);

  // get trip idea data + transports data
  useEffect(() => {
    let req = {
      lang: activeLang.toUpperCase(),
      currency: activeCurrency,
      countryCode: 'TR'
    };

    dispatch(
      continent()
    );

    dispatch(
      tripIdeasData(req)
    );

    // dispatch(
    //   transportsData(
    //     activeCurrency.toLowerCase()
    //   )
    // );

    // dispatch(
    //   allDestinationData()
    // )

    dispatch(
      exclusiveOffers()
    );

    // get frequently asked questions from drupal
    dispatch(
      faqs(DEFAULT_FAQ_ID)
    );

    // get popular cities
    if (!popularcitiesdata) {
      dispatch(
        popularcities()
      );
    };

    // get travel news data
    dispatch(
      travelnews()
    );

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_HOMEPAGE_PAGE_ID,
        activeLang
      )
    );

    // reset limit flight ready limit to default
    setFlightsReady(0);
  }, []);

  // useEffect(() => {
  //   if (
  //     taxonomyLink &&
  //     ![6, 7].includes(taxonomyLink.length) &&
  //     !['travelguide'].includes(taxonomyLink[taxonomyLink.length - 1]) &&
  //     flightsReady != transports.length
  //   ) {
  //     for (let transport of transports) {
  //       let hasDepartureBeenCalled = departure.find((dp: any) => dp.code == transport.departureLocationCode);
  //       let hasArrivalBeenCalled = arrival.find((arr: any) => arr.code == transport.arrivalLocationCode);

  //       if (!hasDepartureBeenCalled) {
  //         dispatch(
  //           departureByCodeData(
  //             transport.departureLocationCode,
  //             () => setFlightsReady(ready => ready + 1)
  //           )
  //         );
  //       }

  //       if (!hasArrivalBeenCalled) {
  //         dispatch(
  //           arrivalByCodeData(
  //             transport.arrivalLocationCode
  //           )
  //         );
  //       }

  //       // wait untill flights is completely loaded
  //       // setFlightsReady(loading => loading + 1);
  //     }
  //   }
  // }, [transports]);


  useEffect(() => {
    dispatch(
      allExternalCountries()
    )
  }, []);

  // get hotels data
  useEffect(() => {
    dispatch(
      hotelsData()
    )

    // for (const id of acommodationIds) {
    //   dispatch(
    //     accomodationData(id)
    //   )
    // };

    // dispatch(
    //   hotelsbyCityData(DEST_IDEAS_TABS[0].name)
    // );

    dispatch(
      exclusiveOffers()
    );

    dispatch(
      countries(
        POPULAR_COUNTRIES_CONTINENT_ID
      )
    );
  }, []);

  useEffect(() => {
    dispatch(
      cityBundlesById(
        HOTELS_BUNDLES_ID,
        activeCurrency
      )
    );

    dispatch(
      transportsData(
        activeCurrency.toLowerCase()
      )
    );
  }, [activeCurrency]);

  // hotels city data
  useEffect(() => {
    if (citiesbundles && citiesbundles.length > 0) {
      for (let hotel of citiesbundles[0].field_cities[0].popular_hotels) {
        dispatch(
          accomodationData(hotel.field_hotel_id, activeLang.toUpperCase())
        )
      }

    }
  }, [citiesbundles]);

  let accomodations_unique: any = {};
  let filter_duplicated_accomodations = accomodations.filter((accomodation: { id: string | number; }) => !accomodations_unique[accomodation.id as keyof any] && (accomodations_unique[accomodation.id] = true));

  const DYNAMIC_HOTELS_DATA = filter_duplicated_accomodations;
  const DYNAMIC_HOTES_TITLE = citiesbundles && citiesbundles[0].title;
  const DYNAMIC_HOTES_DESCRIPTION = citiesbundles && citiesbundles[0].body;

  const TRAVEL_NEWS_DATA_FILTER = travelnewsdata && travelnewsdata.filter((_: any, i: number) => i < 6);

  const HOTELS_IDEAS_TABS = useMemo(() => {
    return citiesbundles && citiesbundles[0].field_cities.map((city: any, index: number) => {
      return {
        name: city.name,
        code: DEST_IDEAS_TABS.find((tab: any) => tab.name == city.name).code,
        id: DEST_IDEAS_TABS.find((tab: any) => tab.name == city.name).id
      }
    })
  }, [citiesbundles]);


  return (
    <div>
      {
        production == 'true' ?
          <CommingSoon /> :
          <>
            {/* <Loader
              data={
                Array.isArray(staticpagetext) &&
                  staticpagetext.length > 0 &&
                  popularcitiesdata.length > 0 &&
                  DYNAMIC_HOTELS_DATA.length > 0 &&
                  travelnewsdata.length > 0 &&
                  transports.length > 0 &&
                  // (
                    // flightsReady > 0
                    // [flightsReady, flightsReady / 2].includes(transports.length)  || 
                    // transports.length > flightsReady
                    // flightsReady / 2 > transports.length ||
                    // flightsReady / 4 > transports.length 
                  // ) &&
                  IDEA_DATA.length > 0 ? false : true}
            /> */}

            {/* homepage helmet */}
            <SEOHelmet
              title={page === "/" ? "Book Perfect, Travel Perfect" : "Homepage" || title}
              description={"With Book Perfect, your every trip will be organized beyond perfection. Whether you’re traveling for business or leisure, Book Perfect will take care of all your travel needs, including flights, hotels, transportation, and local activities."}
              type={''}
              url={''}
            />

            {/* <Helmet>
              <meta charSet="utf-8" />
              <title> {page === "/" ? "Bookperfect" : "Homepage"} || {title} </title>
              <meta name="description" content="With Book Perfect, your every trip will be organized beyond perfection. Whether you’re traveling for business or leisure, Book Perfect will take care of all your travel needs, including flights, hotels, transportation, and local activities." />
              <meta property="og:url" content="Homepage" />
            </Helmet> */}

            {/* header section  */}
            {/* <HeroHead className="pt-10 lg:pt-20 ml-20 pb-16" /> */}
            <div className={`relative mb-9 xl:mb-0 lg:mb-0`}>
              <HeroHeader
                currentTab={currentTab}
                statictext={staticpagetext && staticpagetext[0].translations}
              />

              <div className='pb-20 md:pb-[7vh] overflow-hidden' style={{ paddingTop: `${calculatedSpace >= 0 ? calculatedSpace : 0}px` }}>
                <ExclusiveOffers
                  data={exclusiveoffers}
                  statictext={staticpagetext && staticpagetext[0].translations}
                  displayType=''
                  showMobileNavigationButtons
                />
              </div>

              {/* trips ideas section */}
              {/* <div className="relative py-16"> */}
              {/* <SectionBackground className="bg-gradient-to-r from-sky-500 to-indigo-500 dark:bg-black dark:bg-opacity-20 " /> */}
              <TripIdeas
                ideaData={IDEA_DATA}
                tabs={[{ name: 'Recommended', code: '' }, { name: "Beach Holidays" }, { name: "Honeymoon", code: '' }, { name: 'Stopover ', code: '' }, { name: "Nova Plaza Hotels", code: '' }, { name: "Health & Medical", code: '' }]}
                ideasType='packages'
                OnTripIdea={(data: any) => handleTripIdeas(data)}
                wrapperClassNames="py-[4vh]"
                headingWrapperClassNames='sm:!text-lg md:!text-xl xl:!text-[32px]'
                subheadingClassNames='sm:text-md md:text-lg'
                heading={(staticpagetext && staticpagetext[0].translations.trips_ideas) ?? 'Our Trips Ideas'}
                subHeading={(staticpagetext && staticpagetext[0].translations.trip_ideas_description) ?? 'Here you can see our trip ideas'}
                componentId='tripIdeas'
                listStyle='w-full justify-between'
                className='mt-3 md:mt-5'
                margin={'mb-16'}
                displayStyle='slider'
                showMobileNavigationButtons
              />

              <div className='mb-[5vh] text-xl hidden'>
                <TravelNews data={TRAVEL_NEWS_DATA_FILTER} />
              </div>
              {/* </div> */}

              {/* poppular hotel deals */}
              <div className='mt-[4vh]'>
                {
                  popularcitiesdata &&
                  <Popular
                    data={popularcitiesdata}
                    heading={(staticpagetext && staticpagetext[0].translations.popular_destinations) ?? "Popular Destinations"}
                    subHeading={(staticpagetext && staticpagetext[0].translations.popular_destinations_description) ?? "There are many variations of passages of Lorem Ipsum available, but the "}
                    cardsContainer='grid-cols-2 grid gap-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-4 pb-14 md:pb-0'
                  />
                }
              </div>

              {/* information section */}
              {/* <div className='mt-[4vh] overflow-hidden'>
                <Information
                  heading=''
                  subHeading=''
                  classStyle="mt-0 md:!pt-0"
                  image={image}
                  statictext={staticpagetext && staticpagetext[0].translations}
                />
              </div> */}

              {/* top international destination section */}
              <div className="relative py-9 sm:pt-[5vh] bg-[#FFF9F9] dark:bg-[#171925] dark:bg-opacity-90 dark:py-0">
                {/* for bacground image of this section bg-[url(')] : bg-gradient-to-r from-sky-500 to-indigo-500 */}
                <SectionBackground
                  className="opacity-25 dark:opacity-0"
                  isWidth="max-w-full"
                  isRounded=""
                />

                {/* cheapest flights section */}
                <CheapestFlights
                  heading={(staticpagetext && staticpagetext[0].translations.cheapest_flights_and_travel_deals) ?? "Our Cheapest Flights anf Travel Deals"}
                  subHeading={(staticpagetext && staticpagetext[0].translations.cheapest_flights_description) ?? "Find  incredible value with our travel deals"}
                  style={{ marginTop: '57px', marginLeft: '220px', width: '1000px' }}
                  data={transports}
                  classname="md:pt-[15px]"
                  useCompactStyles
                />

                {/* <TopInternationalDestinations
            categories = { DEMO_CATS }
            categoryCardType="card1"
            itemPerRow = { 5 }
            isHeadingCenter = { true }
            heading="Top International Destinations"
            headingClassNames='!text-white !text-[32px]'
            subHeading="Here you can see our featured trip ideas"
            sliderStyle="style2"
            uniqueClassName="homepage_top_international_destination_section"
          /> */}
              </div>

              {/* cheapest flights section */}
              {/* <CheapestFlights 
           heading="Our Cheapest Flights anf Travel Deals"
           style = {{marginTop: '57px', marginLeft: '220px', width: '1000px'}}
           data = { transports }
           classname ="md:pt-[5vh]"
           useCompactStyles
        />
        /> */}

              {/* browser property section */}
              {/* <div className="relative py-8 md:pt-[5vh] md:pb-[3vh]">
          <SectionBackground className="bg-[#FFF9F9] dark:bg-black dark:bg-opacity-20 " />
          <BrowserProperty 
            categories = { DEMO_CATS_1 }
            heading="Browse by property type"
            subHeading="lorem ipsum dolor sit amet, consectetur"
            uniqueClassName="homepage_browser_property"
          />
        </div> */}

              {/* hotels trip ideas */}
              <div className='pt-[6vh] dark:pt-0 pb-[2vh] dark:pb-[0] lg:px-0'>
                {
                  HOTELS_IDEAS_TABS &&
                  DYNAMIC_HOTELS_DATA &&
                  <TripIdeas
                    ideaData={DYNAMIC_HOTELS_DATA && DYNAMIC_HOTELS_DATA}
                    OnTripIdea={(data: any) => console.log(data)}
                    wrapperClassNames=""
                    ideasType='hotels'
                    bgColor=""
                    tabs={HOTELS_IDEAS_TABS}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-5 md:mt-5 min-h-[400px]"
                    activeTab={HOTELS_IDEAS_TABS[0]}
                    tabStyle='w-full'
                    containerTripdesigner='w-full'
                    navItemStyle=''
                    // subNave='text-[14px] sm:text-[14px] py-2 px-[18px] sm:px-[30px] sm:py-[15px] '
                    listStyle='w-full overflow-x-scroll item-center justify-between  px-1 md:mt-0 hiddenScrollbar '
                    id={true}
                    heading={DYNAMIC_HOTES_TITLE ?? 'Our Trips Ideas'}
                    subHeading={DYNAMIC_HOTES_DESCRIPTION ?? 'Here you can see our trip ideas'}
                  />
                }
                {/* <div className='mt-8 flex-col space-y-8 cursor-pointer md:mx-[10.1vw]'>
            <img onClick={() => goToPage('https://www.novaplazahotels.com/en/', 'redirect')} src={novaplaza} className="w-[100%]" />
          </div> */}
              </div>
              {/* travel blog section section */}
              <div className=" lg:pt-[4vh] lg:pb-[5vh]">
                {/* <TravelBlog
                  heading={(staticpagetext && staticpagetext[0].translations.travel_blog) ?? 'Travel Blog'}
                  subHeading={(staticpagetext && staticpagetext[0].translations.travel_blog_description) ?? 'Find incredible value with our travel deals'}
                  customStyle={{ marginTop: '57px', marginLeft: '220px', width: '1000px' }}
                  customStyles="pt-[1.5vh]"
                /> */}
              </div>

              {/* site footer */}
              {/* <div className="relative ">
          <SectionBackground className="bg-[#0E123D] dark:bg-black dark:bg-opacity-20 " />
          <Footer />
        </div> */}
            </div>
          </>}
    </div>
  )
};

Homepage.whyDidYouRender = true;
export default withTracker(Homepage);