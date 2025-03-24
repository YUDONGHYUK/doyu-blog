import Link from 'next/link';

import EmailIcon from './email-icon';
import GithubIcon from './github-icon';
import NotionIcon from './notion-icon';
import PortfolioIcon from './portfolio-icon';
import MoonIcon from './moon-icon';
import SunIcon from './sun-icon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  kind: 'email' | 'github' | 'notion' | 'portfolio' | 'moon' | 'sun';
  href?: string;
  size?: number;
}

const Icon = ({ kind, href, size = 24, ...props }: IconProps) => {
  function matchedIcon(kind: string) {
    switch (kind) {
      case 'email':
        return <EmailIcon size={size} {...props} />;
      case 'github':
        return <GithubIcon size={size} {...props} />;
      case 'notion':
        return <NotionIcon size={size} {...props} />;
      case 'portfolio':
        return <PortfolioIcon size={size} {...props} />;
      case 'moon':
        return <MoonIcon size={size} {...props} />;
      case 'sun':
        return <SunIcon size={size} {...props} />;
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
