import MainNavigation from './MainNavigation';
import Footer from './Footer';
import styled from 'styled-components';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <BindBox>
        <MainNavigation />
        <Main>{children}</Main>
      </BindBox>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const BindBox = styled.div``;

const Main = styled.main`
  max-width: 51rem;
  margin: auto;
  padding: 0 1.5rem 3rem 1.5rem;
`;
