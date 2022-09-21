import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../../type';
import styled from 'styled-components';

type PostItemProps = {
  post: Post;
};

const PostItem = ({ post }: PostItemProps) => {
  const {
    slug,
    frontMatter: { title, image, excerpt, date },
  } = post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
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
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  text-align: center;
  transition: all 250ms ease-in;

  :hover {
    transform: scale(1.02);
  }

  a {
    color: inherit;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 20rem;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  padding: 1rem 0.5rem;
`;

const Title = styled.h3`
  margin: 0.5rem 0;
  font-size: ${({ theme }) => theme.font.size6};
`;

const Time = styled.time`
  font-size: ${({ theme }) => theme.font.size4};
  font-style: italic;
  color: #808b96;
`;

const Paragraph = styled.p`
  margin-top: 1rem;
  line-height: 1.5rem;
`;
