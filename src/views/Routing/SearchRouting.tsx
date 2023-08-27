import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { BrowserProperty, Information, SectionBackground, TopInternationalDestinations, TravelBlog, TripIdeas } from '../../components';
import HeroHead from '../../components/HeroHeader/HeroHead';
import TopSearchResult from '../../components/SearchTop/TopSearchResult';
import { countries, exclusiveOffers, faqs, hotelsData, popularcities, staticPageText, transportsData, tripIdeasData } from '../../store/actions';
import { DEMO_CATS, DEMO_CATS_1, IDEA_DATA_DEFAULT } from '../Homepage/Homepage';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import RoutingBanner from '../../components/routingBanner/routingBanner';
import Popular from '../../components/Popular/Popular';
import { PopularData, POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';

import LightImage from '../../images/airline.png';
import DarkImage from '../../images/Departing.png';
import Disclosure from '../../components/Disclosure/Disclosure';
import FAQData from '../../data/FAQ';
import TransfersSearchForm from '../../components/HeroInputSearch/TransfersSearchForm';
import RoutingSearchForm from '../../components/HeroInputSearch/RoutingSearchForm';

import { PopularHotelsDealsData } from '../../data/ProductDealsData';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import CarBooking from '../../components/carBookingRouting/carBooking';
import BestBrands from '../../components/bestBrands/bestBrands';
import Loader from '../../components/Loader/Loader';
import CarRental from '../../components/CarRental/CarRental';
import { BASE_URL } from '../../api/env';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { Productdeals } from '../../data/productdeals';
import { GENERAL_ROUTING_PAGE_ID } from '../../constants/pages';


export const CAR_RENTAL_TABS: any = [
  {
    name: 'Recommended',
    id: ''
  },
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
  }
];


const SearchRouting = () => {

  const dispatch = useDispatch();

  const hotels: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.hotels);
  const transports: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.transports);
  const accomodations: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.accomodations);
  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);
  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  
  let ThemeMode = useSelector((state: any) => state.LightMode);
  const [image, setImage] = useState<string>(ThemeMode.mode === 'dark' ? DarkImage : LightImage)

  const deals = Productdeals('Routing Deals', 'routing');

  // get hotels data + transports
  useEffect(() => {

    dispatch(
      hotelsData()
    );

    dispatch(
      exclusiveOffers()
    );


    dispatch(
      countries(
        POPULAR_COUNTRIES_CONTINENT_ID
      )
    );

    // get popular cities
    dispatch(
      popularcities()
    );

    dispatch(
      faqs('160594')
    );
    
    // get static text data
    dispatch(
      staticPageText(
        GENERAL_ROUTING_PAGE_ID, 
        activeLang
      )
    );

  }, []);

  useEffect(() => {
    dispatch(
      transportsData(
        activeCurrency.toLowerCase()
      )
    );
  }, [activeCurrency]);

  // useEffect(() => {
  //   if(!faqsdata){
  //     dispatch(
  //       faqs('160594')
  //     );
  //   }
  // }, [faqsdata]);

  let accomodations_unique: any = {};
  let filter_duplicated_accomodations = accomodations.filter((accomodation: { id: string | number; }) => !accomodations_unique[accomodation.id as keyof any] && (accomodations_unique[accomodation.id] = true));

  const HOTELS_DATA = hotels.concat(filter_duplicated_accomodations);

  const STATIC_HOTELS_DATA = hotels;
  const DYNAMIC_HOTELS_DATA = filter_duplicated_accomodations;
  // const HOTELS_DATA = hotels;

  // const CAR_RENTAL_TABS = DEST_IDEAS_TABS && DEST_IDEAS_TABS.splice(0, 0, { name: 'Recommended'} );

  return (
    <div>
      <Loader data={ transports.length > 0 && exclusiveoffers.length > 0 && PopularData.length > 0 && PopularHotelsDealsData.length > 0 ? false : true }/>
     
      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || Routing </title>
      </Helmet>

      <HeroHead
        className='hero-head-search-routing'
        searchCard='routing'
        headText={ (staticpagetext && staticpagetext[0].translations.routing) ?? "Packages" }
        subText={(staticpagetext && staticpagetext[0].translations.routing_description) ?? 'Incredible value deals and inspiring travel articles, for you to plan, discover and dream.'}
     />

      <RoutingSearchForm
        roundedTopLeft="rounded-tl-xl"
        customStyle={{ width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px' }}
        onlyCarWrapperClassNames={"md:hidden mb-5"}
        withMyCarWrapperClassNames={"md:hidden mb-5"}
        flightAndCarWrapperClassNames={"md:hidden mb-5"}
      />

      <div className=''>
        <ExclusiveOffers data = { exclusiveoffers } statictext = { staticpagetext && staticpagetext[0].translations } />
      </div>

      {/* <div className='mt-[5vh]'>
        <CarBooking />
      </div> */}

      <div className='mt-[5vh]'>
        <CarRental 
          data = { transports } 
          tabs = { CAR_RENTAL_TABS } 
          activeTab = { CAR_RENTAL_TABS[0] }
          statictext = { staticpagetext && staticpagetext[0].translations } 
        />
      </div>

      {/* membership banner */}
      <div className='mt-[10vh]'>
        <RoutingBanner statictext = { staticpagetext && staticpagetext[0].translations } />
      </div>

      {/* poppular hotel deals */}
      <div className='mt-[4vh]'>
        {
          popularcitiesdata &&
          <Popular
            data={popularcitiesdata}
            heading={( staticpagetext && staticpagetext[0].translations.popular_destinations ) ?? "Popular Destinations"}
            subHeading={( staticpagetext && staticpagetext[0].translations.popular_destinations_description) ??  "There are many variations of passages of Lorem Ipsum available, but the "}
          />
        }
      </div>

      {/* information */}
      <div>
        <BestBrands />
      </div>

      {/* FAQ Section */}
      {
        faqsdata &&
        <div className="relative  py-8 md:py-[4vh]">
          <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
          <Disclosure items = { faqsdata && faqsdata[0].field_detail_cards } heading = { (staticpagetext && staticpagetext[0].translations.frequently_asked_questions) ??  "Frequently Asked Questions"} />
        </div>
      }

      <div className="">
        <TravelBlog
          heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' } 
          customStyles="pt-[1.5vh]"
        />
      </div>

     {/* all packages deals */}
      <div className='pb-[5vh]'>
        <ProductDeals
          data={deals}
          heading={ ( staticpagetext && staticpagetext[0].translations.product_deals ) ?? 'All Routing Deals' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.product_deals_description ) ?? 'Find incredible value with our travel deals' }
        />
      </div>

    </div>
  )
}

export default SearchRouting;