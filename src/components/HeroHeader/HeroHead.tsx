import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import FlightSearchForm from "../HeroInputSearch/FlightSearchForm";
import FlightsHotelsSearchForm from "../HeroInputSearch/FlightsHotelsSearchForm";
import HotelsSearchForm from "../HeroInputSearch/HotelsSearchForm";
import Characteristics from "./Characteristics";

import house from "../../images/house.svg";
import TaxonomyHeader from "../Taxonomy/TaxonomyHeader";
import TaxonomySearch from "../Taxonomy/TaxonomySearch";
import PackagesSearchForm from "../HeroInputSearch/PackagesSearchForm";
import RoutingSearchForm from "../HeroInputSearch/RoutingSearchForm";
import TransfersSearchForm from "../HeroInputSearch/TransfersSearchForm";
import ActivitiesSearchForm from "../HeroInputSearch/ActivitiesSearchForm";
import SupportSearchForm from "../HeroInputSearch/SupportSearchForm";
import { relative } from "node:path";
import { useHistory } from 'react-router-dom'
import TripDesignerHeader from "../../views/TripDesigners/TripDesignerHeader";
import TripDesignerSearchForm from "../HeroInputSearch/TripDesignerSearch";
import HomepageHeroSearch from "../HeroInputSearch/HomepageHeroSearch";
import { Map } from "tabler-icons-react";
import TravelguideTaxonomy from "../Taxonomy/TravelguideTaxonomy";
import CarRentalSearchForm from "../HeroInputSearch/CarRentalSearchForm";
import { useSelector, useDispatch } from "react-redux";
import { getBookingsData } from "../../store/actions";



const HeadTextWrapper = styled.div`
font-family: 'Poppins';
font-size: 32px;
font-weight: 700;
letter-spacing: 0em;
text-align: left;
margin-left: 10vw;
// margin-top: 90px;
color: #FFFFFF;
@media (max-width: 768px) {
  font-size: 20px;
  margin-left: 20px;
}
}
`;

const SubTextWrapper = styled.div`
  //styleName: h6/regular;
  max-width: 740px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  margin-left: 10vw;
  // margin-top: 20px;
  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
    font-size: 14px; 
    font-weight: 400;
    max-height: 112px;
  }
  // top: 242px;
  color: white;
`;

const CardWrapper = styled.div`
  margin-left: '-40%';
  height: "200px";
  width: '1200px';
  margin-top: '255px';
  filter: drop-shadow(0px 6px 32px rgba(255, 197, 191, 0.28));
`;

export interface HeroHeadProps {
  className?: string;
  headText?: string;
  subText?: string;
  searchCard?: any;
  headType?: string;
  taxonomy?: any;
  custombgcolor?: string;
  headUserData?: any;
  onTaxonomy?: any;
  searchFormContainerClassName?: string;
  onRequestTripDesignerHowTo?: () => void;
  characteristicsInnerWrapperClassNames?: string;
  activeSearchTab?: string;
  HomepageHeroSearchClassName?: string;
  isPageDataReady?: any;
  isDealsPage?: boolean;
};

const HeroHead: FC<HeroHeadProps> = (props) => {

  const {
    className = "",
    headText = "",
    subText = "",
    searchCard,
    headType = "",
    custombgcolor = "bg-[#3944B3]",
    headUserData = "",
    taxonomy,
    onTaxonomy,
    searchFormContainerClassName = '',
    onRequestTripDesignerHowTo,
    characteristicsInnerWrapperClassNames,
    activeSearchTab = "Trip Designer",
    isPageDataReady = false,
    isDealsPage = false
  } = props

  const bookingsdata: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.bookings);
  const user = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userdata);
  const userprofile = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userprofile);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  const dispatch = useDispatch()
  const history = useHistory();
  const [bookingsCount, setBookingsCount] = useState();
  const [currentTab, setCurrentTab] = useState({
    tabName: activeSearchTab,
    tabIcon: <Map size={23} />
  });
  var userdata = localStorage.getItem('userdata');
  const _USERNAME = userprofile?.name;

  // @ts-ignore
  var authenticated = JSON.parse(userdata);

  let start: string = '20220810';
  let end: string = '20221231';

  useEffect(() => {
    dispatch(
      getBookingsData(
        start,
        end,
        activeLang.toLowerCase()
      )
    )
  }, []);


  useEffect(() => {
    setBookingsCount(bookingsdata?.bookedTrip?.filter((trip: any) => trip.user.username === _USERNAME)?.length)
  }, [bookingsdata, user])

  useEffect(() => {
    if (taxonomy) console.log(taxonomy);
  }, [taxonomy]);


  useEffect(() => {
    setCurrentTab({
      tabName: activeSearchTab,
      tabIcon: <Map size={23} />
    })
  } ,
  [activeSearchTab])

  const renderSearchCard = () => {

    switch (searchCard) {
      case 'flights':
        return <FlightSearchForm
          radioHeight="py-7"
          showClassGuest={false}
          roundedTopLeft="rounded-tl-xl"
          customStyle={{ width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px' }}
          wrapperClassName={"hidden md:block absolute bottom-0"}
        />
      case 'hotels':
        return <HotelsSearchForm
          headType={headType}
          radioHeight="py-4"
          showClassRadio={true}
          roundedTopLeft="rounded-tl-xl"
          // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}}
          searchCardHight={headType == 'result' ? 'py-4' : ""}
          wrapperClassName={"hidden md:block absolute bottom-0"}
        />
      case 'flightshotels':
        return <FlightsHotelsSearchForm
          radioHeight="py-2"
          roundedTopLeft="rounded-tl-xl"
          // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}}
          wrapperClassName={"hidden md:block absolute bottom-0"}
        />
      case 'travelguide':
        return <TaxonomyHeader
          type='travelguidetaxo'
          taxonomy={taxonomy}
          onTaxonomy={onTaxonomy}
        />
      case 'packages':
        return <PackagesSearchForm
          roundedTopLeft="rounded-tl-xl"
          // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}} 
          wrapperClassNames={"hidden md:block absolute bottom-0"}
        />
      case 'rentacar':
        return <CarRentalSearchForm
          search='transfers_search'
          roundedTopLeft="rounded-tl-xl"
          // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}} 
          oneWayWrapperClassNames="hidden md:inline-block absolute bottom-0"
          roundTripWrapperClassNames="hidden md:inline-block absolute bottom-0"
        />
      case 'routing':
        return <RoutingSearchForm
          roundedTopLeft="rounded-tl-xl"
          customStyle={{ width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px' }}
          onlyCarWrapperClassNames={"hidden md:block absolute bottom-0"}
          withMyCarWrapperClassNames={"hidden md:block absolute bottom-0"}
          flightAndCarWrapperClassNames={"hidden md:block absolute bottom-0"}
        />
      case 'transfers':
        return <TransfersSearchForm
          search='transfers_search'
          roundedTopLeft="rounded-tl-xl"
          // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}} 
          oneWayWrapperClassNames="hidden md:inline-block absolute bottom-0"
          roundTripWrapperClassNames="hidden md:inline-block absolute bottom-0"
        />
      case 'activities':
        return <ActivitiesSearchForm
          // search = 'transfers_search'
          roundedTopLeft="rounded-tl-xl"
          // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}} 
          wrapperClassNames={"hidden md:block absolute bottom-0"}
        />
      case 'support':
        return <SupportSearchForm />
      case 'tripdesigner':
        return <TripDesignerHeader onRequestTripDesignerHowTo={() => onRequestTripDesignerHowTo && onRequestTripDesignerHowTo()} />
      case 'company':
        return <TaxonomyHeader
          type='company'
          taxonomy={taxonomy}
          onTaxonomy={onTaxonomy}
          showTaxonomyDesc={false}
        />
      case 'exclusiveoffers':
        return <HomepageHeroSearch
          currentTab={{
            tabName: "Trip Designer",
            tabIcon: <Map size={23} />
          }}
          searchcardplace='travelguide'
          customContainer=''
          tabBgColor=''
          tabStyle='10px 10px 0px 0px'
          style='bigMd:w-[100%]'
          padding=".8rem 1.5rem"
          space=""
          id="travelguid"
        />
      case 'offers':
        return <HomepageHeroSearch
          currentTab={currentTab}
          searchcardplace='offers'
          customContainer=''
          style="bigMd:w-[100%]"
          tabBgColor="bg-[transparent]"
          pl="md:px-2 lg:px-11"
          className="hidden md:inline-block"
        />
      case 'privacypolicy':
        return <TaxonomyHeader
          type='privacypolicy'
          taxonomy={taxonomy}
          onTaxonomy={onTaxonomy}
          showTaxonomyDesc={false}
        />
      default:
        break;
    }
  };

  const hotelsHeadStyle = {
    height: searchCard == 'hotels' || searchCard == 'flights' ? (headType == 'result' ? "249px" : "512px") : '100%',
    background: searchCard == 'hotels' || searchCard == 'flights' ? "linear-gradient(235.83deg, rgba(20, 35, 200, 0) 20%, rgba(2, 13, 137, 0.69) 76.21%)" : '',
    alignItems: headType == 'travelguide' ? 'center' : '',
    justifyContent: headType == 'travelguide' ? 'center' : '',
  };

  return (
    <>
      <div
        className={`${className} flex bg-no-repeat bg-cover bg-[#3944B3] lg:flex-col relative mx-auto
                  ${headType == 'result' ? "h-[249px]" : (headType == 'profile' ? 'h-[200px]' : (headType == 'support' ? 'h-[360px]' : (['support', 'company', 'travelnews', 'privacypolicy'].includes(headType) ? 'h-[210px]' : "h-56 md:h-[412px]")))}
      `}
      // style={{height: headType == 'result' ? "249px" : ( headType == 'profile' ? '200px' : (headType == 'support' ? '210px' : "412px") )}}//
      >
        <div className={`flex flex-col w-full
                        ${searchCard == 'offers' || searchCard == 'hotels' || searchCard == 'flights' || searchCard == 'packages' ? 'header-gradient z-[39]' : ''}
                        ${['travelguide', 'flightshotels', 'activities', 'routing', 'rentacar', 'flights', 'hotels', 'exclusiveoffers', 'offers', 'packages', 'transfers', 'travelnews'].includes(searchCard) ? 'header-gradient' : ''}
                        ${searchCard == 'hotels' || searchCard == 'flights' ? (headType == 'result' ? "h-[249px]" : "bigMd:h-[412px]") : 'h-full'}
                        ${headType == 'travelguide' ? 'items-center' : ''}
                        ${headType == 'travelguide' ? 'justify-center' : ''}
        `}
        //  style={hotelsHeadStyle}
        >
          <div className={`w-full h-full flex flex-1 flex-col justify-end ${headType == 'offers' ? '' : 'overflow-hidden'}`}>
            {
              headType == 'result' ?
                <div className="ml-48 mt-28 flex flex-row space-x-5 mx-auto">
                  <img src={house} className="" style={{ fontFamily: 'Poppins', fontSize: '12px' }} />
                  <span className="text-white" style={{ fontFamily: 'Poppins', fontSize: '12px' }}> {">"} </span>
                  <span className="text-white" style={{ fontFamily: 'Poppins', fontSize: '12px' }}> Hotels</span>
                  <span className="text-white" style={{ fontFamily: 'Poppins', fontSize: '12px' }}>{">"} </span>
                  <span className="text-white" style={{ fontFamily: 'Poppins', fontSize: '12px' }}> Paris Hotels</span>
                </div> :
                <>
                  {
                    !['travelguide', 'profile', 'support', 'company', 'privacypolicy'].includes(headType) &&
                    <>
                      <div className={`${headType == 'offers' ? 'md:mt-[50px]' : 'md:mt-[50px]'}`}>
                        <HeadTextWrapper>
                          {headText}
                        </HeadTextWrapper>
                      </div>
                      {/* </h2> */}
                      {/* <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400"> */}
                      <SubTextWrapper>
                        <span className="line-clamp-4">

                          {subText ? subText : (
                            headType != 'tripdesigner' &&
                            ``
                          )}
                        </span>
                      </SubTextWrapper>
                      {/* </span> */}
                    </>
                  } {
                    headType == 'profile' &&
                    <div className="w-full h-full bigMd:mt-32 flex flex-col bigMd:flex-row bigMd:space-x-6 px-[10vw] pt-4 bigMd:pt-0">

                      <div className="basis-1/4">
                        <div className="grid grid-cols-1 space-y-1">
                          <div className="text-base bigMd:text-2xl text-[#FFFFFF] dark:text-neutral-400 font-poppins font-bold not-italic">
                            {headUserData.name}
                          </div>
                          <span className="text-xs text-[#F4F8FF] font-poppins font-normal not-italic">{headUserData.email ?? headUserData.mail}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 items-center bigMd:items-start bigMd:flex flex-row flex-grow basis-3/4">
                        <div className="bigMd:flex-1">
                          <div className="flex items-center bigMd:grid bigMd:grid-cols-1 bigMd:space-y-1">
                            <div className="text-center text-[28px] bigMd:text-[32px] text-[#FFFFFF] dark:text-neutral-400 font-poppins font-bold not-italic mr-1 bigMD:mr-0">
                              {bookingsCount ?? 0}
                            </div>
                            <span className="text-xs mbigMd:text-sm text-center text-[#F4F8FF] font-poppins font-normal not-italic">
                              BOOKINGS
                            </span>
                          </div>
                        </div>
                        <div className="bigMd:flex-1">
                          <div className="flex items-center bigMd:grid bigMd:grid-cols-1 bigMd:space-y-1">
                            <div className="text-center text-[28px] bigMd:text-[32px] text-[#FFFFFF] dark:text-neutral-400 font-poppins font-bold not-italic mr-1 bigMD:mr-0">
                              0
                            </div>
                            <span className="text-xs mbigMd:text-sm text-center text-[#F4F8FF] font-poppins font-normal not-italic">
                              DESTINATIONS
                            </span>
                          </div>
                        </div>
                        <div className="bigMd:flex-1">
                          <div className="flex items-center bigMd:grid bigMd:grid-cols-1 bigMd:space-y-1">
                            <div className="text-center text-[28px] bigMd:text-[32px] text-[#FFFFFF] dark:text-neutral-400 font-poppins font-bold not-italic mr-1 bigMD:mr-0">
                              0
                            </div>
                            <span className="text-xs mbigMd:text-sm text-center text-[#F4F8FF] font-poppins font-normal not-italic">
                              Hotels
                            </span>
                          </div>
                        </div>
                        <div className="bigMd:flex-1">
                          <div className="flex items-center bigMd:grid bigMd:grid-cols-1 bigMd:space-y-1">
                            <div className="text-center text-[28px] bigMd:text-[32px] text-[#FFFFFF] dark:text-neutral-400 font-poppins font-bold not-italic mr-1 bigMD:mr-0">
                              0
                            </div>
                            <span className="text-xs mbigMd:text-sm text-center text-[#F4F8FF] font-poppins font-normal not-italic">
                              TRANSPORTATIONS
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  }
                </>
            }

          </div>
          <div
            className={`items-end flex-row px-5 md:px-0 xl:mx-[10vw] w-full relative bottom-0 flex-1
                        ${searchFormContainerClassName}
                        ${headType == 'offers' ? 'md:bg-[rgba(57,68,179,0.6)]  rounded-tl-[10px] rounded-tr-[20px]' : ''}
                        ${headType == 'profile' ? '!hidden' : ''}
                        ${headType === 'tripdesigner' ? '!flex' : ''}
                        ${headType === 'travelguide' ? '!flex' : ''}
                        ${headType === 'travelnews' ? '!hidden' : ''}
                        ${history.location.pathname == '/support' ? '!w-[calc(100%_-_20px)] !px-0 md:!w-[80%] mx-auto md:!mx-[10vw] !flex' : 'xl:w-[80%]'} 
                        hidden md:flex
                        `}
          >
            {renderSearchCard()}
          </div>
        </div>

      </div>
      {headType == 'travelguide' && <TravelguideTaxonomy taxonomy={taxonomy} onTaxonomy={onTaxonomy} isPageDataReady={isPageDataReady} isDealsPage={isDealsPage} />}
      {!['travelguide', 'result', 'profile', 'support', 'company', 'tripdesigner', 'offers', 'travelnews', 'privacypolicy'].includes(headType) && <Characteristics innerWrapperClassNames={characteristicsInnerWrapperClassNames} />}
      {headType == 'travelguide' && window.location.pathname.split('/').length == 2 && <TaxonomySearch />}
      {/* { headType == 'company' && <TaxonomySearch /> } */}
      {
        headType == 'tripdesigner' &&

        <div className='tripdesigner-hero-search relative z-10 '>
          <div className="md:mx-[10vw] shadow-[0px_6px_32px_rgba(255,_197,_191,_0.1)]">
            <div>
              <TripDesignerSearchForm className="rounded-b-2xl" data={headType} pls='22px' />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default HeroHead;
