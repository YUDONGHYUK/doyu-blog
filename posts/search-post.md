---
title: '게시물 검색기능 구현하기(with React)'
date: '2022-10-19'
image: 'thumbnail.png'
excerpt: 'React에서 블로그 게시물을 검색하는 기능을 구현'
isFeatured: true
---

이번 게시물에서는 React와 TypeScript를 사용하여 검색기능을 구현하는 방법에 대해 알아보려고 합니다.

## How?

검색은 제목으로 검색할 수 있도록 구현할 것이며 검색 기능을 구현하기 위해 필요한 데이터는 fake API인 [JSONPlaceholder](https://jsonplaceholder.typicode.com/)를 사용하겠습니다.

## JSONPlaceholder에서 데이터 가져오기
JSONPlaceholder 제공하는 리소스 중 하나인 `'/posts'`를 사용하겠습니다. /posts는 100개의 post를 제공하며 각각 postId, id, title, body를 포함하고 있습니다.

```typescript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then((data) => setPosts(data));
```

## BlogPosts.tsx 파일 생성하기
전반적인 검색 기능을 구현할 컴포넌트이며, 
JSONPlaceholder에서 가져온 데이터는 `{posts}` prop을 통해 전달받고 posts는 postId, id, title, body로 구성된 객체 배열이므로 `Post[]` 타입으로 정의합니다.

react에서 제공하는 useState 훅을 사용하여 검색에 입력된 값을 저장할 search 상태를 생성합니다.

```tsx
// BlogPosts.tsx

import { useState } from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type BlogPostsProps = {
  posts: Post[];
};

const BlogPosts = ({ posts }: BlogPostsProps) => {
  const [search, setSearch] = useState('');

  // 앞으로 코드가 작성될 부분
};

export default BlogPosts;
```

## Posts 렌더링 하기
`{posts}` props을 통해 전달받은 포스트 데이터를 렌더링합니다. 제목으로 검색을 구현할 것이기 때문에 id와 title만 표시하겠습니다.

```tsx
// BlogPosts.tsx

// 생략...
const BlogPosts = ({ posts }: BlogPostsProps) => {
  const [search, setSearch] = useState('');

  return (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id} - {post.title}
          </li>
        ))}
      </ul>
  );
};

export default BlogPosts;

```

## Input 추가하기
```tsx
// BlogPosts.tsx

// 생략...
  return (
    <>
      <input
        type='text'
        placeholder='Search posts'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id} - {post.title}
          </li>
        ))}
      </ul>
    </>
  );
// 생략...
```

## Search function 추가하기
검색어를 입력할 때마다 searchResults 함수가 실행되며, 이 함수는 검색어(search)가 제목(post?.title)에 포함되는 값만 필터링하여 배열로 반환합니다. (영어의 경우 대소문자 구별하지 않습니다.)

```tsx
// BlogPosts.tsx

// 생략...
const BlogPosts = ({ posts }: BlogPostsProps) => {
  const [search, setSearch] = useState('');

  const searchResults = (search: string, posts: Post[]) => {
    return posts.filter((post) =>
      post?.title?.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredPosts = searchResults(search, posts);

  return (
    // 생략...
  );
};
```

## 전체 코드 살펴보기
```tsx
import { useState } from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type BlogPostsProps = {
  posts: Post[];
};

const BlogPosts = ({ posts }: BlogPostsProps) => {
  const [search, setSearch] = useState('');

  const searchResults = (search: string, posts: Post[]) => {
    return posts.filter((post) =>
      post?.title?.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredPosts = searchResults(search, posts);

  return (
    <>
      <input
        type='text'
        placeholder='Search posts'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            {post.id} - {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPosts;
```

## 참고
>[Build a Category Search with React](https://amirardalan.com/blog/build-a-category-search-with-react)
