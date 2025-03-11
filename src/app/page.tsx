import Link from 'next/link';
import { getLatestPosts } from '../../lib/postsUtil';
import Intro from '../components/intro';
import { Heading } from '../components/ui/heading';
import PostCard from '../components/post-card';

export default function HomePage() {
  const posts = getLatestPosts();

  return (
    <div>
      <Intro />
      <section className="my-20">
        <div className="flex items-center justify-between">
          <Heading as="h3">Latest Posts</Heading>
          <Link href="/posts">All Posts</Link>
        </div>
        <ul className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10">
          {posts.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </ul>
      </section>
    </div>
  );
}
