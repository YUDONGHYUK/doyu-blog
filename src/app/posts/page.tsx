import { Suspense } from 'react';
import { getAllPosts } from '../../../lib/postsUtil';
import PageTitle from '../../components/page-title';
import AllPosts from './all-posts';
import SearchPost from './search-post';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Doyu Blog',
};

export default async function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <Suspense>
        <PageTitle title="All Posts" />
        <SearchPost />
        <AllPosts posts={posts} />
      </Suspense>
    </div>
  );
}
