import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import {FC, Fragment, ReactNode } from 'react';

import ButtonSecondary from "../../lib/Button/ButtonSecondary";
import Heading from "../../lib/Heading/Heading";
import OrderBy from './OrderBy';

export interface ResultListingsHeaderProps {
  heading: ReactNode;
  subHeading?: ReactNode;
}

const ResultListingsHeader: FC<ResultListingsHeaderProps> = ({
  subHeading = "Find incredible value with our travel deals",
  heading = "Cheapest Flights and Travel Deals",
}) => {

  return (
    <div className="flex flex-col mb-8 relative">
      <div className="flex items-center justify-between">

        <div className="max-w-2xl">
            <div style = {{fontFamily: 'Poppins', fontSize: '24px'}} className={`text-xl md:text-2xl font-semibold font-normal`}>
                {heading}
            </div>

            <span style = {{fontFamily: 'Poppins', fontSize: '14px'}} className="mt-2 md:mt-2 font-normal block text-base sm:text-xs text-neutral-500 dark:text-neutral-400">
                {subHeading}
            </span>

        </div>
        <span className="sm:block flex-shrink-0">
          <OrderBy styles = "px-3 py-2 rounded-lg" spanText = "Order by" typeSize='text-xs' />
        </span>
      </div>
    </div>
  );
};

export default ResultListingsHeader;
