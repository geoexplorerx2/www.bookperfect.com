import React, { FC } from 'react'
import { Tab } from '@headlessui/react'
import TripIdeasHeader, { TripIdeasHeaderProps } from '../TripIdeas/TripIdeasHeader';

interface CategorizedTripIdeas {
  categories: Record<string, {
    id: number;
    Component: JSX.Element;
  }>,
  headingProps: TripIdeasHeaderProps,
  onActiveTripIdeasCategoryTab?: Function;
};


const CategorizedTripIdeas: FC<CategorizedTripIdeas> = (props) => {
  const { categories, onActiveTripIdeasCategoryTab, headingProps } = props


  return (
    <div>
      <div className='pt-[6vh] pb-[1vh] mx-5 bigMd:mx-[10.1vw] px-3'>
        <div className="w-full py-16 ">
          <TripIdeasHeader {...headingProps} />
          <Tab.Group>
            <Tab.List className="relative z-10 flex rounded-xl pt-1 my-0">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  onClick={() => onActiveTripIdeasCategoryTab && onActiveTripIdeasCategoryTab(category)}
                  className={({ selected }) => (`w-full rounded-lg rounded-b-none py-2.5 text-xl font-bold leading-5  text-blue-700 focus:outline-none
                ${selected
                      ? 'bg-white text-[#3944B3] border border-[#3A1C1A] border-opacity-20 border-b-0'
                      : 'text-[#666666] border-0 border-[#3A1C1A] border-opacity-20 '}
                  `)
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2 border border-[#3A1C1A] border-opacity-20 border-b-0 -translate-y-[9px] overflow-hidden">
              {Object.values(categories).map((posts, idx) => {
                const { Component } = posts
                return (
                  <Tab.Panel
                    key={idx}
                    className={'bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    }
                  >
                    {Component}
                  </Tab.Panel>
                )
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}

export default CategorizedTripIdeas;