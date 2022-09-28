import Profile from '../components/about-page/profile';
// import Skills from '../components/about-page/Skills';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const AboutPage = () => {
  const router = useRouter();

  const goToResume = () => {
    router.push(
      'https://www.notion.so/doyu/Doyu-0cf5f1cabc854136ab630cdd387f181c'
    );
  };

  return (
    <Container>
      <Title>About</Title>
      <Profile />
      {/* <Title>Skills</Title>
      <Skills /> */}
      <ResumeBox>
        <Button onClick={goToResume}>Resume</Button>
      </ResumeBox>
    </Container>
  );
};

export default AboutPage;

const Container = styled.div``;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size8};
`;

const ResumeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.text.secondary};
  background-color: ${({ theme }) => theme.bgColor.primary};
  font-size: ${({ theme }) => theme.font.size5};

  :hover {
    color: ${({ theme }) => theme.blue.primary};
  }
`;
