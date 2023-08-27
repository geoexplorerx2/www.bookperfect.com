import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocationInput from "./LocationInput";
import { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import CInputNumber from "../../lib/CInputNumber/CInpuNumber";
import SearchButton from "../SearchButton/SearchButton";
import { DatePicker } from "@mantine/dates";
import { Calendar, CurrentLocation } from "tabler-icons-react";
import styled, { css } from "styled-components";
import { createStyles } from "@mantine/core";
import BASE_URL_HOME from "../../api/env";
import { useHistory } from 'react-router-dom'
import { addLeadingZeros } from "../../common/AddLeadingZeros";
import TravelThemeInput from "../TravelThemeInput/TravelThemeInput";
import NightsNo from "../NightsNo/NightsNo";
import ShortCountryInput from "../ShortCountryInput/ShortCountryInput";
import MonthInput from "../MonthInput/MonthInput";
import TermsOfServiceText from "../TermsOfServiceText/TermsOfServiceText";

const SelectionClassWrapper = styled.div`
  font-weight: 500px;
  font-family: 'Poppins';
  size: 14px;
  line-height: 21px;
`;

export interface TimeRage {
  startTime: string;
  endTime: string;
}

export interface PackagesSearchFormProps {
  roundedTopLeft?: string;
  customStyle?: any;
  wrapperClassNames?: string;
  searchcardplace?: string;
};

const flightClass = [
  {
    name: "Economy",
    href: "##",
  },
  {
    name: "Business",
    href: "##",
  }
];

const PackagesSearchForm: FC<PackagesSearchFormProps> = ({ roundedTopLeft, customStyle, wrapperClassNames, searchcardplace }) => {

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [departureDate, setDepartureDate] = useState<any>();
  const [arrivalDate, setArrivalDate] = useState<any>();
  const [guestValue, setGuestValue] = useState<any>({});
  const changeLighmode = useSelector((state: any) => state.LightMode);
  const [fieldFocused, setFieldFocused] = useState<"dropOffInput" | ''
  >('');

  const [selectedCountry, setSelectedCountry] = useState<any>('all');
  const [selectedTheme, setSelectedTheme] = useState<any>();
  const [selectedMonth, setSelectedMonth] = useState<any>();
  const [selectedNights, setSeletedNights] = useState<any>();
  const ref = useRef<any>(null);

  const [checkInDate, setCheckInDate] = useState<any>();
  const handleDate = (date: any) => {
    setCheckInDate(date);
    ref.current.click();
  };
  const [clicking, setClicking] = useState<any>();
  const clickingExe = (param: any) => {
    setClicking(param);
  }
  // const resultLink = BASE_URL_HOME + "/holidays/availability.xhtml?lang=EN";

  let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let mm = checkInDate && checkInDate.getMonth() + 1;
  let month = digits.includes(mm) ? (checkInDate?.getFullYear() + "-" + addLeadingZeros(mm, 2)) : (checkInDate?.getFullYear() + "-" + mm);

  let _month = selectedMonth?.year + "-" + selectedMonth?.id;
  const resultLink = BASE_URL_HOME + "/" + activeLang.toUpperCase() + "/holidays/availability?country=" + selectedCountry?.value + "&tripId=-1&theme=" + (selectedTheme && selectedTheme.id) + "&month=" + _month + "&nights=" + selectedNights?.value;

  const RenderForm = () => {
    let history = useHistory()
    const useStyles = createStyles((theme) => ({
      input: {
        color: changeLighmode.mode === 'dark' ? '#fff' : '#000',
      }
    }));
    const { classes } = useStyles();
    return (
      <div className={`w-[100%] ${wrapperClassNames} relative`}
      >
        <form className={`w-full h-auto md:h-[200px] ${roundedTopLeft} rounded-tr-xl relative bg-white ${searchcardplace == 'travelguide' ? 'dark:bg-[#171925]' : 'dark:bg-[#202232]'}  max-h-[100%] `}>
          {history.location.pathname == '/' ? <div className="hidden h-[14px] md:h-[67px]"></div> : ''}
          <div className=" flex flex-col md:flex-row w-full  space-x-0 sm:space-x-0 lg:space-x-0 rounded-full [ nc-divide-field ] h-ful md:h-[50%]">
            <div className={`flex flex-col md:flex-row w-full  space-x-0 sm:space-x-0 lg:space-x-0 rounded-full [ nc-divide-field ] h-[100%] px-5 md:px-2 lg:px-11 mt-[15px] md:mt-[83px] ${history.location.pathname == '/' ? '' : ''}`}>
              <div className="w-[100%] h-full  md:h-[72px] flex flex-col items-center  md:flex-row justify-between">
                <div onClick={() => clickingExe('country')} className="cursor-pointer w-[100%] h-[54px] md:h-full relative mb-2  md:mb-0 mt-4 md:mt-0 md:mr-2 border border-[#AFB3E0] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff] rounded-2xl">
                  <ShortCountryInput onChange={(country: any) => setSelectedCountry(country)} clicking={() => clicking == 'country' ? true : false} />
                </div>
                <div onClick={() => clickingExe('when')} className="cursor-pointer w-[100%] h-[54px] md:h-full mb-2 md:mb-0 flex justify-between border border-[#AFB3E0] rounded-2xl z-[1] hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]">
                  <MonthInput onChange={(month: any) => setSelectedMonth(month)} clicking={() => clicking == 'when' ? true : false} />
                </div>
                <div onClick={() => clickingExe('Night')} className="cursor-pointer w-[100%] h-[54px] md:h-full flex justify-between mb-2 md:mb-0 md:ml-2 border border-[#AFB3E0] rounded-2xl hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]">
                  <NightsNo defaultValue="" onChange={(nights: any) => setSeletedNights(nights)} clicking={() => clicking == 'Night' ? true : false} />
                </div>
                <div onClick={() => clickingExe('Travel')} className="cursor-pointer w-[100%] h-[54px] md:h-full mb-2 md:mb-0 md:ml-2 border border-[#AFB3E0] rounded-2xl hover:border-[1px] hover:border-[#3944B3] dark:hover:border-[1px] dark:hover:border-[#fff]">
                  <TravelThemeInput defaultValue="" onChange={(theme: any) => setSelectedTheme(theme)} clicking={() => clicking == 'Travel' ? true : false} />
                </div>
              </div>
              <div className="flex items-center justify-center w-full md:w-auto h-[94%] md:h-[71px] mt-[0.1vh] !mx-auto md:mr-[0.1vw] md:!ml-2">
                <SearchButton
                  type="packages"
                  link={resultLink}
                  date={checkInDate}
                  classNames='!w-full md:!w-[74px] !h-[54px] md:!h-[71px]'
                />
              </div>
            </div>
          </div>
          <TermsOfServiceText wrapperClassNames="md:absolute px-5 !z-0" />
        </form>

      </div>
    );
  };

  return RenderForm();
};

export default PackagesSearchForm;
