import { GetStaticProps } from 'next';

import LatestPosts from '../components/home-page/LatestPosts';
import Hero from '../components/home-page/Hero';
import { Post } from '../types';
import { getLatestPosts } from '../lib/postsUtil';

type HomePageProps = {
  posts: Post[];
};

const HomePage = ({ posts }: HomePageProps) => {
  return (
    <>
      <Hero />
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const latestPosts = getLatestPosts();

  return {
    props: { posts: latestPosts },
  };
};
