import { ComponentType, FC, useEffect } from 'react';
import ReactGA from 'react-ga';

const withTracker = (Component: FC<any>, options: any = {}) => {
    let nextPage = window.location.pathname;

    // track view page
    const trackPage = (page: any) => {
      ReactGA.set({
        page,
        ...options
      });
      ReactGA.pageview(page);
    };

    // hoc
    const HOC = (props: any) => {
      useEffect(() => {
        const {
            location: { 
              pathname: page 
            }
        } = props;

          trackPage(page);
      }, []);
    
      // track next page
      useEffect(() => {
        const {
            location: { 
              pathname: currentPage 
            }
          } = props;
        
        if(currentPage !== nextPage) {
            trackPage(nextPage);
        };
        
      }, [nextPage]);

      // return hoc component
      return <Component {...props} />;
    };

    return HOC;
  };

  export default withTracker;
