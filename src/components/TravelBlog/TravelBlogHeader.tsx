import React, { FC, useEffect, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { TranslateIfExists } from "../../helpers";
import ButtonSecondary from "../../lib/Button/ButtonSecondary";
import Heading from "../../lib/Heading/Heading";

export interface TravelBlogHeaderProps {
  heading: ReactNode;
  subHeading?: ReactNode;
}

const TravelBlogHeader: FC<TravelBlogHeaderProps> = ({
  subHeading = "Find incredible value with our travel deals",
  heading = "Cheapest Flights and Travel Deals",
}) => {
  // @ts-ignore
  const { t } = useTranslation()

  return (
    <div className="flex flex-col sm:mb-8 relative">
      <div className="flex items-center justify-between">
        <Heading
          desc={subHeading}
          headingWrapperClassNames='!text-base sm:!text-[32px] !text-[#3944B3] dark:!text-white'
          subheadingClassNames='!text-[#3F4249] dark:!text-white md:mt-2'
          className="mb-3 pb-3 border-[#3A1C1A] border-b border-opacity-20"
          >{heading}</Heading>
        <span className="hidden sm:block flex-shrink-0">
          <ButtonSecondary rounded="rounded-2xl" className="!leading-none !rounded-2xl border border-[#3944B3] dark:border-white dark:hover:border-[#3944B3] hover:border-[#F75847] group">
            <span className="text-[#3944B3] dark:text-[#fff] dark:group-hover:text-[#3944B3] group-hover:text-[#F75847]">{t('TRAVEL_BLOG.SEE_MORE_BLOGS')}</span>
            <i className="ml-3 las la-arrow-right text-xl text-[#3944B3] dark:text-[#fff] dark:group-hover:text-[#3944B3] group-hover:text-[#F75847]"></i>
          </ButtonSecondary>
        </span>
      </div>
    </div>
  );
};

export default TravelBlogHeader;
