import Link from 'next/link';
import { getLatestPosts } from '../../lib/postsUtil';
import { Heading } from '../components/ui/heading';
import PostCard from '../components/post-card';
import HomeTyper from './home-typer';

export default function HomePage() {
  const posts = getLatestPosts();

  return (
    <div>
      <div className="mt-10 tb-12">
        <div className="w-full">
          <div className="space-y-4">
            <Heading as="h1">Donghyuk Yu</Heading>
            <Heading as="h4">
              배움을 즐기고 두려워하지 않는 프론트엔드 개발자입니다.
            </Heading>
          </div>
          <p className="h-4 text-base md:text-lg">
            <HomeTyper />
          </p>
        </div>
      </div>
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
