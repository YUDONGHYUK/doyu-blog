---
title: 'Next.js 블로그에 TOC(Table Of Contents) 적용하기'
date: '2022-10-09'
image: 'thumbnail.png'
excerpt: 'IntersectionObserver API를 사용하여 TOC(Table of Contents) 구현'
isFeatured: true
---

블로그를 직접 만들어 사용하다 보니 다른 블로그를 이용하면서 사용 만족도가 높았던 기능들은 추가해 봐야겠다 생각했었습니다. 그 중 하나 TOC(Table Of Contents)이고 구현한 방법에 대해 정리해 보려고 합니다.

## How?

처음에는 스크롤에 이벤트를 추가하여 구현하려고 했지만 스크롤시 짧은 시간에 많은 이벤트가 동기적으로 실행되기 때문에 성능에 좋지 않을거 같아서 [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API를 사용하여 구현하기로 했습니다.

## Intersection Observer

>Intersection Observer API는 타겟 요소와 상위 요소 또는 최상위 document의 viewport 사이의 intersection 내의 변화를 비동기적으로 관찰하는 방법이다. - MDN -

다시 말해, Intersection Observer API는 브라우저 viewport와 설정한 element의 교차점을 관찰하며, 요소가 뷰포트에 포함되는지 포함되지 않는지 구별하는 기능을 제공합니다.

Intersection Observer API는 비동기적으로 실행되기 때문에, 스크롤 이벤트 기반의 요소 관찰에서 발생하는 렌더링 성능이나 이벤트 연속 호출 같은 문제 없이 사용이 가능합니다.

## Intersection Observer 인스턴스화
첫 번째 인자로 콜백(callback) 함수와 두 번째 인자로 옵션(option)을 받는 Intersection Observer를 생성합니다. 옵션으로 요소의 영역을 결정하는 rootMargin을 가질 수 있으며 top: -105px, bottom: -40%를 적용하였습니다. (콜백 함수는 아래에서 작성)

```ts
// lib/useIntersectionObserver.ts

export const useIntersectionObserver = () => {
  useEffect(() => {
    const callback: IntersectionObserverCallback = () => {};

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-105px 0px -40% 0px',
    });
  });
};
```

- -105px은 상단에 고정된 nav의 높이이고 그 안에 숨겨진 콘텐츠는 보이는 것으로 간주되지 않는다는 것을 의미합니다.
- -40%는 콘텐츠가 페이지의 아래쪽 40%에 있는 경우 보이는 것으로 간주되지 않는다는 것을 의미합니다.

## observer에 관찰요소 등록하기
observer를 생성한 후에 관찰하고자 하는 element마다 observe() 메소드를 호출하여 element 관찰을 시작합니다. 또한, unmount 되었을 때 disconnect() 메소드를 호출하여 모든 element의 관찰을 중지합니다.

```ts
// lib/useIntersectionObserver.ts

export const useIntersectionObserver = () => {
  useEffect(() => {
    const callback: IntersectionObserverCallback = () => {};

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-105px 0px -40% 0px',
    });

    const headingElements = Array.from(document.querySelectorAll('h2'));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  });
};
```

## 콜백 함수에서 heading 요소 저장하기
observer는 관찰할 요소가 등록되거나 뷰(rootMargin에서 설정한 범위)의 안 또는 밖으로 스크롤될 때마다 콜백 함수를 호출합니다. 모든 heading 요소의 가시성(보이는지 보이지 않는지)을 추적하기 위해 useRef 훅에 관찰중인 heading 요소의 값들을 저장합니다.

```ts
// lib/useIntersectionObserver.ts

type HeadingElementRef = {
  [k: string]: IntersectionObserverEntry;
};

export const useIntersectionObserver = () => {
  const headingElementsRef = useRef<HeadingElementRef>({});

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      headingElementsRef.current = entries.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;

        return map;
      }, headingElementsRef.current);
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-105px 0px -40% 0px',
    });

    const headingElements = Array.from(document.querySelectorAll('h2'));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  });
};
```

## heading 요소와 rootMargin 영역의 교차여부
각각의 heading 요소(콜백 함수의 entries 목록)는 `isIntersecting` 값을 갖습니다. isIntersecting은 관찰 영영과 관찰 대상이 교차 상태로 들어가거나(true) 교차 상태에서 나가는지(false) 여부를 나타내는 값(boolean)입니다.

교차 상태로 들어온 heading 요소는 1개 이상일 수도 있으므로 교차 상태로 들어온 모든 heading 요소에 대한 목록을 알아야 합니다.
```ts
// lib/useIntersectionObserver.ts

type HeadingElementRef = {
  [k: string]: IntersectionObserverEntry;
};

export const useIntersectionObserver = () => {
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
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-105px 0px -40% 0px',
    });

    const headingElements = Array.from(document.querySelectorAll('h2'));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  });
};
```

마지막으로 관찰 영역에 들어온 heading 요소가 있을 경우 요소 중 가장 아래에 존재하는 heading을 선택하고 setActiveId 함수로 전달합니다.

```ts
// 전체 코드
// lib/useIntersectionObserver.ts

import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

type HeadingElementRef = {
  [k: string]: IntersectionObserverEntry;
};

export const useIntersectionObserver = (
  setActiveId: Dispatch<SetStateAction<string | null>>
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

      console.log(visibleHeadings);

      visibleHeadings.length > 0 &&
        setActiveId(
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
```

## 활성화된 TOC heading 하이라이트하기
useState 훅을 사용하여 현재 활성화된 heading을 저장할 activeId 상태를 생성합니다. 그런다음 activeId 값이 사용될 컴포넌트로 전달해 줍니다.

```tsx
const PostDetailPage = ({ post }: PostDetailPageProps) => {
  const [headingList, setHeadingList] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useIntersectionObserver(setActiveId);

  return (
    <>
      <PostContent post={post} setHeadingList={setHeadingList} />
      <TableOfContents headingList={headingList} activeId={activeId} />
    </>
  );
};

export default PostDetailPage;
```

그런 다음 현재 활성화된 heading 요소에 `active` 클래스를 추가해줍니다.

```tsx
type TableOfContentsProps = {
  headingList: string[];
  activeId: string | null;
};

const TableOfContents = ({ headingList, activeId }: TableOfContentsProps) => {
  return (
    <Aside>
      <HeadingList>
        {headingList.map((heading) => {
          return (
            <li key={heading} className={heading === activeId ? 'active' : ''}>
              <a
                href={`#${generateSlug(heading)}`}
                onClick={(e) => {
                  e.preventDefault();
                  const slug = generateSlug(heading);
                  scrollToHeading(slug);
                }}
              >
                {heading}
              </a>
            </li>
          );
        })}
      </HeadingList>
    </Aside>
  );
};

export default TableOfContents;
```

## 참고
>[Intersection Observer - 요소의 가시성 관찰](https://heropy.blog/2019/10/27/intersection-observer)  
[How to build a table of contents in React](https://www.emgoto.com/react-table-of-contents/)  
[React에서 Intersection Observer로 TOC 구현하기](https://se9round.dev/post/React%EC%97%90%EC%84%9C%20Intersection%20Observer%EB%A1%9C%20TOC%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)