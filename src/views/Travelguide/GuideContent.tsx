import React, { useEffect, useRef, useState, FC } from 'react';
import { stripHtml } from '../../common/stripHtml';
import { SectionBackground } from '../../components';
import GuideHeader from './GuideHeader';
import TravelTips from './TravelTips';
import guideimage from '../../images/guide.png';
import gettingarround from '../../images/gettingarround.svg';
import travelguidImage from '../../images/travelguidImage.svg';
import { BASE_URL } from '../../api/env';
import { goToPage } from '../../common/goToPage';
import useWindowSize from '../../hooks/useWindowSize';
import guideBanner from '../../images/guide-banner.png'
import { useTranslation } from 'react-i18next';
import { useScroll } from '../../hooks';
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSkeleton';
import {

  useParams
} from "react-router-dom";
import CityDealsShortcutBtn from '../../components/CityDealsShortcutBtn/CityDealsShortcutBtn';

interface GuideItemType {
  content: any,
  taxonomy: any
  renderContent: (content: any, index: number) => {
    __html: string;
},
index: number,
responsiveStyle: () => {
  morebtn: string | null;
  moreShift: string | null;
  viewAttraction: string | null;
  shiftAttraction: string | null;
},


}


const GuideItem: FC<GuideItemType> = (props) => {
  const { content ,renderContent, index, responsiveStyle, taxonomy } = props
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(false)
   // @ts-ignore
   const { t } = useTranslation()
   const wrapperRef = useRef<HTMLDivElement>(null)
   const isIntersecting = useScroll(wrapperRef?.current as HTMLElement);
 
   useEffect(() => {
    if(isIntersecting) {
      setTimeout(() => {
        setIsSkeletonVisible(false)
      } ,0)
    }else if (!isIntersecting){
      setIsSkeletonVisible(false)
    }
    
  } ,[isIntersecting])


  return (
    <div ref={wrapperRef}>
      {
        isSkeletonVisible 
        ?
        <LoadingSkeleton />
        : <>
          <div className='w-full flex space-x-6' 
          
          >


            {content.type != "call_to_action" && <div dangerouslySetInnerHTML={renderContent(content, index)} className='content_wrapper dark:text-[#fff] overflow-scroll md:overflow-hidden text-justify' />}
          </div>
          {
            content.type == "call_to_action" &&
            <div className='mt-8 flex-col space-y-8 cursor-pointer relative min-h-[530px]'>
              <img
                src={content.background_image.url}
                className="w-full min-h-[450px] max-h-[480px] absolute top-0 z-1"
              />
              <div className='z-2 w-full absolute top-36 px-4 lg:px-10'>
                <div className='w-full lg:w-[50%] text-[#0E123D] text-[16px] font-normal'>
                  <div dangerouslySetInnerHTML={{ __html: content.body }} className='content_wrapper dark:text-[#fff] overflow-scroll md:overflow-hidden text-justify' />
                  {/* <div className='w-full'>Get free access to <span className='font-bold'>75+</span> top attractions, tours and</div>
                  <div className='mb-[20px]'>essential local services with</div>
                  <div><span className='font-bold'>Istanbul Tourist Pass®</span> with over <span className='font-bold'>80%</span> savings.</div>
                  <div>Starting from just <span className='font-bold'>€95!</span></div> */}
                </div>
              </div>
              <div className={`w-full absolute top-0 z-2 flex px-4 lg:px-0 ${responsiveStyle().moreShift} ${responsiveStyle().morebtn}`}>
                <div className='text-[#F75847] text-xl lg:text-[30px] font-bold flex items-center'>
                  {content.title}
                  {/* {t("GUIDE_CONTENT_COMP.MORE_ISTANBUL")} */}
                </div>
                <div className='mx-[12px]'>
                  <button className='bg-[#F75847] w-full h-full text-[#fff] text-[22px] font-bold rounded-[4px] px-[15px] py-[4px]'>
                    {content.call_to_action_text}
                    {/* {t("GUIDE_CONTENT_COMP.FOR_LESS")} */}
                  </button>
                </div>
              </div>
              <div className={`w-full absolute bottom-0 z-2 flex ${responsiveStyle().shiftAttraction} ${responsiveStyle().viewAttraction}`}>
                <div>
                  <button onClick={() => goToPage(content.buttons[0].url.uri, 'redirect')} className='bg-[#3944B3] text-[#fff] text-[14px] font-semibold py-[10px] px-[20px] rounded-[8px] flex items-center'>
                    {t("GUIDE_CONTENT_COMP.VIEW_ATTRACTIONS")}
                  </button>
                </div>
                <div className='ml-[14px]'>
                  <button onClick={() => goToPage(content.buttons[0].url.uri, 'redirect')} className='bg-[#F75847] text-[#fff] text-[14px] font-semibold py-[10px] px-[39px] rounded-[8px] flex items-center'>
                    {t("GUIDE_CONTENT_COMP.BUY_&_SAVE")}
                  </button>
                </div>
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}



const GuideContent = ({ scrolltotarget, activeContent, allGuides, allGuidesDetail, city, overviewData, setActiveSideGuide, taxonomy }: any) => {

  const origin = window.location.origin;
  const pathname1 = window.location.pathname.split('/');
  const route = pathname1.slice(0, pathname1.length - 1).join('/');
  const URL = origin + route;
  const { width, height } = useWindowSize();
  const [scrollToGuideOverview, setScrollToGuideOverview] = useState(false);
  const pathname = window.location.pathname.split('/').length === 12;
  const activeGuide = allGuides && allGuides.find((guide: any) => guide?.id == activeContent?.data?.id);
  const activeGuideIndex = !!activeGuide && allGuides.indexOf(activeGuide);
  const nextGuide = allGuides && scrollToGuideOverview ? !pathname && allGuides[0] : !pathname && allGuides[activeGuideIndex + 1];
  let params = useParams();

  useEffect(() => {
    console.log('the active item problem: activeGuide', activeGuide)
  } ,
  [activeGuide])
  const toView: any = document.getElementById(activeContent.data?.id ?? params?.scrollId) as HTMLInputElement | null;

  const toViewNext: any = document.getElementById(nextGuide?.id) as HTMLInputElement | null;
  // @ts-ignore
  const { t } = useTranslation()

  const [domLoaded, setDomLoaded] = useState<any>(pathname);
  const [hasScrolled, setHasScrolled] = useState(false)

  // TODO: scroll to useref with intersection observer
  // const ref = useRef<any>();

  useEffect(() => {
    if (scrolltotarget && scrolltotarget !== undefined) { window.history.replaceState(null, "replace", `${URL}/${scrolltotarget}`) }
  }, [hasScrolled]);

  useEffect(() => {
    if (scrolltotarget && hasScrolled && activeGuide.type !== 'call_to_action') {
      window.history.replaceState(null, "replace", `${URL}/${activeGuide?.id}`)
    }
    if (scrolltotarget && hasScrolled && activeGuide.type === 'call_to_action') {

      setActiveSideGuide({
        menu: nextGuide?.title,
        active: true,
        data: nextGuide,
        notautoscroll: true
      });
      window.history.replaceState(null, "replace", `${URL}/${allGuides[activeGuideIndex + 1]?.id}`)
    }

    setHasScrolled(true)
  }, [activeGuide])
  // element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  // toView?.scrollIntoView() ;

  // TODO: set dom loaded status over first time scroll done for active guide
  useEffect(() => {
    console.log('the active item problem: toView: from GuideContent useEffect', toView)
    console.log('the active item problem: toView: slug', params)

    const yOffset = -90;
    const scrollPosition = toView?.getBoundingClientRect()?.top! + window.pageYOffset + yOffset;
    if (!activeContent.notautoscroll && activeContent.data && activeContent.data.id ) {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
      // setDomLoaded(false);
    }
  }, [toView]);

  useEffect(() => {
    let guidePos: any = toViewNext?.getBoundingClientRect()?.top! + window.pageYOffset - 90;
    let winHeight = window.innerHeight;
    let guideSwitcherPos = guidePos.toFixed(0);

    if (toViewNext) {
      window.addEventListener('scroll', () => {
        let yScrollPos = window.pageYOffset.toFixed(0);
        let triggerPoint = Number(yScrollPos) > Number(guideSwitcherPos) || Number(yScrollPos) == Number(guideSwitcherPos);

        if (
          Number(yScrollPos) < 1420
          // && !domLoaded
        ) {
          setScrollToGuideOverview(true);
          setActiveSideGuide({
            menu: nextGuide.title,
            active: true,
            data: nextGuide,
            notautoscroll: true
          });
        };

        if (
          triggerPoint &&
          !scrollToGuideOverview
          // && !domLoaded
        ) {
          setScrollToGuideOverview(false);
          setActiveSideGuide({
            menu: nextGuide.title,
            active: true,
            data: nextGuide,
            notautoscroll: true
          });
        }

        // setDomLoaded(false);
      });
    }

    // setDomLoaded((domLoaded: boolean) => !domLoaded);
  }, [toViewNext, domLoaded]);

  // const observer = new IntersectionObserver(function (entries: any, observer) {
  //   entries.forEach((entry: any) => {

  //     console.log('entry', entry);
  //     if ( entry.isVisible ) {
  //       alert('element is view...');
  //     }})
  //   })

  //    observer.observe(document.querySelector('.173'));

  const renderContent = (content: any, index: number) => {
    const isEven = (num: number) => {
      return num % 2 == 0 ? true : false
    }
    return {
      __html: `
    <div>
      <img class='rounded-lg aspect-1 md:aspect-[1.5] max-w-[60%] md:max-w-[40%] ${isEven(index) ? 'float-right ml-4' : 'float-left mr-4'}  mb-2'' src=${guideImg(content)} alt='' />
      ${content.body}
    </div>
    `}
  };

  const guideImg = (guide: any) => BASE_URL + guide.field_subtopic_image;

  const responsiveStyle = () => {
    // console.log('width::', width);
    let morebtn = null;
    let moreShift = null;
    let viewAttraction = null;
    let shiftAttraction = null;
    if (width > 780 && width <= 800) { morebtn = 'translate-y-[30px]'; moreShift = 'translate-x-[30px]'; viewAttraction = '-translate-y-[110px]'; shiftAttraction = 'translate-x-[30px]' }
    if (width > 800 && width <= 1023) { morebtn = 'translate-y-[30px]'; moreShift = 'translate-x-[30px]'; viewAttraction = '-translate-y-[110px]'; shiftAttraction = 'translate-x-[30px]' }
    if (width > 1023 && width <= 1424) { morebtn = 'translate-y-[30px]'; moreShift = 'translate-x-[30px]'; viewAttraction = '-translate-y-[110px]'; shiftAttraction = 'translate-x-[30px]' }
    if (width > 1424 && width <= 1600) { morebtn = 'translate-y-[30px]'; moreShift = 'translate-x-[30px]'; viewAttraction = '-translate-y-[130px]'; shiftAttraction = 'translate-x-[30px]' }
    if (width > 1600 && width <= 1700) { morebtn = 'translate-y-[30px]'; moreShift = 'translate-x-[30px]'; viewAttraction = '-translate-y-[130px]'; shiftAttraction = 'translate-x-[30px]' }
    if (width > 1700 && width <= 1900) { morebtn = 'translate-y-[30px]'; moreShift = 'translate-x-[40px]'; viewAttraction = '-translate-y-[110px]'; shiftAttraction = 'translate-x-[40px]' }
    if (width > 1900) { morebtn = 'translate-y-[30px]'; moreShift = 'translate-x-[50px]'; viewAttraction = '-translate-y-[130px]'; shiftAttraction = 'translate-x-[50px]' }
    return {
      morebtn,
      moreShift,
      viewAttraction,
      shiftAttraction,
    }
  }
  return (
    <div className='flex-col space-y-6'>
      {
        overviewData &&
        <div>
          {overviewData.body && stripHtml(overviewData.body)}
        </div>
      }
      {
        allGuides?.map((content: any, index: number) => {
          const guide_content = content.hasOwnProperty('title') ? allGuidesDetail && allGuidesDetail.length && allGuidesDetail.filter((guide: any) => guide.title == content.title) :
            allGuidesDetail && allGuidesDetail.length && allGuidesDetail.filter((guide: any) => guide.title == content.field_st_title)

          return (
            <div className='' id={content.id} >
                {
                  index > 0 &&
                  <div className='w-full h-[150px] inline-block lg:hidden'>
                    <CityDealsShortcutBtn taxonomy={taxonomy} />
                </div>}
              {
                content.type != 'call_to_action' &&
                <GuideHeader
                  subHeading=""
                  heading={content}
                  city={city}
                />
              }
            

              {/* <div className='text-[14px] text-[#3F4249] font-light leading-[28px] font-poppins dark:text-[#fff]'> */}
              {/* { stripHtml(content.body) } */}
              {/* <div dangerouslySetInnerHTML={{ __html: content.body }} /> */}
              {/* </div> */}

              {
                index != 0 &&
                // <>
                //   <div className='w-full flex space-x-6' 
                //   // ref={ref => refsArray[index] = ref}
                //   >
                //     {content.type != "call_to_action" && <div dangerouslySetInnerHTML={renderContent(content, index)} className='content_wrapper dark:text-[#fff] overflow-scroll md:overflow-hidden text-justify' />}
                //   </div>
                //   {
                //     content.type == "call_to_action" &&
                //     <div className='mt-8 flex-col space-y-8 cursor-pointer relative min-h-[530px]'>
                //       <img
                //         src={content.background_image.url}
                //         className="w-full min-h-[450px] max-h-[480px] absolute top-0 z-1"
                //       />
                //       <div className='z-2 w-full absolute top-36 px-10'>
                //         <div className='w-[50%] text-[#0E123D] text-[16px] font-normal'>
                //           <div dangerouslySetInnerHTML={{ __html: content.body }} className='content_wrapper dark:text-[#fff] overflow-scroll md:overflow-hidden text-justify' />
                //           {/* <div className='w-full'>Get free access to <span className='font-bold'>75+</span> top attractions, tours and</div>
                //           <div className='mb-[20px]'>essential local services with</div>
                //           <div><span className='font-bold'>Istanbul Tourist Pass®</span> with over <span className='font-bold'>80%</span> savings.</div>
                //           <div>Starting from just <span className='font-bold'>€95!</span></div> */}
                //         </div>
                //       </div>
                //       <div className={`w-full absolute top-0 z-2 flex ${responsiveStyle().moreShift} ${responsiveStyle().morebtn}`}>
                //         <div className='text-[#F75847] text-[30px] font-bold flex items-center'>
                //           {content.title}
                //           {/* {t("GUIDE_CONTENT_COMP.MORE_ISTANBUL")} */}
                //         </div>
                //         <div className='mx-[12px]'>
                //           <button className='bg-[#F75847] w-full h-full text-[#fff] text-[22px] font-bold rounded-[4px] px-[15px] py-[4px]'>
                //             {content.call_to_action_text}
                //             {/* {t("GUIDE_CONTENT_COMP.FOR_LESS")} */}
                //           </button>
                //         </div>
                //       </div>
                //       <div className={`w-full absolute bottom-0 z-2 flex ${responsiveStyle().shiftAttraction} ${responsiveStyle().viewAttraction}`}>
                //         <div>
                //           <button onClick={() => goToPage(content.buttons[0].url.uri, 'redirect')} className='bg-[#3944B3] text-[#fff] text-[14px] font-semibold py-[10px] px-[20px] rounded-[8px] flex items-center'>
                //             {t("GUIDE_CONTENT_COMP.VIEW_ATTRACTIONS")}
                //           </button>
                //         </div>
                //         <div className='ml-[14px]'>
                //           <button onClick={() => goToPage(content.buttons[0].url.uri, 'redirect')} className='bg-[#F75847] text-[#fff] text-[14px] font-semibold py-[10px] px-[39px] rounded-[8px] flex items-center'>
                //             {t("GUIDE_CONTENT_COMP.BUY_&_SAVE")}
                //           </button>
                //         </div>
                //       </div>
                //     </div>
                //   }
                // </>
                <GuideItem content={content} index={index} renderContent={renderContent} responsiveStyle={responsiveStyle} key={index} taxonomy={taxonomy} />
                
              }
              {
                index == 0 &&
                <>
                  <div className='mt-8 flex-col space-y-8'>
                    <img src={content.field_subtopic_image ? guideImg(content) : guideimage} className="w-[100%] h-[450px] rounded-xl" />
                    {/* <img src={ guideimage} className="w-[100%]" /> */}
                    {/* <span className='text-xs text-[#F75847]'>{city}</span> */}
                    {/* <span className='text-xs text-[#F75847]'>Buckingham Palace in London, England.</span> */}
                  </div>

                  {/* <div className='mt-8 text-[14px] text-[#3F4249] font-light leading-[28px] font-poppins dark:text-[#fff]'> */}
                  <div className='mt-8 leading-[28px] dark:text-[#fff]'>
                    {/* { guide_content && stripHtml(guide_content[0].field_st_body) } */}
                    {/* { stripHtml(content.body) } */}
                    <div dangerouslySetInnerHTML={{ __html: content.body }} />
                  </div>

                  <div className="relative pb-10 lg:py-16 mt-20">
                    <SectionBackground
                      className="bg-[#FFF9F9] dark:bg-black dark:bg-opacity-20"
                      isWidth="xl:max-w-full"
                      isRounded="rounded-2xl"
                    />

                    <TravelTips
                      heading="Travel Tips from the travellers"
                      subHeading="Whether it’s winding your way up the centuries-old spiral staircase in the Tower of London, enjoying the city views from Level"
                      isHeadingCenter={false}
                    />
                  </div>
                </>
              }
            </div>
          )
        })
      }
      {/* <div className='text-[14px] text-[#3F4249] font-light leading-[28px] font-poppins'>
          {activeContent[0] && stripHtml(activeContent[0].field_st_body)}
        </div> */}

      {/* <div>
          <img src={activeContent && activeContent.data.content && activeContent.data.content.image} />
          <span className='text-xs text-[#F75847]'>{activeContent && activeContent.data.content && activeContent.data.content.location}</span>
        </div>
        <div className='text-sm font-light' style={{fontFamily: 'Poppins'}}>
          {activeContent && activeContent.data.content && activeContent.data.content.about}
        </div> */}
    </div>
  )
};

export default GuideContent;