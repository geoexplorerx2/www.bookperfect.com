import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { activateSideMenu } from '../../store/actions';


interface Menu{
    menu?: string;
    objective?: string;
    name?: string;
    href?: string;
};

const ProfileSidebar = ({menu, activeSideMenu, setActiveSideMenu, onMenuSelect } : any) => {

  const dispatch = useDispatch();
  const handleMenuSelect = (menu: Menu) => {
    // setActiveSideMenu({menu: menu.name, active: true, data: menu, href: menu.href.replace('/'. ' ')  });
    onMenuSelect(menu);

    var activemenu = {
        menu: menu.name, 
        active: true, 
        data: menu, 
        href: typeof menu.href == 'string' && menu.href.replaceAll('/', '') 
      };

    dispatch(
        activateSideMenu(
            activemenu
        )
    )
    
  };


  return (
    <div>
        <aside className="w-64" aria-label="Sidebar">
            {/* <div className="overflow-y-auto py-4 bg-white-50 rounded dark:bg-white-800"> */}
            <div className="py-4 bg-white-50 rounded dark:bg-white-800">
                <ul className="space-y-2">
                    {
                        menu.map((menu: any, index: number) => 
                            {
                                const { icon: Icon } = menu
                           return (

                               <li
                                   key={menu.id}
                                   className={`flex flex-start flex-grow items-center p-2 ${ menu.name == activeSideMenu.menu && 'bg-[#EEEFFF] dark:bg-[#171925]'} rounded-lg text-base cursor-pointer font-normal hover:bg-[#EEEFFF]  dark:text-[#fff] dark:hover:bg-[#171925] space-x-3`}
                                   onClick = {(e: any) => {
                                       handleMenuSelect(menu)
                                   }
                                   }
                               >
                               {/* <img src={menu.icon} alt="" /> */}
                               <Icon className="text-[#3944B3] dark:text-white" />
                               <span className="ml-2 text-sm text-[#0E123D] dark:text-[#fff]" style={{fontFamily: "Poppins", fontWeight: 400}}>{ menu.name }</span>
                             </li>
                           )
                            }
                        )
                    }
                </ul>
            </div>
        </aside>
    </div>
  )
}

export default ProfileSidebar;