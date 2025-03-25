import Link from 'next/link';
import Icon from './icons/icon';

export default function Footer() {
  return (
    <footer className="mx-auto space-y-2 py-4">
      <div className="flex items-center justify-center space-x-4">
        <Link target="_blank" href="https://github.com/YUDONGHYUK">
          <Icon className="fill-text" kind="github" size={24} />
        </Link>
        <Link
          target="_blank"
          href="https://www.notion.so/Doyu-01b5304c18ec49969140fe4021c768f1"
        >
          <Icon className="fill-text" kind="notion" size={24} />
        </Link>
      </div>
      <p>Copyright &copy; {new Date().getFullYear()} Doyu</p>
    </footer>
  );
}
