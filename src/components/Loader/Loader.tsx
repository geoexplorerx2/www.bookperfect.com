import { stat } from 'fs';
import React, { useEffect, useState , FC } from 'react';
import C1 from '../../images/c1.svg';
import C2 from '../../images/c2.svg';
interface LoaderProps{
  data?:any;
  wrapperClassNames?: string
};

const Loader:FC<LoaderProps> = ({data, wrapperClassNames}) => {
  const isDataReady = data;
  const [active, setActive] = useState<boolean>(isDataReady);
  // let active = isDataReady; 

  let TIMEOUT = isDataReady ? 1000 : 3000;
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setActive(false)
  //   }, TIMEOUT);
  // });
  
  return (
    <>
      {/* { load ? */}
      {isDataReady ?
        <div className={`${wrapperClassNames} fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-[0.8] flex flex-col items-center justify-center`}>
          <div className='bg-[#fff] relative w-[100px] h-[100px] flex  justify-center items-center  rounded-[100px] border-2 border-[rgba(218,219,232,1)] shadow-[0px_-9px_21px_0px_rgba(110,122,252,0.13)]'>
             <div className='absolute w-full h-full p-1 z-0 animate-spin'>
               <img className='w-full h-full' src={C1} />
             </div>
             <div className='absolute flex flex-col justify-center items-center w-full h-full p-1 z-1 '>
               <div className='w-full flex justify-center'><img className='w-[20%]' src={C2} /></div>
             </div>
          </div>
        </div> : ''}

      {/* :
     <></>
    } */}
    </>
  )
};

export default Loader;