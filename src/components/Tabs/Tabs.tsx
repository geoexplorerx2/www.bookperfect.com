import React, { FC, useState } from 'react'

interface TabType {
    name: string,
    id?: string | number
}

interface TabsPropsType {
    tabs: TabType[]
    moreButtonFunction?: () => void,
    onTabclick?: (tab: any, idx: number) => void,
}


const Tabs: FC<TabsPropsType> = (props) => {
    const { tabs, moreButtonFunction, onTabclick } = props
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
    const handleTabClick = (tab: TabType, index:number ) => {
        setActiveTabIndex(index)
        onTabclick && onTabclick(tab, index)
    }

    return (
        <div>
            <div className='mt-3 overflow-scroll xl:overflow-hidden hiddenScrollbar'>
                <ul className='flex items-center justify-between m-0 box-border'>
                    {
                        tabs.map((tab, index) => {
                            const { name, id } = tab
                            const isActive = activeTabIndex === index
                            return (
                                <li 
                                onClick={()=> handleTabClick(tab, index) } 
                                className={`whitespace-nowrap py-2 sm:py-3 px-3  sm:px-5 cursor-pointer rounded-2xl text-[12px] 2xl:text-[14px] text-[#fff] flex justify-center items-center
                                ${isActive ? 'bg-gradient-to-br from-[#FE9A7A] to-[#FA6455] text-white' : 'text-[rgba(102,102,102,1)]'}`} >
                                {/* ${item == index ? 'py-2 sm:py-3 px-3  sm:px-5 whitespace-nowrap cursor-pointer rounded-2xl text-[12px] 2xl:text-[14px] text-[#fff] flex justify-center items-center bg-gradient-to-br from-[#FE9A7A] to-[#FA6455]' : 
                                                'text-[rgba(102,102,102,1)] dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-[16px] cursor-pointer py-3 px-5  sm:px-5 text-[12px] 2xl:text-[14px] font-medium'}`}> */}
                                  
                                  { tab.name }
                              </li>
                    )
                        })
                    }
                </ul>

            </div>
        </div>
    )
}


export default Tabs