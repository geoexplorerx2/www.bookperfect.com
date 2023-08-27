import React, { Fragment, useEffect, useState } from "react";
import { FC } from "react";
import { useRef } from "react";
import AttractionsIcon from '../../images/icons/attractions.svg'
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import CalendarIcon from '../../images/icons/Calendar.svg'
import getMonthsYearList from "../../common/getMonthsYear";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { addLeadingZeros } from "../../common/AddLeadingZeros";

interface MonthType {
    name: string,
    value: string,
    id: number
}

const sampleMonths: any[] = [
    // {
    //     name: 'January',
    //     value: 'jan',
    //     id: 1
    // },
    // {
    //     name: 'February',
    //     value: 'feb',
    //     id: 2
    // },
    // {
    //     name: 'March',
    //     value: 'mar',
    //     id: 3
    // },
    // {
    //     name: 'April',
    //     value: 'apr',
    //     id: 4
    // },
    // {
    //     name: 'May',
    //     value: 'may',
    //     id: 5
    // },
    // {
    //     name: 'June',
    //     value: 'jun',
    //     id: 6
    // },
    // {
    //     name: 'July',
    //     value: 'jul',
    //     id: 7
    // },
    // {
    //     name: 'August',
    //     value: 'aug',
    //     id: 8
    // },
    // {
    //     name: 'September',
    //     value: 'sep',
    //     id: 49
    // },
    // {
    //     name: 'October',
    //     value: 'oct',
    //     id: 10
    // },
    // {
    //     name: 'November',
    //     value: 'nov',
    //     id: 11
    // },
    // {
    //     name: 'December',
    //     value: 'dec',
    //     id: 12
    // },
];



export interface MonthInputType {
    defaultValue?: string;
    onChange?: (value: string) => void;
    onInputDone?: (value: string) => void;
    placeHolder?: string;
    desc?: string;
    className?: string;
    autoFocus?: boolean;
    onDestination?: any;
    tripType?: any,
    clicking?: any,
}

const MonthInput: FC<MonthInputType> = ({
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

    const listMonths = getMonthsYearList();

    const [months, setMonths] = useState(listMonths)
    const [selectedMonth, setSelectedMonth] = useState<any>(months[0])
    const nextYear = new Date().getFullYear() + 1;
    // @ts-ignore
    const { t } = useTranslation()
    const monthFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        for (let idx = 0; idx < 12; idx++) {
            sampleMonths.push(
                {
                    name: listMonths[idx].split(" ")[0],
                    year: listMonths[idx].split(" ")[1],
                    id: addLeadingZeros(monthFull.indexOf(listMonths[idx].split(" ")[0]) + 1, 2)
                }
            )
        };
    }, []);

    useEffect(() => {
        if (onChange) onChange(selectedMonth);
    }, [selectedMonth]);

    return (
        <div className={`relative flex ${className}`} ref={containerRef}>
            <div
                className={`flex flex-1 relative [ hero-field-padding ] flex-shrink-0 items-center px-[11px] md:pr-1 lg:pr-[22px] md:space-x-3 focus:outline-none text-left`}
            >
                <div className="flex-grow max-h-full">
                    <span className="inline-block mt-3 text-sm text-[#000] dark:text-[#fff] font-medium px-4 md:pl-0 md:px-[22px]">
                        <span className="line-clamp-1 absolute top-[10px] left-4 md:static text-xs lg:text-sm font-semibold">{t("PACKAGES_SEARCH_FORM.WHEN")}</span>
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-start cursor-pointer">
                        <Listbox 
                            value={selectedMonth}
                            onChange={(value) => setSelectedMonth(value)}
                        >
                            <div className="relative mt-1 w-full h-1/2 translate-y-4 md:translate-y-[25px]">
                                <Listbox.Button className="relative w-full rounded-lg bg-transparent py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="absolute bottom-1 left-4 text-[10px] lg:text-sm md:static block truncate">{selectedMonth && selectedMonth.name} {selectedMonth?.year}</span>
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
                                        {sampleMonths?.map((month, idx) => (
                                            <Listbox.Option
                                                key={idx}
                                                className={({ active }) =>
                                                    `relative cursor-pointer cursor-default hover:bg-neutral-100 select-none py-2 pl-10 pr-4 ${active ? 'bg-neutral-100 dark:text-black' : 'text-gray-900'
                                                    }`
                                                }
                                                value={month}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            <span className="pr-1">{month.name}</span>
                                                            <span>{month.year}</span>
                                                            {/* <span className="pr-1">{month.split(" ")[0]}</span> */}
                                                            {/* <span>{month.split(" ")[1]}</span> */}
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

                <div className="text-[#b1b0e5] dark:text-neutral-400">
                    <img src={CalendarIcon} className='w-6 h-6 md:w-8 md:h-8 max-w-[unset]' />
                </div>

            </div>

        </div>
    );
};

export default MonthInput;

