import ReactMarkdown from 'react-markdown';
import PostHeader from './post-header';
import styled from 'styled-components';

const DUMMY_POST = {
  title: 'Dummy posts',
  image: 'dummy-posts.png',
  date: '2022-09-19',
  slug: 'dummy-posts1',
  content: '# This is a first post',
};

const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  return (
    <Article>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
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
