import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CustomLink } from "../../data/types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FooterFooter from "../footerfooter/footerfooter";
import { about, activateSideMenu, company, faqs, helpsTypes, jobs, supportHelps } from "../../store/actions";
import parse from 'html-react-parser';
import Vector from '../../images/Vector.svg'
import { DEFAULT_FAQ_ID } from "../Disclosure/FAQTab";
import footerbrand from '../../images/footerbrand1.svg';
import randomId from "../../common/randomId";
import { DISABLEDROPDOWN } from '../../store/actions';
import useWindowSize from "../../hooks/useWindowSize";
import SocialMedia from "../SocialMedia/SocialsMedia";
import PaymentAndSecurityBar from "./PaymentAndSecurityBar";
import { goToPage } from "../../common/goToPage";
import { ARPANU_MEDICAL } from "../../constants/brands";
import FooterMembership from "./FooterMembership";
import redSysIcon from '../../images/icons/redsys.png'
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import ContactUsModal from "../ContactUsModal/ContactUsModal";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const Footer: React.FC = () => {
  const [isFeedbackModalOpened, setIsFeedbackModalOpened] = useState<boolean>(false)
  const [isContactUsModalOpen, setIsContactUsModalOpen] = useState<boolean>(false)
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  let history = useHistory();
  let LightMode = useSelector((state: any) => state.LightMode);

  const items = [
    {
      id: randomId(),
      href: "/tripdesigner",
      name: "Trip Designer",

    },
    {
      id: randomId(),
      href: "/transfers",
      name: "Transfers",

    },
    {
      id: randomId(),
      href: "/flights",
      name: "Flights & More",

    },
    {
      id: randomId(),
      href: "/hotels",
      name: "Hotels",

    },
    {
      id: randomId(),
      href: "/flights-hotels",
      name: "Flights + Hotels",

    },
    {
      id: randomId(),
      href: "/activities",
      name: "Activities",

    },

    {
      id: randomId(),
      href: "/packages",
      name: "Packages",

    },
    {
      id: randomId(),
      href: "/car-rental",
      name: "Rent a Car",

    },
    {
      id: randomId(),
      href: "",
      name: "More",
      type: "dropdown",
    },
    {
      id: randomId(),
      href: "",
      name: "travel-guide",
      type: "Travel Guide",
    },
    {
      id: randomId(),
      href: "",
      name: "site-map",
      type: "Site Map",
    },
  ];
  const getWidth = () => {
    let value: any = null;
    let translateX = null;
    let padding = null;
    let translateY = null;
    if (width > 1023 && width <= 1200) { value = 'w-[13rem] translate-x-[16px]'; translateX = 'translate-x-[0px]'; padding = 'px-3'; translateY = 'translate-y-[35px]' }
    if (width > 1200 && width <= 1500) { value = 'w-[17rem] translate-x-[16px]'; translateX = 'translate-x-[0px]'; padding = 'px-3'; translateY = 'translate-y-[35px]' }
    if (width > 1500 && width <= 1800) { value = 'w-[20rem] translate-x-[16px]'; translateX = 'translate-x-[0px]'; padding = 'px-3'; translateY = 'translate-y-[35px]' }
    if (width > 1800) { value = 'w-[25rem] translate-x-[16px]'; translateX = 'translate-x-[0px]'; padding = 'px-3'; translateY = 'translate-y-[35px]' }
    return { value, translateX, translateY, padding };
  }
  const production = process.env.REACT_APP_PRODUCTION;
  const widgetMenus: WidgetFooterMenu[] = [
    {
      id: "8",
      title: "Site Quick Links",
      menus: [
        { href: production == 'true' ? '/' : "/tripdesigner", label: "Trip Designer" },
        { href: production == 'true' ? '/' : "/flights", label: "Flights & More" },
        { href: production == 'true' ? '/' : "/hotels", label: "Hotels" },
        { href: production == 'true' ? '/' : "/flights-hotels", label: "Flights + Hotels" },
        { href: production == 'true' ? '/' : "/activities", label: "Activities" },
        { href: production == 'true' ? '/' : "/transfers", label: "Transfers" },
        { href: production == 'true' ? '/' : "/packages", label: "Packages" },
        { href: production == 'true' ? '/' : "/car-rental", label: "Rent a Car" },
        { href: production == 'true' ? '/' : "/travelguide", label: "Travel Guide" },
        { href: production == 'true' ? '/' : "/site-map", label: "Site Map" },
      ],
    },
    {
      id: "5",
      title: "Company",
      menus: [
        { href: production == 'true' ? '/' : "/company", id: '164379', label: "About Us" },
        { href: production == 'true' ? '/' : "/company", id: '164382', label: "Partnerships" },
        { href: production == 'true' ? '/' : "/company", id: 'healthmedicaltravel', label: "Health & Medical Travel" },
        { href: production == 'true' ? '/' : "/", id: 'feedback', label: "Website Feedback" },
        { href: production == 'true' ? '/' : "/", id: 'contactUs', label: "Contact Us" },
        // { href: production == 'true' ? '/' : "/company", id: '164380', label: "Jobs" },
        // { href: production == 'true' ? '/' : "/company", id: '164381', label: "List your property" },
        // { href: production == 'true' ? '/' : "/company", id: '164383', label: "New rooms" },
        // { href: production == 'true' ? '/' : "/company", id: '', label: "Investors Relations" },
        // { href: production == 'true' ? '/' : "/company", id: '', label: "Advertising" },
      ]
    },

    {
      id: "2",
      title: "Important Information",
      menus: [
        { href: production == 'true' ? '/' : "/privacy-policy", label: "Privacy Policy" },
        { href: production == 'true' ? '/' : "/support", label: "Terms of Use" },
        { href: production == 'true' ? '/' : "/support", label: "Support" },
        { href: production == 'true' ? '/' : "/support", label: "Frequently Asked Questions" },
        { href: production == 'true' ? '/' : "/support", label: "Modify your Booking" },
        // { href: production == 'true' ? '/' : "#", label: "Vrbo terms" },
        // { href: production == 'true' ? '/' : "#", label: "Rewards Terms" },
        // { href: production == 'true' ? '/' : "#", label: "Accessibility" },
      ],
    },
    // {
    //   id: "4",
    //   title: "Help",
    //   menus: [
    //     { href: production == 'true' ? '/' : "/support", label: "Support", id: "support" },
    //     { href: production == 'true' ? '/' : "/support", label: "Frequently Asked Questions", id: '58' },
    //     { href: production == 'true' ? '/' : "/support", label: "Cancel your flight" },
    //     { href: production == 'true' ? '/' : "/support", label: "International travel documents" }
    //   ],
    // },
    // {
    //   id: "6",
    //   title: "Payment & Security",
    //   menus: [
    //     {
    //       href: production == 'true' ? '/' : "#", label: `
    //       <div className=' hidden grid-cols-2 bigMd:grid-cols-3 h-full gap-x-4'>
    //       <div className='col-span-2 h-full'>
    //         <div className="${getWidth().value} border-2 border-transparent bg-[#F4F8FF] rounded-[4px] h-full flex items-center flex-wrap">

    //           <div className='w-full flex justify-center'>
    //             <div className='w-[90%] flex justify-between items-center border-b-2 border-[#BFC3D2] rounded-[2px]'>
    //               <div className='border-r-2 border-[#BFC3D2] m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand3.svg' /></div>
    //               <div className='border-r-2 border-[#BFC3D2] m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand4.svg' /></div>
    //               <div className='m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand5.svg' /></div>
    //             </div>
    //           </div>

    //           <div className='w-full flex justify-center'>
    //             <div className='w-[90%] flex justify-between items-center border-b-2 py-2  border-[#BFC3D2] rounded-[2px]'>
    //               <div className='border-r-2 border-[#BFC3D2] px-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand6.svg' /></div>
    //               <div className='border-r-2 border-[#BFC3D2] px-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand7.svg' /></div>
    //               <div className='border-r-2 border-[#BFC3D2] px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand8.svg' /></div>
    //               <div className='px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand9.svg' /></div>
    //             </div>
    //           </div>

    //           <div className='w-full flex justify-center'>
    //             <div className='w-[90%] flex justify-between items-center py-2'>
    //               <div className='border-r-2 border-[#BFC3D2] px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand.svg' /></div>
    //               <div className='px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand11.svg' /></div>
    //             </div>
    //           </div>

    //         </div>
    //       </div>
    //       <div className="${getWidth().value} col-span-2 bigMd:col-span-1 flex flex-row bigMd:flex-col justify-between mt-2 bigMd:mt-0 space-x-2 bigMd:space-x-0 bigMd:space-y-4">
    //         <div className="w-[50%] bg-[#fff] h-1/2 rounded-t-[4px] flex justify-center ${getWidth().padding}">
    //           <img src='https://bookperfect.imgix.net/brands/footerBrand13.svg' />
    //         </div>
    //         <div className="w-[50%] bg-[#fff] h-1/2 rounded-t-[4px] flex justify-center py-5">
    //           <img src='https://bookperfect.imgix.net/brands/footerBrandABTTA.png' />
    //         </div>
    //       </div>
    //     </div>
    //     `},
    //   ],
    // },
  ];

  const handleItemClick = (href: string, menu: any) => {
    
    if(menu.id === 'feedback') {
      setIsFeedbackModalOpened(true)
      return;
    };

    if(menu.id == 'contactUs'){
      setIsContactUsModalOpen(true)
      // console.log('contact us Clicked ')
      return
    }

    if(menu.id == 'healthmedicaltravel'){
      goToPage(
        ARPANU_MEDICAL, 
        'redirect'
      );
      return;
    };

    dispatch({
      type: DISABLEDROPDOWN,
      payload: {
        status: menu,
      }
    });

    if (href == '/company') {
      var activemenu = {
        menu: menu.label,
        active: true,
        data: {
          tid: menu.id,
          name: menu.label
        },
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
      );

      // company information
      // switch (menu.label?.toLowerCase()) {
      //   case 'about':
      //     dispatch(
      //       about()
      //     )
      //     break;
      //   case 'jobs':
      //     dispatch(
      //       jobs()
      //     )
      //     break;
      //   default:
      //     break;
      // }

    }

    if (href == '/support') {

      dispatch(
        helpsTypes()
      );

      dispatch(
        faqs(
          DEFAULT_FAQ_ID
        )
      );

      if (menu.id == '58') {
        let faq = {
          name: menu.name,
          tid: menu.id
        };

        dispatch(
          supportHelps(
            faq
          )
        );
      };

      if (menu.id == 'support') {
        let resetview = {
          type: 'RESET'
        };

        dispatch(
          supportHelps(
            resetview
          )
        );

      }
    }

    history.push(`/${activeLang}${href}`);
  };

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {

    return (
      <div key={index}
        className={`
        ${index === 0 && 'col-span-2'}
        ${index === 1 || index === 3 ? 'bigMd:pl-12  lg:!pl-0' : ''}
        ${index === 3 && "col-span-3 hidden "}
        `
        // ${menu.id === '6' ? `hidden lg:inline-block ${getWidth().translateX}` : ''}
      }
      >
        <span className={`${menu.id == '6' ? 'hidden ml-4 whitespace-nowrap' : 'ml-0'} font-poppins leading-[24px] font-medium text-[16px] text-[#FFFFFF] dark:text-[#FFFFFF] `}>
          {menu.title}
        </span>

        <ul className={`${menu.id == '6' ? 'space-y-[0.5rem] h-full' : ''} ${menu.id === '8' ? 'grid grid-cols-2' : ''}`} >

          {menu.menus.map((item, index) => (
            <li key={index} className={`flex content-center cursor-pointer w-full ${menu.id == '6' ? 'h-full' : 'mt-5'}`} onClick={() => handleItemClick(item.href, item)}>
              <a
                key={index}
                className={`${menu.id === '6' && 'h-full'} min-w-[6rem] text-white w-full font-poppins font-normal text-[12px] leading-[18px] cursor-pointer dark:text-white hover:text-gray dark:hover:text-gray`}
                // href={item.href}
                // href='/'
                // onClick={() => handleItemClick(item.href, item)}
              >
                {parse(item.label)}
              </a>
            </li>
          ))}

        </ul>
      </div>
    );
  };

  return (
    <>
      <div className={localStorage.theme == 'dark' ?
        "bg-[#171925] relative py-4 lg:py-0 lg:pt-[3rem] border-t border-neutral-200 dark:border-neutral-700"
        :
        "relative pt-6 lg:pt-[3rem]  border-t border-neutral-200 dark:border-neutral-700"}>


        <div className="px-5 md:px-0 md:mx-[10vw] grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-5 lg:gap-x-0 relative z-[1]">
          {widgetMenus.map(renderWidgetMenuItem)}
          <FeedbackModal 
            isOpened={isFeedbackModalOpened} 
            setIsOpened={setIsFeedbackModalOpened} 
            title='Leave your Feedback' 
          />
          <ContactUsModal 
            isOpened={isContactUsModalOpen} 
            setIsOpened={setIsContactUsModalOpen} 
          />
          <SocialMedia />
          <div className="md:hidden space-y-2">
            <span className="text-white font-medium mb-4">Powered By</span>
              <img src={redSysIcon} className="w-[130px] bg-white p-2 rounded-md"/>
              <img src='https://bookperfect.imgix.net/brands/footerBrand13.svg' className="w-[130px] bg-white p-2 rounded-md"/>
              <img src='https://bookperfect.imgix.net/brands/footerBrandABTTA.png' className="w-[130px] bg-white p-2 rounded-md"/>
          </div>
        </div>


        {/* <div className="flex lg:hidden justify-center items-center mt-[75px] mb-[100px]">

          <div className="w-[20rem] border-2  border-transparent bg-[#F4F8FF] rounded-[4px]">
            <div className='w-full flex justify-center'>

              <div className='w-[90%] flex justify-center items-center border-b-2 border-[#BFC3D2] rounded-[2px]'>

                <div><img src={footerbrand} /></div>

                <div className='text-[#3F4249] text-[14px] px-1 font-medium'>Powered by</div>
                <div className='translate-y-[1px]'>
                  <img src='https://bookperfect.imgix.net/brands/footerBrand2.svg' />
                </div>
              </div>
            </div>

            <div className='w-full flex justify-center'>
              <div className='w-[90%] flex justify-between items-center border-b-2 border-[#BFC3D2] rounded-[2px]'>
                <div className='border-r-2 border-[#BFC3D2] m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand3.svg' /></div>
                <div className='border-r-2 border-[#BFC3D2] m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand4.svg' /></div>
                <div className='m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand5.svg' /></div>
              </div>
            </div>

            <div className='w-full flex justify-center'>
              <div className='w-[90%] flex justify-between items-center border-b-2 py-2  border-[#BFC3D2] rounded-[2px]'>
                <div className='border-r-2 border-[#BFC3D2] px-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand6.svg' /></div>
                <div className='border-r-2 border-[#BFC3D2] px-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand7.svg' /></div>
                <div className='border-r-2 border-[#BFC3D2] px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand8.svg' /></div>
                <div className='px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand9.svg' /></div>
              </div>
            </div>

            <div className='w-full flex justify-center'>
              <div className='w-[90%] flex justify-between items-center py-2'>
                <div className='border-r-2 border-[#BFC3D2] px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand.svg' /></div>
                <div className='px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand11.svg' /></div>
              </div>
            </div>
          </div>


          <div className="w-[20rem] flex translate-y-[10px]">
            <div className="w-[50%] bg-[#fff] mr-4 rounded-[4px] flex justify-center py-5">
              <img src='https://bookperfect.imgix.net/brands/footerBrandABTTA.png' />
            </div>
            <div className="w-[50%] bg-[#fff] rounded-[4px] flex justify-center px-5">
              <img src='https://bookperfect.imgix.net/brands/footerBrand13.svg' />
            </div>
          </div>

        </div>
         */}
        <div className='grid-cols-1 bigMd:grid-cols-3 md:h-full gap-x-4 mx-5 md:mx-[10vw] lg:hidden my-4 hidden'>
          <div className='col-span-2 h-full'>
            <div className="${getWidth().value} border-2 border-transparent bg-[#F4F8FF] rounded-[4px] h-full flex items-center flex-wrap">

              <div className='w-full flex justify-center'>
                <div className='w-[90%] flex justify-between items-center border-b-2 border-[#BFC3D2] rounded-[2px]'>
                  <div className='border-r-2 border-[#BFC3D2] m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand3.svg' /></div>
                  <div className='border-r-2 border-[#BFC3D2] m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand4.svg' /></div>
                  <div className='m-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand5.svg' /></div>
                </div>
              </div>

              <div className='w-full flex justify-center'>
                <div className='w-[90%] flex justify-between items-center border-b-2 py-2  border-[#BFC3D2] rounded-[2px]'>
                  <div className='border-r-2 border-[#BFC3D2] px-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand6.svg' /></div>
                  <div className='border-r-2 border-[#BFC3D2] px-2 flex-1'><img src='https://bookperfect.imgix.net/brands/footerBrand7.svg' /></div>
                  <div className='border-r-2 border-[#BFC3D2] px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand8.svg' /></div>
                  <div className='px-2 flex-1 flex justify-center'><img src='https://bookperfect.imgix.net/brands/footerBrand9.svg' /></div>
                </div>
              </div>

              <div className='w-full flex justify-center'>
                <div className='w-[90%] flex justify-between items-center py-2'>
                  <div className='border-r-2 border-[#BFC3D2] px-2 flex-1 flex justify-center'><img alt="" src='https://bookperfect.imgix.net/brands/footerBrand.svg' /></div>
                  <div className='px-2 flex-1 flex justify-center'><img alt="" src='https://bookperfect.imgix.net/brands/footerBrand11.svg' /></div>
                </div>
              </div>

            </div>
          </div>
          <div className="${getWidth().value} col-span-2 bigMd:col-span-1 flex flex-row bigMd:flex-col justify-between mt-2 bigMd:mt-0 space-x-2 bigMd:space-x-0 bigMd:space-y-4 h-24 md:h-auto">
            <div className="w-1/2 bigMd:w-auto  bg-[#fff] md:h-1/2 rounded-t-[4px] p-2 md:px-0 flex justify-center ${getWidth().padding}">
              <img src='https://bookperfect.imgix.net/brands/footerBrand13.svg' alt="" />
            </div>
            <div className="w-1/2 bigMd:w-auto bg-[#fff] md:h-1/2 rounded-t-[4px] flex justify-center py-5">
              <img src='https://bookperfect.imgix.net/brands/footerBrandABTTA.png' alt="" />
            </div>
          </div>
        </div>
        <div className=" hidden md:grid grid-cols-1 md:grid-cols-2 bg-[#F4F8FF] mt-[34px]">
          <PaymentAndSecurityBar />
          <FooterMembership />
        </div>
        <FooterFooter />
          <img className="absolute 
                          w-[90%] top-auto bottom-[512px] md:bottom-auto right-[1rem] 
                          xs:w-[100vw] xs:top-[60px]
                          md:w-[31vw] md:top-[0] md:right-[1rem]
                          lg:w-[27vw] lg:top-[0] lg:right-[2rem]
                          xl:w-[17vw] xl:top-[0] xl:right-[3rem]
                          2xl:w-[399px] 2xl:top-[-4rem] 2xl:right-[2rem]
          " alt="" src={Vector} />
          <div className="flex md:hidden justify-center items-center">
            <div className=" w-64 flex justify-center py-[18px] rounded-lg bg-white h-[130px] -mt-8">
              <a href='https://hotelistan.com' target={"_blank"} className='flex flex-col justify-center space-y-2 items-center '>
                <span className='mr-4 font-[cursive] font-semibold text-[#b4916e] text-xl'> By </span>
                <img className='w-[150px]' src="https://hotelistan.com/assets/images/logo.svg" />
              </a>
            </div>
          </div>
      </div>
    </>

  );
};

export default Footer;
