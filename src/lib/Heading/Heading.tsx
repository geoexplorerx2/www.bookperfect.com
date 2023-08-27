import React, { HTMLAttributes, ReactNode } from "react";
import NextPrev from "../NextPrev/NextPrev";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ButtonSecondary from "../Button/ButtonSecondary";
import { stripHtml } from "../../common/stripHtml";
import { useTranslation } from "react-i18next";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  fontClass?: string;
  heading?: string;
  headingClassNames?: string;
  desc?: any;
  hasNextPrev?: boolean;
  isCenter?: boolean;
  headingWrapperClassNames?: string,
  subheadingClassNames?: string;
  nextPrevClassNames?: string;
  showMoreButton?: boolean;
  handleMoreDeals?: () => void,
  ideasType?: string
  handleButtonText?: any;
};

const HeadingWrapper = styled.div`

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
  /* identical to box height */

  color: orange;
`;

const SubHeadingWrapper = styled.div`
  // position: absolute;
  // width: 359px;
  // height: 27px;
  // left: 0px;
  // top: 42px;

  /* h6/light */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */


  /* title */

  color: green;

  
`;

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "Discover the most outstanding articles in all topics of life.",
  className = `md:mb-5 mb-0 text-neutral-900 dark:text-neutral-50`,
  isCenter = false,
  hasNextPrev = false,
  heading,
  headingClassNames,
  headingWrapperClassNames,
  subheadingClassNames,
  nextPrevClassNames,
  showMoreButton,
  handleMoreDeals,
  ideasType,
  handleButtonText,
  ...args
}) => {
  let MODELIGHT = useSelector((state: any) => state.LightMode);
  // @ts-ignore
  const {t} = useTranslation()
  return (
    <div
      //'.1vw solid rgba(207,203,211,1)'
      // style={{ borderBottom:   ? ' 1px solid' : '' }}
      className={`section-heading relative flex flex-col sm:flex-row sm:items-end justify-between pb-4 xl:pb-0 w-full 
      ${children == 'Travel Blog' 
      || children == 'Hotels' 
      || children == 'Our Trips Ideas' 
      || children == 'Trip ideas' ? 'border-b-[1px] border-neutral-400':''} ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-lg mx-auto mb-4" : " w-full flex items-end justify-between"
        }
      >
        <div className="w-full">

          <HeadingWrapper>
            <h2
              //  style = {{fontFamily: 'Poppins', color:(localStorage.getItem('theme')=='dark'?'#F4F8FF':
              // children=='Top International Destination'?'#fff':'#000')}}

              {...args}
              className={`${headingWrapperClassNames} text-[#15173F] dark:text-[#F4F8FF] text-[28px]`}>
              {/* {heading || children} */}
              {
                heading ?
                  <div dangerouslySetInnerHTML={{ __html: heading }} /> :
                  children
              }
            </h2>
          </HeadingWrapper>
          {desc && (
            <SubHeadingWrapper>
              <span style={{ color: (desc == 'Here you can see our featured trip ideas' || localStorage.getItem('theme') == 'dark' ? '#F4F8FF' : '#000') }} className={`${subheadingClassNames} font-light pt-1 block text-xs sm:text-lg md:pb-[20px] text-[#15173F] dark:text-neutral-400 md:max-w-[80%]`}>
                {/* {desc} */}
                {/* @ts-ignore */}
                {/* { desc && <div dangerouslySetInnerHTML={{ __html: desc }} />} */}
                {desc && stripHtml(desc)}
              </span>
            </SubHeadingWrapper>

          )}
        </div>
        {
          showMoreButton &&
          <span className="hidden sm:flex sm:relative items-center min-w-[auto] md:min-w-[167px] w-full sm:w-auto max-h-[40px] flex-shrink-0">
            <ButtonSecondary onClick={() => handleMoreDeals && handleMoreDeals()} rounded="rounded-2xl" className="!leading-none border  border-[#F75847] dark:border-white group dark:hover:border-[#3944B3] hover:border-[#3944B3] w-full">
              <span className="text-[#F75847] dark:text-white group-hover:text-[#3944B3] text-[15px] ">{ideasType == 'hotels' ? handleButtonText() : (ideasType == 'discoverdestination' ? t('POPULAR_DESTINATIONS.ALL_DESTNATIONS') : t('TRIP_IDEAS.MORE_IDEAS'))}</span>
              <i className="ml-3 las la-arrow-right text-xl text-[#F75847] dark:text-white group-hover:text-[#3944B3] translate-y-[2px]"></i>
            </ButtonSecondary>
          </span>
        }
      </div>
      {hasNextPrev && !isCenter && (
        <div className={`${nextPrevClassNames}mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0`}>
          <NextPrev onClickNext={() => { }} onClickPrev={() => { }} />
        </div>
      )}
    </div>
  );
};

export default Heading;
