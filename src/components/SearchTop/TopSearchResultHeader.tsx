import React, { FC, ReactNode } from "react";
import ButtonSecondary from "../../lib/Button/ButtonSecondary";
import Heading from "../../lib/Heading/Heading";
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useTranslation } from "react-i18next";
export interface TopSearchResultHeaderProps {
  heading: ReactNode;
  subHeading?: ReactNode;
  showMoreButton?: boolean;
  moreBtn?: string;
  isPopularHotelsSection?:boolean,
  onClick: () => void;
  headingWrapperClassNames?: string,
  subheadingClassNames?: string
};

const TopSearchResultHeader: FC<TopSearchResultHeaderProps> = ({
  subHeading = "Find incredible value with our travel deals",
  heading = "Top Hotels",
  showMoreButton,
  moreBtn = "More Hotels",
  onClick = () => {},
  isPopularHotelsSection,
  headingWrapperClassNames,
  subheadingClassNames
}) => {
  // determine if the component is being rendered on the 'hotels' page
  let history = useHistory()
  let isHotelsPage = history.location.pathname == '/hotels' 
  const LayoutReducer = useSelector((state:any)=>state.LayoutReducer.status); 
  // @ts-ignore
  const {t} = useTranslation()
  return (
    <div className={`flex flex-col mb-8 relative ${LayoutReducer=='roundTrip'?'mt-32':'mt-0'}`}>
      <div className="flex items-center justify-between">
        <Heading 
          desc={subHeading}
          headingClassNames="dark:!text-white"
          headingWrapperClassNames={`${headingWrapperClassNames} ${isPopularHotelsSection ? '!text-base md:text-[24px] !text-[#15173F] dark:!text-white font-normal' : ''}`}
          subheadingClassNames={`${subheadingClassNames} ${isHotelsPage ? '!text-[#15173F] !text-base' : ''}
                                  ${isPopularHotelsSection ? 'text-xs md:!text-base text-[#15173F] font-light !mt-0' : ''}
          `}
          className={'!mb-0'}

        >{heading}</Heading>
        {
            showMoreButton &&
            <span className="hidden sm:block flex-shrink-0">
            <ButtonSecondary onClick={() => onClick()} rounded="!rounded-2xl" className="!leading-none !rounded-2xl border border-[#3842B2] dark:border-white hover:border-[#F75847] dark:hover:border-[#3842B2] group">
                <span className="text-[#3842B2] dark:text-white group-hover:text-[#F75847] dark:group-hover:text-[#3842B2]">{t(moreBtn)}</span>
                <i className="ml-3 las la-arrow-right dark:text-white text-xl group-hover:text-[#F75847] dark:group-hover:text-[#3842B2]"></i>
            </ButtonSecondary>
            </span>
        }
      </div>
    </div>
  );
};

export default TopSearchResultHeader;
