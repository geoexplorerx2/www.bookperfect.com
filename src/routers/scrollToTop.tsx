import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProps, withRouter } from "react-router-dom";

export interface ScrollToTopProps {
  history: any;  // TODO: use RouterProps
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ history }) => {
  const scrollToTopState = useSelector((state: any) => state.ScrollToViewReducer)


  useEffect(() => {
    // console.log('scrollToTopp: scrollToTopState', scrollToTopState)
  }, [scrollToTopState])


  useEffect(() => {
    const unlisten = history && history.listen(() => {
      window.scrollTo(0, 0);
    });

    window.scrollTo(0, 0);

    return () => {
      unlisten();
    };


  }, [scrollToTopState]);

  return null;
};

export default withRouter(ScrollToTop);
