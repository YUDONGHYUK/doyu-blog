import styled from 'styled-components';
import Icon from '../icons/icon';

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
  color: #566573;
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.5rem;

  svg {
    fill: #566573;

    :hover {
      fill: #2e86c1;
    }
  }
`;

const Right = styled.span``;
