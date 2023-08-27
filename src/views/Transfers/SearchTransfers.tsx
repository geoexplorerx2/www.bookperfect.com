import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { BrowserProperty, SectionBackground, TopInternationalDestinations, TravelBlog, TripIdeas } from '../../components';
import HeroHead from '../../components/HeroHeader/HeroHead';
import TopSearchResult from '../../components/SearchTop/TopSearchResult';
import { SamplePopularDestinations } from '../../data/ActivitiesPopularDestinatoins';
import { countries, exclusiveOffers, faqs, hotelsData, popularcities, staticPageText, transfersData, transportsData, tripIdeasData } from '../../store/actions';
import { DEMO_CATS, DEMO_CATS_1 } from '../Homepage/Homepage';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import TransferBanner from '../../components/TransferBanner/transferbanner';
import MEMBERSHIP from '../../components/membership/membership';
import CarBooking from '../../components/CarRental/CarRental';
import Popular from '../../components/Popular/Popular';
import { PopularData, POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';
import Disclosure from '../../components/Disclosure/Disclosure';
import FAQData from '../../data/FAQ';
import TransfersSearchForm from '../../components/HeroInputSearch/TransfersSearchForm';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import { PopularHotelsDealsData } from '../../data/ProductDealsData';
import CarRental from '../../components/CarRental/CarRental';
import Loader from '../../components/Loader/Loader';
import BASE_URL_HOME, { BASE_URL } from '../../api/env';
import PopularAirports from '../../components/PopularAirport/PopularAirport';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { Productdeals } from '../../data/productdeals';
import { GENERAL_TRANSFERS_PAGE_ID } from '../../constants/pages';
import { goToPage } from '../../common/goToPage';

interface SeletedCategoryProps{
  code?: string;
  name?: string;
};

const SearchTransfers = () => {

  const [selectedCategory, setSelectedCategory] = useState<SeletedCategoryProps>();
  
  const dispatch = useDispatch();
  const hotels: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.hotels);
  const transports: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.transports);
  const accomodations: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.accomodations);
  const transfers: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.transfers);

  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);
  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const trip_ideas: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.tripideas);

  const deals = Productdeals('Transfers Deals', 'transfers');

  const IDEA_DATA = trip_ideas && trip_ideas?.idea;

  // get hotels data
  useEffect(() => {
    let req = {
      lang: activeLang.toUpperCase(),
      currency: activeCurrency,
      countryCode: 'TR'
    };

    dispatch(
      tripIdeasData(
        req
      )
    );
    
    // dispatch(
    //   hotelsData()
    // );

   if(!transports){
      dispatch(
        transportsData(
          activeCurrency.toLowerCase()
        )
      );
   };

    if(!transfers){
      dispatch(
        transfersData()
      );
    };

    // get popular cities
    if(!popularcitiesdata){
      dispatch(
        popularcities()
      );
    };

    dispatch(
      countries(
        POPULAR_COUNTRIES_CONTINENT_ID
      )
    );

    dispatch(
      faqs('160592')
    );

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_TRANSFERS_PAGE_ID, 
        activeLang
      )
    );

  }, []);

  // useEffect(() => {
  //   if(!faqsdata){
  //     dispatch(
  //       faqs(DEFAULT_FAQ_ID)
  //     );
  //   }
  // }, [faqsdata]);

  useEffect(() => {
    dispatch(
      exclusiveOffers()
    )
  }, []);

  useEffect(() => {
    dispatch(
      transportsData(
        activeCurrency.toLowerCase()
      )
    );
  }, [activeCurrency]);

  // const _IDEA_DATA = IDEA_DATA && IDEA_DATA?.filter((idea: any) => idea.counters.transfers >= 1);

  const _ACTIVITIES_IDEA_DATA = IDEA_DATA && IDEA_DATA?.filter((idea: any) => idea.counters.transfers >= 1);
  const _IDEA_DATA = selectedCategory && selectedCategory.name != 'All' ? _ACTIVITIES_IDEA_DATA?.filter((idea: any) => idea.destinations[0]?.code == selectedCategory.code ) : _ACTIVITIES_IDEA_DATA;

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

  
  let accomodations_unique: any = {};
  let filter_duplicated_accomodations = accomodations.filter((accomodation: { id: string | number; }) => !accomodations_unique[accomodation.id as keyof any] && (accomodations_unique[accomodation.id] = true));

  const STATIC_HOTELS_DATA = hotels;
  const DYNAMIC_HOTELS_DATA = filter_duplicated_accomodations;
  const HOTELS_DATA = hotels;
  const TRANSFERS_DATA = transfers;

  return (
    <div>
      {/* <Loader data={
        Array.isArray(staticpagetext) && 
        staticpagetext.length > 0 && 
        faqsdata && faqsdata.length > 0 &&
        // staticpagetext[0].translations.Transfers &&
        // staticpagetext[0].translations.transfers_description && 
        exclusiveoffers && exclusiveoffers.length > 0 && 
        TRANSFERS_DATA && TRANSFERS_DATA.length > 0 && 
        transports && transports.length > 0 && 
        PopularHotelsDealsData && PopularHotelsDealsData.length > 0 ? false : true} /> */}
      
      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || Transfers </title>
      </Helmet>

      <HeroHead
        className='hero-head-search-transfers'
        searchCard='transfers'
        headText={ (staticpagetext && staticpagetext[0].translations.Transfers) ?? "Transfers" }
        subText={(staticpagetext && staticpagetext[0].translations.transfers_description) }
      />

      <TransfersSearchForm
        search = 'transfers_search'
        roundedTopLeft = "rounded-tl-xl"
        // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}} 
        oneWayWrapperClassNames="md:hidden mb-5 md:mb-0"
        roundTripWrapperClassNames="md:hidden mb-5 md:mb-0"
      />

      {/* exclusive offers */}
      <div className=''>
        <ExclusiveOffers 
          data = { exclusiveoffers } 
          statictext = { staticpagetext && staticpagetext[0].translations } 
        />
      </div>

      {
        _IDEA_DATA &&
        <div id='' className='mt-[6vh]'>
          <TripIdeas
            ideaData={_IDEA_DATA}
            OnTripIdea={(data: any) => handleTripIdeas(data)}
            wrapperClassNames=""
            bgColor="bg-[#FFFFFF]"
            showMoreButton={false}
            // navigationType="noNavigation"
            destCategories={[]}
            onTabChange={(tab: any) => { setSelectedCategory(tab) }}
            heading={(staticpagetext && staticpagetext[0].translations.top_activities) ?? 'Popular transfer deals'}
            subHeading={(staticpagetext && staticpagetext[0].translations.top_activities_description)}
            displayStyle='slider'
          />
        </div>
      }
      
      {/* popular airport */}
      {/* {
        TRANSFERS_DATA &&
          <div className='mt-[5vh]'>
            <PopularAirports 
              data = { TRANSFERS_DATA  } 
              statictext = { staticpagetext && staticpagetext[0].translations } 
            />
          </div> 
      } */}
      
      <div className='mt-8'>
        <TransferBanner 
          statictext = { staticpagetext && staticpagetext[0].translations } 
        />
      </div>

     {
      transports &&
      <div className='md:-mt-[50px]'>
        <CarRental 
          data = { transports } 
          statictext = { staticpagetext && staticpagetext[0].translations } 
        />
      </div>
     }

      {/* poppular destinations */}
      {
        popularcitiesdata &&
        <div className='md:-mt-[40px] dark:md:mt-[0px]'>
            <Popular
              data={popularcitiesdata}
              heading={( staticpagetext && staticpagetext[0].translations.popular_destinations ) ?? "Popular Destinations"}
              subHeading={( staticpagetext && staticpagetext[0].translations.popular_destinations_description) ??  "There are many variations of passages of Lorem Ipsum available, but the "}
            />
        </div>
      }

      {/* FAQ Section */}
      {
        faqsdata &&
        <div className="relative py-8 md:py-[5vh] mt-5">
          <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
          <Disclosure 
            items={ faqsdata && faqsdata[0].field_detail_cards } 
            heading = { (staticpagetext && staticpagetext[0].translations.frequently_asked_questions) ??  "Frequently Asked Questions"} 
          />
        </div>
      }

      <div className="py-[4vh]">
        {/* <TravelBlog 
          heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' } 
          customStyles ="pt-[1.5vh]"
       /> */}
      </div>
      
      {/* all packages deals */}
      <div className='pb-[5vh]'>
        <ProductDeals
          data={deals}
          heading={ ( staticpagetext && staticpagetext[0].translations.product_deals ) ?? 'All Transfers Deals' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.product_deals_description ) ?? 'Find incredible value with our travel deals' }
        />
      </div>
    </div>
  )
}

export default SearchTransfers;