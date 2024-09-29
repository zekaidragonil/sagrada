import React, { ComponentType, useEffect, useState, MutableRefObject } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

interface LazyLoadProps {
  key: string; 
}

const withLazyLoad = <P extends LazyLoadProps>(
  WrappedComponent: ComponentType<P>,
  threshold: number = 0.5
) => {

  return function LazyComponent(props: P) {
    const [isInView, ref] = useIntersectionObserver(threshold);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
      if (isInView && !hasLoaded) {
        setHasLoaded(true);
      }
    }, [isInView, hasLoaded]);

    const divRef = ref as MutableRefObject<HTMLDivElement | null>;

    return (
      <div ref={divRef}>
        {hasLoaded ? <WrappedComponent {...props} /> : <div>Loading...</div>}
      </div>
    );
  };
};

withLazyLoad.displayName = 'withLazyLoad';
export default withLazyLoad;
