import React, { Fragment, useEffect, useState } from "react";
import { FC } from "react";
import { useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import CalendarIcon from '../../images/icons/Calendar.svg'
import { CheckIcon } from "@heroicons/react/solid";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

interface NightsNoType {
    name: string,
    value: string,
    id: number
}

const sampleNumbers: NightsNoType[] = [
    {
        name: "...",
        value: '',
        id: 0
    },
    {
        name: '1 to 5 Nights',
        value: '5',
        id: 1
    }
    // {
    //     name: '5 to 10 Nights',
    //     value: '10',
    //     id: 2
    // },
]



export interface NightsNoInputType {
    defaultValue?: string;
    onChange?: (value: string) => void;
    onInputDone?: (value: string) => void;
    placeHolder?: string;
    desc?: string;
    className?: string;
    autoFocus?: boolean;
    onDestination?: any;
    tripType?: any,
    clicking?:any,
}

const NightsNo: FC<NightsNoInputType> = ({
    defaultValue = "",
    autoFocus = false,
    onChange,
    onInputDone,
    onDestination,
    placeHolder = "",
    desc = "",
    clicking,
    className = "text-[#000] dark:text-[#fff] w-[100%] h-full bg-[transparent]",
}) => {

    const [NightsNos, setNightsNos] = useState(sampleNumbers)
    const [selectedNightsNo, setSelectedNightsNo] = useState<any>(NightsNos[0])
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    // @ts-ignore
    const {t} = useTranslation()
    useEffect(() => {
        if(onChange) onChange(selectedNightsNo);
    }, [selectedNightsNo]);
    

    return (
        <div className={`relative flex ${className}`} ref={containerRef}>
            <div
                className={`flex flex-1 relative [ hero-field-padding ] flex-shrink-0 items-center px-[11px] md:pr-1 lg:pr-[22px] md:space-x-3 focus:outline-none text-left`}
            >
                <div className="flex-grow max-h-full">
                    <span className="inline-block mt-3 text-sm text-[#000] dark:text-[#fff] font-medium px-4 md:px-0 ">
                        <span className="line-clamp-1 absolute top-[10px] left-4 md:static text-xs lg:text-sm font-semibold">{t("PACKAGES_SEARCH_FORM.NUMBER_OF_NIGHTS")}</span>
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end cursor-pointer">
                        <Listbox value={selectedNightsNo}
                            onChange={
                                (value) => setSelectedNightsNo(value)}>
                            <div className="relative mt-1 w-full h-full flex item-end">
                                <Listbox.Button className="relative w-full h-full rounded-lg bg-transparent pt-3 md:pt-6 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ">
                                    <span className="absolute bottom-[10px] md:bottom-4 left-4 text-[10px] lg:text-sm md:static block truncate">{selectedNightsNo.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {NightsNos.map((nightsNo, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    `relative hover:bg-neutral-100 select-none py-2 pl-10 pr-4 ${active ? 'bg-neutral-100 dark:text-black' : 'text-gray-900'
                                                    }`
                                                }
                                                value={nightsNo}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {nightsNo.name}
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

                <div className="text-[#b1b0e5] dark:text-neutral-400 md:!ml-0 lg:ml-auto">
                    <img src={CalendarIcon} className='w-6 h-6 md:w-8 md:h-8 max-w-[unset]' />
                </div>

            </div>

        </div>
    );
};

export default NightsNo;

