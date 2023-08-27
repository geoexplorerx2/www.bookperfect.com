import { Popover, Transition } from '@headlessui/react';
import React, { FC, Fragment, ReactNode, useEffect, useRef ,useState } from 'react';
import ButtonPrimary from '../../lib/Button/ButtonPrimary';
import ButtonSecondary from '../../lib/Button/ButtonSecondary';
import ButtonWithIcon from '../../lib/Button/ButtonWithIcon';
import { Namespace, useTranslation } from 'react-i18next';
import {useDispatch} from 'react-redux';
import { language, LANGUAGE, staticPageText, tripIdeasData } from '../../store/actions';
import { useSelector } from 'react-redux';
import { 
  GENERAL_FLIGHT_HOTEL_PAGE_ID, 
  GENERAL_FLIGHT_PAGE_ID, 
  GENERAL_HOMEPAGE_PAGE_ID, 
  GENERAL_HOTEL_PAGE_ID, 
  GENERAL_PACKAGES_PAGE_ID, 
  GENERAL_ROUTING_PAGE_ID, 
  GENERAL_TRANSFERS_PAGE_ID, 
  GENERAL_TRIPDESIGNER_PAGE_ID, 
  GERNERAL_ACTIVITIES_PAGE_ID } from '../../constants/pages';
interface LanguagePickerProps{
    openDropdownMenu: any,
    setOpenDropdownMenu: any,
    icon: ReactNode;
    // handleButtonClick: any;
    modeLight: any;
    languages?: any;
    data?: any;
    buttonClassNames?: string,
    popoverClassNames?: string,
    hasDropDown?: boolean
};

// export const Languages = [
//   {
//     id: 'en',
//     name: 'English'
//   },
//   {
//     id: 'tr',
//     name: 'Türkçe'
//   },
//   {
//     id: 'fr',
//     name: 'Français'
//   },
//   {
//     id: 'de',
//     name: 'Deutsch'
//   }
// ];

const LanguagePicker: FC<LanguagePickerProps> = ({openDropdownMenu, setOpenDropdownMenu, icon, modeLight, languages, data, buttonClassNames = 'hidden xl:inline-flex'  , popoverClassNames, hasDropDown = true }) => {

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const { i18n } = useTranslation();
  const [lanStatus,setLanStatus]=useState<any>('English');

  const current_page = window.location.pathname.split('/');
  let page = current_page && current_page[current_page.length - 1];
  const origin = window.location.origin;
  const currentpage_uri = window.location.pathname.split('/');
  const uri_lang: any = currentpage_uri?.length > 0 && currentpage_uri[1];
  const URL = origin;
  const pageuri = currentpage_uri.length > 2 && currentpage_uri.slice(2).join('/');

  // console.log({currentpage_uri}, {pageuri});

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    
    // click inside
    if (!openDropdownMenu.show || containerRef.current.contains(event.target as Node)) {
      return;
    }

    // click outside
    setOpenDropdownMenu({
        show: false,
        type: ''
    });
  };

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    openDropdownMenu.show && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [openDropdownMenu]);

  // change language
  const ChangeLanguage = (language: string) => () => {
    // i18n.changeLanguage(language).then((t) => console.log(t)).catch(error => console.log(error));
  };

  const handleLan = (langID:any,langName:any) => {
    // console.log('the lang problem: langId: ', langID)
    i18n.changeLanguage(langID);
    setLanStatus(langName);
    
    // set active language
    dispatch(
      language(langID)
    );

    // history.replace(dynamicUrl);
    if(pageuri){
      let dynamicUrl = origin + '/' + langID + '/' + pageuri;
      window.location.href = dynamicUrl;
    };
  };

  useEffect(() => {
    // request packages
    let req = {
      lang: activeLang.toUpperCase(),
      currency: activeCurrency,
      countryCode: 'TR'
    };
    
    dispatch(
      tripIdeasData(req)
    );

    // get static text data on language change
    const languageCodes = languages.map((lang: any ) => lang.id)
    const isHomepage = [...languageCodes].includes(page)
    if(isHomepage) page = ''
    switch (page) {
      case '':
        dispatch(
          staticPageText(
            GENERAL_HOMEPAGE_PAGE_ID, 
            activeLang
          )
        );
        break;
      case 'flights':
        dispatch(
          staticPageText(
            GENERAL_FLIGHT_PAGE_ID, 
            activeLang
          )
        );
        break;
      case 'hotels':
        dispatch(
          staticPageText(
            GENERAL_HOTEL_PAGE_ID, 
            activeLang
          )
        );
        break;
      case 'flights-hotels':
        dispatch(
          staticPageText(
            GENERAL_FLIGHT_HOTEL_PAGE_ID, 
            activeLang
          )
        );
        break;
      case 'activities':
        dispatch(
          staticPageText(
            GERNERAL_ACTIVITIES_PAGE_ID, 
            activeLang
          )
        );
        break;
      case 'transfers':
        dispatch(
          staticPageText(
            GENERAL_TRANSFERS_PAGE_ID, 
            activeLang
          )
        );
        break;
      case 'packages':
        dispatch(
          staticPageText(
            GENERAL_PACKAGES_PAGE_ID, 
            activeLang
          )
        );
        break;
      case 'routing':
        dispatch(
          staticPageText(
            GENERAL_ROUTING_PAGE_ID, 
            activeLang
          )
        );
        break;
      case 'tripdesigner':
        dispatch(
          staticPageText(
            GENERAL_TRIPDESIGNER_PAGE_ID, 
            activeLang
          )
        );
        break;
      default:
        break;
    }

  }, [activeLang]);


  // if language code present in the uri
  useEffect(() => {
    // console.log('the lang problem: uri_lang: ', uri_lang.length ?? 'en')
   
    const localeFromURL = window.location.pathname.split('/')[1]
    // console.log('the lang problem: localeFromURL: ', uri_lang.length ?? 'en')
    let pickedLang = uri_lang?.lengh > 0 ? uri_lang : activeLang
    i18n.changeLanguage(pickedLang);
    setLanStatus(pickedLang);
    
    // set active language
    dispatch(
      language(pickedLang)
    );
  }, []);
  
  return (
    
   <Popover
    as="div"
    className={`menu-item menu-dropdown relative ${popoverClassNames}`}
    ref = { containerRef }
   >
    {({ open, close }) => (
      <>
        <Popover.Button
          as={'div'} 
          className="focus-visible focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          // ref={popoverButtonRef}
        >
            <ButtonWithIcon
              icon={icon}
              hasDropdown={hasDropDown}
              // customClass = "" 
              data = { data }
              buttonType='language'
              chevronClassName = { data ? "h-4 w-4 text-neutral-500" : "mr-2 translate-y-[1px] h-4 w-4 text-neutral-500" }
              // className={ (modeLight.mode == 'dark') ? 'bg-[#000] hidden xl:inline-flex':'hidden xl:inline-flex'} // inline-block
              className={`${buttonClassNames}`} // inline-block
              handleClick={(opened: boolean) => setOpenDropdownMenu({show: opened, type: 'language'})}
            />
        </Popover.Button>

        <Transition
          as={Fragment}
          show={openDropdownMenu.type === 'language' && openDropdownMenu.show}
          appear
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="sub-menu will-change-transform absolute transform z-60 w-[260px] pt-3 right-0"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-2 grid grid-cols-2 gap-2">
             {
               languages?.map((lang: any) => (
                  <div className="flex justify-arround mx-2">
                    <ButtonSecondary rounded="" className = {`${activeLang == lang.id ? '!bg-[#3944b3]   text-[white] ':'bg-[#fff] text-[#000]'} rounded-[8px] hover:border-[#3944B3]  border-2 border-[rgba(57, 68, 179, 20%)]  flex justify-arround w-[106px] h-[50px] dark:text-white`} onClick={() => handleLan(lang.id,lang.name)} > 
                      { lang.name } 
                    </ButtonSecondary>           
                  </div>
                ))
              }   
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
  )
};

export default LanguagePicker