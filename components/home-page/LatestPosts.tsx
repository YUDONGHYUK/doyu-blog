import Link from 'next/link';
import PostGrid from '../posts/PostsGrid';
import { Post } from '../../type';
import styled from 'styled-components';

type LatestPostsProps = {
  posts: Post[];
};

const LatestPosts = ({ posts }: LatestPostsProps) => {
  return (
    <Container>
      <Wrapper>
        <Title>Latest Posts</Title>
        <Link href="/posts">All posts</Link>
      </Wrapper>
      <PostGrid posts={posts} />
    </Container>
  );
};

export default LatestPosts;

const Container = styled.section``;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: ${({ theme }) => theme.blue.primary};

    :hover {
      color: ${({ theme }) => theme.blue.secondary};
    }
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size8};
`;
