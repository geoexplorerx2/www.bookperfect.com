import React, { useEffect, useMemo, useState } from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom'
import HeroInputSearch from '../HeroInputSearch/HeroInputSearch';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { searchDestination } from '../../store/actions';

import americamap from '../../images/americamap.svg';
import asiamap from '../../images/asiamap.svg';
import europemap from '../../images/europemap.svg';
import africamap from '../../images/africamap.svg';
import southamericamap from '../../images/southamericamap.svg';
import austriliamap from '../../images/austriliamap.svg';
import antarticamap from '../../images/antarticamap.svg';

const CharacteristicsWrapper = styled.div`

  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #FFF9F9;
  // margin-bottom:3px;
  margin-top: -30px
`;

const CharacteristicsWrapperFlexible = styled.div`
  width: 57px;
  height: 42px;
  margin-left: 10px;

  /* body2/regular */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  color: #D88E59;
`;
// history.location.pathname == '/flights'
{/* <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.84961 11.3503L5.73285 10.1795C6.14288 10.9956 6.76372 11.9067 7.60256 12.9251C8.76014 14.3304 9.9017 15.4048 9.94975 15.4498L10.5585 16.0207L11.1672 15.4498C11.2153 15.4048 12.3568 14.3304 13.5144 12.9251C14.3948 11.8562 15.0334 10.9063 15.4417 10.0597L18.3448 11.3503L24.3881 7.59322V20.743L18.3448 24.5L9.89307 20.743L3.84961 24.5V11.3503ZM6.02035 8.03814C6.02035 5.53175 8.05219 3.5 10.5585 3.5C13.0648 3.5 15.0966 5.53175 15.0966 8.03814C15.0966 10.5445 10.5585 14.8008 10.5585 14.8008C10.5585 14.8008 6.02035 10.5444 6.02035 8.03814ZM10.5585 9.95127C11.6642 9.95127 12.5606 9.05486 12.5606 7.94915C12.5606 6.84345 11.6642 5.94703 10.5585 5.94703C9.45278 5.94703 8.55637 6.84345 8.55637 7.94915C8.55637 9.05486 9.45278 9.95127 10.5585 9.95127Z" fill="#BDC3FF" />
</svg> */}
const TaxonomySearch = () => {
  const searchdestination = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.searchdestination);
  const dispatch = useDispatch();

  const [hover, setHover] = useState<any>(false);
  const [id, setId] = useState<any>();
  const handleMouseEnter = (data: any) => {
    setHover(true);
    setId(data);
  };
  
  const handleMouseLeave = (data: any) => {
    setHover(false);
    setId(data);
  };

    // get continent data
    useEffect(() => {
      dispatch(
        searchDestination('')
      ); 
    }, []);
  
    const CONTINENT_DATA = useMemo(() => {
  
      searchdestination &&
      searchdestination.length && 
      searchdestination?.forEach((continent: any) => {
  
     
        if(!continent.hasOwnProperty('map')) {
          
         if(continent.continent_name.toLowerCase() == 'europe') continent.map = europemap;
         else if(continent.continent_name.toLowerCase() == 'asia') continent.map = asiamap;
         else if(continent.continent_name.toLowerCase() == 'north america') continent.map = americamap;
         else if(continent.continent_name.toLowerCase() == 'africa') continent.map = africamap;
         else if(continent.continent_name.toLowerCase() == 'south america') continent.map = southamericamap;
         else if(continent.continent_name.toLowerCase() == 'australia') continent.map = austriliamap;
         else if(continent.continent_name.toLowerCase() == 'antarctica') continent.map = antarticamap;
         else {
           // continent.map = europemap;
         }
     
        }
       });
  
      return searchdestination;
      
    }, [searchdestination]);
  
  return (
    <div className='w-[100%] md:bg-[#FFF9F9] dark:bg-[#17192500]'>
      <div className="w-full px-5 md:px-[9.9vw] py-[2vw]">
        <HeroInputSearch type = "search" data = { CONTINENT_DATA } searchStyle='mt-0' lengthStyle='' />
      </div>
      {/* new section in travel guide ( check description ) */}
      {/* <div className={`w-[100%] min-h-[350px] dark:bg-neutral-800 bg-white  px-[10vw] py-4`}>
        <div className={`w-[100%]`}>
          <div className={`text-xl text-[#000] dark:text-[#fff]`}>Anything embarrassing hidden in the middle</div>
          <div className={`w-[100%] text-sm text-[#000] dark:text-[#fff] py-3`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non nisi est sit amet facilisis. Condimentum lacinia quis vel eros. Id neque aliquam vestibulum</div>
        </div>
        <div className={`flex justify-between py-3 h-[100%]`}>
          <div onMouseEnter={() => handleMouseEnter('tripdesigner')}
            onMouseLeave={() => handleMouseLeave('')}
            className={`hoverstyle overflow-hidden flex-1 mr-2 rounded-[1.5vw] w-[100%] h-[320px] ${hover && id == 'tripdesigner' ? 'bg-[#3F76F7]' : 'bg-[#fff]'}`}>
            <Link to="/">
              <div className='p-2 h-[100%]  overflow-hiddenv relative'>
                <div className='w-[60%] py-2 flex justify-center'>
                  <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.84961 11.3503L5.73285 10.1795C6.14288 10.9956 6.76372 11.9067 7.60256 12.9251C8.76014 14.3304 9.9017 15.4048 9.94975 15.4498L10.5585 16.0207L11.1672 15.4498C11.2153 15.4048 12.3568 14.3304 13.5144 12.9251C14.3948 11.8562 15.0334 10.9063 15.4417 10.0597L18.3448 11.3503L24.3881 7.59322V20.743L18.3448 24.5L9.89307 20.743L3.84961 24.5V11.3503ZM6.02035 8.03814C6.02035 5.53175 8.05219 3.5 10.5585 3.5C13.0648 3.5 15.0966 5.53175 15.0966 8.03814C15.0966 10.5445 10.5585 14.8008 10.5585 14.8008C10.5585 14.8008 6.02035 10.5444 6.02035 8.03814ZM10.5585 9.95127C11.6642 9.95127 12.5606 9.05486 12.5606 7.94915C12.5606 6.84345 11.6642 5.94703 10.5585 5.94703C9.45278 5.94703 8.55637 6.84345 8.55637 7.94915C8.55637 9.05486 9.45278 9.95127 10.5585 9.95127Z" fill={`${hover && id == 'tripdesigner' ? '#fff' : 'blue'}`} />
                  </svg>
                </div>
                <div className='w-[100%] h-[25%] relative'>
                  <div className='w-[100%] h-[70%] absolute bottom-0'>
                    <span className={`${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[blue]'} text-[1.1em]`}>Trip Designer</span>
                  </div>
                </div>
                <div className='w-[100%] h-[45%] relative'>
                  <div className={`w-[100%] px-1 text-[1em] text-justify ${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[#000]'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                  </div>
                  <div className='absolute bottom-2 right-3'><i className={`${hover && id == 'tripdesigner' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i></div>
                </div>
                <div className='absolute top-[-10vh] right-[-5vw] w-[206px] h-[206px] bg-[#fff] opacity-25 rounded-full'></div>
              </div>
            </Link>
          </div>

          ///

          <div onMouseEnter={() => handleMouseEnter('Activities')}
            onMouseLeave={() => handleMouseLeave('')}
            className={`hoverstyle overflow-hidden flex-1 mr-2 rounded-[1.5vw] w-[100%] h-[320px] ${hover && id == 'Activities' ? 'bg-[#3F76F7]' : 'bg-[#fff]'}`}>
            <Link to="/activities">
              <div className='p-2 h-[100%]  overflow-hiddenv relative'>
                <div className='w-[60%] py-2 flex justify-center'>
                  <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.912 3.5C10.2877 3.5 7.34961 6.22537 7.34961 9.58723C7.34961 9.65427 7.35227 9.72243 7.3574 9.79157C7.65546 9.44901 8.04587 9.1814 8.62051 9.1814C9.57647 9.1814 10.0229 9.92159 10.3817 10.5165L10.3819 10.5168C10.7337 11.1002 10.9356 11.375 11.2661 11.375C11.5966 11.375 11.7985 11.1002 12.1502 10.5168L12.1503 10.5166C12.5091 9.92172 12.9556 9.1814 13.9116 9.1814C14.8676 9.1814 15.3141 9.92167 15.673 10.5166L15.6731 10.5168C16.0248 11.1002 16.2269 11.375 16.5573 11.375C16.8878 11.375 17.0897 11.1002 17.4415 10.5168L17.4416 10.5166C17.8004 9.92171 18.2469 9.1814 19.2029 9.1814C19.778 9.1814 20.1686 9.44935 20.4668 9.79224C20.4719 9.72282 20.4746 9.65447 20.4746 9.58723C20.4746 6.22537 17.5364 3.5 13.912 3.5ZM19.4772 10.0625C19.1296 10.0625 18.9172 10.429 18.5472 11.2068C18.1699 12.0001 17.7002 12.9873 16.6945 12.9873C15.6888 12.9873 15.2191 12.0001 14.8417 11.2068C14.4718 10.429 14.2593 10.0625 13.9117 10.0625C13.564 10.0625 13.3517 10.429 12.9817 11.2068L12.9816 11.2071C12.6042 12.0003 12.1346 12.9873 11.129 12.9873C10.1234 12.9873 9.65376 12.0002 9.27637 11.2069L9.27632 11.2068C8.9063 10.429 8.69393 10.0625 8.34634 10.0625C7.99874 10.0625 7.78626 10.429 7.41624 11.2068L7.34961 11.3465C7.97027 13.4083 9.34638 15.861 10.679 18.2363L10.679 18.2363C11.1221 19.026 11.5604 19.8071 11.9645 20.5625H15.8599C16.2639 19.8073 16.7021 19.0263 17.1451 18.2367L17.1451 18.2367C18.4777 15.8617 19.8538 13.4091 20.4746 11.3472C20.4519 11.3 20.4295 11.253 20.4076 11.2068C20.0374 10.429 19.825 10.0625 19.4772 10.0625ZM11.2871 23.8811V21.875H16.5371V23.8811C16.5371 24.2224 16.1413 24.5 15.6549 24.5H12.1694C11.6829 24.5 11.2871 24.2224 11.2871 23.8811Z" fill={`${hover && id == 'Activities' ? '#fff' : 'blue'}`}></path>
                  </svg>
                </div>
                <div className='w-[100%] h-[25%] relative'>
                  <div className='w-[100%] h-[70%] absolute bottom-0'>
                    <span className={`${hover && id == 'Activities' ? 'text-[#fff]' : 'text-[blue]'} text-[1.1em]`}>Activities</span>
                  </div>
                </div>
                <div className='w-[100%] h-[45%] relative'>
                  <div className={`w-[100%] px-1 text-md text-justify ${hover && id == 'Activities' ? 'text-[#fff]' : 'text-[#000]'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                  </div>
                  <div className='absolute bottom-2 right-3'><i className={`${hover && id == 'Activities' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i></div>
                </div>
                <div className='absolute top-[-10vh] right-[-5vw] w-[206px] h-[206px] bg-[#fff] opacity-25 rounded-full'></div>
              </div>
            </Link>
          </div>
          <div onMouseEnter={() => handleMouseEnter('Packages')}
            onMouseLeave={() => handleMouseLeave('')}
            className={`hoverstyle overflow-hidden flex-1 mr-2 rounded-[1.5vw] w-[100%] h-[320px] ${hover && id == 'Packages' ? 'bg-[#3F76F7]' : 'bg-[#fff]'}`}>
            <Link to="/packages">
              <div className='p-2 h-[100%]  overflow-hiddenv relative'>
                <div className='w-[60%] py-2 flex justify-center'>
                  <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6116 5.98868C10.8987 5.98868 10.3186 6.55125 10.3186 7.24268L10.3186 8.4652H9.19605V7.24268C9.19605 5.95098 10.2797 4.90039 11.6115 4.90039H16.3917C17.7237 4.90039 18.8071 5.95098 18.8071 7.24268V8.4652H17.6848V7.24268C17.6848 6.55121 17.1047 5.98868 16.3917 5.98868H11.6116ZM23.5455 9.39107H4.45454C3.92741 9.39107 3.5 9.8055 3.5 10.3167V13.4127L12.3295 15.3576V14.4674C12.3295 14.212 12.5433 14.0046 12.8068 14.0046H15.1932C15.4569 14.0046 15.6704 14.212 15.6704 14.4674V15.3588L24.5 13.4203V10.3167C24.5 9.8055 24.0726 9.39107 23.5455 9.39107ZM15.6705 18.1699C15.6705 18.4253 15.4569 18.6327 15.1932 18.6327H12.8068C12.5434 18.6327 12.3296 18.4253 12.3296 18.1699V16.544L3.5 14.5988V22.3498C3.5 22.861 3.92741 23.2754 4.45454 23.2754H23.5455C24.0726 23.2754 24.5 22.8609 24.5 22.3498V14.6067L15.6705 16.5452V18.1699Z" fill={`${hover && id == 'Packages' ? '#fff' : 'blue'}`}></path>
                  </svg>
                </div>
                <div className='w-[100%] h-[25%] relative'>
                  <div className='w-[100%] h-[70%] absolute bottom-0'>
                    <span className={`${hover && id == 'Packages' ? 'text-[#fff]' : 'text-[blue]'} text-[1.1em]`}>Packages</span>
                  </div>
                </div>
                <div className='w-[100%] h-[45%] relative'>
                  <div className={`w-[100%] px-1 text-md text-justify ${hover && id == 'Packages' ? 'text-[#fff]' : 'text-[#000]'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                  </div>
                  <div className='absolute bottom-2 right-3'><i className={`${hover && id == 'Packages' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i></div>
                </div>
                <div className='absolute top-[-10vh] right-[-5vw] w-[206px] h-[206px] bg-[#fff] opacity-25 rounded-full'></div>
              </div>
            </Link>
          </div>
          <div onMouseEnter={() => handleMouseEnter('Transfer')}
            onMouseLeave={() => handleMouseLeave('')}
            className={`hoverstyle overflow-hidden flex-1 mr-2 rounded-[1.5vw] w-[100%] h-[320px] ${hover && id=='Transfer' ? 'bg-[#3F76F7]' : 'bg-[#fff]'}`}>
            <Link to="/transfers">
              <div className='p-2 h-[100%]  overflow-hiddenv relative'>
                <div className='w-[60%] py-2 flex justify-center'>
                  <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.4231 12.0309H23.1253L19.817 6.06855C19.6743 5.81077 19.3146 5.59961 19.0185 5.59961H8.98154C8.68538 5.59961 8.32569 5.81077 8.183 6.06855L4.87415 12.0309H4.57692C3.98462 12.0309 3.5 12.5132 3.5 13.1027V18.4621C3.5 19.0516 3.98462 19.534 4.57692 19.534H5.65385V21.1418C5.65385 22.0261 6.38077 22.7496 7.26923 22.7496H7.80769C8.69615 22.7496 9.42308 22.0261 9.42308 21.1418V19.534H18.5769V21.1418C18.5769 22.0261 19.3038 22.7496 20.1923 22.7496H20.7308C21.6192 22.7496 22.3462 22.0261 22.3462 21.1418V19.534H23.4231C24.0154 19.534 24.5 19.0516 24.5 18.4621V13.1027C24.5 12.5132 24.0154 12.0309 23.4231 12.0309ZM6.46154 16.3184C5.71792 16.3184 5.11538 15.7186 5.11538 14.9785C5.11538 14.2384 5.71792 13.6387 6.46154 13.6387C7.20515 13.6387 7.80769 14.2384 7.80769 14.9785C7.80769 15.7186 7.20515 16.3184 6.46154 16.3184ZM7.53846 12.0309L9.72085 7.68709C9.85331 7.42287 10.2038 7.20742 10.5 7.20742H17.5C17.7962 7.20742 18.1467 7.42287 18.2792 7.68709L20.4615 12.0309H7.53846ZM21.5385 16.3184C20.7948 16.3184 20.1923 15.7186 20.1923 14.9785C20.1923 14.2384 20.7948 13.6387 21.5385 13.6387C22.2821 13.6387 22.8846 14.2384 22.8846 14.9785C22.8846 15.7186 22.2821 16.3184 21.5385 16.3184Z" fill={`${hover && id == 'Transfer' ? '#fff' : 'blue'}`}></path>
                  </svg>
                </div>
                <div className='w-[100%] h-[25%] relative'>
                  <div className='w-[100%] h-[70%] absolute bottom-0'>
                    <span className={`${hover && id=='Transfer' ? 'text-[#fff]' : 'text-[blue]'} text-[1.1em]`}>Transfer</span>
                  </div>
                </div>
                <div className='w-[100%] h-[45%] relative'>
                  <div className={`w-[100%] px-1 text-md text-justify ${hover && id=='Transfer' ? 'text-[#fff]' : 'text-[#000]'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                  </div>
                  <div className='absolute bottom-2 right-3'><i className={`${hover && id=='Transfer' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i></div>
                </div>
                <div className='absolute top-[-10vh] right-[-5vw] w-[206px] h-[206px] bg-[#fff] opacity-25 rounded-full'></div>
              </div>
            </Link>
          </div>
          <div onMouseEnter={() => handleMouseEnter('Routing')}
            onMouseLeave={() => handleMouseLeave('')}
            className={`hoverstyle overflow-hidden flex-1 mr-2 rounded-[1.5vw] w-[100%] h-[320px] ${hover  && id=='Routing'  ? 'bg-[#3F76F7]' : 'bg-[#fff]'}`}>
            <Link to="/routing">
              <div className='p-2 h-[100%]  overflow-hiddenv relative'>
                <div className='w-[60%] py-2 flex justify-center'>
                  <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.3034 13.0013L20.9283 16.7706C20.8577 16.8473 20.7722 16.9086 20.6771 16.9508C20.5819 16.9929 20.4792 17.015 20.3752 17.0156H14.0001V23.0464C14.0001 23.2463 13.9211 23.438 13.7804 23.5794C13.6398 23.7208 13.449 23.8002 13.2501 23.8002C13.0512 23.8002 12.8604 23.7208 12.7198 23.5794C12.5791 23.438 12.5001 23.2463 12.5001 23.0464V17.0156H5.00002C4.60219 17.0156 4.22065 16.8567 3.93934 16.574C3.65804 16.2912 3.5 15.9078 3.5 15.5079V9.47712C3.5 9.07725 3.65804 8.69377 3.93934 8.41102C4.22065 8.12827 4.60219 7.96943 5.00002 7.96943H12.5001V4.95404C12.5001 4.75411 12.5791 4.56237 12.7198 4.42099C12.8604 4.27962 13.0512 4.2002 13.2501 4.2002C13.449 4.2002 13.6398 4.27962 13.7804 4.42099C13.9211 4.56237 14.0001 4.75411 14.0001 4.95404V7.96943H20.3752C20.4792 7.97003 20.5819 7.99208 20.6771 8.03423C20.7722 8.07637 20.8577 8.1377 20.9283 8.21443L24.3034 11.9837C24.4299 12.1226 24.5 12.3042 24.5 12.4925C24.5 12.6809 24.4299 12.8624 24.3034 13.0013Z" fill={`${hover && id == 'Routing' ? '#fff' : 'blue'}`}></path>
                  </svg>
                </div>
                <div className='w-[100%] h-[25%] relative'>
                  <div className='w-[100%] h-[70%] absolute bottom-0'>
                    <span className={`${hover && id=='Routing' ? 'text-[#fff]' : 'text-[blue]'} text-[1.1em]`}>Routing</span>
                  </div>
                </div>
                <div className='w-[100%] h-[45%] relative'>
                  <div className={`w-[100%] px-1 text-md text-justify ${hover && id=='Routing' ? 'text-[#fff]' : 'text-[#000]'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                  </div>
                  <div className='absolute bottom-2 right-3'><i className={`${hover && id=='Routing' ? 'text-[#fff]' : 'text-[#000]'} fa fa-arrow-right`} aria-hidden="true"></i></div>
                </div>
                <div className='absolute top-[-10vh] right-[-5vw] w-[206px] h-[206px] bg-[#fff] opacity-25 rounded-full'></div>
              </div>
            </Link>
          </div>
        </div>
      </div> */}
      {/* new section in travel guide ( check description ) */}
    </div>
  )
}

export default TaxonomySearch;