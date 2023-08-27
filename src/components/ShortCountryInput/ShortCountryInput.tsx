import React, { Fragment, useEffect, useState } from "react";
import { FC } from "react";
import { useRef } from "react";
import AttractionsIcon from '../../images/icons/attractions.svg'

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import LocationIcon from "../../images/icons/locationIcon";
import { useTranslation } from "react-i18next";

interface CountryType {
    name: string,
    value: string,
    id: number
}

const sampleCountries: CountryType[] = [
    {
        name: 'All Countries',
        value: 'all',
        id: 1
    },
    {
        name: 'Turkey',
        value: 'TR',
        id: 2
    }
];



export interface ShortCountryInputType {
    defaultValue?: string;
    onChange?: (value: any) => void;
    onInputDone?: (value: string) => void;
    placeHolder?: string;
    desc?: string;
    className?: string;
    autoFocus?: boolean;
    onDestination?: any;
    tripType?: any,
    clicking?:any,
}

const ShortCountryInput: FC<ShortCountryInputType> = ({
    defaultValue = "",
    autoFocus = false,
    onChange,
    onInputDone,
    onDestination,
    placeHolder = "",
    clicking,
    desc = "",
    className = "text-[#000] dark:text-[#fff] w-[100%] h-full bg-[transparent]",
}) => {

    const [countries, setCountries] = useState(sampleCountries)
    const [selectedCountry, setSelectedCountry] = useState<CountryType>(countries[0])
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    // @ts-ignore
    const {t} = useTranslation()

    useEffect(() => {
        if(onChange) onChange(selectedCountry);
    }, [selectedCountry]);
    
    return (
        <div className={`relative flex ${className}`} ref={containerRef}>
            <div
                className={`flex flex-1 relative [ hero-field-padding ] flex-shrink-0 items-center px-[11px] md:pr-1 lg:pr-[22px] md:space-x-3 focus:outline-none text-left`}
            >
                <div className="flex-grow max-h-full">
                    <span className="inline-block mt-3 text-sm text-[#000] dark:text-[#fff] font-medium px-4 md:pl-0 md:px-[22px]">
                        <span className="line-clamp-1 absolute top-[10px] left-4 md:static text-xs lg:text-sm font-semibold">{t("PACKAGES_SEARCH_FORM.COUNTRY")}</span>
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-center">
                        <Listbox value={selectedCountry}
                            onChange={
                                (value) => setSelectedCountry(value)}>
                            <div className="relative mt-1 h-full w-full flex items-center">
                                <Listbox.Button className="absolute top-0 left-0 w-full h-full ounded-lg bg-transparent pt-4 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="absolute bottom-3 md:bottom-1 left-4 text-[10px] lg:text-sm md:static block truncate cursor-pointer">{selectedCountry.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options 
                                       className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {countries.map((country, idx) => (
                                            <Listbox.Option
                                                key={idx}
                                                className={({ active }) =>
                                                    `relative hover:bg-neutral-100 select-none py-2 pl-10 pr-4 ${active ? 'bg-neutral-100 dark:text-black' : 'text-gray-900'
                                                    }`
                                                }
                                                value={country}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {country.name}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                <CheckIcon className="h-5 w-5 text-[#AFB3E0]" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                    
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <span className="mt-3 text-sm text-[#000] dark:text-[#fff] font-medium px-4 md:pl-0 md:px-[22px]">
                        <span className="line-clamp-1">{desc}</span>
                    </span>
                </div>

                <div className="text-[#AFB3E0] w-6 h-6 pb-1 dark:text-neutral-400">
                    {/* <img src={LocationIcon} className='w-8 h-8 max-w-[unset]' /> */}
                    <LocationIcon className=""/>
                </div>

            </div>

        </div>
    );
};

export default ShortCountryInput;

