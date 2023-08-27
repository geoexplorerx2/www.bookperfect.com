import React, { FC, useEffect, useMemo } from "react";
import Glide from "@glidejs/glide";
import { TaxonomyType } from "../../data/types";
import Heading from "../../lib/Heading/Heading";
import NextPrev from "../../lib/NextPrev/NextPrev";
import { CardCategory1, CardCategory2, CardCategory3 } from "../CardCategory";
import ButtonSecondary from "../../lib/Button/ButtonSecondary";
import {useHistory} from 'react-router-dom'

export interface BrowserPropertyProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
}

const BrowserProperty: FC<BrowserPropertyProps> = ({
  heading = "",
  subHeading = "",
  className = "",
  itemClassName = "",
  categories = [],
  itemPerRow = 6,
  categoryCardType = "card3",
  sliderStyle = "style1",
  uniqueClassName,
}) => {
  const UNIQUE_CLASS = "BrowserPropertyProps" + uniqueClassName;
  // determine if the component is being rendered on the hotels page
    let history = useHistory();
    let isHotelsPage = history.location.pathname == '/hotels'


  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 24,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  const renderCard = (item: TaxonomyType, index: number) => {
    switch (categoryCardType) {
      case "card3":
        return <CardCategory1 taxonomy={item} section = "browser_property" cardHeight = "h-64" roundedCard = "rounded-lg" truncatePosition = "" index={index} />;
      case "card4":
        return <CardCategory2 taxonomy={item} />;
      case "card5":
        return <CardCategory3 taxonomy={item} />;
      default:
        return <CardCategory1 taxonomy={item} />;
    }
  };

  return (
    <div 
      className={`browser-property ${className} mx-5 md:mx-[10.1vw] relative z-10`} 
      // style={{width: '80%'}}
    >
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          desc={subHeading}
          hasNextPrev={sliderStyle === "style1"}
          isCenter={sliderStyle === "style2"}
          headingWrapperClassNames= 'font-normal !text-base md:!text-[28px]'
          subheadingClassNames={`!text-[#0E123D] dark:!text-white mt-0 md:mt-2`}
          nextPrevClassNames='hidden md:flex '
          className="!pb-0 md:!pb-5"
        >
          {heading}
        </Heading>
        <div className="glide hidden md:block ">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {categories.map((item, index) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  {renderCard(item, index)}
                </li>
              ))}
            </ul>
          </div>
        </div>
       
        <div className="relative md:hidden mt-5" >
          <ul className="grid grid-cols-2  gap-4">
            {categories.map((item, index) => (
                  <li 
                    key={index} 
                    className={`glide__slide w-[160px] sm:w-full sm:max-w-[180px] ${itemClassName}`} >
                    {renderCard(item, index)}
                  </li>
            ))}
          </ul>
        </div>

        {sliderStyle === "style2" && (
          <NextPrev className="justify-center mt-16" />
        )}
        <ButtonSecondary className="!leading-none md:hidden !rounded-2xl mt-5 ml-92 border-[#3944B3] bg-[#3944B3] w-full min-w-[333px] !h-[40px] ">
          <span className="text-white font-normal">More Info</span>
          <i className="ml-3 las la-arrow-right text-xl text-white"></i>
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default BrowserProperty;
