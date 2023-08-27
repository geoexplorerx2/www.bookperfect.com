import React, { FC, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import HeroHead from '../../components/HeroHeader/HeroHead';
import { CheapestFlights, Information, SectionBackground, TopInternationalDestinations, TravelBlog } from '../../components';
import LightImage from '../../images/airline.png';
import DarkImage from '../../images/Departing.png';
import { useSelector, useDispatch } from 'react-redux';
import FlightSearchForm from '../../components/HeroInputSearch/FlightSearchForm';
import { arrivalByCodeData, countries, departureByCodeData, exclusiveOffers, faqs, landingPageInfo, popularcities, staticPageText, transportsData } from '../../store/actions';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import MEMBERSHIP from '../../components/membership/membership';
import Popular from '../../components/Popular/Popular';
import { PopularData, POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import { PopularDealsData } from '../../data/ProductDealsData';
import Disclosure from '../../components/Disclosure/Disclosure';
import Loader from '../../components/Loader/Loader';
import PageInfoBanner from '../../components/PageInfoBanner/PageInfoBanner';

// import pageInfo from '../../images/pageInfo.svg';
import { BASE_URL, MAILCHIMP_API_URL } from '../../api/env';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { FLIGHT_PAGE_ID, GENERAL_FLIGHT_PAGE_ID } from '../../constants/pages';
import { Productdeals } from '../../data/productdeals';

interface SearchFlightsProps {

};

const SearchFlights: FC<SearchFlightsProps> = () => {
  const transports: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.transports);
  const departure: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.departure);
  const arrival: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.arrival);
  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);
  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const countriesData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.countries);
  const landingpageinfo = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.landingpageinfo);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  let ThemeMode = useSelector((state: any) => state.LightMode);
  const [image, setImage] = useState<string>(ThemeMode.mode === 'dark' ? DarkImage : LightImage);
  const [flightsReady, setFlightsReady] = useState(0);

  const taxonomyLink = window.location.pathname.split('/');

  // let image = ThemeMode.mode == 'dark' ? DarkImage : LightImage
  const dispatch = useDispatch();

  const deals = Productdeals('Flights Deals', 'flights');

  // get transports data
  useEffect(() => {
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
    dispatch(
      popularcities()
    );

    // page infos
    dispatch(
      landingPageInfo(
        FLIGHT_PAGE_ID
      )
    );

    dispatch(
      faqs('160589')
    );

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_FLIGHT_PAGE_ID, 
        activeLang
      )
    );

    // reset limit flight ready limit to default
    // setFlightsReady(0);
  }, []);

  // useEffect(() => {
  //   if(!faqsdata){
  //     dispatch(
  //       faqs('160589')
  //     );
  //   }
  // }, [faqsdata]);

  // useEffect(() => {
  //   if(
  //     taxonomyLink &&
  //     ![6, 7].includes(taxonomyLink.length) && 
  //     !['travelguide'].includes(taxonomyLink[taxonomyLink.length - 1]) &&
  //     flightsReady != transports.length
  //     )
  //   for (let transport of transports) {
  //     let hasDepartureBeenCalled = departure.find((dp: any) => dp.code == transport.departureLocationCode);
  //     let hasArrivalBeenCalled = arrival.find((arr: any) => arr.code == transport.arrivalLocationCode);

  //     if(!hasDepartureBeenCalled){
  //       dispatch(
  //         departureByCodeData(
  //           transport.departureLocationCode,
  //           () => setFlightsReady(ready => ready + 1)
  //         )
  //       );
  //     }

  //     if(!hasArrivalBeenCalled){
  //       dispatch(
  //         arrivalByCodeData(
  //           transport.arrivalLocationCode
  //         )
  //       );
  //     }

  //     // wait untill flights is completely loaded
  //     // setFlightsReady(loading => loading + 1);
  //   }
  // }, [transports])

  useEffect(() => {
    setImage(
      ThemeMode.mode == 'dark' ? 
                DarkImage : LightImage
    )
  }, [ThemeMode.mode]);

  useEffect(() => {
    dispatch(
      transportsData(
        activeCurrency.toLowerCase()
      )
    );
  }, [activeCurrency]);

  return (
    <div className=''>
      {/* <Loader data = { 
        Array.isArray(staticpagetext) && 
        staticpagetext.length > 0 &&
        // staticpagetext[0].translations.cheap_flights_and_more &&
        // staticpagetext[0].translations.cheap_flights_and_more_description &&
        // ([flightsReady, flightsReady / 2].includes(transports.length) || flightsReady > 0  ) &&
        popularcitiesdata.length > 0 && 
        exclusiveoffers.length > 0 && 
        transports.length > 0 && 
        PopularData.length > 0 && 
        PopularDealsData.length > 0 ? false : true } />
       */}
      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || Flights & More </title>
      </Helmet>
      
      <HeroHead
        className='hero-head-search-flights'
        searchCard='flights'
        headText={ (staticpagetext && staticpagetext[0].translations.cheap_flights_and_more) ?? "Flights & More" }
        subText={staticpagetext && staticpagetext[0].translations.cheap_flights_and_more_description}
      />

      <FlightSearchForm
        radioHeight="py-7"
        showClassGuest={false}
        roundedTopLeft="md:rounded-tl-xl"
        customStyle={{ width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px' }}
        wrapperClassName={'md:hidden'}
      />

       {/* Exclusive offers */}
       <div className="mb-20 lg:mb-0">
        <ExclusiveOffers data = { exclusiveoffers } statictext = { staticpagetext && staticpagetext[0].translations } showMobileNavigationButtons/>
      </div>

      <div className="relative mt-12">
        {/* for bacground image of this section bg-[url(')] : bg-gradient-to-r from-sky-500 to-indigo-500 */}
        <SectionBackground
          className="bg-[#F4F8FF] dark:bg-black dark:bg-opacity-20"
          isWidth="xl:max-w-full"
          isRounded=""
        />
        {
          transports &&
          <CheapestFlights
            heading={(staticpagetext && staticpagetext[0].translations.cheapest_flights_and_travel_deals) ??  "Our Cheapest Flights anf Travel Deals"}
            subHeading={(staticpagetext && staticpagetext[0].translations.cheapest_flights_description) ??  "Find incredible value with our travel deals"}
            style={{
              marginTop: '180px',
              marginLeft: '195px',
              width: '1050px',
            }}
            data={transports}
            classname='pt-[5vh]'
            useCompactStyles
          />
        }
      </div>

      {
        landingpageinfo &&
        <div className='w-[100%] my-[80px]'>
          <PageInfoBanner data = { landingpageinfo && landingpageinfo[0] } />
        </div>
      }

      <div className=''>
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

      {/* poppular hotel deals */}
      <div className='py-[4vh]'>
        {
          popularcitiesdata &&
          <Popular
            data={popularcitiesdata}
            heading={( staticpagetext && staticpagetext[0].translations.popular_destinations ) ?? "Popular Destinations"}
            subHeading={( staticpagetext && staticpagetext[0].translations.popular_destinations_description) ??  "There are many variations of passages of Lorem Ipsum available, but the "}
          />
        }
      </div>

      {/* Membership banner */}
      {/* popular international airlines */}
      {/* <Information
        heading={( staticpagetext && staticpagetext[0].translations.popular_international_airlines ) ?? "Popular Destinations"}
        subHeading={( staticpagetext && staticpagetext[0].translations.popular_international_airlines_description) ??  "lorem ipsum dolor sit amet, consectetur adipiscing "}
        classStyle="mt-0"
        image={image}
      /> */}

      {/* FAQ Section */}
      { faqsdata && 
        <div className="relative py-8 md:pt-[5vh] md:pb-10">
          <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
          <Disclosure items={ faqsdata && faqsdata[0].field_detail_cards } heading = { (staticpagetext && staticpagetext[0].translations.frequently_asked_questions) ??  "Frequently Asked Questions"} />
        </div>
      }

      {/* top international destination section */}
      {/* <div className="relative mt-16">
      // for bacground image of this section bg-[url(')] : bg-gradient-to-r from-sky-500 to-indigo-500
      <SectionBackground
        className="bg-blue-50 dark:bg-black dark:bg-opacity-20"
        isWidth="xl:max-w-full"
        isRounded=""
      />

      <TopInternationalDestinations
        categories={DEMO_CATS}
        categoryCardType="card4"
        itemPerRow={4}
        heading="Popular Destinations"
        headingWrapperClassNames='md:!mt-0'
        subHeading="Haven't decided ? Get inspired by these popular destinations."
        isHeadingCenter={false}
        uniqueClassName="homepage_popular_destination_section"
      />
    </div> */}

      <div className="pt-[4vh]">
        {/* <TravelBlog
          heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' }
          // customStyle={{ marginTop: '57px', marginLeft: '195px', width: '1050px' }}
          customStyles="pt-[1.5vh]"
        /> */}
      </div>

      {/* all flight deals */}
      <div className='py-[4vh]'>
        <ProductDeals
          data={deals}
          heading={ ( staticpagetext && staticpagetext[0].translations.product_deals ) ?? 'All Flights Deals' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.product_deals_description ) ?? 'Find incredible value with our travel deals' }
        />
      </div>
    </div>
  )
};

export default SearchFlights