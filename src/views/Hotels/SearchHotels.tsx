import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import {CheapestFlights, Information, BrowserProperty, SectionBackground, TopInternationalDestinations, TravelBlog, TripIdeas } from '../../components';
import HeroHead from '../../components/HeroHeader/HeroHead';
import HotelsSearchForm from '../../components/HeroInputSearch/HotelsSearchForm';
import Popular from '../../components/Popular/Popular';
import TopSearchResult from '../../components/SearchTop/TopSearchResult';
import { PopularData, POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';
import { accomodationData, cityBundlesById, countries, exclusiveOffers, hotelsbyCityData, hotelsData, landingPageInfo, popularcities, staticPageText } from '../../store/actions';
import { DEMO_CATS_1 } from '../Homepage/Homepage';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import MEMBERSHIP from '../../components/membership/membership';
import Disclosure from '../../components/Disclosure/Disclosure';
import FAQData from '../../data/FAQ';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import { PopularDealsData, PopularHotelsDealsData } from '../../data/ProductDealsData';
import Loader from '../../components/Loader/Loader';
import { faqs } from '../../store/actions';
import PageInfoBanner from '../../components/PageInfoBanner/PageInfoBanner';
import pageInfo2 from '../../images/pageinfo2.svg';
import { BASE_URL, MAILCHIMP_API_URL } from '../../api/env';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { GENERAL_HOTEL_PAGE_ID, HOTEL_PAGE_ID } from '../../constants/pages';
import { Productdeals } from '../../data/productdeals';
import { HOTELS_BUNDLES_ID } from '../../constants/bundles';
import { goToPage } from '../../common/goToPage';
import novaplaza from '../../images/novaplaza.png';

// accomodations ids
export const acommodationIds = [1587, 142585];
export const DEST_IDEAS_TABS: any = [
  {
    name: 'Paris',
    code: 'PAR',
    id: 'Destination::PAR'
  },
  {
    name: 'New York',
    code: 'NYC',
    id: 'Destination::NYC'
  },
  {
    name: 'Tokyo',
    code: 'NRT-1',
    id: 'Destination::NRT-1'
  },
  {
    name: 'London',
    code: 'LON',
    id: 'Destination::LON'
  },
  {
    name: 'Rome',
    code: 'ROE',
    id: 'Destination::ROE'
  },
  {
    name: 'Istanbul',
    code: 'IST',
    id: 'Destination::IST'
  },
  {
    name: 'Madrid',
    code: 'MAD',
    id: 'Destination::MAD'
  },
  { 
    name: 'Barcelona',
    code: 'BCN',
    id: 'Destination::BCN'
  },
  {
    name: 'Lisbon',
    code: 'LIS',
    id: 'Destination::LIS'
  }
];

const SearchHotels = () => {
  const dispatch = useDispatch();
  const hotels: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.hotels);
  const accomodations: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.accomodations);
  const cityhotels: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.cityhotels);
  const citiesbundles: any = useSelector((state: { BundlesReducer: any; }) => state.BundlesReducer.citiesbundles);

  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);
  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const countriesData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.countries);
  const landingpageinfo = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.landingpageinfo);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  const deals = Productdeals('Hotels Deals', 'hotels');

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

    if(!countriesData){
      dispatch(
        countries(
          POPULAR_COUNTRIES_CONTINENT_ID
        )
      );
    };

    // get popular cities
    if(!popularcitiesdata){
      dispatch(
        popularcities()
      );
    };

    // page infos
    dispatch(
      landingPageInfo(
        HOTEL_PAGE_ID
      )
    );

    dispatch(
      faqs('160579')
    );

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_HOTEL_PAGE_ID, 
        activeLang
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
  }, [activeCurrency])
  
  // useEffect(() => {
  //   if(!faqsdata){
  //     dispatch(
  //       faqs('160579')
  //     );
  //   }
  // }, [faqsdata]);

  // hotels city data
  useEffect(() => {
    if(citiesbundles && citiesbundles.length > 0){
      for(let hotel of citiesbundles[0].field_cities[0].popular_hotels){
        dispatch(
          accomodationData(
            hotel.field_hotel_id, 
            activeLang.toUpperCase()
          )
        )
      }
    } 
  }, [citiesbundles, activeLang]);

  let accomodations_unique: any = {};
  let filter_duplicated_accomodations = accomodations.filter((accomodation: { id: string | number; }) => !accomodations_unique[accomodation.id as keyof any] && (accomodations_unique[accomodation.id] = true));

  const HOTELS_DATA = hotels.concat(filter_duplicated_accomodations);

  const STATIC_HOTELS_DATA = hotels;
  const DYNAMIC_HOTELS_DATA = filter_duplicated_accomodations;
  const DYNAMIC_HOTES_TITLE = citiesbundles && citiesbundles[0].title;
  const DYNAMIC_HOTES_DESCRIPTION = citiesbundles && citiesbundles[0].body;

  const HOTELS_IDEAS_TABS = useMemo(() => {
    return citiesbundles && citiesbundles[0].field_cities.map((city: any, index: number) => {
      return {
        name: city.name,
        code: DEST_IDEAS_TABS.find((tab: any) => tab.name == city.name).code,
        id: DEST_IDEAS_TABS.find((tab: any) => tab.name == city.name).id
      }
    })
  }, [citiesbundles]);

  // console.log({HOTELS_IDEAS_TABS});
  
  // const HOTELS_DATA = hotels;
  return (
    <div>
      {/* <Loader data = { 
        Array.isArray(staticpagetext) && 
        staticpagetext.length > 0 && 
        // staticpagetext[0].translations.hotels &&
        // staticpagetext[0].translations.hotels_description &&
        popularcitiesdata.length > 0 && 
        exclusiveoffers.length > 0 && 
        DYNAMIC_HOTELS_DATA.length > 0 ? false : true }/>
       */}
      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || Hotels </title>
      </Helmet>

      <HeroHead 
        className='hero-head-search-hotels'
        searchCard = "hotels"
        headText={ (staticpagetext && staticpagetext[0].translations.hotels) ?? "Hotels" }
        subText={( staticpagetext && staticpagetext[0].translations.hotels_description ) } 
      />

      <HotelsSearchForm 
        radioHeight = "py-4" 
        showClassRadio = { true }  
        roundedTopLeft = "" 
        // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}}
        wrapperClassName={"block md:hidden mb-4"}
      />

      {/* Exclusive offers */}
      <div className='mb-8 lg:mb-0'>
        <ExclusiveOffers data = { exclusiveoffers } statictext = { staticpagetext && staticpagetext[0].translations } showMobileNavigationButtons/>
      </div>

      {/* hotels trip ideas */}
      <div className='pt-[6vh] pb-[2vh] lg:px-0'>
      { HOTELS_IDEAS_TABS &&
        DYNAMIC_HOTELS_DATA &&
        <TripIdeas 
          ideaData = { DYNAMIC_HOTELS_DATA && DYNAMIC_HOTELS_DATA } 
          OnTripIdea = {(data: any) => console.log(data) } 
          wrapperClassNames=""
          ideasType = 'hotels'
          bgColor=""
          tabs = { HOTELS_IDEAS_TABS }
          className = "grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-5 md:mt-5"
          tabStyle = 'w-full'
          containerTripdesigner='w-full'
          navItemStyle=''
          listStyle = 'w-[80%] overflow-x-scroll item-center md:mt-0 hiddenScrollbar'
          id={true}
          activeTab = { HOTELS_IDEAS_TABS[0] }
          heading = { DYNAMIC_HOTES_TITLE ?? 'Our Trips Ideas' }
          subHeading = { DYNAMIC_HOTES_DESCRIPTION ?? 'Here you can see our trip ideas' }
        />
      }
        {/* <div className='mt-8 flex-col space-y-8 cursor-pointer md:mx-[10.1vw]'>
          <img onClick={() => goToPage('https://www.novaplazahotels.com/en/', 'redirect')} src={novaplaza} className="w-[100%]" />
        </div> */}
      </div>
      
      {
        landingpageinfo &&
        <div className='w-[100%] translate-y-[35px]'>
          <PageInfoBanner data={landingpageinfo && landingpageinfo[0]}/>
        </div>
      }

      {/* Membership banner */}
      <div className="mt-[80px]">
        <MailchimpSubscribe
            url={ MAILCHIMP_API_URL }
            render={({ subscribe, status, message }: any) => (
                <MEMBERSHIP
                    status={status}
                    message={message}
                    onValidated={(formData: any) => subscribe(formData)}
                    statictext = { staticpagetext && staticpagetext[0].translations }
                />
            )}
        />
      </div>

    {/* poppular destinations */}
    <div className='pt-[4vh]'>
      {
        popularcitiesdata &&
        <Popular
          data = { popularcitiesdata }
          heading={( staticpagetext && staticpagetext[0].translations.popular_destinations ) ?? "Popular Destinations"}
          subHeading={( staticpagetext && staticpagetext[0].translations.popular_destinations_description) ??  "There are many variations of passages of Lorem Ipsum available, but the "}
        />
      }
    </div>

    {/* FAQ Section */}
    {
      faqsdata &&
      <div className="relative py-8 md:py-[5vh] md:pb-9 mt-5">
        <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
        <Disclosure items={ faqsdata && faqsdata[0].field_detail_cards } heading = { (staticpagetext && staticpagetext[0].translations.frequently_asked_questions) ??  "Frequently Asked Questions"} />
      </div>
    }

      {/* {
        DYNAMIC_HOTELS_DATA && 
        <TopSearchResult 
          showMoreButton = { true }
          searched = "hotel"
          listing = { 8 }
          cols = { 4 }
          customStyles = "mt-16"
          data = { DYNAMIC_HOTELS_DATA && DYNAMIC_HOTELS_DATA }
          style = {{marginTop: '180px', marginLeft: '220px', width: '1000px'}} 
        />
      }
      
      browser property section
      <div className="relative py-16 mt-16">
          <SectionBackground className="bg-[#FFF9F9] dark:bg-black dark:bg-opacity-20 " />
          <BrowserProperty 
              categories = { DEMO_CATS_1 }
              heading="Browse by property type"
              subHeading="lorem ipsum dolor sit amet, consectetur"
              uniqueClassName="homepage_browser_property"
          />
      </div> */}

    {/* {
      STATIC_HOTELS_DATA && 
      <TopSearchResult 
        heading = "Popular Hotels Deals"
        subHeading = "There are many variations of passagers of lorem ipsum available"
        showMoreButton = { true }
        searched = "hotel"
        listing = { 8 }
        cols = { 4 }
        customStyles = "mt-24"
        data = { STATIC_HOTELS_DATA && STATIC_HOTELS_DATA }
        style = {{marginTop: '180px', marginLeft: '220px', width: '1000px'}} 
      />
    } */}

      <div className="pt-[4vh]">
        {/* <TravelBlog 
          heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' } 
          customStyles ="pt-[1.5vh]"
       /> */}
      </div>

      {/* all flight deals */}
      <div className='py-[4vh]'>
        <ProductDeals
          data={deals}
          heading={ ( staticpagetext && staticpagetext[0].translations.product_deals ) ?? 'All Hotels Deals' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.product_deals_description ) ?? 'Find incredible value with our travel deals' }
        />
      </div>

    </div>
  )
}

export default SearchHotels;