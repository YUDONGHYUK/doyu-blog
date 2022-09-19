import MainNavigation from './main-navigation';
import styled from 'styled-components';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <MainNavigation />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

const Main = styled.main``;
