import { GetStaticProps } from 'next';

import AllPosts from '../../components/posts/AllPosts';
import { Post } from '../../types/index';
import { getAllPosts } from '../../lib/postsUtil';

type AllPostsPageProps = {
  posts: Post[];
};

const AllPostsPage = ({ posts }: AllPostsPageProps) => {
  return <AllPosts posts={posts} />;
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { posts: allPosts },
  };
};
