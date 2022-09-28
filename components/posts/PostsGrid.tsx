import PostItem from './PostItem';
import { Post } from '../../types';
import styled from 'styled-components';

type PostGridProps = {
  posts: Post[];
};

const PostsGrid = ({ posts }: PostGridProps) => {
  return (
    <List>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </List>
  );
};

export default PostsGrid;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 2rem 1rem;
  align-content: center;
  list-style: none;
`;
