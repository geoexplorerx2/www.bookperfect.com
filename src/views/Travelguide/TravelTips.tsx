import React, { FC, useEffect, useMemo } from "react";

import Heading from "../../lib/Heading/Heading";
import HeroInputSearch from "../../components/HeroInputSearch/HeroInputSearch";
import travelersguide from "../../images/travellersguide.png";

export interface TravelTipsProps {
  className?: string;
  heading?: string;
  subHeading?: string;
  isHeadingCenter: boolean;
};

const TravelTips: FC<TravelTipsProps> = ({
  heading = "Heading of sections",
  subHeading = "Descriptions for sections",
  className = "",
  isHeadingCenter
}) => {
  
  return (
    <div className={`${className}`}>
        <div className={`relative flex flex-col-reverse lg:flex-row px-2 md:px-8`}>
         <div className="flex-1 basis-1/4">
              <h2 className={`text-md text-[#3944B3] md:text-xl font-poppins dark:text-[#fff]`}>
                { heading }
              </h2>

            { subHeading && (
              <span className="mt-2 md:mt-2 font-normal block text-sm xl:text-base sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-6">
                { subHeading }
              </span>
            )}
         </div>
         <div className="flex-1 px-8 flex justify-center lg:inline-block">
             <img src = { travelersguide }  className={'min-w-[278px] lg:min-w-auto min-h-[278px] relative lg:absolute bottom-0 right-0'}/>
         </div>
        </div>
        <div className="w-full px-2 md:px-8">
            <HeroInputSearch searchStyle="mx-0" lengthStyle = "" />
        </div>
    </div>
  );
};

export default TravelTips;
