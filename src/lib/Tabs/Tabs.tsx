import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { TranslateIfExists } from '../../helpers';
import { PACKAGECOLOR } from '../../store/actions'
import { changeIcon } from '../../store/actions/changIcon';
import TYPES from "../../types/store";
import { TabsDesignerAction } from '../../store/actions/TabsDesignerAction';


export const Tabs = ({ tab, onTabClick }: any) => {
  const dispatch = useDispatch();

  const [hover, setHover] = useState<any>();

  const tabActivator = () => {
    dispatch({ 
      type: PACKAGECOLOR, 
      payload: [{ status: tab.name, }] 
    });

    // handle tab click
    onTabClick(tab);
  };

  const iconHover = (param: any) => {
    dispatch(changeIcon(param))
    setHover(param);
  }

  const activeColor = useSelector((state: any) => state.packageColorActiveReducer);
  // console.log('activeColor.status',activeColor[0].status)
  
  const hoveredTabID = useSelector((state: any) => state.ChangeIcon);
  // console.log('hoveredTabID:::', hoveredTabID)
  // console.log('tab', tab);

  const clickedTabID = useSelector((state: any) => state.packageColorActiveReducer);
  // console.log('clickedTabID:::', clickedTabID);

  return (
    <a
      className={`!hover:!text-yellow-400 whitespace-nowrap cursor-pointer flex w-[100%] justify-center items-center py-4 px-4 border-b-2  font-medium text-[14px] border-transparent text-gray-500 hover:text-gray-700 ${tab.status ? 'border-b-[#F75847]' : ''}`}
      onClick={() => tabActivator()}
    >
      <div className='dark:hover:text-[#fff] hover:text-[#F75847] ' style={{ width: '100%', textAlign: 'center' }} onMouseEnter={() => iconHover(tab.name)} onMouseLeave={() => iconHover(null)}>
        <div className={`flex justify-center my-3`}>{tab.icon}</div>
        <div className={`my-3 ${tab.name === activeColor[0].status ? '!text-[#F75847]' : `text-[#9CA3AF]`}`}>
          {/* {TranslateIfExists(`TRIP_IDEAS.${tab.name}`)} */}
          {tab.name}
        </div>
      </div>
    </a>
  )
};