
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="Search") => {
  const eventTracker = (action = "test action", label = "test label") => {
    ReactGA.event({category, action, label});
  };

  return eventTracker;
};

export default useAnalyticsEventTracker;