import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = (
  threshold = 0.1
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasRendered) {
          if (count > 1) setHasRendered(true);
          else setCount((prevCount) => ++prevCount);
        }
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, hasRendered, count]);


  return [isIntersecting || hasRendered, ref];
};

export default useIntersectionObserver;