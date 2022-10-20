import styled from 'styled-components';

const Logo = () => {
  return <LogoBox>Doyu&apos;s Blog</LogoBox>;
};

export default Logo;

const LogoBox = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
  }
`;
