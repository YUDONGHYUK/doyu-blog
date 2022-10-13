import MainNavigation from './MainNavigation';
import Footer from './Footer';
import styled from 'styled-components';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <MainNavigation />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Main = styled.main`
  width: 100%;
  max-width: 51rem;
  min-height: calc(100vh - 64px - 96px);
  margin: auto;
  padding: 0 1.5rem 3rem 1.5rem;
`;
