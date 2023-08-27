import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { FC, Fragment, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { goToPage } from "../../common/goToPage";
import { NavigationItemType } from "../../types/menus/menus";
import { useDispatch, useSelector } from "react-redux";
import { DISABLEDROPDOWN, scrollToTargetAction, supportHelps } from '../../store/actions'
import { citiesClear, continent, taxonomyClear } from "../../store/actions/TravelguideActions";
import TYPES from "../../types/store";
import { ToTranslationFormat, TranslateIfExists } from "../../helpers";
import { useTranslation } from "react-i18next";
export interface MenuItemsProps {
  menuItem: NavigationItemType;
  isAuthenticated: boolean;
  //   goToPage: Function;
}


const MenuItems: FC<MenuItemsProps> = ({
  menuItem,
  isAuthenticated
}) => {

  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);
  const [isActiveMenu, setIsActiveMenu] = useState<any>();
  const [updatedPathname, setUpdatedPathname] = useState<any>('');
  const disableReducer = useSelector((state: any) => state.disableReducer.status);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const theme = useSelector((state: any) => state.LightMode.mode);

  const history = useHistory();
  const dispatch = useDispatch();

  // @ts-ignore
  const { t, i18n } = useTranslation();

  const origin = window.location.origin;
  const windowLink = window.location.pathname.split('/')[2];
  const rootLocation = window.location.pathname;

  const path = rootLocation.split('/');
  const route = path.slice(0, path.length - 1).join('/');
  const URL = origin + "/" + activeLang;

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };

  const production = process.env.REACT_APP_PRODUCTION;

  const handleDropDownMenu = (menu: any) => {

    // history.push(production == 'true' ? '/' : activeLang + menu.href);

    // active menu
    dispatch({
      type: DISABLEDROPDOWN,
      payload: {
        status: menu,
      }
    });
    // setIsActiveMenu(menu);
  };

  const handleNavLink = (item: NavigationItemType) => {

    dispatch({ type: TYPES.EXCLUSIVE_OFFERS_VIEW, payload: { status: null } });
    if (item.name == 'More') return;

    dispatch({
      type: DISABLEDROPDOWN,
      payload: {
        status: item,
      }
    });

    if (item.href == '/') goToPage('/', '');
    else {

      if (item.href == '/travelguide') {
        dispatch(
          continent()
        );
      };

      // history.push(
      //   activeLang + "/" +item.href
      // );

      // let dynamicUrl = URL + item.href
      const urlWithLang = activeLang + '/' + item.href
      // use replace with dynamic url
      // window.location.href = dynamicUrl;
      console.log('multilang problem: history: ', history)
      // history.create
      // history.push(urlWithLang)
      // history.replace({ pathname: urlWithLang, state:{isActive: true}})
    };

    // reset support help to faq
    dispatch(
      supportHelps(
        {
          type: 'RESET'
        }
      )
    );

    dispatch(
      scrollToTargetAction('')
    );
  };

  // reset taxonomy on pages change
  useEffect(() => {
    dispatch(
      taxonomyClear()
    );

    dispatch(
      citiesClear()
    );

  }, [windowLink]);

  const renderDropdownMenuNavlinkHasChild = (item: NavigationItemType) => {
    const isHover = menuCurrentHovers.includes(item.id);
    return (
      <Popover
        as="li"
        key={item.id}
        className="menu-item menu-dropdown relative px-2"
        onMouseEnter={() => onMouseEnterMenu(item.id)}
        onMouseLeave={() => onMouseLeaveMenu(item.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(item)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {item.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlink = (item: NavigationItemType) => {
    return (
      <NavLink
        exact
        strict
        target={item.targetBlank ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="drop-down flex items-center font-normal font-poppins text-sm text-[#3944B3] leading-[21px] dark:text-neutral-300 py-2 px-4 rounded-md  hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        // to={{
        //   pathname: production == 'true' ? '/' : (activeLang + "/" + item.href) || undefined,
        // }}
        // to={`/${activeLang}${item.href}`}
        to={`/${activeLang}${item.href}`}
        activeClassName="!font-medium text-[#F75847] dark:!text-neutral-100 dark:bg-neutral-800"
      >
        {
          i18n.exists(ToTranslationFormat(`NAV_ITEMS.${item.name}`))
            ? t(ToTranslationFormat(`NAV_ITEMS.${item.name}`))
            : item.name
        }
        {item.type && (
          <ChevronDownIcon
            className="ml-2 h-4 w-4 text-neutral-500"
            aria-hidden="true"
          />
        )}
      </NavLink>
    );
  };


  // dropdown menu
  const RenderDropdownMenu = (menuDropdown: NavigationItemType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id);

    return (
      <Popover
        as="li"
        className={`menu-item menu-dropdown relative ${menuDropdown.isNew ? "menuIsNew_lv1" : ""
          }`}
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {RenderMainItem(menuDropdown)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu will-change-transform absolute transform z-10 w-56 pt-3 left-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {menuDropdown.children?.map((i) => {
                    const isHoverI = menuCurrentHovers.includes(i.id);
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li

                          key={i.id}
                          className="px-5 flex py-2"
                          onMouseEnter={() => onMouseEnterMenu(i.id)}
                          onMouseLeave={() => onMouseLeaveMenu(i.id)}
                          onClick={(e: any) => handleDropDownMenu(i)}
                        >
                          {/* <span className=""> */}
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" fill={`${isHoverI ? '#F75847' : disableReducer && disableReducer.id == i.id ? '#F75847' : 'white'}`} stroke='#F75847' />
                          </svg>
                          {/* </span> */}
                          <span className="-mt-3">  {renderDropdownMenuNavlink(i)} </span>
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // main menu
  const RenderMainItem = (item: NavigationItemType) => {

    return (
      // <div className="flex items-center">
      //   {/* <NavLink> */}
      //   <a
      //     // exact
      //     // strict
      //     target={item.targetBlank ? "_blank" : undefined}
      //     rel="noopener noreferrer"
      //     className={`inline-flex items-center xl:text-xs whitespace-nowrap  text-2xl my-[34px] xl:my-0 font-normal text-[#3944B3] dark:text-neutral-300 py-2 ${isAuthenticated ? "px-2 xl:px-0" : "px-[.1vw]"} rounded-full hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200 cursor-pointer`}
      //     // to={{
      //     //   pathname: production == 'true' ? '/' : (activeLang + item.href) || undefined,
      //     // }}
      //     // to={URL + item.href}
      //     onClick={(e: any) => { handleNavLink(item) }}>
      //     <span className={`${'/' + windowLink == item.href ? 'active-nav-item !text-[#ed4b45] dark:!text-[#ed4b45] dark:bg-neutral-800' : ''} text-[10px] xl:text-[13px] xl:px-1 2xl:text-[13px] xl&2xl:text-[13px] dark:hover:text-[#F75847]`}>{

      //       // TranslateIfExists(`NAV_ITEMS.${item.name}`)
      //       i18n.exists(ToTranslationFormat(`NAV_ITEMS.${item.name}`))
      //         ? t(ToTranslationFormat(`NAV_ITEMS.${item.name}`))
      //         : item.name
      //     }</span>
      //     {item.type == "dropdown" && (
      //       <ChevronDownIcon
      //         className="ml-1 -mr-1 h-4 w-4 text-neutral-400 text-[10px] xl:text-[8px] 2xl:text-[12px] xl&2xl:text-[10px]"
      //         aria-hidden="true"
      //       />
      //     )}
      //     {/* </NavLink> */}
      //   </a>
      // </ div>
      <div className="flex items-center">
      <NavLink
      
        className={`inline-flex items-center xl:text-xs whitespace-nowrap  text-2xl my-[34px] xl:my-0 font-normal text-[#3944B3] dark:text-neutral-300 py-2 ${isAuthenticated ? "px-2 xl:px-0" : "px-[.1vw]"} rounded-full hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200 cursor-pointer`}
       
         to={`/${activeLang}${item.href}`}
         onClick={(e: any) => { handleNavLink(item) }}
        >
        <span className={`${'/' + windowLink == item.href ? 'active-nav-item !text-[#ed4b45] dark:!text-[#ed4b45] dark:bg-neutral-800' : ''} text-[10px] xl:text-[13px] xl:px-1 2xl:text-[13px] xl&2xl:text-[13px] dark:hover:text-[#F75847]`}>{

          // TranslateIfExists(`NAV_ITEMS.${item.name}`)
          i18n.exists(ToTranslationFormat(`NAV_ITEMS.${item.name}`))
            ? t(ToTranslationFormat(`NAV_ITEMS.${item.name}`))
            : item.name
        }</span>
        {item.type == "dropdown" && (
          <ChevronDownIcon
            className="ml-1 -mr-1 h-4 w-4 text-neutral-400 text-[10px] xl:text-[8px] 2xl:text-[12px] xl&2xl:text-[10px]"
            aria-hidden="true"
          />
        )}
        </NavLink>
    
    </ div>
    );
  };

  switch (menuItem.type) {
    case "dropdown":
      return RenderDropdownMenu(menuItem);
    default:

      if (menuItem.name == 'Flights & More') { menuItem.name = 'Flights & More' }
      if (menuItem.name == 'Trip Designer') { menuItem.name = 'TripDesigner' }
      if (menuItem.name == 'Flights + Hotels') { menuItem.name = 'Flights + Hotels' }
      return <li className="menu-item nav-item relative">{RenderMainItem(menuItem)}</li>;
  }
};
export default MenuItems;