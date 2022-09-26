import styled from 'styled-components';

const Skills = () => {
  return (
    <Container>
      <Grid>
        <SubTitle>Front-end</SubTitle>
        <SkillList>
          <Skill>JavaScript</Skill>
          <Skill>TypeScript</Skill>
          <Skill>React.js</Skill>
          <Skill>Next.js</Skill>
          <Skill>HTML/CSS</Skill>
          <Skill>Styled-components</Skill>
        </SkillList>
      </Grid>
      <Grid>
        <SubTitle>Tools</SubTitle>
        <SkillList>
          <Skill>Github</Skill>
          <Skill>Slack</Skill>
          <Skill>Notion</Skill>
        </SkillList>
      </Grid>
    </Container>
  );
};

export default Skills;

const Container = styled.section`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
`;

const Grid = styled.div``;

const SubTitle = styled.h3``;

const SkillList = styled.ul``;

const Skill = styled.li``;
