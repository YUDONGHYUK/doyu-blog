import { GetStaticProps } from 'next';

import LatestPosts from '../components/home-page/latest-posts';
import { Post } from '../type';
import { getLatestPosts } from '../lib/posts-util';

type HomePageProps = {
  posts: Post[];
};

const HomePage = ({ posts }: HomePageProps) => {
  return <LatestPosts posts={posts} />;
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const latestPosts = getLatestPosts();

  return {
    props: { posts: latestPosts },
  };
};
