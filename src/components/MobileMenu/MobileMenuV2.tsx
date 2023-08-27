import React, { FC, ReactNode, useEffect, useState } from 'react'
import { NAVIGATION_MENU } from '../../lib/MasterHeader/NavigationMenu'
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { NavigationItemType } from '../../types/menus/menus';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDown } from 'tabler-icons-react';
import { ReactComponent as CircleIcon } from '../../images/icons/Circle.svg';
import LanguagePicker from '../LanguagePicker/LanguagePicker';
import { useSelector } from 'react-redux';
import useWindowDimensions from '../Demonsion/getDemonsion';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';


const MobileMenuV2: FC = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openDropdownMenu, setOpenDropdownMenu] = useState({
        show: false,
        type: ''
      });
    // const [isLangPickerOpen, setIsLangPickerOpen] = useState(false)
    // const [isCurrentPickerOpen, setIsCurrencyPickerOpen ] = useState(false)
    const history = useHistory()
    
    const theme = useSelector((state: any) => state.LightMode);
    const userprofile = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userprofile);
    const user = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.userdata);
    const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
    const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
    
    const isProduction = process.env.REACT_APP_PRODUCTION;

    const { height, width } = useWindowDimensions();
    const languages = [
        {
            id: 'en',
            name: 'English',
            icon: <svg width={width >= 1280 && width <= 1500 ? '20' : '20'} height={width >= 1280 && width <= 1500 ? '20' : '20'} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={theme.mode == 'dark' ? '#fff' : '#3944B3'}>
                <path d="M13 22.75C18.3848 22.75 22.75 18.3848 22.75 13C22.75 7.61522 18.3848 3.25 13 3.25C7.61522 3.25 3.25 7.61522 3.25 13C3.25 18.3848 7.61522 22.75 13 22.75Z" stroke-miterlimit="10" />
                <path d="M3.80859 9.75H22.1914" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.80859 16.25H22.1914" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 22.4855C15.2437 22.4855 17.0625 18.2385 17.0625 12.9996C17.0625 7.76067 15.2437 3.51367 13 3.51367C10.7563 3.51367 8.9375 7.76067 8.9375 12.9996C8.9375 18.2385 10.7563 22.4855 13 22.4855Z" stroke-miterlimit="10" />
            </svg>
        },
        {
            id: 'tr',
            name: 'Türkçe',
            icon: <svg width={width >= 1280 && width <= 1500 ? '20' : '20'} height={width >= 1280 && width <= 1500 ? '20' : '20'} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 22.75C18.3848 22.75 22.75 18.3848 22.75 13C22.75 7.61522 18.3848 3.25 13 3.25C7.61522 3.25 3.25 7.61522 3.25 13C3.25 18.3848 7.61522 22.75 13 22.75Z" stroke={theme.mode == 'dark' ? '#fff' : '#3944B3'} stroke-miterlimit="10" />
                <path d="M3.80859 9.75H22.1914" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.80859 16.25H22.1914" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 22.4855C15.2437 22.4855 17.0625 18.2385 17.0625 12.9996C17.0625 7.76067 15.2437 3.51367 13 3.51367C10.7563 3.51367 8.9375 7.76067 8.9375 12.9996C8.9375 18.2385 10.7563 22.4855 13 22.4855Z" stroke={theme.mode == 'dark' ? '#fff' : '#3944B3'} stroke-miterlimit="10" />
            </svg>
        },
        {
            id: 'fr',
            name: 'Français',
            icon: <svg width={width >= 1280 && width <= 1500 ? '20' : '20'} height={width >= 1280 && width <= 1500 ? '20' : '20'} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 22.75C18.3848 22.75 22.75 18.3848 22.75 13C22.75 7.61522 18.3848 3.25 13 3.25C7.61522 3.25 3.25 7.61522 3.25 13C3.25 18.3848 7.61522 22.75 13 22.75Z" stroke={theme.mode == 'dark' ? '#fff' : '#3944B3'} stroke-miterlimit="10" />
                <path d="M3.80859 9.75H22.1914" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.80859 16.25H22.1914" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 22.4855C15.2437 22.4855 17.0625 18.2385 17.0625 12.9996C17.0625 7.76067 15.2437 3.51367 13 3.51367C10.7563 3.51367 8.9375 7.76067 8.9375 12.9996C8.9375 18.2385 10.7563 22.4855 13 22.4855Z" stroke={theme.mode == 'dark' ? '#fff' : '#3944B3'} stroke-miterlimit="10" />
            </svg>
        },
        {
            id: 'de',
            name: 'Deutsch',
            icon: <svg width={width >= 1280 && width <= 1500 ? '20' : '20'} height={width >= 1280 && width <= 1500 ? '20' : '20'} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 22.75C18.3848 22.75 22.75 18.3848 22.75 13C22.75 7.61522 18.3848 3.25 13 3.25C7.61522 3.25 3.25 7.61522 3.25 13C3.25 18.3848 7.61522 22.75 13 22.75Z" stroke={theme.mode == 'dark' ? '#fff' : '#3944B3'} stroke-miterlimit="10" />
                <path d="M3.80859 9.75H22.1914" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.80859 16.25H22.1914" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 22.4855C15.2437 22.4855 17.0625 18.2385 17.0625 12.9996C17.0625 7.76067 15.2437 3.51367 13 3.51367C10.7563 3.51367 8.9375 7.76067 8.9375 12.9996C8.9375 18.2385 10.7563 22.4855 13 22.4855Z" stroke={theme.mode == 'dark' ? '#fff' : '#3944B3'} stroke-miterlimit="10" />
            </svg>
        }
    ];

    const ActiveLangLabel = languages.filter(lang => lang.id === activeLang)[0]?.name

    return (
        <div className={`transition-all relative xl:hidden`}>
            <button className={`absolute top-0 right-0  -translate-x-[20px] transition-all ${isMenuOpen ? '-translate-y-[62px]' : '-translate-y-[58px]'}`} onClick={() => { setIsMenuOpen(prevState => !prevState) }}>
                <div className='w-[22px] h-[22px] flex flex-col space-y-1'>
                    <span className={`w-[22px] h-[2px] bg-black transition-all dark:bg-white ${isMenuOpen ? 'rotate-45 -translate-x-[1px] translate-y-[10px]' : ''}`}></span>
                    <span className={`w-[22px] h-[2px] bg-black transition-all dark:bg-white ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`w-[22px] h-[2px] bg-black transition-all dark:bg-white ${isMenuOpen ? '-rotate-45 -translate-x-[1px] -translate-y-[2px]' : ''}`}></span>
                </div>
            </button>
            <div className={`mobile-menu-content transition-all ease-out ${isMenuOpen ? 'h-[500px]' : 'h-0 '} `}>
                <div className={`h-[95%] px-5 flex flex-col  bg-[#f7f7f7] dark:bg-[#171925] ${isMenuOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
                    <ul className='flex flex-col'>
                        {NAVIGATION_MENU.map((item, index) => {
                            const { icon: Icon, name, href } = item
                            const isLastItem = index === NAVIGATION_MENU.length - 2
                            if (name === 'More') {
                                return (
                                    <MoreOptionsPopover item={item} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                                )
                            }
                            return (
                                <NavLink
                                    exact
                                    strict
                                    target={item.targetBlank ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center xl:text-xs text-sm xl:my-0 font-normal text-[#393939] dark:text-black py-[10px] hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200  border-b-[#e3e3e3] border-b`}
                                    to={{
                                        pathname: isProduction == 'true' ? '/' : '/' + activeLang + item.href || undefined,
                                    }}
                                    onClick={(e: any) => { setIsMenuOpen(false); history.push('/' + activeLang + item.href) }}
                                    activeClassName="active-nav-item !text-[#ed4b45] dark:bg-neutral-800 dark:!text-neutral-100"
                                    key={item.id}
                                >
                                    <li className='flex items-center justify-center'>

                                        {" "}
                                        {/* <div className="bullets w-[2px] h-[5px] rounded-[3px] bg-[#3944B3] dark:bg-black mr-4"></div> */}
                                        {/* {Icon && <Icon className={`text-[#3944B3] dark:text-white ${href === '/flights' ? 'mr-[10px]' : 'mr-5'}`} />} */}
                                        <span className='text-sm h-[30px] flex items-center font-medium text-[#393939] dark:text-white'>

                                            {item.name}
                                        </span>


                                    </li>
                                </NavLink>

                            )
                        }
                        )}
                        <li className='relative flex justify-between items-center border-b-[#e3e3e3] border-b py-[7px] z-[9]' >
                            <span className='absolute top-0 left-0 translate-y-[8px] dark:text-white'>{ActiveLangLabel}</span>
                            <LanguagePicker
                                icon={<ChevronDown className='text-sm w-4 translate-x-[80%] dark:text-white' />}
                                modeLight={theme}
                                openDropdownMenu={openDropdownMenu}
                                setOpenDropdownMenu={setOpenDropdownMenu}
                                languages={languages}
                                data={userprofile ?? user}
                                buttonClassNames="inline-flex flex-row-reverse w-full !border-0 !py-0 !h-auto"
                                popoverClassNames='w-full'
                                hasDropDown={false}
                            />

                        </li>
                        <li className='relative flex justify-between' >
                            <span className='absolute top-0 left-0 translate-y-[5px] dark:text-white'>{activeCurrency}</span>
                            <CurrencyPicker
                                icon={<ChevronDown className='text-sm w-4 translate-x-[80%]' />}
                                modeLight={theme}
                                openDropdownMenu={openDropdownMenu}
                                setOpenDropdownMenu={setOpenDropdownMenu}
                                buttonClassNames={'inline-flex flex-row-reverse w-full !overflow-visible !border-0 !h-auto dark:text-white'}
                                poppoverClassNames="w-full"
                                hasDropDown={false}
                            />

                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

interface MoreOptionsPopoverProps {
    item: NavigationItemType
    isMenuOpen: boolean,
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const MoreOptionsPopover: FC<MoreOptionsPopoverProps> = (props) => {
    const { item: { name, children }, setIsMenuOpen } = props

    const isProduction = process.env.REACT_APP_PRODUCTION;

    const history = useHistory()
    const location = useLocation()
    const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

    useEffect(() => {
        console.log('Active-item: this is the children: ', children, location.pathname)
    }, [children, location])

    return (<>
        <Popover className="relative py-[10px] border-b border-b-[#e3e3e3] z-10">
            <Popover.Button className={' w-full flex justify-between items-center'}>
                <span className='dark:text-white'>
                    {name}
                </span>
                <ChevronDown className='text-sm w-4 dark:text-white' />
            </Popover.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel className="absolute z-10 w-full bg-white dark:bg-[#202232] px-5 flex flex-col transition-all focus:ring-0 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10">
                    <>
                        {children?.map((item, index) => {
                            const { icon: Icon, name, href } = item
                           const isActive = window.location.pathname == href
                            return (
                                <NavLink
                                    exact
                                    strict
                                    target={item.targetBlank ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center xl:text-xs text-sm xl:my-0 font-normal text-[#393939] dark:text-black py-[10px] hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200  border-b-[#e3e3e3] group`}
                                    to={{
                                        pathname: isProduction == 'true' ? '/' : '/' + activeLang + item.href || undefined,
                                    }}
                                    onClick={(e: any) => { setIsMenuOpen(false); history.push('/' + activeLang + item.href) }}
                                    activeClassName="active-nav-item !text-[#ed4b45] dark:bg-neutral-800 dark:!text-neutral-100"
                                    key={item.id}
                                >
                                    <CircleIcon className={`group-hover:fill-[#F75847] mr-2 ${isActive ? 'fill-[#F75847]' : 'fill-white'}`} />
                                    <li className='flex items-center justify-center'>

                                        {" "}
                                        {/* <div className="bullets w-[2px] h-[5px] rounded-[3px] bg-[#3944B3] dark:bg-black mr-4"></div> */}
                                        {/* {Icon && <Icon className={`text-[#3944B3] dark:text-white ${href === '/flights' ? 'mr-[10px]' : 'mr-5'}`} />} */}
                                        <span className={`text-sm h-[30px] flex items-center font-medium text-[#393939] dark:text-white `}>
                                            {item.name}
                                        </span>


                                    </li>
                                </NavLink>)
                        })}

                    </>
                </Popover.Panel>
            </Transition>
        </Popover>




    </>)
}


export default MobileMenuV2