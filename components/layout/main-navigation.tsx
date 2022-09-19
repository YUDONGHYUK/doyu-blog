import Link from 'next/link';
import Logo from './logo';
import styled from 'styled-components';

const MainNavigation = () => {
  return (
    <Header>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Nav>
        <NavLists>
          <NavItem>
            <Link href="/posts">Posts</Link>
          </NavItem>
          <NavItem>
            <Link href="/about">About</Link>
          </NavItem>
        </NavLists>
      </Nav>
    </Header>
  );
};

export default MainNavigation;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0 10%;
  color: #17202a;
`;

const Nav = styled.nav``;

const NavLists = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li`
  margin: 0 1rem;

  a {
    padding: 0.5rem 0;
    color: #17202a;
    font-size: ${({ theme }) => theme.font.size4};
    transition: color 300ms ease;
  }

  a:hover,
  a:active {
    border-bottom: 2px solid #d5d8dc;
  }
`;
