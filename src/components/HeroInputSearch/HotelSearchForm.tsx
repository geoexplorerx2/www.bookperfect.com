import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import CInputNumber from "../../lib/CInputNumber/CInpuNumber";
import SearchButton from "../SearchButton/SearchButton";
import BASE_URL_HOME from "../../api/env";


var urlBaseHotel = BASE_URL_HOME + "/home?directSubmit=true&tripType=ONLY_HOTEL&distribution=2-0&lang=EN&carRental=false";

export interface TimeRage {
  startTime: string;
  endTime: string;
};

export interface HotelsSearchFormProps {};

const flightClass = [
  {
    name: "Economy",
    href: "##",
  },
  {
    name: "Business",
    href: "##",
  },
  {
    name: "Multiple",
    href: "##",
  },
];

const HotelsSearchForm: FC<HotelsSearchFormProps> = () => {

  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<"dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<"oneWay" | "roundTrip" | "multiStop" | "">("oneWay");
  const [guests, setGuests] = useState(1);
  const [flightClassState, setFlightClassState] = useState("Economy");


  const resultLink = urlBaseHotel + "&hotelDestination=Destination::IST&departureDate=30/06/2022&arrivalDate=05/07/2022";
  
  const renderGuest = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >
                <span>{`${guests} Guest`}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "" : "text-opacity-70"
                  } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
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
                <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                  <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                    <div className="relative bg-white dark:bg-neutral-800 p-4">
                      <CInputNumber
                        onChange={(e) => setGuests(e)}
                        min={1}
                        defaultValue={guests}
                        max={20}
                      />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  };

  const renderSelectClass = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >
                <span>{`${flightClassState}`}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "" : "text-opacity-70"
                  } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
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
                <Popover.Panel className="absolute z-10 w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                  <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                      {flightClass.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setFlightClassState(item.name);
                            close();
                          }}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <p className="text-sm font-medium ">{item.name}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  };

  // TODO: add select flight class + guests
  const renderRadio = () => {
    return (
      <div className=" py-5 [ hero-field-padding ] flex flex-row  space-x-5 flex-wrap border-b border-neutral-100 dark:border-neutral-700">
        <div className="form-check" onClick={(e) => setDropOffLocationType("oneWay")}>
          <input className=" appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
          <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
            One Way
          </label>
        </div>
        
        <div className="form-check" onClick={(e) => setDropOffLocationType("roundTrip")}>
          <input className=" appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
          <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
            Round Trip
          </label>
        </div>

        <div className="form-check" onClick={(e) => setDropOffLocationType("multiStop")}>
          <input className=" appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
          <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
              Multi Stop
          </label>
        </div>

      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="w-full">
        <form className="w-full relative rounded-xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
          {renderRadio()}
          <div className=" flex flex-col md:flex-row w-full rounded-full [ nc-divide-field ]">
            <div className="relative flex flex-col md:flex-row flex-grow [ nc-divide-field ]">
              <LocationInput
                defaultValue = { pickUpInputValue }
                onChange = {(e) => setPickUpInputValue(e)}
                onInputDone={() => setFieldFocused("dropOffInput")}
                placeHolder="From"
                desc=""
              />
              <LocationInput
                defaultValue={dropOffInputValue}
                onChange={(e) => setDropOffInputValue(e)}
                onInputDone={() => setFieldFocused(null)}
                placeHolder="To"
                desc=""
                autoFocus={fieldFocused === "dropOffInput"}
              />
            </div>

            {/* apply search */}
            <div className="px-4 py-3 flex items-center justify-center">
              <SearchButton link = { resultLink } type="redirect" />
            </div>
          </div>
        </form>
      </div>
    );
  };

  return renderForm();
};

export default HotelsSearchForm;
