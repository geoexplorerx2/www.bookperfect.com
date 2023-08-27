import React, { FC, useRef, useEffect, useState, ReactNode, forwardRef } from 'react';
import { useHistory } from "react-router-dom";
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  Select,
  createStyles
} from '@mantine/core';
import { Search, ArrowRight, ArrowLeft } from 'tabler-icons-react';

import america from '../../images/americamap.svg';
import asiamap from '../../images/asiamap.svg';
import europemap from '../../images/europemap.svg';

import { goToPage } from '../../common/goToPage';
import { useSelector } from 'react-redux';
import MagnifyingGlass from '../../images/icons/magnifyingGlass';
import { useDispatch } from 'react-redux';
import { activateSideMenu, activeSearchHelp, searchDestination, searchHelps, supportHelps } from '../../store/actions';
import { activeSearchGuide, cityInformationData, countries, faqs, guideDetailData, taxonomyDir } from '../../store/actions/TravelguideActions';
import { useTranslation } from 'react-i18next';
import SearchBtn from '../SearchBtn/SearchBtn';
import { SearchBtnStatus } from '../../store/actions/SearchBtnStatus';
import StringToBoolean from '../../common/StringToBoolean';
import { ReactComponent as Arrow } from '../../images/icons/SliderArrow.svg'
import { ReactComponent as GlobeIcon } from '../../images/icons/globeIcon.svg'
import { GlobeAltIcon } from '@heroicons/react/solid';
import womanInIstanbul from '../../images/womanInIstanbul.png'
import TripIdeaCard from '../StayCard/TripIdeaCard';
import TripIdeas from '../TripIdeas/TripIdeas';
import Slider from 'react-slick';



interface HeroInputSearchProps {
  defaultValue?: string;
  autoFocus?: boolean;
  searchStyle?: string;
  lengthStyle?: string;
  type?: string;
  searchIconPosition?: 'right' | 'left';
  data?: any;
  searchIn?: string;
  statictext?: any;
  placeholder?: string;
  isAnimated?: boolean
};


interface MainInputProps {
  showPopover: boolean,
  searchIconPosition: string,
  statictext: any,
  value: any,
  handleClick: () => void,
  handleChange: (e: any) => void,
  placeholder?: string

}

interface RenderAutocompleteLocationSearchValueType {
  data: any,
  searchIn: string,
  handleSelectLocation: (item: any, type: string, subtopic?: any) => void,
  handleSelectSearch: (search: any) => void
  hassearchquery?: boolean,
  continentdata?: any;
};

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

interface AnimatedInputType {
  children?: ReactNode,
  handleClick?: () => void
};

const AnimatedInput: FC<AnimatedInputType> = (props) => {
  const { children, handleClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const onClick = () => {
    setIsOpen(true)
    handleClick && handleClick()

  };

  const handleClickOutside = (event: MouseEvent) => {
    // if the clikced outside of the time input on roundtrip departure date close the time input
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // if the clikced outside of the time input on roundtrip return date close the time input
  };

  useEffect(() => {

    document.removeEventListener("click", handleClickOutside);
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen]);

  return (
    <div onClick={onClick} className={`min-w-full md:min-w-0 md:w-[60%] ${isOpen ? 'expandInput' : 'shrinkInput'} `} ref={containerRef} >
      <SearchBtn isOpen={isOpen}>
        {children}
      </SearchBtn>
    </div>
  )
};

const RenderAutocompleteLocationSearchValue: FC<RenderAutocompleteLocationSearchValueType> = (props) => {

  const { data, searchIn, handleSelectLocation, handleSelectSearch } = props;
  const darkMode = useSelector((state: any) => state.LightMode);

  return (
    <>
      {data?.map((item: any) => (
        // item.cities.length > 0 &&
        <span
          // onClick={() => handleSelectLocation(item.city+ " , " +item.country)}
          key={searchIn == 'support' ? item.id : item.tid}
          className="flex items-center px-4 py-4 space-x-3 cursor-pointer sm:px-8 sm:space-x-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          {
            searchIn !== 'support' ?
              <>
                <span className="block cursor-pointer text-neutral-400">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5625 27.1875H23.4376" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 15.9375C17.0711 15.9375 18.75 14.2585 18.75 12.1875C18.75 10.1164 17.0711 8.4375 15 8.4375C12.9289 8.4375 11.25 10.1164 11.25 12.1875C11.25 14.2585 12.9289 15.9375 15 15.9375Z" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M24.375 12.1875C24.375 20.625 15 27.1875 15 27.1875C15 27.1875 5.625 20.625 5.625 12.1875C5.625 9.7011 6.61272 7.31653 8.37087 5.55838C10.129 3.80022 12.5136 2.8125 15 2.8125C17.4864 2.8125 19.871 3.80022 21.6291 5.55838C23.3873 7.31653 24.375 9.7011 24.375 12.1875V12.1875Z" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>

                <span className="flex-1 flex-cloumn space-y-2 dark:text-[#fff]">
                  <span className='flex-1 block font-medium cursor-pointer text-neutral-700 dark:text-neutral-200' onClick={() => handleSelectLocation(item, 'city')} >{item.name} {","} {item.country_name} </span>
                  <ul className='block ml-3 space-y-2 font-small'>
                    {
                      item?.field_info_subtopics.map((subtopic: any) => (
                        <li className="text-xs font-thin cursor-pointer hover:underline" onClick={() => handleSelectLocation(item, 'subtopic', subtopic)}> {subtopic.title} </li>
                      ))
                    }
                  </ul>
                </span>

                <div className='flex justify-center items-center w-24 h-24 border border-[#F96254] dark:border-[#f4f8ff] rounded-2xl cursor-pointer' onClick={(e: any) => handleSelectLocation(item, 'continent')}>
                  <div className='w-full'>
                    <img src={item.map} className='mx-auto w-[60px] h-[60px]' />
                    <div className='w-full text-center mt-1 text-[11px] dark:text-[#fff]' style={{ fontFamily: 'Poppins', color: '#F96254' }}> {item.continent_name} </div>
                  </div>
                </div>
              </>
              :
              <span className="flex-1 flex-cloumn space-y-2 dark:text-[#fff] cursor-pointer" onClick={() => handleSelectSearch(item)}>
                <span className='flex-1 block font-medium cursor-pointer text-neutral-700 dark:text-neutral-200' >
                  {item.field_title ?? item.name}
                </span>
              </span>
          }
        </span>
      ))}
    </>
  );
};

// render algolia search hits
const RenderSearchHits: FC<RenderAutocompleteLocationSearchValueType> = (props) => {
  const {
    data,
    hassearchquery,
    continentdata,
    searchIn,
    handleSelectLocation,
    handleSelectSearch } = props;
  const darkMode = useSelector((state: any) => state.LightMode);

  return (
    <>
      {
        hassearchquery && !continentdata ?
          <>
            <SearchResults data={data} darkMode={darkMode} searchIn={searchIn} handleSelectLocation={handleSelectLocation} handleSelectSearch={handleSelectSearch} />

          </> :
          <RenderSearchWithNoQuery
            darkMode={darkMode}
            data={data}
            continentdata={continentdata}
          />
      }
    </>
  );
};

// retults when there is query
const SearchResults = ({ data, darkMode, searchIn, handleSelectLocation, handleSelectSearch }: any) => {
  return (
    <>
      {data.hits?.map((item: any) => {
        const subtopics = item.st_title.map((title: any) => title)


        return (
          <>
            <div
              key={searchIn == 'support' ? item.id : item.tid}
              className="flex items-center px-4 py-4 space-x-3 cursor-pointer sm:px-7 sm:space-x-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              {
                searchIn !== 'support' ?
                  <div className='w-full'>
                    <div className='w-full flex justify-between items-center'>
                      <div className='flex items-center space-x-3 '>
                        <span className="block cursor-pointer text-neutral-400">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5625 27.1875H23.4376" stroke={darkMode.mode == 'dark' ? "#fff" : "#3842B2"} stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 15.9375C17.0711 15.9375 18.75 14.2585 18.75 12.1875C18.75 10.1164 17.0711 8.4375 15 8.4375C12.9289 8.4375 11.25 10.1164 11.25 12.1875C11.25 14.2585 12.9289 15.9375 15 15.9375Z" stroke={darkMode.mode == 'dark' ? "#fff" : "#3842B2"} stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M24.375 12.1875C24.375 20.625 15 27.1875 15 27.1875C15 27.1875 5.625 20.625 5.625 12.1875C5.625 9.7011 6.61272 7.31653 8.37087 5.55838C10.129 3.80022 12.5136 2.8125 15 2.8125C17.4864 2.8125 19.871 3.80022 21.6291 5.55838C23.3873 7.31653 24.375 9.7011 24.375 12.1875V12.1875Z" stroke={darkMode.mode == 'dark' ? "#fff" : "#3842B2"} stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </span>
                        <span className='text-[#0E123D] text-base'> {item?.title}</span>

                      </div>
                      <span><Arrow className='w-2  text-[#3944B3] rotate-180 ' /></span>

                    </div>
                    <span className='text-[#3944B3] text-xs font-medium mt-6 mb-4 inline-block'>Explore the {item?.title}</span>
                    <div className='grid grid-cols-4 gap-3'>
                      {
                        subTopicsStatic.map(subtopic => {
                          const { label, Icon, BgImage, id } = subtopic
                          return (
                            <div className='' key={id}>
                              <div className='grid stack rounded-[10px] overflow-hidden'>
                                <img src={BgImage} className='w-full h-full' />
                                <div className='bg-[#3842B280] flex items-center justify-center'>
                                  {<Icon className='text-white' />}
                                </div>

                              </div>
                              <span className='text-xs text-[#0E123D]'>{label}</span>

                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  :
                  <span className="flex-1 flex-cloumn space-y-2 dark:text-[#fff] cursor-pointer" onClick={() => handleSelectSearch(item)}>
                    <span className='flex-1 block font-medium cursor-pointer text-neutral-700 dark:text-neutral-200' >
                      {/* {item.field_title ?? item.name} */}
                    </span>
                  </span>
              }
            </div>


            <Slider {...SliderSettings}
              // ref={slider}
              className='mt-4 overflow-hidden px-7'
            >
              {
                TripIdeaData.map(tripIdea => {

                  return (
                    <TripIdeaCard data={tripIdea} imageWrapperClassName='sm:!min-h-[135px]' cardWrapperClassNames='md:!min-h-[unset]' />
                  )
                })
              }
            </Slider>
          </>
        )
      })}
    </>
  )
}


// render no query search result
const RenderSearchWithNoQuery = ({ data, continentdata, darkMode }: any) => {
  let _HITS = data?.hits;
  let hits_unique: any = {};
  let filter_duplicated_hits = _HITS.filter((hit: any) => !hits_unique[hit.country_name as keyof any] && (hits_unique[hit.country_name] = true));

  const COUNTRY_DATA = filter_duplicated_hits.filter((_hit: any) => _hit.hasOwnProperty('country_name'));
  return (
    <>
      <div className='flex flex-col space-y-[24px]'>
        <div className='font-poppins font-medium text-[13px] text-[#3944B3] px-[23px] leading-[20px]'>Explore the popular places in 2023</div>
        <div className='flex flex-col space-y-[15px]'>
          {
            COUNTRY_DATA.map((_data: any) => (
              <span className='flex flex-row space-x-[16px] px-[22.5px]'>
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5625 27.1875H23.4376" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15 15.9375C17.0711 15.9375 18.75 14.2585 18.75 12.1875C18.75 10.1164 17.0711 8.4375 15 8.4375C12.9289 8.4375 11.25 10.1164 11.25 12.1875C11.25 14.2585 12.9289 15.9375 15 15.9375Z" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M24.375 12.1875C24.375 20.625 15 27.1875 15 27.1875C15 27.1875 5.625 20.625 5.625 12.1875C5.625 9.7011 6.61272 7.31653 8.37087 5.55838C10.129 3.80022 12.5136 2.8125 15 2.8125C17.4864 2.8125 19.871 3.80022 21.6291 5.55838C23.3873 7.31653 24.375 9.7011 24.375 12.1875V12.1875Z" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <span className='font-poppins font-normal text-[15px] text-[#0E123D] leading-[22px]'>{_data.title}{","} {_data.country_name}</span>
              </span>
            ))
          }
        </div>
      </div>
      <div className='flex flex-col space-y-[17px] py-10'>
        <div className='font-poppins font-medium text-[13px] text-[#3944B3] px-[23px] leading-[20px]'>Destinations</div>
        <div className='flex flex-col space-y-[9px] px-[25px]'>
          {
            continentdata?.map((continent: any) => (
              <span className='font-poppins font-normal text-[15px] text-[#0E123D] leading-[22px] cursor-pointer'>{continent.name}</span>
            ))
          }
        </div>
      </div>
    </>
  )
};

// main search input
const MainInput = forwardRef<HTMLInputElement, MainInputProps>(

  (props, refFromProps) => {
    const {
      showPopover,
      searchIconPosition,
      statictext,
      value,
      handleChange,
      handleClick,
      placeholder } = props

    const darkMode = useSelector((state: any) => state.LightMode);

    // @ts-ignore
    const { t } = useTranslation()

    return (
      <>

        <input
          type="search"
          id={darkMode.mode == 'dark' ? 'default-search-dark border-[#fff]' : 'default-search'}
          className={`block p-4 pl-5 md:pr-3 w-full text-sm text-gray-900 bg-gray-50 rounded-t-2xl 
                  ${!showPopover && "rounded-b-2xl"} border border-gray-300 focus:ring-blue-500
                  focus:border-[#3944B3] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-xl
                  ${searchIconPosition === 'left' ? '!pl-14 !rounded-[20px]' : ''} `
          }
          placeholder={showPopover ? (statictext ? statictext.new : t('NEW')) : (statictext ? t(statictext.search_placeholder) : (placeholder ? placeholder : t('FIND YOUR TRIP')))}
          value={value}
          autoFocus={showPopover}
          onClick={() => handleClick()}
          onChange={(e: any) => handleChange(e)}
          ref={refFromProps}
          // style={{'filter': 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'}}
          required
          autoComplete="off"
        />
      </>
    )
  });

const HeroInputSearch: FC<HeroInputSearchProps> = (props) => {
  const {
    defaultValue = "",
    placeholder = '',
    autoFocus = false,
    searchStyle = "",
    lengthStyle = "max-w-2xl mx-auto max-h-[100%] h-[100px]",
    type = "",
    searchIconPosition = 'right',
    data,
    searchIn = '',
    statictext,
    isAnimated = false
  } = props



  const theme = useMantineTheme();
  const { classes } = useStyles();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const SearchBtnReducer = useSelector((state: any) => state.SearchBtnReducer.result)
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const [value, setValue] = useState(defaultValue);
  const [showPopover, setShowPopover] = useState(autoFocus);

  // @ts-ignore
  // const { t } = useTranslation()
  // const darkMode = useSelector((state: any) => state.LightMode);
  const isTravelCompositorDealsPage = StringToBoolean(process.env.REACT_APP_USE_TRAVEL_COMPOSITOR_DEALS_PAGE);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [showPopover]);

  // useEffect(() => {
  //   onChange && onChange(value);
  // }, [value]);

  const focusOnInput = () => {
    inputRef.current && inputRef.current.click()
  }

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [inputRef.current])

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;

    // click inside
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }

    // click outside
    setShowPopover(false);
  };

  const handleSelectLocation = (item: any, type: string, subtopic: any = '') => {
    setValue(item.name + " , " + item.country_name);
    // onInputDone && onInputDone(item);
    setShowPopover(false);

    // taxo
    let staticTaxo: any = [
      {
        name: item.continent_name,
        tid: item.continent_tid
      },
      {
        name: item.country_name,
        tid: item.country_tid
      },
      {
        name: item.name,
        tid: item.tid
      }
    ];

    let continent = item.continent_name.replaceAll(' ', '');
    let link = '/' + activeLang + '/travelguide/' + `${continent.toLowerCase()}`;
    // let guide = item.field_info_subtopics[0].nid;
    var dynamicUrl = '';

    switch (type) {
      case 'city':
        if(isTravelCompositorDealsPage){
          // let citycode = item.name.toLowerCase();
          // let dealspage = BASE_URL_HOME + "/" + activeLang.toLowerCase() + "/destination/" + citycode;
      
          // goToPage(dealspage, 'redirect');
          // return;
          
          staticTaxo.push({ name: 'Travel Guide' });
          for (let i = 0; i < staticTaxo.length; i++) {
            dispatch(
              taxonomyDir(staticTaxo[i])
            );
          };
      
          dispatch(
            guideDetailData(subtopic.nid, subtopic)
          );
      
          dynamicUrl = window.location.origin + "/" + activeLang + "/travelguide/" + staticTaxo[0].name.toLowerCase() + "/" + staticTaxo[1].name.toLowerCase() + "/" + staticTaxo[1].tid + "/" + staticTaxo[2].name.toLowerCase() + "/" + staticTaxo[2].tid + '/travelguide';
          window.location.href = dynamicUrl;
          return;
         };      
        // tazxonomy dir
        for (let i = 0; i < staticTaxo.length; i++) {
          dispatch(
            taxonomyDir(staticTaxo[i])
          );
        };

        // city information
        dispatch(
          cityInformationData(
            item.tid
          )
        );

        dynamicUrl = window.location.origin + "/" + activeLang + "/travelguide/" + staticTaxo[0].name.toLowerCase() + "/" + staticTaxo[1].name.toLowerCase() + "/" + staticTaxo[1].tid + "/" + staticTaxo[2].name.toLowerCase() + "/" + staticTaxo[2].tid;
        // goToPage(dynamicUrl, '');
        window.location.href = dynamicUrl;
        // history.push(link);
        break;
      case 'continent':
        dispatch(
          taxonomyDir(staticTaxo[0])
        );

        dispatch(
          countries(
            item.continent_tid
          )
        );


        history.push(link);
        break;
      case 'subtopic':
        staticTaxo.push({ name: 'Travel Guide' });
        for (let i = 0; i < staticTaxo.length; i++) {
          dispatch(
            taxonomyDir(staticTaxo[i])
          );
        };

        dispatch(
          guideDetailData(subtopic.nid, subtopic)
        );

        // active seearch guide
        // setTimeout(() => {
        //   dispatch(
        //     activeSearchGuide(subtopic)
        //   );
        // }, 2000);
        // console.log('the Main searchbar Problem:  subtopic', subtopic)
        dynamicUrl = window.location.origin + "/" + activeLang + "/travelguide/" + staticTaxo[0].name.toLowerCase() + "/" + staticTaxo[1].name.toLowerCase() + "/" + staticTaxo[1].tid + "/" + staticTaxo[2].name.toLowerCase() + "/" + staticTaxo[2].tid + '/travelguide/' + subtopic?.id;
        window.location.href = dynamicUrl;
        // goToPage(dynamicUrl, '');
        // history.push(link);
        break;
      default:
        break;
    }
  };

  // const destinations = [
  //   {
  //     city: 'New York',
  //     country: 'United States',
  //     continent: 'America',
  //     map: america
  //   },
  //   {
  //     city: 'New Delhi',
  //     country: 'India',
  //     continent: 'Asia',
  //     map: asiamap
  //   },
  //   {
  //     city: 'Paris',
  //     country: 'France',
  //     continent: 'Europe',
  //     map: europemap
  //   },
  // ];

  const handleChange = (e: any) => {
    setValue(e.currentTarget.value);
    if (e?.currentTarget?.value.length > 0) setShowPopover(true)
    // goToPage('/travelguide');
  };

  const handleClick = () => {
    setShowPopover(true);

    // goToPage('/travelguide');
  };

  const handleSelectSearch = (search: any) => {

    if (search.type == 'term') {
      var activemenu = {
        menu: search.name,
        active: true,
        data: search,
      };

      dispatch(
        supportHelps(
          search
        )
      );

      dispatch(
        activateSideMenu(
          activemenu
        )
      );

      setValue(search.name);

      return;
    }

    dispatch(
      faqs(search.nid)
    );

    dispatch(
      activeSearchHelp(search)
    );

    setValue(search.field_title);
  };

  // search destination
  useEffect(() => {
    // if (value != '') {
    if (searchIn == 'support') {
      dispatch(
        searchHelps(value)
      )
    } else {
      dispatch(
        searchDestination(value)
      )
    }
    //  };
  }, [value]);

  // const RenderAutocompleteLocationSearchValue = () => {
  //   return (
  //     <>
  //       {data?.map((item: any) => (
  //         // item.cities.length > 0 &&
  //         <span
  //           // onClick={() => handleSelectLocation(item.city+ " , " +item.country)}
  //           key={searchIn == 'support' ? item.id : item.tid}
  //           className="flex items-center px-4 py-4 space-x-3 cursor-pointer sm:px-8 sm:space-x-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
  //         >
  //           {
  //             searchIn !== 'support' ?
  //               <>
  //                 <span className="block cursor-pointer text-neutral-400">
  //                   <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                     <path d="M6.5625 27.1875H23.4376" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
  //                     <path d="M15 15.9375C17.0711 15.9375 18.75 14.2585 18.75 12.1875C18.75 10.1164 17.0711 8.4375 15 8.4375C12.9289 8.4375 11.25 10.1164 11.25 12.1875C11.25 14.2585 12.9289 15.9375 15 15.9375Z" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
  //                     <path d="M24.375 12.1875C24.375 20.625 15 27.1875 15 27.1875C15 27.1875 5.625 20.625 5.625 12.1875C5.625 9.7011 6.61272 7.31653 8.37087 5.55838C10.129 3.80022 12.5136 2.8125 15 2.8125C17.4864 2.8125 19.871 3.80022 21.6291 5.55838C23.3873 7.31653 24.375 9.7011 24.375 12.1875V12.1875Z" stroke={darkMode.mode == 'dark' ? "#fff" : "#15173F"} stroke-linecap="round" stroke-linejoin="round" />
  //                   </svg>
  //                 </span>

  //                 <span className="flex-1 flex-cloumn space-y-2 dark:text-[#fff]">
  //                   <span className='flex-1 block font-medium cursor-pointer text-neutral-700 dark:text-neutral-200' onClick={() => handleSelectLocation(item, 'city')} >{item.name} {","} {item.country_name} </span>
  //                   <ul className='block ml-3 space-y-2 font-small'>
  //                     {
  //                       item?.field_info_subtopics.map((subtopic: any) => (
  //                         <li className="text-xs font-thin cursor-pointer hover:underline" onClick={() => handleSelectLocation(item, 'subtopic', subtopic)}> {subtopic.title} </li>
  //                       ))
  //                     }
  //                   </ul>
  //                 </span>

  //                 <div className='flex justify-center items-center w-24 h-24 border border-[#F96254] dark:border-[#f4f8ff] rounded-2xl cursor-pointer' onClick={(e: any) => handleSelectLocation(item, 'continent')}>
  //                   <div className='w-full'>
  //                     <img src={item.map} className='mx-auto w-[60px] h-[60px]' />
  //                     <div className='w-full text-center mt-1 text-[11px] dark:text-[#fff]' style={{ fontFamily: 'Poppins', color: '#F96254' }}> {item.continent_name} </div>
  //                   </div>
  //                 </div>
  //               </>
  //               :
  //               <span className="flex-1 flex-cloumn space-y-2 dark:text-[#fff] cursor-pointer" onClick={() => handleSelectSearch(item)}>
  //                 <span className='flex-1 block font-medium cursor-pointer text-neutral-700 dark:text-neutral-200' >
  //                   {item.field_title ?? item.name}
  //                 </span>
  //               </span>
  //           }
  //         </span>
  //       ))}
  //     </>
  //   );
  // };

  // TODO: tailwind search icon button inside input
  // const pageId = window.location.pathname==='/';
  const [displayTimeSelect, setDisplayTimeSelect] = useState<any>(false);
  const firstTimeInputcontainerRef = useRef<any>(null);

  return (
    <div>
      <div className={`${lengthStyle} relative flex justify-start items-center`} ref={containerRef}>
        {
          isAnimated &&
          <AnimatedInput>
            <div className='w-full relative'
            onClick={() => {focusOnInput()}}
            >
              <MainInput
                handleChange={handleChange}
                handleClick={handleClick}
                searchIconPosition={searchIconPosition}
                showPopover={showPopover}
                statictext={statictext}
                value={value}
                placeholder={placeholder}
                ref={inputRef}
              />
              {
                type == 'search' &&
                showPopover &&
                <div className="absolute left-0 z-[999999] w-full bg-white dark:bg-neutral-800 top-full mt-0 py-3 sm:py-6 rounded-b-2xl shadow-xl max-h-96 overflow-y-auto" style={{ 'filter': 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}>
                  {
                    StringToBoolean(process.env.REACT_APP_USE_ALGOLIA_SEARCH) && searchIn != 'support' ?
                      <RenderSearchHits
                        key={new Date().getTime()}
                        data={data.searchdata}
                        hassearchquery={data.hassearchquery}
                        continentdata={data.continentdata}
                        searchIn={searchIn}
                        handleSelectLocation={handleSelectLocation}
                        handleSelectSearch={handleSelectSearch}
                      /> :
                      <RenderAutocompleteLocationSearchValue
                        key={new Date().getTime()}
                        data={data.searchdata}
                        searchIn={searchIn}
                        handleSelectLocation={handleSelectLocation}
                        handleSelectSearch={handleSelectSearch}
                      />
                  }
                </div>
              }

            </div>
          </AnimatedInput>

        }
        {
          !isAnimated && <>
            <form ref={firstTimeInputcontainerRef} className={`${searchStyle} animation w-[100%] ${isAnimated == false ? 'block' : (displayTimeSelect ? 'block' : 'hidden')}`}>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300 ">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none right-6 md:right-5">
                  {/* <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
                  {
                    searchIconPosition === 'right' &&
                    <MagnifyingGlass
                      className='text-[#3944B3] dark:text-[#F4F8FF]'
                      size={25}
                    />
                  }
                </div>
                <MainInput
                  handleChange={handleChange}
                  handleClick={handleClick}
                  searchIconPosition={searchIconPosition}
                  showPopover={showPopover}
                  statictext={statictext}
                  value={value}
                  placeholder={placeholder}
                />
                <div className="absolute inset-y-0 flex items-center pointer-events-none left-6">
                  {/* <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
                  {searchIconPosition === 'left' &&
                    <MagnifyingGlass
                      className='text-[#3944B3] dark:text-[#F4F8FF]'
                      size={25}
                    />
                  }
                </div>
                {
                  type == 'search' &&
                  showPopover &&
                  <div
                    className="absolute left-0 z-[999999] w-full bg-white dark:bg-neutral-800 top-full mt-0 py-3 sm:py-6 rounded-b-2xl shadow-xl max-h-96 overflow-y-auto"
                    style={{ 'filter': 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
                  >
                    {
                      StringToBoolean(process.env.REACT_APP_USE_ALGOLIA_SEARCH) && searchIn != 'support' ?
                        <RenderSearchHits
                          key={new Date().getTime()}
                          data={data.searchdata}
                          searchIn={searchIn}
                          hassearchquery={data.hassearchquery}
                          continentdata={data.continentdata}
                          handleSelectLocation={handleSelectLocation}
                          handleSelectSearch={handleSelectSearch}
                        /> :
                        <RenderAutocompleteLocationSearchValue
                          key={new Date().getTime()}
                          data={data.searchdata}
                          searchIn={searchIn}
                          handleSelectLocation={handleSelectLocation}
                          handleSelectSearch={handleSelectSearch}
                        />
                    }
                  </div>
                }
              </div>
            </form>
          </>
        }
      </div>
    </div>
  );
};






const subTopicsStatic = [
  {
    label: 'Best time to visit',
    Icon: GlobeIcon,
    BgImage: womanInIstanbul,
    id: '1'
  },
  {
    label: 'Getting Around',
    Icon: GlobeIcon,
    BgImage: womanInIstanbul,
    id: '2'
  },
  {
    label: 'Where to stay',
    Icon: GlobeIcon,
    BgImage: womanInIstanbul,
    id: '3'
  },
  {
    label: 'Best Hotels',
    Icon: GlobeIcon,
    BgImage: womanInIstanbul,
    id: '4'
  },
  {
    label: 'What to eat',
    Icon: GlobeIcon,
    BgImage: womanInIstanbul,
    id: '5'
  },
  {
    label: 'Best restaurants',
    Icon: GlobeIcon,
    BgImage: womanInIstanbul,
    id: '6'
  },
  {
    label: 'Best time to visit',
    Icon: GlobeIcon,
    BgImage: womanInIstanbul,
    id: '7'
  },
  {
    label: 'Top Attractions',
    Icon: GlobeIcon,
    BgImage: womanInIstanbul,
    id: '8'
  },
]


const TripIdeaData = [{
  "id": 3088010,
  "user": "icarranza@travelcompositor.com",
  "email": "icarranza@travelcompositor.com",
  "title": "Istanbul Test 1",
  "largeTitle": "Istanbul Test 1",
  "remarks": "<p>test remarks</p>",
  "imageUrl": "https://tr2storage.blob.core.windows.net/imagenes/82TPPeXVqJFS-1UavnqbbUFcK76m.png",
  "creationDate": "2022-07-18",
  "departureDate": "2022-08-26",
  "ideaUrl": "https://bookperfect.paquetedinamico.com/idea/brochure.xhtml?id=3088010&title=istanbul-test-1&lang=EN&agency=bookperfect",
  "themes": [
    "Cruises",
    "Stopover "
  ],
  "pricePerPerson": {
    "amount": 15.96,
    "currency": "EUR"
  },
  "totalPrice": {
    "amount": 31.92,
    "currency": "EUR"
  },
  "destinations": [
    {
      "code": "IST",
      "name": "Istanbul"
    }
  ],
  "itinerary": [],
  "userB2c": false,
  "counters": {
    "adults": 2,
    "children": 0,
    "destinations": 1,
    "closedTours": 0,
    "hotelNights": 1,
    "transports": 0,
    "hotels": 1,
    "cars": 0,
    "tickets": 0,
    "transfers": 0,
    "insurances": 0,
    "manuals": 0,
    "cruises": 0,
    "rideHailings": 0
  }
},
{
  "id": 3088010,
  "user": "icarranza@travelcompositor.com",
  "email": "icarranza@travelcompositor.com",
  "title": "Istanbul Test 1",
  "largeTitle": "Istanbul Test 1",
  "remarks": "<p>test remarks</p>",
  "imageUrl": "https://tr2storage.blob.core.windows.net/imagenes/82TPPeXVqJFS-1UavnqbbUFcK76m.png",
  "creationDate": "2022-07-18",
  "departureDate": "2022-08-26",
  "ideaUrl": "https://bookperfect.paquetedinamico.com/idea/brochure.xhtml?id=3088010&title=istanbul-test-1&lang=EN&agency=bookperfect",
  "themes": [
    "Cruises",
    "Stopover "
  ],
  "pricePerPerson": {
    "amount": 15.96,
    "currency": "EUR"
  },
  "totalPrice": {
    "amount": 31.92,
    "currency": "EUR"
  },
  "destinations": [
    {
      "code": "IST",
      "name": "Istanbul"
    }
  ],
  "itinerary": [],
  "userB2c": false,
  "counters": {
    "adults": 2,
    "children": 0,
    "destinations": 1,
    "closedTours": 0,
    "hotelNights": 1,
    "transports": 0,
    "hotels": 1,
    "cars": 0,
    "tickets": 0,
    "transfers": 0,
    "insurances": 0,
    "manuals": 0,
    "cruises": 0,
    "rideHailings": 0
  }
},
{
  "id": 3088010,
  "user": "icarranza@travelcompositor.com",
  "email": "icarranza@travelcompositor.com",
  "title": "Istanbul Test 1",
  "largeTitle": "Istanbul Test 1",
  "remarks": "<p>test remarks</p>",
  "imageUrl": "https://tr2storage.blob.core.windows.net/imagenes/82TPPeXVqJFS-1UavnqbbUFcK76m.png",
  "creationDate": "2022-07-18",
  "departureDate": "2022-08-26",
  "ideaUrl": "https://bookperfect.paquetedinamico.com/idea/brochure.xhtml?id=3088010&title=istanbul-test-1&lang=EN&agency=bookperfect",
  "themes": [
    "Cruises",
    "Stopover "
  ],
  "pricePerPerson": {
    "amount": 15.96,
    "currency": "EUR"
  },
  "totalPrice": {
    "amount": 31.92,
    "currency": "EUR"
  },
  "destinations": [
    {
      "code": "IST",
      "name": "Istanbul"
    }
  ],
  "itinerary": [],
  "userB2c": false,
  "counters": {
    "adults": 2,
    "children": 0,
    "destinations": 1,
    "closedTours": 0,
    "hotelNights": 1,
    "transports": 0,
    "hotels": 1,
    "cars": 0,
    "tickets": 0,
    "transfers": 0,
    "insurances": 0,
    "manuals": 0,
    "cruises": 0,
    "rideHailings": 0
  }
},
]


const SliderSettings = {
  className: "center",
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 2,
  // swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true
      }
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    }
  ],
};


export default HeroInputSearch;
