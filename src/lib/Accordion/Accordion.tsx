import React from 'react';
import styled from 'styled-components';

import AccordionLayout from './AccordionLayout';

const DriverClassWrapper = styled.div`
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
`;

const Accordion = () => {
  return (
    <div className='flex flex-col '>
        <AccordionLayout title="Popular Filters ">
           <div className='flex space-x-10'>
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
        </AccordionLayout>

        <AccordionLayout title="Prices Per Night">
             {/* <div className="relative flex flex-col px-5 py-6 space-y-8">
                <div className="space-y-5">
        
                    <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 to 295 per night</label>
                    <input id="minmax-range" type="range" min="0" max="1000" value="295" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                </div>
            </div> */}
            <div className="mt-2">
                <label className="inline-flex items-center">
                 <input type="checkbox" className="w-4 h-4 rounded"  />
                 <span className="ml-2 text-sm">
                    <DriverClassWrapper>
                        Less than 75
                    </DriverClassWrapper>
                 </span>
                </label>
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
        </AccordionLayout>
    </div>
  )
}

export default Accordion;