export interface InviewPortType {
    callback: () => void;
    target: HTMLElement;
    options: IntersectionObserverInit | undefined;
    freezeOnceVisible: boolean;
  }
  
const checkInViewIntersectionObserver = ({
    target,
    options = { 
      root: null, 
      rootMargin: `0%`, 
      threshold: 0 
    },
    callback,
    freezeOnceVisible = false,
  }: InviewPortType) => {
    const _funCallback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.map((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          //
          callback();
          // unobserve if freeze is enabled
          if (freezeOnceVisible) {
            observer.unobserve(entry.target);
          }
        }
        return true;
      });
    };
  
    // checked if browser can observe
    if (typeof window.IntersectionObserver === "undefined") {
      console.error(
        "window.IntersectionObserver === undefined! => Your Browser is Notsupport"
      );
      return;
    }
  
    const observer = new IntersectionObserver(_funCallback, options);
    target && observer.observe(target);
  };
  
  export default checkInViewIntersectionObserver;
  