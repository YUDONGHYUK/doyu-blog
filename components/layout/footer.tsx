import Icon from '../icons/icon';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <IconWrapper>
        <Icon kind="github" href="https://github.com/YUDONGHYUK" size={24} />
        <Icon
          kind="notion"
          href="https://www.notion.so/Doyu-01b5304c18ec49969140fe4021c768f1"
          size={24}
        />
      </IconWrapper>
      <Right>Copyright &copy; {new Date().getFullYear()} Doyu</Right>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6rem;
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.5rem;

  svg {
    fill: ${({ theme }) => theme.text.secondary};

    :hover {
      fill: ${({ theme }) => theme.blue.primary};
    }
  }
`;

const Right = styled.span`
  color: ${({ theme }) => theme.text.secondary};
`;
