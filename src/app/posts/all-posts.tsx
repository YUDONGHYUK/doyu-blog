'use client';

import { useSearchParams } from 'next/navigation';
import { Post } from '../../../types';
import PostItem from './post-item';

interface AllPostsProps {
  posts: Post[];
}

export default function AllPosts({ posts }: AllPostsProps) {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q')?.toLowerCase();

  const filtedPosts = q
    ? posts.filter((post) => post.frontMatter.title.toLowerCase().includes(q))
    : posts;

  return (
    <ul className="mt-10 grid gap-4 grid-cols-4 justify-items-center sm:grid-cols-8 md:grid-cols-12 md:gap-6">
      {filtedPosts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
