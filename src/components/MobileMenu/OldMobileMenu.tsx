import React, { FC, LegacyRef, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import { ReactComponent as hamburgerIcon} from "../../images/icons/Hamburger.svg";
import {ReactComponent as  xIcon} from "../../images/icons/x.svg";

import Navigation from "../../lib/MasterHeader/Navigation";
import auths from "../../api/auths";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { NAVIGATION_MENU } from "../../lib/MasterHeader/NavigationMenu";
import MenuItems from "../../lib/MasterHeader/MenuItems";
import { NavLink, useHistory } from "react-router-dom";
import { NavigationItemType } from "../../types/menus/menus";

// import './MobileMenu.css'

const MobileMenu = () => {
  const [isShowing, setIsShowing] = useState(false);
  let buttonRef = useRef<any>();
  let history = useHistory();

  let route = () => { 
    switch (history.location.pathname) {
    case '/':
      return 'Trip Designer';
    case '/flights':
       return 'Flights';
    case '/hotels':
       return 'Hotels';
    case '/flights-hotels':
       return 'Flights & Hotels';
    case '/activities':
        return 'Activities'
    case '/travelguide':
        return 'Travel & Guide'
    case '/packages':
        return 'Packages'
    case '/routing':
        return 'Routing'
    case '/transfers':
        return 'Transfers'
    default:
      return 'not found'
  }}


  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("mobile-menu unclick");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const auth = auths;
  var authenticated = auth.isAuthenticated();
  // toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setIsShowing(true);
      setBurgerClass("burger-bar clicked");
      setMenuClass("mobile-menu click");
    } else {
      setIsShowing(false);
      setBurgerClass("burger-bar unclicked");
      setMenuClass("mobile-menu unclick");
    }
    setIsMenuClicked(!isMenuClicked);
  };
  let Icon = isShowing ? xIcon : hamburgerIcon;

  const menuContainerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (!menuContainerRef.current) return;
    // click inside
    if ( menuContainerRef.current.contains(event.target as Node) || iconRef?.current?.contains(event.target as Node) ) {

      setIsShowing(prevState => !prevState)
      return;

    }

    // click outside
    setIsShowing(false);
  };

  useEffect(() => {
    if (handleClickOutside) {
      document.removeEventListener("click", handleClickOutside);
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuClicked]);



  return (
    <>
      <div className="xl:hidden !mr-2">
        <Menu as="div" className="relative inline-block text-left">
          <div ref={menuContainerRef}>
            <Menu.Button
              ref={buttonRef}
              className={`inline-flex w-full justify-center rounded-md  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${isShowing ? '': 'text-orange-400' }`}
              // onClick={()=> setIsShowing(prev => !prev )}
           >
              <Icon color={`#F75847`}/>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute w-screen -right-4 top-14 px-6 mt-2 origin-top-right divide-y divide-gray-100 rounded-[10px_10px_20px_20px] bg-[#FFF9F9] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 flex flex-col">
                {NAVIGATION_MENU.map((item) =>
                // if navigation_item does not have children render it in a link 
                  item.type !== "dropdown" ? (
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          exact
                          strict
                          target={item.targetBlank ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={`inline-flex items-center xl:text-xs text-sm mt-[34px] xl:my-0 font-normal text-[#3944B3] dark:text-black py-2 rounded-full hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200`}
                          to={{
                            pathname: item.href || undefined,
                          }}
                          onClick={(e: any) => {setIsShowing(false);history.push(item.href)}}
                          activeClassName="active-nav-item !text-[#ed4b45] dark:bg-neutral-800 dark:!text-neutral-100"
                          key={item.id}
                        >
                          {" "}
                          <div className="bullets w-[2px] h-[5px] rounded-[3px] bg-[#3944B3] dark:bg-black mr-4"></div>
                          {item.name}
                          
                        </NavLink>
                      )}
                    </Menu.Item>
                  ) : (
                    // if navigation_item has children render DropDown
                    // ref is here for closing the menu when one item inside the DropDown is selected
                    // <div className="flex justify-start items-center mt-[34px]">
                    <>
                    
                    {item.children?.map((item => {
                      return (
                        <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            exact
                            strict
                            target={item.targetBlank ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className={`inline-flex items-center xl:text-xs text-sm mt-[34px] xl:my-0 font-normal text-[#3944B3] dark:text-black py-2 rounded-full hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200`}
                            to={{
                              pathname: item.href || undefined,
                            }}
                            onClick={(e: any) => {setIsShowing(false);history.push(item.href)}}
                            activeClassName="active-nav-item !text-[#ed4b45] dark:bg-neutral-800 dark:!text-neutral-100"
                            key={item.id}
                          >
                            {" "}
                            <div className="bullets w-[2px] h-[5px] rounded-[3px] bg-[#3944B3] mr-4"></div>
                            {item.name}
                            
                          </NavLink>
                        )}
                      </Menu.Item>
                      )
                    }))}
                    
                    {/* <DropDown navItem={item.children!} ref={buttonRef}/> */}
                    {/* </ div> */}
                    {/* // <SDropDown /> */}
                    </>
                  )
                )}
                <Menu.Item >


                <div className="w-full h-12 text-secondary !border-[#F75847] border rounded-lg bg-white
                                dark:bg-transparent text-[#F75847]  my-4 flex justify-center items-center"
                      onClick={()=>{ setIsShowing(false);history.push('travelguide')}}
                                >
                  <span className="w-4 h-[2px] mr-4 bg-[#F75847] "></span>
                  {/* {route()} */}
                  Travel Guide
                </div>
                </Menu.Item>
              </div>
              
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className={menu_class}></div>
    </>
  );
};


const DropDown = React.forwardRef<any,{navItem: NavigationItemType[]}>((props, ref) => {
    const {navItem} = props
    let moreRef = useRef() as React.MutableRefObject<HTMLSpanElement>;
    let history = useHistory(null)
    const executeScroll = ()=> window.scrollTo(0, moreRef.current.offsetTop)
    // useEffect(() => {
    //   executeScroll()
    // }, [moreRef])
    
    return (
      <div className="w-full max-w-sm px-4 bg-[#FFF9F9F0]" 
      // @ts-ignore
      ref={moreRef}
      >
      <Popover className="relative text-sm font-normal text-[#3944B3]">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium dark:text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                     // @ts-ignore
               onClick={() => {executeScroll()}}
          >
              <span className="text-sm font-normal text-[#3944B3]">more</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-[#3944B3] transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
              <Popover.Panel className="z-10 w-screen transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg ">
                  <div className="relative grid lg:grid-cols-2">
                    {navItem.map((item) => (
                        <NavLink
                        exact
                        strict
                        target={item.targetBlank ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={`inline-flex items-center xl:text-xs text-sm mt-[34px] xl:my-0 font-normal text-[#3944B3] dark:text-neutral-300 py-2 rounded-full hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200`}
                        to={{
                          pathname: item.href || undefined,
                        }}
                        // @ts-ignore
                        onClick={(e: any) => {history.push(item.href) ; ref.current.click()}}
                        activeClassName="active-nav-item !text-[#ed4b45] dark:bg-neutral-800 dark:!text-neutral-100"
                        key={item.id}
                      >
                        {" "}
                        <div className="bullets w-[2px] h-[5px] rounded-[3px] bg-[#3944B3] mr-4"></div>

                        {item.name}
                        
                      </NavLink>
                    ))}
                  </div>
               
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
    )
  
})




export default MobileMenu;
