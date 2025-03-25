import Icon from '../../components/icons/icon';
import { Avatar, AvatarImage } from '../../components/avatar';
import PageTitle from '../../components/page-title';
import { Button } from '../../components/ui/button';
import AboutTyper from './about-typer';
import Link from 'next/link';

type Social = {
  name: 'github' | 'notion' | 'portfolio';
  label: string;
  href: string;
};

const SOCIALS: Social[] = [
  {
    name: 'github',
    label: 'YUDONGHYUK',
    href: 'https://github.com/YUDONGHYUK',
  },
  {
    name: 'notion',
    label: 'Notion',
    href: 'https://www.notion.so/Doyu-01b5304c18ec49969140fe4021c768f1',
  },
  {
    name: 'portfolio',
    label: 'Portfolio',
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
              <Link
                target="_blank"
                href="https://www.notion.so/doyu/Doyu-0e8a5b6e225a42fab531895e4ad388ae"
              >
                <Button variant="outline" size="fix">
                  RESUME
                </Button>
              </Link>
              <Link href="mailto:ydh0905@naver.com">
                <Button variant="outline" size="fix">
                  EMAIL
                </Button>
              </Link>
            </div>
            <div className="flex justify-between mt-6 md:mt-0">
              {SOCIALS.map((s) => (
                <Link key={s.name} target="_blank" href={s.href}>
                  <Icon className="fill-text" kind={s.name} size={40} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
