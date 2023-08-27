import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {LIGHTMODE} from '../../store/actions'
import useWindowDimensions from '../../components/Demonsion/getDemonsion';
interface SwitchDarkModeProps {
  className?: string;
};

const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = "" }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const Theme = useSelector((state: any) => state.LightMode);

  const dispatch  = useDispatch();
  const { height, width } = useWindowDimensions();

  const lightIcon = <svg width={width >= 1280 && width <= 1500 ? '26' : '26'} height={width >= 1280 && width <= 1500 ? '26' : '26'} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9505 17.9811C15.6555 17.9811 17.8483 15.7883 17.8483 13.0833C17.8483 10.3784 15.6555 8.18555 12.9505 8.18555C10.2455 8.18555 8.05273 10.3784 8.05273 13.0833C8.05273 15.7883 10.2455 17.9811 12.9505 17.9811Z" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.9512 5.57302V3.94043" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.63535 7.76914L6.48438 6.61816" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.44118 13.083H3.80859" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.63535 18.3975L6.48438 19.5484" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.9512 20.5928V22.2254" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.2637 18.3975L19.4146 19.5484" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.4609 13.083H22.0935" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.2637 7.76914L19.4146 6.61816" stroke="#3944B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>; 
                    
  const darkIcon = <svg width={width >= 1280 && width <= 1500 ? '26' : '26'} height={width >= 1280 && width <= 1500 ? '26' : '26'} stroke="#fff" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.9375 11.375V6.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24.375 8.9375H19.5"  stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.0625 2.4375V5.6875" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.6875 4.0625H15.4375"  stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22.0094 15.4982C20.4142 15.9456 18.7286 15.9602 17.1259 15.5407C15.5231 15.1212 14.0609 14.2826 12.8894 13.1111C11.718 11.9397 10.8794 10.4774 10.4599 8.8747C10.0404 7.27195 10.055 5.58642 10.5024 3.99121C8.92962 4.42896 7.49903 5.27112 6.35306 6.43382C5.2071 7.59652 4.38576 9.03918 3.97086 10.6181C3.55596 12.197 3.56198 13.8571 3.98831 15.4329C4.41465 17.0088 5.24642 18.4455 6.40078 19.5998C7.55515 20.7542 8.99181 21.5859 10.5677 22.0123C12.1435 22.4386 13.8036 22.4446 15.3825 22.0297C16.9614 21.6148 18.4041 20.7935 19.5668 19.6475C20.7295 18.5016 21.5716 17.071 22.0094 15.4982V15.4982Z"  stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>;  


  useEffect(() => {
    if (
      localStorage.theme === "dark" 
      ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      toDark();
    } else {
      toLight();
    }
  }, []);

  const toDark = () => {
    setIsDarkMode(true);

    dispatch({
      type: LIGHTMODE,
      payload:{
        mode:'dark'
      }
    })

    const root = document.querySelector("html");
    if (!root) return;
    !root.classList.contains("dark") && root.classList.add("dark");
    localStorage.theme = "dark";
  };

  const toLight = () => {
    setIsDarkMode(false);
    
    dispatch({
      type: LIGHTMODE,
      payload:{
        mode:'light'
      }
    })

    const root = document.querySelector("html");
    if (!root) return;
    root.classList.remove("dark");
    localStorage.theme = "light";
  };


  function _toogleDarkMode() {
    if (localStorage.theme === "light") {
      toDark();
    } else {
      toLight();
    }
  };

  return (
    <button
      onClick={_toogleDarkMode}
      className={`relative group overflow-hidden py-1 px-3 rounded-full border border-[#3944B3] dark:border-white flex items-center bg-neutral from-neutral-500 to-purple-500 hover:to-purple-600`}
    >
      { isDarkMode ? darkIcon : lightIcon }
    </button>
  );
};

export default SwitchDarkMode;
