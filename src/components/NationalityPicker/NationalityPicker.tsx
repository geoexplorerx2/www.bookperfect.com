import {FC, Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';


interface NationalityPickerProps {
  styles?: string;
  spanText?: string;
  type?: string;
  typeSize?: string;
  onNationalityChanged?: any;
  nodeName?: any;
  id?:any;
};

const nationalities = [
  {
    name: 'United Kingdom',
    code: 'UK'
  },
  {
    name: 'Turkey',
    code: 'TR'
  },
  {
    name: 'France',
    code: 'FR'
  },
  {
    name: 'USA',
    code: 'US'
  }
];

const NationalityPicker: FC<NationalityPickerProps> = ({styles = "", spanText = "", type = "", typeSize = "text-xs", onNationalityChanged, nodeName = '',id}) => {

    const externalcountries: any = useSelector((state: { ExternalEPReducer: any; }) => state.ExternalEPReducer.externalepcountries);
    const [selectedNationality, setSelectedNationality] = useState<any>(!nodeName && nationalities[0].name);


    return (
      <div className={`max-w-sm ${id=='nationality'?'md:px-0':'md:px-4'} w-full h-full`}>
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                name = {nodeName}
                className={`
                  ${open ? '' : 'text-opacity-90'}
                  group inline-flex items-center h-[34px] md:h-full overflow-hidden justify-between w-full  ${id=='nationality'?'md:w-full':'max-w-[156px] md:w-auto'} md:min-w-[180px] ${styles} border border-[#AFB3E0] md:border-[#6B7280] md:rounded-[12px] text-base text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-[#F4F8FF] dark:bg-transparent`}
              >
                {/* TODO: Distance to Center */}
                { !selectedNationality && <span className='text-xs text-[#6B7280] dark:text-[#6B7280] '> {spanText} </span> }
                <span className={`${typeSize} font-medium md:ml-1 whitespace-nowrap text-black dark:text-white`}> { selectedNationality } </span>
                <ChevronDownIcon
                  className={`${open ? '' : 'text-opacity-70'}
                    ml-8 h-5 w-5 text-[#AFB3E0] transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
                <Popover.Panel className="absolute right-0 z-[100] w-full max-h-[500px] overflow-y-auto max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-lg shadow-xl">
                    {
                      externalcountries &&
                      externalcountries?.map((item: any, idx: number) => (
                        <span
                          key={idx}
                          onClick = { () => {
                            setSelectedNationality(item.name.official);
                            onNationalityChanged(item);
                            close();
                          }}
                          className="flex text-xs  items-center dark:text-white sm:space-x-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                         >
                           {item.flag} {item.name.common}
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

  export default NationalityPicker;
