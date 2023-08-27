import React, { FC } from "react";
import { Link } from "react-router-dom";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType, TaxonomyType } from "../../data/types";
import { useHistory } from 'react-router-dom'
import tripideasImage from '../../images/tripidea.png'
import Badge from "../../lib/Badge/Badge";
import CImage from "../../lib/CImage/CImage";
import GalleryImageSlider from "../GaleryImageSlider/GalleryImageSlider";

export interface CardCategory4Props {
  className?: string;
  ratioClass?: string;
  data?: StayDataType;
  size?: "default" | "small";
  taxonomy: TaxonomyType;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const CardCategory4: FC<CardCategory4Props> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  taxonomy,
  ratioClass,
}) => {
  const {
    title,
    href
  } = data;

  const RenderTaxonomy = () => {
    // check if the component is being rendered on the Flights page
  let history = useHistory()
  let isFlightsPage = history.location.pathname == '/flights'

    return (
      <div className="relative w-full">
        <div className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-4  overflow-hidden group`}>
            <CImage
                src={isFlightsPage? tripideasImage : taxonomy.thumbnail}
                className="object-cover w-full h-full"
            />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
       </div>
      </div>
    );
  };

  const renderContent = () => {
    
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          {/* <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {listingCategory.name} · {bedrooms} beds
          </span> */}
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1 dark:text-white">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            <span className="">Lorem, ipsum dolor sit amet</span>
            <i className="ml-3 las la-arrow-right text-xl absolute right-3 bottom-3"></i>
          </div>
        </div>
       </div>
    );
  };

  return (
    <div
      className={`group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow ${className}`}
    >
      <Link to={href}>
        {RenderTaxonomy()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default CardCategory4;
