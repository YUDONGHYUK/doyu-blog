import AllPosts from '../../components/posts/all-posts';

const DUMMY_POSTS = [
  {
    title: 'Dummy posts',
    image: 'dummy-posts.png',
    excerpt:
      'dummy-posts for testingdummy-posts for testingdummy-posts for testingdummy-posts for testingdummy-posts for testing',
    date: '2022-09-19',
    slug: 'dummy-posts1',
  },
  {
    title: 'Dummy posts',
    image: 'dummy-posts.png',
    excerpt: 'dummy-posts for testing',
    date: '2022-09-19',
    slug: 'dummy-posts2',
  },
  {
    title: 'Dummy posts',
    image: 'dummy-posts.png',
    excerpt: 'dummy-posts for testing',
    date: '2022-09-19',
    slug: 'dummy-posts3',
  },
  {
    title: 'Dummy posts',
    image: 'dummy-posts.png',
    excerpt: 'dummy-posts for testing',
    date: '2022-09-19',
    slug: 'dummy-posts4',
  },
];

const AllPostsPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostsPage;
