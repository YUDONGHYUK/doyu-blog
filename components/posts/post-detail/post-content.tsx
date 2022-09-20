import ReactMarkdown from 'react-markdown';
import PostHeader from './post-header';
import { Post } from '../../../type';
import styled from 'styled-components';

const DUMMY_POST = {
  title: 'Dummy posts',
  image: 'dummy-posts.png',
  date: '2022-09-19',
  slug: 'dummy-posts1',
  content: '# This is a first post',
};

type PostContentProps = {
  post: Post;
};

const PostContent = ({ post }: PostContentProps) => {
  const imagePath = `/images/posts/${post.slug}/${post.frontMatter.image}`;
  return (
    <Article>
      <PostHeader title={post.frontMatter.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </Article>
  );
};

export default PostContent;

const Article = styled.article`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-size: ${({ theme }) => theme.font.size5};
  line-height: ${({ theme }) => theme.font.size8};
`;
