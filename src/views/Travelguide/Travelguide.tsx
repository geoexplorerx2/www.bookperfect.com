import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Logger from '../../common/Logger';
import { BrowserProperty, Information, SectionBackground, TopInternationalDestinations, TravelBlog } from '../../components';

import HeroHead from '../../components/HeroHeader/HeroHead';
import { 
  airlinesResource, 
  cityInformationData, 
  continent, 
  countries, 
  destinationsResource, 
  helpArticles, 
  helpTypesTerm, 
  informationsNode, 
  searchNode, 
  subtopicsParagraph, 
  subtopicsTerm, 
  taxonomyDir} from '../../store/actions/TravelguideActions';
import { DEMO_CATS, DEMO_CATS_1 } from '../Homepage/Homepage';

import image from '../../images/airline.png';
import TopSearchResult from '../../components/SearchTop/TopSearchResult';
import BrowserDestinations from '../../components/TopInterDestinations/BrowserDestinations';
import services from '../../api/services';

import americaimage from '../../images/americaimage.svg';
import asiaimage from '../../images/asiaimage.svg';
import europeimage from '../../images/europeimage.svg';

import americamap from '../../images/americamap.svg';
import asiamap from '../../images/asiamap.svg';
import europemap from '../../images/europemap.svg';
import africamap from '../../images/africamap.svg';
import southamericamap from '../../images/southamericamap.svg';
import austriliamap from '../../images/austriliamap.svg';
import antarticamap from '../../images/antarticamap.svg';
import oceaniamap from '../../images/oceaniamap.svg';
import { arrayMove, sortArraytBy } from '../../common/arrayMove';
import Loader from '../../components/Loader/Loader';
import ShortCutRouting from '../../components/ShortcutRouting/ShortrcutRouting';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import { PopularDealsData } from '../../data/ProductDealsData';
import { goToPage } from '../../common/goToPage';
import Popular from '../../components/Popular/Popular';
import { BASE_URL, MAILCHIMP_API_URL } from '../../api/env';
import { landingPageInfo, popularcities, staticPageText } from '../../store/actions';
import PageInfoBanner from '../../components/PageInfoBanner/PageInfoBanner';
import pageInfo2 from '../../images/pageinfo2.svg';
import Membership from '../../components/membership/membership';
import { GENERAL_TRAVELGUIDE_PAGE_ID, TRAVELGUIDE_PAGE_ID } from '../../constants/pages';

const Travelguide = () => {

  const dispatch = useDispatch();
  const airlinesData = useSelector((state: { airlines: object; }) => state.airlines);
  const destinationsData = useSelector((state: { destinations: object; }) => state.destinations);
  const informationsData = useSelector((state: { informations: object; }) => state.informations);
  const subtopicstermData = useSelector((state: { subtopicsterm: object; }) => state.subtopicsterm);
  const helptypesData = useSelector((state: { helptypes: object; }) => state.helptypes);
  const helparticlesData = useSelector((state: { helparticles: object; }) => state.helparticles);
  const searchnodeData = useSelector((state: { searchnode: object; }) => state.searchnode);
  const subtopicsparagraphData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.subtopicsparagraph);

  const taxonomyData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.taxonomydir);

  const continentData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.continent);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const landingpageinfo = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.landingpageinfo);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  const taxoLength = taxonomyData && taxonomyData.length > 0 && Array.from(new Set(taxonomyData)).length;

  const taxonomyLink = window.location.pathname.split('/');
  const taxonomy = taxonomyLink.slice(2, taxonomyLink.length);

  const windowLink = window.location.pathname.split('/');
  // console.log({windowLink});

  let history = useHistory();

  useEffect(() => {
    // get popular cities
    dispatch(
      popularcities()
    );

    dispatch(
      landingPageInfo(
        TRAVELGUIDE_PAGE_ID
      )
    );

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_TRAVELGUIDE_PAGE_ID, 
        activeLang
      )
    )
  }, []);
  
  // get travelguide resources
  useEffect(() => {
    // get continent from drupal
    if(!continentData){
      dispatch(
        continent()
      );
    }  
  }, [continentData]);
  
  // const continentData_sort1 = continentData && arrayMove(continentData, 6, 2);
  // const CONTINENT_DATA_SORTED = continentData_sort1 && arrayMove(continentData_sort1, 4, 2);
  // sorArraytBy(continentData, ['Asia', 'Africa', 'Europe'], 'name');
  
  // const CONTINENT_DATA_SORTED = sorArraytBy(continentData, ['Asia', 'Africa', 'Europe'], 'name');;


  const CONTINENT_DATA = useMemo(() => {

    continentData &&
    continentData.length && 
    continentData?.forEach((continent: any) => {
      if(!continent.hasOwnProperty('cardImage')) {
        
       if(continent.name.toLowerCase() == 'europe') continent.cardImage = europeimage;
       else if(continent.name.toLowerCase() == 'asia') continent.cardImage = asiaimage;
       else if(continent.name.toLowerCase() == 'north america') continent.cardImage = americaimage;

       else {
         continent.cardImage = europeimage;
       }
   
      }
   
      if(!continent.hasOwnProperty('map')) {
        
       if(continent.name.toLowerCase() == 'europe') continent.map = europemap;
       else if(continent.name.toLowerCase() == 'asia') continent.map = asiamap;
       else if(continent.name.toLowerCase() == 'north america') continent.map = americamap;
       else if(continent.name.toLowerCase() == 'africa') continent.map = africamap;
       else if(continent.name.toLowerCase() == 'south america') continent.map = southamericamap;
       else if(continent.name.toLowerCase() == 'australia') continent.map = austriliamap;
       else if(continent.name.toLowerCase() == 'antarctica') continent.map = antarticamap;
       else if(continent.name.toLowerCase() == 'oceania') continent.map = oceaniamap;
       else {
         // continent.map = europemap;
       }
   
      }
     });

    return continentData;
    
  }, [continentData]);

  const browseDestination = (dest: any, taxo: any) => {

    if(taxo){
      for(let i = 0; i < taxo.length; i++) {
        dispatch(
          taxonomyDir(taxo[i])
        );
      }

      // request city data
      dispatch(
        cityInformationData(
          taxo[2].tid
        )
      );

      let link = '/travelguide/' + `${dest.name.toLowerCase()}`;
      let rootUrl = window.location.pathname;

      let dynamicUrl = `/${activeLang}` + "/travelguide/" + taxo[0].name.toLowerCase() + "/" + taxo[1].name.toLowerCase() + "/" + taxo[1].tid + "/" + taxo[2].name.toLowerCase() +  "/" + taxo[2].tid;
      let renderUrl = rootUrl + dynamicUrl;
      // goToPage(renderUrl, '');

      history.push(dynamicUrl);
    } else {
        dispatch(
          taxonomyDir(dest)
        );

        // if(taxoLength === 1){

          let continent_id = dest?.tid;

          dispatch(
            countries(
              continent_id
            )
          ) 

          let link = `/${activeLang}` + '/travelguide/' + `${dest.name.toLowerCase()}`;
          history.push(link);
        // }
    }
  };

  const CONTINENT_DATA_SORTED = CONTINENT_DATA && sortArraytBy(CONTINENT_DATA, ['Asia', 'Africa', 'Europe'], 'name');

    // popular city data
    const POPULAR_CITIES_DATA = useMemo(() => {
      return popularcitiesdata && popularcitiesdata[0].field_popular_cities?.map(
        (city: any, index: number) => {
          return {
            name: city.field_city.name,
            tid: city.field_city.tid,
            image: BASE_URL + city.field_image.url,
            continent_name: city.field_city.continent_name,
            continent_tid: city.field_city.continent_tid,
            country_name: city.field_city.country_name,
            country_tid: city.field_city.country_tid,
            button: [
              {
                tid: city.field_city.tid,
                type: 'deals',
                name: 'Travel Deals',
                icon: 'deals'
              },
              {
                tid: city.tid,
                nid: city.field_city.tid, // TODO: get this nid from drupal
                type: 'guide',
                name: 'Travel Guide',
                icon: 'guide'
              }
            ]
          }
        });
    }, [popularcitiesdata]);

  // console.log({staticpagetext});

  const POPULAR_DESTINATION_TABS = continentData && continentData.filter((continent: any, index: number) => continent.name != 'Antarctica');
  return (
    <div>
      <Loader data={landingpageinfo && landingpageinfo.length > 0 && CONTINENT_DATA_SORTED && CONTINENT_DATA_SORTED.length > 0  ? false : true}/>
      <HeroHead
         className='hero-head-travelguide'
         searchCard = "travelguide"
         headType = "travelguide"
         taxonomy = { Array.from(new Set(taxonomyData)) }
         searchFormContainerClassName='md:!w-[80%]'
         headText={ "Travel Guide" }
         subText={'Incredible value deals and inspiring travel articles, for you to plan, discover and dream.'}
      />

    { CONTINENT_DATA_SORTED &&
      <BrowserDestinations 
        categories = { DEMO_CATS_1 }
        heading={(staticpagetext && staticpagetext[0].translations.explore_holiday_destinations) ?? "Explore Holiday Destinations"}
        subHeading={(staticpagetext && staticpagetext[0].translations.explore_holiday_destinations_description) ?? "lorem ipsum dolor sit amet, consectetur"}
        uniqueClassName="homepage_browser_property"
        className="py-[5vh]"
        browseDestination = {( dest: any, taxo: any ) =>  browseDestination( dest, taxo ) }
        data = { CONTINENT_DATA_SORTED && CONTINENT_DATA_SORTED }
      /> 
    }

   {
    landingpageinfo &&
    <div className='w-[100%] my-[80px]'>
      <PageInfoBanner data={landingpageinfo && landingpageinfo[0]}/>
    </div>
   }

    {/* poppular hotel deals */}
    <div className='py-[4vh]'>
      {
        POPULAR_DESTINATION_TABS && 
        POPULAR_CITIES_DATA &&
        <Popular
          data = { POPULAR_CITIES_DATA }
          tabs = { POPULAR_DESTINATION_TABS }
          heading={( staticpagetext && staticpagetext[0].translations.popular_destinations ) ?? "Popular Destinations"}
          subHeading={( staticpagetext && staticpagetext[0].translations.popular_destinations_description) ??  "There are many variations of passages of Lorem Ipsum available, but the "}
        />
      }
    </div>

      {/* top international destination sections */}
      {/* for bacground image of this section bg-[url(')] : bg-gradient-to-r from-sky-500 to-indigo-500 */}
      {/* <div className="relative  -mt-[25px] ">
        <SectionBackground
          className = "bg-[#F5F6FF] dark:bg-black dark:bg-opacity-20" 
          isWidth = "xl:max-w-full"
          isRounded = ""
        />

        <TopInternationalDestinations
          categories = { DEMO_CATS }
          categoryCardType="card4"
          itemPerRow = { 4 }
          heading="Top Destinations"
          subHeading="Haven't decided ? Get inspired by these popular destinations."
          isHeadingCenter = { false }
          uniqueClassName="homepage_popular_destination_section pt-[4vh]"
        />
      </div> */}

      <div className='mt-[3vh]'>
       <ShortCutRouting statictext = { staticpagetext && staticpagetext[0].translations } />
      </div>

      <div className="">
        {/* <TravelBlog 
          heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' } 
          customStyles ="pt-[4.7vh]"
       /> */}
      </div>


      {/* Membership banner */}
      <div className="mt-[80px]">
        <MailchimpSubscribe
            url={ MAILCHIMP_API_URL }
            render={({ subscribe, status, message }: any) => (
                <Membership
                  status={status}
                  message={message}
                  onValidated={(formData: any) => subscribe(formData)}
                  statictext = { staticpagetext && staticpagetext[0].translations }
                />
            )}
        />
      </div>

      {/* <div className='py-[4vh]'>
        <ProductDeals
          data={PopularDealsData}
          heading="All Flights Deals"
          subHeading="There are many variations of passages of Lorem Ipsum available, but the"
        />
      </div> */}

    </div>
  )
};

export default Travelguide;