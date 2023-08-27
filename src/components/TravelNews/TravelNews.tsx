import React, { useEffect, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import __Section_1 from './__Section_1';
import __Section_3 from './__Section_3';

const TravelNews = ({ data }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    setIsMobile((prevState) => {
      if (!prevState && windowSize.width < 768) {
        return true
      } else if (prevState && windowSize.width > 768) {
        return false
      } else {
        return prevState
      }
    });
  }, [windowSize])

  const _TRAVEL_NEW_DATA = isMobile ? data && data.filter((_data: any, i: any) => i < 2) : data;
  return (
    <div className='bg-[#F9F9F9] dark:bg-[#171925]'>
      <__Section_1 />
      <__Section_3 data={_TRAVEL_NEW_DATA} />
    </div>
  )
}

export default TravelNews
