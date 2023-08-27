import React, { FC } from "react";
import { useHistory} from "react-router-dom";
import convertNumbThousand from "../../common/convertNumberThousand";
import { TaxonomyType } from "../../data/types";
import CImage from "../../lib/CImage/CImage";

export interface CardCategory1Props {
  className?: string;
  taxonomy: TaxonomyType;
  section?: string;
  roundedCard?: string;
  truncatePosition?: string;
  cardHeight?: string;
  index?: number;
}

// TODO: use link with react-router-dom after routers implemented
const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  taxonomy,
  section = "",
  roundedCard = "",
  truncatePosition = "",
  cardHeight = "",
  index,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;
  // determine which page the component is being rendered on
  let history = useHistory()
  let isHomePage = history.location.pathname == '/'
  let isHotelsPage = history.location.pathname == '/hotels'
  let isActivitiesPage = history.location.pathname == '/activities'
  
  return (
    <div 
      className={`flex flex-col group
                ${ section == "browser_property" ? 'rounded-lg' : 'items-center'}
                ${className}`}>
      <div style={{border:'.1vw solid #fff'}}
       className={`flex-shrink-0 w-full max-w-[222px] ${roundedCard} overflow-hidden group
                  ${ section == "browser_property" ? '!max-w-[180px] max-h-[300px]' : 'min-h-[300px] aspect-w-8 aspect-h-2 sm:aspect-h-6 '}
                 `}>
                  
        <CImage
          src = { thumbnail } 
          hasOverlaly = {section == 'browser_property'}
          className={`object-cover w-full h-[100%] ${cardHeight} ${roundedCard} mx-auto
                      ${ section == "browser_property" ? 'h-[160px] sm:h-[180px]' : ''}
          `
        }
        />
         {/* <span className={`absolute w-full h-full top-0 left-0 opacity-0 ${cardHeight} border-2 border-orange-400 hover:opacity-100 inset-0 bg-black bg-opacity-10 transition-opacity`}></span> */}
      </div>
      <div 
        className={`mt-4 truncate ${truncatePosition}
        ${section == "browser_property" ? 'w-full !m-2' : ''}`}>
        <h2 className={`${section == "browser_property" && isHotelsPage ? '!font-semibold !text-lg':' font-medium !text-lg' }
                        ${section !== "browser_property" && isHomePage ? '!text-white' : ''}
                        ${section !== "browser_property" && isActivitiesPage ? '!text-white' : ''}
        text-[#0E123D]  dark:text-[#F4F8FF] text-xl leading-7 sm:text-lg truncate`}>
          { name }
        </h2>
        {
            // section == "browser_property" ? 
            //     <span className={`block text-sm text-neutral-6000 dark:text-[#666666]`}>
            //       {convertNumbThousand(count || 0)} properties
            //     </span> :
            //     ''
        }
      </div>

    {/* // </Link> */}
    </div>
  );
};

export default CardCategory1;