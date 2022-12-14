import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../../../types';
import styled from 'styled-components';

type PostItemProps = {
  post: Post;
};

const PostItem = ({ post }: PostItemProps) => {
  const {
    slug,
    frontMatter: { title, image, excerpt, date },
  } = post;

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <Item>
      <Link href={linkPath}>
        <a>
          <ImageWrapper>
            <Image
              src={imagePath}
              placeholder="blur"
              blurDataURL={imagePath}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
            />
          </ImageWrapper>
          <ContentWrapper>
            <Title>{title}</Title>
            <Time>{formattedDate}</Time>
            <Paragraph>{excerpt}</Paragraph>
          </ContentWrapper>
        </a>
      </Link>
    </Item>
  );
};

export default PostItem;

const Item = styled.li`
  margin: 0;
  border-radius: 0.5rem;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.bg_element};
  text-align: center;
  transition: transform 250ms ease-in;

  :hover {
    transform: scale(1.02);

    h3 {
      color: ${({ theme }) => theme.primary};
    }
  }

  a {
    color: inherit;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 20rem;
  overflow: hidden;
  border-radius: 0.5rem 0.5rem 0 0;

  img {
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0.5rem 0;
  font-size: ${({ theme }) => theme.font6};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 250ms ease;
`;

const Time = styled.time`
  font-size: ${({ theme }) => theme.font4};
  font-style: italic;
  color: ${({ theme }) => theme.text3};
`;

const Paragraph = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 1rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.text2};
`;
