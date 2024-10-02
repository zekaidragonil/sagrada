import React, { useEffect, useState } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const withLazyLoad = (
  WrappedComponent,
  threshold = 0.5
) => {

  return function LazyComponent(props) {
    const [isInView, ref] = useIntersectionObserver(threshold);
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
      if (isInView && !hasLoaded) {
        setHasLoaded(true);
      }
    }, [isInView, hasLoaded]);
    return (
      <div ref={ref}>
        {hasLoaded ? <WrappedComponent {...props} /> : <div>Loading...</div>}
      </div>
    );
  };

};

withLazyLoad.displayName = 'withLazyLoad';
export default withLazyLoad;