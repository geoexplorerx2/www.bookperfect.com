import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { BrowserProperty, SectionBackground, TopInternationalDestinations, TravelBlog, TripIdeas } from '../../components';
import HeroHead from '../../components/HeroHeader/HeroHead';
import TopSearchResult from '../../components/SearchTop/TopSearchResult';
import { SamplePopularDestinations } from '../../data/ActivitiesPopularDestinatoins';
import { accomodationData, countries, exclusiveOffers, faqs, hotelsData, landingPageInfo, popularcities, staticPageText, transportsData, tripIdeasData } from '../../store/actions';
import { DEMO_CATS, DEMO_CATS_1, IDEA_DATA_DEFAULT } from '../Homepage/Homepage';
import { acommodationIds } from '../Hotels/SearchHotels';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import MEMBERSHIP from '../../components/membership/membership';
import { goToPage } from '../../common/goToPage';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import { PopularData, POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';
import Popular from '../../components/Popular/Popular';
import Disclosure from '../../components/Disclosure/Disclosure';
import FAQData from '../../data/FAQ';
import { PopularFlightHotelsDealsData, PopularHotelsDealsData } from '../../data/ProductDealsData';
import FlightsHotelsSearchForm from '../../components/HeroInputSearch/FlightsHotelsSearchForm';
import Loader from '../../components/Loader/Loader';
import pageInfo3 from '../../images/pageInfo3.svg';
import PageInfoBanner from '../../components/PageInfoBanner/PageInfoBanner';
import BASE_URL_HOME, { BASE_URL, MAILCHIMP_API_URL } from '../../api/env';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { FLIGHT_HOTEL_PAGE_ID, GENERAL_FLIGHT_HOTEL_PAGE_ID } from '../../constants/pages';
import { Productdeals } from '../../data/productdeals';
import CategorizedTripIdeas from '../../components/CategorizedTripIdeas/CategorizedTripIdeas';
import { formatTurkishCharacters } from '../../common/formatTurkishCharacters';


interface SeletedCategoryProps{
  code?: string;
  name?: string;
};

const SearchFlightsHotels = () => {

  const [selectedCategory, setSelectedCategory] = useState<SeletedCategoryProps>();
  const [activeTripIdeasCategory, setActiveTripIdeasCategory] = useState<string>('From');
  const dispatch = useDispatch();

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  const hotels: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.hotels);
  const transports: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.transports);
  const accomodations: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.accomodations);

  const trip_ideas: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.tripideas);
  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);

  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const landingpageinfo = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.landingpageinfo);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);

  const FILTER_FLIGHT_HOTELS_TRIP_IDEAS_BY_LANG_TAG = ['Flight + Hotel', 'Uçuş + otel', 'Vol + Hôtel', 'Flug + Hotel'];
  const IDEA_DATA = trip_ideas && trip_ideas.idea.filter((idea: any) => (idea.counters.hotels >= 1 && idea.themes.some((theme: any) => FILTER_FLIGHT_HOTELS_TRIP_IDEAS_BY_LANG_TAG.includes(theme))));

  const deals = Productdeals('Flights + Hotels Deals', 'flightshotels');

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

    dispatch(
      hotelsData()
    );

    // for (const id of acommodationIds) {
    //   dispatch(
    //     accomodationData(id, activeLang.toUpperCase())
    //   )
    // }

    dispatch(
      exclusiveOffers()
    );

    // get popular cities
    dispatch(
      popularcities()
    );

    // get popular countries of continent
    dispatch(
      countries(
        POPULAR_COUNTRIES_CONTINENT_ID
      )
    );

    // page infos
    dispatch(
      landingPageInfo(
        FLIGHT_HOTEL_PAGE_ID
      )
    );

    dispatch(
      faqs('160590')
    );

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_FLIGHT_HOTEL_PAGE_ID,
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
  //       faqs('160590')
  //     );
  //   }
  // }, [faqsdata]);

  useEffect(() => {
    setSelectedCategory({code: '', name: 'All'});
  }, [activeTripIdeasCategory]);


  let accomodations_unique: any = {};
  let filter_duplicated_accomodations = accomodations.filter((accomodation: { id: string | number; }) => !accomodations_unique[accomodation.id as keyof any] && (accomodations_unique[accomodation.id] = true));

  const HOTELS_DATA = hotels.concat(filter_duplicated_accomodations);

  const STATIC_HOTELS_DATA = hotels;
  const DYNAMIC_HOTELS_DATA = filter_duplicated_accomodations;

  // const _IDEA_DATA = selectedCategory && selectedCategory != 'All' ? IDEA_DATA?.filter((idea: any) => idea.themes.includes(selectedCategory)) : IDEA_DATA;
  const _IDEA_DATA = () => {
    switch (activeTripIdeasCategory.toLowerCase()) {
      case 'from':
        let from_ideas_data = selectedCategory && selectedCategory.name != 'All' ? IDEA_DATA?.filter((idea: any) => selectedCategory?.name == formatTurkishCharacters(idea.title.split('to')[0].replaceAll(' ', '').toString())) : IDEA_DATA;
        return from_ideas_data;
      case 'to':
        return selectedCategory && selectedCategory.name != 'All' ? IDEA_DATA?.filter((idea: any) => idea.destinations[0]?.code == selectedCategory.code ) : IDEA_DATA;
      default:
        break;
    }
  };
  
  // handle trip ideas
  const handleTripIdeas = (data: any) => {

    let id = data && data.id;
    let title = data.title.toLowerCase().replaceAll(',', " ");
    let city = title.split(" ");
    let cityFormated = [];

    for (let i = 0; i < city.length; i++) {
      if (city[i] !== '' || city[i] !== '+') cityFormated.push(city[i]);
    };

    let cityName = cityFormated.join("-");
    const ideaUrl = BASE_URL_HOME + "/idea/brochure.xhtml?id=" + id + "&title=" + cityName + "&lang=" + activeLang + "&displayCurrency=" + activeCurrency + "&agency=bookperfect"

    // render url
    if (ideaUrl) goToPage(ideaUrl, 'redirect');
  };

  // trip ideas by category: from and to serialized
  let categories = {
    From: {
      id: 1,
      Component: <TripIdeas
        ideaData={_IDEA_DATA()}
        OnTripIdea={(data: any) => handleTripIdeas(data)}
        wrapperClassNames=""
        innerWrapperClassName='!mx-0 bigMd:!mx-0'
        bgColor=""
        onTabChange={(tab: any) => { setSelectedCategory(tab) }}
        destCategories={[{ name: 'All', code: '' }, { name: "New York", code: 'NYC' }, { name: "Tokyo", code: 'NRT-1' }, { name: "Rome", code: 'ROE' }, { name: "Paris", code: 'PAR' }, { name: "London", code: 'LON' }]}
        heading={(staticpagetext && staticpagetext[0].translations.trips_ideas) ?? 'Our Trips Ideas'}
        subHeading={(staticpagetext && staticpagetext[0].translations.trips_ideas_description)}
        subheadingClassNames='!pb-0'
        displayStyle='slider'
        showMobileNavigationButtons
        showHeader={false}
      />,
    },
    To: {
      id: 2,
      Component: <TripIdeas
        ideaData={_IDEA_DATA()}
        OnTripIdea={(data: any) => handleTripIdeas(data)}
        wrapperClassNames=""
        innerWrapperClassName='!mx-0 bigMd:!mx-0'
        bgColor=""
        onTabChange={(tab: any) => { setSelectedCategory(tab) }}
        destCategories={[{ name: 'All', code: '' }, { name: "New York", code: 'NYC' }, { name: "Tokyo", code: 'NRT-1' }, { name: "Rome", code: 'ROE' }, { name: "Paris", code: 'PAR' }, { name: "London", code: 'LON' }]}
        heading={(staticpagetext && staticpagetext[0].translations.trips_ideas) + 'hello' ?? 'Our Trips Ideas'}
        subHeading={(staticpagetext && staticpagetext[0].translations.trips_ideas_description)}
        subheadingClassNames='!pb-0'
        displayStyle='slider'
        showMobileNavigationButtons
        showHeader={false}

      />

    },
  };

  return (
    <div>
      {/* <Loader data={
        Array.isArray(staticpagetext) && 
        staticpagetext.length > 0 && 
        // staticpagetext[0].translations.flights_hotels &&
        // staticpagetext[0].translations.flights_and_hotels_description &&
        landingpageinfo.length > 0 && 
        exclusiveoffers.length > 0 && 
        IDEA_DATA.length > 0 && 
        PopularData.length > 0 && 
        PopularFlightHotelsDealsData.length > 0 ? false : true } /> */}

      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || Flight & Hotels </title>
      </Helmet>

      <HeroHead
        className='hero-head-search-flightshotels z-10'
        searchCard='flightshotels'
        headText={(staticpagetext && staticpagetext[0].translations.flights_hotels) ?? "Flights & Hotels"}
        subText={(staticpagetext && staticpagetext[0].translations.flights_and_hotels_description) ?? 'Incredible value deals and inspiring travel articles, for you to plan, discover and dream.'}
      />

      <FlightsHotelsSearchForm
        radioHeight="md:py-2"
        roundedTopLeft="rounded-tl-xl"
        // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}}
        wrapperClassName={"md:hidden"}
      />

      {/* exclusive offers */}
      <div className='mb-8 lg:mb-0'>
        <ExclusiveOffers data={exclusiveoffers} statictext={staticpagetext && staticpagetext[0].translations} showMobileNavigationButtons />
      </div>

      {/* trip ideas */}
      {/* <div className='pt-[6vh] pb-[1vh]'>
        <TripIdeas
          ideaData={_IDEA_DATA}
          OnTripIdea={(data: any) => handleTripIdeas(data)}
          wrapperClassNames=""
          bgColor=""
          onTabChange={(tab: any) => { setSelectedCategory(tab.name) }}
          destCategories={[{ name: 'All', code: '' }, { name: "New York", code: 'NYC' }, { name: "Tokyo", code: 'NRT-1' }, { name: "Rome", code: 'ROE' }, { name: "Paris", code: 'PAR' }, { name: "London", code: 'LON' }]}
          heading={(staticpagetext && staticpagetext[0].translations.trips_ideas) ?? 'Our Trips Ideas'}
          subHeading={(staticpagetext && staticpagetext[0].translations.trips_ideas_description)}
          subheadingClassNames='!pb-0'
          displayStyle='slider'
          showMobileNavigationButtons
        />
      </div> */}
      <div className='pt-[6vh] pb-[1vh]'>
        <CategorizedTripIdeas
          categories={categories}
          onActiveTripIdeasCategoryTab={(activeTripIdeasCategory: any) => setActiveTripIdeasCategory(activeTripIdeasCategory)}
          headingProps={{
            onTabChange: (tab: any) => { setSelectedCategory(tab.name) },
            heading: (staticpagetext && staticpagetext[0].translations.trips_ideas) ?? 'Our Trips Ideas',
            subHeading: (staticpagetext && staticpagetext[0].translations.trips_ideas_description),
            subheadingClassNames: '!pb-0',
            showHeader: true,
            showMoreButton: true,
            destCategories: [],
            tabActive: {},
            tabs: [],
            onClickTab: () => { }
          }}
        />
      </div>

      {
        landingpageinfo &&
        <div className='w-[100%] translate-y-[35px]'>
          <PageInfoBanner data={landingpageinfo && landingpageinfo[0]} />
        </div>
      }

      {/* membership banner */}
      <div className='mt-20'>
        <MailchimpSubscribe
          url={MAILCHIMP_API_URL}
          render={({ subscribe, status, message }: any) => (
            <MEMBERSHIP
              status={status}
              message={message}
              onValidated={(formData: any) => subscribe(formData)}
              statictext={staticpagetext && staticpagetext[0].translations}
            />
          )}
        />
      </div>

      {/* poppular hotel deals */}
      <div className='pt-[4vh]'>
        {
          popularcitiesdata &&
          <Popular
            data={popularcitiesdata}
            heading={(staticpagetext && staticpagetext[0].translations.popular_destinations) ?? "Popular Destinations"}
            subHeading={(staticpagetext && staticpagetext[0].translations.popular_destinations_description) ?? "There are many variations of passages of Lorem Ipsum available, but the "}
          />
        }
      </div>

      {/* FAQ Section */}
      {
        faqsdata &&
        <div className="relative py-8 md:py-[5vh] pb-[4vh] mt-5">
          <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
          <Disclosure items={faqsdata && faqsdata[0].field_detail_cards} heading={(staticpagetext && staticpagetext[0].translations.frequently_asked_questions) ?? "Frequently Asked Questions"} />
        </div>
      }

      <div className="py-[3.5vh]">
        {/* <TravelBlog 
          heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' } 
          customStyles ="pt-[1.5vh]"
       /> */}
      </div>

      {/* all flight deals */}
      <div className='pt-[2vh] pb-[4vh]'>
        <ProductDeals
          data={deals}
          heading={(staticpagetext && staticpagetext[0].translations.product_deals) ?? 'All Flights + Hotels Deals'}
          subHeading={(staticpagetext && staticpagetext[0].translations.product_deals_description) ?? 'Find incredible value with our travel deals'}
        />
      </div>

    </div>
  )
}



export default SearchFlightsHotels;