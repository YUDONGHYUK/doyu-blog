import { useState, useEffect } from 'react';

export default function useTOC() {
  const [tocList, setTocList] = useState<string[]>([]);

  useEffect(() => {
    const textList = [] as string[];
    const headings = document.querySelectorAll('h2');

    headings.forEach((heading) => {
      const headingText = heading.innerText;
      textList.push(headingText);
    });

    setTocList(textList);
  }, []);

  return { tocList };
}
