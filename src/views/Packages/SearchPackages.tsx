import React, { FC, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { goToPage } from '../../common/goToPage';
import { BrowserProperty, SectionBackground, TopInternationalDestinations, TravelBlog, TripIdeas } from '../../components';
import HeroHead from '../../components/HeroHeader/HeroHead';
import TopSearchResult from '../../components/SearchTop/TopSearchResult';
import { countries, exclusiveOffers, faqs, landingPageInfo, popularcities, staticPageText, tripIdeasData } from '../../store/actions';
import { DEMO_CATS, DEMO_CATS_1, IDEA_DATA_DEFAULT } from '../Homepage/Homepage';
import { useHistory } from 'react-router-dom';
import ExclusiveOffers from '../../components/ExclusiveOffers/ExclusiveOffers';
import MEMBERSHIP from '../../components/membership/membership';
import Popular from '../../components/Popular/Popular';
import { PopularData, POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';
import Disclosure from '../../components/Disclosure/Disclosure';
import FAQData from '../../data/FAQ';
import PackagesSearchForm from '../../components/HeroInputSearch/PackagesSearchForm';
import Loader from '../../components/Loader/Loader';
import pageInfo3 from '../../images/pageInfo3.svg';
import PageInfoBanner from '../../components/PageInfoBanner/PageInfoBanner';
import BASE_URL_HOME, { BASE_URL, MAILCHIMP_API_URL } from '../../api/env';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import { GENERAL_PACKAGES_PAGE_ID, PACKAGES_PAGE_ID } from '../../constants/pages';
import { ReactComponent as ItalyIcon } from '../../images/icons/CountryIcons/4-italy.svg'
import { ReactComponent as FranceIcon } from '../../images/icons/CountryIcons/1-france.svg'
import { ReactComponent as SpainIcon } from '../../images/icons/CountryIcons/2-spain.svg'
import { ReactComponent as UKIcon } from '../../images/icons/CountryIcons/5-england.svg'
import { ReactComponent as MexicoIcon } from '../../images/icons/CountryIcons/6-mexico.svg'
import { ReactComponent as ArgentinaIcon } from '../../images/icons/CountryIcons/7-argentina.svg'
import { ReactComponent as RussiaIcon } from '../../images/icons/CountryIcons/11-russia.svg'
import { ReactComponent as USAIcon } from '../../images/icons/CountryIcons/14-usa.svg'
import { ReactComponent as ThailandIcon } from '../../images/icons/CountryIcons/9-tailand.svg'
import { ReactComponent as ChileIcon } from '../../images/icons/CountryIcons/10-chile.svg'
import { ReactComponent as GreeceIcon } from '../../images/icons/CountryIcons/17-greece.svg'
import { ReactComponent as HongKongIcon } from '../../images/icons/CountryIcons/20-hong-kong.svg'
import { ReactComponent as PortugalIcon } from '../../images/icons/CountryIcons/3-portugal.svg'
import { ReactComponent as NetherlandsIcon } from '../../images/icons/CountryIcons/8-holland.svg'
import { ReactComponent as CubaIcon } from '../../images/icons/CountryIcons/12-cuba.svg'
import { ReactComponent as AustraliaIcon } from '../../images/icons/CountryIcons/13-austrilia.svg'

import { ReactComponent as BeachHolydays } from '../../images/icons/PacakgesIcons/1-beach-tatil.svg'
import { ReactComponent as Honeymoon } from '../../images/icons/PacakgesIcons/2-honeymoon.svg'
import { ReactComponent as NovaPlaza } from '../../images/icons/PacakgesIcons/3-nova-plaza.svg'
import { ReactComponent as WeekendGateway } from '../../images/icons/PacakgesIcons/4-weekend-gate.svg'
import { ReactComponent as CityBreaks } from '../../images/icons/PacakgesIcons/5-city-breaks.svg'
import { ReactComponent as Family } from '../../images/icons/PacakgesIcons/6-family.svg'
import { ReactComponent as Luxury } from '../../images/icons/PacakgesIcons/9-luxury.svg'
import { ReactComponent as Gastronomy } from '../../images/icons/PacakgesIcons/11-gastronomy.svg'
import { ReactComponent as History } from '../../images/icons/PacakgesIcons/12-history.svg'
import { ReactComponent as Wine } from '../../images/icons/PacakgesIcons/16-food&wine.svg'
import { ReactComponent as BlueCruise } from '../../images/icons/PacakgesIcons/7-blue-trip.svg'
import { ReactComponent as EventAndVenue } from '../../images/icons/PacakgesIcons/13-event&venue.svg'
import { ReactComponent as AirPortTransfer } from '../../images/icons/PacakgesIcons/14-airport-transfer.svg'




export interface Tabs_Actions_Props {
  action: any;
}

const SearchPackages: FC<Tabs_Actions_Props> = ({ action }) => {
  // const pathname = useHistory().location.pathname;

  const trip_ideas: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.tripideas);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const activeColor = useSelector((state: any) => state.packageColorActiveReducer);
  const exclusiveoffers: any = useSelector((state: { ExclusiveOffersReducer: any; }) => state.ExclusiveOffersReducer.exclusiveoffers);
  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const landingpageinfo = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.landingpageinfo);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);
  const scrolltotarget = useSelector((state: { ScrollToViewReducer: any; }) => state.ScrollToViewReducer.scrolltotarget);

  const [selectedThemeCategory, setSelectedThemeCategory] = useState();
  const [ selectedDestinationCategory, setSelectedDestinationCategory ] = useState()
  const dispatch = useDispatch();

  const yOffset = -90;

  const IDEA_DATA = (trip_ideas && trip_ideas.idea) ?? IDEA_DATA_DEFAULT;

  // ${activeColor.status=='Beach Holidays'?'#F75847':'#3F4249'}
  // Nameclass:'text-[#F75847]',
  // borderClass:'border-b-[#F75847]',
  
  const DEST_CATEGORIES = [
    {
      name: 'Stopover ',
      status: activeColor[0].status == 'Stopover ' ? true : false,
      icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_6006_484" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
          <rect width="34" height="34" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_6006_484)">
          <path d="M27.3062 28.6522L18.8062 20.1522L20.4354 18.523L28.9354 27.023C29.1715 27.2592 29.2896 27.5307 29.2896 27.8376C29.2896 28.1446 29.1715 28.4161 28.9354 28.6522C28.6993 28.8883 28.4278 29.0064 28.1208 29.0064C27.8139 29.0064 27.5424 28.8883 27.3062 28.6522ZM7.04792 26.7397C6.10347 25.4647 5.40104 24.0953 4.94062 22.6314C4.48021 21.1675 4.25 19.6918 4.25 18.2043C4.25 16.3626 4.59236 14.5682 5.27708 12.821C5.96181 11.0737 7.00069 9.5036 8.39375 8.11055C9.78681 6.71749 11.3628 5.6786 13.1219 4.99388C14.8809 4.30916 16.6812 3.9668 18.5229 3.9668C20.0104 3.9668 21.4802 4.1911 22.9323 4.63971C24.3844 5.08832 25.7479 5.78485 27.0229 6.7293C27.3299 6.96541 27.4951 7.27235 27.5187 7.65013C27.5424 8.02791 27.4125 8.35846 27.1292 8.6418L8.925 26.846C8.64167 27.1293 8.31701 27.2592 7.95104 27.2355C7.58507 27.2119 7.28403 27.0467 7.04792 26.7397ZM8.03958 24.6855L10.4833 22.2064C10.1056 21.6869 9.72778 21.1262 9.35 20.5241C8.97222 19.922 8.62396 19.2845 8.30521 18.6116C7.98646 17.9387 7.72083 17.2421 7.50833 16.522C7.29583 15.8019 7.15417 15.064 7.08333 14.3085C6.44583 16.0557 6.22743 17.8383 6.42812 19.6564C6.62882 21.4744 7.16597 23.1508 8.03958 24.6855ZM12.1833 20.6126L20.8958 11.8293C19.8097 10.9793 18.7059 10.3123 17.5844 9.82825C16.4628 9.34423 15.3944 9.02548 14.3792 8.872C13.3639 8.71853 12.4608 8.71853 11.6698 8.872C10.8788 9.02548 10.2708 9.31471 9.84583 9.73971C9.42083 10.1647 9.14931 10.7727 9.03125 11.5637C8.91319 12.3546 8.94271 13.2401 9.11979 14.2199C9.29688 15.1998 9.63924 16.2387 10.1469 17.3366C10.6545 18.4345 11.3333 19.5265 12.1833 20.6126ZM25.0396 7.75638C23.4812 6.76471 21.7872 6.18624 19.9573 6.02096C18.1274 5.85569 16.3389 6.11541 14.5917 6.80013C15.3 6.87096 16.0024 7.01263 16.699 7.22513C17.3955 7.43763 18.0802 7.69145 18.7531 7.98659C19.426 8.28173 20.0753 8.61819 20.701 8.99596C21.3267 9.37374 21.9229 9.77513 22.4896 10.2001L25.0396 7.75638Z" fill={activeColor[0].status == 'Stopover ' ? '#F75847' : '#3F4249'} />
        </g>
      </svg>

    },
    {
      name: 'Beach Holidays',
      status: activeColor[0].status == 'Beach Holidays' ? true : false,
      icon: <BeachHolydays className={`w-[34px] h-[34px] ${activeColor[0].status == 'Beach Holidays' ? '!text-[#F75847]' : 'text-black'}`}/>

    },
    {
      name: 'Honeymoon',
      status: activeColor[0].status == 'Honeymoon' ? true : false,
      icon: <Honeymoon className={`w-[34px] h-[34px] ${activeColor[0].status == 'Honeymoon' ? '!text-[#F75847]' : 'text-black'}`}/>
    },
    {
      name: 'Health & Medecine',
      status: activeColor[0].status == 'Health & Medecine' ? true : false,
      icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_6006_489" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
          <rect width="34" height="34" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_6006_489)">
          <path d="M20.9667 29.503L12.3604 26.4572L6.02083 28.9717C5.61944 29.1842 5.22396 29.1724 4.83437 28.9363C4.44479 28.7002 4.25 28.346 4.25 27.8738V8.11133C4.25 7.80438 4.33854 7.53286 4.51562 7.29675C4.69271 7.06063 4.92292 6.88355 5.20625 6.7655L11.6521 4.49883C11.8882 4.42799 12.1243 4.39258 12.3604 4.39258C12.5965 4.39258 12.8326 4.42799 13.0688 4.49883L21.675 7.50925L27.9792 4.99466C28.3806 4.80577 28.776 4.82348 29.1656 5.04779C29.5552 5.27209 29.75 5.62036 29.75 6.09258V26.103C29.75 26.3627 29.6615 26.587 29.4844 26.7759C29.3073 26.9648 29.0889 27.1065 28.8292 27.2009L22.3833 29.503C22.1472 29.5738 21.9111 29.6092 21.675 29.6092C21.4389 29.6092 21.2028 29.5738 20.9667 29.503ZM20.4708 27.0947V9.20924L13.5292 6.87174V24.7572L20.4708 27.0947ZM22.5958 27.0947L27.625 25.4301V7.29675L22.5958 9.20924V27.0947ZM6.375 26.6697L11.4042 24.7572V6.87174L6.375 8.53633V26.6697Z" fill={activeColor[0].status == 'Health & Medecine' ? '#F75847' : '#3F4249'} />
        </g>
      </svg>

    },
    {
      name: 'Nova Plaza Hotels',
      status: activeColor[0].status == 'Nova Plaza Hotels' ? true : false,
      icon: <NovaPlaza className={`w-[34px] h-[34px] ${activeColor[0].status == 'Nova Plaza Hotels' ? '!text-[#F75847]' : 'text-black'}`}/>
    },
    {
      name: 'Weekend Gateways',
      status: activeColor[0].status == 'Weekend Gateways' ? true : false,
      icon: <WeekendGateway className={`w-[34px] h-[34px] ${activeColor[0].status == 'Weekend Gateways' ? '!text-[#F75847]' : 'text-black'}`} />
    },
    {
      name: 'City Breaks',
      status: activeColor[0].status == 'City Breaks' ? true : false,
      icon: <CityBreaks className={`w-[34px] h-[34px] ${activeColor[0].status == 'City Breaks' ? '!text-[#F75847]' : 'text-black'}`}/>
    },
    {
      name: 'Family',
      status: activeColor[0].status == 'Family' ? true : false,
      icon: <Family className={`w-[34px] h-[34px] ${activeColor[0].status == 'Family' ? '!text-[#F75847]' : 'text-black'}`} />
    },
    {
      name: 'Blue Cruise',
      status: activeColor[0].status == 'Blue Cruise' ? true : false,
      icon: <BlueCruise className={`w-[34px] h-[34px] ${activeColor[0].status == 'Family' ? '!text-[#F75847]' : 'text-black'}`} />
    },
    {
      name: 'Luxury',
      status: activeColor[0].status == 'Luxury' ? true : false,
      icon: <Luxury className={`w-[34px] h-[34px] ${activeColor[0].status == 'Luxury' ? '!text-[#F75847]' : 'text-black'}`}/>

    },
    {
      name: 'Adventure',
      status: activeColor[0].status == 'Adventure' ? true : false,
      icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_6006_1238" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
          <rect width="34" height="34" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_6006_1238)">
          <path d="M4.95898 31.166C4.36871 31.166 3.86697 30.9594 3.45378 30.5462C3.04058 30.133 2.83398 29.6313 2.83398 29.041V16.6452C2.83398 16.3382 2.93433 16.0844 3.13503 15.8837C3.33572 15.683 3.58954 15.5827 3.89648 15.5827C4.20343 15.5827 4.45725 15.683 4.65794 15.8837C4.85864 16.0844 4.95898 16.3382 4.95898 16.6452V18.416H8.74857L13.0694 4.10768V2.47852C13.0694 2.17157 13.1697 1.91775 13.3704 1.71706C13.5711 1.51636 13.825 1.41602 14.1319 1.41602C14.4388 1.41602 14.6927 1.51636 14.8934 1.71706C15.0941 1.91775 15.1944 2.17157 15.1944 2.47852V4.24935H18.7715V2.47852C18.7715 2.17157 18.8718 1.91775 19.0725 1.71706C19.2732 1.51636 19.527 1.41602 19.834 1.41602C20.1409 1.41602 20.3947 1.51636 20.5954 1.71706C20.7961 1.91775 20.8965 2.17157 20.8965 2.47852V3.9306L25.2527 18.416H29.0423V16.6452C29.0423 16.3382 29.1427 16.0844 29.3434 15.8837C29.5441 15.683 29.7979 15.5827 30.1048 15.5827C30.4118 15.5827 30.6656 15.683 30.8663 15.8837C31.067 16.0844 31.1673 16.3382 31.1673 16.6452V29.041C31.1673 29.6313 30.9607 30.133 30.5475 30.5462C30.1343 30.9594 29.6326 31.166 29.0423 31.166H18.7715V23.7285H15.2298V31.166H4.95898ZM11.8652 15.5827H22.1361L21.0736 12.041H12.9277L11.8652 15.5827ZM13.5652 9.91602H20.4361L19.3736 6.37435H14.6277L13.5652 9.91602ZM4.95898 29.041H13.1048V21.6035H20.8965V29.041H29.0423V20.541H23.6236L22.7736 17.7077H11.2277L10.3777 20.541H4.95898V29.041Z" fill={activeColor[0].status == 'Adventure' ? '#F75847' : '#3F4249'} />
        </g>
      </svg>
    },
    {
      name: 'Gastronomy',
      status: activeColor[0].status == 'Gastronomy' ? true : false,
      icon: <Gastronomy className={`w-[34px] h-[34px] ${activeColor[0].status == 'Gastronomy&Wine' ? '!text-[#F75847]' : 'text-black'}`} />
    },
    // {
    //   name: 'Romantic',
    //   status: activeColor[0].status == 'Romantic' ? true : false,
    //   icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <mask id="mask0_6006_499" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
    //       <rect width="34" height="34" fill="#D9D9D9" />
    //     </mask>
    //     <g mask="url(#mask0_6006_499)">
    //       <path d="M10.165 31.1319C9.45664 31.1319 8.85456 30.884 8.35872 30.3882C7.86289 29.8923 7.61497 29.2902 7.61497 28.5819C7.61497 27.8736 7.86289 27.2715 8.35872 26.7757C8.85456 26.2798 9.45664 26.0319 10.165 26.0319C10.8497 26.0319 11.4459 26.2798 11.9535 26.7757C12.4612 27.2715 12.715 27.8736 12.715 28.5819C12.715 29.2902 12.4671 29.8923 11.9712 30.3882C11.4754 30.884 10.8733 31.1319 10.165 31.1319ZM24.3316 31.1319C23.6233 31.1319 23.0212 30.884 22.5254 30.3882C22.0296 29.8923 21.7816 29.2902 21.7816 28.5819C21.7816 27.8736 22.0296 27.2715 22.5254 26.7757C23.0212 26.2798 23.6233 26.0319 24.3316 26.0319C25.0164 26.0319 25.6125 26.2798 26.1202 26.7757C26.6278 27.2715 26.8816 27.8736 26.8816 28.5819C26.8816 29.2902 26.6337 29.8923 26.1379 30.3882C25.6421 30.884 25.04 31.1319 24.3316 31.1319ZM8.32331 7.7569L12.2191 15.8319H22.4191L26.8462 7.7569H8.32331ZM9.81081 23.7652C8.81914 23.7652 8.1049 23.4347 7.6681 22.7736C7.23129 22.1125 7.2372 21.3687 7.68581 20.5423L9.95247 16.3632L4.56914 4.95898H2.83372C2.55039 4.95898 2.30838 4.85273 2.10768 4.64023C1.90699 4.42773 1.80664 4.16801 1.80664 3.86107C1.80664 3.57773 1.90699 3.33572 2.10768 3.13503C2.30838 2.93433 2.5622 2.83398 2.86914 2.83398H5.27747C5.48997 2.83398 5.67886 2.88711 5.84414 2.99336C6.00942 3.09961 6.13928 3.24718 6.23372 3.43607L7.26081 5.6319H28.1212C28.8768 5.6319 29.3549 5.86211 29.5556 6.32253C29.7563 6.78294 29.6914 7.29648 29.3608 7.86315L24.5796 16.4694C24.3434 16.8708 24.0129 17.2191 23.5879 17.5142C23.1629 17.8093 22.7025 17.9569 22.2066 17.9569H11.4754L9.49206 21.6402H25.8546C26.1379 21.6402 26.3799 21.7465 26.5806 21.959C26.7813 22.1715 26.8816 22.4194 26.8816 22.7027C26.8816 23.0097 26.7813 23.2635 26.5806 23.4642C26.3799 23.6649 26.1261 23.7652 25.8191 23.7652H9.81081Z" fill={activeColor[0].status == 'Romantic' ? '#F75847' : '#3F4249'} />
    //     </g>
    //   </svg>
    // },
    {
      name: 'History',
      status: activeColor[0].status == 'History' ? true : false,
      icon: <History className={`w-[34px] h-[34px] ${activeColor[0].status == 'Food&History' ? '!text-[#F75847]' : 'text-black'}`}/> 
    },
    {
      name: 'Event & Venue',
      status: activeColor[0].status == 'Event & Venue' ? true : false,
      icon: <EventAndVenue className={`w-[34px] h-[34px] ${activeColor[0].status == 'Food&History' ? '!text-[#F75847]' : 'text-black'}`}/> 
    },
    {
      name: 'Airport Transfers',
      status: activeColor[0].status == 'Airport Transfers' ? true : false,
      icon: <AirPortTransfer className={`w-[34px] h-[34px] ${activeColor[0].status == 'Food&History' ? '!text-[#F75847]' : 'text-black'}`}/> 
    },
    {
      name: 'Coast',
      status: activeColor[0].status == 'Coast' ? true : false,
      icon: <BeachHolydays className={`w-[34px] h-[34px] ${activeColor[0].status == 'Food&History' ? '!text-[#F75847]' : 'text-black'}`}/> 
    },
    {
      name: 'Food&Wine',
      status: activeColor[0].status == 'Food&Wine' ? true : false,
      icon: <Wine className={`w-[34px] h-[34px] dark:text-white ${activeColor[0].status == 'Food&Wine' ? '!text-[#F75847]' : 'text-black'}`}/>
    },
    // {
    //   name: 'Winter',
    //   status: activeColor[0].status == 'Winter' ? true : false,
    //   icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <mask id="mask0_6006_2692" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
    //       <rect width="34" height="34" fill="#D9D9D9" />
    //     </mask>
    //     <g mask="url(#mask0_6006_2692)">
    //       <path d="M15.5486 28.4747L13.6715 26.7393C10.7437 24.024 8.20551 21.4327 6.0569 18.9654C3.90829 16.498 2.83398 13.9185 2.83398 11.2268C2.83398 9.10182 3.54822 7.32509 4.97669 5.89661C6.40517 4.46814 8.1701 3.75391 10.2715 3.75391C11.4757 3.75391 12.668 4.04314 13.8486 4.62161C15.0291 5.20009 16.0798 6.15043 17.0007 7.47266C18.0395 6.15043 19.1138 5.20009 20.2236 4.62161C21.3333 4.04314 22.502 3.75391 23.7298 3.75391C25.8312 3.75391 27.5961 4.46814 29.0246 5.89661C30.4531 7.32509 31.1673 9.10182 31.1673 11.2268C31.1673 13.9185 30.093 16.498 27.9444 18.9654C25.7958 21.4327 23.2576 24.024 20.3298 26.7393L18.4527 28.4747C18.0513 28.8525 17.5673 29.0414 17.0007 29.0414C16.434 29.0414 15.95 28.8525 15.5486 28.4747ZM16.0798 9.81016C15.4423 8.65321 14.6041 7.70877 13.5652 6.97682C12.5263 6.24488 11.4284 5.87891 10.2715 5.87891C8.71315 5.87891 7.43815 6.38064 6.44648 7.38411C5.45482 8.38759 4.95898 9.66849 4.95898 11.2268C4.95898 12.5963 5.4194 14.0306 6.34023 15.5299C7.26107 17.0293 8.35898 18.4872 9.63399 19.9039C10.909 21.3206 12.2312 22.6369 13.6007 23.8529C14.9701 25.0688 16.1034 26.09 17.0007 26.9164C17.8979 26.1136 19.0312 25.0984 20.4007 23.8706C21.7701 22.6428 23.0923 21.3147 24.3673 19.8862C25.6423 18.4577 26.7402 16.9938 27.6611 15.4945C28.5819 13.9952 29.0423 12.5727 29.0423 11.2268C29.0423 9.66849 28.5406 8.38759 27.5371 7.38411C26.5336 6.38064 25.2645 5.87891 23.7298 5.87891C22.5493 5.87891 21.4454 6.23898 20.4184 6.95911C19.3913 7.67925 18.5354 8.6296 17.8507 9.81016C17.7326 9.99904 17.6027 10.1348 17.4611 10.2174C17.3194 10.3001 17.1541 10.3414 16.9652 10.3414C16.7763 10.3414 16.6052 10.3001 16.4517 10.2174C16.2982 10.1348 16.1743 9.99904 16.0798 9.81016Z" fill={activeColor[0].status == 'Winter' ? '#F75847' : '#3F4249'} />
    //     </g>
    //   </svg>
    // },
    // {
    //   name: 'Cruises',
    //   status: activeColor[0].status == 'Cruises' ? true : false,
    //   icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <mask id="mask0_6006_504" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
    //       <rect width="34" height="34" fill="#D9D9D9" />
    //     </mask>
    //     <g mask="url(#mask0_6006_504)">
    //       <path d="M12.0768 31.6266C10.9435 31.6266 9.94002 31.2901 9.06641 30.6172C8.1928 29.9443 7.57891 29.0766 7.22474 28.0141C6.84696 28.628 6.38655 29.1061 5.84349 29.4484C5.30043 29.7908 4.65113 29.962 3.89557 29.962C2.78585 29.962 1.86502 29.5724 1.13307 28.7932C0.401129 28.0141 0.0351562 27.0932 0.0351562 26.0307C0.0351562 24.8738 0.395226 23.9589 1.11536 23.2859C1.8355 22.613 2.75043 22.2648 3.86016 22.2411C3.43516 21.7689 3.1046 21.22 2.86849 20.5943C2.63238 19.9686 2.51432 19.337 2.51432 18.6995C2.51432 17.8023 2.74453 16.9641 3.20495 16.1849C3.66536 15.4057 4.32057 14.78 5.17057 14.3078C5.28863 14.6148 5.4362 14.9453 5.61328 15.2995C5.79036 15.6536 5.97335 15.9606 6.16224 16.2203C5.69002 16.5273 5.31814 16.905 5.04661 17.3536C4.77509 17.8023 4.63932 18.2745 4.63932 18.7703C4.63932 20.187 5.21189 21.0783 6.35703 21.4443C7.50217 21.8102 8.60599 22.0995 9.66849 22.312L10.0581 22.9849C9.77474 23.8113 9.54453 24.4901 9.36745 25.0214C9.19036 25.5526 9.10182 26.0425 9.10182 26.4911C9.10182 27.2939 9.40287 27.9964 10.0049 28.5984C10.607 29.2005 11.3095 29.5016 12.1122 29.5016C12.9622 29.5016 13.6824 29.1769 14.2727 28.5276C14.8629 27.8783 15.3529 27.0873 15.7424 26.1547C16.132 25.222 16.4449 24.2363 16.681 23.1974C16.9171 22.1585 17.106 21.2377 17.2477 20.4349C17.2949 20.128 17.4424 19.8918 17.6904 19.7266C17.9383 19.5613 18.2039 19.5141 18.4872 19.5849C18.7942 19.6793 19.0185 19.8623 19.1602 20.1339C19.3018 20.4054 19.3372 20.7064 19.2664 21.037C19.0539 22.0759 18.8001 23.2151 18.5049 24.4547C18.2098 25.6943 17.7966 26.8453 17.2654 27.9078C16.7341 28.9703 16.0553 29.8557 15.2289 30.5641C14.4025 31.2724 13.3518 31.6266 12.0768 31.6266ZM3.93099 27.837C4.42682 27.837 4.84592 27.6658 5.18828 27.3234C5.53064 26.9811 5.70182 26.562 5.70182 26.0661C5.70182 25.5703 5.53064 25.1512 5.18828 24.8089C4.84592 24.4665 4.42682 24.2953 3.93099 24.2953C3.43516 24.2953 3.01606 24.4665 2.6737 24.8089C2.33134 25.1512 2.16016 25.5703 2.16016 26.0661C2.16016 26.562 2.33134 26.9811 2.6737 27.3234C3.01606 27.6658 3.43516 27.837 3.93099 27.837ZM15.3352 20.3286C15.099 20.5648 14.8098 20.6651 14.4674 20.6297C14.1251 20.5943 13.824 20.4585 13.5643 20.2224C11.7227 18.546 10.2411 17.0408 9.11953 15.7068C7.998 14.3727 7.43724 12.9266 7.43724 11.3682C7.43724 9.95156 7.93307 8.7474 8.92474 7.75573C9.91641 6.76406 11.1206 6.26823 12.5372 6.26823C12.7497 6.26823 12.9504 6.27413 13.1393 6.28594C13.3282 6.29774 13.5171 6.32726 13.706 6.37448C13.4935 5.97309 13.34 5.63073 13.2456 5.3474C13.1511 5.06406 13.1039 4.78073 13.1039 4.4974C13.1039 3.41128 13.4817 2.49045 14.2372 1.7349C14.9928 0.97934 15.9136 0.601563 16.9997 0.601562C18.0859 0.601562 19.0067 0.97934 19.7622 1.7349C20.5178 2.49045 20.8956 3.41128 20.8956 4.4974C20.8956 4.75712 20.8543 5.03455 20.7716 5.32969C20.689 5.62483 20.5296 5.97309 20.2935 6.37448C20.4824 6.32726 20.6713 6.29774 20.8602 6.28594C21.049 6.27413 21.2497 6.26823 21.4622 6.26823C22.8081 6.26823 23.9473 6.69913 24.8799 7.56094C25.8126 8.42274 26.3497 9.49115 26.4914 10.7661C26.1609 10.7425 25.8067 10.7366 25.4289 10.7484C25.0511 10.7602 24.697 10.7898 24.3664 10.837C24.2484 10.1286 23.9296 9.54427 23.4102 9.08385C22.8907 8.62344 22.2414 8.39323 21.4622 8.39323C20.5886 8.39323 19.898 8.63524 19.3904 9.11927C18.8827 9.6033 18.2039 10.3411 17.3539 11.3328H16.6102C15.7365 10.2939 15.0459 9.54427 14.5383 9.08385C14.0306 8.62344 13.3636 8.39323 12.5372 8.39323C11.6872 8.39323 10.9789 8.67656 10.4122 9.24323C9.84557 9.8099 9.56224 10.5182 9.56224 11.3682C9.56224 12.4307 10.0581 13.5405 11.0497 14.6974C12.0414 15.8543 13.4109 17.212 15.1581 18.7703C15.4178 18.9828 15.5654 19.2425 15.6008 19.5495C15.6362 19.8564 15.5477 20.1161 15.3352 20.3286ZM16.9997 6.26823C17.4956 6.26823 17.9147 6.09705 18.257 5.75469C18.5994 5.41233 18.7706 4.99323 18.7706 4.4974C18.7706 4.00156 18.5994 3.58247 18.257 3.2401C17.9147 2.89774 17.4956 2.72656 16.9997 2.72656C16.5039 2.72656 16.0848 2.89774 15.7424 3.2401C15.4001 3.58247 15.2289 4.00156 15.2289 4.4974C15.2289 4.99323 15.4001 5.41233 15.7424 5.75469C16.0848 6.09705 16.5039 6.26823 16.9997 6.26823ZM21.8872 31.662C21.3678 31.662 20.8543 31.5793 20.3466 31.4141C19.839 31.2488 19.349 31.0009 18.8768 30.6703C19.0657 30.387 19.2546 30.0682 19.4435 29.7141C19.6324 29.3599 19.7859 29.0293 19.9039 28.7224C20.2345 28.9821 20.5709 29.1769 20.9133 29.3068C21.2556 29.4366 21.6039 29.5016 21.9581 29.5016C22.7845 29.5016 23.4869 29.2005 24.0654 28.5984C24.6438 27.9964 24.9331 27.2939 24.9331 26.4911C24.9331 26.0189 24.8386 25.5172 24.6497 24.9859C24.4609 24.4547 24.2365 23.7877 23.9768 22.9849L24.3664 22.312C25.4525 22.1231 26.5622 21.8457 27.6956 21.4797C28.8289 21.1137 29.3956 20.2224 29.3956 18.8057C29.3956 17.7668 29.0178 16.9936 28.2622 16.4859C27.5067 15.9783 26.6685 15.7245 25.7477 15.7245C24.8504 15.7245 23.8174 15.878 22.6487 16.1849C21.4799 16.4918 20.14 16.8814 18.6289 17.3536C18.322 17.4481 18.0327 17.4363 17.7612 17.3182C17.4897 17.2002 17.3185 16.9877 17.2477 16.6807C17.1768 16.3974 17.224 16.1259 17.3893 15.8661C17.5546 15.6064 17.8025 15.4175 18.1331 15.2995C19.6678 14.8036 21.055 14.3964 22.2945 14.0776C23.5341 13.7589 24.6852 13.5995 25.7477 13.5995C27.2588 13.5995 28.5987 14.054 29.7675 14.963C30.9362 15.872 31.5206 17.1411 31.5206 18.7703C31.5206 19.4078 31.4025 20.0335 31.1664 20.6474C30.9303 21.2613 30.5997 21.8043 30.1747 22.2766C31.2609 22.3002 32.1699 22.6543 32.9018 23.3391C33.6338 24.0238 33.9997 24.9328 33.9997 26.0661C33.9997 27.1286 33.6338 28.0495 32.9018 28.8286C32.1699 29.6078 31.249 29.9974 30.1393 29.9974C29.4074 29.9974 28.7581 29.8262 28.1914 29.4839C27.6247 29.1415 27.1643 28.6634 26.8102 28.0495C26.4324 29.112 25.8067 29.9797 24.9331 30.6526C24.0595 31.3255 23.0442 31.662 21.8872 31.662ZM30.1393 27.8724C30.6115 27.8724 31.0188 27.7012 31.3612 27.3589C31.7036 27.0165 31.8747 26.5974 31.8747 26.1016C31.8747 25.6293 31.6977 25.2102 31.3435 24.8443C30.9893 24.4783 30.5761 24.2953 30.1039 24.2953C29.6317 24.2953 29.2185 24.4724 28.8643 24.8266C28.5102 25.1807 28.3331 25.5939 28.3331 26.0661C28.3331 26.5384 28.5161 26.9575 28.882 27.3234C29.248 27.6894 29.6671 27.8724 30.1393 27.8724Z" fill={activeColor[0].status == 'Cruises' ? '#F75847' : '#3F4249'} />
    //     </g>
    //   </svg>
    // },
    // {
    //   name: 'Shopping',
    //   status: activeColor[0].status == 'Shopping' ? true : false,
    //   icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <mask id="mask0_6006_499" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
    //       <rect width="34" height="34" fill="#D9D9D9" />
    //     </mask>
    //     <g mask="url(#mask0_6006_499)">
    //       <path d="M10.165 31.1319C9.45664 31.1319 8.85456 30.884 8.35872 30.3882C7.86289 29.8923 7.61497 29.2902 7.61497 28.5819C7.61497 27.8736 7.86289 27.2715 8.35872 26.7756C8.85456 26.2798 9.45664 26.0319 10.165 26.0319C10.8497 26.0319 11.4459 26.2798 11.9535 26.7756C12.4612 27.2715 12.715 27.8736 12.715 28.5819C12.715 29.2902 12.4671 29.8923 11.9712 30.3882C11.4754 30.884 10.8733 31.1319 10.165 31.1319ZM24.3316 31.1319C23.6233 31.1319 23.0212 30.884 22.5254 30.3882C22.0296 29.8923 21.7816 29.2902 21.7816 28.5819C21.7816 27.8736 22.0296 27.2715 22.5254 26.7756C23.0212 26.2798 23.6233 26.0319 24.3316 26.0319C25.0164 26.0319 25.6125 26.2798 26.1202 26.7756C26.6278 27.2715 26.8816 27.8736 26.8816 28.5819C26.8816 29.2902 26.6337 29.8923 26.1379 30.3882C25.6421 30.884 25.04 31.1319 24.3316 31.1319ZM8.32331 7.7569L12.2191 15.8319H22.4191L26.8462 7.7569H8.32331ZM9.81081 23.7652C8.81914 23.7652 8.1049 23.4347 7.6681 22.7736C7.23129 22.1125 7.2372 21.3687 7.68581 20.5423L9.95247 16.3632L4.56914 4.95898H2.83372C2.55039 4.95898 2.30838 4.85273 2.10768 4.64023C1.90699 4.42773 1.80664 4.16801 1.80664 3.86107C1.80664 3.57773 1.90699 3.33572 2.10768 3.13503C2.30838 2.93433 2.5622 2.83398 2.86914 2.83398H5.27747C5.48997 2.83398 5.67886 2.88711 5.84414 2.99336C6.00942 3.09961 6.13928 3.24718 6.23372 3.43607L7.26081 5.6319H28.1212C28.8768 5.6319 29.3549 5.86211 29.5556 6.32253C29.7563 6.78294 29.6914 7.29648 29.3608 7.86315L24.5796 16.4694C24.3434 16.8708 24.0129 17.2191 23.5879 17.5142C23.1629 17.8093 22.7025 17.9569 22.2066 17.9569H11.4754L9.49206 21.6402H25.8546C26.1379 21.6402 26.3799 21.7465 26.5806 21.959C26.7813 22.1715 26.8816 22.4194 26.8816 22.7027C26.8816 23.0097 26.7813 23.2635 26.5806 23.4642C26.3799 23.6649 26.1261 23.7652 25.8191 23.7652H9.81081Z" fill={activeColor[0].status == 'Shopping' ? '#F75847' : '#3F4249'} />
    //     </g>
    //   </svg>

    // },
    // {
    //   name: 'Adventure',
    //   status: activeColor[0].status == 'Adventure' ? true : false,
    //   icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <mask id="mask0_6006_1238" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
    //       <rect width="34" height="34" fill="#D9D9D9" />
    //     </mask>
    //     <g mask="url(#mask0_6006_1238)">
    //       <path d="M4.95898 31.166C4.36871 31.166 3.86697 30.9594 3.45378 30.5462C3.04058 30.133 2.83398 29.6313 2.83398 29.041V16.6452C2.83398 16.3382 2.93433 16.0844 3.13503 15.8837C3.33572 15.683 3.58954 15.5827 3.89648 15.5827C4.20343 15.5827 4.45725 15.683 4.65794 15.8837C4.85864 16.0844 4.95898 16.3382 4.95898 16.6452V18.416H8.74857L13.0694 4.10768V2.47852C13.0694 2.17157 13.1697 1.91775 13.3704 1.71706C13.5711 1.51636 13.825 1.41602 14.1319 1.41602C14.4388 1.41602 14.6927 1.51636 14.8934 1.71706C15.0941 1.91775 15.1944 2.17157 15.1944 2.47852V4.24935H18.7715V2.47852C18.7715 2.17157 18.8718 1.91775 19.0725 1.71706C19.2732 1.51636 19.527 1.41602 19.834 1.41602C20.1409 1.41602 20.3947 1.51636 20.5954 1.71706C20.7961 1.91775 20.8965 2.17157 20.8965 2.47852V3.9306L25.2527 18.416H29.0423V16.6452C29.0423 16.3382 29.1427 16.0844 29.3434 15.8837C29.5441 15.683 29.7979 15.5827 30.1048 15.5827C30.4118 15.5827 30.6656 15.683 30.8663 15.8837C31.067 16.0844 31.1673 16.3382 31.1673 16.6452V29.041C31.1673 29.6313 30.9607 30.133 30.5475 30.5462C30.1343 30.9594 29.6326 31.166 29.0423 31.166H18.7715V23.7285H15.2298V31.166H4.95898ZM11.8652 15.5827H22.1361L21.0736 12.041H12.9277L11.8652 15.5827ZM13.5652 9.91602H20.4361L19.3736 6.37435H14.6277L13.5652 9.91602ZM4.95898 29.041H13.1048V21.6035H20.8965V29.041H29.0423V20.541H23.6236L22.7736 17.7077H11.2277L10.3777 20.541H4.95898V29.041Z" fill={activeColor[0].status == 'Adventure' ? '#F75847' : '#3F4249'} />
    //     </g>
    //   </svg>
    // },
  ];

  // trip ideas by destination catgories
  const TRIP_IDEAS_BY_DESTINATION_CATEGORIES = [
    {
      name: 'Singapore',
      status:'',
      icon: <ThailandIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'France',
      status:'',
      icon: <FranceIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Portugal',
      status:'',
      icon: <PortugalIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Spain',
      status:'',
      icon: <SpainIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Italy',
      status:'',
      icon: <ItalyIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'United Kingdom',
      status:'',
      icon: <UKIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'México',
      status:'',
      icon: <MexicoIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Argentina',
      status:'',
      icon: <ArgentinaIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Netherlands',
      status:'',
      icon: <NetherlandsIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Thailand',
      status:'',
      icon: <ThailandIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Chile',
      status:'',
      icon: <ChileIcon className='w-[34px] h-[34px]' />
    },
    {
      name: 'Russia',
      status:'',
      icon: <RussiaIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Cuba',
      status:'',
      icon:  <CubaIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Australia',
      status:'',
      icon: <AustraliaIcon className='w-[34px] h-[34px]' />
    },
    {
      name: 'USA',
      status:'',
      icon: <USAIcon className='w-[34px] h-[34px]' />
    },
    {
      name: 'Cambodia',
      status:'',
      icon: ''
    },
    {
      name: 'Greece',
      status:'',
      icon: <GreeceIcon className='w-[34px] h-[34px]'/>
    },
    {
      name: 'Dubai | UAE',
      status:'',
      icon: ''
    },
    {
      name: 'Austria',
      status:'',
      icon: ''
    },
    {
      name: 'Hong kong',
      status:'',
      icon: <HongKongIcon className='w-[34px] h-[34px]'/>
    }
    
  ];

  // get trip idea data
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
      countries(
        POPULAR_COUNTRIES_CONTINENT_ID
      )
    );

    // get popular cities
    dispatch(
      popularcities()
    );

    // page infos
    dispatch(
      landingPageInfo(
        PACKAGES_PAGE_ID
      )
    );

    dispatch(
      faqs('160593')
    );

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_PACKAGES_PAGE_ID,
        activeLang
      )
    );

  }, []);

  // useEffect(() => {
  //   if(!faqsdata){
  //     dispatch(
  //       faqs('160593')
  //     );
  //   }
  // }, [faqsdata]);

  const _IDEA_DATA_FOR_TRAVEL_THEMES_CATEGORIES = selectedThemeCategory ? IDEA_DATA?.filter((idea: any) => idea.themes.includes(selectedThemeCategory)) : IDEA_DATA;
  const _IDEA_DATA_FOR_TRAVEL_DESTINATIONS_CATEGORIES = selectedDestinationCategory ? IDEA_DATA?.filter((idea: any) => idea.themes.includes(selectedDestinationCategory)) : IDEA_DATA;

  console.log('the tabs data synch problem: ', _IDEA_DATA_FOR_TRAVEL_THEMES_CATEGORIES)
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

  // scroll to products
  useEffect(() => {
    if (scrolltotarget && scrolltotarget != '') {
      const toView = document.getElementById(scrolltotarget) as HTMLInputElement | null;
      const scrollPosition = toView?.getBoundingClientRect()?.top! + window.pageYOffset + yOffset;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    };
  }, [scrolltotarget])

  return (
    <div>
      {/* <Loader data={
        Array.isArray(staticpagetext) && 
        staticpagetext.length > 0 &&
        staticpagetext[0] &&
        // staticpagetext[0].translations.packages &&
        // staticpagetext[0].translations.packages_description &&
        exclusiveoffers.length > 0 ? false : true} 
      /> */}

      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || Packages </title>
      </Helmet>

      <HeroHead
        className='hero-head-search-packages'
        searchCard='packages'
        headText={(staticpagetext && staticpagetext[0].translations.packages) ?? "Packages"}
        subText={(staticpagetext && staticpagetext[0].translations.packages_description)}
      />

      <PackagesSearchForm
        roundedTopLeft="rounded-tl-xl"
        // customStyle = {{width: '1050px', marginLeft: window.innerWidth > 1595 ? '120px' : '65px'}} 
        wrapperClassNames={"md:hidden"}
      />

      {/* exclusive offers */}
      <div className=''>
        <ExclusiveOffers data={exclusiveoffers} statictext={staticpagetext && staticpagetext[0].translations} />
      </div>

      {/* packages trip ideas */}
      <div id='packages' className='mt-[6vh]'>
        <TripIdeas
          ideaData={_IDEA_DATA_FOR_TRAVEL_THEMES_CATEGORIES}
          OnTripIdea={(data: any) => handleTripIdeas(data)}
          wrapperClassNames=""
          bgColor="bg-[#FFFFFF]"
          showMoreButton={false}
          navigationType="category"
          destCategories={DEST_CATEGORIES}
          onTabChange={(tab: any) => { setSelectedThemeCategory(tab.name) }}
          heading={(staticpagetext && staticpagetext[0].translations.trips_ideas) ?? 'Our Trips Ideas'}
          subHeading={(staticpagetext && staticpagetext[0].translations.trips_ideas_description) ?? 'Here you can see our trip ideas'}
          displayStyle='slider'
        />
      </div>

      {/* packages trip ideas by destinations */}
      <div id='packagesbydestinations' className='mt-[6vh]'>
        <TripIdeas
          ideaData={_IDEA_DATA_FOR_TRAVEL_DESTINATIONS_CATEGORIES}
          OnTripIdea={(data: any) => handleTripIdeas(data)}
          wrapperClassNames=""
          bgColor="bg-[#FFFFFF]"
          showMoreButton={false}
          navigationType="category"
          destCategories={TRIP_IDEAS_BY_DESTINATION_CATEGORIES}
          onTabChange={(tab: any) => { setSelectedDestinationCategory(tab.name) }}
          heading={(staticpagetext && staticpagetext[0].translations.trips_ideas_by_destination) ?? 'Trip Ideas By Destination'}
          subHeading={(staticpagetext && staticpagetext[0].translations.trips_ideas_description) ?? 'Here you can see our trip ideas'}
          displayStyle='slider'
        />
      </div>

      {
        landingpageinfo &&
        <div className='w-[100%] translate-y-[40px]'>
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
      <div className='py-[4vh]'>
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
        <div className="relative py-8 md:py-[5vh]">
          <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
          <Disclosure items={faqsdata && faqsdata[0].field_detail_cards} heading={(staticpagetext && staticpagetext[0].translations.frequently_asked_questions) ?? "Frequently Asked Questions"} />
        </div>
      }

      <div className="py-[4vh]">
        {/* <TravelBlog
          heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
          subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' } 
          customStyles="pt-[1.5vh]"
        /> */}
      </div>

    </div>
  )
}

export default SearchPackages;