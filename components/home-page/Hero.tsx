import styled from 'styled-components';

const Hero = () => {
  return (
    <Container>
      <Header>Donghyuk Yu</Header>
      <p style={{ color: '#566573' }}>
        <strong style={{ color: 'black' }}>
          배움을 즐기고 두려워하지 않는 프론트엔드 개발자입니다.
        </strong>
        <br />
        React를 통해 개발하고 있으며, Next.js와 Typescript에 관심이 많습니다.
      </p>
    </Container>
  );
};

export default Hero;

const Container = styled.section`
  margin: 2rem 0;
`;

const Header = styled.h2`
  margin: 0 0 1rem 0;
  font-size: ${({ theme }) => theme.font.size10};
`;
