import { getAllPosts } from '../../../lib/postsUtil';
import PageTitle from '../../components/page-title';
import AllPosts from './all-posts';
import PostItem from './post-item';
import SearchPost from './search-post';

export default async function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <PageTitle title="All Posts" />
      <SearchPost />
      <AllPosts posts={posts} />
    </div>
  );
}
