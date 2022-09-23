import PostGrid from '../posts/posts-grid';
import { Post } from '../../type';
import styled from 'styled-components';
import Link from 'next/link';

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
    color: #2e86c1;

    :hover {
      color: #5dade2;
    }
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size8};
`;
