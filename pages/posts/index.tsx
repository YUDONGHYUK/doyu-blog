import { GetStaticProps } from 'next';

import AllPosts from '../../components/posts/all-posts';
import { Post } from '../../type/index';
import { getAllPosts } from '../../lib/posts-util';

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
