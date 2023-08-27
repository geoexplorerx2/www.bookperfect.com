import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Menu } from 'tabler-icons-react';
import AccordionLayout from '../../lib/Accordion/AccordionLayout';
import { about, activateSideMenu, company, jobs, supportHelps } from '../../store/actions';


interface Menu{
    tid?: string;
    menu?: string;
    objective?: string;
    name?: string;
    href?: string;
    icon: ReactNode;
    icon1?: ReactNode;
    menuType?: string;
};

const arrowRight = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.6084 7.5H12.391" stroke="#B0B4E1" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.4375 3.28125L12.6562 7.5L8.4375 11.7188" stroke="#B0B4E1" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>;

const arrowRightActive = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.6084 7.5H12.391" stroke="#B0B4E1" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.4375 3.28125L12.6562 7.5L8.4375 11.7188" stroke="#B0B4E1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>;


const SupportSidebar = ({menu, activeSideMenu, setActiveSideMenu, onMenuSelect } : any) => {
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const dispatch = useDispatch();

  const handleMenuSelect = (menu: Menu, menu1: any) => {

    var activemenu = {
        menu: menu.name, 
        active: true, 
        data: menu,
        submenu: menu1
        // href: typeof menu.href == 'string' && menu.href.replaceAll('/', '') 
      };

      if(menu.tid == '58'){
        dispatch(
          supportHelps(
            {
              type: 'RESET'
            }
          )
        );
      };
    
      dispatch(
        activateSideMenu(
          activemenu
        )
      );

      if(menu.menuType == 'company'){
        dispatch(
          company(
            activeLang.toLowerCase()
          )
        )
      };

      switch (menu.name?.toLowerCase()){
        case 'about':
            dispatch(
              about()
            )
          break;
        case 'jobs':
            dispatch(
              jobs()
            )
          break;
        default:
          break;
      }

  };

  return (
    <div>
        <aside className="w-64" aria-label="Sidebar">
            <div className="py-4 bg-white-50 rounded dark:bg-white-800">
                <ul className="space-y-2">
                    {
                        menu.length > 0 &&
                        menu.map((menu: any, index: number) => (
                          <>
                            <div className='-space-y-2'>
                                <AccordionLayout 
                                  icon = {menu && menu.icon1} 
                                  title={menu.name} 
                                  onClick = {() => handleMenuSelect(menu, "")}
                                  customStyle = "dark:hover:bg-[#171926] flex w-full mt-2 flex-grow rounded-lg text-base cursor-pointer font-normal space-x-4" 
                                  className={`leading-[21px] text-[13px] hover:text-[#3944B3]  dark:text-[#fff] font-poppins ${ menu.name == activeSideMenu.menu ? 'font-[500] text-[#3944B3]' : 'font-[300] text-[#0E123D]' }`} 
                                > 
                                    {
                                     menu.subterms &&
                                     menu.subterms.length > 0 ?
                                     menu.subterms?.map((menu1: any, index: number) => (
                                        <li className="flex text-base ml-4 cursor-pointer font-normal  dark:hover:bg-[#171926] space-x-4" onClick={ () => handleMenuSelect(menu, menu1)}>
                                            <span className=''>{ menu1 && menu1.name == (activeSideMenu.submenu && activeSideMenu.submenu.name ) ? arrowRightActive : arrowRight}</span>
                                            <span className={`text-[12px] dark:text-[#fff] ${ menu1 && menu1.name == (activeSideMenu.submenu && activeSideMenu.submenu.name) ? 'text-[#F75847] dark:text-[#fff]' : 'text-[#3F4249]'}`}>
                                                { menu1 && menu1.name }
                                            </span>
                                        </li>
                                    )) :
                                    ''
                                    }
                                </AccordionLayout>
                            </div>
                          </>
                        ))
                    }
                </ul>
            </div>
        </aside>
    </div>
  )
}

export default SupportSidebar;