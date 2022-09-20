import PostGrid from './posts-grid';
import { Post } from '../../type';
import styled from 'styled-components';

type AllPostsProps = {
  posts: Post[];
};

const AllPosts = ({ posts }: AllPostsProps) => {
  return (
    <Container>
      <Title>All Posts</Title>
      <PostGrid posts={posts} />
    </Container>
  );
};

export default AllPosts;

const Container = styled.section`
  max-width: 48rem;
  margin: auto;
  padding: 0 1.5rem;
`;

const Title = styled.h2`
  padding: 2rem 0;
  font-size: ${({ theme }) => theme.font.size12};
  text-align: center;
`;
