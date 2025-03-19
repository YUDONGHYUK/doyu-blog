import Icon from '../../components/icons/icon';
import { Avatar, AvatarImage } from '../../components/avatar';
import PageTitle from '../../components/page-title';
import { Button } from '../../components/ui/button';
import AboutTyper from './about-typer';

type Social = {
  name: 'email' | 'github' | 'notion' | 'portfolio';
  label: string;
} & ({ isLink: true; href: string } | { isLink: false });

const SOCIALS: Social[] = [
  { name: 'email', label: 'ydh0905@nate.com', isLink: false },
  {
    name: 'github',
    label: 'YUDONGHYUK',
    isLink: true,
    href: 'https://github.com/YUDONGHYUK',
  },
  {
    name: 'notion',
    label: 'Notion',
    isLink: true,
    href: 'https://www.notion.so/Doyu-01b5304c18ec49969140fe4021c768f1',
  },
  {
    name: 'portfolio',
    label: 'Portfolio',
    isLink: true,
    href: 'https://doyu.notion.site/Portfolio-6f822f1372ad46e892225a7e46228dd7',
  },
];
export default function AboutPage() {
  return (
    <div>
      <PageTitle title="About" />
      <div>
        <div className="mb-16 md:mb-24">
          <div className="my-10 text-3xl md:text-4xl">
            <AboutTyper />
          </div>
          <div className="text-lg space-y-2 md:text-2xl">
            <p>새로운 것을 배우고 익히는 것을 좋아하며,</p>
            <p>
              Notion과 블로그에 새롭게 배운 지식들을 기록하며 성장하고 있습니다.
            </p>
            <p>
              또한, 개발 중 마주친 문제는 적극적으로 해결하고 두려워하지
              않습니다.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between border-y border-accent px-10 py-16 mb-10 md:flex-row">
          <div className="flex justify-center items-center">
            <Avatar className="w-28 h-28">
              <AvatarImage src="/images/about/profile.jpg" alt="avatar" fill />
            </Avatar>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-center space-x-2 mt-6 md:mt-0">
              <Button variant="outline" size="fix">
                RESUME
              </Button>
              <Button variant="outline" size="fix">
                EMAIL
              </Button>
            </div>
            <div className="flex justify-between mt-6 md:mt-0">
              {SOCIALS.map((s) => (
                <Icon
                  key={s.name}
                  kind={s.name}
                  href={s.isLink ? s.href : undefined}
                  size={40}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
