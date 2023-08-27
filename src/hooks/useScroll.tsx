import React, { FC, useEffect, useState } from 'react'
import { ScrollType } from '../types';

const useScroll = ( target?: HTMLElement , options: IntersectionObserverInit = { 
      root: null, 
      rootMargin: `0%`, 
      threshold: 0 
} ) => {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

    useEffect(() => {
      const cb = (entry: any) => setIsIntersecting(() => entry.isIntersecting);
      const callback = (entries: any[]) => entries.forEach(cb);
      const observer = new IntersectionObserver(callback, options);

      if(target) observer.observe(target);
    
      return () => target && observer.unobserve(target);
    }, [target])
  
    return isIntersecting; 
};

export default useScroll;