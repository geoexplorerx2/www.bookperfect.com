import React, { FC, useEffect, useState } from 'react';
import styled from "styled-components";
import {ReactComponent as FlightInGoodHealth} from "../../images/icons/FlightInGoodHealth.svg";
import {ReactComponent as DoorKnob} from "../../images/icons/DoorKnob.svg";
import {ReactComponent as Globe} from "../../images/icons/Globe.svg";
import {ReactComponent as Camera} from "../../images/icons/Camera.svg";
import { useSelector } from 'react-redux';
import { Id } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';



const CharacteristicsWrapper = styled.div`
  padding-top: ${(props: any) => props.paddingTop ? `${props.paddingTop}px` : '3.5vw' } };
  padding-bottom: 2vw;
  background-color: ${ (props: any) =>
     props.mode == 'dark'?'#171925':'#FFF9F9'
  };
  
  display:flex;
  justify-content:center;
  // margin-bottom:3px;

`;
const CharacteristicsWrapperFlight = styled.div`
  // position: absolute;
  width: 86px;
  height: 42px;
  // left: 400px;
  // top: 540px;
  margin-left: 10px;

  /* body2/regular */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

color: #C45771;
  // background: #FFF9F9;
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

const CharacteristicsWrapperEntryRests = styled.div`
  width: 119px;
  height: 42px;
  // left: 992px;
  // top: 540px;
  margin-left: 10px;

  /* body2/regular */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  color: #419881;
`;

const CharacteristicsWrapperTrusted = styled.div`
width: 86px;
height: 42px;
// left: 1304px;
// top: 540px;
margin-left: 10px;

/* body2/regular */

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 21px;

color: #118AB2;


`;
// style={{borderRight:'.1vw solid rgba(247, 88, 71,0.3)',borderLeft:'.1vw solid rgba(247, 88, 71,0.3)'}}
interface CharacteristicsType {
  topPadding?: number | null
  innerWrapperClassNames?: string
}

const Characteristics: FC<CharacteristicsType> = (props) => {

  const {innerWrapperClassNames} = props

  const LayoutReducer = useSelector((state: any) => state.LayoutReducer.status);
  const selector = useSelector((state: any) => state.LightMode)
  const multiStop = useSelector((state: any) => state.MultiStopReducer);
  const locationID = useSelector((state: any) => state.LocationIdReducer);
  const hotelsSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.hotelsFormHeight)
  const TransfersSearchFormActiveRadio = useSelector((state: any) => state.DynamicStyles)
  const flightSearchFormHeight = useSelector((state: any) => state.DynamicStyles.flightsFormHeight)
  // @ts-ignore
  const {t} = useTranslation()

  let isHotlesPage = window.location.pathname == '/hotels'
  let istransfersPage = window.location.pathname == '/transfers'
  let isFlightsPage = window.location.pathname == '/flights'

  let selectedHeight = isHotlesPage ? hotelsSearchFormHeight : istransfersPage ? TransfersSearchFormActiveRadio.transferActiveTab : isFlightsPage ? flightSearchFormHeight : 'none selected'

    // calculate the padding when the height of hotelsSearchForm's height changes
  const [CharacteristicsPadding, setCharacteristicsPadding] = useState(Math.ceil(selectedHeight - 90))

  const [isHotelsPage, setIsHotelsPage ] = useState(window.location.pathname == '/hotels')


  useEffect(()=>{
      
    if(!isHotelsPage){
      setCharacteristicsPadding(0)
    }
    
    if(isHotelsPage){

      setCharacteristicsPadding(Math.ceil(hotelsSearchFormHeight - 120))
    }

   if(istransfersPage){

    if(TransfersSearchFormActiveRadio.transferActiveTab == 'roundTrip'){
      setCharacteristicsPadding(50)
    }
    if(TransfersSearchFormActiveRadio.transferActiveTab == 'oneWay'){
      setCharacteristicsPadding(0)
    }

   }else if(isFlightsPage){
      setCharacteristicsPadding(Math.ceil(flightSearchFormHeight - 110 > 0 ? flightSearchFormHeight - 110 : 0))
   }


  },[hotelsSearchFormHeight, isHotelsPage, TransfersSearchFormActiveRadio, flightSearchFormHeight])

  useEffect(()=>{
    setIsHotelsPage(window.location.pathname == '/hotels')
  },[window.location.pathname])


  var borderLeft='.1vw solid rgba(247, 88, 71,0.3)';
  // console.log(multiStop.status)
  // console.log(locationID.status)
  if(multiStop.status!=='Empty' && locationID.status!=="From"){borderLeft='.1vw solid rgba(247, 88, 71,0.3)';}
  
  //  ${LayoutReducer=='roundTrip'?'hidden':''}
  return (
    <div className={`pb-[2vw] md:pb-0 dark:bg-[#171925] hidden md:block ${LayoutReducer=='roundTrip'?'mt-1  ':''}`}>
     <CharacteristicsWrapper mode ={selector.mode} padding={''}>
        <div className  ={`w-full xl:w-4/5 px-2 lg:px-11 xl:px-0 z-[9] mb-0  mt-2 grid grid-cols-4 ${innerWrapperClassNames}`} style={{paddingTop : `${CharacteristicsPadding}px`}}>
          
          <div className={`flex justify-center  items-center border-l border-r border-[#FE9878] dark:border-white `} >
            <FlightInGoodHealth className='text-[#EE8DA4] dark:text-white'/>
            <CharacteristicsWrapperFlight>
             <span className='dark:text-white'>{t('CHARACTERISTICS.FLIGHT_IN_GOOD_HEALTH')}</span>
            </CharacteristicsWrapperFlight>
          </div>
          <div className={`flex 2xl:pl-[4vw] justify-center  items-center border-r border-[#FE9878] dark:border-white  `}>
            <DoorKnob className='text-[#FEB078] dark:text-white'/>
            <CharacteristicsWrapperFlexible>
             <span className='text-[#FEB078] dark:text-white'>{t('CHARACTERISTICS.FLEXIBLE_BOOKING')}</span>
            </CharacteristicsWrapperFlexible>
          </div>
          <div className={`p-0.5 inline-flex  justify-center items-center border-r border-[#FE9878] dark:border-white `}>
            <Globe className='text-[#3FC6A2] dark:text-white' />
            <CharacteristicsWrapperEntryRests>
             <span className='text-[#3FC6A2] dark:text-white'>{t('CHARACTERISTICS.ENTRY_RESTRICTIONS_BY_COUNTRY')}</span>
            </CharacteristicsWrapperEntryRests>
          </div>
          <div className={`p-0.5 items-center flex justify-around border-r border-[#FE9878] dark:border-white `}>
            <div className='w-[60%] flex justify-center'>
              <Camera  className='text-[#29ABD5] dark:text-white'/>
              <CharacteristicsWrapperTrusted>
              <span className='text-[#29ABD5] dark:text-white'>{t('CHARACTERISTICS.TRUSTED_BY_TRAVELLERS')}</span>
            </CharacteristicsWrapperTrusted>
            </div>
            {/* <div className="h-[100%] w-[40%]">
              <div className='h-[100%] w-[2%] border-r border-[#FE9878] dark:border-white  '></div>
            </div> */}
          </div>
          <div className="">
          </div>
        </div>
      </CharacteristicsWrapper>
    </div>
  )
}
export default Characteristics;