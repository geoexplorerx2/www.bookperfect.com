import React, { useEffect, useState } from 'react'
import {ReactComponent as ScrollToTopIcon} from '../../images/icons/up-arrow.svg'
import { useDispatch , useSelector } from 'react-redux';
import ScrollToTop from '../../routers/scrollToTop';
import history from '../../store/history';
import { scrollToTopAction } from '../../store/actions';
import useWindowSize from '../../hooks/useWindowSize';

const ScrollToTopButton = () => {

    const [ showScrollToTop, setShowScrollToTop ] = useState(false);
    const [ scrollToTopState, setScrollToTopState ] = useState(false)
    const dispatch = useDispatch()
    const windowSize = useWindowSize()

    const [isMobile, setIsMobile] = useState(windowSize.width < 768 ? true : false);

  // determine if we are on the mobile
 
  useEffect(() => {
    setIsMobile((prevState) => {
      if (!prevState && windowSize.width < 768) {
        return true
      } else if (prevState && windowSize.width > 768) {
        return false
      } else {
        return prevState
      }
    })
  },
    [windowSize])

    useEffect(() => {
        // console.log('isMobile: changed : ', isMobile)
    } ,[isMobile])

    const handleScrollToTop = () => {
        setScrollToTopState(prev => !prev)
        }

    useEffect(() => {
            window.addEventListener('scroll', () => {
            if(isMobile && window.scrollY > 246 ){
                setShowScrollToTop(true);
            } else if (!isMobile && window.scrollY > 448){
                setShowScrollToTop(true);
            } else {setShowScrollToTop(false);}

                // if (window.scrollY > 700) {
                //     setShowScrollToTop(true);
                // } else {
                //     setShowScrollToTop(false);
                // }
            });
        }, [isMobile]);

    useEffect(() => {
        dispatch(
            scrollToTopAction(
                scrollToTopState
            )
        )
    } ,[scrollToTopState])

    return (
        <div 
         className={`fixed bottom-[6rem] right-[19px] md:bottom-[6rem] transition-all duration-500 z-[39] cursor-pointer ${showScrollToTop ? 'opacity-100' : 'opacity-0'}`} 
         onClick={handleScrollToTop}
        >
        <ScrollToTopIcon />
        </div>
    )
}

export default ScrollToTopButton