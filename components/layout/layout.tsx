import MainNavigation from './main-navigation';
import styled from 'styled-components';
import Footer from './footer';

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
  max-width: 48rem;
  height: 100vh;
  margin: auto;
`;

const Main = styled.main`
  padding-bottom: 3rem;
`;
