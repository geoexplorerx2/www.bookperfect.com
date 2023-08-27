import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guideDetailData } from '../../store/actions';
import { ReactComponent as burgerIcon } from "../../images/icons/BurgerIcon.svg";
import { ReactComponent as xIcon } from "../../images/icons/x.svg";
import CityDealsShortcutBtn from '../../components/CityDealsShortcutBtn/CityDealsShortcutBtn';
import { cityWeatherData } from '../../store/actions/TravelguideActions';
import { ToTranslationFormat } from '../../helpers';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom"
import { useGeocodeGen } from '../../hooks/useGeocodeGen';

interface Menu {
  menu?: string;
  objective?: string;
  field_st_title?: string;
  title?: string;
  nid?: string;
};

declare global {
  interface Window { myWidgetParam: any; }
}

window.myWidgetParam = window.myWidgetParam || [];

const GuideSidebar = ({ guidesMenu, guideMenu, activeSideGuide, setActiveSideGuide, onGuideSelect, taxonomy, geocode, city }: any) => {

  const cityweatherdata = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.cityweatherdata);
  const searchdestination = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.searchdestination);

  const dispatch = useDispatch();
  const [scroll, setScroll] = useState<any>(0);

  const activeDot = <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="3.5" fill="#3842B2" />
  </svg>;
  const innactiveDot = <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="3.5" fill="white" stroke="#15173F" />
  </svg>;

  const [selected, setSelected] = useState(activeSideGuide.data ?? activeSideGuide);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  // @ts-ignore
  const { t, i18n } = useTranslation()
  let Icon = isMenuOpen ? xIcon : burgerIcon;

  const menuContainerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const CITY_ID = cityweatherdata && cityweatherdata.id;

  // const STATIC_GEOCODE = [
  //   {
  //     city: 'Istanbul',
  //     geocode: {
  //       lat: '41.015137',
  //       lng: '28.979530'
  //     }
  //   },
  //   {
  //     city: 'London',
  //     geocode: {
  //       lat: '51.51411',
  //       lng: '-0.11473'
  //     }
  //   }
  // ];

  // finding geo-code
  const params = useParams();
  // useLatitudeLongitudeGen(city, params.country);
  
  const CURRENT_CITY_GEOCODE: any = useGeocodeGen(city, params.country);

  const handleClickOutside = (event: MouseEvent) => {
    if (!menuContainerRef.current) return;

    // click inside
    if (menuContainerRef.current.contains(event.target as Node) || iconRef?.current?.contains(event.target as Node)) {
      setIsMenuOpen(prevState => !prevState)


      return;
    };

    // click outside

    setIsMenuOpen(false);
    // console.log('travelguide menu: the outside clicked')
  };

  useEffect(() => {
    if (handleClickOutside) {
      document.removeEventListener("click", handleClickOutside);
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuClicked]);

  const handleGuideSelect = (menu: Menu) => {

    setActiveSideGuide({
      menu: menu.title,
      active: true,
      data: menu,
      notautoscroll: false
    });

    setIsMenuClicked(false)
    onGuideSelect(menu);

    // let guide_id: any = menu.nid;

    // dispatch(
    //   guideDetailData(guide_id)
    // );

  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)

  }, []);
  useEffect(() => {
    console.log("idebat:: activeSideGuide", activeSideGuide)
    const initialActiveMenu = guidesMenu.filter((menu: any) => menu.title == activeSideGuide.title)[0]
    if (initialActiveMenu) handleGuideSelect(initialActiveMenu)
  },
    [guidesMenu, activeSideGuide])

  // useEffect(() => {
  //   console.log("idebat:: activeSideGuide",activeSideGuide)
  // } ,
  // [activeSideGuide])


  useEffect(() => {
    if ((!cityweatherdata || cityweatherdata == '') && CURRENT_CITY_GEOCODE) {
      dispatch(
        cityWeatherData(
          CURRENT_CITY_GEOCODE
        )
      )
    }
  }, [CURRENT_CITY_GEOCODE]);

  useEffect(() => {
    if (cityweatherdata) {
      window.myWidgetParam.push({
        id: 15,
        cityid: CITY_ID,
        appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
        units: 'metric',
        containerid: 'openweathermap-widget-15'
      });

      var script = document.createElement('script');
      script.async = true;
      script.charset = "utf-8";
      script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
      var s = document.getElementsByTagName('script')[0];

      s.parentNode && s.parentNode.insertBefore(script, s);
    }
  }, [cityweatherdata]);

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = winScroll / height
    setScroll(scrolled)
  };

  return (
    <>
      <aside className={`w-full h-[100%] `} aria-label="Sidebar">
        <div className={`hidden lg:inline-block py-4 bg-white-50 rounded dark:bg-white-800 h-[100%] w-full relative`}>
          <ul>
            {
              guidesMenu &&
              guidesMenu.map((menu: any, index: number) => (
                menu.type !== 'call_to_action' &&
                <li className="cursor-pointer">
                  {menu.hasOwnProperty('title') ?
                    <a onClick={() => handleGuideSelect(menu)} className={`flex items-center p-2 text-base  ${(menu.title == activeSideGuide.menu) && 'bg-[#EEEFFF] dark:bg-[#171925]'} font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#EEEFFF] dark:hover:bg-[#171925]`}>

                      {menu.title == activeSideGuide.menu ? activeDot : innactiveDot}

                      {/* <span className="ml-3 text-[#3842B2]">{index == 0 ? 'Overview' : menu.title}</span> */}
                      <span className="ml-3 text-[#3842B2] dark:text-[#fff]">{
                        i18n.exists(`TRAVEL_GUIDE.${ToTranslationFormat(menu.title)}`) ? t(`TRAVEL_GUIDE.${ToTranslationFormat(menu.title)}`) : menu.title

                        // t(menu.title)}
                      } </span>
                    </a> :
                    <a onClick={() => handleGuideSelect(menu)} className={`flex items-center p-2 text-base ${(menu.field_st_title == activeSideGuide.menu) && 'bg-[#EEEFFF]'} font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#EEEFFF] dark:hover:bg-[#EEEFFF]`}>
                      {menu.field_st_title == activeSideGuide.menu ? activeDot : innactiveDot}

                      <span className="ml-3 text-[#3842B2]">{menu.field_st_title}</span>
                    </a>
                  }
                </li>
              ))
            }
          </ul>
        </div>
        <div className='w-full mt-[18px] lg:hidden ' ref={menuContainerRef}>
          <div className='humburger_menu relative w-full mb-8 rounded-[10px] flex items-center  bg-[#EEEFFF] text-[#3842B2] text-xs font-medium'>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1 w-full">
                <Listbox.Button className={`elative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left
                                      focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2
                                    focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2
                                    focus-visible:ring-offset-orange-300 sm:text-sm
                                    ${isMenuOpen ? 'bg-[#DADBE8]' : 'bg-transparent'}
                                    `}
                  onClick={() => { setIsMenuClicked(prevState => !prevState) }}
                >
                  <div className="truncate flex items-center" ref={iconRef}>
                    <Icon color='#3944B3' className='mr-3' />
                    {activeSideGuide.menu}
                  </div>

                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-5 text-base ring-1 ring-black shadow-[0px_4px_17px_4px_rgba(0,_21,_255,_0.12)] ring-opacity-5 focus:outline-none sm:text-sm">

                    {guidesMenu &&
                      guidesMenu?.map((menu: any, idx: number) => {
                        return (
                          <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-4 pl-12 pr-4 text-xs ${active ? 'text-[#3944B3] font-normal' : 'text-gray-900 font-extralight'
                              }`
                            }
                            value={menu}
                            onClick={() => handleGuideSelect(menu)}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`flex items-center truncate ${selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                  <div className='absolute left-0 mx-6 bg-[#3944B3] w-[6px] h-[6px] rounded-full'></div>

                                  {menu.title}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        )
                      }
                      )}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <div></div>
          </div>
        </div>
      </aside>
      {/* {
        cityweatherdata && */}
      <div className="hidden lg:inline-block" id="openweathermap-widget-15"></div>
      {/* } */}
      <div className='w-full px-1 h-[140px] mt-4 hidden lg:inline-block'>
        <CityDealsShortcutBtn taxonomy={taxonomy} wrapperClassNames='relative hidden lg:inline-block ' />
      </div>
    </>
  )
}

export default GuideSidebar;