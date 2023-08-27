import React, { FC, useEffect, useState, ReactNode } from "react";
import ButtonSecondary from "../../lib/Button/ButtonSecondary";
import Heading from "../../lib/Heading/Heading";
import Nav from "../../lib/Nav/Nav";
import NavItem from "../../lib/NavItem/NavItem";
import { Tabs } from "../../lib/Tabs/Tabs";
// import { TabsTripAdvisor } from "../../lib/TabsTripAdvisor/TabsTripAdvisor";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { tab } from "@testing-library/user-event/dist/tab";
import { goToPage } from "../../common/goToPage";
import { urlBaseHotel } from "../HeroInputSearch/HotelsSearchForm";
import { useSelector } from "react-redux";
import { formatDate } from "../../common/formatDate";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { scrollToTargetAction } from "../../store/actions";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import SliderTabs from '../../components/Tabs/Tabs'

export interface TripIdeasHeaderProps {
  tabActive: any;
  tabs: any;
  heading: ReactNode;
  subHeading?: ReactNode;
  onClickTab: (item: any) => void;
  ideasType?: string;
  showMoreButton?: boolean;
  navigationType?: string;
  destCategories?: any;
  onTabChange?: any;
  headingWrapperClassNames?: string,
  subheadingClassNames?: string,
  topSectionClassNames?: string,
  tabStyle?: string,
  containerTripdesigner?: string,
  navItemStyle?: string,
  subNave?: string,
  listStyle?: string,
  id?: boolean,
  componentId?: string,
  ButtonAndTextWrapperClassName?: string,
  isTripAdv?: boolean,
  showHeader?: boolean
};

const TripIdeasHeader: FC<TripIdeasHeaderProps> = ({
  tabActive,
  tabs,
  subHeading = "Here you can see our trips ideas",
  heading = "Our Trips Ideas",
  onClickTab,
  ideasType,
  showMoreButton,
  navigationType = "destination",
  destCategories,
  onTabChange,
  headingWrapperClassNames = '',
  subheadingClassNames = '',
  topSectionClassNames = '',
  tabStyle = 'sm:space-x-4 lg:space-x-0',
  containerTripdesigner = 'relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar',
  navItemStyle,
  subNave = 'px-[32px] h-[34px] sm:h-[unset] my-3 sm:mt-0 text-xs sm:text-[12px] sm:px-[60px] sm:py-[16px] capitalize',
  listStyle,
  id,
  componentId,
  ButtonAndTextWrapperClassName,
  isTripAdv,
  showHeader = true
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // console.log('The route name is :',window.location.pathname);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const taxonomyData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.taxonomydir);
  const taxonomyLink = window.location.pathname.split('/');
  taxonomyLink?.splice(0, 2);

  const [tabActiveState, setTabActiveState] = useState<any>(tabActive);
  const [sourceMarket, setSourceMarket] = useState<any>('UK');

  // @ts-ignore
  const { t } = useTranslation()
  const slider = React.useRef<Slider>(null);

  let date = new Date();
  let checkin = (new Date(date.getTime() + (15 * 24 * 60 * 60 * 1000)));
  let checkout = (new Date(checkin.getTime() + (1 * 24 * 60 * 60 * 1000)));

  const departure = {
    date: formatDate(checkin)
  };

  const returnd = {
    date: formatDate(checkout)
  };

  // useEffect(() => {
  //   setTabActiveState(tabActive);
  // }, [tabActive]);

  const handleClickTab = (item: any) => {
    onClickTab && onClickTab(item);
    setTabActiveState(item);
    onTabChange && onTabChange(item);
  };

  const handleMoreDeals = () => {
    let link;

    switch (ideasType) {
      case 'hotels':
        link = urlBaseHotel + "&distribution=2-0" + "&lang=" + activeLang.toUpperCase() + "&sourceMarket=" + sourceMarket + "&displayCurrency=" + activeCurrency + "&carRental=false" + "&hotelDestination=" + (tabActiveState.id) + "&departureDate=" + (departure.date) + "&arrivalDate=" + (returnd.date);
        window.open(link, '_blank');
        // goToPage(link, '_blank');
        break;
      case 'packages':
        dispatch(
          scrollToTargetAction('packages')
        );
        history.push(activeLang + '/packages');
        break;
      case 'deals':
        dispatch(
          scrollToTargetAction('packages')
        );
        history.push(activeLang + '/packages');
        break;
      case 'discoverdestination': 
          history.push(`/${activeLang}/travelguide`)
          break;
      default:
        break;
    }
  };

  const handleButtonText = () => {
    return 'More' + " " + tabActiveState.name + " " + " Hotels";
    // return (t('TRIP_IDEAS.MORE') + " " + t(tabActiveState.name) + " " + t("TRIP_IDEAS.HOTELS"));
  };

  const SampleNextArrow = () => {
    return (<>
    </>)
  }
  const SamplePrevArrow = () => {
    return (<>
    </>)
  }
  var settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 9,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

//   let IDEAS_TABS_FILTER: any;
//  useEffect(() => {
//   IDEAS_TABS_FILTER = ideasType == 'discoverdestination' && taxonomyLink?.length == 3 && tabs ? tabs.filter((tab: any) => tab.name.toLowerCase() != taxonomyLink[1]) : tabs;
//  }, 
//  [tabs, taxonomyLink])
//   // const IDEAS_TABS_FILTER =  ideasType == 'discoverdestination' && taxonomyLink?.length == 3 && tabs ? tabs.filter((tab: any) => tab.name.toLowerCase() != taxonomyLink[1]) : tabs;

const IDEAS_TABS_FILTER =  ideasType == 'discoverdestination' && taxonomyLink?.length == 3 && tabs ? tabs.filter((tab: any) => tab.name.toLowerCase() != taxonomyLink[1]) : tabs;
 

  return (
    <div className="flex flex-col dark:pt-14">
      {
        ideasType == 'deals' && showHeader?
          <div className="flex items-center justify-between w-full">
             <Heading
              desc={subHeading}
              className={`${ButtonAndTextWrapperClassName} !text-base`}
              headingClassNames="md:!text-[32px]"
              showMoreButton={showMoreButton}
              handleMoreDeals={handleMoreDeals}
              ideasType={ideasType}
            >
              {heading}
            </Heading>
            {/* {
              showMoreButton &&
              <span className="hidden sm:block flex-shrink-0">
                <ButtonSecondary rounded="rounded-full" className="!leading-none border-[#F75847]">
                  <span className="dark:text-[#fff]">More Deals</span>
                  <i className="ml-3 las la-arrow-right text-xl text-[#F75847]"></i>
                </ButtonSecondary>
              </span>
            } */}

          </div> :
          <>
          {
            showHeader &&  <Heading
                headingWrapperClassNames={`${headingWrapperClassNames} !text-base sm:!text-[32px]`}
                desc={subHeading}
                subheadingClassNames={`${subheadingClassNames} md:text-[18px] md:text-[#0E123D] md:mt-1 `}
                className={`${topSectionClassNames} mb-0 text-neutral-900 dark:text-neutral-50 xl:!pb-5 border-b border-[#3A1C1A] border-opacity-20`}
                showMoreButton={showMoreButton}
                handleMoreDeals={handleMoreDeals}
                ideasType={ideasType}
                handleButtonText={handleButtonText}

              >
                {heading}
              </Heading>

          }

            <div className="w-full">
              {
                navigationType == 'category' ?
                  <div className="grid grid-cols-1 gap-4 lg:col-span-3 ">
                    <div>
                      <div className="relative">
                        <div className="relative sm:overflow-hidden">
                          <div className="pb-3">
                            <div className="hidden sm:block">
                              <div className="w-[100%] h-[100%] flex">
                                <div className="w-[5%] h-[9.5em] flex items-center cursor-pointer" onClick={() => slider?.current?.slickPrev()}>
                                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5737_19805)">
                                      <path d="M21.25 27.625L10.625 17L21.25 6.375" stroke="#3F4249" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5737_19805">
                                        <rect width="34" height="34" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>

                                </div>
                                <div className="min-w-[95%] flex-row justify-arround">
                                  {  destCategories &&
                                    <Slider ref={slider} {...settings}>
                                      {destCategories && destCategories?.map((tab: any) => {

                                        return (
                                          <>
                                            <Tabs
                                              tab={tab}
                                              onTabClick={(tab: any) => { onTabChange(tab) }}
                                            />
                                          </>
                                        )
                                      })}
                                    </Slider>
                                  }
                                </div>
                                <div className="w-[10%] h-[9.5em] flex items-center cursor-pointer" onClick={() => slider?.current?.slickNext()}>
                                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5737_19808)">
                                      <path d="M12.75 27.625L23.375 17L12.75 6.375" stroke="#3F4249" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5737_19808">
                                        <rect width="34" height="34" fill="white" transform="matrix(-1 0 0 1 34 0)" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> :
                   (navigationType != 'noNavigation' && <SliderTabs tabs={IDEAS_TABS_FILTER} onTabclick={handleClickTab} />)
                  // <Nav
                  //   className={tabStyle}
                  //   containerClassName={containerTripdesigner}
                  //   listStyle = {listStyle}
                  //   id={id}
                  // >
                  //   {
                  //     // find me
                  //     IDEAS_TABS_FILTER?.map((item: any, index: number) => (
                  //       <NavItem
                  //         key={index}
                  //         isActive={tabActiveState.name == item.name}
                  //         onClick={() => handleClickTab(item)}
                  //         radius = {`rounded-[16px]`}
                  //         className={subNave}
                  //         navItemStyle={navItemStyle}
                  //         componentId={ componentId}
                  //       >
                  //          {
                  //            ideasType == 'discoverdestination' ?
                  //                   ( item?.name.substr(0,  item?.name.length > 16 ? item?.name.length - 5 : item?.name.length ) + (item?.name.length > 16 ? "..." : '') ) : item?.name
                  //          }
                          
                  //       </NavItem>
                  //   ))}
                  // </Nav>
                 
              }
              {
                showMoreButton &&
                <span className="absolute bottom-8 sm:bottom-0 sm:hidden flex items-center min-w-[auto] md:min-w-[167px] w-full sm:w-auto max-h-[40px] flex-shrink-0">
                  <ButtonSecondary onClick={() => handleMoreDeals()} rounded="rounded-2xl" className="!leading-none border  border-[#F75847] dark:border-white group dark:hover:border-[#3944B3] hover:border-[#3944B3] w-full">
                    <span className="text-[#F75847] dark:text-white group-hover:text-[#3944B3] text-[15px] ">{ideasType == 'hotels' ? handleButtonText() : (ideasType == 'discoverdestination' ? 'All Destinations' : t('TRIP_IDEAS.MORE_IDEAS'))}</span>
                    <i className="ml-3 las la-arrow-right text-xl text-[#F75847] dark:text-white group-hover:text-[#3944B3] translate-y-[2px]"></i>
                  </ButtonSecondary>
                </span>
              }
            </div>

            <div>

            </div>
          </>
      }
    </div>
  );
};

export default TripIdeasHeader;
