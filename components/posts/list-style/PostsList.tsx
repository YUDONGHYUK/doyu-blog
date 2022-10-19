import PostListItem from './PostListItem';
import { Post } from '../../../types';
import styled from 'styled-components';

type PostGridProps = {
  posts: Post[];
};

const PostsList = ({ posts }: PostGridProps) => {
  return (
    <List>
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </List>
  );
};

export default PostsList;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;
