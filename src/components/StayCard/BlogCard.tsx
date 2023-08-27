import React, { FC } from "react";
import { Link } from "react-router-dom";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";

import Badge from "../Badge/Badge";

import blog from "../../images/blog.png";
import bookmark from "../../images/bookmark.png";


import styled from "styled-components";


export interface BlogCardProps {
  className?: string;
  ratioClass?: string;
  data?: StayDataType;
  size?: "default" | "small";
  cardType?: string;
};

const PriceWrapper = styled.div`
  // position: absolute;
  width: 47px;
  height: 27px;
  // left: 314px;
  // top: 499px;
  margin-left: 50%; 

  /* h6/bold */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */


  /* primary */

  color: #3944B3;
`;

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const BlogCard: FC<BlogCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  ratioClass,
  cardType
}) => {
  const {
    galleryImgs,
    listingCategory,
    address,
    title,
    bedrooms,
    href,
    like,
    priceIn,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id
  } = data;

  // TODO: image fit content for different hotels images
  const renderContent = () => {
   
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" style={{border:'.5vw solid red'}}>

              <>
                <div className="relative">
                  <img className="w-full" src={blog} alt="product image" />
                    
                  <div className='absolute left-3 bottom-3 w-18 h-6 bg-[#F96254] rounded-lg flex items-center justify-center text-xs py-0.5 px-3'>
                    <img src={bookmark} className='w-4 h-4' />
                    <span className='text-xs text-white ml-3'>May 08, 2020</span>
                  </div>

                </div>
                <div className="px-5 py-5 pb-5">
                    <a href="#">
                        <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">Rome, Madrid and Lisbaa</h5>
                    </a>
                    <div className="flex mt-3 items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
                        <span className="text-xs">Lorem, ipsum dolor sit amet consectetur .</span>
                    </div>
                </div> 
              </>  
        
        </div>
    );
  };

  return (
    <div
      className={`trip-idea-card group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="trip-idea-card">
        { renderContent() }
    </div>
  );
};

export default BlogCard;
