import { useContext } from 'react';
import { ThemeContext } from '../../pages/_app';
import Link from 'next/link';
import Logo from './Logo';
import Icon from '../icons/icon';
import ScrollIndicator from './ScrollIndicater';
import styled from 'styled-components';
import { lightTheme, ThemeType } from '../../styles/theme';

const MainNavigation = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Header activeTheme={theme}>
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
                <Icon kind={theme === lightTheme ? 'sun' : 'moon'} size={22} />
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

const Header = styled.header<{ activeTheme: ThemeType }>`
  position: sticky;
  top: 0;
  width: 100%;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.bgColor.primary};
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
    font-size: ${({ theme }) => theme.font.size4};
    transition: color 300ms ease;
  }

  a:hover,
  a:active {
    border-bottom: 2px solid #abb2b9;
  }
`;

const DarkModeBtn = styled.button`
  display: flex;
  align-items: center;

  svg {
    fill: ${({ theme }) => theme.text.primary};

    :hover {
      fill: #f39c12;
    }
  }
`;
