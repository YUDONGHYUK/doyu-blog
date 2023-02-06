import Icon from '../icons/icon';
import styled, { css } from 'styled-components';
import Link from 'next/link';

type MyInfoProps = {
  kind: 'email' | 'github' | 'notion' | 'portfolio';
  text: string;
  isLink?: boolean;
  address?: string;
};

const MyInfo = ({ kind, text, isLink, address }: MyInfoProps) => {
  if (isLink && address) {
    return (
      <Link href={address} passHref>
        <Info isLink={isLink}>
          <Icon kind={kind} size={24} />
          <Text>{text}</Text>
        </Info>
      </Link>
    );
  }

  return (
    <Info>
      <Icon kind={kind} href={address} size={24} />
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
  color: ${({ theme }) => theme.text2};
  font-size: ${({ theme }) => theme.font5};
  list-style: none;

  svg {
    fill: ${({ theme }) => theme.text2};
  }

  ${({ isLink }) =>
    isLink &&
    css`
      cursor: pointer;
      :hover {
        color: ${({ theme }) => theme.blue1};

        svg {
          fill: ${({ theme }) => theme.blue1};
        }
      }
    `}
`;

const Text = styled.span`
  margin-left: 0.5rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
