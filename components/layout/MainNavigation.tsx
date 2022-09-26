import Link from 'next/link';
import Logo from './Logo';
import ScrollIndicator from './ScrollIndicater';
import styled from 'styled-components';

const MainNavigation = () => {
  return (
    <Header>
      <Container>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <Nav>
          <List>
            <ListItem>
              <Link href="/posts">Posts</Link>
            </ListItem>
            <ListItem>
              <Link href="/about">About</Link>
            </ListItem>
          </List>
        </Nav>
      </Container>
      <ScrollIndicator />
    </Header>
  );
};

export default MainNavigation;

const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #eaecee;
  background-color: #ffffff90;
  backdrop-filter: blur(7px);
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 51rem;
  height: 4rem;
  margin: auto;
  padding: 0 1.5rem;
  color: #17202a;

  a {
    color: #17202a;
    font-size: ${({ theme }) => theme.font.size5};
  }
`;

const Nav = styled.nav``;

const List = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 0 1rem;

  a {
    padding: 0.1rem 0;
    color: #17202a;
    font-size: ${({ theme }) => theme.font.size4};
    transition: color 300ms ease;
  }

  a:hover,
  a:active {
    border-bottom: 2px solid #abb2b9;
  }
`;
