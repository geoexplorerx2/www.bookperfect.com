import React, { FC, useEffect, useMemo } from "react";
import Glide from "@glidejs/glide";
import { StayDataType, TaxonomyType } from "../../data/types";
import Heading from "../../lib/Heading/Heading";
import NextPrev from "../../lib/NextPrev/NextPrev";
import { CardCategory1, CardCategory2, CardCategory3 } from "../CardCategory";
import FlightCard from "../StayCard/FlightCard";
import DestinationsCard from "../StayCard/DestinationsCard";
import { DEMO_STAY_LISTINGS } from "../../data/listings";

import americaimage from '../../images/americaimage.svg';
import asiaimage from '../../images/asiaimage.svg';
import europeimage from '../../images/europeimage.svg';

import americamap from '../../images/americamap.svg';
import asiamap from '../../images/asiamap.svg';
import europemap from '../../images/europemap.svg';
import services from "../../api/services";
import { useDispatch, useSelector } from "react-redux";
import { continent } from "../../store/actions/TravelguideActions";
import Loader from "../Loader/Loader";
// import DestinationCities from "./DestinationCities";

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 3);

export interface BrowserDestinationsProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
  gridClass?: string;
  browseDestination: any;
  data: any;
};


const BrowserDestinations: FC<BrowserDestinationsProps> = ({
  heading = "",
  subHeading = "",
  className = "",
  itemClassName = "",
  categories = [],
  itemPerRow = 3,
  categoryCardType = "card3",
  sliderStyle = "style1",
  uniqueClassName,
  gridClass = "",
  browseDestination,
  data
}) => {

  const UNIQUE_CLASS = "BrowserDestinationsProps" + uniqueClassName;

  const dispatch = useDispatch();
  const continentData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.continent);

  let MY_GLIDEJS = useMemo(() => {

    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 32,
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
          perView: 1.3,
        },
      },
    });

  }, [UNIQUE_CLASS]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     MY_GLIDEJS.mount();
  //   }, 100);
    
  // }, [MY_GLIDEJS, UNIQUE_CLASS]);


  const renderCard = (item: any, index: any) => {
    return <DestinationsCard
               key={index} 
               data={item} 
               browseDestination = { (dest: any, taxo: any) =>  browseDestination(dest, taxo) }
            />;
  };

  return (
    <div 
      className={`px-5 md:mx-[10vw] browser-property ${className}`} 
    >
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          desc={subHeading}
          hasNextPrev={sliderStyle === "style2"}
          isCenter={sliderStyle === "style2"}
        >
          {heading}
        </Heading>
        
       
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 md:mt-5 md:gap-[14px] ${gridClass}`} > 
          {
            <>
              {data && data.length > 0 && data.map((continent: any, index: number) =>  continent.name !== 'Antarctica' && renderCard(continent, index))}
            </>
          }
        </div> 
{/*         
        <div className="glide__track grid grid-col-6" data-glide-el="track">
          <ul className="glide__slides">
             {
              data?.map((item: any, index: number) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                { data(item, index) }
                </li>
              )) 
             }
          </ul>
        </div>

        { sliderStyle === "style2" && (
          <NextPrev className="justify-center mt-16" />
        ) } */}
      </div>
    </div>
  );
};

export default BrowserDestinations;
