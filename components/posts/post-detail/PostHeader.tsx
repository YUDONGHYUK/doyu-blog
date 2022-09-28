import Image from 'next/image';
import styled from 'styled-components';

type PostHeaderProps = {
  title: string;
  image: string;
};

const PostHeader = ({ title, image }: PostHeaderProps) => {
  return (
    <Header>
      <Title>{title}</Title>
      <Image src={image} alt={title} width={200} height={150} />
    </Header>
  );
};

export default PostHeader;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 2rem 0;
  border-bottom: 1px solid #d5d8dc;
  padding-bottom: 2rem;
  gap: 1rem;

  img {
    object-fit: cover;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.size8};
  margin: 0;
  line-height: initial;
  text-align: start;
`;
