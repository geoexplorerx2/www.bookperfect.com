import React, { Fragment, useEffect, useState } from "react";
import { FC } from "react";
import { useRef } from "react";
import AttractionsIcon from '../../images/icons/attractions.svg'
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import {useSelector} from 'react-redux';
import { t } from "i18next";
import { useTranslation } from "react-i18next";
interface ThemeType {
    name: string,
    value: string,
    id: number
}

const sampleThemes: ThemeType[] = [
    {
        name: '...',
        value: '',
        id: 0
    },
    {
        name: 'Romantic',
        value: 'romantic',
        id: 1
    },
    {
        name: 'Beach Holidays',
        value: 'beach_holidays',
        id: 280
    },
    {
        name: 'Stopover',
        value: 'stopover',
        id: 286
    },
    {
        name: 'Cruises',
        value: 'cruises',
        id: 161
    },
]



export interface TravelThemeInputType {
    defaultValue: string;
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

const TravelThemeInput: FC<TravelThemeInputType> = ({
    defaultValue = "",
    autoFocus = false,
    onChange,
    onInputDone,
    onDestination,
    placeHolder = "please enter a theme",
    desc = "",
    clicking,
    className = "text-[#000] dark:text-[#fff] w-[100%] h-full bg-[transparent]",
}) => {

    const [themes, setThemes] = useState(sampleThemes)
    const [selectedTheme, setSelectedTheme] = useState<any>(themes[0])
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const theme :any = useSelector((state:any)=>state.LightMode.mode);
    // @ts-ignore
    const {t} = useTranslation()
    useEffect(() => {
        if (onChange) onChange(selectedTheme);
    }, [selectedTheme]);

    const SVG = (color:any) => {
        return (
            <>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.4" clip-path="url(#clip0_5733_18782)">
                        <mask id="mask0_5733_18782" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                            <rect width="32" height="32" fill={color} />
                        </mask>
                        <g mask="url(#mask0_5733_18782)">
                            <path d="M8.8336 28.3656L10.3664 24.9328C9.9664 24.6661 9.59413 24.3883 9.2496 24.0992C8.9056 23.8101 8.56693 23.4768 8.2336 23.0992C8.07787 23.1883 7.9168 23.2493 7.7504 23.2824C7.58347 23.316 7.42213 23.3328 7.2664 23.3328C6.64453 23.3328 6.1112 23.1104 5.6664 22.6656C5.22213 22.2213 5 21.688 5 21.0656C5 20.7104 5.0832 20.3661 5.2496 20.0328C5.41653 19.6995 5.63333 19.4328 5.9 19.2328C5.74427 18.7213 5.62213 18.1989 5.5336 17.6656C5.44453 17.1323 5.4 16.5768 5.4 15.9992C5.4 15.4216 5.44453 14.8661 5.5336 14.3328C5.62213 13.7995 5.74427 13.2661 5.9 12.7328C5.63333 12.5328 5.41653 12.2717 5.2496 11.9496C5.0832 11.6269 5 11.2768 5 10.8992C5 10.2992 5.22213 9.77148 5.6664 9.31601C6.1112 8.86055 6.64453 8.63281 7.2664 8.63281C7.42213 8.63281 7.58347 8.65495 7.7504 8.69921C7.9168 8.74348 8.06667 8.79895 8.2 8.86561C8.95573 8.06561 9.78907 7.39361 10.7 6.84961C11.6109 6.30508 12.6221 5.91041 13.7336 5.66561C13.8003 5.08801 14.0557 4.60481 14.5 4.21601C14.9443 3.82721 15.4443 3.63281 16 3.63281C16.5557 3.63281 17.0557 3.81601 17.5 4.18241C17.9443 4.54935 18.1997 5.02161 18.2664 5.59921C19.3997 5.84348 20.4387 6.23228 21.3832 6.76561C22.3277 7.29895 23.1667 7.97681 23.9 8.79921C24.0333 8.73255 24.1723 8.69361 24.3168 8.68241C24.4613 8.67121 24.6003 8.66561 24.7336 8.66561C25.3555 8.66561 25.8888 8.88801 26.3336 9.33281C26.7779 9.77708 27 10.3104 27 10.9328C27 11.3104 26.9168 11.6603 26.7504 11.9824C26.5835 12.3045 26.3555 12.5547 26.0664 12.7328C26.2445 13.2661 26.3779 13.7995 26.4664 14.3328C26.5555 14.8661 26.6 15.4216 26.6 15.9992C26.6 16.5768 26.5555 17.1379 26.4664 17.6824C26.3779 18.2269 26.2445 18.7547 26.0664 19.2656C26.3555 19.488 26.5779 19.7603 26.7336 20.0824C26.8888 20.4045 26.9664 20.7323 26.9664 21.0656C26.9664 21.688 26.7443 22.2213 26.3 22.6656C25.8557 23.1104 25.3112 23.3328 24.6664 23.3328C24.5331 23.3328 24.3888 23.316 24.2336 23.2824C24.0779 23.2493 23.9333 23.2104 23.8 23.1656C23.4667 23.5213 23.1277 23.8493 22.7832 24.1496C22.4387 24.4493 22.0555 24.7213 21.6336 24.9656L23.1 28.3656H21.9336L20.7 25.5328C20.3 25.7328 19.9 25.8995 19.5 26.0328C19.1 26.1661 18.6888 26.2771 18.2664 26.3656C18.1997 26.9656 17.9443 27.4435 17.5 27.7992C17.0557 28.1549 16.5557 28.3328 16 28.3328C15.4443 28.3328 14.9443 28.1437 14.5 27.7656C14.0557 27.388 13.8003 26.9104 13.7336 26.3328C13.2888 26.2213 12.872 26.0989 12.4832 25.9656C12.0944 25.8323 11.7112 25.6656 11.3336 25.4656L10 28.3656H8.8336ZM10.8 23.8656L13.5336 17.8992C13.2888 17.6325 13.1109 17.3381 13 17.016C12.8891 16.6939 12.8336 16.3549 12.8336 15.9992C12.8336 15.1325 13.1501 14.388 13.7832 13.7656C14.4168 13.1437 15.1669 12.8328 16.0336 12.8328C16.9003 12.8328 17.6336 13.1437 18.2336 13.7656C18.8336 14.388 19.1336 15.1325 19.1336 15.9992C19.1336 16.3549 19.0725 16.6939 18.9504 17.016C18.8277 17.3381 18.6555 17.6437 18.4336 17.9328L21.1336 23.9328C21.4669 23.7328 21.7779 23.5048 22.0664 23.2488C22.3555 22.9933 22.6333 22.7213 22.9 22.4328C22.7443 22.2547 22.6221 22.0491 22.5336 21.816C22.4445 21.5824 22.4 21.3323 22.4 21.0656C22.4 20.3989 22.6667 19.8323 23.2 19.3656C23.7333 18.8989 24.3333 18.7213 25 18.8328C25.1557 18.388 25.2725 17.9323 25.3504 17.4656C25.4277 16.9989 25.4664 16.5101 25.4664 15.9992C25.4664 15.4659 25.4277 14.9715 25.3504 14.516C25.2725 14.0605 25.1669 13.6104 25.0336 13.1656C24.3669 13.2989 23.7723 13.1323 23.2496 12.6656C22.7275 12.1989 22.4664 11.6213 22.4664 10.9328C22.4664 10.6661 22.5109 10.4216 22.6 10.1992C22.6891 9.97681 22.8003 9.76561 22.9336 9.56561C22.2888 8.85468 21.5611 8.27148 20.7504 7.81601C19.9392 7.36055 19.0669 7.01041 18.1336 6.76561C17.9779 7.16561 17.7112 7.50455 17.3336 7.78241C16.9555 8.06028 16.5109 8.19921 16 8.19921C15.4891 8.19921 15.0445 8.06028 14.6664 7.78241C14.2888 7.50455 14.0333 7.16561 13.9 6.76561C12.9224 7.01041 12.0336 7.36055 11.2336 7.81601C10.4336 8.27148 9.7112 8.86588 9.0664 9.59921C9.22213 9.77681 9.33893 9.98241 9.4168 10.216C9.49467 10.4491 9.5336 10.6768 9.5336 10.8992C9.5336 11.6549 9.25573 12.2437 8.7 12.6656C8.14427 13.088 7.55547 13.2547 6.9336 13.1656C6.80027 13.588 6.69467 14.0325 6.6168 14.4992C6.53893 14.9659 6.5 15.4659 6.5 15.9992C6.5 16.5101 6.53893 16.9989 6.6168 17.4656C6.69467 17.9323 6.80027 18.388 6.9336 18.8328C7.55547 18.7213 8.14427 18.888 8.7 19.3328C9.25573 19.7771 9.5336 20.3547 9.5336 21.0656C9.5336 21.3323 9.49467 21.5768 9.4168 21.7992C9.33893 22.0216 9.22213 22.2104 9.0664 22.3656C9.33307 22.6771 9.60533 22.9493 9.8832 23.1824C10.1611 23.416 10.4667 23.6437 10.8 23.8656ZM11.7 24.4328C12.0333 24.588 12.3779 24.7323 12.7336 24.8656C13.0888 24.9989 13.4776 25.1101 13.9 25.1992C14.0557 24.7992 14.3168 24.4603 14.6832 24.1824C15.0501 23.9045 15.4891 23.7656 16 23.7656C16.5109 23.7656 16.9555 23.9045 17.3336 24.1824C17.7112 24.4603 17.9779 24.7992 18.1336 25.1992C18.5112 25.1101 18.8723 25.0101 19.2168 24.8992C19.5613 24.7883 19.8891 24.6549 20.2 24.4992L17.6336 18.6656C17.3888 18.8213 17.1275 18.9437 16.8496 19.0328C16.5723 19.1213 16.2779 19.1656 15.9664 19.1656C15.6779 19.1656 15.3891 19.1157 15.1 19.016C14.8109 18.9157 14.5331 18.7768 14.2664 18.5992L11.7 24.4328ZM16 18.0328C16.5333 18.0328 17 17.8381 17.4 17.4488C17.8 17.06 18 16.5768 18 15.9992C18 15.4435 17.8 14.9656 17.4 14.5656C17 14.1656 16.5333 13.9656 16 13.9656C15.4224 13.9656 14.9392 14.1656 14.5504 14.5656C14.1611 14.9656 13.9664 15.4435 13.9664 15.9992C13.9664 16.5768 14.1611 17.06 14.5504 17.4488C14.9392 17.8381 15.4224 18.0328 16 18.0328Z" fill={color} />
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_5733_18782">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

            </>
        )
    }
    return (
        <div className={`relative flex ${className}`} ref={containerRef}>
            <div
                className={`flex flex-1 relative [ hero-field-padding ] flex-shrink-0 items-center px-[11px] md:pr-1 lg:pr-[22px] md:space-x-3 focus:outline-none text-left`}
            >
                <div className="flex-grow max-h-full">
                    <span className="inline-block mt-3 text-sm text-[#000] dark:text-[#fff] font-medium px-4 md:pl-0 md:px-[22px]">
                        <span className="lline-clamp-1 absolute top-[10px] left-4 md:static text-xs lg:text-sm font-semibold">{t("PACKAGES_SEARCH_FORM.THEME")}</span>
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-full">
                        <Listbox value={selectedTheme}
                            onChange={
                                (value) => setSelectedTheme(value)}>
                            <div className="relative w-full h-full">
                                <Listbox.Button className="relative w-full h-full pt-5 md:pt-7 rounded-lg bg-transparent py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="absolute bottom-[10px] md:bottom-3 left-4 text-[10px] lg:text-sm md:static block truncate">{selectedTheme.name}</span>
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
                                        {themes.map((theme, themeidx) => (
                                            <Listbox.Option
                                                key={themeidx}
                                                className={({ active }) =>
                                                    `relative cursor-pointer cursor-default hover:bg-neutral-100 select-none py-2 pl-10 pr-4 ${active ? 'bg-neutral-100 dark:text-black' : 'text-gray-900'
                                                    }`
                                                }
                                                value={theme}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {theme.name}
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
                    <div className="w-6 h-6 md:w-8 md:h-8 max-w-[unset]">
                       {SVG(theme==='dark'?'#b1b0e5':'#3944B3')}
                    </div>
                    
                </div>

            </div>

        </div>
    );
};

export default TravelThemeInput;

