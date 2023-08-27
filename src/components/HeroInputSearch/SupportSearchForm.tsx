import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../common/capitalizeFirstLetter';
import house from "../../images/house.svg";
import { searchHelps } from '../../store/actions';
import HeroInputSearch from './HeroInputSearch';

interface SupportSearchFormProps {
  // taxonomy?: any;
  inputWrapperStyles?: string;
};
const SupportSearchForm: FC<SupportSearchFormProps> = ({inputWrapperStyles}) => {
  const supportHelp = useSelector((state: { SupportReducer: any; }) => state.SupportReducer.support);
  const searchhelps = useSelector((state: { SupportReducer: any; }) => state.SupportReducer.searchhelps);

  const [updateTaxonomy, setUpdateTaxonomy] = useState(new Date().getTime());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      searchHelps('')
    );
  }, []);
  
  // console.log({searchhelps});
  
  return (
    <div className={`rounded-t-2xl ${( supportHelp.length == 0 || supportHelp[0].tid == '58' ) && 'bg-[#3842B2] dark:bg-[#171925] opacity-[0.9] z-[30]'} w-full pb-[30px] absolute bottom-0`}  >
        <div className=''>
          {
            ( supportHelp.length == 0 || supportHelp[0].tid == '58' ) &&
            <span 
              className='w-[95%] ml-8 mt-5 md:my-[30px] justify-center items-center inline-block text-sm md:text-3xl font-light text-white '
            >
                What can we help you with today?
            </span>
          }
            <HeroInputSearch type='search' searchIn = 'support' searchStyle='mt-0'  lengthStyle={`w-[95%] hidden md:flex mx-auto ${inputWrapperStyles}`} searchIconPosition='left' data = { searchhelps } />
        </div>
    </div>
  )
}

export default SupportSearchForm;