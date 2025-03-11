'use client';

import Link from 'next/link';
import Icon from '../../components/icons/icon';
import { Heading } from './ui/heading';

const LINKS = [
  { label: 'Posts', path: '/posts' },
  { label: 'About', path: '/about' },
];

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center h-16">
      <Heading as="h4">Doyu&apos;s Blog</Heading>
      <nav>
        <ul className="flex items-center gap-4">
          {LINKS.map((link) => (
            <li key={link.path} className="">
              <Link href={link.path}>{link.label}</Link>
            </li>
          ))}
          {/* <button>
            <Icon kind="sun" size={22} />
          </button> */}
        </ul>
      </nav>
    </header>
  );
}
