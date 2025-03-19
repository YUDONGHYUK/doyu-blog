import Link from 'next/link';

import EmailIcon from './email';
import GithubIcon from './github';
import NotionIcon from './notion';
import PortfolioIcon from './portfolio';
import MoonIcon from './moon';
import SunIcon from './sun';

type IconProps = {
  kind: 'email' | 'github' | 'notion' | 'portfolio' | 'moon' | 'sun';
  href?: string;
  size?: number;
};

const Icon = ({ kind, href, size = 24 }: IconProps) => {
  function matchedIcon(kind: string) {
    switch (kind) {
      case 'email':
        return <EmailIcon size={size} />;
      case 'github':
        return <GithubIcon size={size} />;
      case 'notion':
        return <NotionIcon size={size} />;
      case 'portfolio':
        return <PortfolioIcon size={size} />;
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
    <Link href={href} style={{ width: size, height: size }}>
      {icon}
    </Link>
  );
};

export default Icon;
