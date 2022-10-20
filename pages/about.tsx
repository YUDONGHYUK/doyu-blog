import Profile from '../components/about-page/Profile';
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
      <ResumeBox>
        <Button onClick={goToResume}>Resume</Button>
      </ResumeBox>
    </Container>
  );
};

export default AboutPage;

const Container = styled.div``;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font10};

  @media screen and (max-width: 768px) {
    font-size: ${({ theme }) => theme.font8};
  }
`;

const ResumeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.bg_page};
  font-size: ${({ theme }) => theme.font5};

  :hover {
    color: ${({ theme }) => theme.blue1};
  }
`;
