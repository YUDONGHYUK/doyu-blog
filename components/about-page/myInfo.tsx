import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';

type MyInfoProps = {
  fileName: string;
  text: string;
  isLink?: boolean;
  address?: string;
};

const MyInfo = ({ fileName, text, isLink, address }: MyInfoProps) => {
  const imagePath = `/images/about/icon/${fileName}.svg`;

  if (isLink && address) {
    return (
      <Link href={address}>
        <Info isLink={isLink}>
          <Image src={imagePath} alt={fileName} width={24} height={24} />
          <Text>{text}</Text>
        </Info>
      </Link>
    );
  }

  return (
    <Info>
      <Image src={imagePath} alt={fileName} width={24} height={24} />
      <Text>{text}</Text>
    </Info>
  );
};

export default MyInfo;

const Info = styled.li<{ isLink?: boolean }>`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.font.size5};
  list-style: none;

  ${({ isLink }) =>
    isLink &&
    css`
      cursor: pointer;
      :hover {
        color: #2e86c1;
      }
    `}
`;

const Text = styled.span`
  margin-left: 0.5rem;
`;
