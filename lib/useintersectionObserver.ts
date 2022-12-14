import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

type HeadingElementRef = {
  [k: string]: IntersectionObserverEntry;
};

export const useIntersectionObserver = (
  setActiveHeading: Dispatch<SetStateAction<string | null>>
) => {
  const headingElementsRef = useRef<HeadingElementRef>({});

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      headingElementsRef.current = entries.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;

        return map;
      }, headingElementsRef.current);

      const visibleHeadings = Object.values(headingElementsRef.current).filter(
        (heading) => heading.isIntersecting
      );

      visibleHeadings.length > 0 &&
        setActiveHeading(
          visibleHeadings[visibleHeadings.length - 1].target.textContent
        );
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-105px 0px -40% 0px',
    });

    const headingElements = Array.from(document.querySelectorAll('h2'));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  });
};
