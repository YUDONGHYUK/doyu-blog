import Profile from '../components/about-page/profile';
import styled from 'styled-components';

const AboutPage = () => {
  return (
    <Container>
      <Title>About</Title>
      <Profile />
      <Title>Skills</Title>
    </Container>
  );
};

export default AboutPage;

const Container = styled.div``;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size8};
`;
