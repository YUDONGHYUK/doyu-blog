import { useContext } from 'react';
import { ThemeContext } from '../../pages/_app';
import Link from 'next/link';
import Logo from './Logo';
import Icon from '../icons/icon';
import ScrollIndicator from './ScrollIndicater';
import styled from 'styled-components';

const MainNavigation = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
            <ListItem>
              <DarkModeBtn onClick={() => toggleTheme()}>
                {theme && (
                  <Icon kind={theme === 'light' ? 'sun' : 'moon'} size={22} />
                )}
              </DarkModeBtn>
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
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg_page};
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

  a {
    font-size: ${({ theme }) => theme.font5};
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
  min-width: 30px;
  margin: 0 1rem;

  a {
    padding: 0.1rem 0;
    font-size: ${({ theme }) => theme.font4};
    transition: color 300ms ease;
  }

  a:hover,
  a:active {
    border-bottom: 2px solid #abb2b9;
  }

  @media screen and (max-width: 768px) {
    margin: 0 0.5rem;
  }
`;

const DarkModeBtn = styled.button`
  display: flex;
  align-items: center;

  svg {
    fill: ${({ theme }) => theme.text1};

    :hover {
      fill: #f39c12;
    }
  }
`;
