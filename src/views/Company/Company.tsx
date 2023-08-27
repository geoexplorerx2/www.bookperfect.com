import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import HeroHead from '../../components/HeroHeader/HeroHead';
import HeroInputSearch from '../../components/HeroInputSearch/HeroInputSearch';
import MobileSupportHeader from '../../components/MobileSupportHeader/MobileSupportHeader';
import useWindowSize from '../../hooks/useWindowSize';
import { activateSideMenu, company, supportHelps } from '../../store/actions';
import { JsxElement } from 'typescript';
import { Listbox, Transition } from '@headlessui/react';
import SupportSidebar from '../Helps/SupportSidebar';
import SupportContent from '../Helps/SupportContent';
import Loader from '../../components/Loader/Loader';
import { ReactComponent as burgerIcon } from "../../images/icons/BurgerIcon.svg";
import { ReactComponent as xIcon } from "../../images/icons/x.svg";

export const CompanyMenu: any[] = [
    {
      tid: '164379',
      name: 'About',
      menuType: 'company',
      icon: <svg width="53" height="48" viewBox="0 0 53 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.5227 20.2515L4.52246 43.8471" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M0.642578 40.022L8.11424 47.3662" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M40.1077 15.9125L17.3823 38.2622L10.21 31.2021L32.9353 8.86328L40.1077 15.9125Z" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M38.3114 14.1529L41.0052 11.5081L37.4135 7.97803L34.7197 10.6228L38.3114 14.1529Z" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M39.21 9.73762L48.4775 0.633789" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M24.9316 16.7212L32.104 23.7813" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M48.5546 19.2349C48.5546 19.2349 52.357 23.1037 52.357 27.2895C52.357 28.3824 52.0355 29.2786 51.5699 29.9999C50.1842 32.1638 46.914 32.1638 45.5283 29.9999C45.0627 29.2786 44.7412 28.3824 44.7412 27.2895C44.7412 23.1037 48.5436 19.2349 48.5436 19.2349" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
      </svg>,
      icon1: <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1257_22195)">
          <path d="M12.3781 8.85986L1.96289 19.183" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M0.279297 17.5098L3.52172 20.7229" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17.4051 6.96195L7.54319 16.74L4.43066 13.6512L14.2926 3.87793L17.4051 6.96195Z" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16.6261 6.19174L17.7951 5.03463L16.2364 3.49023L15.0674 4.64734L16.6261 6.19174Z" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17.0156 4.26027L21.0374 0.277344" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10.8193 7.31543L13.9319 10.4042" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M21.0709 8.41553C21.0709 8.41553 22.721 10.1081 22.721 11.9394C22.721 12.4176 22.5815 12.8097 22.3794 13.1252C21.7781 14.0719 20.3589 14.0719 19.7576 13.1252C19.5555 12.8097 19.416 12.4176 19.416 11.9394C19.416 10.1081 21.0661 8.41553 21.0661 8.41553" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1257_22195">
            <rect width="23" height="21" fill="white" />
          </clipPath>
        </defs>
      </svg>,
      type: 'menu'
    },
    {
      tid: '164380',
      name: 'Jobs',
      menuType: 'company',
      icon: <svg width="42" height="48" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.7324 0.582275H21.9543C24.176 0.582275 25.9736 2.37939 25.9736 4.59817V5.82302" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20.7324 0.582275H19.5104C17.2888 0.582275 15.4912 2.37939 15.4912 4.59817V5.82302" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M26.0439 5.86328V22.9308" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16.0771 5.86328V22.9308" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M28.5996 14.6079H23.3584" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.6419 14.6079H13.3906" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M31.2353 5.823H10.7756C8.17101 5.823 6.05957 7.92214 6.05957 10.5116V18.6337C6.05957 21.2231 8.17101 23.3223 10.7756 23.3223H31.2353C33.8399 23.3223 35.9514 21.2231 35.9514 18.6337V10.5116C35.9514 7.92214 33.8399 5.823 31.2353 5.823Z" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.05957 42.7593V34.5869C6.05957 32.0067 8.14998 29.9185 10.7251 29.9185H31.2757C33.8509 29.9185 35.9413 32.0067 35.9413 34.5869V42.7593" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M35.9404 47.227H39.3638C40.4949 47.227 41.4139 46.0725 41.4139 44.6568V37.7595C41.4139 36.1733 40.8079 34.6874 39.7779 33.7637L35.9404 30.3101" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.05937 30.3198L2.22191 33.7735C1.19185 34.6971 0.585938 36.183 0.585938 37.7693V44.6666C0.585938 46.0822 1.50491 47.2368 2.63595 47.2368H6.05937" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M35.9716 19.0454V47.4177H6.0293V19.0454" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
      </svg>,
      icon1: <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1257_22324)">
          <path d="M8.3916 0.242676H8.88619C9.78545 0.242676 10.513 0.991473 10.513 1.91597V2.42632" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8.39193 0.242676H7.89734C6.99809 0.242676 6.27051 0.991473 6.27051 1.91597V2.42632" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10.542 2.44287V9.55435" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6.50781 2.44287V9.55435" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M11.5755 6.08643H9.4541" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7.54543 6.08643H5.41992" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12.6423 2.42627H4.36102C3.30678 2.42627 2.45215 3.30091 2.45215 4.37984V7.76406C2.45215 8.84299 3.30678 9.71763 4.36102 9.71763H12.6423C13.6966 9.71763 14.5512 8.84299 14.5512 7.76406V4.37984C14.5512 3.30091 13.6966 2.42627 12.6423 2.42627Z" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M2.45215 17.8162V14.411C2.45215 13.3359 3.29827 12.4658 4.34058 12.4658H12.6587C13.701 12.4658 14.5471 13.3359 14.5471 14.411V17.8162" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.5479 19.6781H15.9335C16.3913 19.6781 16.7633 19.1971 16.7633 18.6072V15.7333C16.7633 15.0724 16.518 14.4533 16.1011 14.0684L14.5479 12.6294" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M2.45274 12.6333L0.899483 14.0723C0.482556 14.4572 0.237305 15.0763 0.237305 15.7373V18.6111C0.237305 19.201 0.609269 19.682 1.06707 19.682H2.45274" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.5599 7.93555V19.7573H2.44043V7.93555" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1257_22324">
            <rect width="17" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>,
      type: 'menu'
    },
    {
      tid: '164381',
      name: 'List your property',
      menuType: 'company',
      icon: <svg width="87" height="60" viewBox="0 0 87 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.6216 14.1508L29.462 18.3651" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M17.3284 30.6449L13.1689 34.8592" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M25.6657 22.198L21.5062 26.4305" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M73.1283 34.5868L68.9688 30.3724" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M56.8533 18.0926L52.6756 13.8783" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M65.1724 26.5395L61.0129 22.307" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M43.0124 23.4878L21.5062 1.85291L16.2023 7.22984C18.9269 9.99096 18.9269 14.4596 16.2023 17.2026C13.4777 19.9637 9.08202 19.9637 6.35742 17.2026L1.05353 22.5795L28.3904 50.2634L34.4571 44.1054" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M80.4847 16.4033C77.7601 19.1644 73.3644 19.1644 70.6398 16.4033C67.9152 13.6421 67.9152 9.17348 70.6398 6.43052L65.3359 1.05359L28.6265 38.238L49.0791 58.9646L85.7886 21.7802L80.4847 16.4033V16.4033Z" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M60.4498 38.2379L48.7159 50.1362" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M50.6594 40.5995L44.9196 46.3034" stroke="#3944B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>,
      icon1: <svg width="30" height="21" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5L11 7" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7 11H5" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 8L8 10" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M25 11H24" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M19 7L18 5" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M23 10L20 8" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 9.15047L8.31169 2L6.41558 3.77711C7.38961 4.68968 7.38961 6.1666 6.41558 7.07317C5.44156 7.98574 3.87013 7.98574 2.8961 7.07317L1 8.85028L10.7727 18L12.9416 15.9647" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M27.3298 6.03607C26.4719 6.94197 25.0877 6.94197 24.2297 6.03607C23.3718 5.13018 23.3718 3.66405 24.2297 2.76412L22.5596 1L11 13.1998L17.4404 20L29 7.80019L27.3298 6.03607V6.03607Z" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20 13L18 18" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18 14L16 16" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>,
      type: 'menu'
    },
    {
      tid: "164382",
      name: 'Partnerships',
      menuType: 'company',
      icon: <svg width="52" height="45" viewBox="0 0 52 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.1445 2.15745C20.5792 1.21893 23.2319 0.694824 26.0057 0.694824C38.0579 0.694824 47.8207 10.4578 47.8207 22.4879" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9.03613 8.79999C10.2837 7.26423 11.7373 5.89912 13.3483 4.74121" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.4873 15.0895C5.75378 14.346 6.06872 13.6147 6.40787 12.9199" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M26.0065 44.3053C13.9543 44.3053 4.19141 34.5423 4.19141 22.5122" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M41.3525 37.9795C39.5477 39.7712 37.428 41.246 35.0781 42.3186" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M46.7554 29.2158C46.4042 30.3128 45.9681 31.361 45.4473 32.3726" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M0.702148 26.8635L4.19062 22.5L8.11515 25.9859" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M51.3099 18.1367L47.8214 22.5002L43.8848 19.0143" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M21.1973 27.3024C21.1973 29.9473 23.3412 32.0925 25.9939 32.0925C28.6466 32.0925 30.7906 29.9473 30.7906 27.3024C30.7906 24.6575 28.6466 22.5123 25.9939 22.5123C23.3412 22.5123 21.1973 20.3671 21.1973 17.7222C21.1973 15.0773 23.3412 12.9321 25.9939 12.9321C28.6466 12.9321 30.7906 15.0773 30.7906 17.7222" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M26.0059 9.42188V12.9078" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M26.0059 32.0923V35.5782" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
      </svg>,
      icon1: <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1257_22351)">
          <path d="M9.07227 1.10254C10.2896 0.622857 11.6159 0.35498 13.0029 0.35498C19.0289 0.35498 23.9104 5.34496 23.9104 11.4937" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.51758 4.49783C5.14138 3.71288 5.86815 3.01516 6.67365 2.42334" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M2.74316 7.7124C2.8764 7.33239 3.03387 6.95861 3.20345 6.60352" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.0032 22.645C6.97714 22.645 2.0957 17.655 2.0957 11.5063" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20.6763 19.4116C19.7739 20.3274 18.714 21.0812 17.5391 21.6294" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M23.3777 14.9326C23.2021 15.4933 22.9841 16.029 22.7236 16.5461" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M0.351562 13.7302L2.0958 11.5L4.05806 13.2817" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M25.6549 9.26953L23.9107 11.4998L21.9424 9.71807" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10.5986 13.9547C10.5986 15.3065 11.6706 16.4029 12.997 16.4029C14.3233 16.4029 15.3953 15.3065 15.3953 13.9547C15.3953 12.6028 14.3233 11.5064 12.997 11.5064C11.6706 11.5064 10.5986 10.41 10.5986 9.05813C10.5986 7.70629 11.6706 6.60986 12.997 6.60986C14.3233 6.60986 15.3953 7.70629 15.3953 9.05813" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.0029 4.81543V6.59712" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.0029 16.4028V18.1845" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1257_22351">
            <rect width="26" height="23" fill="white" />
          </clipPath>
        </defs>
      </svg>,
      type: 'menu'
    },
    {
      tid: "164383",
      name: 'New Rooms',
      menuType: 'company',
      icon: <svg width="48" height="46" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.542 0.760498H0.701172V27.8208H20.542V0.760498Z" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.6156 15.7014C13.4803 15.7014 15.8025 13.4771 15.8025 10.7334C15.8025 7.98963 13.4803 5.76538 10.6156 5.76538C7.75097 5.76538 5.42871 7.98963 5.42871 10.7334C5.42871 13.4771 7.75097 15.7014 10.6156 15.7014Z" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.616 15.7014C11.6644 15.7014 12.5142 13.4771 12.5142 10.7334C12.5142 7.98963 11.6644 5.76538 10.616 5.76538C9.56764 5.76538 8.71777 7.98963 8.71777 10.7334C8.71777 13.4771 9.56764 15.7014 10.616 15.7014Z" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M41.8579 9.73975L34.9541 9.81335" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M41.7852 13.5425L34.8936 13.6283" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M39.0842 38.2384C40.9568 37.8248 42.1628 36.0353 41.778 34.2414C41.3931 32.4474 39.563 31.3284 37.6904 31.7419C35.8178 32.1555 34.6118 33.945 34.9967 35.7389C35.3816 37.5329 37.2116 38.6519 39.0842 38.2384Z" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.8027 28.1274V45.3008H47.299V0.711426H15.8027" stroke="#3944B3" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
      </svg>,
      icon1: <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1257_22364)">
          <path d="M8.98699 0.330566H0.306641V12.0959H8.98699V0.330566Z" stroke="#3944B3" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.64427 6.82684C5.89755 6.82684 6.91354 5.85977 6.91354 4.66684C6.91354 3.4739 5.89755 2.50684 4.64427 2.50684C3.39099 2.50684 2.375 3.4739 2.375 4.66684C2.375 5.85977 3.39099 6.82684 4.64427 6.82684Z" stroke="#3944B3" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.64395 6.82684C5.10262 6.82684 5.47443 5.85977 5.47443 4.66684C5.47443 3.4739 5.10262 2.50684 4.64395 2.50684C4.18529 2.50684 3.81348 3.4739 3.81348 4.66684C3.81348 5.85977 4.18529 6.82684 4.64395 6.82684Z" stroke="#3944B3" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18.3124 4.23486L15.292 4.26686" stroke="#3944B3" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18.2807 5.88818L15.2656 5.92552" stroke="#3944B3" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17.099 16.6254C17.9183 16.4456 18.4459 15.6676 18.2776 14.8876C18.1092 14.1076 17.3085 13.6211 16.4893 13.8009C15.67 13.9807 15.1424 14.7588 15.3107 15.5387C15.4791 16.3187 16.2798 16.8052 17.099 16.6254Z" stroke="#3944B3" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6.91406 12.2296V19.6962H20.6937V0.30957H6.91406" stroke="#3944B3" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1257_22364">
            <rect width="21" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>,
      type: 'menu'
    }
  ];


interface CompanyProps {
};

const Company: FC<CompanyProps> = ({ }) => {

  const dispatch = useDispatch();
  const activeSideMenu = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.activemenu);
  const companyData = useSelector((state: { CompanyReducer: any; }) => state.CompanyReducer.company);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  const [dataReady, setDataReady] = useState(false);
  const COMPANY_TAXO = [{name: 'Company'}];

  useEffect(() => {
    if(!companyData){
      dispatch(
        company(
          activeLang.toLowerCase(),
          () => setDataReady(true)
        )
      )
    }
  }, []);
  
  useEffect(() => {
    if(companyData && dataReady){
      var activemenu = {
        menu: companyData && companyData[0].name, 
        active: true, 
        data: companyData && companyData[0],
        submenu: ''
      };
      
      dispatch(
        activateSideMenu(
          activemenu
        )
      );

      COMPANY_TAXO.push({name: 'About'});
    }
  }, [dataReady]);
  
  // update company taxonomy
  useEffect(() => {
   if(activeSideMenu) {
    COMPANY_TAXO.push(activeSideMenu.data);
   }
  }, [activeSideMenu]);
  
  useEffect(() => {
    // console.log('company page: activeSideMenu', activeSideMenu)
  } ,[activeSideMenu])

  const renderContent = () => {
    return <SupportContent 
              type='company'
              // type={activeSideMenu.menu && activeSideMenu.menu.toLowerCase().replaceAll(' ', '')} 
              heading={activeSideMenu.menu} 
              // data = { }
           />    
  };

//   let company_taxo_unique: any = {};
//   let FILTERED_COMPANY_TAXO = COMPANY_TAXO.filter((taxo: any) => !company_taxo_unique[taxo.id as keyof any] && (company_taxo_unique[taxo.id] = true));

  const TopMenu: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    let Icon = isMenuOpen ? xIcon : burgerIcon;

    let menuRef = useRef<HTMLDivElement>(null)
    let iconRef = useRef<HTMLDivElement>(null)
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;

      // click inside
      if (menuRef.current.contains(event.target as Node) 
      || iconRef?.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(prevState => !prevState)
        return;
      };

      // click outside
      setIsMenuOpen(false);
    };

  useEffect(() => {
    
    document.removeEventListener("click", handleClickOutside);
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuClicked]);



    const handleItemSelection = (menu: any) => {
      var activemenu = {
        menu: menu.name, 
        active: true, 
        data: menu,
      };

      dispatch(
        activateSideMenu(
          activemenu
        )
      );

      dispatch(
        company(
          activeLang.toLowerCase()
        )
      )
      setIsMenuClicked(false)

    }

    return (
      <div className='humburger_menu flex md:hidden relative mt-4 mx-5 rounded-[10px] items-center  bg-[#EEEFFF] text-[#3842B2] text-xs font-medium ' ref={menuRef}>
            <Listbox value={activeSideMenu} 
             onChange={()=> {}}
            >
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
                    {activeSideMenu.menu}
                  </div>

                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-5 text-base ring-1 ring-black shadow-[0px_4px_17px_4px_rgba(0,_21,_255,_0.12)] ring-opacity-5 focus:outline-none sm:text-sm">

                    {
                      CompanyMenu?.map((menu: any, idx: number) => {
                        return (
                          <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-4 pl-12 pr-4 text-xs ${active ? 'text-[#3944B3] font-normal' : 'text-gray-900 font-extralight'
                              }`
                            }
                            value={menu}
                            onClick={() => handleItemSelection(menu)}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`flex items-center truncate ${selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                  <div className='absolute left-0 mx-6 bg-[#3944B3] w-[6px] h-[6px] rounded-full'></div>

                                  {menu.name}
                                 
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
    )
  }

  return (
    <div>
      {/* <Loader
        data={ !dataReady }
      /> */}

      {/* homepage helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title> Homepage || Company </title>
      </Helmet>

      <HeroHead
        className={`hero-head-support flex-col flex`}
        searchCard='company'
        headText=""
        subText=""
        headType="company"
        taxonomy = { COMPANY_TAXO }
      />
      <TopMenu />
      <div>
       <div className={`px-5 md:mx-[10vw] mt-0 md:mt-8 p-4`}>
          <div className="flex space-x-6">
            <div className="hidden md:inline-block w-1/4 ">
              <div className={` "space-y-8"`}>
                {
                  companyData?.length > 0 &&
                  <SupportSidebar
                    menu={CompanyMenu}
                    activeSideMenu={activeSideMenu}
                  />
                }
              </div>
            </div>

            <div className=" w-full md:w-3/4 !ml-0 md:!ml-6 ">
              { companyData?.length > 0 && renderContent() }
            </div>
          </div>
       </div>
     </div>
    </div>
  )
};


export default Company;