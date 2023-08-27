import React, { useEffect, useState } from 'react';
import HotelCard from '../../components/StayCard/HotelCard';
import ResultListingsHeader from '../Hotels/ResultListingsHeader';
import GuideContent from './GuideContent';
import GuideHeader from './GuideHeader';
import GuideSidebar from './GuideSidebar';

import guide from '../../images/guide.png';
import { SectionBackground, TopInternationalDestinations } from '../../components';
import TravelTips from './TravelTips';
import { useDispatch } from 'react-redux';
import { guideDetailData } from '../../store/actions';
import { useSelector } from 'react-redux';
import Avuxi from '../Avuxi/Avuxi';
import HomepageHeroSearch from '../../components/HeroInputSearch/HomepageHeroSearch';
import { Map } from 'tabler-icons-react';
import CityDealsShortcutBtn from '../../components/CityDealsShortcutBtn/CityDealsShortcutBtn';
import TYPES from '../../types/store';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../hooks/useWindowSize';
import { taxonomyClear, taxonomyDir } from '../../store/actions/TravelguideActions';

const Guide = ({
    scrolltotarget,
    guides,
    activeGuide,
    onGuideSelect,
    city,
    stickyClass = "h-screen sticky top-20 overflow-hidden",
    cityInfo = {},
    taxonomy }: any) => {

    const guideDetail = useSelector((state: { TravelguideReducer: any; }) => guides ? state.TravelguideReducer.guidedetail : state.TravelguideReducer.guidedetail && state.TravelguideReducer.guidedetail.data);
    const cityweatherdata = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.cityweatherdata);
    const hotelsSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.hotelsFormHeight);
    const transfersSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.transfersSearchFormHeight);
    const flightSearchFormHeight = useSelector((state: any) => state.DynamicStyles.flightsFormHeight)
    const taxonomyData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.taxonomydir);

    // @ts-ignore
    const { t } = useTranslation()
    const [scroll, setScroll] = useState<any>(0);
    const [calculatedSpace, setCalculatedSpace] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [currentTab, setCurrentTab] = useState({
        tabName: "Trip Designer",
        tabIcon: <Map size={23} />
    });
    if (!guides) guides = guideDetail;

    const dispatch = useDispatch();

    const [activeSideGuide, setActiveSideGuide] = useState({
        menu: activeGuide.guide,
        active: true,
        data: guides && guides?.filter((guide: any) => guide.hasOwnProperty('title') ? guide.title == activeGuide.guide : guide.field_st_title == activeGuide.guide)[0]
    });


    const windowSize = useWindowSize();

    useEffect(() => {
        setActiveSideGuide({
            menu: activeGuide.guide,
            active: true,
            data: guides && guides?.filter((guide: any) => guide.hasOwnProperty('title') ? guide.title == activeGuide.guide : guide.field_st_title == activeGuide.guide)[0]
        })
    },
        [activeGuide])
    // useEffect(() => {
    //     if(city){
    //         dispatch({ 
    //             type: TYPES.AVUXI, 
    //             payload: { 
    //               city: city
    //         }});
    //     }
    // }, []);

    useEffect(() => {

        const activeTabHeight = hotelsSearchFormHeight > 0 ?
            hotelsSearchFormHeight - 130 : transfersSearchFormHeight > 0 ?
                transfersSearchFormHeight - 180 : flightSearchFormHeight > 0 ? flightSearchFormHeight - 110 : 0

        if (isMobile) return

        setCalculatedSpace(activeTabHeight)
    }, [hotelsSearchFormHeight, transfersSearchFormHeight, flightSearchFormHeight]);



    const CITY_ID = cityweatherdata && cityweatherdata.id;

    useEffect(() => {
        setIsMobile((prevState) => {
            if (!prevState && windowSize.width < 768) {
                return true
            } else if (prevState && windowSize.width > 768) {
                return false
            } else {
                return prevState
            }
        })
    }, [windowSize]);
    useEffect(() => {
        if (cityweatherdata) {
            window.myWidgetParam.push({
                id: 15,
                cityid: CITY_ID,
                appid: 'bddfdd2407f44281e223cfc8afd5ac72',
                units: 'metric',
                containerid: 'openweathermap-widget-14'
            });

            var script = document.createElement('script');
            script.async = true;
            script.charset = "utf-8";
            script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
            var s = document.getElementsByTagName('script')[0];

            s.parentNode && s.parentNode.insertBefore(script, s);
        }
    }, [cityweatherdata]);


    useEffect(() => {
        let guide_id = activeSideGuide?.data?.nid;

        if (guideDetail && guideDetail.length == 0) {
            dispatch(
                guideDetailData(guide_id)
            );
        }
    }, [activeSideGuide]);

    const windowLink = window.location.pathname.split('/')[2];

    useEffect(() => {
        if (Object.keys(cityInfo).length === 0) return

        let breadCrumbs = [
            {
                name: cityInfo.continent_name,
                tid: cityInfo.continent_tid
            },
            {
                name: cityInfo.country_name,
                tid: cityInfo.country_tid
            },
            {
                name: cityInfo.name,
                tid: cityInfo.tid
            },
            {
                name: "Travel Guide",
                tid: cityInfo.tid
            },
        ];

        dispatch(
            taxonomyClear(() => {
                breadCrumbs.forEach((taxo: any) => Array.isArray(taxonomyData) && taxonomyData.push(taxo))
            })
        )
        for (let i = 0; i < breadCrumbs.length; i++) {
            dispatch(
                taxonomyDir(breadCrumbs[i])
            );
        };
    },
        [cityInfo])



    const guide_content = guideDetail && activeSideGuide.data && guideDetail.length && guideDetail.filter((guide: any) => guide.field_st_title == activeSideGuide.data.title)

    return (
        <>
            {
                guideDetail &&
                <div className={`guide mx-5 bigMd:mx-[10vw] relative`}>
                    <div className="flex">
                        <div className="scrolling w-full hidden lg:inline-block lg:basis-1/4 z-30 h-[85vh] overflow-scroll absolute lg:sticky top-0 lg:top-[85px] left-0 mr-3">
                            <div className={``}>

                                {/* TODO: map data card */}
                                <GuideSidebar
                                    guideMenu={guideMenu}
                                    guidesMenu={guides}
                                    activeSideGuide={activeSideGuide}
                                    setActiveSideGuide={setActiveSideGuide}
                                    onGuideSelect={onGuideSelect}
                                    taxonomy={taxonomy}
                                    geocode={guideDetail && guideDetail.geocode}
                                    city={city}
                                />
                            </div>
                        </div>
                        <div className="w-[100%] pt-[20px] lg:pl-6 lg:border-l-2 border-[rgba(57,68,179,0.2)]">

                            <div className='relative w-[100%] min-h-[550px] border-2 border-[rgba(57,68,179,0.2)] dark:border-[rgba(255,255,255,1)] rounded-[16px] overflow-hidden px-2 py-2 mb-[3vh] mt-16 lg:mt-0 z-20'>
                                <div className='min-h-[530px] overflow-hidden   border-[1px] border-[rgba(255,255,255,1)] rounded-[30px]'>
                                    <Avuxi cityname={city} taxonomy={taxonomy} />
                                </div>
                            </div>
                            <div className="mb-8 inline-block lg:hidden w-full guide_weather_widget relative z-10" id="openweathermap-widget-14"></div>

                            <div className='w-full h-[150px] inline-block lg:hidden'>
                                <CityDealsShortcutBtn taxonomy={taxonomy} />
                            </div>
                            <div className='mb-8 md:mb-0 relative z-[1]'>
                                <HomepageHeroSearch
                                    // currentTab={{
                                    //     tabName: "Trip Designer",
                                    //     tabIcon: <Map size={23} />
                                    // }}
                                    currentTab={currentTab}
                                    searchcardplace='travelguide'
                                    padding='0.6rem 0.5rem'
                                    inputClassNames='xl:pl-3'
                                    pls='pr-3'
                                    iconClassNames=''
                                    scrollButtonClassNames='!bg-[#F75847]'
                                    renderStyle='guidestyle'
                                    customContainer=''
                                    className='w-full lg:translate-x-0'
                                />
                            </div>

                            <div style={{ paddingTop: `${calculatedSpace >= 0 ? calculatedSpace : 0}px` }}>
                                <GuideContent
                                    activeContent={activeSideGuide}
                                    setActiveSideGuide={setActiveSideGuide}
                                    allGuides={guides}
                                    allGuidesDetail={guideDetail}
                                    city={city}
                                    scrolltotarget={scrolltotarget}
                                    taxonomy={taxonomy}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
};


export const guideMenu = [
    {
        menu: 'Overview',
        active: true,
        content: {
            about: 'Whether it’s winding your way up the centuries-old spiral staircase in the Tower of London, enjoying the city views from Level 31 at Aqua Shard (signature ‘Elizabeth Line’ cocktail in hand) or taking your time to pore over the collectibles at Portobello Road market, there’s a London experience for everyone. Very few cities roll history, culture, nightlife, a foodie scene, shopping and sheer personality into a world-class package quite the way London does. If you’re planning a visit, explore our London travel guide and find out how to make the most of your time in this incredible city. We’ve collected the best tips from our travel experts, and have all sorts of suggestions for things to do, the best time to travel (and what you can expect from that London weather!), where to stay in London, getting around and more. We even have a guide to Heathrow Airport at your fingertips.',
            image: guide,
            location: 'Buckingham Palace in London, England.'
        }
    },
    {
        menu: 'Where to stay',
        active: false
    },
    {
        menu: 'Things to do',
        active: false
    },
    {
        menu: 'Travel Tips',
        active: false
    },
    {
        menu: 'Getting Arround',
        active: false
    },
    {
        menu: 'Where to eat',
        active: false
    },
    {
        menu: 'Shopping',
        active: false
    },
    {
        menu: 'Best time to travel',
        active: false
    },
    {
        menu: 'Parks',
        active: false
    }
];


export default Guide;
