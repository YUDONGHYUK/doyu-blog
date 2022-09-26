import PostsGrid from './PostsGrid';
import { Post } from '../../type';
import styled from 'styled-components';

type AllPostsProps = {
  posts: Post[];
};

const AllPosts = ({ posts }: AllPostsProps) => {
  return (
    <Container>
      <Title>All Posts</Title>
      <PostsGrid posts={posts} />
    </Container>
  );
};

export default AllPosts;

const Container = styled.section``;

const Title = styled.h2`
  padding: 1rem 0;
  font-size: ${({ theme }) => theme.font.size10};
  text-align: center;
`;
