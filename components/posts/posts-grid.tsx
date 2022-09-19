import PostItem from './post-item';
import { Post } from '../../type';
import styled from 'styled-components';

type PostGridProps = {
  posts: Post[];
};

const PostGrid = ({ posts }: PostGridProps) => {
  return (
    <List>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </List>
  );
};

export default PostGrid;

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1.5rem;
  align-content: center;
  list-style: none;
`;
