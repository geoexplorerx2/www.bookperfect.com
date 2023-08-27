import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import ResultListingsHeader from './ResultListingsHeader';
import OrderBy from './OrderBy';
import HeroHead from '../../components/HeroHeader/HeroHead';import ResultCard from '../../components/StayCard/ResultCard';
import { StayDataType } from '../../data/types';
import { DEMO_STAY_LISTINGS } from '../../data/listings';
import Pagination from '../../lib/Pagination/Pagination';
import Accordion from '../../lib/Accordion/Accordion';
;




const DriverClassWrapper = styled.div`
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    `;

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 2);

const SearchHotelsResults = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    };

  return (
    <div>
      <HeroHead
         headType = 'result'
         className='hero-head-search-hotels'
         searchCard = "hotels"
         headText = "Hotels" 
         subText = "Incredible value deals and inspiring travel articles, for you to plan, discover and dream." 
        />

        <div className=" flex space-x-6" style={{marginTop: '20px', marginLeft: '195px', width: '1050px'}}>
            <div className="basis-1/4 w-8">
                {/* maps */}
                <div className='w-full h-52 border border-[#3842B2] rounded-xl'>
                    
                </div> 

                {/* property name */}
                <div className='mt-3'>
                  <span className='' style={{fontFamily: 'Poppins'}}>Property Name</span>
                  <input 
                     type="search" 
                     className="block p-4 py-3 pl-10 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                     placeholder="Contrary to popular belief"
                    />
                </div>

                <div className='mt-3'>
                   <Accordion />
                </div>

                


                {/* <div className="accordion" id="accordionExample5">
  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingOne5">
      <button className="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne5" aria-expanded="true"
        aria-controls="collapseOne5">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne5" className="accordion-collapse collapse show" aria-labelledby="headingOne5">
      <div className="accordion-body py-4 px-5">
          accordion
        {/* <strong>This is the first item's accordion body.</strong> It is shown by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. These classes control the overall appearance, as well as the showing and
        hiding via CSS transitions. You can modify any of this with custom CSS or overriding
        our default variables. It's also worth noting that just about any HTML can go within
        the <code>.accordion-body</code>, though the transition does limit overflow. */}
      {/* </div>
    </div>
  </div>
  </div> */}
                {/* popular filter */}
                {/* <div className='mt-3'>
                    <OrderBy styles = "px-8 py-3 rounded-full bg-[#F4F8FF]" spanText = "" type = "popular" typeSize='text-sm' />
                </div>

                <div className='flex space-x-3'>
                    <div className="relative px-2 py-3 flex flex-col md:flex-row flex-grow [ nc-divide-field ] ">
                        <div className="block">
                           <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                            <span className="ml-2 text-sm">
                                <DriverClassWrapper>
                                   Free cancelation
                                </DriverClassWrapper>
                            </span>
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className='flex-col  md:flex-row flex-grow mt-4'>
                        <span className='text-xs font-normal'>(1690)</span>
                    </div>
                </div>

                <div className='mt-3'>
                    <OrderBy styles = "px-8 py-3 rounded-full bg-[#F4F8FF]" spanText = "" type = "prices" typeSize='text-sm' />
                </div>

                <div>
                    <div className="relative flex flex-col px-5 py-6 space-y-8">
                        <div className="space-y-5">
                
                            <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 to 295 per night</label>
                            <input id="minmax-range" type="range" min="0" max="1000" value="295" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        </div>
                    </div>
                </div>


                <div>

                           <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                            <span className="ml-2 text-sm">
                                <DriverClassWrapper>
                                   Less than 75
                                </DriverClassWrapper>
                            </span>
                            </label>
                        </div>


                        <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                            <span className="ml-2 text-sm">
                                <DriverClassWrapper>
                                   75 to 125
                                </DriverClassWrapper>
                            </span>
                            </label>
                        </div>


                        <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                                <span className="ml-2 text-sm">
                                    <DriverClassWrapper>
                                    125 to 200
                                    </DriverClassWrapper>
                                </span>
                            </label>
                        </div>
         

                       <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                                <span className="ml-2 text-sm">
                                    <DriverClassWrapper>
                                    200 to 300
                                    </DriverClassWrapper>
                                </span>
                            </label>
                        </div>

                    <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                                <span className="ml-2 text-sm">
                                    <DriverClassWrapper>
                                    Greater than 300
                                    </DriverClassWrapper>
                                </span>
                            </label>
                        </div>
                        
                </div>

                <div className='mt-3'>
                    <OrderBy styles = "px-8 py-3 rounded-full bg-[#F4F8FF]" spanText = "" type = "distance" typeSize='text-xs' />
                </div>

                <div>
                    <div className="relative flex flex-col px-5 py-6 space-y-8">
                        <div className="space-y-5">
                            <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">24.00 km</label>
                            <input id="minmax-range" type="range" min="0" max="1000" value="295" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        </div>
                    </div>
                </div>

                <div className='mt-3'>
                    <OrderBy styles = "px-8 py-3 rounded-full bg-[#F4F8FF]" spanText = "" type = "category" typeSize='text-sm' />
                </div>

                <div className='mt-4'>
        
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                            <span className="ml-2 text-sm">
                                <DriverClassWrapper>
                                   5 Stars
                                </DriverClassWrapper>
                            </span>
                            </label>
                        </div>
           
            

             
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                            <span className="ml-2 text-sm">
                                <DriverClassWrapper>
                                  4 Stars
                                </DriverClassWrapper>
                            </span>
                            </label>
                        </div>
    
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                                <span className="ml-2 text-sm">
                                    <DriverClassWrapper>
                                      3 Stars
                                    </DriverClassWrapper>
                                </span>
                            </label>
                        </div>

                       <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                                <span className="ml-2 text-sm">
                                    <DriverClassWrapper>
                                      2 Stars
                                    </DriverClassWrapper>
                                </span>
                            </label>
                        </div>

                       <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                                <span className="ml-2 text-sm">
                                    <DriverClassWrapper>
                                      1 Stars
                                    </DriverClassWrapper>
                                </span>
                            </label>
                        </div>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                            <input type="checkbox" className="w-4 h-4 rounded"  />
                                <span className="ml-2 text-sm">
                                    <DriverClassWrapper>
                                      Unrated
                                    </DriverClassWrapper>
                                </span>
                            </label>
                        </div>
                        
                </div> */}

            </div>

            <div className="flex-auto">
                <div>
                    <ResultListingsHeader 
                      subHeading="Amongs 1711"
                      heading="Select your accomodation in Paris"
                    />
                </div>

                <div className="w-full">
                    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px">
                            <li className="mr-28">
                                <a href="#" className="inline-flex space-x-2 p-2 text-[#F75847] rounded-t-lg border-b-2 border-[#F75847] dark:text-[#F75847] dark:border-[#F75847]">
                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.75 4.8125H19.25V16.5C19.25 16.6823 19.1776 16.8572 19.0486 16.9861C18.9197 17.1151 18.7448 17.1875 18.5625 17.1875H3.4375C3.25516 17.1875 3.0803 17.1151 2.95136 16.9861C2.82243 16.8572 2.75 16.6823 2.75 16.5V4.8125Z" stroke="#F75847" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.75 8.9375H19.25" stroke="#F75847" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.75 13.0625H19.25" stroke="#F75847" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7.5625 8.9375V17.1875" stroke="#F75847" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                   </svg>
                                   <span> Extended </span>
                                </a>
                            </li>

                            <li className="mr-28">
                                <a href="#" className="inline-flex space-x-2 p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.625 4.125H4.125V9.625H9.625V4.125Z" stroke="black" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.875 4.125H12.375V9.625H17.875V4.125Z" stroke="black" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9.625 12.375H4.125V17.875H9.625V12.375Z" stroke="black" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.875 12.375H12.375V17.875H17.875V12.375Z" stroke="black" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Compact</span>
                                </a>
                            </li>

                            <li className="mr-28">
                                <a href="#" className="inline-flex space-x-2 p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 11.6875C12.5188 11.6875 13.75 10.4563 13.75 8.9375C13.75 7.41872 12.5188 6.1875 11 6.1875C9.48122 6.1875 8.25 7.41872 8.25 8.9375C8.25 10.4563 9.48122 11.6875 11 11.6875Z" stroke="black" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M17.875 8.9375C17.875 15.125 11 19.9375 11 19.9375C11 19.9375 4.125 15.125 4.125 8.9375C4.125 7.11414 4.84933 5.36545 6.13864 4.07614C7.42795 2.78683 9.17664 2.0625 11 2.0625C12.8234 2.0625 14.572 2.78683 15.8614 4.07614C17.1507 5.36545 17.875 7.11414 17.875 8.9375V8.9375Z" stroke="black" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                 <span>Location</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* tabs ccontent */}
                    <div id="panels">
                         <div className="panel-1 tab-content active py-5">
                           <div className="">
                                {
                                  DEMO_DATA.map((hotel) => (
                                       <ResultCard key={hotel.id} data={hotel} />
                                  ))
                                }
                            </div>
                            <div className="flex mt-16 justify-center items-center">
                                <Pagination />
                            </div>
                        </div>
                        <div className="panel-2 tab-content py-5">
                            {/* Compact */}
                        </div>
                        <div className="panel-3 tab-content py-5">
                            {/* Location */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default SearchHotelsResults;