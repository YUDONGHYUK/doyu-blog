import { useState } from 'react';
// import PostsGrid from './PostsGrid';
import PostsList from './list-style/PostsList';
import { Post } from '../../types';
import SearchButton from '../posts-page/SearchButton';
import CloseIcon from '../icons/close';
import styled from 'styled-components';

type AllPostsProps = {
  posts: Post[];
};

const AllPosts = ({ posts }: AllPostsProps) => {
  const [search, setSearch] = useState('');

  const searchResults = (search: string, posts: Post[]) => {
    return posts.filter((post) =>
      post?.frontMatter?.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredPosts = searchResults(search, posts);

  return (
    <Container>
      <Title>All Posts</Title>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton search={search} setSearch={setSearch} />
      </InputWrapper>
      {filteredPosts.length > 0 ? (
        // <PostsGrid posts={filteredPosts} />
        <PostsList posts={filteredPosts} />
      ) : (
        <NoPosts>
          No posts found.
          <button onClick={() => setSearch('')}>
            <CloseIcon size={16} />
            Clear Search
          </button>
        </NoPosts>
      )}
    </Container>
  );
};

export default AllPosts;

const Container = styled.section``;

const Title = styled.h2`
  margin-bottom: 0;
  padding: 1rem 0;
  font-size: ${({ theme }) => theme.font10};
  text-align: start;

  @media screen and (max-width: 768px) {
    font-size: ${({ theme }) => theme.font8};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 2rem;

  .search,
  .close {
    position: absolute;
    top: 13.75px;
    right: 0;
    display: flex;
    align-items: center;
    width: 35px;
    height: 25px;
  }

  svg {
    fill: ${({ theme }) => theme.text2};
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.bg_element};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.bg_element};
  font-size: ${({ theme }) => theme.font4};
  color: ${({ theme }) => theme.text2};

  :focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const NoPosts = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.font4};
  line-height: 1rem;

  button {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.primary};
    font-size: ${({ theme }) => theme.font4};
    line-height: 1rem;

    svg {
      margin-right: 0.2rem;
      fill: ${({ theme }) => theme.primary};
    }
  }
`;
