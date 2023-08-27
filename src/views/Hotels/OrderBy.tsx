import {FC, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';


interface OrderByProps {
  styles?: string;
  spanText?: string;
  type?: string;
  typeSize?: string;
};

const filterby = [
  {
    name: 'Our Solution'
  },
  {
    name: 'Most Popular'
  },
  {
    name: 'Distance to Center'
  },
  {
    name: 'Price (lowest first)',
  },
  {
    name: 'Price (highest first)'
  },
  {
    name: 'Stars (lowest first)'
  },
  {
    name: 'Stars (highest first)'
  }
];

const OrderBy: FC<OrderByProps> = ({styles = "", spanText = "", type = "", typeSize = "text-xs"}) => {
    return (
      <div className="max-w-sm px-4 w-full h-full">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                  ${open ? '' : 'text-opacity-90'}
                  group inline-flex items-center w-full h-full ${styles} border-2 text-base text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                {/* TODO: Distance to Center */}
                <span className='text-xs'> {spanText} </span>
                <span className={`${typeSize} font-medium ml-1`}> {type == 'popular' ? 'Popular filters' : (type == 'prices' ? 'Price per night' : (type == 'distance' ? 'Distance to' : ( type == 'category' ? 'Category' :filterby[0].name) ) ) }</span>
                <ChevronDownIcon
                  className={`${open ? '' : 'text-opacity-70'}
                    ml-8 h-5 w-5  text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 w-full max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-lg shadow-xl">
                    {filterby.map((item) => (
                        <span
                          key={item.name}
                          className="flex text-xs  items-center sm:space-x-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                         >
                            {item.name}
                        </span>
                      ))}                     
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    )
  };

  export default OrderBy;
