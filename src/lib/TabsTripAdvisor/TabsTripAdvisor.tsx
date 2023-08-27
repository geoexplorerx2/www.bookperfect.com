import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TranslateIfExists } from '../../helpers';
import { PACKAGECOLOR } from '../../store/actions'
import { changeIcon } from '../../store/actions/changIcon';
import { TabsDesignerAction } from '../../store/actions/TabsDesignerAction';
import TYPES from "../../types/store";

export const TabsTripAdvisor = ({ tab, onTabClick }: any) => {

    const dispatch = useDispatch();

    const [hover, setHover] = useState<any>();

    const tabName = useSelector((state: any) => state.TabsTripdesignerReducer.TabsName);
    // console.log('gggggggggggg:::',tabName);


    const tabActivator = () => {
        dispatch(TabsDesignerAction(hover));
    }

    const iconHover = (param: any) => {
        // console.log('hover::::',hover);
        dispatch(changeIcon(param))
        setHover(param);
    }
    // console.log('tab::',tab)

    return (
        <a
            className={`!hover:!text-yellow-400 whitespace-nowrap cursor-pointer flex w-[100%] justify-center items-center py-4 px-4 border-b-2  font-medium text-[14px] border-transparent text-gray-500 hover:text-gray-700 ${tab.status ? 'border-b-[#F75847]' : ''}`}
            onClick={() => tabActivator()}
        >
            {/* <div className='dark:hover:text-[#fff] ' style={{ width: '100%', textAlign: 'center' }} onMouseEnter={() => iconHover(tab.name)} onMouseLeave={() => iconHover(null)}>
                <div className={`flex justify-center my-3`}>{tab.icon}</div>
                <div className={`my-3 ${tab.name == tabName ? 'text-[#F75847]' : `text-[#9CA3AF]`}`}>{TranslateIfExists(`TRIP_IDEAS.${tab.name}`)}</div>
            </div> */}
        </a>
    )
};