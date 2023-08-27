import React, { useEffect, useState, FC, ReactNode, useRef, LegacyRef, useCallback } from "react";
import { Car, Home, Map, Photo, PlaneDeparture } from "tabler-icons-react";
import ActivitiesSearchForm from "./ActivitiesSearchForm";
// import "react-dates/initialize";
// import ExperiencesSearchForm from "./ExperiencesSearchForm";
// import StaySearchForm from "./StaySearchForm";
// import RentalCarSearchForm from "./RentalCarSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import FlightsHotelsSearchForm from "./FlightsHotelsSearchForm";
import HotelsSearchForm from "./HotelsSearchForm";
import TripDesignerSearchForm from "./TripDesignerSearch";
import { NavLink } from "react-router-dom";
import PackagesSearchForm from "./PackagesSearchForm";
import TransfersSearchForm from "./TransfersSearchForm";
import RoutingSearchForm from "./RoutingSearchForm";
import { useSelector, useDispatch } from "react-redux";
import { FIXLAYOUT } from "../../store/actions/layoutcontroller"
import { ReactComponent as ArrowRight } from "../../images/icons/arrow-right.svg";
import CarRentalSearchForm from "./CarRentalSearchForm";
import { useTranslation } from "react-i18next";
import { ToTranslationFormat } from "../../helpers";
import { Tooltip } from '@mantine/core';
import useWindowSize from "../../hooks/useWindowSize";
// export type SearchTab = "Trip Designer" | "Flights" | "Hotels" | "Flights + Hotels" | "Activities";

interface SearchTab {
  tabName: string;
  tabIcon: ReactNode;
};

export interface HomepageHeroSearchProps {
  className?: string;
  currentTab?: SearchTab;
  customContainer?: any;
  tabBgColor?: any;
  searchcardplace?: string;
  style?: string;
  tabStyle?: string;
  padding?: string;
  space?: string;
  textStyle?: string;
  id?: string;
  inputClassNames?: string;
  pls?: string;
  iconClassNames?: string;
  pl?: string;
  scrollButtonClassNames?: string;
  formbg?: string;
  renderStyle?: string;
};


const HomepageHeroSearch: FC<HomepageHeroSearchProps> = ({
  className = "",
  textStyle = "",
  style = "bigMd:w-[50%]",
  tabStyle = "",
  padding = "",
  space = "h-[61px]",
  pl,
  id,
  pls,
  iconClassNames,
  inputClassNames,
  currentTab = {
    tabName: "Trip Designer",
    tabIcon: <Map size={23} />
  },
  customContainer = "xl:mx-[10vw]",
  tabBgColor = 'bg-[#3944B3]',
  searchcardplace = '',
  scrollButtonClassNames = '',
  formbg = 'dark:bg-[#202232]',
  renderStyle = ''
}) => {

  const [activeTab, setActiveTab] = useState<SearchTab>(currentTab);
  // @ts-ignore
  const { t } = useTranslation()

  const [isMobile, setIsMobile] = useState(false);
  const windowSize = useWindowSize();

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
  },[windowSize])

  const theme = useSelector((state: any) => state.LightMode.mode);
  let pathname = window.location.pathname.split('/');
  // console.log('the hero search styles:  this is the window location: pathname', pathname)
  const tabs = [
    {
      tabName: "Trip Designer",
      tabIcon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.84961 11.3503L5.73285 10.1795C6.14288 10.9956 6.76372 11.9067 7.60256 12.9251C8.76014 14.3304 9.9017 15.4048 9.94975 15.4498L10.5585 16.0207L11.1672 15.4498C11.2153 15.4048 12.3568 14.3304 13.5144 12.9251C14.3948 11.8562 15.0334 10.9063 15.4417 10.0597L18.3448 11.3503L24.3881 7.59322V20.743L18.3448 24.5L9.89307 20.743L3.84961 24.5V11.3503ZM6.02035 8.03814C6.02035 5.53175 8.05219 3.5 10.5585 3.5C13.0648 3.5 15.0966 5.53175 15.0966 8.03814C15.0966 10.5445 10.5585 14.8008 10.5585 14.8008C10.5585 14.8008 6.02035 10.5444 6.02035 8.03814ZM10.5585 9.95127C11.6642 9.95127 12.5606 9.05486 12.5606 7.94915C12.5606 6.84345 11.6642 5.94703 10.5585 5.94703C9.45278 5.94703 8.55637 6.84345 8.55637 7.94915C8.55637 9.05486 9.45278 9.95127 10.5585 9.95127Z" fill={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Trip Designer' ? '#fff' : '#F75847') : '#BDC3FF'} />
      </svg>
    },
    {
      tabName: "Flights",
      tabIcon: <svg width="60" height="30" viewBox="0 0 61 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_6715_21245)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2214 23.7459L18.7477 20.9729L18.1324 20.1818L15.3633 16.6215C15.1592 16.3592 15.1229 15.985 15.2722 15.681L15.7968 14.6121C15.9874 14.2239 16.419 14.0667 16.7814 14.2536L24.3537 18.1584L25.5326 18.7662L32.241 16.5844C32.5341 16.488 32.839 16.4387 33.1449 16.4387C34.5349 16.4387 35.7832 17.4663 36.1807 18.9373C36.6798 20.7855 35.7234 22.7369 34.0489 23.2875L19.8457 27.8804C19.7764 27.9029 19.7048 27.914 19.6331 27.914C19.5716 27.914 19.5102 27.9058 19.45 27.8892L10.2521 25.3553C9.92111 25.2642 9.68652 24.9397 9.67943 24.5636C9.67216 24.1873 9.89428 23.8524 10.2214 23.7459ZM6.32583 20.2184L9.67926 21.9477L6.03181 23.134L5.31255 21.3064C5.18746 20.9884 5.25359 20.618 5.47874 20.3763C5.70397 20.1345 6.04126 20.0717 6.32583 20.2184Z" fill={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Flights' ? '#fff' : '#F75847') : '#BDC3FF'} />
        </g>
        <g clip-path="url(#clip1_6715_21245)">
          <path d="M42.5 19H53.5" stroke={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Flights' ? '#fff' : '#F75847') : '#BDC3FF'} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M48 13.5V24.5" stroke={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Flights' ? '#fff' : '#F75847') : '#BDC3FF'} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_6715_21245">
            <rect width="61" height="42" fill="white" />
          </clipPath>
          <clipPath id="clip1_6715_21245">
            <rect x="40" y="11" width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>

    },
    {
      tabName: "Hotels",
      tabIcon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.7569 9.74734H18.5403V6.34291C18.5403 5.93243 18.2076 5.59961 17.7973 5.59961H10.2027C9.79237 5.59961 9.45965 5.93243 9.45965 6.34291V9.74734H4.24308C3.83268 9.74734 3.5 10.0802 3.5 10.4906V21.6563C3.5 22.0668 3.83272 22.3996 4.24308 22.3996C5.16581 22.3996 22.9684 22.3996 23.7569 22.3996C24.1673 22.3996 24.5 22.0668 24.5 21.6563V10.4906C24.5 10.0802 24.1673 9.74734 23.7569 9.74734ZM8.02308 14.0584H6.42273C6.01237 14.0584 5.67965 13.7256 5.67965 13.3151C5.67965 12.9047 6.01233 12.5718 6.42273 12.5718H8.02304C8.4334 12.5718 8.76612 12.9046 8.76612 13.3151C8.76612 13.7257 8.43344 14.0584 8.02308 14.0584ZM17.0542 8.35985H15.7015C15.2912 8.35985 14.9585 8.69267 14.9585 9.10316C14.9585 9.51364 15.2911 9.84646 15.7015 9.84646H17.0542C17.0542 10.6441 17.0542 11.0158 17.0542 11.3826H15.7015C15.2912 11.3826 14.9585 11.7154 14.9585 12.1259C14.9585 12.5364 15.2911 12.8692 15.7015 12.8692H17.0542V14.4053H15.7015C15.2912 14.4053 14.9585 14.7381 14.9585 15.1486C14.9585 15.5591 15.2911 15.8919 15.7015 15.8919H17.0542V20.9131H16.2869V18.5678C16.2869 18.1573 15.9542 17.8245 15.5438 17.8245H12.4562C12.0459 17.8245 11.7131 18.1573 11.7131 18.5678V20.9131H10.9459V15.8919H12.2985C12.7089 15.8919 13.0416 15.5591 13.0416 15.1486C13.0416 14.7381 12.7089 14.4053 12.2985 14.4053H10.9459V12.8691H12.2985C12.7089 12.8691 13.0416 12.5363 13.0416 12.1258C13.0416 11.7153 12.7089 11.3825 12.2985 11.3825H10.9459C10.9459 10.85 10.9459 10.3859 10.9459 9.84638H12.2985C12.7089 9.84638 13.0416 9.5136 13.0416 9.10308C13.0416 8.69259 12.7089 8.35977 12.2985 8.35977H10.9459V7.08618H17.0542V8.35985ZM21.5773 14.0584H19.977C19.5666 14.0584 19.2339 13.7256 19.2339 13.3151C19.2339 12.9047 19.5666 12.5718 19.977 12.5718H21.5773C21.9876 12.5718 22.3203 12.9046 22.3203 13.3151C22.3203 13.7257 21.9876 14.0584 21.5773 14.0584Z" fill={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Hotels' ? '#fff' : '#F75847') : '#BDC3FF'} />
      </svg>

    },
    {
      tabName: "Flights + Hotels",
      tabIcon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4649 7.72564L5.13759 9.73508C4.89486 9.81221 4.73003 10.0549 4.73543 10.3275C4.74068 10.6001 4.91477 10.8352 5.16037 10.9012L11.9861 12.7374C12.0308 12.7494 12.0764 12.7554 12.122 12.7554C12.1751 12.7554 12.2283 12.7473 12.2797 12.731L22.8198 9.40289C24.0625 9.00392 24.7721 7.58987 24.4018 6.25062C24.1068 5.18471 23.1805 4.4401 22.149 4.4401C21.9219 4.4401 21.6957 4.47583 21.4782 4.54564L16.4999 6.12665L15.6251 5.6862L10.0057 2.85675C9.73679 2.72129 9.41652 2.83522 9.2751 3.11649L8.88577 3.89101C8.77499 4.11131 8.80192 4.38246 8.95336 4.57254L11.0083 7.15245L11.4649 7.72564ZM7.20588 8.03582L4.40013 6.59832C4.16203 6.47638 3.87983 6.52855 3.69138 6.72954C3.50301 6.93053 3.44767 7.23837 3.55233 7.50272L4.15413 9.02203L7.20588 8.03582ZM22.2742 15.7213H23.7714C24.1738 15.7213 24.5001 16.0216 24.5 16.3919V24.5292C24.5 24.8996 24.1737 25.1998 23.7713 25.1998H22.2741C21.8717 25.1998 21.5454 24.8996 21.5454 24.5292V23.1845H6.57853V24.5292C6.57853 24.8996 6.25228 25.1998 5.84985 25.1998H4.22868C3.82625 25.1998 3.5 24.8996 3.5 24.5292V13.426C3.5 13.0555 3.82625 12.7554 4.22868 12.7554H5.84985C6.25228 12.7554 6.57853 13.0555 6.57853 13.426V16.1083C6.62662 16.1043 6.67511 16.1015 6.72427 16.1015H10.0988C10.9828 16.1015 11.7019 16.7633 11.7019 17.5768V18.0208C11.7019 18.066 11.6989 18.1106 11.6946 18.1549H21.5455V16.3919C21.5455 16.0215 21.8718 15.7213 22.2742 15.7213ZM6.57853 20.5124H21.5454V19.4961H10.0988H6.72427H6.57853V20.5124Z" fill={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Flights + Hotels' ? '#fff' : '#F75847') : '#BDC3FF'} />
      </svg>

    },
    {
      tabName: "Activities",
      tabIcon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.912 3.5C10.2877 3.5 7.34961 6.22537 7.34961 9.58723C7.34961 9.65427 7.35227 9.72243 7.3574 9.79157C7.65546 9.44901 8.04587 9.1814 8.62051 9.1814C9.57647 9.1814 10.0229 9.92159 10.3817 10.5165L10.3819 10.5168C10.7337 11.1002 10.9356 11.375 11.2661 11.375C11.5966 11.375 11.7985 11.1002 12.1502 10.5168L12.1503 10.5166C12.5091 9.92172 12.9556 9.1814 13.9116 9.1814C14.8676 9.1814 15.3141 9.92167 15.673 10.5166L15.6731 10.5168C16.0248 11.1002 16.2269 11.375 16.5573 11.375C16.8878 11.375 17.0897 11.1002 17.4415 10.5168L17.4416 10.5166C17.8004 9.92171 18.2469 9.1814 19.2029 9.1814C19.778 9.1814 20.1686 9.44935 20.4668 9.79224C20.4719 9.72282 20.4746 9.65447 20.4746 9.58723C20.4746 6.22537 17.5364 3.5 13.912 3.5ZM19.4772 10.0625C19.1296 10.0625 18.9172 10.429 18.5472 11.2068C18.1699 12.0001 17.7002 12.9873 16.6945 12.9873C15.6888 12.9873 15.2191 12.0001 14.8417 11.2068C14.4718 10.429 14.2593 10.0625 13.9117 10.0625C13.564 10.0625 13.3517 10.429 12.9817 11.2068L12.9816 11.2071C12.6042 12.0003 12.1346 12.9873 11.129 12.9873C10.1234 12.9873 9.65376 12.0002 9.27637 11.2069L9.27632 11.2068C8.9063 10.429 8.69393 10.0625 8.34634 10.0625C7.99874 10.0625 7.78626 10.429 7.41624 11.2068L7.34961 11.3465C7.97027 13.4083 9.34638 15.861 10.679 18.2363L10.679 18.2363C11.1221 19.026 11.5604 19.8071 11.9645 20.5625H15.8599C16.2639 19.8073 16.7021 19.0263 17.1451 18.2367L17.1451 18.2367C18.4777 15.8617 19.8538 13.4091 20.4746 11.3472C20.4519 11.3 20.4295 11.253 20.4076 11.2068C20.0374 10.429 19.825 10.0625 19.4772 10.0625ZM11.2871 23.8811V21.875H16.5371V23.8811C16.5371 24.2224 16.1413 24.5 15.6549 24.5H12.1694C11.6829 24.5 11.2871 24.2224 11.2871 23.8811Z" fill={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Activities' ? '#fff' : '#F75847') : '#BDC3FF'} />
      </svg>

    },
    {
      tabName: "Packages",
      tabIcon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6116 5.98868C10.8987 5.98868 10.3186 6.55125 10.3186 7.24268L10.3186 8.4652H9.19605V7.24268C9.19605 5.95098 10.2797 4.90039 11.6115 4.90039H16.3917C17.7237 4.90039 18.8071 5.95098 18.8071 7.24268V8.4652H17.6848V7.24268C17.6848 6.55121 17.1047 5.98868 16.3917 5.98868H11.6116ZM23.5455 9.39107H4.45454C3.92741 9.39107 3.5 9.8055 3.5 10.3167V13.4127L12.3295 15.3576V14.4674C12.3295 14.212 12.5433 14.0046 12.8068 14.0046H15.1932C15.4569 14.0046 15.6704 14.212 15.6704 14.4674V15.3588L24.5 13.4203V10.3167C24.5 9.8055 24.0726 9.39107 23.5455 9.39107ZM15.6705 18.1699C15.6705 18.4253 15.4569 18.6327 15.1932 18.6327H12.8068C12.5434 18.6327 12.3296 18.4253 12.3296 18.1699V16.544L3.5 14.5988V22.3498C3.5 22.861 3.92741 23.2754 4.45454 23.2754H23.5455C24.0726 23.2754 24.5 22.8609 24.5 22.3498V14.6067L15.6705 16.5452V18.1699Z" fill={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Packages' ? '#fff' : '#F75847') : '#BDC3FF'} />
      </svg>

    },
    {
      tabName: "Transfers",
      tabIcon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.3034 13.0013L20.9283 16.7706C20.8577 16.8473 20.7722 16.9086 20.6771 16.9508C20.5819 16.9929 20.4792 17.015 20.3752 17.0156H14.0001V23.0464C14.0001 23.2463 13.9211 23.438 13.7804 23.5794C13.6398 23.7208 13.449 23.8002 13.2501 23.8002C13.0512 23.8002 12.8604 23.7208 12.7198 23.5794C12.5791 23.438 12.5001 23.2463 12.5001 23.0464V17.0156H5.00002C4.60219 17.0156 4.22065 16.8567 3.93934 16.574C3.65804 16.2912 3.5 15.9078 3.5 15.5079V9.47712C3.5 9.07725 3.65804 8.69377 3.93934 8.41102C4.22065 8.12827 4.60219 7.96943 5.00002 7.96943H12.5001V4.95404C12.5001 4.75411 12.5791 4.56237 12.7198 4.42099C12.8604 4.27962 13.0512 4.2002 13.2501 4.2002C13.449 4.2002 13.6398 4.27962 13.7804 4.42099C13.9211 4.56237 14.0001 4.75411 14.0001 4.95404V7.96943H20.3752C20.4792 7.97003 20.5819 7.99208 20.6771 8.03423C20.7722 8.07637 20.8577 8.1377 20.9283 8.21443L24.3034 11.9837C24.4299 12.1226 24.5 12.3042 24.5 12.4925C24.5 12.6809 24.4299 12.8624 24.3034 13.0013Z" fill={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Transfers' ? '#fff' : '#F75847') : '#BDC3FF'} />
      </svg>
    },
    {
      tabName: "Rent a Car",
      tabIcon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.4231 12.0309H23.1253L19.817 6.06855C19.6743 5.81077 19.3146 5.59961 19.0185 5.59961H8.98154C8.68538 5.59961 8.32569 5.81077 8.183 6.06855L4.87415 12.0309H4.57692C3.98462 12.0309 3.5 12.5132 3.5 13.1027V18.4621C3.5 19.0516 3.98462 19.534 4.57692 19.534H5.65385V21.1418C5.65385 22.0261 6.38077 22.7496 7.26923 22.7496H7.80769C8.69615 22.7496 9.42308 22.0261 9.42308 21.1418V19.534H18.5769V21.1418C18.5769 22.0261 19.3038 22.7496 20.1923 22.7496H20.7308C21.6192 22.7496 22.3462 22.0261 22.3462 21.1418V19.534H23.4231C24.0154 19.534 24.5 19.0516 24.5 18.4621V13.1027C24.5 12.5132 24.0154 12.0309 23.4231 12.0309ZM6.46154 16.3184C5.71792 16.3184 5.11538 15.7186 5.11538 14.9785C5.11538 14.2384 5.71792 13.6387 6.46154 13.6387C7.20515 13.6387 7.80769 14.2384 7.80769 14.9785C7.80769 15.7186 7.20515 16.3184 6.46154 16.3184ZM7.53846 12.0309L9.72085 7.68709C9.85331 7.42287 10.2038 7.20742 10.5 7.20742H17.5C17.7962 7.20742 18.1467 7.42287 18.2792 7.68709L20.4615 12.0309H7.53846ZM21.5385 16.3184C20.7948 16.3184 20.1923 15.7186 20.1923 14.9785C20.1923 14.2384 20.7948 13.6387 21.5385 13.6387C22.2821 13.6387 22.8846 14.2384 22.8846 14.9785C22.8846 15.7186 22.2821 16.3184 21.5385 16.3184Z" fill={[8, 9, 4, 6, 10].includes(pathname.length) ? (activeTab.tabName == 'Rent a Car' ? '#fff' : '#F75847') : '#BDC3FF'} />
      </svg>
    },
    // {
    //   tabName: "Routing",
    //   tabIcon:  
    // },
  ];

  const dispatch = useDispatch();


  let tabsWrapperParentRef = useRef<HTMLDivElement>(null)
  let tabsWrapperRef = useRef<HTMLUListElement>(null)
  const handleScrollLeft = () => {
    // @ts-ignore
    tabsWrapperParentRef.current.scrollLeft += 100
  };

  const [canScrollMore, setCanScrollMore] = useState(true);

  // TODO: create a seperate helper function for this 
  const handleTabsScroll = useCallback(() => {

    const tabsWrapperWidth = tabsWrapperRef?.current?.getBoundingClientRect().width
    const scrollLeft = tabsWrapperParentRef?.current?.scrollLeft
    const scrollWidth = tabsWrapperParentRef.current?.scrollWidth

    let scrollRight: number = 0

    if (typeof scrollLeft == 'number' && typeof tabsWrapperWidth == 'number' && typeof scrollWidth == 'number') {

      scrollRight = scrollWidth - scrollLeft - tabsWrapperWidth
    }

    // how/hide the button
    if (scrollRight > 50) {
      setCanScrollMore(true)
    } else {
      setCanScrollMore(false)

    }

  }
    , [canScrollMore, window.innerWidth]);



  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab])

  useEffect(() => {
    handleTabsScroll()
    window.addEventListener("resize", handleTabsScroll);
    return () => window.removeEventListener("resize", handleTabsScroll);
  }, []);


  // useEffect(() => {
  // }, [canScrollMore])

  // New Update
  const renderTab = () => {
    const tabName = (tab: any) => {

      setActiveTab(tab)
      dispatch({
        type: FIXLAYOUT,
        payload: {
          status: tab.tabName,
        }
      })

    }
    return (
      <ul ref={tabsWrapperRef} className={`
         ${pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 ? `w-full flex justify-between px-5` : `${searchcardplace == 'offers' ? 'flex sm:justify-between  h-full md:h-[62px] absolute md:relative top-0 w-[100%]' :
          `${pathname.length == 10 ? 'w-full flex justify-between translate-y-[8px]' :
            'flex sm:justify-around h-full md:h-auto'}`
          }`}
      `}>
        {tabs?.map((tab, i) => {
          const active = tab.tabName == activeTab.tabName;
          return (
            <>
            {isMobile  ? 
              <li

              onClick={() => tabName(tab)}
              style={{
                fontSize: '12px',
                borderTopLeftRadius: pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? '15px' : '',
                borderTopRightRadius: pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? '15px' : '',
                padding: padding,
              }}

              className={localStorage.getItem('theme') == 'dark' ? `flex-shrink-0 items-center md:mt-2 dark:md:mt-0 inline-flex py-1 xl:px-3 cursor-pointer text-xs lg:text-base text-center md:text-center font-small md:translate-y-0 md:rounded-none md:h-full
             ${active

                  ? `rounded-t-md ${pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? 'bg-[#F75847]' : `${searchcardplace == 'offers' ? 'dark:rounded-[0] dark:rounded-tl-[10px] dark:rounded-tr-[10px] bg-[#3944B3]' : 'md:rounded-full bg-[#3944B3]'}`}  inline-flex text-white px-4 md:px-3 h-[61px] -translate-y-[7px]`

                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 px-[35px] md:px-3 bg-transparent dark:bg-[#171925]"

                } ` : `md:translate-y-0 rounded-none md:h-full flex-shrink-0 items-center ${searchcardplace == 'offers' ? 'md:mt-0 ' : 'md:mt-2'}  inline-flex py-1 xl:px-3 cursor-pointer text-xs lg:text-base text-center md:text-center font-small ${active

                  ? `${pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? `bg-[#F75847] ` :
                    `${searchcardplace == 'offers' ? 'bg-[#4E5CF4]  text-[#fff] font-normal md:rounded-tr-[10px]  md:rounded-tl-[10px] rounded-t-md' : 'rounded-t-md md:rounded-full bg-[#4E5CF4]  inline-flex text-white px-4 md:px-3 h-[61px] -translate-y-[7px]'}`}`

                  : `text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 px-[35px] sm:px-3 md:px-0  ${searchcardplace == 'offers' ? 'bg-[transparent]' :
                    pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? '' : 'bg-[#3944B3]'}`
                }`}
              key={tab.tabName}
            >


              {tab.tabIcon}

              {pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ?
                (active ?
                  <span className="text-[#fff] mx-1">{t(tab?.tabName)}</span>
                  :
                  <span className="text-[#F75847] dark:text-[#fff] mx-1 border-[#F75847]">{t(tab?.tabName)}</span>
                )
                :
                searchcardplace == 'offers'
                  ?
                  (active ?
                    <span className="text-[#fff] mx-1">{tab?.tabName}</span>
                    : <span className="text-[#FFF]  mx-1">{t(tab?.tabName)}</span>)
                  : (active && (<span>{t(`SEARCH_TABS.${ToTranslationFormat(tab?.tabName)}`)}</span>))
              }
            </li>
            :
            <Tooltip label={tab.tabName} withArrow arrowSize={5} transition="fade"
            transitionDuration={200}>
              <li

                onClick={() => tabName(tab)}
                style={{
                  fontSize: '12px',
                  borderTopLeftRadius: pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? '15px' : '',
                  borderTopRightRadius: pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10? '15px' : '',
                  padding: padding,
                }}

                className={localStorage.getItem('theme') == 'dark' ? `flex-shrink-0 items-center md:mt-2 dark:md:mt-0 inline-flex py-1 xl:px-3 cursor-pointer text-xs lg:text-base text-center md:text-center font-small md:translate-y-0 md:rounded-none md:h-full
               ${active

                    ? `rounded-t-md ${pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? 'bg-[#F75847]' : `${searchcardplace == 'offers' ? 'dark:rounded-[0] dark:rounded-tl-[10px] dark:rounded-tr-[10px] bg-[#3944B3]' : 'md:rounded-full bg-[#3944B3]'}`}  inline-flex text-white px-4 md:px-3 h-[61px] -translate-y-[7px]`

                    : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 px-[35px] md:px-3 bg-transparent dark:bg-[#171925]"

                  } ` : `md:translate-y-0 rounded-none md:h-full flex-shrink-0 items-center ${searchcardplace == 'offers' ? 'md:mt-0 ' : 'md:mt-2'}  inline-flex py-1 xl:px-3 cursor-pointer text-xs lg:text-base text-center md:text-center font-small ${active

                    ? `${pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? `bg-[#F75847] ` :
                      `${searchcardplace == 'offers' ? 'bg-[#4E5CF4]  text-[#fff] font-normal md:rounded-tr-[10px]  md:rounded-tl-[10px] rounded-t-md' : 'rounded-t-md md:rounded-full bg-[#4E5CF4]  inline-flex text-white px-4 md:px-3 h-[61px] -translate-y-[7px]'}`}`

                    : `text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 px-[35px] sm:px-3 md:px-0  ${searchcardplace == 'offers' ? 'bg-[transparent]' :
                      pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ? '' : 'bg-[#3944B3]'}`
                  }`}
                key={tab.tabName}
              >


                {tab.tabIcon}

                {pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 || pathname.length == 10 ?
                  (active ?
                    <span className="text-[#fff] mx-1">{t(tab?.tabName)}</span>
                    :
                    <span className="text-[#F75847] dark:text-[#fff] mx-1 border-[#F75847]">{t(tab?.tabName)}</span>
                  )
                  :
                  searchcardplace == 'offers'
                    ?
                    (active ?
                      <span className="text-[#fff] mx-1">{tab?.tabName}</span>
                      : <span className="text-[#FFF]  mx-1">{t(tab?.tabName)}</span>)
                    : (active && (<span>{t(`SEARCH_TABS.${ToTranslationFormat(tab?.tabName)}`)}</span>))
                }
              </li>
            </Tooltip>
            
            }
            </>
          );
        })}

      </ul>
    );
  };

  const renderForm = (pathname: any) => {
    searchcardplace = pathname == 8 ? 'travelguide' : ''
    switch (activeTab?.tabName) {
      case "Trip Designer":
        return <TripDesignerSearchForm searchcardplace={searchcardplace} inputClassNames={inputClassNames} pls={pls ?? '22px'} iconClassNames={iconClassNames} paddingLeft={pl} />;
      case "Flights":
        return <FlightSearchForm
          radioHeight="py-5"
          showClassGuest={true}
          roundedTopLeft=""
          customStyle={{}}
          searchcardplace={searchcardplace}
        />;
      case "Hotels":
        return <HotelsSearchForm
          radioHeight="py-5"
          roundedTopLeft=""
          showClassRadio={false}
          dynamicHeight="mt-0"
          searchcardplace={searchcardplace}
        />;
      case "Flights + Hotels":
        return <FlightsHotelsSearchForm searchcardplace={searchcardplace} />;
      case "Activities":
        return <ActivitiesSearchForm searchcardplace={searchcardplace} />;
      case "Packages":
        return <PackagesSearchForm searchcardplace={searchcardplace} />;
      case "Transfers":
        return <TransfersSearchForm searchcardplace={searchcardplace} />;
      case "Rent a Car":
        return <CarRentalSearchForm searchcardplace={searchcardplace} />;
      case "Routing":
        return <RoutingSearchForm searchcardplace={searchcardplace} />;
      default:
        return null;
    }
  };


  let pathLength = pathname.length;
  let travelguide: any = pathLength == 9 ? pathname[pathname.length - 1] : pathname[pathname.length - 2];
  let text = window.location.pathname;
  let getLength = text.split('/');

  return (
    <div className={`homepage-hero-search 
        ${pathname.length == 4 || pathname.length == 8 || pathname.length == 6 ? 'px-[10vw] h-[310px]' : ''}
        ${className}  bottom-0 w-[100%]`}>
      <div style={{ paddingBottom: activeTab.tabName == 'Transfers' && pathname.length == 4 ? '6vh' : '0' }} className={`bg-[unset] relative ${customContainer}  ${searchcardplace == 'offers' ? 'dark:bg-[#171925]' : ''}  dark:rounded-tl-[10px] dark:rounded-tr-[20px]
            ${pathname.length == 4 || pathname.length == 8 || pathname.length == 6 ? `w-full px-0 md:px-5 ${(pathname.length == 4 || pathname.length == 8 || pathname.length == 6 || travelguide == 'travelguide' || renderStyle == 'guideStyle') ? 'bigMd:px-0 mb-10' : 'bigMd:px-[10.1vw]'}` : `
            ${pathname.length == 10 || (pathname[pathname.length - 1] != 'deals' && pathname.length == 9) ? `px-0 md:h-[350px]` : ``}
            `}`}>
        <div
          ref={tabsWrapperParentRef}
          className={`
            w-full  ${space} flex items-end overflow-x-scroll scroll-smooth hiddenScrollbar
            
            ${pathname.length == 4 || pathname.length == 8 || pathname.length == 6 ? 'w-full' : `${searchcardplace == 'offers' ? 'rounded-tl-[10px] rounded-tr-[20px]' : `rounded-tl-[20px] ${pathname.length == 10 ? 'rounded-tr-[20px]' : ''}`}`}`}
          onScroll={handleTabsScroll}
        >
          <div style={{ width: getLength.length == 9 ? '100%' : '' }} className={(localStorage.getItem('theme') == 'dark') ?
            // if the theme is dark    
            `w-full ${pathname.length == 10 ? 'bigMd:w-[100%]' : style} h-[54px] md:h-[unset]   ${pathname.length == 4 || pathname.length == 8 || pathname.length == 6 ? 'bg-transparent px-5' : `${searchcardplace == 'offers' ? 'bg-[#171925]' : 'bg-[#171925] md:py-3'} `} relative z-9 rounded` :
            // if the theme is not dark
            `${pathname.length == 4 || pathname.length == 8 || pathname.length == 9 || pathname.length == 6 ? 'w-full' : `w-full ${pathname.length == 10 ? 'bigMd:w-[100%] md:mx-5' : `${style} ${tabBgColor}`} ${searchcardplace == 'offers' ? 'h-[54px] md:h-full ' : 'h-[54px] md:h-[unset]  rounded-tl-[20px] md:py-3'} relative z-9 `}`}>
            {renderTab()}
          </div>
        </div>
        <div className={`${scrollButtonClassNames} w-16 h-[53px] absolute right-0 top-[7px] flex items-center justify-center z-10 rounded-t-[10px] text-white bg-[#1D2478] ${canScrollMore ? '' : 'hidden'}`} >
          <ArrowRight onClick={handleScrollLeft} />
        </div>
        {/* 
        
        
        ${pathname.length >= 7 ? 'bigMd:px-0' : 'bigMd:px-6'}
        
        */}

        <div

          className={`
          ${pathname.length == 8 || pathname.length == 4 || pathname.length == 6 || pathname.length == 10 ? `border-[5px] dark:border-[1px] border-[#fff] dark:border-[transparent] 
          ${pathname.length == 8 || pathname.length == 4 || pathname.length == 6 || pathname.length == 10 ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'}
            
          rounded-[20px] shadow-[0_6px_32px_rgba(255,197,191,0.28)] dark:!shadow-none` : ''}`}
          style={{
            boxShadow: pathname.length == 8 || pathname.length == 4 || pathname.length == 6 || pathname.length == 10 ? '0px 6px 32px rgba(255, 197, 191, 0.28)' : '',
            borderRadius: pathname.length == 8 || pathname.length == 4 || pathname.length == 6 || pathname.length == 10 ? '20px' : '',
          }}>
          {renderForm(pathname.length)}
        </div>
      </div>

    </div>
  );
};

export default HomepageHeroSearch;
