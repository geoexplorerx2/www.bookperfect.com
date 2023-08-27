import React, { FC } from "react";
import styled from "styled-components";
import StarRatings from 'react-star-ratings';

import CImage from "../../lib/CImage/CImage";
import { StayDataType } from "../../data/types";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import hotelroom from "../../images/hotelroom.png";
import hotelbed from "../../images/hotelbed.png";
import hotelpicture from "../../images/hotelpicture.png";
import Badge from "../Badge/Badge";

import destpin from "../../images/dest-pin.png";

export interface ResultCardProps {
  className?: string;
  data?: StayDataType;
  size?: "default" | "small";
};

const HotelPriceWrapper = styled.div`
  /* h4/medium */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  /* identical to box height */

  text-align: right;

  /* primary */

  color: #3944B3;
`;

const HotelNameWrapper = styled.div`
  /* h6/medium */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  /* title */

  color: #0E123D;
`;
const DEMO_DATA: StayDataType = DEMO_STAY_LISTINGS[0];

const ResultCard: FC<ResultCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    featuredImage,
    title
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden">
        <div className="aspect-w- aspect-h-9 ">
          <CImage
            containerClassName="flex items-center justify-center"
            className="w-full"
            src={featuredImage}
          />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex">

        <div className="flex-col">
          <div className="relative">
            <img className="w-full" src={hotelroom} alt="product image" />

            <div className="flex absolute top-40 ml-3.5 space-x-16">
              <div className="flex-1 w-12 h-12 mt-5">
                <Badge className="bg-[#F75847] rounded-full space-x-1 " desc = "" icon = {hotelbed} color="#F75847" />
              </div>
              <div className="flex-1 w-8 h-8">
                {/* <Badge className="bg-[#FE9A7A] rounded-full" desc = "5" icon = "" color='#FE9A7A' /> */}
              </div>
              <div className="flex-1 w-12 h-12 mt-5">
                <Badge className="bg-[#F75847] rounded-full space-x-1 " desc = "12" icon = {hotelpicture} color="#F75847" />
              </div>
            </div>

          </div>
        </div>

        <div className="flex-col pl-5">

          <div className="flex space-x-2">

            <div className="flex-1 flex-col block basis-1/2 ">
              {/* <h2
                className={` capitalize ${
                  size === "default"
                    ? "text-xl font-semibold"
                    : "text-base font-medium"
                }`}
                style = {{fontFamily: "Poppins"}}
              > */}
              <HotelNameWrapper>
                {/* <span className="line-clamp-1"> */}
                  {title}
                {/* </span> */}
              </HotelNameWrapper>
              {/* </h2> */}

              <a  href = "" className="flex space-x-2" style={{fontFamily: "Poppins", fontSize: "12px", color: '#3944B3'}}>
                <span className = "mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0.875C5.72409 0.876447 4.50085 1.38394 3.59865 2.28615C2.69644 3.18835 2.18895 4.41159 2.1875 5.6875C2.1875 9.80547 6.5625 12.9172 6.74844 13.0484C6.82295 13.0981 6.91048 13.1245 7 13.1245C7.08952 13.1245 7.17705 13.0981 7.25156 13.0484C7.4375 12.9172 11.8125 9.80547 11.8125 5.6875C11.8111 4.41159 11.3036 3.18835 10.4014 2.28615C9.49915 1.38394 8.27591 0.876447 7 0.875ZM7 3.9375C7.34612 3.9375 7.68446 4.04014 7.97225 4.23243C8.26003 4.42472 8.48434 4.69803 8.61679 5.0178C8.74924 5.33757 8.7839 5.68944 8.71637 6.02891C8.64885 6.36837 8.48218 6.68019 8.23744 6.92494C7.99269 7.16968 7.68087 7.33635 7.34141 7.40387C7.00194 7.4714 6.65007 7.43674 6.3303 7.30429C6.01053 7.17184 5.73722 6.94753 5.54493 6.65975C5.35264 6.37196 5.25 6.03362 5.25 5.6875C5.25 5.22337 5.43437 4.77825 5.76256 4.45006C6.09075 4.12187 6.53587 3.9375 7 3.9375Z" fill="#3944B3"/>
                  </svg>
                </span>

                <span className="bg-[#3944B]" style={{color: "#3944B3", fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500}}>
                  Show Map
                </span>
              </a>
            </div>
            <div className="flex-1 flex-col pl-24 items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              {/* <span className="">{seats} seats</span>
              <span>-</span>
              <span className="">{gearshift} </span> */}

               <HotelPriceWrapper>
                 1,039$
               </HotelPriceWrapper>

            </div>

          </div>

          {/* <div className="w-14  border-b border-neutral-100 dark:border-neutral-800"></div> */}
          
          <div className="flex mt-3 justify-between items-center">
              <div className="relative">
                  <div className="flex absolute space-x-6">
                    <div className="flex-1">
                      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.875 9.34375H7.1875V18.6875H2.875C2.68438 18.6875 2.50156 18.6118 2.36677 18.477C2.23198 18.3422 2.15625 18.1594 2.15625 17.9688V10.0625C2.15625 9.87188 2.23198 9.68906 2.36677 9.55427C2.50156 9.41948 2.68438 9.34375 2.875 9.34375V9.34375Z" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.1875 9.34375L10.7812 2.15625C11.5437 2.15625 12.275 2.45915 12.8142 2.99832C13.3533 3.53748 13.6562 4.26875 13.6562 5.03125V7.1875H19.2176C19.4214 7.187 19.623 7.23012 19.8088 7.31397C19.9945 7.39782 20.1602 7.52045 20.2947 7.67364C20.4292 7.82682 20.5293 8.00701 20.5883 8.2021C20.6474 8.39718 20.664 8.60264 20.6371 8.80469L19.559 17.4297C19.5154 17.7759 19.3473 18.0945 19.0861 18.3259C18.8249 18.5574 18.4884 18.6859 18.1395 18.6875H7.1875" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1" style={{fontFamily: "Poppins", fontSize: '16px', fontWeight:700, color: "#F75847"}} >
                      89%
                    </div>
                    <div className="flex-1 ">
                      {/* TODO: attached this to a controlled component */}
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      </div>

                      {/* <StarRatings
                          rating={4}
                          starRatedColor="#FFC93E"
                          numberOfStars={5}
                          name='rating'
                          starDimension="30px"
                          starSpacing = "7px"
                      /> */}
                    </div>
                    <div className="flex-1 mt-1" style={{fontFamily: "Poppins", fontSize: '12px', fontWeight:300, color: ""}} >
                      Exceptional
                    </div>
                  </div>

                </div>
            {/* <span className="text-base font-semibold">
              {price}
              {` `}
              {size === "default" && (
                <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                  /day
                </span>
              )}
            </span> */}
          </div>

          <div className="flex-1 mt-10 line-clamp-1 justify-center" style={{fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, lineHeight: '20px'}}>
            {/* A stay at The Originals Boutique, Hôtel Maison Montmartre, Paris places you in the heart of Paris, a 6-minute drive from Saint-Ouen Flea Market and 11 minutes from Stade de France. This 4-star hotel i... */}
          </div>

           <div className="flex flex-grow">
             <div className = "flex inline flex-1 mt-20 space-x-2 h-4 border-r-2">
               <span className="">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.125 13.125V6.25H16.25C16.913 6.25 17.5489 6.51339 18.0178 6.98223C18.4866 7.45107 18.75 8.08696 18.75 8.75V13.125" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.25 16.25V3.75" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.25 13.125H18.75V16.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.125 6.25H1.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
               </span>
               <span className="" style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500}}>
                 Double / Twin
               </span>
             </div>
             
             <div className = "flex flex-1 inline mt-20 space-x-2 ml-4">
               <span className="">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5625 2.5V5.625" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.5625 9.0625V17.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.75 2.5L9.375 6.25C9.375 6.99592 9.07868 7.71129 8.55124 8.23874C8.02379 8.76618 7.30842 9.0625 6.5625 9.0625C5.81658 9.0625 5.10121 8.76618 4.57376 8.23874C4.04632 7.71129 3.75 6.99592 3.75 6.25L4.375 2.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.9375 12.5H11.5625C11.5625 12.5 12.5 3.75 15.9375 2.5V17.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
               </span>
               <span className="" style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500}}>
                 Room Only
               </span>
             </div>

             <div className = "flex-1 basic-1/2 mt-16 ml-2">
               <button 
                 type="button"
                 className="focus:outline-none text-white bg-[#28C46F] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                   See Rooms
               </button>
             </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`group w-full p-4 mt-5 space-y-4 relative border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 ${className}`}
    >
      {/* <Link to={href} className="flex flex-col"> */}
        {/* {renderSliderGallery()} */}
        {renderContent()}
      {/* </Link> */}
    </div>
  );
};

export default ResultCard;
