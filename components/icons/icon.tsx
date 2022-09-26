import Link from 'next/link';

import EmailIcon from './email';
import GithubIcon from './github';
import MoonIcon from './moon';
import NotionIcon from './notion';
import PhoneIcon from './phone';
import SunIcon from './sun';

type IconProps = {
  kind: 'phone' | 'email' | 'github' | 'notion' | 'moon' | 'sun';
  href?: string;
  size: number;
};

const Icon = ({ kind, href, size }: IconProps) => {
  function matchedIcon(kind: string) {
    switch (kind) {
      case 'phone':
        return <PhoneIcon size={size} />;
      case 'email':
        return <EmailIcon size={size} />;
      case 'github':
        return <GithubIcon size={size} />;
      case 'notion':
        return <NotionIcon size={size} />;
      case 'moon':
        return <MoonIcon size={size} />;
      case 'sun':
        return <SunIcon size={size} />;
      default:
        return null;
    }
  }

  const icon = matchedIcon(kind);

  if (!href) {
    return icon;
  }

  return (
    <Link href={href}>
      <a style={{ width: size, height: size }}>{icon}</a>
    </Link>
  );
};

export default Icon;
