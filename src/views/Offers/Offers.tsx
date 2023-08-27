import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserProperty, SectionBackground, TopInternationalDestinations, TravelBlog, TripIdeas } from '../../components';
import HeroHead from '../../components/HeroHeader/HeroHead';
import MEMBERSHIP from '../../components/membership/membership';
import Popular from '../../components/Popular/Popular';
import { PopularData } from '../../data/PopularData';
import Disclosure from '../../components/Disclosure/Disclosure';
import FAQData from '../../data/FAQ';
import { RouteComponentProps } from "react-router-dom";
import { PopularDealsData } from '../../data/ProductDealsData';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import Loader from '../../components/Loader/Loader';
import OfferDetail from './OfferDetail';
import { useSelector } from 'react-redux';
import HomepageHeroSearch from '../../components/HeroInputSearch/HomepageHeroSearch';
import { Map } from "tabler-icons-react";
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { exclusiveOffers, faqs, popularcities, staticPageText } from '../../store/actions';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import { GENERAL_HOMEPAGE_PAGE_ID } from '../../constants/pages';
import useWindowSize from '../../hooks/useWindowSize';

interface TParams{
    promocode?: string;
};

interface OffersProps{
    // match: RouteComponentProps<TParams>
    match?: any;
};

const Offers: FC<OffersProps> = ({ match }) => {
  const dispatch = useDispatch();
  const offerdetail = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.offerdetail);
  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeofferssearchtab: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.activeofferssearchtab);
  const hotelsSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.hotelsFormHeight);
  const transfersSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.transfersSearchFormHeight);
  const flightSearchFormHeight = useSelector((state: any) => state.DynamicStyles.flightsFormHeight)

  const [calculatedSpace, setCalculatedSpace] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const windowSize = useWindowSize();
  const [currentTab, setCurrentTab] = useState({
    tabName: "Trip Designer",
    tabIcon: <Map size={23} />
  });
  useEffect(() => {

    const activeTabHeight = hotelsSearchFormHeight > 0 ?
    hotelsSearchFormHeight - 130 : transfersSearchFormHeight > 0 ?
      transfersSearchFormHeight - 180 : flightSearchFormHeight > 0 ? flightSearchFormHeight - 110 : 0

    if (isMobile) return
    
    setCalculatedSpace(activeTabHeight)
  }, [hotelsSearchFormHeight, transfersSearchFormHeight, flightSearchFormHeight]);


  useEffect(() => {
    if(!faqsdata){
      dispatch(
        faqs(DEFAULT_FAQ_ID)
      );
    }

    // get popular cities
    if (!popularcitiesdata) {
      dispatch(
        popularcities()
      );
    };

    if(!exclusiveoffers){
      dispatch(
        exclusiveOffers()
      );
    }

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_HOMEPAGE_PAGE_ID, 
        activeLang
      )
    )
  }, []);


  const ACTIVE_SEAARCH_TAB = () => {
    let offercat = (offerdetail && offerdetail[0] && offerdetail[0].field_offer_category[0].name) ?? activeofferssearchtab;

    switch (offercat) {
      case 'Flights & More':
        return 'Flights';
      case 'Rent a Car':
        return 'Rent a Car';
      case 'Packages':
        return 'Packages';
      case 'Transfers':
        return 'Transfers';
      case 'Hotel':
        return 'Hotels';
      case 'Flights + Hotels':
        return 'Flights + Hotels';
      case 'Activities':
        return 'Activities';
      default:
        return 'Trip Designer';
    };

  };

  return (
    <div>
      {/* <Loader data = { offerdetail && offerdetail.length > 0 ? false : true } /> */}
      <HeroHead
        className='hero-head-search-offers'
        searchCard='offers'
        headText="Exclusive Offers"
        headType="offers"
        activeSearchTab={ ACTIVE_SEAARCH_TAB() }
      />

      <HomepageHeroSearch
        // currentTab={{
        //   tabName: "Trip Designer",
        //   tabIcon: <Map size={23} />
        // }}
        currentTab={currentTab}
        className="inline-block md:hidden bg-[#3944B3]"
        searchcardplace='offers'
      />

      {/* offer detail */}
      <div className='hello ' style={{ paddingTop: `${calculatedSpace >= 0 ? calculatedSpace : 0}px` }}>
        {
          (
            offerdetail && 
            offerdetail.length > 0 && 
            offerdetail != '' ) ?
              <>
                <Loader data = { offerdetail.length > 0 && false }/>
                <div className='mt-20 overflow-hidden'>
                  <OfferDetail />
                </div> 
              </> :
              <>
              <Loader data = { exclusiveoffers.length > 0 && false } />
              <div className='pb-[7vh] overflow-hidden'>
                <ExclusiveOffers 
                  data={exclusiveoffers} 
                  statictext = { staticpagetext && staticpagetext[0].translations } 
                  displayType = 'all' 
                />
              </div>
              </>
        }

      </div>

      {/* membership banner */}
      <div className='mt-20'>
        <MEMBERSHIP />
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

      {/* FAQ Section */}
      {
        faqsdata &&
        <div className="relative py-8 md:py-[5vh]">
          <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
          <Disclosure items={faqsdata && faqsdata[0].field_detail_cards} />
        </div>
      }

      <div className="">
        {/* <TravelBlog
          heading="Travel Blog"
          subHeading="lorem ipsum dolor sit amet, consectetur"
          customStyles="pt-[1.5vh]"
        /> */}
      </div>

      {/* all flight deals */}
      <div className='py-[4vh]'>
        <ProductDeals
          data={PopularDealsData}
          heading="All Flights Deals"
          subHeading="There are many variations of passages of Lorem Ipsum available, but the"
        />
      </div>
    </div>
  )
}

export default Offers;