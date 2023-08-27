import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { BrowserProperty, SectionBackground, TopInternationalDestinations, TravelBlog, TripIdeas } from '../../components';
import HeroHead from '../../components/HeroHeader/HeroHead';
import TopSearchResult from '../../components/SearchTop/TopSearchResult';
import { DEMO_CATS, DEMO_CATS_1, IDEA_DATA_DEFAULT } from '../Homepage/Homepage';
import { SamplePopularDestinations } from '../../data/ActivitiesPopularDestinatoins';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import MEMBERSHIP from '../../components/membership/membership';
import { PopularData, POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';
import Popular from '../../components/Popular/Popular';
import Disclosure from '../../components/Disclosure/Disclosure';
import FAQData from '../../data/FAQ';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import { PopularActivitiesDealsData } from '../../data/ProductDealsData';
import ActivitiesSearchForm from '../../components/HeroInputSearch/ActivitiesSearchForm';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { countries, exclusiveOffers, faqs, getActivitiesData, landingPageInfo, popularcities, staticPageText, supportHelps, tripIdeasData } from '../../store/actions';
import PageInfoBanner from '../../components/PageInfoBanner/PageInfoBanner';
import pageInfo4 from '../../images/pageInfo4.svg';
import Loader from '../../components/Loader/Loader';
import { SPECIAL_TICKET } from '../../constants/triptypes';
import BASE_URL_HOME, { BASE_URL, MAILCHIMP_API_URL } from '../../api/env';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { ACTIVITIES_PAGE_ID, GERNERAL_ACTIVITIES_PAGE_ID } from '../../constants/pages';
import { Productdeals } from '../../data/productdeals';
import { goToPage } from '../../common/goToPage';

interface SeletedCategoryProps{
  code?: string;
  name?: string;
};

const SearchActivities = () => {

  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);
  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const activities: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.activities);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const landingpageinfo = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.landingpageinfo);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const trip_ideas: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.tripideas);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  const [selectedCategory, setSelectedCategory] = useState<SeletedCategoryProps>();
  
  const deals = Productdeals('Activities Deals', 'activities');

  const IDEA_DATA = trip_ideas && trip_ideas?.idea;

  const dispatch = useDispatch();

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
      exclusiveOffers()
    );

    dispatch(
      getActivitiesData()
    );

    // get popular cities
    if (!popularcitiesdata) {
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
      landingPageInfo(
        ACTIVITIES_PAGE_ID
      )
    );

    dispatch(
      faqs('160591')
    );
  }, []);

  useEffect(() => {
    // get static text data
    dispatch(
      staticPageText(
        GERNERAL_ACTIVITIES_PAGE_ID,
        activeLang
      )
    );
  }, [activeLang])

  // useEffect(() => {
  //   if(!faqsdata){
  //     dispatch(
  //       faqs('160591')
  //     );
  //   }
  // }, [faqsdata]);
  
  const ACTIVITIES_DATA = activities && activities.filter((activity: any) => activity.hasOwnProperty('city') && activity.productTypes.length == 1 && activity.productTypes[0] == SPECIAL_TICKET);

  const _ACTIVITIES_IDEA_DATA = IDEA_DATA && IDEA_DATA?.filter((idea: any) => idea.counters.tickets >= 1);
  const _IDEA_DATA = selectedCategory && selectedCategory.name != 'All' ? _ACTIVITIES_IDEA_DATA?.filter((idea: any) => idea.destinations[0]?.code == selectedCategory.code ) : _ACTIVITIES_IDEA_DATA;

  // activities tabs
  const _ACTIVITIES_TABS: any = useMemo(() => {
     return _ACTIVITIES_IDEA_DATA && _ACTIVITIES_IDEA_DATA.map((_activities_idea: any, index: number) => {
      return _activities_idea?.destinations[0] 
    })
  }, [_ACTIVITIES_IDEA_DATA]);

  // add recommended first
  _ACTIVITIES_TABS && _ACTIVITIES_TABS.splice(0, 0, { name: 'All'} );

  let activities_tabs_unique: any = {};
  let filter_duplicated_activities_tabs = _ACTIVITIES_TABS && _ACTIVITIES_TABS?.filter((activities_tab: { code: string | number; }) => !activities_tabs_unique[activities_tab.code as keyof any] && (activities_tabs_unique[activities_tab.code] = true));

  const FILTERED_ACTIVITIES_TABS = filter_duplicated_activities_tabs;

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
    const ideaUrl = BASE_URL_HOME + "/idea/brochure.xhtml?id=" + id + "&title=" + cityName + "&lang=" + activeLang + "&currency=" + activeCurrency + "&agency=bookperfect"

    // render url
    if (ideaUrl) goToPage(ideaUrl, 'redirect');
  };

  return (
    <div>
      {/* <Loader
        data = {
          Array.isArray(staticpagetext) &&
          // staticpagetext[0].translations.activities &&
          // staticpagetext[0].translations.activities_description &&
          staticpagetext.length > 0 && 
          popularcitiesdata.length > 0 && 
          exclusiveoffers.length > 0 &&
          ACTIVITIES_DATA.length > 0 ? false : true }
      /> */}

      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || Activities </title>
      </Helmet>

      <HeroHead
        className='hero-head-search-activities'
        searchCard="activities"
        headText={(staticpagetext && staticpagetext[0].translations.activities) ?? "Activities"}
        subText={(staticpagetext && staticpagetext[0].translations.activities_description)}
      />

      <ActivitiesSearchForm
        // search = 'transfers_search'
        roundedTopLeft="rounded-tl-xl"
        // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}} 
        wrapperClassNames={"inline-block md:hidden"}

      />
      {/* exclusive offers */}
      <div className='pb-[0vh] mb-4'>
        <ExclusiveOffers
          data={exclusiveoffers}
          statictext={staticpagetext && staticpagetext[0].translations}
          showMobileNavigationButtons={true}
        />
      </div>

      {
        _IDEA_DATA &&
        <div id='' className='mt-[6vh]'>
          <TripIdeas
            ideaData={_IDEA_DATA}
            tabs={FILTERED_ACTIVITIES_TABS}
            OnTripIdea={(data: any) => handleTripIdeas(data)}
            wrapperClassNames=""
            bgColor="bg-[#FFFFFF]"
            showMoreButton={false}
            // navigationType="noNavigation"
            onTabChange={(tab: any) => { setSelectedCategory(tab) }}
            heading={(staticpagetext && staticpagetext[0].translations.top_activities) ?? 'Top Activities'}
            subHeading={(staticpagetext && staticpagetext[0].translations.top_activities_description)}
            displayStyle='slider'
          />
        </div>
      }
      {/* top activities */}
      {/* <TopSearchResult
        showMoreButton={true}
        searched="activities"
        heading={ ( staticpagetext && staticpagetext[0].translations.top_activities ) ?? 'Top Activities' }
        subHeading={ ( staticpagetext && staticpagetext[0].translations.top_activities_description ) } 
        moreBtn="All Activities "
        listing={3}
        cols={4}
        data = { ACTIVITIES_DATA }
        customStyles="pt-[6vh]"
        isSlider
      /> */}

      {
        landingpageinfo &&
        <div className='w-[100%] my-[80px]'>
          <PageInfoBanner data={landingpageinfo && landingpageinfo[0]} />
        </div>
      }

      {/* membership banner */}
      <div>
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
      <div className='pt-[4vh] pb-[2.5vh]'>
        {
          popularcitiesdata &&
          <Popular
            data={popularcitiesdata}
            heading={(staticpagetext && staticpagetext[0].translations.popular_destinations) ?? 'All Activities Deals'}
            subHeading={(staticpagetext && staticpagetext[0].translations.popular_destinations_description) ?? 'Find incredible value with our travel deals'}
          />
        }
      </div>

      {/* FAQ Section */}
      {
        faqsdata &&
        <div className="relative  py-8 md:pt-[5vh]">
          <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
          <Disclosure 
            items={faqsdata && faqsdata[0].field_detail_cards} 
            heading={(staticpagetext && staticpagetext[0].translations.frequently_asked_questions) ?? "Frequently Asked Questions"} 
          />
        </div>
      }

      {/* top international destination section */}
      {/* <div className="relative py-16">
        for bacground image of this section bg-[url(')] : bg-gradient-to-r from-sky-500 to-indigo-500
        <SectionBackground
          className = "bg-blue-50 dark:bg-black dark:bg-opacity-20" 
          isWidth = "xl:max-w-full"
          isRounded = ""
        />

        <TopInternationalDestinations
          categories = { SamplePopularDestinations}
          categoryCardType="card4"
          itemPerRow = { 4 }
          heading="Popular Destinations"
          subHeading="Haven't decided ? Get inspired by these popular destinations."
          isHeadingCenter = { false }
          uniqueClassName="homepage_popular_destination_section"
        />
      </div> */}

      {/* top international destination section */}
      {/* <div className="relative py-16 bg-[#000D86] ">
            for bacground image of this section bg-[url(')] : bg-gradient-to-r from-sky-500 to-indigo-500
            <SectionBackground
                className = "sc-bg opacity-25" 
                isWidth = "xl:max-w-full"
                isRounded = ""
            />
            <TopInternationalDestinations
                categories = { DEMO_CATS }
                categoryCardType="card1"
                itemPerRow = { 5 }
                isHeadingCenter = { true }
                heading="Top International Destinations"
                subHeading="Here you can see our featured trip ideas"
                headingClassNames='!text-white !text-[32px]'
                sliderStyle="style2"
                uniqueClassName="homepage_top_international_destination_section"
            />
        </div> */}

      <div className="pt-[5vh]">
        {/* <TravelBlog
          heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' } 
          customStyles=""
          customStyle={{ marginTop: '57px', marginLeft: '195px', width: '1050px' }}
        /> */}
      </div>

      {/* all flight deals */}
      <div className='pt-[2vh] pb-[4vh]'>
        <ProductDeals
          data={deals}
          heading={(staticpagetext && staticpagetext[0].translations.product_deals) ?? 'All Activities Deals'}
          subHeading={(staticpagetext && staticpagetext[0].translations.product_deals_description) ?? 'Find incredible value with our travel deals'}
        />
      </div>
    </div>
  )
}

export default SearchActivities;