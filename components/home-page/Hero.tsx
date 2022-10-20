import TypeIt from 'typeit-react';
import styled from 'styled-components';

const Hero = () => {
  return (
    <Container>
      <Header>Donghyuk Yu</Header>
      <Blurb>
        <strong>배움을 즐기고 두려워하지 않는 프론트엔드 개발자입니다.</strong>
        <br />
        <TypeIt
          options={{ speed: 100 }}
          getBeforeInit={(instance: any) => {
            instance.type(
              'React를 통해 개발하고 있으며, Next.js와 Typescript에 관심이 많습니다.'
            );

            return instance;
          }}
        />
      </Blurb>
    </Container>
  );
};

export default Hero;

const Container = styled.section`
  margin: 2rem 0;
  --ti-cursor-transform: translate(0.1rem, -0.1rem);
`;

const Header = styled.h2`
  margin: 0 0 1rem 0;
  font-size: ${({ theme }) => theme.font10};

  @media screen and (max-width: 768px) {
    font-size: ${({ theme }) => theme.font8};
  }
`;

const Blurb = styled.p`
  color: ${({ theme }) => theme.text3};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }
`;
