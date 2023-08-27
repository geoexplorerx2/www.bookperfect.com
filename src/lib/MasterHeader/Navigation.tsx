import React, { FC } from "react";
import MenuItems from "./MenuItems";
import { NAVIGATION_MENU } from "./NavigationMenu";

interface NavigationProps {
  authenticated: boolean;
  classes?: string
};

const Navigation: FC<NavigationProps> = ({authenticated, classes}) => {

  return (
    <ul className={`${classes}  navigation p-0 xl:flex xl:justify-between w-[60%] xl:items-center xl:space-x-0 relative`}>
      {
        NAVIGATION_MENU.map(item => (
          <MenuItems key={item.id} menuItem={item} isAuthenticated = { authenticated } />
        ))
      }
    </ul>
  );
}

export default Navigation;
