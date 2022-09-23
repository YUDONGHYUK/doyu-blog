import Image from 'next/image';
import TypeIt from 'typeit-react';
import styled from 'styled-components';
import MyInfo from './myInfo';

type InfoData = {
  kind: 'phone' | 'email' | 'github' | 'notion';
  text: string;
  isLink: boolean;
  address?: string;
}[];

const INFO_DATA: InfoData = [
  { kind: 'phone', text: '010-7134-2844', isLink: false },
  { kind: 'email', text: 'ydh0905@nate.com', isLink: false },
  {
    kind: 'github',
    text: 'YUDONGHYUK',
    isLink: true,
    address: 'https://github.com/YUDONGHYUK',
  },
  {
    kind: 'notion',
    text: 'Notion',
    isLink: true,
    address: 'https://www.notion.so/Doyu-01b5304c18ec49969140fe4021c768f1',
  },
];

const Profile = () => {
  return (
    <Container>
      <ProfileWrapper>
        <Blurb>
          <TypeIt
            element="h2"
            options={{ speed: 100 }}
            getBeforeInit={(instance: TypeIt) => {
              instance
                .type('안녕하세요.')
                .pause(500)
                .type(`<br>프론트엔드 개발자 <strong >유동혁</strong>입니다.`)
                .pause(750);

              return instance;
            }}
          />
        </Blurb>
        <Avatar>
          <Image
            src="/images/about/profile.jpg"
            alt="profile"
            width={230}
            height={230}
          />
        </Avatar>
      </ProfileWrapper>
      <ContactWrapper>
        {INFO_DATA.map((info) => (
          <MyInfo
            key={info.kind}
            kind={info.kind}
            text={info.text}
            isLink={info.isLink}
            address={info.address}
          />
        ))}
      </ContactWrapper>
    </Container>
  );
};

export default Profile;

const Container = styled.section`
  border-bottom: 1px solid black;
  padding-bottom: 2rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  --ti-cursor-transform: translate(0.1rem, -0.2rem);

  img {
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Blurb = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  font-size: ${({ theme }) => theme.font.size8};
`;

const Avatar = styled.div`
  margin-right: 1rem;
`;

const ContactWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
