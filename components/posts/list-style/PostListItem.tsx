import { Post } from '../../../types';
import styled from 'styled-components';
import Link from 'next/link';

type PostListItemProps = {
  post: Post;
};

const PostListItem = ({ post }: PostListItemProps) => {
  const {
    slug,
    frontMatter: { title, excerpt, date },
  } = post;

  const linkPath = `/posts/${slug}`;

  return (
    <Item>
      <Title>
        <Link href={linkPath}>
          <a>{title}</a>
        </Link>
      </Title>
      <Excerpt>{excerpt}</Excerpt>
      <Date>{date}</Date>
    </Item>
  );
};

export default PostListItem;

const Item = styled.li`
  margin: 0;
  padding: 0;
`;

const Title = styled.h2`
  position: relative;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text1};

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    margin-bottom: 0.3rem;
    font-size: 1.3rem;
  }

  :hover::before {
    content: '〉';
    position: absolute;
    top: 2px;
    left: -20px;
    color: ${({ theme }) => theme.primary};
    font-size: 1.5rem;

    @media screen and (max-width: 768px) {
      content: '|';
      top: -2px;
      left: -15px;
      font-size: 1.3rem;
    }
  }
`;

const Excerpt = styled.p`
  margin-bottom: 0;
  color: ${({ theme }) => theme.text2};

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const Date = styled.p`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text3};
  font-size: ${({ theme }) => theme.font4};

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
